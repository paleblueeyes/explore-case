import './App.css';
import React, { useEffect } from 'react';

import {registerUserOnTrip, cancelRegistration} from './firebase'



function App() {  
  
  useEffect(() => {
    registerUserOnTrip('Oazw7tXQK4XTI5XBh8nB', 'lMPCZ7ggn4lOWQZsvlun')
    cancelRegistration('Oazw7tXQK4XTI5XBh8nB', 'lMPCZ7ggn4lOWQZsvlun')
  } , [])

//  useEffect(() => {
//    const q = query(collection(db, 'trips')) //, orderBy('ID', 'desc'))
//    onSnapshot(q, (querySnapshot) => {
//      querySnapshot.forEach((doc) => {
//        setDocID(docIDs => [...docIDs, doc.id])
//      })
//      
//    })
//    console.log(docIDs);
//  },[db])
  
  
  return (
    <div className="App">
    </div>
  );
}

export default App;
