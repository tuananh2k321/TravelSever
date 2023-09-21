// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9ezQlOj2HZzJcdGwsERN4GjYiersb1GM",
  authDomain: "travelapp-3e538.firebaseapp.com",
  projectId: "travelapp-3e538",
  storageBucket: "travelapp-3e538.appspot.com",
  messagingSenderId: "579542678002",
  appId: "1:579542678002:web:5dd5b62019867affea136b",
  measurementId: "G-Z8HBLEHY6X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

module.exports = app
