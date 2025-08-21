import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../service/firebaseConfig';

export default function LoginScreen() {
  // Estados do login
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Estados do reset de senha
  const [emailReset, setEmailReset] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const router = useRouter();

  // Verifica se usuário já está logado
  const verificarUsuarioLogado = async () => {
    try {
      const usuarioSalvo = await AsyncStorage.getItem('@user');
      if (usuarioSalvo) {
        router.push('/HomeScreen');
      }
    } catch (error) {
      console.log('Erro ao verificar login', error);
    }
  };

  useEffect(() => {
    verificarUsuarioLogado();
  }, []);

  // Função de login
  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }
    signInWithEmailAndPassword(auth, email, senha)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await AsyncStorage.setItem('@user', JSON.stringify(user));
        router.push('/HomeScreen');
      })
      .catch((error) => {
        console.log('Error:', error.message);
        Alert.alert('Erro', 'Email ou senha inválidos!');
      });
  };

  // Função de redefinição de senha
  const handleResetSenha = async () => {
    if (!emailReset) {
      Alert.alert('Atenção', 'Digite seu email para redefinir a senha!');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, emailReset);
      Alert.alert('Sucesso', '📩 Email enviado para redefinir sua senha!');
      setEmailReset('');
      setModalVisible(false);
    } catch (error: any) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível enviar o email. Verifique se está correto.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Realizar Login</Text>

      {/* Campo Email */}
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* Campo Senha */}
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {/* Botão Login */}
      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.textoBotao}>Login</Text>
      </TouchableOpacity>

      {/* Link para Cadastro */}
      <Link href="/CadastrarScreen" style={{ marginTop: 20, color: '#00B37E', textAlign: 'center' }}>
        Cadastre-se
      </Link>

      {/* Link para Esqueceu a senha */}
      <Text
        style={{ marginTop: 20, color: '#00B37E', textAlign: 'center' }}
        onPress={() => setModalVisible(true)}
      >
        Esqueceu a senha?
      </Text>

      {/* Modal de redefinição de senha */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.box}>
            <Text style={styles.tituloModal}>🔑 Redefinir Senha</Text>
            <Text style={styles.subtituloModal}>
              Digite seu email para receber o link de redefinição:
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Digite seu email"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
              value={emailReset}
              onChangeText={setEmailReset}
            />

            <TouchableOpacity style={styles.botao} onPress={handleResetSenha}>
              <Text style={styles.textoBotao}>Enviar Email</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.botao, { backgroundColor: '#888', marginTop: 10 }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textoBotao}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  botao: {
    backgroundColor: '#00B37E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    padding: 20,
  },
  box: {
    backgroundColor: '#1E1E1E',
    padding: 25,
    borderRadius: 15,
  },
  tituloModal: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00B37E',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtituloModal: {
    fontSize: 15,
    color: '#ccc',
    marginBottom: 20,
    textAlign: 'center',
  },
});
