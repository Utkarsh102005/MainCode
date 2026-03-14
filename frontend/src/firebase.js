// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCpgdZzWaVq5jdreuCQ9v5293YRo3JuduU",
  authDomain: "rent-for-cents-demo.firebaseapp.com",
  projectId: "rent-for-cents-demo",
  storageBucket: "rent-for-cents-demo.firebasestorage.app",
  messagingSenderId: "261551919535",
  appId: "1:261551919535:web:8e6742cbdfb7ce7d36df5a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const authentication = getAuth(app);