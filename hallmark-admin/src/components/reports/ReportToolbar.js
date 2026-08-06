export function ReportToolbar(payPeriod) {

    const start =
        payPeriod.start.toLocaleDateString([],{

            month:"short",

            day:"2-digit",

            year:"numeric"

        });

    const end =
        payPeriod.end.toLocaleDateString([],{

            month:"short",

            day:"2-digit",

            year:"numeric"

        });

    return `

<div class="card shadow-sm mb-4">

    <div class="card-body">

        <div class="d-flex justify-content-between align-items-center">

            <div>

                <h3 class="mb-1">

                    Attendance Report

                </h3>

                <small class="text-muted">

                    ${start} - ${end}

                </small>

            </div>

            <div class="d-flex gap-2">

                <button
                    id="previousPeriodBtn"
                    class="btn btn-outline-dark">

                    ◀ Previous

                </button>

                <button
                    id="currentPeriodBtn"
                    class="btn btn-primary">

                    Current

                </button>

                <button
                    id="nextPeriodBtn"
                    class="btn btn-outline-dark">

                    Next ▶

                </button>

            </div>

        </div>

    </div>

</div>

`;

}