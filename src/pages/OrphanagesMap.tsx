import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity} from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import mapMarker from '../images/map-marker.png';
import { useNavigation } from '@react-navigation/native';

export default function OrphanagesMap(){
  const navigation = useNavigation();
  function handleNavigateToOrphanageDetails(){
    navigation.navigate('OrphanageDetails')
  }


  return (

    <View style={styles.container}>
      <MapView style={styles.map}
        provider={ PROVIDER_GOOGLE }
        initialRegion={{
         latitude: -2.446211,
         longitude: -54.71079,
         longitudeDelta: 0.008,
         latitudeDelta: 0.008
        }}>
          <Marker
          icon={mapMarker}
          calloutAnchor={{
            x:5.8,
            y:1.5,
          }}
          coordinate={{
            latitude: -2.446211,
            longitude: -54.71079,
          }}

          >
            <Callout tooltip onPress={handleNavigateToOrphanageDetails}>
             <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>Lar das Meninas</Text>
             </View>
            </Callout>

          </Marker>
        </MapView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>2 orfanatos encontrados</Text>
          <TouchableOpacity style={styles.createOrphanageButton}>
            <Feather name="plus" size={20} color={'#FFF'} />
          </TouchableOpacity>
        </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map :{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height + 100,
  },
  calloutContainer: {
    width: 160,
    height: 40,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
  },
  calloutText: {
    color: '#0089a5',
    fontSize: 14,
    fontFamily: 'nunito700',
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3,

  },
  footerText: {
    fontFamily: 'nunito700',
    color: '#8fa7b3'
  },
  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15C3D6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  }
});
