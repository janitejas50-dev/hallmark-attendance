class ReportState {

    constructor() {

        this.originalRows = [];
        this.filteredRows = [];

        this.filters = {

            employee: "",
            site: "ALL",
            status: "ALL"

        };

    }

    setRows(rows) {

        this.originalRows = rows;
        this.applyFilters();

    }

    setEmployeeFilter(value) {

        this.filters.employee = value.toLowerCase();
        this.applyFilters();

    }

    setSiteFilter(value) {

        this.filters.site = value;
        this.applyFilters();

    }

    setStatusFilter(value) {

        this.filters.status = value;
        this.applyFilters();

    }

    applyFilters() {

        this.filteredRows = this.originalRows.filter(employee => {

            const employeeMatch =
                employee.employeeName
                    .toLowerCase()
                    .includes(this.filters.employee);

            const siteMatch =
                this.filters.site === "ALL"
                || employee.siteName === this.filters.site;

            return employeeMatch && siteMatch;

        });

    }

    getRows() {

        return this.filteredRows;

    }

}

export const reportState = new ReportState();