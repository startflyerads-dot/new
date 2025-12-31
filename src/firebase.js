import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBrPrFvFFpNaRfY2RzeeRiCbAfAP-qUvNc",
  authDomain: "startflyer-52b09.firebaseapp.com",
  projectId: "startflyer-52b09",
  storageBucket: "startflyer-52b09.firebasestorage.app",
  messagingSenderId: "748051769459",
  appId: "1:748051769459:web:c0580dfd51625a6f12a206",
  measurementId: "G-1QRSZ9ZCZG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let analytics;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch (err) {
    // analytics may fail in some environments — keep app usable
    // eslint-disable-next-line no-console
    console.warn("Firebase analytics not initialized:", err);
  }
}

export { app, auth, db, analytics };
export default app;