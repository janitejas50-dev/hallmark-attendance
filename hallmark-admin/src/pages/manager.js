import { loadEmployeesPage } from "./employees";

export function loadManagerPage() {

    document.querySelector("#app").innerHTML = `

        <div style="max-width:900px;margin:40px auto;font-family:Arial">

            <h1>Hallmark Attendance</h1>

            <h3>Manager Dashboard</h3>

            <hr>

            <button id="employeesBtn">Employees</button>
            <button id="sitesBtn">Sites</button>
            <button id="attendanceBtn">Attendance</button>
            <button id="reportsBtn">Reports</button>

            <div id="content">

                <h2>Welcome</h2>

            </div>

        </div>

    `;

    document.getElementById("employeesBtn").onclick = loadEmployeesPage;

}