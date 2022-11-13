import React, {useState, Children} from 'react';
import Account from '../pages/Account';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Group from '../pages/Group/index';
import Posts from '../pages/Posts';
import AddRecord from '../pages/AddRecord';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ThemeProvider, Button, createTheme} from '@rneui/themed';
import HomeStackScreen from './HomeStack';
import AddRecordStackScreen from './AddRecordStack';
import {TouchableOpacity, View, Image, StyleSheet} from 'react-native';

const Tab = createBottomTabNavigator();
const theme = createTheme({
  colors: {
    primary: '#61afef',
  },
});

const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow,
    }}>
    <View
      style={{
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#61afef',
      }}>
      {children}
    </View>
  </TouchableOpacity>
);

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
        <Tab.Screen
          name="AddRecord"
          component={AddRecordStackScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Image
                source={require('../assets/icons/plus.png')}
                resizeMode="contain"
                style={{width: 30, height: 30, tintColor: '#fff'}}
              />
            ),
            tabBarButton: props => <CustomTabBarButton {...props} />,
          }}
        />
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

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default app;
