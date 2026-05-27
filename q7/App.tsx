import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  StatusBar 
} from 'react-native';

export default function App() {
  // 1. Estado para controlar qual filtro de categoria está ativo ('Todos' por padrão)
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');

  // 2. Lista de categorias para os botões de filtro
  const categorias = ['Todos', 'Ação', 'Ficção', 'Drama', 'Animação'];

  // 3. Banco de dados mockado dos filmes (com imagens reais via URL)
  const filmes = [
    {
      id: '1',
      nome: 'Interestelar',
      nota: 9.2,
      categoria: 'Ficção',
      imagem: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80',
    },
    {
      id: '2',
      nome: 'Mad Max: Estrada da Fúria',
      nota: 8.1,
      categoria: 'Ação',
      imagem: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&q=80',
    },
    {
      id: '3',
      nome: 'O Rei Leão',
      nota: 8.5,
      categoria: 'Animação',
      imagem: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=400&q=80',
    },
    {
      id: '4',
      nome: 'Um Sonho de Liberdade',
      nota: 9.3,
      categoria: 'Drama',
      imagem: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&q=80',
    },
    {
      id: '5',
      nome: 'Velozes e Furiosos',
      nota: 6.5,
      categoria: 'Ação',
      imagem: 'https://images.unsplash.com/photo-1617469167446-80e3a44661af?w=400&q=80',
    },
    {
      id: '6',
      nome: 'Avatar: O Caminho da Água',
      nota: 7.6,
      categoria: 'Ficção',
      imagem: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80',
    },
  ];

  // 4. LÓGICA DO FILTRO: Filtra a lista com base no estado atual
  const filmesFiltrados = categoriaSelecionada === 'Todos' 
    ? filmes 
    : filmes.filter(filme => filme.categoria === categoriaSelecionada);

  // 5. Renderização de cada Filme
  const renderizarFilme = ({ item }) => {
    // Verifica se a nota é maior que 8 para aplicar o destaque visual
    const ehDestaque = item.nota > 8;

    return (
      <View style={[styles.cardFilme, ehDestaque && styles.cardDestaque]}>
        
        {/* Imagem do Filme */}
        <Image source={{ uri: item.imagem }} style={styles.imagemFilme} />
        
        {/* Selo de Destaque no topo do card (Condicional) */}
        {ehDestaque && (
          <View style={styles.badgeDestaque}>
            <Text style={styles.textoBadgeDestaque}>⭐ TOP</Text>
          </View>
        )}

        {/* Informações do Filme */}
        <View style={styles.infoContainer}>
          <Text style={styles.nomeFilme}>{item.nome}</Text>
          <Text style={styles.categoriaFilme}>{item.categoria}</Text>
          
          {/* Nota com estilo condicional */}
          <View style={[styles.notaContainer, ehDestaque ? styles.notaAltaBg : styles.notaNormalBg]}>
            <Text style={[styles.textoNota, ehDestaque && styles.textoNotaAlta]}>
              Nota: {item.nota.toFixed(1)}
            </Text>
          </View>
        </View>

      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1C1C1E" />
      
      <Text style={styles.tituloTela}>🎬 CineCatálogo</Text>

      {/* Menu Horizontal de Filtros */}
      <View style={styles.filtroContainer}>
        <FlatList
          data={categorias}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.botaoFiltro,
                categoriaSelecionada === item && styles.botaoFiltroAtivo
              ]}
              onPress={() => setCategoriaSelecionada(item)}
            >
              <Text style={[
                styles.textoFiltro,
                categoriaSelecionada === item && styles.textoFiltroAtivo
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listaFiltros}
        />
      </View>

      {/* Lista Principal de Filmes */}
      <FlatList
        data={filmesFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderizarFilme}
        contentContainerStyle={styles.listaFilmes}
        ListEmptyComponent={
          <Text style={styles.textoVazio}>Nenhum filme nesta categoria. 🍿</Text>
        }
      />
    </View>
  );
}

// Estilização com Dark Theme (padrão de apps de streaming)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111112',
    paddingTop: 60,
  },
  tituloTela: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
  },
  filtroContainer: {
    marginBottom: 15,
    height: 50,
  },
  listaFiltros: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  botaoFiltro: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#2C2C2E',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#3A3A3C',
  },
  botaoFiltroAtivo: {
    backgroundColor: '#FF9500', // Laranja de destaque
    borderColor: '#FF9500',
  },
  textoFiltro: {
    color: '#AEAEB2',
    fontWeight: '600',
    fontSize: 14,
  },
  textoFiltroAtivo: {
    color: '#000000',
    fontWeight: 'bold',
  },
  listaFilmes: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  cardFilme: {
    backgroundColor: '#1C1C1E',
    borderRadius: 14,
    flexDirection: 'row',
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2C2C2E',
  },
  // Estilo extra injetado se for nota > 8
  cardDestaque: {
    borderColor: '#FF9500', 
    borderWidth: 1.5,
  },
  imagemFilme: {
    width: 100,
    height: 130,
    backgroundColor: '#2C2C2E',
  },
  badgeDestaque: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF9500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  textoBadgeDestaque: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000000',
  },
  infoContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  nomeFilme: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  categoriaFilme: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 12,
  },
  notaContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  notaNormalBg: {
    backgroundColor: '#2C2C2E',
  },
  notaAltaBg: {
    backgroundColor: '#34C75922', // Verde com opacidade
    borderWidth: 1,
    borderColor: '#34C759',
  },
  textoNota: {
    fontSize: 13,
    fontWeight: '600',
    color: '#AEAEB2',
  },
  textoNotaAlta: {
    color: '#34C759', // Texto Verde
    fontWeight: 'bold',
  },
  textoVazio: {
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
});