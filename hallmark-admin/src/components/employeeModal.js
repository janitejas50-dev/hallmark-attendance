import { openModal, closeModal } from "./modal";
import { saveEmployee } from "../services/employeeService";

export function showEmployeeModal(onSaved) {

    openModal(

        "Add Employee",

        `

<input
id="employeeCode"
class="form-control mb-3"
placeholder="Employee Code">

<button
id="generateCode"
class="btn btn-outline-secondary mb-3">

Generate Code

</button>

<input
id="employeeName"
class="form-control mb-3"
placeholder="Employee Name">

<input
id="employeePin"
class="form-control"
placeholder="4-digit PIN"
maxlength="4">

`,

        `

<button
class="btn btn-secondary"
id="cancelEmployee">

Cancel

</button>

<button
class="btn btn-primary"
id="saveEmployee">

Save Employee

</button>

`

    );

    document.getElementById("generateCode").onclick = () => {

        document.getElementById("employeeCode").value =
            Math.floor(100000 + Math.random() * 900000);

    };

    document.getElementById("cancelEmployee").onclick = () => {

        closeModal();

    };

    document.getElementById("saveEmployee").onclick = async () => {

        const code =
            document.getElementById("employeeCode").value.trim();

        const name =
            document.getElementById("employeeName").value.trim();

        const pin =
            document.getElementById("employeePin").value.trim();

        if (!code || !name || !pin) {

            alert("Complete all fields.");

            return;

        }

        if (pin.length !== 4 || isNaN(pin)) {

            alert("PIN must be 4 digits.");

            return;

        }

        await saveEmployee({

            code,
            name,
            pin

        });

        closeModal();

        onSaved();

    };

}