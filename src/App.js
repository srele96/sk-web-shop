import { useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from './api';

function App() {
  // Test if app is using the emulators in development mode
  useEffect(() => {
    addDoc(collection(firestore, 'Users'), { name: 'John Doe' })
      .then(console.log)
      .catch(console.error);
  });
  return <div></div>;
}

export default App;
/**
 * Migrate to NextJS.
 */
