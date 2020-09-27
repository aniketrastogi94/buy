import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCXIsDpyqIicPAN-UJK3zMmBCFJ_aj1s8M",
    authDomain: "buymybooks-992c0.firebaseapp.com",
    databaseURL: "https://buymybooks-992c0.firebaseio.com",
    projectId: "buymybooks-992c0",
    storageBucket: "buymybooks-992c0.appspot.com",
    messagingSenderId: "594408373461",
    appId: "1:594408373461:web:8be9f0e1255c43429df65c",
    measurementId: "G-21H56CEXCM"
};
const firebaseApp=firebase.initializeApp(firebaseConfig);
//const auth=firebase.auth();
const storage=firebase.storage();
export {storage};