import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

import { doc, getDoc } from 'firebase/firestore';
import {db} from './firebase'



function App() {
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "Mock-data", "Utflukt");
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    fetchData();
  }, [db]);
  
  
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
