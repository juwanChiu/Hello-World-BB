import firebase from "firebase/app";
import "firebase/database";

let config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_DOMAIN,
  databaseURL: "https://helloworldbb-suki-default-rtdb.firebaseio.com",
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};


if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase.database();
