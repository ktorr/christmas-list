// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, doc, updateDoc, deleteDoc, getDoc, query, orderBy } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwWFsCScx4K0liriRkhQEwHqMMxmNRKa8",
  authDomain: "christmas-list-c6596.firebaseapp.com",
  projectId: "christmas-list-c6596",
  storageBucket: "christmas-list-c6596.appspot.com",
  messagingSenderId: "25018542173",
  appId: "1:25018542173:web:590c83080ef6de84ddc5b4",
  measurementId: "G-ZEJZG8MLJ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, onSnapshot, doc, updateDoc, deleteDoc, getDoc, query, orderBy };
//const analytics = getAnalytics(app);