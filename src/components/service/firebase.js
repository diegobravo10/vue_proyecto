
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGEmHvcBftNw50sUF6VaZa8I6Pn6ouIDA",
  authDomain: "vuedb-d8ad3.firebaseapp.com",
  projectId: "vuedb-d8ad3",
  storageBucket: "vuedb-d8ad3.firebasestorage.app",
  messagingSenderId: "472654592101",
  appId: "1:472654592101:web:8bb9ee41b8f7551b44ae8c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);