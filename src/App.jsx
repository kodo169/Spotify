import './App.css';
import MainSpotify from './components/MainSpotify.jsx';
import Login from './components/mainLogin.jsx'
import { useEffect } from 'react';
import { useStateProvider } from './utils/StateProvider.jsx';
import {reducerCases }from './utils/Contants.js';
import React from 'react';
function App() {

  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      if (token) {
        dispatch({ type: reducerCases.SET_TOKEN, token });
      }
    }
    document.title = "Spotify";
  }, [dispatch, token]);
  return (
    <div className="App">
      {
         token ? <MainSpotify/>  :<Login /> 
      }
    </div>
  );
}

export default App;
