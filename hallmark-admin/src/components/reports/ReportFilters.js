export function ReportFilters() {

    return `

<div class="card shadow-sm mb-4">

<div class="card-body">

<div class="row g-3">

<div class="col-md-2">

<select id="periodFilter" class="form-select">

<option>Current Pay Period</option>

<option>Previous Pay Period</option>

<option>Last 30 Days</option>

<option>Custom</option>

</select>

</div>

<div class="col-md-2">

<select id="siteFilter" class="form-select">

<option>All Sites</option>

</select>

</div>

<div class="col-md-2">

<select id="statusFilter" class="form-select">

<option>All Status</option>

<option>Working</option>

<option>Finished</option>

</select>

</div>

<div class="col-md-3">

<input
id="employeeSearch"
class="form-control"
placeholder="Search Employee...">

</div>

<div class="col-md-3">

<button
id="generateBtn"
class="btn btn-primary w-100">

Generate Report

</button>

</div>

</div>

</div>

</div>

`;

}