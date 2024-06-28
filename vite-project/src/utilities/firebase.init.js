// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOj6OddmOVa4Pd3O6Umg4f1Hbgatb02BE",
  authDomain: "vencap-d9711.firebaseapp.com",
  projectId: "vencap-d9711",
  storageBucket: "vencap-d9711.appspot.com",
  messagingSenderId: "389709055486",
  appId: "1:389709055486:web:25bcc25c074999d5436caf",
  measurementId: "G-FEJ4J52LY0"
};

// Initialize Firebase
const initializeFirebase = () => {
    initializeApp(firebaseConfig)
}

// Initialize Firebase
export default initializeFirebase;
