import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../service/firebaseConfig';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [emailReset, setEmailReset] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [cadastroVisible, setCadastroVisible] = useState(false);
  const [nome, setNome] = useState('');
  const [emailCadastro, setEmailCadastro] = useState('');
  const [senhaCadastro, setSenhaCadastro] = useState('');

  const router = useRouter();

  useEffect(() => {
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

    verificarUsuarioLogado();
  }, []);

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
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível enviar o email. Verifique se está correto.');
    }
  };

  const handleCadastro = () => {
    if (!nome || !emailCadastro || !senhaCadastro) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

    createUserWithEmailAndPassword(auth, emailCadastro, senhaCadastro)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await AsyncStorage.setItem('@user', JSON.stringify(user));
        setCadastroVisible(false);
        router.push('/HomeScreen');
      })
      .catch((error) => {
        console.log(error.message);
        Alert.alert('Erro', 'Usuário não cadastrado.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Realizar Login</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.textoBotao}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setCadastroVisible(true)}>
        <Text style={styles.link}>Cadastre-se</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => setModalVisible(true)}>
        Esqueceu a senha?
      </Text>

      {/* Modal: Redefinir Senha */}
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
              style={[styles.botao, { backgroundColor: '#666', marginTop: 10 }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textoBotao}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal: Cadastro */}
      <Modal
        visible={cadastroVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCadastroVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.box}>
            <Text style={styles.tituloModal}>Criar Conta</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome completo"
              placeholderTextColor="#aaa"
              value={nome}
              onChangeText={setNome}
            />

            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
              value={emailCadastro}
              onChangeText={setEmailCadastro}
            />

            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={senhaCadastro}
              onChangeText={setSenhaCadastro}
            />

            <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
              <Text style={styles.textoBotao}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.botao, { backgroundColor: '#666', marginTop: 10 }]}
              onPress={() => setCadastroVisible(false)}
            >
              <Text style={styles.textoBotao}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
    backgroundColor: '#1a1a1a',
    color: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  botao: {
    backgroundColor: '#00BFFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    color: '#00BFFF',
    textAlign: 'center',
    fontSize: 15,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    padding: 20,
  },
  box: {
    backgroundColor: '#1a1a1a',
    padding: 25,
    borderRadius: 15,
  },
  tituloModal: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00BFFF',
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
