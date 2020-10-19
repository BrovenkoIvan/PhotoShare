import React from 'react';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ContentScreen from '../screens/ContentScreen';
import PostFormScreen from '../screens/PostFormScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ContentStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Content" component={ContentScreen} />
      <Stack.Screen
        name="Post Form"
        component={PostFormScreen}
        options={{header: () => false}}
      />
    </Stack.Navigator>
  );
};
const Home = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName;
          if (route.name === 'Home')
            iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Content')
            iconName = focused ? 'list-circle' : 'list-circle-outline';
          return <Ionicons name={iconName} size={38} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'rgb(0, 205, 251)',
        inactiveTintColor: 'rgb(130, 80, 90)',
        showLabel: false,
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Content" component={ContentStack} />
    </Tab.Navigator>
  );
};

export default HomeStack;
