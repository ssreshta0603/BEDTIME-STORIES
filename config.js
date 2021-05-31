import firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyACwdnIwc_3DEOIN8wG89GJkNmkbTKtO-A",
  authDomain: "storyhub-d8984.firebaseapp.com",
  projectId: "storyhub-d8984",
  storageBucket: "storyhub-d8984.appspot.com",
  messagingSenderId: "1071716011747",
  appId: "1:1071716011747:web:900c3b4ff743152d3c7fd6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();