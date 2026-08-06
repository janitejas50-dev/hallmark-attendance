export function SummaryCards(stats) {

    return `

<div class="row g-3 mb-4">

    <div class="col">
        <div class="card shadow-sm">
            <div class="card-body text-center">
                <h3>${stats.employees}</h3>
                <small>Employees</small>
            </div>
        </div>
    </div>

    <div class="col">
        <div class="card shadow-sm">
            <div class="card-body text-center">
                <h3 class="text-success">${stats.working}</h3>
                <small>Working</small>
            </div>
        </div>
    </div>

    <div class="col">
        <div class="card shadow-sm">
            <div class="card-body text-center">
                <h3>${stats.finished}</h3>
                <small>Finished</small>
            </div>
        </div>
    </div>

    <div class="col">
        <div class="card shadow-sm">
            <div class="card-body text-center">
                <h3>${stats.hours.toFixed(1)}</h3>
                <small>Hours</small>
            </div>
        </div>
    </div>

    <div class="col">
        <div class="card shadow-sm">
            <div class="card-body text-center">
                <h3>${stats.overtime.toFixed(1)}</h3>
                <small>OT</small>
            </div>
        </div>
    </div>

</div>

`;

}