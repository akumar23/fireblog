// Import the functions you need from the SDKs you need
import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiY4hCwQm_6IllMZXcGcbThYMu_-v8-v4",
  authDomain: "fireblog-ae817.firebaseapp.com",
  projectId: "fireblog-ae817",
  storageBucket: "fireblog-ae817.appspot.com",
  messagingSenderId: "609399487009",
  appId: "1:609399487009:web:c862b99509166d907f0160",
  measurementId: "G-TGRTW0HWCQ"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();