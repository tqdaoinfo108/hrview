import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyBSaUpxI1iJyLQYh3y-oyB9WDd83RKaBZA",
    authDomain: "donet2020-f86ab.firebaseapp.com",
    databaseURL: "https://donet2020-f86ab.firebaseio.com",
    projectId: "donet2020-f86ab",
    storageBucket: "donet2020-f86ab.appspot.com",
    messagingSenderId: "894917177033",
    appId: "1:894917177033:web:6e6875b1aaf212b2182718",
    measurementId: "G-43R950WCGC",
    serverKey: "",
    webPushCert: ""
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

const firestore = firebase.firestore();

const storage = firebase.storage();

let messaging = null;
// let messaging = firebase.messaging();


// if (firebase.messaging.isSupported()) {
//     console.log(firebase)
//     messaging = firebase.messaging();
//     messaging.usePublicVapidKey(firebaseConfig.webPushCert);
// }

// console.log("messaging", messaging)

export { database, firestore, storage, messaging, firebaseConfig };
