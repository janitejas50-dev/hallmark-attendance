import { db } from "../firebase";

import {
    collection,
    getDocs,
    doc,
    setDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp
} from "firebase/firestore";

export async function getEmployees() {

    const snapshot = await getDocs(
        collection(db, "employees")
    );

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

}

export async function saveEmployee(employee) {

    await setDoc(
        doc(db, "employees", employee.code),
        {

            employeeCode: employee.code,
            name: employee.name,
            pin: employee.pin,

            assignedSites: [],
            primarySite: "",
            
            active: true,

            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()

        }
    );

}

export async function updateEmployee(code, data) {

    await updateDoc(
        doc(db, "employees", code),
        {

            ...data,

            updatedAt: serverTimestamp()

        }
    );

}

export async function deleteEmployee(code) {

    await deleteDoc(
        doc(db, "employees", code)
    );

}