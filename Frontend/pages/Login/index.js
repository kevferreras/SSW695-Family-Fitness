import React, {useState} from 'react';
import {Text, StyleSheet, View, SafeAreaView} from 'react-native';
import {Input} from '@rneui/themed';
import {Button} from '@rneui/themed';
import {useTheme} from '@rneui/themed';
import {logIn} from '../../utils/api';

const Login = props => {
  const {theme} = useTheme();
  const [register, setRegister] = useState(true);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  let login = async () => {
    console.log(userName, password);
    const response = await logIn();
    const responseJson = await response.json();
    console.log(responseJson);

    props.setIsLogin(true);
  };

  let registerUser = async () => {
    console.log(userName, password);
    const response = await logIn();
    const responseJson = await response.json();
    console.log(responseJson);

    props.setIsLogin(true);
  };

  let changeMode = () => {
    setUserName('');
    setPassword('');
    setRegister(!register);
  };

  const SignIn = (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.form}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>Sign in</Text>
        <Input
          placeholder="Name"
          value={userName}
          onChangeText={v => setUserName(v)}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={v => setPassword(v)}
          secureTextEntry={true}
        />
        <Button
          onPress={login}
          title="Submit"
          buttonStyle={{backgroundColor: theme.colors.primary}}
        />
        <Text
          onPress={() => changeMode()}
          style={[styles.notice, {color: theme.colors.primary}]}>
          Don't have an account? Create here.
        </Text>
      </View>
    </SafeAreaView>
  );

  const Register = (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.form}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>Sign up</Text>
        <Input
          placeholder="Name"
          value={userName}
          onChangeText={v => setUserName(v)}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={v => setPassword(v)}
          secureTextEntry={true}
        />
        <Button
          onPress={() => {
            registerUser();
          }}
          title="Create Account"
          buttonStyle={{backgroundColor: theme.colors.primary}}
        />
        <Text
          onPress={() => changeMode()}
          style={[styles.notice, {color: theme.colors.primary}]}>
          Already have an account? Log in here.
        </Text>
      </View>
    </SafeAreaView>
  );

  return register ? Register : SignIn;
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  form: {
    padding: 20,
  },
  formLine: {
    display: 'flex',
    alignContent: 'baseline',
  },
  notice: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    paddingTop: 15,
  },
});

export default Login;
