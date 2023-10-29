import { getApp, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBYst4OUKONiZE8Ov1pghev2WOXZ638bBM",
  authDomain: "react-task-manager-c1a85.firebaseapp.com",
  projectId: "react-task-manager-c1a85",
  storageBucket: "react-task-manager-c1a85.appspot.com",
  messagingSenderId: "329926765670",
  appId: "1:329926765670:web:f4dd108e3b2da3ff08d1a7",
  measurementId: "G-7DR65FDDR9"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);