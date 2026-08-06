import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase";

const collectionRef = collection(db, "sites");

export async function getSites() {

    const snapshot = await getDocs(collectionRef);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

}

export async function saveSite(site) {

    await addDoc(collectionRef, {

        siteCode: site.siteCode,
        name: site.name,
        address: site.address,
        latitude: Number(site.latitude),
        longitude: Number(site.longitude),
        radius: Number(site.radius),

        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()

    });

}

export async function updateSite(id, site) {

    await updateDoc(doc(db, "sites", id), {

        siteCode: site.siteCode,
        name: site.name,
        address: site.address,
        latitude: Number(site.latitude),
        longitude: Number(site.longitude),
        radius: Number(site.radius),

        updatedAt: serverTimestamp()

    });

}

export async function deleteSite(id) {

    await deleteDoc(
        doc(db, "sites", id)
    );

}