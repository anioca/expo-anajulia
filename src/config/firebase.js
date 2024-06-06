import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBcItgox5cTjizBTs_2XYKsx28YL51IhK4",
    authDomain: "expo-anajulia.firebaseapp.com",
    projectId: "expo-anajulia",
    storageBucket: "expo-anajulia.appspot.com",
    messagingSenderId: "802508317715",
    appId: "1:802508317715:web:3b7498e743ce5f8b068be6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);