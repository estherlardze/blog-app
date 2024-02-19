import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyArGO7MjuKe3xmWM3TZIi63Do4bZUI5j14",
  authDomain: "blog-f0031.firebaseapp.com",
  projectId: "blog-f0031",
  storageBucket: "blog-f0031.appspot.com",
  messagingSenderId: "545326476125",
  appId: "1:545326476125:web:09fe7602b88a25301a16b4",
  measurementId: "G-NLWNJG1C24"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

