import { getSites } from "../services/siteService";
import { getAttendance } from "../services/attendanceService";
import { renderTable } from "../components/table";
import { attendanceSummary } from "../components/attendanceSummary";

let attendanceData = [];

export async function loadAttendancePage() {

    document.getElementById("content").innerHTML = `

<div class="d-flex justify-content-between align-items-center mb-4">

    <h2>Attendance</h2>

</div>

<div class="row g-3 mb-4">

    <div class="col-lg-4">

        <input
            id="searchAttendance"
            class="form-control"
            placeholder="🔍 Search employee or site">

    </div>

    <div class="col-lg-3">

        <select
            id="siteFilter"
            class="form-select">

            <option value="ALL">
                All Sites
            </option>

        </select>

    </div>

    <div class="col-lg-3">

        <select
            id="statusFilter"
            class="form-select">

            <option value="ALL">
                All Status
            </option>

            <option value="IN">
                Working
            </option>

            <option value="OUT">
                Clocked Out
            </option>

        </select>

    </div>

    <div class="col-lg-2">

        <button
            id="refreshBtn"
            class="btn btn-primary w-100">

            Refresh

        </button>

    </div>

</div>

<div id="attendanceSummary"></div>

<div id="attendanceTable"></div>

`;

    // Load sites once
    const sites = await getSites();

    const siteFilter = document.getElementById("siteFilter");

    sites.forEach(site => {

        siteFilter.innerHTML += `
            <option value="${site.name}">
                ${site.name}
            </option>
        `;

    });

    // Listen for attendance updates
    attendanceData = await getAttendance();

refreshTable();

    document
        .getElementById("searchAttendance")
        .addEventListener("input", refreshTable);

    document
        .getElementById("siteFilter")
        .addEventListener("change", refreshTable);

    document
        .getElementById("statusFilter")
        .addEventListener("change", refreshTable);

    document
        .getElementById("refreshBtn")
        .addEventListener("click", refreshTable);

}

function refreshTable() {

    const search =
        document.getElementById("searchAttendance").value;

    const site =
        document.getElementById("siteFilter").value;

    const status =
        document.getElementById("statusFilter").value;

    const filtered = attendanceData.filter(record => {

        const matchesSearch =

            (record.employeeName || "")
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            (record.siteName || "")
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesSite =

            site === "ALL"

            ||

            record.siteName === site;

        const matchesStatus =

            status === "ALL"

            ||

            record.status === status;

        return (

            matchesSearch &&

            matchesSite &&

            matchesStatus

        );

    });

    const stats = {

        working:
            filtered.filter(a => a.status === "IN").length,

        clockedOut:
            filtered.filter(a => a.status !== "IN").length,

        hours:
            calculateTodayHours(filtered),

        missingClockOut:
            filtered.filter(a => a.status === "IN").length

    };

    document.getElementById("attendanceSummary").innerHTML =
        attendanceSummary(stats);

    loadAttendanceTable(filtered);

}

function loadAttendanceTable(attendance) {

    const rows = attendance.map(record => `

<tr>

    <td>${record.employeeName || "-"}</td>

    <td>${record.siteName || "-"}</td>

    <td>${formatTime(record.clockIn)}</td>

    <td>${formatTime(record.clockOut)}</td>

    <td>

        ${
            record.status === "IN"

            ? '<span class="badge bg-success">Working</span>'

            : '<span class="badge bg-secondary">Clocked Out</span>'
        }

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

    return timestamp
        .toDate()
        .toLocaleTimeString([], {

            hour: "2-digit",
            minute: "2-digit"

        });

}

function calculateTodayHours(attendance) {

    let total = 0;

    attendance.forEach(record => {

        if (!record.clockIn)
            return;

        const start = record.clockIn.toDate();

        const end = record.clockOut
            ? record.clockOut.toDate()
            : new Date();

        total += (end - start) / 1000 / 60 / 60;

    });

    return total.toFixed(2);

}