import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  StatusBar, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';

export default function App() {
  // Estados para gerenciar o texto visível em cada input
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');
  
  // Estado para capturar erros de digitação
  const [erro, setErro] = useState('');

  // Função para validar se o texto inserido é um número válido (aceita negativos e decimais)
  const validarNumero = (texto) => {
    // Permite vazio (para quando o usuário apaga tudo), apenas um sinal de menos, ou números válidos
    const regexValida = /^-?\d*[.,]?\d*$/;
    return regexValida.test(texto);
  };

  // Trata a digitação no campo Celsius e converte para Fahrenheit
  const manipularCelsius = (texto) => {
    // Substitui a vírgula por ponto para o JavaScript entender como decimal
    const textoFormatado = texto.replace(',', '.');

    if (!validarNumero(textoFormatado)) {
      setErro('Por favor, insira um número válido.');
      return;
    }

    setErro(''); // Limpa o erro se o número for válido
    setCelsius(texto); // Mantém o texto original na tela do usuário (com vírgula se for o caso)

    if (textoFormatado === '' || textoFormatado === '-') {
      setFahrenheit('');
      return;
    }

    // Aplica a fórmula: F = C × 1.8 + 32
    const valorCelsius = parseFloat(textoFormatado);
    const valorFahrenheit = (valorCelsius * 1.8) + 32;
    
    // Arredonda para no máximo 2 casas decimais
    setFahrenheit(valorFahrenheit.toFixed(2).replace('.', ','));
  };

  // Trata a digitação no campo Fahrenheit e converte para Celsius
  const manipularFahrenheit = (texto) => {
    const textoFormatado = texto.replace(',', '.');

    if (!validarNumero(textoFormatado)) {
      setErro('Por favor, insira um número válido.');
      return;
    }

    setErro('');
    setFahrenheit(texto);

    if (textoFormatado === '' || textoFormatado === '-') {
      setCelsius('');
      return;
    }

    // Aplica a fórmula: C = (F - 32) / 1.8
    const valorFahrenheit = parseFloat(textoFormatado);
    const valorCelsius = (valorFahrenheit - 32) / 1.8;
    
    setCelsius(valorCelsius.toFixed(2).replace('.', ','));
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />

      <View style={styles.content}>
        <Text style={styles.titulo}>🌡️ Conversor de Temperatura</Text>
        <Text style={styles.subtitulo}>Digite em qualquer um dos campos para converter</Text>

        {/* --- CAMPO CELSIUS --- */}
        <View style={styles.cardInput}>
          <Text style={styles.label}>Graus Celsius (°C)</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, erro ? styles.inputErro : null]}
              placeholder="0,0"
              placeholderTextColor="#8E8E93"
              keyboardType="numeric" // Abre o teclado numérico
              value={celsius}
              onChangeText={manipularCelsius}
            />
            <Text style={styles.sufixo}>°C</Text>
          </View>
        </View>

        {/* Símbolo de equivalência/troca */}
        <Text style={styles.setas}>↕</Text>

        {/* --- CAMPO FAHRENHEIT --- */}
        <View style={styles.cardInput}>
          <Text style={styles.label}>Graus Fahrenheit (°F)</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, erro ? styles.inputErro : null]}
              placeholder="32,0"
              placeholderTextColor="#8E8E93"
              keyboardType="numeric"
              value={fahrenheit}
              onChangeText={manipularFahrenheit}
            />
            <Text style={styles.sufixo}>°F</Text>
          </View>
        </View>

        {/* Mensagem de erro condicional */}
        {erro ? <Text style={styles.textoErro}>{erro}</Text> : null}
      </View>
    </KeyboardAvoidingView>
  );
}

// Estilização do App
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 24,
    alignItems: 'center',
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
  cardInput: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1C1E',
    paddingVertical: 4,
  },
  inputErro: {
    color: '#FF3B30',
  },
  sufixo: {
    fontSize: 24,
    fontWeight: '600',
    color: '#3A3A3C',
    marginLeft: 10,
  },
  setas: {
    fontSize: 32,
    color: '#007AFF',
    marginVertical: 12,
    fontWeight: '300',
  },
  textoErro: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 15,
    textAlign: 'center',
  },
});