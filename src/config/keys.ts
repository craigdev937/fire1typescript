import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBA1MX7U2KKOftnpLqFjnPUssN0apg8sg8",
    authDomain: "fire1typescript.firebaseapp.com",
    projectId: "fire1typescript",
    storageBucket: "fire1typescript.appspot.com",
    messagingSenderId: "19080546835",
    appId: "1:19080546835:web:63374a7c26855de5d8cde6"
};

const app = initializeApp(firebaseConfig);
export const dBase = getFirestore(app);
export const fStorage = getStorage(app);



