import {
    getCurrentPayPeriod,
    getPreviousPayPeriod,
    getNextPayPeriod
} from "../utils/payPeriod";

import { getAttendanceReport } from "../services/reportService";
import { reportState } from "../store/reportState";

export class ReportController {

    constructor() {

        this.payPeriod = getCurrentPayPeriod();

    }

    async load() {

        const rows = await getAttendanceReport(
            this.payPeriod.start,
            this.payPeriod.end
        );

        reportState.setRows(rows);

        return this.getReport();

    }

    async previous() {

        this.payPeriod = getPreviousPayPeriod(this.payPeriod.start);

        return await this.load();

    }

    async next() {

        this.payPeriod = getNextPayPeriod(this.payPeriod.start);

        return await this.load();

    }

    async current() {

        this.payPeriod = getCurrentPayPeriod();

        return await this.load();

    }
    refresh() {

    return this.getReport();

}
    getReport() {

        const employees = reportState.getRows();

        return {

            payPeriod: this.payPeriod,

            employees,

            stats: {

                employees: employees.length,

                totalHours: employees.reduce(
                    (a, b) => a + b.totalHours,
                    0
                ),

                regularHours: employees.reduce(
                    (a, b) => a + b.regularHours,
                    0
                ),

                overtimeHours: employees.reduce(
                    (a, b) => a + b.overtimeHours,
                    0
                )

            }

        };

    }

}