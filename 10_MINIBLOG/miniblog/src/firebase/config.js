import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firebase"

const firebaseConfig = {
  apiKey: "AIzaSyDmbEMIirfX_S8rICC_42mjHfRlDrap5EM",
  authDomain: "miniblog-13f8b.firebaseapp.com",
  projectId: "miniblog-13f8b",
  storageBucket: "miniblog-13f8b.appspot.com",
  messagingSenderId: "620736534530",
  appId: "1:620736534530:web:c0282cd3db71588dd86f1b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db }