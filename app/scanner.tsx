import React, { useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import CameraScreen from './screens/CameraScreen';



export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScanned, setIsScanned] = useState(false);
  const cameraRef = useRef<Camera | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handlePicture = async () => {
    if (cameraRef.current && !isScanned) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log('Foto tirada:', photo.uri);
      setIsScanned(true);
    }
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão da câmera...</Text>;
  }

  if (hasPermission === false) {
    return <Text>Permissão da câmera negada</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={CameraType.back}
        ref={(ref) => (cameraRef.current = ref)}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handlePicture} style={styles.button}>
            <Text style={styles.text}>Tirar Foto</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 36,
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    color: '#000',
  },
});