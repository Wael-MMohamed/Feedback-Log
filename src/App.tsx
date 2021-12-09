import Main from './Main'
import { GlobalProvider } from './app/GlobalState'
import './App.css';
import React from 'react';

function App() {
  return (
      <GlobalProvider>
        <Main />
      </GlobalProvider>
  );
}

export default App;
