import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

export default function CadastroScreen() {
  const [moto, setMoto] = useState({
    id: '',
    modelo: '',
    status: '',
    posicao: '',
    problema: '',
    placa: '',
  });

  // Carregar dados do AsyncStorage ao iniciar o app
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const dadosSalvos = await AsyncStorage.getItem('moto');
        if (dadosSalvos) {
          setMoto(JSON.parse(dadosSalvos));
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    carregarDados();
  }, []);

  // Salvar dados no AsyncStorage sempre que o formulário for alterado
  useEffect(() => {
    const salvarDados = async () => {
      try {
        await AsyncStorage.setItem('moto', JSON.stringify(moto));
      } catch (error) {
        console.error('Erro ao salvar dados:', error);
      }
    };

    salvarDados();
  }, [moto]);

  const handleChange = (field: keyof typeof moto, value: string) => {
    setMoto({ ...moto, [field]: value });
  };

  const limparCampos = () => {
    const vazio = {
      id: '',
      modelo: '',
      status: '',
      posicao: '',
      problema: '',
      placa: '',
    };
    setMoto(vazio);
    AsyncStorage.removeItem('moto');
  };

  const cadastrarMoto = async () => {
    try {
      const response = await fetch('http://192.168.0.100:8080/motos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(moto),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Moto cadastrada com sucesso!');
        limparCampos();
      } else {
        Alert.alert('Erro', 'Erro ao cadastrar a moto');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro na requisição');
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📋 Cadastro de Moto</Text>

      {['id', 'modelo', 'status', 'posicao', 'problema', 'placa'].map((field) => (
        <TextInput
          key={field}
          style={styles.input}
          placeholder={`Digite o ${field}`}
          placeholderTextColor="#aaa"
          value={(moto as any)[field]}
          onChangeText={(value) => handleChange(field as keyof typeof moto, value)}
        />
      ))}

      <TouchableOpacity onPress={cadastrarMoto} style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar Moto ➕</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={limparCampos} style={styles.clearButton}>
        <MaterialIcons name="delete-forever" size={24} color="#fff" />
        <Text style={styles.clearButtonText}>Limpar Campos</Text>
      </TouchableOpacity>

      <View style={styles.previewBox}>
        <Text style={styles.previewTitle}>📄 Dados Digitados:</Text>
        {Object.entries(moto).map(([key, value]) => (
          <Text key={key} style={styles.previewText}>
            {key}: {value || '(vazio)'}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000000FF',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#00BFFF',
    fontWeight: '500',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#00BFFF',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  clearButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
  previewBox: {
    marginTop: 30,
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 10,
    width: '100%',
  },
  previewTitle: {
    color: '#00BFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  previewText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
  },
});
