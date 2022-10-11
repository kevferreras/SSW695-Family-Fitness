import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {ListItem, Avatar} from '@rneui/themed';

const Home = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={{paddingBottom: 15}}>
        {list.map((l, i) => (
          <ListItem key={i} bottomDivider style={styles.listItem}>
            <Avatar
              source={
                l.avatar_url
                  ? {uri: l.avatar_url}
                  : require('../../static/Images/Home/default-people.jpg')
              }
            />
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
              <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
              {/* tags */}
              <View style={styles.tagContainer}>
                {l.tags &&
                  l.tags.map((element, index) => (
                    <View
                      key={index}
                      style={{
                        borderRadius: 4,
                        backgroundColor: '#2387df',
                        marginRight: 5,
                        marginBottom: 3,
                      }}>
                      <Text style={styles.tag} key={index}>
                        {element}
                      </Text>
                    </View>
                  ))}
              </View>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </ScrollView>
  );
};

const list = [
  {
    name: 'Amy Farha',
    avatar_url:
      'https://images.pexels.com/photos/746386/pexels-photo-746386.jpeg?auto=compress&cs=tinysrgb&w=1600',
    subtitle: 'Vice President',
    tags: ['swimming', 'basketball', 'swimming', 'basketball', 'swimming', 'basketball'],
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://images.pexels.com/photos/746386/pexels-photo-746386.jpeg?auto=compress&cs=tinysrgb&w=1600',
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Amy Farha',
    avatar_url:
      'https://images.pexels.com/photos/746386/pexels-photo-746386.jpeg?auto=compress&cs=tinysrgb&w=1600',
    subtitle: 'Vice President',
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://images.pexels.com/photos/746386/pexels-photo-746386.jpeg?auto=compress&cs=tinysrgb&w=1600',
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Amy Farha',
    avatar_url:
      'https://images.pexels.com/photos/746386/pexels-photo-746386.jpeg?auto=compress&cs=tinysrgb&w=1600',
    subtitle: 'Vice President',
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://images.pexels.com/photos/746386/pexels-photo-746386.jpeg?auto=compress&cs=tinysrgb&w=1600',
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Amy Farha',
    avatar_url:
      'https://images.pexels.com/photos/746386/pexels-photo-746386.jpeg?auto=compress&cs=tinysrgb&w=1600',
    subtitle: 'Vice President',
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://images.pexels.com/photos/746386/pexels-photo-746386.jpeg?auto=compress&cs=tinysrgb&w=1600',
    subtitle: 'Vice Chairman',
  },
];

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    padding: 3,
    color: '#fff',
  },
  listItem: {
    marginTop: 5,
  },
});

export default Home;
