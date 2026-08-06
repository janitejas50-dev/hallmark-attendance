import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase";

const attendanceRef = collection(db, "attendance");

export async function findOpenAttendance(employeeId) {

    const q = query(

        attendanceRef,

        where("employeeId", "==", employeeId),
        where("status", "==", "IN")

    );

    const snapshot = await getDocs(q);

    if (snapshot.empty)
        return null;

    return {

        id: snapshot.docs[0].id,
        ...snapshot.docs[0].data()

    };

}

export async function clockIn(employee, site, location) {

    const docRef = await addDoc(collection(db, "attendance"), {

        employeeId: employee.id,
        employeeCode: employee.employeeCode,
        employeeName: employee.name,

        siteId: site.id,
        siteCode: site.siteCode,
        siteName: site.name,

        clockIn: serverTimestamp(),
        clockOut: null,

        status: "IN",

        latitude: location.latitude,
        longitude: location.longitude,
        accuracy: location.accuracy,

        createdAt: serverTimestamp()

    });

    return {

    id: docRef.id,

    employeeId: employee.id,
    employeeCode: employee.employeeCode,
    employeeName: employee.name,

    siteId: site.id,
    siteCode: site.siteCode,
    siteName: site.name,

    clockIn: new Date(),
    clockOut: null,

    latitude: location.latitude,
    longitude: location.longitude,

    status: "IN"

};

}

export async function clockOut(attendanceId, location) {

    await updateDoc(

        doc(db, "attendance", attendanceId),

        {

            clockOut: serverTimestamp(),

            clockOutLatitude: location.latitude,
            clockOutLongitude: location.longitude,

            status: "OUT",

            updatedAt: serverTimestamp()

        }

    );

}