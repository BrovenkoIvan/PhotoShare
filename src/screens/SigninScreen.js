import React, {useContext, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import AuthForm from './../components/AuthForm';
import {Context} from '../context/AuthContext';
import { useTheme } from '@react-navigation/native';

const SigninScreen = ({navigation}) => {
  console.log('sign in screen')
  const { colors } = useTheme();
  const {signin, state, clearErrorMessage} = useContext(Context);
  useEffect(() => {
    const unsubscribe = navigation.addListener('willfocus', () => {
      clearErrorMessage()
    })
    return unsubscribe
  },[navigation])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formView}>
        <AuthForm onSubmit={signin} errorMessage={state.errorMessage} />
      </View>
      <View style={styles.textView}>
        <Text style={{ color: colors.text }}>You dont't have an account.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={{color: 'blue'}}>Signup</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formView: {
    marginTop: 130,
  },
  textView: {
    marginBottom: 15,
    flexDirection: 'row',
  },
});
export default SigninScreen;
