import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBGWbSM6ReFPFDNqetylrSEp4hISLKprMY",
  authDomain: "mern-crud-d5e86.firebaseapp.com",
  projectId: "mern-crud-d5e86",
  storageBucket: "mern-crud-d5e86.appspot.com",
  messagingSenderId: "846758391120",
  appId: "1:846758391120:web:3705fd224854f3debdd055"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

export { storage };