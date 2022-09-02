import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes'

import './global.css';
import { AuthContextProvider } from './context/AuthContext';

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        
          <Routes />
        
      </AuthContextProvider>
      </Router>
  );
}

export default App