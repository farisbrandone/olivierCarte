import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDVLs9ZTU8F5JuderX7A3tprvPtmSpmgx0",
  authDomain: "carte-interactive-e3ecd.firebaseapp.com",
  projectId: "carte-interactive-e3ecd",
  storageBucket: "carte-interactive-e3ecd.appspot.com",
  messagingSenderId: "293631422400",
  appId: "1:293631422400:web:6adbc60f1ba0f23a0be225",
  measurementId: "G-BNSYY511FN",
};

const appForStorage = initializeApp(firebaseConfig);
const db = getFirestore(appForStorage);
const auth = getAuth(appForStorage);

export { db, auth, appForStorage };
