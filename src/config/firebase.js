import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyAuJuz_aDl48rsJ7Bfuhx_pmyv3TqtirJ8",
//   authDomain: "fatima-ab76f.firebaseapp.com",
//   databaseURL: "https://fatima-ab76f-default-rtdb.firebaseio.com",
//   projectId: "fatima-ab76f",
//   storageBucket: "fatima-ab76f.appspot.com",
//   messagingSenderId: "634325734992",
//   appId: "1:634325734992:web:651cac46b69ae87e776355"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAXWnrYRN_mZGGuzF8qLTVXQruHZ2XvA20",
  authDomain: "fir-crud-92be8.firebaseapp.com",
  databaseURL: "https://fir-crud-92be8-default-rtdb.firebaseio.com",
  projectId: "fir-crud-92be8",
  storageBucket: "fir-crud-92be8.appspot.com",
  messagingSenderId: "75453801971",
  appId: "1:75453801971:web:d6b0a814a0f2bc27f15e86"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const imageDb = getStorage();