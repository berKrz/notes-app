import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyDx5__FZsAQGT-FfWt-ckx_mBr3UyIbWuk',
  authDomain: 'notesapp-d9378.firebaseapp.com',
  projectId: 'notesapp-d9378',
  storageBucket: 'notesapp-d9378.firebasestorage.app',
  messagingSenderId: '664665811049',
  appId: '1:664665811049:web:2b1f6100238b6da10fdaf8'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
