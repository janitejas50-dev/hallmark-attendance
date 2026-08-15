import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import { renderLayout } from "./components/layout";
import { renderLoginPage } from "./pages/login";
import { navigate } from "./router/router";

onAuthStateChanged(auth, (user) => {

    if (user) {

        renderApp(user);

    } else {

        renderLoginPage();

    }

});

function renderApp(user) {

    renderLayout(user);

    // Default page
    navigate("dashboard");

    // Sidebar navigation
    document.getElementById("dashboardBtn").onclick = () => navigate("dashboard");

    document.getElementById("employeesBtn").onclick = () => navigate("employees");

    document.getElementById("sitesBtn").onclick = () => navigate("sites");

    document.getElementById("attendanceBtn").onclick = () => navigate("attendance");

    document.getElementById("reportsBtn").onclick = () => navigate("reports");

    // Uncomment when you build the Settings page
    // document.getElementById("settingsBtn").onclick = () => navigate("settings");

}