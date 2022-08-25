import './App.css';
import React, { useEffect, useState } from 'react';

import { doc, getDoc, query, orderBy, onSnapshot, collection } from 'firebase/firestore';
import {db, getTripIdMaps, registerUserOnTrip} from './firebase'



function App() {  
  
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    registerUserOnTrip('Oazw7tXQK4XTI5XBh8nB', 'lMPCZ7ggn4lOWQZsvlun')
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
