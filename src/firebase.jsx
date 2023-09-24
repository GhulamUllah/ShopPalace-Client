// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKd5jQbken-qCAbd7qvUaoC2mJzuB5Ci0",
  authDomain: "intern-project-f11a6.firebaseapp.com",
  projectId: "intern-project-f11a6",
  storageBucket: "intern-project-f11a6.appspot.com",
  messagingSenderId: "478590834319",
  appId: "1:478590834319:web:d201366d517be219a282fa",
  measurementId: "G-G5P98153V2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const Storage = getStorage(app);