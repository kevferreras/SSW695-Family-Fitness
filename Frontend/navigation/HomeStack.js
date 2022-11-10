import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Friends from '../pages/Friends';
import Home from '../pages/Home';
// main home component
const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      {/* <HomeStack.Screen name="HomePage" component={Home} options={{headerShown: false}}/> */}
      <HomeStack.Screen
        name="Friends"
        component={Friends}
        options={({route}) => ({
          title: route.params?.title,
        })}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;