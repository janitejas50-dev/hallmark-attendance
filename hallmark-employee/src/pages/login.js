import { appState } from "../store/appState";
import { showConfirm } from "../router";

import { verifyEmployee } from "../services/employeeService";
import { getCurrentLocation } from "../utils/gps";
import { calculateDistance } from "../utils/distance";
import { findOpenAttendance } from "../services/attendanceService";

export function loadLoginPage() {

    document.getElementById("app").innerHTML = `

<div class="container vh-100 d-flex justify-content-center align-items-center">

    <div class="card shadow-lg p-4" style="max-width:450px;width:100%;">

        <div class="text-center mb-4">

            <h2>Hallmark Attendance</h2>

            <h5 class="text-primary">

                📍 ${appState.site?.name || "No Site Selected"}

            </h5>

        </div>

        <input
            id="employeeCode"
            class="form-control mb-3"
            placeholder="Employee Code">

        <input
            id="employeePin"
            type="password"
            maxlength="4"
            class="form-control mb-4"
            placeholder="PIN">

        <button
            id="nextBtn"
            class="btn btn-primary w-100">

            Next

        </button>

    </div>

</div>

`;

    document
        .getElementById("nextBtn")
        .onclick = verifyLogin;

}

async function verifyLogin() {

    const button = document.getElementById("nextBtn");

    button.disabled = true;

    button.innerHTML = `
        <span class="spinner-border spinner-border-sm"></span>
        Verifying...
    `;

    try {

        const employeeCode =
            document.getElementById("employeeCode").value.trim();

        const pin =
            document.getElementById("employeePin").value.trim();

        const employee =
            await verifyEmployee(employeeCode, pin);

        if (!employee) {

            alert("Invalid Employee Code or PIN.");

            button.disabled = false;
            button.innerHTML = "Next";

            return;

        }

        const location =
            await getCurrentLocation();

        const distance = calculateDistance(

            location.latitude,
            location.longitude,

            appState.site.latitude,
            appState.site.longitude

        );

        if (distance > appState.site.radius) {

            alert("You are outside the allowed GPS radius.");

            button.disabled = false;
            button.innerHTML = "Next";

            return;

        }

        const attendance =
            await findOpenAttendance(employee.id);

        appState.employee = employee;
        appState.location = location;
        appState.attendance = attendance;

        showConfirm();

    }

    catch (error) {

        console.error(error);

        alert(error.message || "Unexpected error.");

        button.disabled = false;
        button.innerHTML = "Next";

    }

}