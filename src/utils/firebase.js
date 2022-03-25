// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA4q6pZF76DIqpgbZXwf8kTxXJj2jwSQy8',
  authDomain: 'ws-mvp-host.firebaseapp.com',
  projectId: 'ws-mvp-host',
  storageBucket: 'ws-mvp-host.appspot.com',
  messagingSenderId: '704045593399',
  appId: '1:704045593399:web:7102431d2079af3f46a0b2'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
