import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../lib/firebase';

export function getUserData() {
    const [user] = useAuthState(auth);
    const[username, setUserName] = useState(null);
  
    useEffect(() => {
      let unsub;
  
      if (user) {
        const ref = firestore.collection('users').doc(user.uid);
        unsub = ref.onSnapshot((doc) => {
          setUserName(doc.data()?.username);
        });
      } else {
        setUserName(null);
      }
  
      return unsub;
  
    }, [user]);

    return {user, username};
}