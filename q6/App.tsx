import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  StatusBar, 
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

export default function App() {
  // Estados para os campos do formulário
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Estados para armazenar as mensagens de erro
  const [erroEmail, setErroEmail] = useState('');
  const [erroSenha, setErroSenha] = useState('');

  // Função de validação e submissão
  const handleLogin = () => {
    let valido = true;

    // 1. Limpar erros anteriores antes de validar novamente
    setErroEmail('');
    setErroSenha('');

    // 2. Validação do campo E-mail
    if (email.trim() === '') {
      setErroEmail('O campo de e-mail não pode ficar vazio.');
      valido = false;
    } else if (!email.includes('@')) {
      setErroEmail('Por favor, insira um e-mail válido.');
      valido = false;
    }

    // 3. Validação do campo Senha
    if (senha.trim() === '') {
      setErroSenha('O campo de senha não pode ficar vazio.');
      valido = false;
    } else if (senha.length < 6) {
      setErroSenha('A senha deve ter pelo menos 6 caracteres.');
      valido = false;
    }

    // 4. Se tudo estiver correto, avança com o login
    if (valido) {
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      // Aqui entraria a lógica de navegação ou envio para a API
    }
  };

  return (
    // KeyboardAvoidingView evita que o teclado do celular cubra os campos de input
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />

      <View style={styles.formContainer}>
        <Text style={styles.titulo}>Seja Bem-vindo</Text>
        <Text style={styles.subtitulo}>Faça login para continuar</Text>

        {/* --- CAMPO EMAIL --- */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={[styles.input, erroEmail ? styles.inputErro : null]}
            placeholder="seu-email@exemplo.com"
            placeholderTextColor="#8E8E93"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={(texto) => {
              setEmail(texto);
              if (erroEmail) setErroEmail(''); // Limpa o erro enquanto o usuário digita
            }}
          />
          {/* Mensagem de Erro Condicional */}
          {erroEmail ? <Text style={styles.textoErro}>{erroEmail}</Text> : null}
        </View>

        {/* --- CAMPO SENHA --- */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={[styles.input, erroSenha ? styles.inputErro : null]}
            placeholder="Digite sua senha"
            placeholderTextColor="#8E8E93"
            secureTextEntry={true} // Esconde os caracteres da senha
            value={senha}
            onChangeText={(texto) => {
              setSenha(texto);
              if (erroSenha) setErroSenha(''); // Limpa o erro enquanto o usuário digita
            }}
          />
          {/* Mensagem de Erro Condicional */}
          {erroSenha ? <Text style={styles.textoErro}>{erroSenha}</Text> : null}
        </View>

        {/* --- BOTÃO ENTRAR --- */}
        <TouchableOpacity 
          style={styles.botaoEntrar} 
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotao}>Entrar</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  );
}

// Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1C1C1E',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 36,
    marginTop: 4,
  },
  inputGroup: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3A3A3C',
    marginBottom: 8,
  },
  input: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1C1C1E',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  // Altera a borda do input para vermelho se houver erro
  inputErro: {
    borderColor: '#FF3B30',
    backgroundColor: '#FFF5F5',
  },
  textoErro: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 6,
    fontWeight: '500',
  },
  botaoEntrar: {
    height: 52,
    backgroundColor: '#007AFF', // Azul padrão iOS
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});