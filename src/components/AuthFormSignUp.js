import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {signup} from '../redux/actions'

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { colors } = useTheme();
  const dispatch = useDispatch()
  return (
    <View style={styles.container}>
      <View style={styles.textView}>
        <Text style={{color: colors.text, fontSize: 28}}>Sign up</Text>
      </View>
      <View>
        <View>
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            value={name}
            onChangeText={setName}
            placeholder={'name'}
            placeholderTextColor={colors.text}
            style={styles.Input}
          />
        </View>
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
      { name && email && password ? <TouchableOpacity onPress={() => dispatch(signup({email, password, name}))}>
        <View style={styles.button}>
          <Text >Enter</Text>
        </View>
      </TouchableOpacity> : null}
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
  text: {
    fontSize: 28,
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
