import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function logout() {
  const [usuario, setUsuario] = useState<any>(null);
  const router = useRouter();

  // Carregar usuário do AsyncStorage
  const carregarUsuario = async () => {
    try {
      const usuarioSalvo = await AsyncStorage.getItem('@user');
      if (usuarioSalvo) {
        setUsuario(JSON.parse(usuarioSalvo));
      }
    } catch (error) {
      console.log('Erro ao carregar usuário', error);
    }
  };

  useEffect(() => {
    carregarUsuario();
  }, []);

  // Função de logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('@user');
      Alert.alert('Logout', 'Você saiu da conta com sucesso!');
      router.push('/LoginScreen');
    } catch (error) {
      console.log('Erro ao fazer logout', error);
      Alert.alert('Erro', 'Não foi possível sair da conta.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minha Conta</Text>

      {usuario ? (
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.info}>{usuario.email}</Text>

          <Text style={styles.label}>UID:</Text>
          <Text style={styles.info}>{usuario.uid}</Text>
        </View>
      ) : (
        <Text style={styles.info}>Carregando informações...</Text>
      )}

      <TouchableOpacity style={styles.botao} onPress={handleLogout}>
        <Text style={styles.textoBotao}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  infoContainer: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ccc',
  },
  info: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  botao: {
    backgroundColor: '#00B37E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
