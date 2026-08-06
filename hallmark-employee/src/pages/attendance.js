import { getAttendance } from "../services/attendanceService";
import { renderTable } from "../components/table";

export async function loadAttendancePage() {

    document.getElementById("content").innerHTML = `

<div class="d-flex justify-content-between align-items-center mb-4">

    <h2>Attendance</h2>

</div>

<div class="mb-3">

    <input
        id="searchAttendance"
        class="form-control"
        placeholder="Search employee or site...">

</div>

<div id="attendanceTable"></div>

`;

    loadAttendanceTable("");

    document
        .getElementById("searchAttendance")
        .addEventListener("input", e => {

            loadAttendanceTable(e.target.value);

        });

}

async function loadAttendanceTable(search = "") {

    const attendance = await getAttendance();

    const filtered = attendance.filter(record =>

        (record.employeeName || "")
            .toLowerCase()
            .includes(search.toLowerCase())

        ||

        (record.siteName || "")
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    const rows = filtered.map(record => `

<tr>

<td>${record.employeeName}</td>

<td>${record.siteName}</td>

<td>${formatTime(record.clockIn)}</td>

<td>${formatTime(record.clockOut)}</td>

<td>

${record.status === "IN"

? '<span class="badge bg-success">Working</span>'

: '<span class="badge bg-secondary">Clocked Out</span>'}

</td>

</tr>

`);

    document.getElementById("attendanceTable").innerHTML =
        renderTable(

            [

                "Employee",

                "Site",

                "Clock In",

                "Clock Out",

                "Status"

            ],

            rows

        );

}

function formatTime(timestamp) {

    if (!timestamp)
        return "-";

    const date = timestamp.toDate();

    return date.toLocaleTimeString([], {

        hour: "2-digit",

        minute: "2-digit"

    });

}