import {
    collection,
    getDocs,
    query,
    where,
    orderBy
} from "firebase/firestore";

import { db } from "../firebase";

import {
    formatDateKey
} from "../utils/payPeriod";

export async function getAttendanceReport(startDate, endDate) {

    const attendanceRef = collection(db, "attendance");

    const q = query(

        attendanceRef,

        where("clockIn", ">=", startDate),

        where("clockIn", "<=", endDate),

        orderBy("clockIn", "asc")

    );

    const snapshot = await getDocs(q);

    const employees = {};

    snapshot.forEach(doc => {

        const attendance = doc.data();

        if (!attendance.employeeId || !attendance.clockIn)
            return;

        const employeeId = attendance.employeeId;

        if (!employees[employeeId]) {

            employees[employeeId] = {

                employeeId,

                employeeName:
                    attendance.employeeName || "Unknown",

                regularHours: 0,

                overtimeHours: 0,

                totalHours: 0

            };

        }

        const clockIn =
            attendance.clockIn.toDate();

        const clockOut =
            attendance.clockOut
                ? attendance.clockOut.toDate()
                : null;

        const hours =
            clockOut
                ? (clockOut - clockIn) / 1000 / 60 / 60
                : 0;

        const dateKey =
            formatDateKey(clockIn);

        employees[employeeId][dateKey] = {

            in: clockIn,

            out: clockOut,

            hours,

            status:
                attendance.status ||
                (clockOut ? "OUT" : "IN")

        };

        employees[employeeId].regularHours +=
            Math.min(hours, 8);

        employees[employeeId].overtimeHours +=
            Math.max(0, hours - 8);

        employees[employeeId].totalHours +=
            hours;

    });

    return Object.values(employees).map(employee => ({

        ...employee,

        regularHours:
            Number(employee.regularHours.toFixed(2)),

        overtimeHours:
            Number(employee.overtimeHours.toFixed(2)),

        totalHours:
            Number(employee.totalHours.toFixed(2))

    }));

}