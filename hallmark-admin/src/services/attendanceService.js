import {
    collection,
    getDocs,
    query,
    orderBy
} from "firebase/firestore";

import { db } from "../firebase";

const attendanceRef = collection(db, "attendance");

export async function getAttendance() {

    const q = query(
        attendanceRef,
        orderBy("clockIn", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

}