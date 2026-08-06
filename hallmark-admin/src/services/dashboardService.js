import {
    collection,
    getDocs
} from "firebase/firestore";

import { db } from "../firebase";

export async function getDashboardStats() {

    const employeesSnapshot =
        await getDocs(collection(db, "employees"));

    const sitesSnapshot =
        await getDocs(collection(db, "sites"));

    const attendanceSnapshot =
        await getDocs(collection(db, "attendance"));

    const employees = employeesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    const sites = sitesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    const attendance = attendanceSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    const today = new Date().toISOString().split("T")[0];

    const todayAttendance = attendance.filter(record => {

        if (!record.clockIn) return false;

        return record.clockIn
            .toDate()
            .toISOString()
            .split("T")[0] === today;

    });

    const working =
        todayAttendance.filter(record => !record.clockOut).length;

    const clockedOut =
        todayAttendance.filter(record => record.clockOut).length;

    const totalHours =
        todayAttendance.reduce((sum, record) => {

            return sum + (record.workedMinutes || 0);

        }, 0);

    return {

        employees: employees.length,

        sites: sites.length,

        working,

        clockedOut,

        totalHours: (totalHours / 60).toFixed(2),

        todayAttendance

    };

}