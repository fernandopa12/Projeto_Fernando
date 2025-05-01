import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏍️ Bem-vindo ao MotoMap</Text>
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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#00BFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: '#A0AFC0',
    fontSize: 16,
    textAlign: 'center',
  },
});