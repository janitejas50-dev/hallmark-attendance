import { ReportToolbar } from "../components/reports/ReportToolbar";
import { ReportFilters } from "../components/reports/ReportFilters";
import { SummaryCards } from "../components/reports/SummaryCards";
import { ReportGrid } from "../components/reports/ReportGrid";
import { ReportController } from "../controllers/ReportController";
import { reportState } from "../store/reportState";

const controller = new ReportController();

export async function loadReportsPage() {

    document.getElementById("content").innerHTML = `

        <div id="toolbar"></div>

        <div id="summaryCards"></div>

        ${ReportFilters()}

        <div
            id="reportGrid"
            class="ag-theme-alpine shadow-sm"
            style="height:700px;width:100%;">
        </div>

    `;

    await refreshReport();
    wireFilters();
    wireToolbarButtons();
}

async function refreshReport() {

    const report = await controller.load();

    document.getElementById("toolbar").innerHTML =
        ReportToolbar(report.payPeriod);

    document.getElementById("summaryCards").innerHTML =
        SummaryCards({

            employees: report.stats.employees,

            working: 0,

            finished: 0,

            hours: report.stats.totalHours,

            overtime: report.stats.overtimeHours

        });

    ReportGrid(

        document.getElementById("reportGrid"),

        report.employees

    );
    

    wireToolbarButtons();

}

function wireToolbarButtons() {

    document.getElementById("previousPeriodBtn").onclick =
        async () => {

            await controller.previous();

            await refreshReport();

        };

    document.getElementById("currentPeriodBtn").onclick =
        async () => {

            await controller.current();

            await refreshReport();

            controller.payPeriod =
                (await import("../utils/payPeriod"))
                    .getCurrentPayPeriod();

            await refreshReport();

        };

    document.getElementById("nextPeriodBtn").onclick =
        async () => {

            await controller.next();

            await refreshReport();

        };

}


function wireFilters() {

    const employeeSearch =
        document.getElementById("employeeSearch");

    if (employeeSearch) {

        employeeSearch.oninput = () => {

            reportState.setEmployeeFilter(
                employeeSearch.value
            );

            const report =
                controller.refresh();

            ReportGrid(

                document.getElementById("reportGrid"),

                report.employees

            );

            document.getElementById("summaryCards").innerHTML =
                SummaryCards({

                    employees: report.stats.employees,

                    working: 0,

                    finished: 0,

                    hours: report.stats.totalHours,

                    overtime: report.stats.overtimeHours

                });

        };

    }

}