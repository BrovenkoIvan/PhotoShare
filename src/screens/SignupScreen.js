import React, {useContext, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import AuthFormSignup from './../components/AuthFormSignUp';
import {Context} from '../context/AuthContext';

const SignupScreen = ({navigation}) => {
  console.log('sign up screen')
  const {signup, state, clearErrorMessage} = useContext(Context);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      clearErrorMessage()
    })
    return unsubscribe
  },[navigation])
  return (
    <SafeAreaView style={style.container}>
      <View>
        <AuthFormSignup onSubmit={signup} errorMessage={state.errorMessage} />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SignupScreen;
