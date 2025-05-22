import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Bem-vindo ao MotoApp</Text>
      <Text style={styles.subtitle}>Use a barra inferior para navegar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 20,
  },
  logo: {
    width: 300, // ⬅️ Aumenta o tamanho do logo
    height: 150,
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#00BFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
});
