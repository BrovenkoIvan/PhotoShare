import React, {useState, useEffect, useContext} from 'react';
import HomeStack from './HomeStack';
import LoginStack from './LoginStack';
import {NavigationContainer} from '@react-navigation/native';
import {Context} from '../context/AuthContext';
import auth from '@react-native-firebase/auth';
import Loading from '../components/Loading'
const Routes = () => {
  const { state } = useContext(Context);
    const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  console.log(state)

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
    setLoading(false);
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  });
  
  if (loading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <LoginStack />}
    </NavigationContainer>
  );
};

export default Routes;
