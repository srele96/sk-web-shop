import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import {
  preventUnintendedConnections,
  getFirebaseConfigProtectedFromVCS,
} from './environment';

// CALL BEFORE ANY FIREBASE CONNECTIONS BELOW
preventUnintendedConnections();

const app = initializeApp(getFirebaseConfigProtectedFromVCS());
const auth = getAuth(app);
const firestore = getFirestore(app);

function connectToEmulators() {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(firestore, 'localhost', 8080);
}

process.env.NEXT_PUBLIC_NODE_ENV === 'development' && connectToEmulators();

export { auth, firestore };
