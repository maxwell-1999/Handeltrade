import React from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCAD16awvFkw-miZ4ZTh-mHg91lBAcYVw",
  authDomain: "handelnetwork.firebaseapp.com",
  projectId: "handelnetwork",
  storageBucket: "handelnetwork.appspot.com",
  messagingSenderId: "1082881637112",
  appId: "1:1082881637112:web:38af36852e46aba86a190d",
  measurementId: "G-7XR78M1SB5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default function Firebase() {
  return (
    <div className='m-2'>
      <h1>Firebase</h1>
    </div>
  );
}
