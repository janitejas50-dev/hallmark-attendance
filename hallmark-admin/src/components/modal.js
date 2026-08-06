import * as bootstrap from "bootstrap";

let modal = null;

export function openModal(title, body, footer = "") {

    const container = document.getElementById("globalModal");

    container.innerHTML = `

<div class="modal fade" id="appModal" tabindex="-1">

    <div class="modal-dialog modal-lg">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title">${title}</h5>

                <button
                    class="btn-close"
                    data-bs-dismiss="modal">
                </button>

            </div>

            <div class="modal-body">

                ${body}

            </div>

            <div class="modal-footer">

                ${footer}

            </div>

        </div>

    </div>

</div>

`;

    modal = new bootstrap.Modal(document.getElementById("appModal"));

    modal.show();

}

export function closeModal() {

    if (!modal) return;

    modal.hide();

    document.body.classList.remove("modal-open");

    document.body.style.removeProperty("padding-right");

    document
        .querySelectorAll(".modal-backdrop")
        .forEach(backdrop => backdrop.remove());

}