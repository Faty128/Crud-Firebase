import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAuJuz_aDl48rsJ7Bfuhx_pmyv3TqtirJ8",
  authDomain: "fatima-ab76f.firebaseapp.com",
  databaseURL: "https://fatima-ab76f-default-rtdb.firebaseio.com",
  projectId: "fatima-ab76f",
  storageBucket: "fatima-ab76f.appspot.com",
  messagingSenderId: "634325734992",
  appId: "1:634325734992:web:651cac46b69ae87e776355"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const imageDb = getStorage();
