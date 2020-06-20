import * as firebase from 'firebase';


const config = {
    apiKey: "AIzaSyAUV-EUZIrFFJyjP6hzwJv_tyokdBfogpY",
    authDomain: "presence-detector-8d3bb.firebaseapp.com",
    databaseURL: "https://presence-detector-8d3bb.firebaseio.com",
    projectId: "presence-detector-8d3bb",
    storageBucket: "presence-detector-8d3bb.appspot.com",
    messagingSenderId: "692739385934",
    appId: "1:692739385934:web:272264d23f8243fd5cb11f",
    measurementId: "G-DBJ4W9FQEC"
  };

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const googleAuth = new firebase.auth.GoogleAuthProvider();

export {
    firebase,
    firebaseDB,
    googleAuth
}