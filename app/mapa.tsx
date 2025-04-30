import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
 
const motos = [
  {
    id: 'MOT001',
    modelo: 'Mottu Pop',
    status: 'disponivel',
    latitude: -23.5621,
    longitude: -46.6553
  },
  {
    id: 'MOT002',
    modelo: 'Mottu-E',
    status: 'manutencao',
    latitude: -23.5625,
    longitude: -46.6555
  },
  {
    id: 'MOT003',
    modelo: 'Mottu-E',
    status: 'problema_motor',
    latitude: -23.5630,
    longitude: -46.6560
  },
  {
    id: 'MOT004',
    modelo: 'Mottu Sport',
    status: 'disponivel',
    latitude: -23.5623,
    longitude: -46.6548
  },
  {
    id: 'MOT005',
    modelo: 'Mottu-E',
    status: 'em_analise',
    latitude: -23.5618,
    longitude: -46.6551
  }
];
 
export default function MapaMotos() {
  return (
<View style={{ flex: 1 }}>
<MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: -23.5625,
          longitude: -46.6553,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
>
        {motos.map((moto) => (
<Marker
            key={moto.id}
            coordinate={{ latitude: moto.latitude, longitude: moto.longitude }}
            title={`Moto ${moto.id}`}
            description={`Modelo: ${moto.modelo}\nStatus: ${moto.status}`}
            pinColor={
              moto.status === 'disponivel' ? 'green' :
              moto.status === 'manutencao' ? 'orange' :
              moto.status === 'problema_motor' ? 'red' :
              'gray'
            }
          />
        ))}
</MapView>
</View>
  );
}