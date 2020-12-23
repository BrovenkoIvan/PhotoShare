import React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import AuthForm from './../components/AuthForm';
import { useTheme } from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../components/Loading';

const SigninScreen = ({navigation}) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formView}>
        <AuthForm />
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
