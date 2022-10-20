import React, {useContext} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Button} from '@rneui/themed';
import {useTheme} from '@rneui/themed';
import {AuthContext} from '../../context/AuthContext';
import {Avatar} from '@rneui/themed';

const Account = props => {
  const {logout} = useContext(AuthContext);
  const {theme} = useTheme();

  return (
    <View style={styles.wrapper}>
      <View style={styles.midBox}>
        {/* avatar */}
        <View style={styles.avatarBox}>
          <Avatar
            size={100}
            rounded
            source={{
              uri: 'https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg',
            }}
          />
        </View>
        {/* settings box */}
        <View style={styles.settingsBox}>
          <View
            style={[
              styles.settingLineBox,
              {
                borderBottomColor: theme.colors.primary,
                borderTopColor: theme.colors.primary,
                borderTopWidth: 1,
              },
            ]}>
            <Text style={styles.settingLine}>Profile</Text>
          </View>
          <View
            style={[
              styles.settingLineBox,
              {borderBottomColor: theme.colors.primary},
            ]}>
            <Text style={styles.settingLine}>Account Settings</Text>
          </View>
        </View>
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
  avatarBox: {
    alignItems: 'center',
  },
  midBox: {
    padding: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  settingsBox: {
    marginTop: 20,
    marginBottom: 20,
  },
  settingLineBox: {
    height: 50,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  settingLine: {
    fontSize: 20,
  },
});

export default Account;
