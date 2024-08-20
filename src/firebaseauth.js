// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , setPersistence, browserSessionPersistence} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCp8Ma6v25pTF1UnCkZwphkbMjGI76HS6A",
  authDomain: "knockit-8b5bd.firebaseapp.com",
  projectId: "knockit-8b5bd",
  storageBucket: "knockit-8b5bd.appspot.com",
  messagingSenderId: "912188914950",
  appId: "1:912188914950:web:d0202c9eb47fdd63e6b287",
  measurementId: "G-1QRPSRTHER"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig) ;
const database=getFirestore(app);
 const auth=getAuth(app)
 const storageInstance =getStorage(app);
 setPersistence(auth,browserSessionPersistence)

 export {database, auth,storageInstance }