import logo from './logo.svg';
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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className='text-red-400'>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
