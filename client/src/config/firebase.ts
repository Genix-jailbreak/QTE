import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAIcw1SiuylNQljvO8ETDyLWbWkpBxwkHo",
    authDomain: "queenz-treats-n-events.firebaseapp.com",
    projectId: "queenz-treats-n-events",
    storageBucket: "queenz-treats-n-events.firebasestorage.app",
    messagingSenderId: "344173229583",
    appId: "1:344173229583:web:ad476f96225cf8b784557a",
    measurementId: "G-R5KW85V38B"
    // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    // authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    // projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    // storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    // appId: import.meta.env.VITE_FIREBASE_APP_ID,
    // measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

let analytics;
if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
}

export { app, analytics }