import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyD4WIdQ0v08YA43JVK0xOJjayqh50WVf7c",
//   authDomain: "metro-tickets-management.firebaseapp.com",
//   projectId: "metro-tickets-management",
//   storageBucket: "metro-tickets-management.appspot.com",
//   messagingSenderId: "816163871291",
//   appId: "1:816163871291:web:af6841dd6cf47602f55a1e",
// };

const firebaseConfig = {
  apiKey: "AIzaSyAU82xZslXZa-WC21JChpADxeBMWNZWkyU",
  authDomain: "metro-app-24a40.firebaseapp.com",
  projectId: "metro-app-24a40",
  storageBucket: "metro-app-24a40.firebasestorage.app",
  messagingSenderId: "1030208243433",
  appId: "1:1030208243433:web:ce8b3e110c82b50ceed278",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);
const db = getFirestore(app);

export const loginPassenger = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signupPassenger = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export { auth, db };
