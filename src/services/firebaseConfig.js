import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC81AEilZahqA-hL4erEEAKQAnYefGDBlc",
    authDomain: "quiz-8962e.firebaseapp.com",
    projectId: "quiz-8962e",
    storageBucket: "quiz-8962e.firebasestorage.app",
    messagingSenderId: "365309315839",
    appId: "1:365309315839:web:ad54a874b5d96379441aca",
    measurementId: "G-TF49SVHDBR"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };