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
  // Estados para os campos de entrada (Inputs)
  const [nome, setNome] = useState('');
  const [notaInput, setNotaInput] = useState('');

  // Estado para armazenar a lista de alunos cadastrados
  const [alunos, setAlunos] = useState([
    { id: '1', nome: 'Lucas Silva', nota: 8.5 },
    { id: '2', nome: 'Mariana Costa', nota: 9.2 },
    { id: '3', nome: 'Pedro Rocha', nota: 5.0 },
  ]);

  // Função para adicionar um novo aluno à lista
  const adicionarAluno = () => {
    // Validação básica de campos vazios
    if (nome.trim() === '' || notaInput.trim() === '') return;

    // Converte a nota para número flutuante
    const notaNumero = parseFloat(notaInput.replace(',', '.'));

    // Valida se a nota está entre 0 e 10
    if (isNaN(notaNumero) || notaNumero < 0 || notaNumero > 10) {
      alert('Por favor, digite uma nota válida entre 0 e 10.');
      return;
    }

    const novoAluno = {
      id: Date.now().toString(),
      nome: nome,
      nota: notaNumero,
    };

    setAlunos([...alunos, novoAluno]); // Atualiza a lista
    setNome(''); // Limpa o campo nome
    setNotaInput(''); // Limpa o campo nota
    Keyboard.dismiss(); // Fecha o teclado do celular
  };

  // ==========================================
  // CÁLCULOS ESTATÍSTICOS (Roda a cada render)
  // ==========================================
  const totalAlunos = alunos.length;

  // Extrai apenas os números das notas em um novo array
  const todasAsNotas = alunos.map(aluno => aluno.nota);

  // Média da turma
  const mediaTurma = totalAlunos > 0 
    ? todasAsNotas.reduce((soma, nota) => soma + nota, 0) / totalAlunos 
    : 0;

  // Maior nota
  const maiorNota = totalAlunos > 0 ? Math.max(...todasAsNotas) : 0;

  // Menor nota
  const menorNota = totalAlunos > 0 ? Math.min(...todasAsNotas) : 0;

  // Componente visual para renderizar cada linha/aluno da lista
  const renderizarAluno = ({ item }) => (
    <View style={styles.cardAluno}>
      <Text style={styles.nomeAluno}>{item.nome}</Text>
      <View style={[styles.badgeNota, item.nota >= 7 ? styles.notaAzul : styles.notaVermelha]}>
        <Text style={styles.textoBadgeNota}>{item.nota.toFixed(1)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />
      
      <Text style={styles.tituloTela}>📊 Diário de Notas</Text>

      {/* --- FORMULÁRIO DE CADASTRO --- */}
      <View style={styles.containerCadastro}>
        <TextInput
          style={styles.inputNome}
          placeholder="Nome do Aluno"
          placeholderTextColor="#8E8E93"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.inputNota}
          placeholder="Nota"
          placeholderTextColor="#8E8E93"
          keyboardType="numeric"
          maxLength={4}
          value={notaInput}
          onChangeText={setNotaInput}
        />
        <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarAluno}>
          <Text style={styles.textoBotaoAdicionar}>+</Text>
        </TouchableOpacity>
      </View>

      {/* --- PAINEL DE ESTATÍSTICAS (DASHBOARD) --- */}
      <View style={styles.painelEstatistica}>
        <View style={styles.colunaEstatistica}>
          <Text style={styles.labelEstatistica}>Média</Text>
          <Text style={[styles.valorEstatistica, { color: mediaTurma >= 7 ? '#34C759' : '#FF3B30' }]}>
            {mediaTurma.toFixed(1)}
          </Text>
        </View>
        
        <View style={styles.divisorVertical} />

        <View style={styles.colunaEstatistica}>
          <Text style={styles.labelEstatistica}>Maior Nota</Text>
          <Text style={[styles.valorEstatistica, { color: '#007AFF' }]}>
            {maiorNota.toFixed(1)}
          </Text>
        </View>

        <View style={styles.divisorVertical} />

        <View style={styles.colunaEstatistica}>
          <Text style={styles.labelEstatistica}>Menor Nota</Text>
          <Text style={[styles.valorEstatistica, { color: '#FF9500' }]}>
            {menorNota.toFixed(1)}
          </Text>
        </View>
      </View>

      {/* --- LISTA DE ALUNOS --- */}
      <FlatList
        data={alunos}
        keyExtractor={item => item.id}
        renderItem={renderizarAluno}
        contentContainerStyle={styles.listaContainer}
        ListEmptyComponent={
          <Text style={styles.textoListaVazia}>Nenhum aluno cadastrado ainda. 🏫</Text>
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
  tituloTela: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1C1C1E',
    textAlign: 'center',
    marginBottom: 20,
  },
  containerCadastro: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  inputNome: {
    flex: 2,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1C1C1E',
    elevation: 1,
  },
  inputNota: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#1C1C1E',
    marginLeft: 10,
    textAlign: 'center',
    elevation: 1,
  },
  botaoAdicionar: {
    width: 50,
    height: 50,
    backgroundColor: '#34C759', // Verde
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
  painelEstatistica: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  colunaEstatistica: {
    alignItems: 'center',
    flex: 1,
  },
  labelEstatistica: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8E8E93',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  valorEstatistica: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  divisorVertical: {
    width: 1,
    height: '70%',
    backgroundColor: '#E5E5EA',
  },
  listaContainer: {
    paddingBottom: 20,
  },
  cardAluno: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 1,
  },
  nomeAluno: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  badgeNota: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    minWidth: 45,
    alignItems: 'center',
  },
  notaAzul: {
    backgroundColor: '#E8F5E9',
  },
  notaVermelha: {
    backgroundColor: '#FFF5F5',
  },
  textoBadgeNota: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#1C1C1E',
  },
  textoListaVazia: {
    textAlign: 'center',
    color: '#8E8E93',
    marginTop: 40,
    fontSize: 15,
    fontStyle: 'italic',
  },
});