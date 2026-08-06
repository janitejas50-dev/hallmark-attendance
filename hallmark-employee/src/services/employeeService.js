import {
    collection,
    query,
    where,
    getDocs
} from "firebase/firestore";

import { db } from "../firebase";

const employeesRef = collection(db, "employees");

export async function verifyEmployee(employeeCode, pin) {

    const q = query(
        collection(db, "employees"),
        where("employeeCode", "==", employeeCode),
        where("pin", "==", pin),
        where("active", "==", true)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty)
        return null;

    return {
        id: snapshot.docs[0].id,
        ...snapshot.docs[0].data()
    };

}
export async function verifyEmployeeByCode(employeeCode) {

    const q = query(

        employeesRef,

        where("employeeCode", "==", employeeCode)

    );

    const snapshot = await getDocs(q);

    if (snapshot.empty)
        return null;

    return {

        id: snapshot.docs[0].id,
        ...snapshot.docs[0].data()

    };

}