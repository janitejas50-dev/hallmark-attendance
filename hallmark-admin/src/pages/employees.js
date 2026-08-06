import {
    getEmployees,
    saveEmployee,
    deleteEmployee,
    updateEmployee
} from "../services/employeeService";
import { getSites } from "../services/siteService";

import { renderSearch } from "../components/search";
import { renderTable } from "../components/table";

import * as bootstrap from "bootstrap";
let editingEmployee = null;

export function loadEmployeesPage() {

    document.getElementById("content").innerHTML = `

<div class="d-flex justify-content-between align-items-center mb-4">

    <div>

        <h2 class="mb-1">
            Employee Management
        </h2>

        <p class="text-muted mb-0">
            Manage employees and their login credentials.
        </p>

    </div>

    <button
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#employeeModal">

        + Add Employee

    </button>

</div>

<div class="mb-3">

    ${renderSearch(
        "searchEmployee",
        "Search employees..."
    )}

</div>

<div id="message"></div>

<div id="employeeTable"></div>

<div class="modal fade" id="employeeModal" tabindex="-1">

    <div class="modal-dialog">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title">

                    Add Employee

                </h5>

                <button
                    class="btn-close"
                    data-bs-dismiss="modal">
                </button>

            </div>

            <div class="modal-body">

                <label class="form-label">

                    Employee Code

                </label>

                <div class="input-group mb-3">

                    <input
                        id="employeeCode"
                        class="form-control">

                    <button
                        id="generateCode"
                        class="btn btn-outline-secondary">

                        Generate

                    </button>

                </div>

                <label class="form-label">

                    Employee Name

                </label>

                <input
                    id="employeeName"
                    class="form-control mb-3">

                <label class="form-label">

                    4 Digit PIN

                </label>
                <label class="form-label mt-3">

                Assigned Sites

                </label>

                <div
                    id="assignedSitesContainer"
                class="border rounded p-3"
                style="max-height:250px;overflow:auto;">

                </div>

                <input
                    id="employeePin"
                    maxlength="4"
                    class="form-control">

            </div>

            <div class="modal-footer">

                <button
                    class="btn btn-secondary"
                    data-bs-dismiss="modal">

                    Cancel

                </button>

                <button
                    id="saveEmployee"
                    class="btn btn-primary">

                    Save Employee

                </button>

            </div>

        </div>

    </div>

</div>

`;

    loadEmployeeTable();

    document
        .getElementById("searchEmployee")
        .addEventListener("input", e => {

            loadEmployeeTable(e.target.value);

        });

    document
        .getElementById("generateCode")
        .onclick = () => {

            const code =
                Math.floor(
                    100000 +
                    Math.random() * 900000
                );

            document
                .getElementById("employeeCode")
                .value = code;

        };

    document
        .getElementById("saveEmployee")
        .onclick = saveNewEmployee;

}

async function saveNewEmployee() {

    const code = document.getElementById("employeeCode").value.trim();
    const name = document.getElementById("employeeName").value.trim();
    const pin = document.getElementById("employeePin").value.trim();

    if (!code || !name || !pin) {

        alert("Please complete all fields.");
        return;

    }

    if (pin.length !== 4 || isNaN(pin)) {

        alert("PIN must be exactly 4 digits.");
        return;

    }

    if (editingEmployee) {

        await updateEmployee(
            editingEmployee.employeeCode,
            {
                name,
                pin,
                assignedSite: editingEmployee.assignedSite || ""
            }
        );

    } else {

        await saveEmployee({
            code,
            name,
            pin
        });

    }

    editingEmployee = null;

    document.querySelector(".modal-title").textContent =
        "Add Employee";

    clearForm();

    bootstrap.Modal
        .getInstance(
            document.getElementById("employeeModal")
        )
        .hide();

    loadEmployeeTable(
        document.getElementById("searchEmployee").value
    );

}

function clearForm() {

    document.getElementById("employeeCode").value = "";

    document.getElementById("employeeName").value = "";

    document.getElementById("employeePin").value = "";

}

async function loadEmployeeTable(search = "") {

    const employees = await getEmployees();

    const filtered = employees.filter(employee => {

        const code =
            (employee.employeeCode || "")
            .toLowerCase();

        const name =
            (employee.name || "")
            .toLowerCase();

        return (

            code.includes(search.toLowerCase()) ||

            name.includes(search.toLowerCase())

        );

    });

    const rows = filtered.map(employee => `

<tr>

<td>

${employee.employeeCode}

</td>

<td>

${employee.name}

</td>

<td>

<button
class="btn btn-primary btn-sm me-2"
onclick="editEmployee('${employee.id}')">

✏ Edit

</button>

<button
class="btn btn-danger btn-sm"
onclick="deleteEmployeeRecord('${employee.id}')">

🗑 Delete

</button>

</td>

</tr>

`);

    document.getElementById("employeeTable").innerHTML =
        renderTable(

            [

                "Employee ID",

                "Full Name",

                "Actions"

            ],

            rows

        );

}

window.deleteEmployeeRecord = async function(id) {

    if (!confirm("Delete this employee?"))
        return;

    await deleteEmployee(id);

    loadEmployeeTable(
        document
            .getElementById("searchEmployee")
            .value
    );

};

window.editEmployee = async function(id) {

    const employees = await getEmployees();

    editingEmployee = employees.find(e => e.id === id);

    document.getElementById("employeeCode").value =
        editingEmployee.employeeCode;

    document.getElementById("employeeName").value =
        editingEmployee.name;

    document.getElementById("employeePin").value =
        editingEmployee.pin;

    document.querySelector(".modal-title").textContent =
        "Edit Employee";
    await loadSiteCheckboxes(
    editingEmployee.assignedSites || []
    );
    
    new bootstrap.Modal(
        document.getElementById("employeeModal")
    ).show();

};
async function loadSiteCheckboxes(selected = []) {

    const sites = await getSites();

    const container =
        document.getElementById("assignedSitesContainer");

    container.innerHTML = "";

    sites.forEach(site => {

        container.innerHTML += `

<div class="form-check">

    <input
        class="form-check-input assignedSite"
        type="checkbox"
        value="${site.id}"
        ${selected.includes(site.id) ? "checked" : ""}>

    <label class="form-check-label">

        ${site.siteCode} - ${site.name}

    </label>

</div>

`;

    });

}