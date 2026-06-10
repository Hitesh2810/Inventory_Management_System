import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCodDBkzFL1woxxtxeRNujbNnwfaP095uc",
  authDomain: "inventory-management-sys-bbb50.firebaseapp.com",
  projectId: "inventory-management-sys-bbb50",
  storageBucket: "inventory-management-sys-bbb50.firebasestorage.app",
  messagingSenderId: "354992476041",
  appId: "1:354992476041:web:06711aed81ff53b32b1b58",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();