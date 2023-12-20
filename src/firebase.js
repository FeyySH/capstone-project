// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBjpNncU7UyjOi5dhtrWnWKHwmXaZNIMgI",
    authDomain: "capstone-project-dc441.firebaseapp.com",
    projectId: "capstone-project-dc441",
    storageBucket: "capstone-project-dc441.appspot.com",
    messagingSenderId: "146326925549",
    appId: "1:146326925549:web:47a105585960d5845d9ce4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

