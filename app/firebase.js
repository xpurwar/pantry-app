// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPk_xD5GJ4-JTFBDLL0J8SpzUVrhGSE5c",
  authDomain: "hspantry-fc111.firebaseapp.com",
  projectId: "hspantry-fc111",
  storageBucket: "hspantry-fc111.appspot.com",
  messagingSenderId: "84337343314",
  appId: "1:84337343314:web:28c4fdeb6c9ca24108988b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };