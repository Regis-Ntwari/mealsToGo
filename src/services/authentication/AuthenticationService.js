import firebase from "firebase/compat/app";

export const LoginRequest = (email, password) => (
    firebase.auth().signInWithEmailAndPassword(email, password)
)