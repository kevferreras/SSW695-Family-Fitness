import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './pages/Home/index';
import Group from './pages/Group/index';
import Posts from './pages/Posts';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = 'ios-home';
                break;
              case 'Group':
                iconName = 'ios-chatbubbles';
                break;
              case 'Posts':
                iconName = 'ios-newspaper';
                break;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Group" component={Group} />
        <Tab.Screen name="Posts" component={Posts} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
