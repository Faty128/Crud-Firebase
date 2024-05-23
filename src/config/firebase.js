import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBvk1RDNVD89TdfF3RiJ0GkC86oNMFs2Bs",
  authDomain: "fatima-e380c.firebaseapp.com",
  projectId: "fatima-e380c",
  storageBucket: "fatima-e380c.appspot.com",
  messagingSenderId: "186088346374",
  appId: "1:186088346374:web:0d36bfa69b6bfcdaa88487"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const imageDb = getStorage();
