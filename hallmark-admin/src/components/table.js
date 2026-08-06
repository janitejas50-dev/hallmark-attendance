export function renderTable(columns, rows) {

    return `

        <table class="table table-striped table-hover align-middle">

            <thead class="table-dark">

                <tr>

                    ${columns.map(col => `<th>${col}</th>`).join("")}

                </tr>

            </thead>

            <tbody>

                ${rows.join("")}

            </tbody>

        </table>

    `;

}