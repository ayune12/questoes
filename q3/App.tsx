import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar } from 'react-native';

export default function App() {
  // Estado inicial com uma lista de 8 itens de compras
  const [listaCompras, setListaCompras] = useState([
    { id: '1', nome: 'Arroz 5kg', quantidade: 1 },
    { id: '2', nome: 'Feijão Carioca 1kg', quantidade: 2 },
    { id: '3', nome: 'Leite Integral 1L', quantidade: 4 },
    { id: '4', nome: 'Café Tradicional 500g', quantidade: 2 },
    { id: '5', nome: 'Açúcar Refinado 1kg', quantidade: 1 },
    { id: '6', nome: 'Óleo de Soja 900ml', quantidade: 3 },
    { id: '7', nome: 'Macarrão Espaguete', quantidade: 2 },
    { id: '8', nome: 'Detergente Líquido', quantidade: 5 },
  ]);

  // Função para remover um item filtrando pelo ID
  const removerItem = (idParaRemover) => {
    // O método filter cria uma nova lista APENAS com os itens que têm o ID diferente do removido
    const novaLista = listaCompras.filter(item => item.id !== idParaRemover);
    setListaCompras(novaLista);
  };

  // Função que renderiza o design de cada linha (item) da lista
  const renderizarItemdaLista = ({ item }) => (
    <View style={styles.cardItem}>
      <View style={styles.infoContainer}>
        <Text style={styles.nomeItem}>{item.nome}</Text>
        <Text style={styles.qtdItem}>Qtd: {item.quantidade}</Text>
      </View>
      
      {/* Botão de Remover */}
      <TouchableOpacity 
        style={styles.botaoRemover} 
        onPress={() => removerItem(item.id)}
      >
        <Text style={styles.textoBotaoRemover}>Remover</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />
      
      <Text style={styles.tituloTela}>🛒 Minha Lista de Compras</Text>

      {/* Condicional: se a lista estiver vazia, mostra um aviso */}
      {listaCompras.length === 0 ? (
        <View style={styles.containerVazio}>
          <Text style={styles.textoVazio}>Sua lista está vazia!</Text>
        </View>
      ) : (
        /* Componente FlatList para renderizar os itens de forma otimizada */
        <FlatList
          data={listaCompras}
          keyExtractor={item => item.id}
          renderItem={renderizarItemdaLista}
          contentContainerStyle={styles.listaContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    paddingTop: 60,
  },
  tituloTela: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    textAlign: 'center',
    marginBottom: 20,
  },
  listaContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cardItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoContainer: {
    flex: 1,
  },
  nomeItem: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  qtdItem: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  botaoRemover: {
    backgroundColor: '#FFE5E5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  textoBotaoRemover: {
    color: '#FF3B30',
    fontWeight: 'bold',
    fontSize: 14,
  },
  containerVazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoVazio: {
    fontSize: 16,
    color: '#8E8E93',
    fontStyle: 'italic',
  },
});