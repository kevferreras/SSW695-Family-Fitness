import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView, Platform} from 'react-native';
import {ListItem, Avatar} from '@rneui/themed';
import {useTheme} from '@rneui/themed';
import {SearchBar} from '@rneui/themed';
import {Icon} from '@rneui/themed';

const Home = ({navigation}) => {
  const {theme} = useTheme();
  const [searchWord, setSearchWord] = useState('');
  let redirectFriends = l => {
    navigation.navigate('Friends', {title: l.name});
  };
  let search = word => {
    setSearchWord(word);
  };
  let clearSearch = () => {
    setSearchWord('');
  };
  return (
    <ScrollView style={styles.scrollView}>
      <SearchBar
        round
        searchIcon={<Icon name="search-outline" type="ionicon" />}
        clearIcon={<Icon name="close-outline" type="ionicon" />}
        cancelIcon={<Icon name="close-outline" type="ionicon" />}
        placeholder="Search Here..."
        platform="ios"
        onChangeText={search}
        onCancel={() => clearSearch()}
        showCancel={false}
        onClear={clearSearch}
        rightIconContainerStyle={{display: 'none'}}
        value={searchWord}
      />
      <View style={{paddingBottom: 15}}>
        {list
          .filter(e => e.name.toLowerCase().includes(searchWord.toLowerCase()))
          .map((l, i) => (
            <ListItem key={i} style={styles.listItem}>
              {/* name */}
              <ListItem.Content>
                <ListItem.Title>
                  <Text
                    style={{
                      color: theme.colors.primary,
                      textDecorationLine: 'underline',
                    }}
                    onPress={() => redirectFriends(l)}>
                    {l.name}
                  </Text>{' '}
                  completed a workout
                </ListItem.Title>
                {/* type and duration */}
                <View style={styles.bottomBox}>
                  <Avatar
                    source={
                      l.avatar_url
                        ? {uri: l.avatar_url}
                        : require('../../static/Images/Home/default-people.jpg')
                    }
                  />
                  <View style={{paddingLeft: 5, paddingRight: 5}}>
                    <Text>Workout Type: Running, Lifting</Text>
                    <Text>Workout duration: In progress</Text>
                  </View>
                </View>

                {/* tags */}
                {/* <View style={styles.tagContainer}>
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
              </View> */}
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
    tags: [
      'swimming',
      'basketball',
      'swimming',
      'basketball',
      'swimming',
      'basketball',
    ],
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
    borderWidth: 2,
    borderRadius: 16,
    borderColor: '#dadada',
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  bottomBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default Home;
