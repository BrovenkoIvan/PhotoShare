import React, {useState, useEffect} from 'react';
import HomeStack from './HomeStack';
import LoginStack from './LoginStack';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../components/Loading';
import {
  AppearanceProvider,
  useColorScheme,
  Appearance,
} from 'react-native-appearance';
import {setUser} from '../redux/actions';

const Routes = () => {
  const scheme = useColorScheme();
  // const {state} = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const onAuthStateChanged = (user) => {
    dispatch(setUser({user}));

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
    <AppearanceProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        {user ? <HomeStack /> : <LoginStack />}
      </NavigationContainer>
    </AppearanceProvider>
  );
};

export default Routes;
