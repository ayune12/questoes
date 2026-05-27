import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StatusBar,
  Keyboard
} from 'react-native';

export default function App() {
  // Estado para armazenar o texto digitado no input
  const [textoTarefa, setTextoTarefa] = useState('');
  
  // Estado para armazenar a lista de tarefas
  const [tarefas, setTarefas] = useState([
    { id: '1', texto: 'Estudar React Native', concluida: true },
    { id: '2', texto: 'Fazer os exercícios de Props', concluida: false },
  ]);

  // Função para adicionar uma nova tarefa
  const adicionarTarefa = () => {
    // Validação para não adicionar tarefas vazias
    if (textoTarefa.trim() === '') return;

    const novaTarefa = {
      id: Date.now().toString(), // Gera um ID único baseado no timestamp atual
      texto: textoTarefa,
      concluida: false,
    };

    setTarefas([...tarefas, novaTarefa]); // Adiciona a nova tarefa mantendo as antigas
    setTextoTarefa(''); // Limpa o campo de texto
    Keyboard.dismiss(); // Fecha o teclado do celular
  };

  // Função para alternar o status de concluída (Toggle)
  const alternarConcluida = (id) => {
    const listaAtualizada = tarefas.map(tarefa => {
      if (tarefa.id === id) {
        return { ...tarefa, concluida: !tarefa.concluida };
      }
      return tarefa;
    });
    setTarefas(listaAtualizada);
  };

  // Função para remover uma tarefa
  const removerTarefa = (id) => {
    const listaFiltrada = tarefas.filter(tarefa => tarefa.id !== id);
    setTarefas(listaFiltrada);
  };

  // Regra de Negócio: Calcula dinamicamente a quantidade de tarefas concluídas
  const totalConcluidas = tarefas.filter(tarefa => tarefa.concluida).length;

  // Função que renderiza cada item da lista
  const renderizarTarefa = ({ item }) => (
    <View style={styles.cardTarefa}>
      
      {/* Área clicável do texto: ao clicar, marca/desmarca como concluída */}
      <TouchableOpacity 
        style={styles.textoContainer} 
        onPress={() => alternarConcluida(item.id)}
      >
        {/* Ícone visual simples em texto para simular o checkbox */}
        <Text style={styles.checkbox}>
          {item.concluida ? '✅' : '⬜'}
        </Text>
        
        {/* Aplica estilo de linha riscada se a tarefa estiver concluída */}
        <Text style={[styles.textoTarefa, item.concluida && styles.textoTarefaConcluida]}>
          {item.texto}
        </Text>
      </TouchableOpacity>

      {/* Botão de excluir tarefa */}
      <TouchableOpacity 
        style={styles.botaoDeletar} 
        onPress={() => removerTarefa(item.id)}
      >
        <Text style={styles.textoBotaoDeletar}>❌</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />

      <Text style={styles.titulo}>📝 Minhas Tarefas</Text>

      {/* Contador de tarefas concluídas */}
      <View style={styles.painelProgresso}>
        <Text style={styles.textoProgresso}>
          Concluídas: <Text style={styles.numeroProgresso}>{totalConcluidas}</Text> de {tarefas.length}
        </Text>
      </View>

      {/* Campo de Entrada e Botão de Adicionar */}
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="Nova tarefa..."
          placeholderTextColor="#8E8E93"
          value={textoTarefa}
          onChangeText={setTextoTarefa}
        />
        <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarTarefa}>
          <Text style={styles.textoBotaoAdicionar}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Tarefas */}
      <FlatList
        data={tarefas}
        keyExtractor={item => item.id}
        renderItem={renderizarTarefa}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <Text style={styles.textoListaVazia}>Nenhuma tarefa por aqui. Relaxe! 😎</Text>
        }
      />
    </View>
  );
}

// Estilização do Aplicativo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1C1E',
    textAlign: 'center',
    marginBottom: 10,
  },
  painelProgresso: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 1,
  },
  textoProgresso: {
    fontSize: 16,
    color: '#3A3A3C',
    fontWeight: '500',
  },
  numeroProgresso: {
    color: '#34C759', // Verde
    fontWeight: 'bold',
  },
  containerInput: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1C1C1E',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  botaoAdicionar: {
    width: 50,
    height: 50,
    backgroundColor: '#007AFF', // Azul
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    elevation: 2,
  },
  textoBotaoAdicionar: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  lista: {
    paddingBottom: 20,
  },
  cardTarefa: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 1,
  },
  textoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    fontSize: 18,
    marginRight: 12,
  },
  textoTarefa: {
    fontSize: 16,
    color: '#1C1C1E',
    flex: 1,
  },
  textoTarefaConcluida: {
    textDecorationLine: 'line-through', // Risca o texto
    color: '#8E8E93', // Deixa cinza claro
  },
  botaoDeletar: {
    padding: 4,
  },
  textoBotaoDeletar: {
    fontSize: 16,
  },
  textoListaVazia: {
    textAlign: 'center',
    color: '#8E8E93',
    marginTop: 40,
    fontSize: 16,
    fontStyle: 'italic',
  },
});