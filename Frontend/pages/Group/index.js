import React, {useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {ListItem, Button, Dialog, Input} from '@rneui/themed';

const Group = () => {
  const [list, setList] = useState([
    {
      name: 'Running Group',
      subtitle: 'Enjoy running',
    },
    {
      name: 'Hiking Group',
      subtitle: 'Enjoy hiking',
    },
  ]);
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  let saveGroup = () => {
    setList([...list, {name: groupName, subtitle: groupDescription}]);
    setGroupName('');
    setGroupDescription('');
    setOpen(false);
  };

  return (
    <View style={styles.groupContainer}>
      <Button
        onPress={() => {
          setOpen(true);
        }}>
        Add Group
      </Button>
      {list.map((l, i) => (
        <ListItem key={i} style={styles.listItem}>
          <ListItem.Content>
            <ListItem.Title>{l.name}</ListItem.Title>
            <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}

      <Dialog
        overlayStyle={{backgroundColor: '#fff'}}
        isVisible={open}
        onBackdropPress={() => {
          setOpen(false);
        }}>
        <Dialog.Title title="Add group" />
        <Input
          placeholder="GroupName"
          value={groupName}
          onChangeText={v => setGroupName(v)}
        />
        <Input
          placeholder="Description"
          value={groupDescription}
          onChangeText={v => setGroupDescription(v)}
        />
        <Button
          onPress={() => {
            saveGroup();
          }}>
          Sunbmit
        </Button>
      </Dialog>
    </View>
  );
};

const list = [
  {
    name: 'Amy Farha',
    subtitle: 'Vice President',
  },
  {
    name: 'Chris Jackson',
    subtitle: 'Vice Chairman',
  },
];

const styles = StyleSheet.create({
  groupContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listItem: {
    borderWidth: 2,
    borderRadius: 16,
    borderColor: '#dadada',
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
});

export default Group;
