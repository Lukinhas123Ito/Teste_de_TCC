import { initializeApp }  from 'firebase/app';
import { getAuth } from  'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig =  {
  apiKey: "AIzaSyDSj0H2h5xJI0fz_QWXAqrxRF1XpmZeyV8",
  authDomain: "cantina-app-tcc.firebaseapp.com",
  projectId: "cantina-app-tcc",
  storageBucket: "cantina-app-tcc.appspot.com",
  messagingSenderId: "399872952492",
  appId: "1:399872952492:web:6df66b26294229d2cf7709",
  measurementId: "G-6KFTCLTV29"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);