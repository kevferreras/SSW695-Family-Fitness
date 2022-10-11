import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './pages/Home/index';
import Group from './pages/Group/index';
import Posts from './pages/Posts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from './pages/Login';
import {ThemeProvider, Button, createTheme} from '@rneui/themed';

const Tab = createBottomTabNavigator();
const theme = createTheme({
  colors: {
    primary: '#ff5a43',
  },
});

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  let login = (
    <ThemeProvider theme={theme}>
      <Login setIsLogin={setIsLogin} />
    </ThemeProvider>
  );

  let app = (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
  return isLogin ? app : login;
};

export default App;
