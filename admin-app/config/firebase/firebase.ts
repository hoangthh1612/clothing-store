// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANOzsddl8vY4jIErEMVnCcDtI77Jloa28",
  authDomain: "images-d1361.firebaseapp.com",
  projectId: "images-d1361",
  storageBucket: "images-d1361.appspot.com",
  messagingSenderId: "75563471033",
  appId: "1:75563471033:web:d7714622fe4388d8becb68",
  measurementId: "G-1Y9DGYEEVK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app)
export const storage = getStorage(app);