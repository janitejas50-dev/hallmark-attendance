import {
    getSites,
    saveSite,
    updateSite,
    deleteSite
} from "../services/siteService";
import { renderSearch } from "../components/search";
import { renderTable } from "../components/table";
import * as bootstrap from "bootstrap";
let editingSite = null;
export function loadSitesPage() {

    document.getElementById("content").innerHTML = `

<div class="d-flex justify-content-between align-items-center mb-4">

    <h2>Site Management</h2>

    <button
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#siteModal">

        + Add Site

    </button>

</div>

<div id="message"></div>

<div class="mb-3">
    ${renderSearch(
        "searchSite",
        "🔍 Search by site code or name"
    )}
</div> 

<div id="siteTable"></div>

<div class="modal fade" id="siteModal" tabindex="-1">

    <div class="modal-dialog">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title">
                    Add Site
                </h5>

                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal">
                </button>

            </div>

            <div class="modal-body">

                <input
                    id="siteCode"
                    class="form-control mb-3"
                    placeholder="Site Code">

                <input
                    id="siteName"
                    class="form-control mb-3"
                    placeholder="Site Name">

                <input
                    id="siteAddress"
                    class="form-control mb-3"
                    placeholder="Address">

                <input
                    id="siteLatitude"
                    class="form-control mb-3"
                    placeholder="Latitude">

                <input
                    id="siteLongitude"
                    class="form-control mb-3"
                    placeholder="Longitude">

                <input
                    id="siteRadius"
                    class="form-control"
                    placeholder="GPS Radius (m)">

            </div>

            <div class="modal-footer">

                <button
                    class="btn btn-secondary"
                    data-bs-dismiss="modal">

                    Cancel

                </button>

                <button
                    id="saveSite"
                    class="btn btn-primary">

                    Save Site

                </button>

            </div>

        </div>

    </div>

</div>

`;

    loadSiteTable("");

    document
        .getElementById("searchSite")
        .addEventListener("input", (e) => {

            loadSiteTable(e.target.value);

        });

    document.getElementById("saveSite").onclick = async () => {

        const site = {
            siteCode: document.getElementById("siteCode").value.trim(),
            name: document.getElementById("siteName").value.trim(),
            address: document.getElementById("siteAddress").value.trim(),
            latitude: document.getElementById("siteLatitude").value.trim(),
            longitude: document.getElementById("siteLongitude").value.trim(),
            radius: document.getElementById("siteRadius").value.trim()
        };

        if (
            !site.siteCode ||
            !site.name ||
            !site.address ||
            !site.latitude ||
            !site.longitude ||
            !site.radius
        ) {
            alert("Please complete all fields.");
            return;
        }

        try {

            if (editingSite) {

    await updateSite(
        editingSite.id,
        site
    );

} else {

    await saveSite(site);

}
    editingSite = null;

    document.querySelector(".modal-title").textContent =
        "Add Site";

            document.getElementById("message").innerHTML =
                '<div class="alert alert-success">Site saved successfully.</div>';

            const modalElement = document.getElementById("siteModal");
const modal = bootstrap.Modal.getInstance(modalElement);

modal.hide();

// Wait until Bootstrap has fully hidden the modal
modalElement.addEventListener(
    "hidden.bs.modal",
    () => {
        loadSiteTable(
            document.getElementById("searchSite").value
        );
    },
    { once: true }
);

            document.getElementById("siteCode").value = "";
            document.getElementById("siteName").value = "";
            document.getElementById("siteAddress").value = "";
            document.getElementById("siteLatitude").value = "";
            document.getElementById("siteLongitude").value = "";
            document.getElementById("siteRadius").value = "";

            loadSiteTable(
                document.getElementById("searchSite").value
            );

        } catch (error) {

            console.error(error);

            document.getElementById("message").innerHTML =
                '<div class="alert alert-danger">Error saving site.</div>';

        }

    };

}

async function loadSiteTable(search = "") {

    const sites = await getSites();

    const filteredSites = sites.filter(site => {

        const code = (site.siteCode || "").toLowerCase();
        const name = (site.name || "").toLowerCase();

        return (
            code.includes(search.toLowerCase()) ||
            name.includes(search.toLowerCase())
        );

    });

    const rows = filteredSites.map(site => `

<tr>

<td>${site.siteCode}</td>

<td>${site.name}</td>

<td>${site.address}</td>

<td>${Number(site.radius || 0)} m</td>

<td>

<button
class="btn btn-primary btn-sm"
onclick="showSiteQR('${site.siteCode}')">

QR

</button>

</td>

<td>

<button
class="btn btn-outline-primary btn-sm me-2"
onclick="editSite('${site.id}')">

✏ Edit

</button>

<button
class="btn btn-outline-danger btn-sm"
onclick="deleteSiteRecord('${site.id}')">

🗑 Delete

</button>

</td>

</tr>

`);

    document.getElementById("siteTable").innerHTML = renderTable(

        [
    "Code",
    "Site Name",
    "Address",
    "Radius",
    "QR",
    "Actions"
],

        rows

    );

}

window.toggleSiteStatus = async function(id, active) {

    try {

        await toggleSite(id, active);

        loadSiteTable(
            document.getElementById("searchSite").value
        );

    } catch (error) {

        console.error(error);

        alert("Unable to update site.");

    }

};
import { generateSiteQR } from "../services/qrService";
import { openModal } from "../components/modal";

window.showSiteQR = async function(siteCode) {

    const qr = await generateSiteQR(siteCode);

    openModal(
        "Site QR Code",

        `
        <div class="text-center">

            <img
                src="${qr}"
                class="img-fluid mb-3"
                style="max-width:300px;">

            <h4>${siteCode}</h4>

            <p class="text-muted">
                Print this QR and place it in the janitor room.
            </p>

        </div>
        `,

        `
        <button
            class="btn btn-secondary"
            onclick="window.print()">

            Print QR

        </button>
        `
    );

};
window.editSite = async function(id) {

    const sites = await getSites();

    editingSite = sites.find(s => s.id === id);

    document.getElementById("siteCode").value =
        editingSite.siteCode;

    document.getElementById("siteName").value =
        editingSite.name;

    document.getElementById("siteAddress").value =
        editingSite.address;

    document.getElementById("siteLatitude").value =
        editingSite.latitude;

    document.getElementById("siteLongitude").value =
        editingSite.longitude;

    document.getElementById("siteRadius").value =
        editingSite.radius;

    document.querySelector(".modal-title").textContent =
        "Edit Site";

    new bootstrap.Modal(
        document.getElementById("siteModal")
    ).show();

};
window.deleteSiteRecord = async function(id) {

    if (!confirm("Delete this site?"))
        return;

    await deleteSite(id);

    loadSiteTable(
        document.getElementById("searchSite").value
    );

};