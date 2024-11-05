import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC6xjzJVCM218F83_9nHvVbF50d3aJUpec",
  authDomain: "growth-academy-7f8fd.firebaseapp.com",
  projectId: "growth-academy-7f8fd",
  storageBucket: "growth-academy-7f8fd.firebasestorage.app",
  messagingSenderId: "1031939714385",
  appId: "1:1031939714385:web:57f0d654fe27338edcb770",
  measurementId: "G-WF4MT05H30"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);