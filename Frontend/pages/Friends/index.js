import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

const Friends = ({navigation, route}) => {
  return (
    <View>
      <Text style={styles.baseText}>
        <Text style={styles.titleText}>Friends</Text>
        <Text>{route.params.title}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Friends;
