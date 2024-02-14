// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmsBjVs8nCnXVTuslfEeASfPHLu29p7oM",
  authDomain: "trove-5562d.firebaseapp.com",
  projectId: "trove-5562d",
  storageBucket: "trove-5562d.appspot.com",
  messagingSenderId: "418190465387",
  appId: "1:418190465387:web:faf78960c4e17ef636d42e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
