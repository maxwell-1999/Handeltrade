import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";

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

console.log("Firebase is mounted");
// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log({ app });
const analytics = getAnalytics(app);
console.log({ analytics });
// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);
console.log({ messaging });
export const vapidkey = "BDUQ5xujC26EnowMHg2vaM-Sl1vwNoYLTbSJyMtOSPPTZbCPRf3izbWQg3JGBu_lz35FUqQsXxW5ArDhW2PMoA4";


export const getFirebaseDeviceToken = (): Promise<boolean> => {
  let currentToken = "";
  return new Promise(async (resolve, reject) => {
    try {
      // this may fail due to insatllation of firebase service worker
      console.log("Fetching token...");
      currentToken = await getToken(messaging, {
        vapidKey: vapidkey,
      });
    } catch (error) {
      console.log("Error occured:", error);
    }

    if (!currentToken || currentToken == "") {
      // if token is not available, try to get it again
      try {
        console.log("Fetching token again...");
        currentToken = await getToken(messaging, {
          vapidKey: vapidkey,
        });
      } catch (error) {
        console.log("Error occured:", error);
      }
    }

    console.log({ currentToken });
    if (currentToken && currentToken != "") resolve(true);
    else reject(false);
  });
};