import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDvCDcyJwJNqbKohPw1zZXyl9xoHp5d-Nc",
    authDomain: "todo-74524.firebaseapp.com",
    projectId: "todo-74524",
    storageBucket: "todo-74524.appspot.com",
    messagingSenderId: "820077420893",
    appId: "1:820077420893:web:629995ff4261f9480148b4",
    measurementId: "G-J96V7WKWF8"
  };

  const app  = initializeApp(firebaseConfig);
  export const db = getFirestore(app);