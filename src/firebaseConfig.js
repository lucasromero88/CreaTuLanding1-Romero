// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAx6m-i0vXK1NvSroKi3RC_m0W6GRolzG0",
  authDomain: "ecommerce-back-8b950.firebaseapp.com",
  projectId: "ecommerce-back-8b950",
  storageBucket: "ecommerce-back-8b950.firebasestorage.app",
  messagingSenderId: "887594618018",
  appId: "1:887594618018:web:93a92ebbf590434f2b5bfb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);