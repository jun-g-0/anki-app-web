import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAPg7U3PkL0IOAtg4FVYH1yq3Ec3YjluJ0',
  authDomain: 'anki-dev.firebaseapp.com',
  databaseURL:
    'https://anki-dev-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'anki-dev',
  storageBucket: 'anki-dev.appspot.com',
  messagingSenderId: '555101731765',
  appId: '1:555101731765:web:2d382c2d9e9653df74b7fc',
  measurementId: 'G-JV4NFCV4VP',
};

firebase.initializeApp(firebaseConfig);
export default firebase;
export const db = firebase.firestore();
