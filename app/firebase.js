// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEPZAgIR1kaP4t3OsB6FiQ7oRTgQdZY-A",
  authDomain: "pantryapp-297c7.firebaseapp.com",
  projectId: "pantryapp-297c7",
  storageBucket: "pantryapp-297c7.appspot.com",
  messagingSenderId: "95970325247",
  appId: "1:95970325247:web:2b00d522a75b34884752ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };