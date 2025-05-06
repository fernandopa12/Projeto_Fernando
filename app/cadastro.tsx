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
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Moto = {
  id?: number;
  modelo: string;
  status: string;
  posicao: string;
  problema: string;
  placa: string;
};

export default function Cadastro() {
  const [moto, setMoto] = useState<Moto>({
    modelo: '',
    status: '',
    posicao: '',
    problema: '',
    placa: '',
  });

  const [listaMotos, setListaMotos] = useState<Moto[]>([]);
  const [ultimaMoto, setUltimaMoto] = useState<Moto | null>(null);

  useEffect(() => {
    listarMotos();
    carregarUltimaMoto();
  }, []);

  const listarMotos = async () => {
    try {
      const response = await fetch('http://192.168.0.100:8080/motos');
      const data = await response.json();
      const motos = data.content || data;
      setListaMotos(motos);
      await AsyncStorage.setItem('listaMotos', JSON.stringify(motos));
    } catch (error) {
      console.error('Erro ao buscar motos:', error);
    }
  };

  const carregarUltimaMoto = async () => {
    try {
      const json = await AsyncStorage.getItem('ultimaMoto');
      if (json) setUltimaMoto(JSON.parse(json));
    } catch (error) {
      console.error('Erro ao carregar última moto do AsyncStorage', error);
    }
  };

  const salvarMotosLocal = async (motos: Moto[]) => {
    try {
      await AsyncStorage.setItem('listaMotos', JSON.stringify(motos));
    } catch (error) {
      console.error('Erro ao salvar lista no AsyncStorage', error);
    }
  };

  const handleChange = (field: string, value: string) => {
    setMoto({ ...moto, [field]: value });
  };

  const limparCampos = () => {
    setMoto({
      id: undefined,
      modelo: '',
      status: '',
      posicao: '',
      problema: '',
      placa: '',
    });
  };

  const cadastrarMoto = async () => {
    try {
      const response = await fetch('http://192.168.0.100:8080/motos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(moto),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Moto cadastrada com sucesso!');
        await AsyncStorage.setItem('ultimaMoto', JSON.stringify(moto));
        setUltimaMoto(moto);
        limparCampos();
        await listarMotos();
      } else {
        Alert.alert('Erro', 'Erro ao cadastrar a moto');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro na requisição');
      console.error(error);
    }
  };

  const editarMoto = async (motoEditada: Moto) => {
    if (!motoEditada.id) {
      Alert.alert('Erro', 'Moto não possui ID para edição.');
      return;
    }

    try {
      const response = await fetch(`http://192.168.0.100:8080/motos/${motoEditada.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(motoEditada),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Moto editada com sucesso!');
        const novaLista = listaMotos.map((m) =>
          m.id === motoEditada.id ? motoEditada : m
        );
        setListaMotos(novaLista);
        await salvarMotosLocal(novaLista);
        limparCampos();
      } else {
        Alert.alert('Erro', 'Erro ao editar a moto');
      }
    } catch (error) {
      console.error('Erro ao editar moto:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📋 Cadastro de Moto</Text>

      {['modelo', 'status', 'posicao', 'problema', 'placa'].map((field) => (
        <TextInput
          key={field}
          style={styles.input}
          placeholder={`Digite ${field}`}
          placeholderTextColor="#ccc"
          value={(moto as any)[field]}
          onChangeText={(value) => handleChange(field, value)}
        />
      ))}

      <TouchableOpacity
        onPress={moto.id ? () => editarMoto(moto) : cadastrarMoto}
        style={styles.button}>
        <Text style={styles.buttonText}>
          {moto.id ? 'Salvar Alterações' : 'Cadastrar Moto'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={limparCampos} style={styles.clearButton}>
        <MaterialIcons name="delete-outline" size={20} color="#fff" />
        <Text style={styles.clearButtonText}>Limpar</Text>
      </TouchableOpacity>

      <View style={styles.previewBox}>
        <Text style={styles.previewTitle}>📄 Lista de Motos:</Text>
        {listaMotos.map((m, index) => (
          <View key={m.id ?? index} style={{ marginBottom: 12 }}>
            <Text style={styles.previewText}>Modelo: {m.modelo}</Text>
            <Text style={styles.previewText}>Status: {m.status}</Text>
            <Text style={styles.previewText}>Posição: {m.posicao}</Text>
            <Text style={styles.previewText}>Problema: {m.problema}</Text>
            <Text style={styles.previewText}>Placa: {m.placa}</Text>

            <TouchableOpacity
              onPress={() => setMoto(m)}
              style={styles.editButton}>
              <Text style={{ color: '#fff' }}>Editar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#00BFFF',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    borderColor: '#333',
    borderWidth: 1,
    marginBottom: 10,
    padding: 12,
    borderRadius: 8,
    fontSize: 15,
    color: '#fff',
  },
  button: {
    backgroundColor: '#00BFFF',
    padding: 14,
    borderRadius: 10,
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  clearButtonText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 15,
  },
  previewBox: {
    marginTop: 25,
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 10,
    width: '100%',
  },
  previewTitle: {
    color: '#00BFFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  previewText: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 3,
  },
  editButton: {
    marginTop: 5,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#555',
    borderRadius: 6,
  },
});
