import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

const Group = () => {
  return (
    <View>
      <Text style={styles.baseText}>
        <Text style={styles.titleText}>Posts</Text>
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

export default Group;
