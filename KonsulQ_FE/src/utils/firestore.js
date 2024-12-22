import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

// Simpan role pengguna
export const saveUserRole = async (user, role) => {
  try {
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: role,
    });
    console.log("Role saved successfully");
  } catch (error) {
    console.error("Error saving role:", error);
  }
};

// Ambil role pengguna
export const getUserRole = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data().role; // Kembalikan role
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting role:", error);
    return null;
  }
};
