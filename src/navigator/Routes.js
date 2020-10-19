import React, {useState, useEffect, useContext} from 'react';
import HomeStack from './HomeStack';
import LoginStack from './LoginStack';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {Context} from '../context/AuthContext';
import auth from '@react-native-firebase/auth';
import Loading from '../components/Loading';
import {AppearanceProvider, useColorScheme, Appearance} from 'react-native';


const Routes = () => {
  const scheme = useColorScheme();
  const {state} = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    state.user = user;
    
    if (initializing) {
      setInitializing(false);
      setLoading(false);
    }
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      {state.user ? <HomeStack /> : <LoginStack />}
    </NavigationContainer>

  );
};

export default Routes;
