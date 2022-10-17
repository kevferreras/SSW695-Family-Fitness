import React, {useState, useContext} from 'react';
import {Text, StyleSheet, View, SafeAreaView} from 'react-native';
import {Input} from '@rneui/themed';
import {Button} from '@rneui/themed';
import {useTheme} from '@rneui/themed';
import Toast from 'react-native-root-toast';
import {AuthContext} from '../../context/AuthContext';

const Login = props => {
  const {theme} = useTheme();
  const [isRegister, setIsRegister] = useState(true);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const {login, register} = useContext(AuthContext);
  // register method
  let registerUser = () => {
    if (
      firstName === '' ||
      lastName === '' ||
      userName === '' ||
      password === ''
    ) {
      Toast.show('Fields can not be empty', {position: Toast.positions.CENTER});
    }
    register({
      first_name: firstName,
      last_name: lastName,
      username: userName,
      password,
    });
  };

  let changeMode = () => {
    setUserName('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setIsRegister(!isRegister);
  };

  const SignIn = (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.form}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>Sign in</Text>
        <Input
          placeholder="UserName"
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
            if (userName === '' || password === '') {
              Toast.show('Fields can not be empty', {
                position: Toast.positions.CENTER,
              });
              return;
            }
            login({username: userName, password});
          }}
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
          placeholder="First Name"
          value={firstName}
          onChangeText={v => setFirstName(v)}
        />
        <Input
          placeholder="Last Name"
          value={lastName}
          onChangeText={v => setLastName(v)}
        />
        <Input
          placeholder="UserName"
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

  return isRegister ? Register : SignIn;
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
