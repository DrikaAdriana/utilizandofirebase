
import { initializeApp } from 'firebase/app'
import { getFirestore} from 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyCtxixGaJ9aZtLvFH-4rbNsC8uDaQ8U2F0",
  authDomain: "curso-99846.firebaseapp.com",
  projectId: "curso-99846",
  storageBucket: "curso-99846.appspot.com",
  messagingSenderId: "641571528694",
  appId: "1:641571528694:web:08383546e40cc40c41b1d7",
  measurementId: "G-BX6BYBJLCK"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export {db};