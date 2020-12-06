import React from 'react';
import { Provider } from 'react-redux'
import store from './redux/reducers'
import Routes from './navigator/Routes'

const App = () => {
  return (
    <Provider store={store}>
      <Routes/>
    </Provider>
  );
};
export default App;
