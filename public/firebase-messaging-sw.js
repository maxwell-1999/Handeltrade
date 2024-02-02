console.log("Loading service worker...");

function callApi(url, requestData) {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });
}

console.log("Before firebase load...");

importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

console.log("After firebase load...");

if (typeof firebase !== 'undefined') {

  console.log("Firebase loaded...");

  firebase.initializeApp({
    apiKey: "AIzaSyCCAD16awvFkw-miZ4ZTh-mHg91lBAcYVw",
    authDomain: "handelnetwork.firebaseapp.com",
    databaseURL: "https://handelnetwork-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "handelnetwork",
    storageBucket: "handelnetwork.appspot.com",
    messagingSenderId: "1082881637112",
    appId: "1:1082881637112:web:38af36852e46aba86a190d",
    measurementId: "G-7XR78M1SB5"
  });

  const messaging = firebase.messaging();
  console.log({ messaging });

  messaging.onBackgroundMessage((payload) => {
    console.log('Received background message ', payload);
    // Customize notification here
    if (payload.data) {
      const notificationTitle = payload.data.title;
      const notificationOptions = {
        body: payload.data.body,
        icon: 'Logo.svg',
        tag: payload.data.title,
        data: payload.data,
      };
      self.registration.showNotification(notificationTitle, notificationOptions);
    }
  });

  self.addEventListener("notificationclick", (event) => {
    console.log("Notification click: ", event);
    console.log("Notification config: ", getFirebaseConfigs());
    if (getFirebaseConfigs().is_popup_on) {
      if (event.notification.data) {
        console.log("On notification click: ", event.notification.data);
        event.notification.close();
        // This looks to see if the current is already open and
        // focuses if it is
        event.waitUntil(
          clients
            .matchAll({
              type: "window",
            })
            .then((clientList) => {
              for (const client of clientList) {
                if (client.url == event.notification.data.openPath && "focus" in client) return client.focus();
              }
              return clients.openWindow(event.notification.data.openPath);
            }),
        );
      }
    }
  });

} else {
  console.error("Firebase not loaded");
}
