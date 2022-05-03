import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// USE ENVIRONMENT VARIABLES TO PROTECT API INFORMATION FROM VCS
// THE CONFIG IS BUNDLED WITH THE APP AND SHOULD BE AVAILABLE ON THE CLIENT
// NOT SHARING THIS CONFIG WITH VCS MAKES IT HARDER TO ACCESS THESE VALUES
// BUT DOES NOT MAKE IT IMPOSSIBLE TO ACCESS THEM
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(config);
const auth = getAuth(app);
const firestore = getFirestore(app);

function connectToEmulators() {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(firestore, 'localhost', 8080);
}

process.env.REACT_APP_NODE_ENV === 'development' && connectToEmulators();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// The file is named api.js to avoid name clash when importing it
// When importing auth it looks like this:
// import { auth } from './api';
// If this file was firebase.js then it would look like this:
// import { auth } from './firebase';
// But if developer makes a mistake and forgets to add './' then it would
// look like this:
// import { auth } from 'firebase';
// This is a mistake that should be avoided.
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export { auth, firestore };