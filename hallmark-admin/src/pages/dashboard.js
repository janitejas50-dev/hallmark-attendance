import { getDashboardStats } from "../services/dashboardService";
import { dashboardCard } from "../components/dashboardCard";
export async function loadDashboardPage() {

    document.getElementById("content").innerHTML = `

<div class="d-flex justify-content-between align-items-center mb-4">

    <div>

        <h2 class="mb-1">
            Dashboard
        </h2>

        <p class="text-muted mb-0">
            Live overview of today's workforce.
        </p>

    </div>

    <h5 class="text-muted">

        ${new Date().toLocaleDateString(undefined,{
            weekday:"long",
            year:"numeric",
            month:"long",
            day:"numeric"
        })}

    </h5>

</div>

<div class="row">

${dashboardCard({
    title:"Employees",
    value:'<span id="employeeCount">0</span>',
    icon:"👥",
    color:"#2563eb",
    subtitle:"Registered Employees"
})}

${dashboardCard({
    title:"Sites",
    value:'<span id="siteCount">0</span>',
    icon:"📍",
    color:"#7c3aed",
    subtitle:"Active Sites"
})}

${dashboardCard({
    title:"Working Now",
    value:'<span id="workingCount">0</span>',
    icon:"🟢",
    color:"#16a34a",
    subtitle:"Currently Clocked In"
})}

${dashboardCard({
    title:"Today's Hours",
    value:'<span id="hoursCount">0.00</span>',
    icon:"⏱",
    color:"#ea580c",
    subtitle:"Hours Worked Today"
})}

</div>

<div class="row mt-4">

    <div class="col-lg-7">

        <div class="card shadow-sm border-0">

            <div class="card-header fw-semibold">

                Recent Activity

            </div>

            <div
                class="card-body"
                id="recentActivity">

                <div class="text-muted">

                    No attendance activity today.

                </div>

            </div>

        </div>

    </div>

    <div class="col-lg-5">

        <div class="card shadow-sm border-0">

            <div class="card-header fw-semibold">

                Today's Summary

            </div>

            <div class="card-body">

                <div class="d-flex justify-content-between mb-3">

                    <span>Currently Working</span>

                    <strong id="summaryWorking">-</strong>

                </div>

                <div class="d-flex justify-content-between mb-3">

                    <span>Clocked Out</span>

                    <strong id="summaryClockedOut">-</strong>

                </div>

                <div class="d-flex justify-content-between">

                    <span>Total Hours</span>

                    <strong id="summaryHours">-</strong>

                </div>

            </div>

        </div>

    </div>

</div>

`;

    const stats = await getDashboardStats();

    document.getElementById("employeeCount").textContent =
        stats.employees;

    document.getElementById("siteCount").textContent =
        stats.sites;

    document.getElementById("workingCount").textContent =
        stats.working;

    document.getElementById("hoursCount").textContent =
        stats.totalHours;

    document.getElementById("summaryWorking").textContent =
        stats.working;

    document.getElementById("summaryClockedOut").textContent =
        stats.clockedOut;

    document.getElementById("summaryHours").textContent =
        stats.totalHours;

    const activity =
        document.getElementById("recentActivity");

    if (!stats.todayAttendance.length) {

        activity.innerHTML = `

<div class="text-muted">

No attendance activity today.

</div>

`;

    } else {

        activity.innerHTML = stats.todayAttendance
            .slice(0, 8)
            .reverse()
            .map(record => `

<div class="border-bottom py-2">

<strong>${record.employeeName || record.employeeCode}</strong>

<div class="text-muted small">

Clocked In • ${record.siteName || "-"}

</div>

</div>

`)
            .join("");

    }

}