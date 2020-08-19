import firebase from 'firebase'

 const firebaseConfig = {
    apiKey: "AIzaSyDd30NORGz7wD5Ejq__bvHza7_RuSyjf1M",
    authDomain: "quizapp-74b3d.firebaseapp.com",
    databaseURL: "https://quizapp-74b3d.firebaseio.com",
    projectId: "quizapp-74b3d",
    storageBucket: "quizapp-74b3d.appspot.com",
    messagingSenderId: "374075757776",
    appId: "1:374075757776:web:494bea8a44bcc3dd163ad5"
  };
  
  firebase.initializeApp(firebaseConfig)
  export default firebase;