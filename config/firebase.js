import { initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDndJpYeKOOYGnJD_dUVs0gUbgzYbm4WE8',
  authDomain: 'lg-eshop.firebaseapp.com',
  projectId: 'lg-eshop',
  storageBucket: 'lg-eshop.appspot.com',
  messagingSenderId: '1050225456013',
  appId: '1:1050225456013:web:a48e41b1d1a91504f343c4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
