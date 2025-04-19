import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from "../config/firebase";

const db = getFirestore(app);

export const saveUserRole = async (uid, role) => {
    await setDoc(doc(db, "users", uid), { role });
};

export const getUserRole = async (uid) => {
    const docSnap = await getDoc(doc(db, "users", uid));
    return docSnap.exists() ? docSnap.data().role : null;
};

export { db };
