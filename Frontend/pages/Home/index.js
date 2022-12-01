import React, {useState, useEffect, useContext} from 'react';
import {Text, View, StyleSheet, ScrollView, Platform} from 'react-native';
import {ListItem, Avatar} from '@rneui/themed';
import {useTheme} from '@rneui/themed';
import {SearchBar} from '@rneui/themed';
import {Icon} from '@rneui/themed';
import {homePage} from '../../utils/api';
import {AuthContext} from '../../context/AuthContext';

const Home = ({navigation}) => {
  const {userToken} = useContext(AuthContext);
  const {theme} = useTheme();
  const [searchWord, setSearchWord] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    homePage(userToken).then(res => {
      console.log('homepage data, ', res.data);
      setList(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let redirectFriends = l => {
    navigation.navigate('Friends', {title: l.name});
  };
  let redirectMap = l => {
    navigation.navigate('Map');
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
                    <Text onPress={() => redirectMap()}>
                      Workout Type: {l.workout_type}
                    </Text>
                    <Text>Workout duration: {l.workout_duration}</Text>
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
