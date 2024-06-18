import {initializeApp} from "firebase/app";
import {firebaseConfig} from "./FirebaseConfig";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup, signOut
} from "firebase/auth";


export const serviceInit = () => {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // Initialize Firebase
  initializeApp(firebaseConfig);
}

// https://firebase.google.com/docs/auth/web/start#sign_in_existing_users
export const handleSignInWithEmailAndPassword = async (email: string, password: string): Promise<boolean> => {
  try {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password);
    // Signed in
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// https://firebase.google.com/docs/auth/web/google-signin#before_you_begin
export const handleSignInWithGoogle = async (): Promise<boolean> => {
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    await signInWithPopup(auth, provider);
    // Signed in
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const getAccessToken = (): Promise<string> | null => {
  const currentUser = getAuth().currentUser;
  if (!currentUser) {
    return null;
  }
  return currentUser.getIdToken(false);
}

export const handleSignOut = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
}