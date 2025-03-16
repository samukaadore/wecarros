
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBaC00mdb1pOX0x1wyO0Ib2C_w03IafqUo",
  authDomain: "webcarros-e1364.firebaseapp.com",
  projectId: "webcarros-e1364",
  storageBucket: "webcarros-e1364.firebasestorage.app",
  messagingSenderId: "153953106476",
  appId: "1:153953106476:web:c22e44aec5969ab54b6f89"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app);
const storage = getStorage(app);

export {db, auth, storage};