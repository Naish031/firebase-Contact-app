// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3HMkmvhKCvnedmpG4xGsbkvCZoPblyxo",
  authDomain: "vite-contact-15365.firebaseapp.com",
  projectId: "vite-contact-15365",
  storageBucket: "vite-contact-15365.appspot.com",
  messagingSenderId: "579992862050",
  appId: "1:579992862050:web:1bea5f207076ab96a6403b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

