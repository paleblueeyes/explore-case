import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAyAd0nrX_gQ4h7SP2b13R20oGoSouKEkY",
    authDomain: "utflukt-8e4be.firebaseapp.com",
    projectId: "utflukt-8e4be",
    storageBucket: "utflukt-8e4be.appspot.com",
    messagingSenderId: "957956879112",
    appId: "1:957956879112:web:87866a974d9c1fcbe632bd",
    measurementId: "G-SGYBBZCQ88"
  };

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}