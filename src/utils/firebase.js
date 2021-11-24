/**
 * handles importing and configuration of firebase & firestore
 */

import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBHUrRgnZ_CP7evfiOM9p6GFV9R9tMNNRs",
  authDomain: "teamcashcalendar.firebaseapp.com",
  databaseURL: "https://teamcashcalendar-default-rtdb.firebaseio.com",
  projectId: "teamcashcalendar",
  storageBucket: "teamcashcalendar.appspot.com",
  messagingSenderId: "282118636879",
  appId: "1:282118636879:web:d837964ece0725a7eeb13a"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

const firestore = firebase.firestore();

export { firestore }