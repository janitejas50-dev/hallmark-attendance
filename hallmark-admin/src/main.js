import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { renderLayout } from "./components/layout";
import { navigate } from "./router/router";

renderLayout();

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