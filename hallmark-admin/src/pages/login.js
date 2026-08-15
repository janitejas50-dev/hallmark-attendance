import logo from "../../assets/hallmark-logo.webp";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export function renderLoginPage() {

    document.querySelector("#app").innerHTML = `

<div class="d-flex justify-content-center align-items-center vh-100 bg-light">

    <div class="card shadow-sm p-4" style="width:360px;">

        <div class="text-center mb-4">

            <img
                src="${logo}"
                alt="Hallmark"
                class="img-fluid"
                style="max-height:60px; width:auto;">

        </div>

        <h5 class="text-center mb-3">
            Admin Sign In
        </h5>

        <div id="loginError" class="alert alert-danger py-2 d-none"></div>

        <label class="form-label">
            Email
        </label>

        <input
            id="loginEmail"
            type="email"
            class="form-control mb-3"
            autocomplete="username">

        <label class="form-label">
            Password
        </label>

        <input
            id="loginPassword"
            type="password"
            class="form-control mb-4"
            autocomplete="current-password">

        <button
            id="loginSubmit"
            class="btn btn-dark w-100">

            Sign In

        </button>

    </div>

</div>

`;

    const submit = () => attemptLogin();

    document.getElementById("loginSubmit").onclick = submit;

    document.getElementById("loginPassword")
        .addEventListener("keydown", e => {

            if (e.key === "Enter") submit();

        });

}

async function attemptLogin() {

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const errorBox = document.getElementById("loginError");
    errorBox.classList.add("d-none");

    if (!email || !password) {

        errorBox.textContent = "Please enter your email and password.";
        errorBox.classList.remove("d-none");
        return;

    }

    const submitBtn = document.getElementById("loginSubmit");
    submitBtn.disabled = true;
    submitBtn.textContent = "Signing in...";

    try {

        await signInWithEmailAndPassword(auth, email, password);

        // onAuthStateChanged in main.js takes over from here.

    } catch (err) {

        errorBox.textContent = "Invalid email or password.";
        errorBox.classList.remove("d-none");

        submitBtn.disabled = false;
        submitBtn.textContent = "Sign In";

    }

}