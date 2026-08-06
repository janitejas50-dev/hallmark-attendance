import logo from "../../assets/hallmark-logo.webp";

export function renderLayout() {

    document.querySelector("#app").innerHTML = `

<div class="d-flex vh-100">

    <div
    class="d-flex flex-column p-4 border-end shadow-sm"
    style="
        width:260px;
        background:#ffffff;
        border-right:3px solid #212529;
        min-height:100vh;
    ">

        <div class="text-center mb-4">

            <img
                src="${logo}"
                alt="Hallmark"
                class="img-fluid"
                style="max-height:70px; width:auto;">

        </div>

        <button id="dashboardBtn" class="btn btn-dark w-100 mb-2">
            📊 Dashboard
        </button>

        <button id="employeesBtn" class="btn btn-dark w-100 mb-2">
            👥 Employees
        </button>

        <button id="sitesBtn" class="btn btn-dark w-100 mb-2">
            📍 Sites
        </button>

        <button id="attendanceBtn" class="btn btn-dark w-100 mb-2">
            🕒 Attendance
        </button>

        <button id="reportsBtn" class="btn btn-dark w-100 mb-2">
            📈 Reports
        </button>

        <button id="settingsBtn" class="btn btn-dark w-100">
            ⚙ Settings
        </button>

    </div>

    <div
        id="notification"
        class="position-fixed top-0 end-0 p-3"
        style="z-index:2000;">
    </div>

    <div
        id="content"
        class="flex-grow-1 p-4 bg-light">
    </div>

</div>

<div id="globalModal"></div>

`;

}