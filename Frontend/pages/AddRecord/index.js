import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  StyleSheet,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Toast from 'react-native-root-toast';
import Geolocation from 'react-native-geolocation-service';
import {getGeo} from '../../utils/api';
import {Icon, Button} from '@rneui/themed';
import RNPickerSelect from 'react-native-picker-select';

const AddRecord = ({navigation}) => {
  const [address, setAddress] = useState('');
  const [sportsOngoing, setSportsOngoing] = useState(false);
  const [positions, setPositions] = useState([]);
  const [intervalId, setIntervalId] = useState(null);
  let redirectMap = l => {
    clearInterval(intervalId);
    setIntervalId(null);
    // return;
    navigation.navigate('Map', {positions});
    setSportsOngoing(false);
  };
  const positionFunctRef = useRef(checkPermission);
  useEffect(() => {
    positionFunctRef.current = checkPermission;
    checkPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // request location every 5 seconds
  // useEffect(() => {
  //   if (!sportsOngoing) {
  //     return;
  //   }
  //   const intervalId = setInterval(() => {
  //     positionFunctRef.current();
  //   }, 5000);
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [sportsOngoing]);

  let checkPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      // console.log('granted', granted);
      if (granted === 'granted') {
        getLocation();
        // return true;
      } else {
        Toast.show('Location Service not enabled', {
          position: Toast.positions.CENTER,
        });
        // return false;
      }
    } catch (err) {
      Toast.show(JSON.stringify(err), {
        position: Toast.positions.CENTER,
      });
    }
  };

  let getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('position', position);
        let tmpPositions = [...positions];
        tmpPositions.push({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        setPositions(tmpPositions);
        getAddress(position.coords);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  let getAddress = coords => {
    getGeo(`${coords.latitude},${coords.longitude}`)
      .then(res => {
        const data = res.data.results[0];
        setAddress(data.formatted_address);
      })
      .catch(err => {
        console.log('err', err);
      });
  };
  return (
    <View style={{padding: 20}}>
      <Text style={styles.titleText}>Address</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text>{address}</Text>
        <Icon
          onPress={() => {
            checkPermission();
          }}
          type="ionicon"
          name="ios-locate"
          style={{marginLeft: 10}}
        />
      </View>
      {/* select sports */}
      <View style={{marginTop: 20, marginBottom: 20}}>
        <Text style={styles.titleText}>Sports</Text>
        <RNPickerSelect
          placeholder={{
            label: 'Select a sport...',
            value: null,
            color: '#9EA0A4',
          }}
          style={
            Platform.OS === 'ios'
              ? pickerSelectStyles.inputIOS
              : pickerSelectStyles.inputAndroid
          }
          onValueChange={value => console.log(value)}
          items={[
            {label: 'Football', value: 'football'},
            {label: 'Baseball', value: 'baseball'},
            {label: 'Hockey', value: 'hockey'},
          ]}
        />
      </View>
      {/* start exercise */}
      {sportsOngoing ? (
        <Button
          title="End"
          onPress={() => {
            redirectMap();
          }}
        />
      ) : (
        <Button
          title="Start"
          onPress={() => {
            setPositions([]);
            const intervalId = setInterval(() => {
              checkPermission();
            }, 5000);
            setIntervalId(intervalId);
            setSportsOngoing(true);
          }}
        />
      )}
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default AddRecord;
