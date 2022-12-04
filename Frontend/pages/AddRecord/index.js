import React, {useEffect, useState, useRef, useContext} from 'react';
import {
  Text,
  StyleSheet,
  View,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import Toast from 'react-native-root-toast';
import Geolocation from 'react-native-geolocation-service';
import {getGeo} from '../../utils/api';
import {Icon, Button} from '@rneui/themed';
import RNPickerSelect from 'react-native-picker-select';
import {AuthContext} from '../../context/AuthContext';
import {logworkout} from '../../utils/api';
import {CoolWPDistance, formatDate} from '../../utils/utils';

const AddRecord = ({navigation}) => {
  const [sportsType, setSportsType] = useState('');
  const [startTime, setStartTime] = useState('');
  const [address, setAddress] = useState('');
  const [sportsOngoing, setSportsOngoing] = useState(false);
  const [positions, setPositions] = useState([]);
  const [intervalId, setIntervalId] = useState(null);
  const {userToken} = useContext(AuthContext);
  let redirectMap = l => {
    clearInterval(intervalId);
    setIntervalId(null);
    // return;
    navigation.navigate('Map', {positions});
    sendLogWorkOut();
    setSportsOngoing(false);
  };
  useEffect(() => {
    checkPermission(true);
    checkPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let sendLogWorkOut = () => {
    let endTime = new Date();
    const params = {
      name: sportsType + 'Workout',
      workout_type: sportsType,
      workout_intensity: '1',
      workout_duration: (endTime.getTime() - startTime.getTime()) / 1000,
      start_time: formatDate(startTime, 'yyyy-MM-dd hh:mm'),
      end_time: formatDate(endTime, 'yyyy-MM-dd hh:mm'),
      total_distance:
        positions.length < 1
          ? 0
          : CoolWPDistance(
              positions[0].latitude,
              positions[0].longitude,
              positions[positions.length - 1].latitude,
              positions[positions.length - 1].longitude,
            ),
      gps_coordinates: JSON.stringify(positions),
    };
    console.log('sendLogWorkOut', params);
    logworkout(params).catch(err => {
      console.log('logworkoutError', err);
    });
  };
  let checkPermission = async (getCurr = false) => {
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
        if (getCurr) {
          getRealLocation();
        } else {
          getLocation();
        }
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
  let getRealLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        let tmpPositions = [
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
        ];
        setPositions(tmpPositions);
        getAddress(position.coords);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {
        maximumAge: 0,
        timeout: 5000,
        enableHighAccuracy: true,
        forceLocationManager: true,
      },
    );
  };
  let getLocation = () => {
    Geolocation.watchPosition(
      position => {
        let tmpPositions = [
          ...positions,
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
        ];
        console.log('tmpPositions', tmpPositions);
        setPositions(tmpPositions);
        getAddress(position.coords);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {
        maximumAge: 0,
        timeout: 5000,
        enableHighAccuracy: true,
        forceLocationManager: true,
      },
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
            // checkPermission();
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
          onValueChange={value => {
            setSportsType(value);
          }}
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
            if (sportsType == '') {
              Alert.alert('select a sport');
              return;
            }
            if (positions.length > 0) {
              setPositions([positions[positions.length - 1]]);
            } else {
              setPositions([]);
            }
            console.log('Afertset', positions);
            setStartTime(new Date());
            checkPermission(true);
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
