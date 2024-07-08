// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBr-VOWGErINS_tjh5RXBPBKDKNryP0Iug",
  authDomain: "mote-438de.firebaseapp.com",
  projectId: "mote-438de",
  storageBucket: "mote-438de.appspot.com",
  messagingSenderId: "59204283171",
  appId: "1:59204283171:web:2c62c3e231e76fa6503a96",
  measurementId: "G-M4LC809L1K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
