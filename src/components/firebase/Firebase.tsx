import React from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCAD16awvFkw-miZ4ZTh-mHg91lBAcYVw",
  authDomain: "handelnetwork.firebaseapp.com",
  databaseURL: "https://handelnetwork-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "handelnetwork",
  storageBucket: "handelnetwork.appspot.com",
  messagingSenderId: "1082881637112",
  appId: "1:1082881637112:web:38af36852e46aba86a190d",
  measurementId: "G-7XR78M1SB5"
};

export default function Firebase() {

  console.log("Firebase is mounted");
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  console.log({ app });
  const analytics = getAnalytics(app);
  console.log({ analytics });
  // Initialize Firebase Cloud Messaging and get a reference to the service
  const messaging = getMessaging(app);
  console.log({ messaging });
  const vapidkey = "BDUQ5xujC26EnowMHg2vaM-Sl1vwNoYLTbSJyMtOSPPTZbCPRf3izbWQg3JGBu_lz35FUqQsXxW5ArDhW2PMoA4";

  const token = async () => {
    try {
      console.log("Fetching token...");
      const currentToken = await getToken(messaging, {
        vapidKey: vapidkey,
      });
      if (currentToken) {
        console.log({ currentToken });
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    } catch (error) {
      console.log("Error occured:", error);
    }
  };

  return (
    <div className='m-2 items-center'>
      <h1>Firebase</h1>
      <button className='p-2 rounded-lg bg-orange-300' onClick={() => token()}>Get Token</button>
      <br />
      <button className='p-2 rounded-lg bg-orange-300' onClick={() => {
        console.log("Start Listning..");
      }}>Start Listning..</button>
    </div>
  );
}
