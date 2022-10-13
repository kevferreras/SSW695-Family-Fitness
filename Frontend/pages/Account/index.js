import React from 'react';
import {Text, StyleSheet, View, Alert} from 'react-native';
import {Button} from '@rneui/themed';
import {logout} from '../../utils/api';

const Account = props => {
  const signOut = async () => {
    try {
      const response = await logout();
      const responseJson = await response.json();
      console.log(responseJson);
      props.setIsLogin(false);
    } catch (e) {
      Alert.alert(JSON.stringify(e));
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.midBox}>
        {/* log out button */}
        <Button
          title="Log out"
          onPress={() => {
            signOut();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  midBox: {
    padding: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Account;
