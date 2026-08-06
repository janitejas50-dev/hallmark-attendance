import { appState } from "../store/appState";

export function loadConfirmPage(onConfirm) {

    const employee = appState.employee;
    const site = appState.site;

    document.getElementById("app").innerHTML = `

<div class="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">

<div class="card shadow-lg border-0 p-4" style="max-width:520px;width:100%;border-radius:20px;">

<div class="text-center">

<h1 class="display-4">

👋

</h1>

<h2>

Welcome

</h2>

<h3 class="fw-bold">

${employee.name}

</h3>

</div>

<hr>

<div class="row mb-2">

<div class="col">

Employee

</div>

<div class="col text-end fw-bold">

${employee.employeeCode}

</div>

</div>

<div class="row mb-2">

<div class="col">

Site

</div>

<div class="col text-end fw-bold">

${site.name}

</div>

</div>

<div class="row mb-2">

<div class="col">

Account

</div>

<div class="col text-end fw-bold">

${site.siteCode}

</div>

</div>

<div class="row mb-2">

<div class="col">

Time

</div>

<div class="col text-end fw-bold">

${new Date().toLocaleTimeString()}

</div>

</div>

<div class="row mb-4">

<div class="col">

GPS

</div>

<div class="col text-end text-success fw-bold">

Verified ✓

</div>

</div>

<button

id="confirmBtn"

class="btn btn-success btn-lg w-100">

Confirm Clock In / Out

</button>

</div>

</div>

`;

    document.getElementById("confirmBtn").onclick = onConfirm;

}