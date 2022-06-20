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
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = initializeApp(config);
const auth = getAuth(app);
const firestore = getFirestore(app);

function connectToEmulators() {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(firestore, 'localhost', 8080);
}

process.env.NEXT_PUBLIC_NODE_ENV === 'development' && connectToEmulators();

export { auth, firestore };
