// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0zVV2uSBv-7WHASssRZuhMBmEaA6me_Y",
  authDomain: "cazainsectos-69b70.firebaseapp.com",
  projectId: "cazainsectos-69b70",
  storageBucket: "cazainsectos-69b70.firebasestorage.app",
  messagingSenderId: "856140849043",
  appId: "1:856140849043:web:52cd97380e579caa491266"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);