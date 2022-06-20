import { useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../src/api';

function App() {
  // Test if app is using the emulators in development mode
  useEffect(() => {
    addDoc(collection(firestore, 'Users'), { name: 'John Doe' })
      .then(console.log)
      .catch(console.error);
  });
  return <h1>NextJS</h1>;
}

export default App;
