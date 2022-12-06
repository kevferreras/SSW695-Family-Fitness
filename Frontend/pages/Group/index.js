import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, Alert, ScrollView} from 'react-native';
import {ListItem, Button, Dialog, Input} from '@rneui/themed';
import {createGroup, getGroupList} from '../../utils/api';
import Toast from 'react-native-root-toast';

const Group = () => {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  let saveGroup = () => {
    createGroup({
      name: groupName,
      group_description: groupDescription,
    })
      .then(res => {
        refreshPage();
        setGroupName('');
        setGroupDescription('');
        setOpen(false);
      })
      .catch(err => {
        Toast.show(JSON.stringify(err), {
          position: Toast.positions.CENTER,
        });
      });
  };
  let refreshPage = () => {
    getGroupList()
      .then(res => {
        setList(res.data);
      })
      .catch(err => {
        Toast.show(JSON.stringify(err), {
          position: Toast.positions.CENTER,
        });
      });
  };
  useEffect(() => {
    refreshPage();
  }, []);

  return (
    <ScrollView style={styles.groupContainer}>
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
            <ListItem.Subtitle>{l.group_description}</ListItem.Subtitle>
            <ListItem.Subtitle>Number: {l.member}</ListItem.Subtitle>
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
    </ScrollView>
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
