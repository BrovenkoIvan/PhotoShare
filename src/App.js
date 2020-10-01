import React, {useState, useEffect, useContext} from 'react';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import AccountScreen from './screens/AccountScreen';
import {Provider as AuthProvider} from './context/AuthContext';
import Loading from './components/Loading';
import { Context } from './context/AuthContext'
const Stack = createStackNavigator();

const loginStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Signin"
        component={SigninScreen}
        options={{header: () => false}}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{header: () => false}}
      />
    </Stack.Navigator>
  );
};
const App = () => {
  const { setUser } = useContext(Context)
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) 
      setInitializing(false);
      setLoading(false);
    
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  });
  if (loading) {
    return <Loading />;
  }
  console.log('user',user)
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {user == null? (
            <Stack.Screen
              name="login"
              component={loginStackScreen}
              options={{header: () => false}}
            />
          ) : (
            <Stack.Screen name="Account" component={AccountScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};
export default App;
