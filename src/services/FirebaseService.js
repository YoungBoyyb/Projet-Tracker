import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBahlXsvhEdmpcDUjC2k6K0Fh0McgGk2dw",
  authDomain: "vue-tracker-yngb.firebaseapp.com",
  projectId: "vue-tracker-yngb",
  storageBucket: "vue-tracker-yngb.appspot.com",
  messagingSenderId: "109490523462",
  appId: "1:109490523462:web:6cd8a70d2459ea8495a947",
  measurementId: "G-EJ3JNF0VDB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service

/* Exportations */
export const Auth = getAuth(app);

export async function register(email, password) {
  try {
    const res = await createUserWithEmailAndPassword(Auth, email, password);
    return [res, null];
  } catch (error) {
    return [null, error.code];
  }
}

export async function login(email, password) {
  try {
    const res = await signInWithEmailAndPassword(Auth, email, password);
    return [res, null];
  } catch (error) {
    return [null, error.code];
  }
}

export async function logout() {
  try {
    await Auth.signOut();
    return [true, null];
  } catch (error) {
    return [null, error.code];
  }
}

// Messages d'erreur
const errorsTranslations = {
  "auth/email-already-in-use":
    "L'email indiqué est déjà lié à un compte existant",
  "auth/invalid-email": "L'email n'a pas un bon format",
  "auth/operation-not-allowed":
    "La connexion via email & mot de passe n'est pas activée",
  "auth/weak-password":
    "Le mot de passe est trop faible (moins de 6 caractères)",
  "auth/user-disabled": "Le compte lié à cet email est désactivé",
  "auth/user-not-found": "Le compte lié à cet email n'existe pas",
  "auth/wrong-password": "Le mot de passe ne correspond pas à ce compte",
};

export function translateErrorCode(errorCode) {
  if (errorsTranslations[errorCode]) {
    return errorsTranslations[errorCode];
  } else {
    return `Erreur inconnue au sein de Firebase. (${errorCode})`;
  }
}
