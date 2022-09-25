import React from 'react';
import {SafeAreaView} from 'react-native';
import {ThemeProvider, Button, createTheme} from '@rneui/themed';

const App = () => {
  return (
    <SafeAreaView>
      <ThemeProvider theme={theme}>
        <Button title="My Button" />
        <Button title="My 2nd Button" />
      </ThemeProvider>
    </SafeAreaView>
  );
};

const theme = createTheme({
  lightColors: {
    primary: '#e7e7e8',
  },
  darkColors: {
    primary: '#000',
  },
});

export default App;
