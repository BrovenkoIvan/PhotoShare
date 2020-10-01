import React, { useContext } from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AuthFormSignup from './../components/AuthFormSignUp'
import {Context} from '../context/AuthContext';
  const SignupScreen = () => {
    const {signup, state} = useContext(Context)
  return (
    <SafeAreaView>
      <AuthFormSignup onSubmit={signup} errorMessage={state.errorMessage}/>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})
export default SignupScreen;
