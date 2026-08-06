import {
    collection,
    getDocs
} from "firebase/firestore";

import { db } from "../firebase";

const collectionRef = collection(db, "sites");

export async function getSiteByCode(siteCode) {

    const snapshot = await getDocs(collectionRef);

    const sites = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    return sites.find(site => site.siteCode === siteCode);

}