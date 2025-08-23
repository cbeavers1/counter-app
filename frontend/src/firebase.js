import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBC5yGKD0CbQDJBu-DMNFhCcMYkDaRsOA8",
  authDomain: "counter-app-2b405.firebaseapp.com",
  projectId: "counter-app-2b405",
  storageBucket: "counter-app-2b405.firebasestorage.app",
  messagingSenderId: "680516670088",
  appId: "1:680516670088:web:f17993ea2321e9169ec53d",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);