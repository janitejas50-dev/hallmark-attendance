import logo from "../assets/hallmark-logo.webp";
import { loadShiftPage } from "./shift";
import {
    findOpenAttendance,
    clockIn,
    clockOut
} from "../services/attendanceService";
import { verifyEmployee } from "../services/employeeService";
import { getCurrentLocation } from "../utils/gps";
import { calculateDistance } from "../utils/distance";
import { appState } from "../store/appState";
import { showSuccess } from "../router";

let currentSite = null;
let currentLocation = null;
let clockTimer = null;
let gpsTimer = null;

async function checkGPS() {

    const gps = document.getElementById("gpsStatus");

    if (!gps || !currentSite)
        return;

    try {

        const location = await getCurrentLocation();

        currentLocation = location;

        const distance = calculateDistance(

            location.latitude,
            location.longitude,

            currentSite.latitude,
            currentSite.longitude

        );

        if (distance <= currentSite.radius) {

            gps.className = "alert alert-success py-2";

            gps.innerHTML = `

🟢 GPS Verified

<br>

Distance:
<strong>${Math.round(distance)} m</strong>

<br>

Accuracy:
<strong>±${Math.round(location.accuracy)} m</strong>

`;

        } else {

            gps.className = "alert alert-danger py-2";

            gps.innerHTML = `

🔴 Outside Work Area

<br>

Distance:
<strong>${Math.round(distance)} m</strong>

`;

        }

    } catch (error) {

        currentLocation = null;

        gps.className = "alert alert-danger py-2";

        gps.innerHTML = `

🔴 Unable to detect GPS

`;

        console.error(error);

    }

}

function startClock() {

    function update() {

        const now = new Date();

        document.getElementById("liveTime").innerHTML =
            now.toLocaleTimeString();

        document.getElementById("liveDate").innerHTML =
            now.toLocaleDateString([], {

                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric"

            });

    }

    update();

    clearInterval(clockTimer);

    clockTimer = setInterval(update, 1000);

}

export function loadCheckInPage(site) {

    currentSite = site;

    document.getElementById("app").innerHTML = `

<div class="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">

<div class="card shadow-lg border-0 p-4"

style="max-width:520px;width:100%;border-radius:20px;">

<div class="text-center">

<img

src="${logo}"

style="height:60px"

class="mb-3">
<p class="text-muted">

Employee Attendance System

</p>

</div>

<div class="card bg-light border-0 mb-4">

<div class="card-body text-center">

<h4>

📍 ${currentSite.name}

</h4>

<div>

${currentSite.client || ""}

</div>

<div class="fw-bold mt-2">

Account #

${currentSite.siteCode}

</div>

</div>

</div>

<div

id="gpsStatus"

class="alert alert-warning py-2">

Checking GPS...

</div>

<div class="mb-3">

<label class="fw-semibold mb-2">

Employee Code

</label>

<input

id="employeeCode"

class="form-control form-control-lg"

placeholder="Enter Employee Code">

</div>

<div class="mb-4">

<label class="fw-semibold mb-2">

PIN

</label>

<input

id="employeePin"

type="password"

maxlength="4"

class="form-control form-control-lg"

placeholder="••••">

</div>

<button

id="continueBtn"

class="btn btn-success btn-lg w-100">

Clock In / Clock Out

</button>

<div class="text-center mt-4">

<div

id="liveTime"

class="fw-bold fs-3">

</div>

<div

id="liveDate"

class="text-muted">

</div>

</div>

</div>

</div>

`;

    document.getElementById("continueBtn").onclick = onContinue;

    checkGPS();

    clearInterval(gpsTimer);

    gpsTimer = setInterval(checkGPS, 10000);

    startClock();

}
async function onContinue() {

    if (!currentSite) {

        alert("Site could not be loaded.");

        return;

    }

    const employeeCode =
        document.getElementById("employeeCode").value.trim();

    const pin =
        document.getElementById("employeePin").value.trim();

    if (!employeeCode || !pin) {

        alert("Please enter Employee Code and PIN.");

        return;

    }

    const btn =
        document.getElementById("continueBtn");

    btn.disabled = true;
    btn.innerHTML = "Verifying...";

    try {

        const employee =
            await verifyEmployee(employeeCode, pin);
            localStorage.setItem(

    "employeeSession",

    JSON.stringify({

        employeeCode:
            employee.employeeCode

    })

);
        if (!employee) {

            btn.disabled = false;
            btn.innerHTML = "Clock In / Clock Out";

            alert("Invalid Employee Code or PIN.");

            return;

        }

        if (!currentLocation) {

            await checkGPS();

        }

        if (!currentLocation) {

            btn.disabled = false;
            btn.innerHTML = "Clock In / Clock Out";

            alert("Unable to acquire GPS location.");

            return;

        }

        const location = currentLocation;

        const distance = calculateDistance(

            location.latitude,
            location.longitude,

            currentSite.latitude,
            currentSite.longitude

        );

        if (distance > currentSite.radius) {

            btn.disabled = false;
            btn.innerHTML = "Clock In / Clock Out";

            alert(

                `❌ You are outside the allowed work area.\n\n` +

                `Distance: ${Math.round(distance)} metres\n` +

                `Allowed Radius: ${currentSite.radius} metres`

            );

            return;

        }

        let attendance =
            await findOpenAttendance(employee.id);

        if (!attendance) {

            attendance =
                await clockIn(

                    employee,
                    currentSite,
                    location

                );

        } else {

            await clockOut(

                attendance.id,
                location

            );

            appState.employee = employee;
            appState.site = currentSite;
            appState.action = "CLOCK_OUT";
            localStorage.removeItem(
    "employeeSession"
);
            showSuccess();

            return;

        }

        appState.employee = employee;
        appState.site = currentSite;
        appState.action = "CLOCK_IN";

        loadShiftPage(

            attendance,
            location

        );

    } catch (error) {

        console.error(error);

        alert(

            error.message ||

            "Unexpected error occurred."

        );

    } finally {

        btn.disabled = false;

        btn.innerHTML = "Clock In / Clock Out";

    }

}
function stopClock() {

    clearInterval(clockTimer);

}

function stopGPSMonitoring() {

    clearInterval(gpsTimer);

}

window.addEventListener("beforeunload", () => {

    stopClock();

    stopGPSMonitoring();

});