import firebase from 'firebase';

import FirebaseService from './firebaseService';
const firebaseConfig = {
  apiKey: 'AIzaSyApy1VB9ENzXTjyABftKFf0t7DpF5itsRw',
  authDomain: 'smart-menu-794bf.firebaseapp.com',
  databaseURL: 'https://smart-menu-794bf.firebaseio.com',
  projectId: 'smart-menu-794bf',
  storageBucket: 'smart-menu-794bf.appspot.com',
  messagingSenderId: '491231259664',
  appId: '1:491231259664:web:e615a08b2ef6e32d946e95',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default new FirebaseService(firebase);