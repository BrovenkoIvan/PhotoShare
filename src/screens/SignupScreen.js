import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import AuthFormSignup from './../components/AuthFormSignUp';

const SignupScreen = ({navigation}) => {
  return (
    <SafeAreaView style={style.container}>
      <View>
        <AuthFormSignup />
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
