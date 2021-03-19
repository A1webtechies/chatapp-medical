import firebase from "firebase";

const Config = {
  apiKey: "AIzaSyCZvkFmbJeOUMNJMReX1Ok64bNaEG8GxQI",
  authDomain: "leanon-c1f07.firebaseapp.com",
  projectId: "leanon-c1f07",
  storageBucket: "leanon-c1f07.appspot.com",
  messagingSenderId: "405547384243",
  appId: "1:405547384243:web:9f9132cc78a39f14acdfc6",
  measurementId: "G-NHP7503YWK",
};

// Initialize Firebase
firebase.initializeApp(Config);
firebase.analytics();
export default firebase;
