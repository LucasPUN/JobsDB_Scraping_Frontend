// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCwIL2ZlfvodEWOSFBMqLsnzltbFsdRkvU",
  authDomain: "venturenix-jobsdb-scraping.firebaseapp.com",
  projectId: "venturenix-jobsdb-scraping",
  storageBucket: "venturenix-jobsdb-scraping.appspot.com",
  messagingSenderId: "453084239017",
  appId: "1:453084239017:web:6aeae04c4c407df99405b8",
  measurementId: "G-Y63CSQ5S3B"
};

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);
export default firebase_app;