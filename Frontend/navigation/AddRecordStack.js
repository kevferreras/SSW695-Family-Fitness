import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Map from '../pages/Map';
import AddRecord from '../pages/AddRecord';
// main home component
const AddRecordStack = createNativeStackNavigator();

const AddRecordStackScreen = () => {
  return (
    <AddRecordStack.Navigator>
      {/* <AddRecordStack.Screen name="AddRecordScreen" component={AddRecord} /> */}
      <AddRecordStack.Screen
        name="AddRecordScreen"
        component={AddRecord}
        options={{headerShown: false}}
      />
      <AddRecordStack.Screen
        name="Map"
        component={Map}
        options={({route}) => ({
          // title: route.params?.title,
        })}
      />
    </AddRecordStack.Navigator>
  );
};

export default AddRecordStackScreen;
