import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import mapMarker from '../images/map-marker.png';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';


interface Orphanage {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap(){
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const navigation = useNavigation();

  useFocusEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    });
  });


  function handleNavigateToOrphanageDetails(id: string){
    navigation.navigate('OrphanageDetails', { id });
  }
  function handleNavigateToCreateOrphanage(){
    navigation.navigate('SelectMapPosition');
  }
  

  return (

    <View style={styles.container}>
      <MapView style={styles.map}
        provider={ PROVIDER_GOOGLE }
        initialRegion={{
          latitude: -2.439792,
          longitude: -54.71896,
          longitudeDelta: 0.035,
          latitudeDelta: 0.035
        }}>
          {orphanages.map( orphanage => {
            return (
              <Marker
              key={orphanage.id}
              icon={mapMarker}
              calloutAnchor={{
                x:3.2,
                y:1.1,
              }}
              coordinate={{
                latitude: Number(orphanage.latitude),
                longitude: Number(orphanage.longitude),
              }}
    
              >
                <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
                </Callout>
    
              </Marker>
            );
          }

          )}
        </MapView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>
          <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
            <Feather name="plus" size={20} color={'#FFF'} />
          </RectButton>
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
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
  },
  calloutText: {
    color: '#0089a5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold',
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
    fontFamily: 'Nunito_700Bold',
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