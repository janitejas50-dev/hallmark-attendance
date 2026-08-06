import logo from "../assets/hallmark-logo.webp";
import { clockOut } from "../services/attendanceService";
import { appState } from "../store/appState";
import { showSuccess } from "../router";
import { getCurrentLocation } from "../utils/gps";
let timer;

export function loadShiftPage(attendance, location) {

    const start =
    attendance.clockIn.toDate
        ? attendance.clockIn.toDate()
        : attendance.clockIn;

    document.getElementById("app").innerHTML = `

<div class="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">

<div class="card shadow-lg border-0 p-4"
style="max-width:520px;width:100%;border-radius:20px;">

<div class="text-center">

<img
src="${logo}"
style="height:70px"
class="mb-3">

<h2 class="text-success">

🟢 CURRENT SHIFT

</h2>

<h3>

${attendance.employeeName}

</h3>

<p class="text-muted">

${attendance.siteName}

</p>

</div>

<hr>

<div class="d-flex justify-content-between mb-3">

<span>

Started

</span>

<strong>

${start.toLocaleTimeString([],{

hour:"2-digit",

minute:"2-digit"

})}

</strong>

</div>

<div class="d-flex justify-content-between mb-3">

<span>

Hours Worked

</span>

<strong id="shiftTimer">

00:00:00

</strong>

</div>

<hr>

<div class="d-flex justify-content-between mb-3">

<span>

Status

</span>

<span class="badge bg-success">

Working

</span>

</div>

<div class="d-flex justify-content-between mb-4">

<span>

GPS

</span>

<strong>

Verified ✓

</strong>

</div>

<button

id="clockOutBtn"

class="btn btn-danger btn-lg w-100">

Clock Out

</button>

</div>

</div>

`;

    function updateTimer(){

        const now = new Date();

        const seconds =
            Math.floor((now-start)/1000);

        const h =
            String(Math.floor(seconds/3600)).padStart(2,"0");

        const m =
            String(Math.floor((seconds%3600)/60)).padStart(2,"0");

        const s =
            String(seconds%60).padStart(2,"0");

        document.getElementById("shiftTimer").innerHTML =
            `${h}:${m}:${s}`;

    }

    updateTimer();

    timer = setInterval(updateTimer,1000);

document.getElementById("clockOutBtn").onclick = async () => {

    const btn = document.getElementById("clockOutBtn");

    btn.disabled = true;

    btn.innerHTML = "Getting GPS...";

    try {

        const location = await getCurrentLocation();

        btn.innerHTML = "Clocking Out...";

        clearInterval(timer);

        await clockOut(
            attendance.id,
            location
        );

        appState.action = "CLOCK_OUT";

        appState.site = {

            name: attendance.siteName,
            siteCode: attendance.siteCode

        };

        localStorage.removeItem("employeeSession");

        showSuccess();

    } catch(error){

        btn.disabled = false;

        btn.innerHTML = "Clock Out";

        alert(error.message);

    }
};
}