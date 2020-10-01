import React, { useContext } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { Context } from '../context/AuthContext'

const AccountScreen = () => {
const { logout } = useContext(Context)
    return(
        <View>
            <Text>Account Screen</Text>
            <Button title='logout' onPress={() => logout()}/> 
        </View>
    )
}

export default AccountScreen