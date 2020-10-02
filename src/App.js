import React from 'react';
import {Provider as AuthProvider} from './context/AuthContext';
import Routes from './navigator/Routes'

const App = () => {
  return (
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  );
};
export default App;
