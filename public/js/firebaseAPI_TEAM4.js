import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCEHXZCIBjL7EkO0KopMOlLATi36_WsQHo",
    authDomain: "bby4comp1800.firebaseapp.com",
    projectId: "bby4comp1800",
    storageBucket: "bby4comp1800.firebasestorage.app",
    messagingSenderId: "377118059220",
    appId: "1:377118059220:web:1b50772fa66f21ab306941",
    measurementId: "G-R6GD32WJ3X"
  };

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();