// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyB7GaqnxetvxtVALUKrU_pqVrtZSpqClJg",
  authDomain: "my-project-fd5eb.firebaseapp.com",
  projectId: "my-project-fd5eb",
  storageBucket: "my-project-fd5eb.appspot.com",
  messagingSenderId: "402033209617",
  appId: "1:402033209617:web:c8c1e968452cbe6d43dcb0",
  measurementId: "G-FZ0PEH37Z3",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
