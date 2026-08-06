export function attendanceSummary(stats) {

    return `

<div class="row mb-4">

    ${card(
        "🟢",
        "Working",
        stats.working
    )}

    ${card(
        "⚪",
        "Clocked Out",
        stats.clockedOut
    )}

    ${card(
        "⏱",
        "Hours Today",
        stats.hours
    )}

    ${card(
        "⚠",
        "Missing Out",
        stats.missingClockOut
    )}

</div>

`;

}

function card(icon,title,value){

    return `

<div class="col-lg-3 col-md-6 mb-3">

    <div class="card shadow-sm border-0 h-100">

        <div class="card-body">

            <div class="d-flex justify-content-between">

                <div>

                    <div class="text-muted">

                        ${title}

                    </div>

                    <h3 class="mb-0">

                        ${value}

                    </h3>

                </div>

                <div style="font-size:34px">

                    ${icon}

                </div>

            </div>

        </div>

    </div>

</div>

`;

}