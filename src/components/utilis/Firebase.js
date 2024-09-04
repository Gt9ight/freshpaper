import { initializeApp } from 'firebase/app';
import {getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyDL-s4SbKOSPrYrgrS1EqtlSh-dZFznamo",
  authDomain: "freshpaper-a4e92.firebaseapp.com",
  projectId: "freshpaper-a4e92",
  storageBucket: "freshpaper-a4e92.appspot.com",
  messagingSenderId: "670170968921",
  appId: "1:670170968921:web:39c80ebe4c223927099248"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage()