import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { appState } from "./store/appState";
import { findOpenAttendance } from "./services/attendanceService";
import { loadShiftPage } from "./pages/shift";
import { verifyEmployeeByCode } from "./services/employeeService";
import { getSiteCode } from "./utils/url";
import { getSiteByCode } from "./services/siteService";
import { loadCheckInPage } from "./pages/checkin";

async function start() {

    const app = document.getElementById("app");

    app.innerHTML = `

<div class="container vh-100 d-flex justify-content-center align-items-center">

    <div class="text-center">

        <div class="spinner-border text-primary mb-4"></div>

        <h4>Loading Site...</h4>

    </div>

</div>

`;

    const siteCode = getSiteCode();

    if (!siteCode) {

        app.innerHTML = `

<div class="container vh-100 d-flex justify-content-center align-items-center">

    <div class="card shadow p-5 text-center">

        <h3>Invalid QR Code</h3>

        <p>Please scan an official Hallmark QR Code.</p>

    </div>

</div>

`;

        return;

    }

    const site = await getSiteByCode(siteCode);

    if (!site) {

        app.innerHTML = `

<div class="container vh-100 d-flex justify-content-center align-items-center">

    <div class="card shadow p-5 text-center">

        <h3>Site Not Found</h3>

        <p>Please contact your supervisor.</p>

    </div>

</div>

`;

        return;

    }

    const session = JSON.parse(
    localStorage.getItem("employeeSession")
);

if (!session) {

    loadCheckInPage(site);
    return;

}

const employee =
    await verifyEmployeeByCode(
        session.employeeCode
    );

if (!employee) {

    localStorage.removeItem("employeeSession");

    loadCheckInPage(site);

    return;

}

const attendance =
    await findOpenAttendance(employee.id);

if (!attendance) {

    loadCheckInPage(site);

    return;

}

appState.employee = employee;
appState.site = site;

loadShiftPage(attendance, null);

}

start();