// import { initializeApp } from "firebase/app";
// import {getFirestore } from "firebase/firestore";


// const firebaseConfig = {
//   apiKey: "AIzaSyAuJuz_aDl48rsJ7Bfuhx_pmyv3TqtirJ8",
//   authDomain: "fatima-ab76f.firebaseapp.com",
//   projectId: "fatima-ab76f",
//   storageBucket: "fatima-ab76f.appspot.com",
//   messagingSenderId: "634325734992",
//   appId: "1:634325734992:web:651cac46b69ae87e776355"
// };

// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvk1RDNVD89TdfF3RiJ0GkC86oNMFs2Bs",
  authDomain: "fatima-e380c.firebaseapp.com",
  projectId: "fatima-e380c",
  storageBucket: "fatima-e380c.appspot.com",
  messagingSenderId: "186088346374",
  appId: "1:186088346374:web:0d36bfa69b6bfcdaa88487"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
