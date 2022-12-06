import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import {useTheme} from '@rneui/themed';

const tokyoRegion = {
  latitude: 35.6762,
  longitude: 139.6503,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};
const chibaRegion = {
  latitude: 35.6074,
  longitude: 140.1065,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const Map = ({navigation, route}) => {
  const {theme} = useTheme();

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={tokyoRegion}>
        <Polyline
          coordinates={[tokyoRegion, chibaRegion]} //specify our coordinates
          strokeColor={theme.colors.primary}
          strokeWidth={3}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
