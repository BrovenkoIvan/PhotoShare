import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {signin, cleanError} from '../redux/actions'

const AuthForm = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {colors} = useTheme();
  const dispatch = useDispatch()
  const state = useSelector((state) => state.auth);
  
  if (state.errorMessage){
    Alert.alert(
      'Error',
      `${state.errorMessage}`,
      [
        {
          text: 'Cancel',
          onPress: () => dispatch(cleanError()),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            dispatch(cleanError()), setEmail(''), setPassword('');
          },
        },
      ],
      {cancelable: false},
    );}

  return (
    <View style={styles.container}>
      <View style={styles.textView}>
        <Text style={{fontSize: 28, color: colors.text}}>Sign in</Text>
      </View>
      <View>
        <View>
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            placeholder={'Email'}
            placeholderTextColor={colors.text}
            style={styles.Input}
            
            
          />
        </View>
        <View>
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
            placeholder={'password'}
            placeholderTextColor={colors.text}
            style={styles.Input}
            secureTextEntry={true}
          />
        </View>
      </View>
      <TouchableOpacity onPress={() => dispatch(signin({email, password}))}>
        <View style={styles.button}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Enter</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 100,
    padding: 15,
  },
  textView: {
    marginBottom: 15,
  },
  Input: {
    borderWidth: 1,
    width: 270,
    height: 40,
    marginTop: 10,
    padding: 10,
    fontSize: 16,
    borderRadius: 8,
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    borderWidth: 2,
    width: 270,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginTop: 25,
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    backgroundColor: '#fff',
  },
});

export default AuthForm;
