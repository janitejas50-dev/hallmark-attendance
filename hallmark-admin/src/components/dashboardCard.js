export function dashboardCard({
    title,
    value,
    icon,
    color,
    subtitle = ""
}) {

    return `

<div class="col-xl-3 col-md-6 mb-4">

    <div class="card border-0 shadow-sm h-100">

        <div class="card-body">

            <div class="d-flex justify-content-between align-items-start">

                <div>

                    <div
                        class="text-uppercase fw-semibold small text-muted mb-2">

                        ${title}

                    </div>

                    <h2 class="fw-bold mb-1">

                        ${value}

                    </h2>

                    <small class="text-muted">

                        ${subtitle}

                    </small>

                </div>

                <div
                    class="rounded-circle d-flex align-items-center justify-content-center"
                    style="
                        width:60px;
                        height:60px;
                        background:${color};
                        color:white;
                        font-size:28px;
                    ">

                    ${icon}

                </div>

            </div>

        </div>

    </div>

</div>

`;

}