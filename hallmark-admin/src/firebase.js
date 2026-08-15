import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2eoRcFFm_Ad-yHqTT9MUX3EhPmxlvkSs",
  authDomain: "hallmark-attendence.firebaseapp.com",
  projectId: "hallmark-attendence",
  storageBucket: "hallmark-attendence.firebasestorage.app",
  messagingSenderId: "505211021145",
  appId: "1:505211021145:web:b7de58422872a480794e48"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);