import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ContentScreen from '../screens/ContentScreen'
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator()
const HomeStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{header: () => true}}/>
      <Tab.Screen name="Content" component={ContentScreen} />
    </Tab.Navigator>
  );
};

export default HomeStack;
