import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  StatusBar,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

// Importações necessárias para a Navegação
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Inicializa o Navegador em Pilha (Stack)
const Stack = createStackNavigator();

// ==========================================
// 1. TELA DE CADASTRO
// ==========================================
function TelaCadastro({ navigation }) {
  // Estados para capturar os dados do formulário
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [curso, setCurso] = useState('');

  const handleEnviar = () => {
    // Validação simples para garantir que nenhum campo está vazio
    if (nome.trim() === '' || idade.trim() === '' || curso.trim() === '') {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    // Navega para a tela 'Perfil' passando os dados como um objeto de parâmetros
    navigation.navigate('Perfil', {
      nomeAluno: nome,
      idadeAluno: idade,
      cursoAluno: curso
    });
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.titulo}>Formulário de Cadastro</Text>
        <Text style={styles.subtitulo}>Insira os dados do aluno para criar o perfil</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: João Silva"
            placeholderTextColor="#8E8E93"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Idade</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 21"
            placeholderTextColor="#8E8E93"
            keyboardType="numeric"
            value={idade}
            onChangeText={setIdade}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Curso</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Engenharia de Software"
            placeholderTextColor="#8E8E93"
            value={curso}
            onChangeText={setCurso}
          />
        </View>

        <TouchableOpacity style={styles.botao} onPress={handleEnviar} activeOpacity={0.8}>
          <Text style={styles.textoBotao}>Criar Perfil →</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// ==========================================
// 2. TELA DE PERFIL (RECEBE OS DADOS)
// ==========================================
function TelaPerfil({ route, navigation }) {
  // Recupera os parâmetros enviados pela tela anterior usando 'route.params'
  // Definimos valores padrão vazios ('') caso o objeto venha indefinido por segurança
  const { nomeAluno, idadeAluno, cursoAluno } = route.params || {};

  return (
    <View style={styles.containerCenter}>
      <View style={styles.cardPerfil}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarTexto}>
            {nomeAluno ? nomeAluno.charAt(0).toUpperCase() : 'U'}
          </Text>
        </View>

        <Text style={styles.tituloPerfil}>Perfil do Aluno</Text>

        <View style={styles.infoRow}>
          <Text style={styles.labelInfo}>Nome:</Text>
          <Text style={styles.valorInfo}>{nomeAluno}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.labelInfo}>Idade:</Text>
          <Text style={styles.valorInfo}>{idadeAluno} anos</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.labelInfo}>Curso:</Text>
          <Text style={styles.valorInfo}>{cursoAluno}</Text>
        </View>

        <TouchableOpacity 
          style={[styles.botao, styles.botaoVoltar]} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textoBotaoVoltar}>Voltar ao Cadastro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ==========================================
// 3. COMPONENTE PRINCIPAL (CONFIGURAÇÃO DO FLUXO)
// ==========================================
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />
      <Stack.Navigator 
        initialRouteName="Cadastro"
        screenOptions={{
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#FFFFFF',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      >
        {/* Registro das telas que farão parte do fluxo de navegação */}
        <Stack.Screen name="Cadastro" component={TelaCadastro} options={{ title: 'Novo Cadastro' }} />
        <Stack.Screen name="Perfil" component={TelaPerfil} options={{ title: 'Perfil do Usuário' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ==========================================
// 4. ESTILIZAÇÃO (STYLES)
// ==========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
  },
  containerCenter: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  content: {
    paddingHorizontal: 24,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1C1C1E',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3A3A3C',
    marginBottom: 8,
  },
  input: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1C1C1E',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  botao: {
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardPerfil: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarTexto: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  tituloPerfil: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    paddingVertical: 12,
  },
  labelInfo: {
    fontSize: 15,
    fontWeight: '600',
    color: '#8E8E93',
  },
  valorInfo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  botaoVoltar: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#007AFF',
    width: '100%',
    marginTop: 24,
  },
  textoBotaoVoltar: {
    color: '#007AFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});