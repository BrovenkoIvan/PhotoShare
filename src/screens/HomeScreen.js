import React, {useContext} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {Context} from '../context/AuthContext';

const AccountScreen = () => {
  const {logout, state} = useContext(Context);
  return (
    <View>
      <Text>Account Screen</Text>
      <Button title="logout" onPress={() => logout()} />
      <Text>Hello {state.user.uid}</Text>
    </View>
  );
};

export default AccountScreen;
