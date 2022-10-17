import React, {useContext} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Button} from '@rneui/themed';
import {useTheme} from '@rneui/themed';
import {AuthContext} from '../../context/AuthContext';

const Account = props => {
  const {logout} = useContext(AuthContext);
  const {theme} = useTheme();

  return (
    <View style={styles.wrapper}>
      <View style={styles.midBox}>
        {/* log out button */}
        <Button
          buttonStyle={{backgroundColor: theme.colors.primary}}
          title="Log out"
          onPress={() => {
            logout();
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
