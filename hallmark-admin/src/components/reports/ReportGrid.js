import {
    createGrid,
    ModuleRegistry,
    AllCommunityModule
} from "ag-grid-community";
import { getCurrentPayPeriod } from "../../utils/payPeriod";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([
    AllCommunityModule
]);

let gridApi = null;

export function ReportGrid(container, rowData) {

    const payPeriod = getCurrentPayPeriod();

    const gridOptions = {

        columnDefs: buildColumns(payPeriod.start),

        rowData,

        defaultColDef: {

            sortable: true,
            filter: true,
            resizable: true,
            suppressMovable: true

        },

        rowHeight: 72,

        headerHeight: 50,

        pagination: false,

        animateRows: true

    };

    console.log(gridOptions.columnDefs);

    gridApi = createGrid(container, gridOptions);
    setTimeout(() => {

    gridApi.sizeColumnsToFit();

}, 100);
}

function buildColumns(startDate = new Date()) {

    const columns = [

        {
            headerName: "Employee",
            field: "employeeName",
            pinned: "left",
            width: 220
        }

    ];

    const firstDay = new Date(startDate);

    firstDay.setHours(0,0,0,0);

    for(let i=0;i<14;i++){

        const d = new Date(firstDay);

        d.setDate(firstDay.getDate()+i);

        const key = d.toISOString().substring(0,10);

        columns.push({

            headerName:d.toLocaleDateString([],{

                weekday:"short",

                month:"short",

                day:"2-digit"

            }),

            field:key,

            width:170,

            cellRenderer:attendanceRenderer

        });

    }

    columns.push(

        {

            headerName:"Reg",

            field: "regularHours",

            valueFormatter: p =>
            Number(p.value || 0).toFixed(2),

            pinned:"right",

            width:90

        },

        {

            headerName:"OT",

            field: "overtimeHours",

valueFormatter: p =>
    Number(p.value || 0).toFixed(2),

            pinned:"right",

            width:90

        },

        {

            headerName:"Total",

            field: "totalHours",

valueFormatter: p =>
    Number(p.value || 0).toFixed(2),

            pinned:"right",

            width:100

        }

    );

    return columns;

}

function attendanceRenderer(params){

    const shift = params.value;

    if(!shift){

        return "";
    }

    if(shift.status==="OFF"){

        return `

<div class="text-center text-muted fw-bold pt-3">

OFF

</div>

`;

    }

    if(shift.status==="VAC"){

        return `

<div class="text-center text-primary fw-bold pt-3">

VAC

</div>

`;

    }

    if(shift.status==="ABS"){

        return `

<div class="text-center text-danger fw-bold pt-3">

ABS

</div>

`;

    }

    const bg =
    shift.status === "IN"
        ? "#e9f8ef"
        : "#ffffff";

return `

<div
style="
padding:4px;
font-size:11px;
background:${bg};
border-radius:6px;
">


<table style="width:100%;text-align:center;border-collapse:collapse;">

<tr style="font-size:9px;color:#777;font-weight:bold;">

<td>IN</td>

<td>OUT</td>

<td>HRS</td>

</tr>

<tr>

<td>${formatTime(shift.in)}</td>

<td>${formatTime(shift.out)}</td>

<td><strong>${shift.hours.toFixed(2)}</strong></td>

</tr>

</table>

</div>

`;

}

function formatTime(date){

    if(!date)
        return "--:--";

    return date.toLocaleTimeString([],{

        hour:"2-digit",

        minute:"2-digit"

    });

}