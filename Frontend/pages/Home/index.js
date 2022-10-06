import React from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';

const Home = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.text}>Home</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#888888',
  },
  text: {
    fontSize: 42,
  },
});

export default Home;
