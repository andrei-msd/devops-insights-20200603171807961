import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCL1nILfyiuoXvn1FgzoUk6QfaMrVR-WOk",
    authDomain: "massive-dynamo-279220.firebaseapp.com",
    databaseURL: "https://massive-dynamo-279220.firebaseio.com",
    projectId: "massive-dynamo-279220",
    storageBucket: "massive-dynamo-279220.appspot.com",
    messagingSenderId: "13476477792",
    appId: "1:13476477792:web:94df8514de78baf368bc05",
    measurementId: "G-RYXX2MWEZR"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase;

