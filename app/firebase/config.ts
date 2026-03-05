// app/firebase/config.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7V-UFZ4J-OKAdpFdZuqNb9MNqhzE_DY0",
  authDomain: "ferreteria-pronto-norte.firebaseapp.com",
  projectId: "ferreteria-pronto-norte",
  storageBucket: "ferreteria-pronto-norte.firebasestorage.app",
  messagingSenderId: "155448216724",
  appId: "1:155448216724:web:2f87ee41bb8dccd84bb881",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);