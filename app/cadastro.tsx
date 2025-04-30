import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function CadastroScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Cadastro de Moto</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0A0F2C',
      padding: 20,
    },
    text: {
      fontSize: 20,
      color: '#00BFFF',
      fontWeight: '500',
    },
  });
