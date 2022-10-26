import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

const FlashPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Family Sports</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default FlashPage;
