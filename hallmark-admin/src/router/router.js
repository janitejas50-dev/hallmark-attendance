import { loadDashboardPage } from "../pages/dashboard";
import { loadEmployeesPage } from "../pages/employees";
import { loadSitesPage } from "../pages/sites";
import { loadAttendancePage } from "../pages/attendance";
import { loadReportsPage } from "../pages/reports";

const routes = {
    dashboard: loadDashboardPage,
    employees: loadEmployeesPage,
    sites: loadSitesPage,
    attendance: loadAttendancePage,
    reports: loadReportsPage
};

export function navigate(page) {

    const route = routes[page];

    if (!route) {
        console.error(`Route "${page}" not found.`);
        return;
    }

    route();
}