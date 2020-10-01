import React, {useContext} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
} from 'react-native';
import AuthForm from './../components/AuthForm';
import {Context} from '../context/AuthContext';

const SigninScreen = ({navigation}) => {
  const {signin, state, clearErrorMessage} = useContext(Context);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formView}>
        <AuthForm onSubmit={signin} errorMessage={state.errorMessage} />
      </View>
      <View style={styles.textView}>
        <Text>You dont't have an account.</Text>
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
