import React from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';

// ==========================================
// 1. COMPONENTE REUTILIZÁVEL: ProductCard
// ==========================================
function ProductCard({ title, price, description, inStock }) {
  return (
    // Se 'inStock' for false, aplica o estilo 'cardIndisponivel' (que tem opacidade)
    <View style={[styles.card, !inStock && styles.cardIndisponivel]}>
      
      <View style={styles.headerCard}>
        <Text style={styles.titulo}>{title}</Text>
        <Text style={styles.preco}>R$ {price.toFixed(2)}</Text>
      </View>
      
      <Text style={styles.descricao}>{description}</Text>

      {/* Renderização Condicional do Status do Estoque */}
      <View style={[styles.badge, inStock ? styles.badgeEmEstoque : styles.badgeIndisponivel]}>
        <Text style={[styles.textoBadge, inStock ? styles.textoEmEstoque : styles.textoIndisponivel]}>
          {inStock ? 'Em Estoque' : 'Indisponível'}
        </Text>
      </View>

    </View>
  );
}

// ==========================================
// 2. TELA PRINCIPAL: App
// ==========================================
export default function App() {
  // Array de objetos com os 4 produtos exigidos
  const produtos = [
    {
      id: 1,
      title: 'Fone de Ouvido Bluetooth',
      price: 189.90,
      description: 'Fone com cancelamento de ruído ativo e bateria de até 24 horas de duração.',
      inStock: true,
    },
    {
      id: 2,
      title: 'Teclado Mecânico RGB',
      price: 349.00,
      description: 'Teclado Switch Blue com layout ABNT2 e iluminação personalizável.',
      inStock: false, // <-- Este ficará transparente e "Indisponível"
    },
    {
      id: 3,
      title: 'Smartwatch Series X',
      price: 599.99,
      description: 'Monitoramento cardíaco, GPS integrado e resistente à água até 50m.',
      inStock: true,
    },
    {
      id: 4,
      title: 'Carregador Rápido 30W',
      price: 89.90,
      description: 'Carregador de parede USB-C homologado pela Anatel, compatível com carga rápida.',
      inStock: false, // <-- Este também ficará transparente
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />
      
      <Text style={styles.tituloTela}>⚡ Vitrine de Produtos</Text>

      {/* Renderizando os componentes dinamicamente usando .map() */}
      {produtos.map((produto) => (
        <ProductCard
          key={produto.id}
          title={produto.title}
          price={produto.price}
          description={produto.description}
          inStock={produto.inStock}
        />
      ))}
    </ScrollView>
  );
}

// ==========================================
// 3. ESTILIZAÇÃO (Styles)
// ==========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  contentContainer: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  tituloTela: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  // Estilo aplicado condicionalmente para diminuir a opacidade
  cardIndisponivel: {
    opacity: 0.5, 
  },
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1C1E',
    flex: 1,
    marginRight: 10,
  },
  preco: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007AFF', // Azul
  },
  descricao: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeEmEstoque: {
    backgroundColor: '#E8F5E9', // Fundo verde claro
  },
  badgeIndisponivel: {
    backgroundColor: '#FFEBEE', // Fundo vermelho claro
  },
  textoBadge: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  textoEmEstoque: {
    color: '#2E7D32', // Texto verde escuro
  },
  textoIndisponivel: {
    color: '#C62828', // Texto vermelho escuro
  },
});