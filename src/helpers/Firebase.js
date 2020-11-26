import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";
import { firebaseConfig } from "../constants/defaultValues";

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const store = firebase.firestore();
const database = firebase.database();
const storage = firebase.storage();

export { auth, database, store, storage };
