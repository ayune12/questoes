import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';

export default function App() {
  // Estado para armazenar o valor do contador
  const [contador, setContador] = useState(0);

  // Função para incrementar
  const incrementar = () => {
    setContador(contador + 1);
  };

  // Função para decrementar com a trava de segurança
  const decrementar = () => {
    if (contador > 0) {
      setContador(contador - 1);
    }
  };

  // Lógica para definir a cor do texto dinamicamente
  const corDoTexto = contador > 10 ? '#FF3B30' : '#1C1C1E';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      
      {/* Header/Barra Superior */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contador Inteligente</Text>
      </View>

      {/* Conteúdo Central */}
      <View style={styles.content}>
        <Text style={styles.label}>Valor Atual:</Text>
        
        {/* Número com estilo dinâmico para a cor */}
        <Text style={[styles.contador, { color: corDoTexto }]}>
          {contador}
        </Text>

        {/* Fileira de Botões */}
        <View style={styles.row}>
          
          {/* Botão Decrementar */}
          <TouchableOpacity 
            style={[styles.botao, styles.botaoDecrementar]} 
            onPress={decrementar}
            activeOpacity={0.7}
          >
            <Text style={styles.textoBotao}>- Decrementar</Text>
          </TouchableOpacity>

          {/* Botão Incrementar */}
          <TouchableOpacity 
            style={[styles.botao, styles.botaoIncrementar]} 
            onPress={incrementar}
            activeOpacity={0.7}
          >
            <Text style={styles.textoBotao}>+ Incrementar</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}

// Estilização do App
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    backgroundColor: '#007AFF',
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: '500',
    color: '#8E8E93',
    marginBottom: 10,
  },
  contador: {
    fontSize: 96,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  botao: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  botaoDecrementar: {
    backgroundColor: '#FF9500', // Laranja
  },
  botaoIncrementar: {
    backgroundColor: '#34C759', // Verde
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});