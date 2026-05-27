import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  StatusBar 
} from 'react-native';

export default function App() {
  // Estado que armazena o array de posts do feed
  const [posts, setPosts] = useState([
    {
      id: '1',
      usuario: 'alex_dev',
      texto: 'Acabei de finalizar meu primeiro app em React Native! A sensação de ver o código rodando no celular é incrível. 🚀📱',
      likes: 12,
      curtido: false, // Controla se o usuário atual clicou em curtir
    },
    {
      id: '2',
      usuario: 'carla_codes',
      texto: 'Dica do dia: Sempre use FlatList em vez de ScrollView + Map quando estiver lidando com listas longas para economizar memória do dispositivo! 💡',
      likes: 45,
      curtido: true, // Começa como já curtido pelo usuário
    },
    {
      id: '3',
      usuario: 'tech_guy',
      texto: 'Café + Código = Noite em claro. Quem mais está no pique de programar na madrugada de hoje? ☕☕💻',
      likes: 3,
      curtido: false,
    },
  ]);

  // Função única que gerencia o clique de curtir/descurtir (Toggle)
  const alternarCurtida = (id) => {
    const feedAtualizado = posts.map(post => {
      if (post.id === id) {
        // Se já estava curtido, diminui 1 e muda 'curtido' para false. 
        // Se não estava, soma 1 e muda 'curtido' para true.
        return {
          ...post,
          likes: post.curtido ? post.likes - 1 : post.likes + 1,
          curtido: !post.curtido
        };
      }
      return post;
    });

    setPosts(feedAtualizado);
  };

  // Componente que renderiza cada post do feed
  const renderizarPost = ({ item }) => (
    <View style={styles.cardPost}>
      
      {/* Cabeçalho do Post (Avatar Simples + Username) */}
      <View style={styles.headerPost}>
        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>{item.usuario.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.username}>@{item.usuario}</Text>
      </View>

      {/* Conteúdo do Post */}
      <Text style={styles.textoPost}>{item.texto}</Text>

      {/* Rodapé do Post (Contador + Botão de Interação) */}
      <View style={styles.footerPost}>
        
        {/* Mostra a quantidade de curtidas dinamicamente */}
        <Text style={styles.textoLikes}>
          ❤️ {item.likes} {item.likes === 1 ? 'curtida' : 'curtidas'}
        </Text>

        {/* Botão que alterna entre Curtir e Descurtir */}
        <TouchableOpacity 
          style={[styles.botaoLike, item.curtido ? styles.botaoCurtido : styles.botaoNaoCurtido]} 
          onPress={() => alternarCurtida(item.id)}
          activeOpacity={0.7}
        >
          <Text style={[styles.textoBotaoLike, item.curtido && styles.textoBotaoCurtido]}>
            {item.curtido ? '❤️ Descurtir' : '🤍 Curtir'}
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />
      
      <View style={styles.appBar}>
        <Text style={styles.tituloAppBar}>📱 DevFeed</Text>
      </View>

      {/* Lista de rolagem dinâmica dos posts */}
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={renderizarPost}
        contentContainerStyle={styles.listaFeed}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

// Estilização inspirada em interfaces modernas de redes sociais
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7', // Fundo cinza claro padrão
  },
  appBar: {
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#E5E5EA',
  },
  tituloAppBar: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1C1C1E',
    letterSpacing: 0.5,
  },
  listaFeed: {
    padding: 16,
    paddingBottom: 30,
  },
  cardPost: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  headerPost: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  username: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  textoPost: {
    fontSize: 15,
    color: '#3A3A3C',
    lineHeight: 22,
    marginBottom: 16,
  },
  footerPost: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#F2F2F7',
    paddingTop: 12,
  },
  textoLikes: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
  },
  botaoLike: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  botaoNaoCurtido: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E5EA',
  },
  botaoCurtido: {
    backgroundColor: '#FFE5E5', // Fundo avermelhado leve
    borderColor: '#FF3B30',
  },
  textoBotaoLike: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
  },
  textoBotaoCurtido: {
    color: '#FF3B30', // Texto vermelho
    fontWeight: 'bold',
  },
});