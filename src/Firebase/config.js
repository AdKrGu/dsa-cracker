import firebase from "firebase/app";
import "firebase/storage";

var config = {
	apiKey: "AIzaSyAiPUBsaLNre-pNV8PEA54KSuRNH_Yuj_k",
	authDomain: "dsa-cracker-2f39f.firebaseapp.com",
	databaseURL: "https://dsa-cracker-2f39f.firebaseio.com",
	projectId: "dsa-cracker-2f39f",
	storageBucket: "dsa-cracker-2f39f.appspot.com",
	messagingSenderId: "694442309258",
	appId: "1:694442309258:web:4d94d2e974ca5562769f73",
	measurementId: "G-W56FMRT8VG",
};

firebase.initializeApp(config);

const storage = firebase.storage;

export { storage, firebase as default };
