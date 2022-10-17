import React, {useState} from 'react';
import Account from '../pages/Account';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Group from '../pages/Group/index';
import Posts from '../pages/Posts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ThemeProvider, Button, createTheme} from '@rneui/themed';
import HomeStackScreen from './HomeStack';

const Tab = createBottomTabNavigator();
const theme = createTheme({
  colors: {
    primary: '#61afef',
  },
});

const app = () => {
  return (
    <ThemeProvider theme={theme}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            switch (route.name) {
              case 'HomeStackScreen':
                iconName = 'ios-home';
                break;
              case 'Group':
                iconName = 'ios-chatbubbles';
                break;
              case 'Posts':
                iconName = 'ios-newspaper';
                break;
              case 'Account':
                iconName = 'ios-person';
                break;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarStyle: {display: getTabBarVisibility(route)},
          tabBarActiveTintColor: '#61afef',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          tabBarShowLabel: false,
        })}>
        <Tab.Screen name="HomeStackScreen" component={HomeStackScreen} />
        <Tab.Screen name="Group" component={Group} />
        <Tab.Screen name="Posts" component={Posts} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
    </ThemeProvider>
  );
};

const getTabBarVisibility = route => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
  if (routeName === 'Friends') {
    return 'none';
  }
  return 'flex';
};

export default app;
