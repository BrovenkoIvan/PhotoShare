import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SigninScreen from '../screens/SigninScreen'
import SignupScreen from '../screens/SignupScreen'

const Stack = createStackNavigator();

const LoginStack = () => {
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

  export default LoginStack