import logo from "../assets/hallmark-logo.webp";
import { appState } from "../store/appState";

export function loadSuccessPage() {

    const isClockIn = appState.action === "CLOCK_IN";

    const now = new Date();

    document.getElementById("app").innerHTML = `

<div class="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">

    <div class="card shadow-lg border-0 p-4 text-center"
        style="max-width:520px;width:100%;border-radius:20px;">

        <img
            src="${logo}"
            style="height:70px"
            class="mx-auto mb-3">

        <div style="font-size:70px;">
            ${isClockIn ? "🟢" : "🔴"}
        </div>

        <h2 class="fw-bold">

            ${isClockIn ? "SHIFT STARTED" : "SHIFT COMPLETED"}

        </h2>

        <p class="text-muted">

            ${isClockIn
                ? "Clock In Successful"
                : "Clock Out Successful"}

        </p>

        <hr>

        <h3 class="fw-bold">

            ${appState.employee.name}

        </h3>

        <div class="mt-4">

            <div class="d-flex justify-content-between">

                <span>Site</span>

                <strong>${appState.site.name}</strong>

            </div>

            <div class="d-flex justify-content-between mt-2">

                <span>Account</span>

                <strong>#${appState.site.siteCode}</strong>

            </div>

            <div class="d-flex justify-content-between mt-2">

                <span>Time</span>

                <strong>

                    ${now.toLocaleTimeString([],{
                        hour:"2-digit",
                        minute:"2-digit"
                    })}

                </strong>

            </div>

            <div class="d-flex justify-content-between mt-2">

                <span>Status</span>

                <strong class="text-success">

                    GPS Verified ✓

                </strong>

            </div>

        </div>

        <div class="alert alert-success mt-4">

            ${isClockIn
                ? "Have a productive shift!"
                : "Thank you. Have a safe trip home!"}

        </div>

        <button
            id="doneBtn"
            class="btn btn-success btn-lg w-100">

            Done

        </button>

    </div>

</div>

`;

    document.getElementById("doneBtn").onclick = () => {

        window.location.reload();

    };

}