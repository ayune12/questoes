import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';

export default function App() {
  // Estado booleano para controlar se o perfil está visível ou oculto
  const [exibirPerfil, setExibirPerfil] = useState(false);

  // Função para alternar o estado (se for true vira false, se for false vira true)
  const alternarVisibilidade = () => {
    setExibirPerfil(!exibirPerfil);
  };

  // Dados do perfil (mock)
  const perfil = {
    nome: 'Ana Silva',
    idade: '22 anos',
    curso: 'Análise e Desenvolvimento de Sistemas',
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />

      <View style={styles.content}>
        
        {/* Botão Dinâmico: O texto muda conforme o estado */}
        <TouchableOpacity 
          style={[styles.botao, exibirPerfil ? styles.botaoOcultar : styles.botaoMostrar]} 
          onPress={alternarVisibilidade}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotao}>
            {exibirPerfil ? 'Ocultar Perfil' : 'Mostrar Perfil'}
          </Text>
        </TouchableOpacity>

        {/* RENDERIZAÇÃO CONDICIONAL:
          Se 'exibirPerfil' for true, o JavaScript renderiza o que está após o '&&'.
          Se for false, ele ignora todo o bloco do Card.
        */}
        {exibirPerfil && (
          <View style={styles.cardPerfil}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarTexto}>
                {perfil.nome.charAt(0)}
              </Text>
            </View>

            <View style={styles.campoInfo}>
              <Text style={styles.label}>Nome:</Text>
              <Text style={styles.valor}>{perfil.nome}</Text>
            </View>

            <View style={styles.campoInfo}>
              <Text style={styles.label}>Idade:</Text>
              <Text style={styles.valor}>{perfil.idade}</Text>
            </View>

            <View style={styles.campoInfo}>
              <Text style={styles.label}>Curso:</Text>
              <Text style={styles.valor}>{perfil.curso}</Text>
            </View>
          </View>
        )}

      </View>
    </View>
  );
}

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
  botao: {
    width: '100%',
    height: 54,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  botaoMostrar: {
    backgroundColor: '#007AFF', // Azul
  },
  botaoOcultar: {
    backgroundColor: '#FF3B30', // Vermelho
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardPerfil: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  avatarPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarTexto: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8E8E93',
  },
  campoInfo: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
  },
  valor: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1C1C1E',
    textAlign: 'right',
    flex: 1,
    marginLeft: 10,
  },
});