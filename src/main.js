import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import {
  View, Text, TextInput, FlatList, TouchableOpacity, ScrollView, Modal, Image, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { estilos, CORES } from './styles';
import { armazenamento, utils, dadosMock, feedback } from './funcoes';

// ==================== MODAL DE CONFIRMAÇÃO ====================
=======
<<<<<<< HEAD
import { View, Text, TextInput, FlatList, TouchableOpacity, ScrollView, Modal, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { estilos, CORES } from './styles';
import { armazenamento, feedback, utils, dadosMock, calcularConquistas } from './funcoes';

// ==================== COMPONENTE: MODAL DE CONFIRMAÇÃO ====================
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
function ModalConfirmar({ visivel, titulo, mensagem, onConfirmar, onCancelar }) {
  return (
    <Modal transparent visible={visivel} animationType="fade">
      <View style={estilos.modalOverlay}>
        <View style={estilos.modalContainer}>
          <Text style={estilos.modalTitulo}>{titulo}</Text>
          <Text style={estilos.modalMensagem}>{mensagem}</Text>
          <View style={estilos.modalBotoes}>
            <TouchableOpacity onPress={onCancelar} style={estilos.modalBotaoCancelar}>
              <Text style={{ fontSize: 16, color: CORES.textoMedio, fontWeight: '600' }}>
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirmar} style={estilos.modalBotaoConfirmar}>
              <Text style={{ fontSize: 16, color: CORES.branco, fontWeight: 'bold' }}>
                Confirmar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

<<<<<<< HEAD
=======
// ==================== COMPONENTE: MODAL DE SUCESSO ====================
function ModalSucesso({ visivel, onFechar }) {
  return (
    <Modal transparent visible={visivel} animationType="fade">
      <View style={estilos.modalOverlay}>
        <View style={[estilos.modalContainer, { alignItems: 'center' }]}>
          <MaterialIcons name="check-circle" size={60} color={CORES.primaria} />
          <Text style={[estilos.modalTitulo, { marginTop: 15, marginBottom: 10 }]}>
            Sucesso!
          </Text>
          <Text style={[estilos.modalMensagem, { textAlign: 'center' }]}>
            Lista criada com sucesso!
          </Text>
          <TouchableOpacity onPress={onFechar} style={estilos.modalBotaoConfirmar}>
            <Text style={{ color: CORES.branco, fontSize: 16, fontWeight: 'bold' }}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
// ==================== TELA: INICIAL ====================
export function TelaInicial({ navigation }) {
  const [listas, setListas] = useState([]);
  const [modalExcluir, setModalExcluir] = useState({ visivel: false, item: null });

  useEffect(() => {
    carregarListas();
    const unsubscribe = navigation.addListener('focus', carregarListas);
    return unsubscribe;
  }, [navigation]);

  const carregarListas = async () => {
    const ativas = await armazenamento.obterAtivas();
    setListas(ativas);
  };

  const abrirModalExcluir = (item) => {
<<<<<<< HEAD
    feedback.vibrarCurto(); // VIBRA AO CLICAR
=======
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
    setModalExcluir({ visivel: true, item });
  };

  const confirmarExclusao = async () => {
<<<<<<< HEAD
    if (!modalExcluir.item) return;
    feedback.vibrarMedio(); // VIBRA AO EXCLUIR
    await armazenamento.excluir(modalExcluir.item.id);
    setModalExcluir({ visivel: false, item: null });
    carregarListas();
=======
    if (modalExcluir.item) {
      await armazenamento.excluir(modalExcluir.item.id);
      setModalExcluir({ visivel: false, item: null });
      carregarListas();
    }
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
  };

  const renderizarLista = ({ item }) => {
    const progresso = utils.calcularProgresso(item.itens);
    const feitos = utils.contarMarcados(item.itens);

    return (
      <View style={estilos.card}>
        <TouchableOpacity
          activeOpacity={0.7}
<<<<<<< HEAD
          onPress={() => {
            feedback.vibrarCurto(); // VIBRA AO CLICAR
            navigation.navigate('DetalhesLista', { idLista: item.id });
          }}
=======
          onPress={() => navigation.navigate('DetalhesLista', { idLista: item.id })}
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
        >
          <View style={estilos.linhaEntre}>
            <Text style={estilos.subtitulo}>{item.nome}</Text>
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                abrirModalExcluir(item);
              }}
<<<<<<< HEAD
              style={estilos.botaoIcone}
            >
              <MaterialIcons name="delete" size={22} color={CORES.perigo} />
            </TouchableOpacity>
          </View>

          <Text style={estilos.textoMini}>{item.categoria || 'Sem categoria'}</Text>
          <Text style={estilos.textoProgresso}>{feitos}/{item.itens.length} itens</Text>
=======
              style={{ padding: 5 }}
            >
              <MaterialIcons name="delete" size={26} color={CORES.perigo} />
            </TouchableOpacity>
          </View>

          <Text style={estilos.textoMini}>
            {utils.formatarData(item.dataCriacao)}
          </Text>

          <Text style={estilos.textoProgresso}>
            {feitos}/{item.itens.length} itens
          </Text>
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4

          <View style={estilos.barraProgresso}>
            <View style={[estilos.preenchimentoProgresso, { width: `${progresso}%` }]} />
          </View>
        </TouchableOpacity>
      </View>
<<<<<<< HEAD
=======
=======
import { View, Text, TextInput, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { estilos, CORES } from './styles';
import { armazenamento, feedback, calculos } from './funcoes';

// ==================== TELA INICIAL ====================
export function TelaInicial({ navigation }) {
  const [listas, setListas] = useState([]);

  useEffect(() => {
    carregarListas();
    const remover = navigation.addListener('focus', carregarListas);
    return remover;
  }, [navigation]);

  const carregarListas = async () => {
    const listasAtivas = await armazenamento.obterListasAtivas();
    setListas(listasAtivas);
  };

  const excluirLista = (id) => {
    feedback.confirmarExclusao(
      'Excluir Lista',
      'Tem certeza?',
      async () => {
        await armazenamento.excluirLista(id);
        carregarListas();
      }
    );
  };

  const renderItem = ({ item }) => {
    const progresso = calculos.calcularProgresso(item.itens);
    const concluidos = item.itens.filter(i => i.marcado).length;

    return (
      <TouchableOpacity
        style={estilos.card}
        onPress={() => navigation.navigate('DetalhesLista', { idLista: item.id })}
      >
        <View style={estilos.linhaEntre}>
          <Text style={estilos.subtitulo}>{item.nome}</Text>
          <TouchableOpacity onPress={() => excluirLista(item.id)}>
            <MaterialIcons name="delete" size={24} color={CORES.perigo} />
          </TouchableOpacity>
        </View>
        
        <Text style={estilos.textoMini}>
          Criada em: {calculos.formatarData(item.dataCriacao)}
        </Text>
        
        <Text style={estilos.textoProgresso}>
          {concluidos}/{item.itens.length} itens comprados
        </Text>
        
        <View style={estilos.barraProgresso}>
          <View style={[estilos.preenchimentoProgresso, { width: `${progresso}%` }]} />
        </View>
      </TouchableOpacity>
>>>>>>> 22a61768673c58df3bf28a94baab7eb52948f5fa
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
    );
  };

  return (
    <View style={estilos.container}>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
      <ModalConfirmar
        visivel={modalExcluir.visivel}
        titulo="🗑️ Excluir Lista"
        mensagem={`Deseja excluir "${modalExcluir.item?.nome}"?`}
        onConfirmar={confirmarExclusao}
        onCancelar={() => setModalExcluir({ visivel: false, item: null })}
      />

      {listas.length === 0 ? (
        <View style={estilos.vazioContainer}>
          <MaterialIcons name="shopping-cart" size={80} color={CORES.cinzaClaro} />
          <Text style={estilos.vazioMensagem}>Nenhuma lista</Text>
          <Text style={estilos.vazioSubmensagem}>Toque no + para criar</Text>
        </View>
      ) : (
<<<<<<< HEAD
        <FlatList data={listas} keyExtractor={i => i.id} renderItem={renderizarLista} />
      )}

      <TouchableOpacity
        style={estilos.botaoFlutuante}
        onPress={() => {
          feedback.vibrarCurto(); // VIBRA AO CRIAR
          navigation.navigate('CriarLista');
        }}
      >
        <MaterialIcons name="add" size={32} color={CORES.branco} />
=======
        <FlatList
          data={listas}
          keyExtractor={item => item.id}
          renderItem={renderizarLista}
        />
      )}

=======
      <FlatList
        data={listas}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={estilos.vazioContainer}>
            <MaterialIcons name="shopping-cart" size={80} color={CORES.cinzaClaro} />
            <Text style={estilos.vazioMensagem}>Nenhuma lista ativa</Text>
            <Text style={estilos.vazioSubmensagem}>Crie sua primeira lista!</Text>
          </View>
        }
      />
>>>>>>> 22a61768673c58df3bf28a94baab7eb52948f5fa
      <TouchableOpacity
        style={estilos.botaoFlutuante}
        onPress={() => navigation.navigate('CriarLista')}
      >
<<<<<<< HEAD
        <MaterialIcons name="add" size={32} color={CORES.branco} />
=======
        <MaterialIcons name="add" size={30} color={CORES.branco} />
>>>>>>> 22a61768673c58df3bf28a94baab7eb52948f5fa
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
      </TouchableOpacity>
    </View>
  );
}

<<<<<<< HEAD
// ==================== TELA: CRIAR LISTA ====================
export function TelaCriarLista({ navigation }) {
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [itemNome, setItemNome] = useState('');
  const [itens, setItens] = useState([]);
=======
<<<<<<< HEAD
// ==================== TELA: CRIAR LISTA ====================
export function TelaCriarLista({ navigation }) {
  const [nome, setNome] = useState('');
  const [itemNome, setItemNome] = useState('');
  const [itens, setItens] = useState([]);
  const [salvando, setSalvando] = useState(false);
  const [modalSucesso, setModalSucesso] = useState(false);
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
  const [erro, setErro] = useState('');

  const adicionarItem = () => {
    if (!itemNome.trim()) return;
<<<<<<< HEAD
    feedback.vibrarCurto(); // VIBRA AO ADICIONAR
    setItens(prev => [...prev, { id: utils.gerarId(), nome: itemNome.trim(), marcado: false }]);
=======

    setItens([...itens, {
      id: utils.gerarId(),
      nome: itemNome.trim(),
      marcado: false
    }]);
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
    setItemNome('');
  };

  const removerItem = (id) => {
<<<<<<< HEAD
    feedback.vibrarCurto(); // VIBRA AO REMOVER
    setItens(prev => prev.filter(i => i.id !== id));
  };

  const salvar = async () => {
    if (!nome.trim()) {
      feedback.vibrarAlerta(); // VIBRA NO ERRO
      setErro('Digite o nome da lista');
      setTimeout(() => setErro(''), 2500);
      return;
    }
    if (itens.length === 0) {
      feedback.vibrarAlerta(); // VIBRA NO ERRO
      setErro('Adicione ao menos 1 item');
      setTimeout(() => setErro(''), 2500);
      return;
    }

    const nova = {
      id: utils.gerarId(),
      nome: nome.trim(),
      categoria: categoria.trim() || 'Sem categoria',
=======
=======
// ==================== CRIAR LISTA ====================
export function TelaCriarLista({ navigation }) {
  const [nomeLista, setNomeLista] = useState('');
  const [nomeItem, setNomeItem] = useState('');
  const [itens, setItens] = useState([]);

  const adicionarItem = () => {
    if (nomeItem.trim()) {
      feedback.vibrarCurto();
      setItens([...itens, {
        id: calculos.gerarId(),
        nome: nomeItem.trim(),
        marcado: false,
      }]);
      setNomeItem('');
    }
  };

  const removerItem = (id) => {
    feedback.vibrarCurto();
>>>>>>> 22a61768673c58df3bf28a94baab7eb52948f5fa
    setItens(itens.filter(item => item.id !== id));
  };

  const salvar = async () => {
<<<<<<< HEAD
    if (!nome.trim()) {
      setErro('Digite o nome da lista');
      setTimeout(() => setErro(''), 3000);
      return;
    }

    if (itens.length === 0) {
      setErro('Adicione pelo menos 1 item');
      setTimeout(() => setErro(''), 3000);
      return;
    }

    setSalvando(true);

    const novaLista = {
      id: utils.gerarId(),
      nome: nome.trim(),
      itens,
      dataCriacao: new Date().toISOString(),
      concluida: false
    };

    await armazenamento.adicionar(novaLista);
    setSalvando(false);
    setModalSucesso(true);
  };

  return (
    <View style={estilos.container}>
      <ModalSucesso
        visivel={modalSucesso}
        onFechar={() => {
          setModalSucesso(false);
          navigation.goBack();
        }}
      />

      <ScrollView>
        <View style={estilos.conteudo}>
          {erro !== '' && (
            <View style={estilos.bannerErro}>
              <Text style={estilos.textoErro}>⚠️ {erro}</Text>
            </View>
          )}

          <Text style={estilos.rotulo}>Nome da Lista</Text>
          <TextInput
            style={estilos.input}
            placeholder="Ex: Supermercado"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={[estilos.rotulo, { marginTop: 20 }]}>Itens</Text>
          <View style={estilos.containerAdicionarItem}>
            <TextInput
              style={[estilos.input, estilos.inputItem]}
              placeholder="Ex: Arroz"
              value={itemNome}
              onChangeText={setItemNome}
=======
    if (!nomeLista.trim()) {
      feedback.mostrarErro('Digite um nome para a lista');
      return;
    }
    if (itens.length === 0) {
      feedback.mostrarErro('Adicione pelo menos um item');
      return;
    }

    const novaLista = {
      id: calculos.gerarId(),
      nome: nomeLista.trim(),
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
      itens,
      dataCriacao: new Date().toISOString(),
      concluida: false,
    };

<<<<<<< HEAD
    await armazenamento.adicionar(nova);
    feedback.vibrarSucesso(); // VIBRA AO SALVAR
    navigation.goBack();
=======
    const sucesso = await armazenamento.salvarLista(novaLista);
    
    if (sucesso) {
      feedback.mostrarSucesso(
        'Sucesso!',
        'Lista criada!',
        () => navigation.goBack()
      );
    } else {
      feedback.mostrarErro('Erro ao salvar');
    }
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
  };

  return (
    <ScrollView style={estilos.container}>
      <View style={estilos.conteudo}>
<<<<<<< HEAD
        {erro !== '' && (
          <View style={estilos.bannerErro}>
            <Text style={estilos.textoErro}>⚠️ {erro}</Text>
          </View>
        )}

        <Text style={estilos.rotulo}>Nome da Lista</Text>
        <TextInput style={estilos.input} placeholder="Ex: Supermercado" value={nome} onChangeText={setNome} />

        <Text style={[estilos.rotulo, { marginTop: 15 }]}>Categoria</Text>
        <TextInput style={estilos.input} placeholder="Ex: Casa, Festa" value={categoria} onChangeText={setCategoria} />

        <Text style={[estilos.rotulo, { marginTop: 15 }]}>Itens</Text>
        <View style={estilos.containerAdicionarItem}>
          <TextInput
            style={[estilos.input, estilos.inputItem]}
            placeholder="Ex: Arroz"
            value={itemNome}
            onChangeText={setItemNome}
            onSubmitEditing={adicionarItem}
          />
          <TouchableOpacity style={estilos.botaoAdicionar} onPress={adicionarItem}>
            <MaterialIcons name="add" size={24} color={CORES.branco} />
          </TouchableOpacity>
        </View>

        {itens.length > 0 && (
          <View style={{ marginTop: 10 }}>
            {itens.map(i => (
              <View key={i.id} style={[estilos.itemContainer, { justifyContent: 'space-between' }]}>
                <Text style={estilos.itemTexto}>• {i.nome}</Text>
                <TouchableOpacity onPress={() => removerItem(i.id)}>
                  <MaterialIcons name="close" size={20} color={CORES.perigo} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity style={[estilos.botaoPrimario, { marginTop: 20 }]} onPress={salvar}>
          <Text style={estilos.textoBotao}>✅ Salvar Lista</Text>
=======
        <View style={estilos.secao}>
          <Text style={estilos.rotulo}>Nome da Lista</Text>
          <TextInput
            style={estilos.input}
            placeholder="Ex: Compras do Mês"
            value={nomeLista}
            onChangeText={setNomeLista}
          />
        </View>

        <View style={estilos.secao}>
          <Text style={estilos.rotulo}>Adicionar Item</Text>
          <View style={estilos.containerAdicionarItem}>
            <TextInput
              style={[estilos.input, estilos.inputItem]}
              placeholder="Ex: Arroz, Feijão..."
              value={nomeItem}
              onChangeText={setNomeItem}
>>>>>>> 22a61768673c58df3bf28a94baab7eb52948f5fa
              onSubmitEditing={adicionarItem}
            />
            <TouchableOpacity style={estilos.botaoAdicionar} onPress={adicionarItem}>
              <MaterialIcons name="add" size={24} color={CORES.branco} />
            </TouchableOpacity>
          </View>
<<<<<<< HEAD

          {itens.length > 0 && (
            <View style={{ marginTop: 15 }}>
              <Text style={estilos.textoMini}>{itens.length} itens adicionados</Text>
              {itens.map(item => (
                <View key={item.id} style={estilos.itemContainer}>
                  <Text style={estilos.itemTexto}>{item.nome}</Text>
                  <TouchableOpacity onPress={() => removerItem(item.id)}>
                    <MaterialIcons name="close" size={24} color={CORES.perigo} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          <TouchableOpacity
            style={[estilos.botaoPrimario, { marginTop: 30, opacity: salvando ? 0.5 : 1 }]}
            onPress={salvar}
            disabled={salvando}
          >
            <Text style={estilos.textoBotao}>
              {salvando ? '⏳ Salvando...' : '✅ Salvar Lista'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

// ==================== TELA: DETALHES DA LISTA ====================
export function TelaDetalhesLista({ route, navigation }) {
  const { idLista } = route.params;
  const [lista, setLista] = useState(null);
  const [modalFinalizar, setModalFinalizar] = useState(false);
=======
        </View>

        <View style={estilos.secao}>
          {itens.length > 0 ? (
            itens.map(item => (
              <View key={item.id} style={estilos.itemContainer}>
                <Text style={estilos.itemTexto}>{item.nome}</Text>
                <TouchableOpacity onPress={() => removerItem(item.id)}>
                  <MaterialIcons name="close" size={24} color={CORES.perigo} />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={estilos.textoVazio}>Nenhum item adicionado</Text>
          )}
        </View>

        <TouchableOpacity style={estilos.botaoPrimario} onPress={salvar}>
          <Text style={estilos.textoBotao}>Salvar Lista</Text>
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

<<<<<<< HEAD
// ==================== TELA: DETALHES DA LISTA ====================
export function TelaDetalhesLista({ route, navigation }) {
  const params = route?.params || {};
  const idLista = params.idLista;
  const [lista, setLista] = useState(null);
  const [modalFinalizar, setModalFinalizar] = useState(false);

  useEffect(() => {
    carregar();
  }, [idLista]);

  const carregar = async () => {
    if (!idLista) {
      setLista(null);
      return;
    }
    const encontrada = await armazenamento.obterPorId(idLista);
    setLista(encontrada || null);
  };

  const toggleItem = async (idItem) => {
    if (!lista) return;
    feedback.vibrarCurto(); // VIBRA AO MARCAR
    const novosItens = lista.itens.map(item =>
      item.id === idItem ? { ...item, marcado: !item.marcado } : item
    );
    const nova = { ...lista, itens: novosItens };
    setLista(nova);
    await armazenamento.atualizar(lista.id, nova);
  };

  const confirmarFinalizacao = async () => {
    if (!lista) return;
    feedback.vibrarSucesso(); // VIBRA AO FINALIZAR
    await armazenamento.atualizar(lista.id, { ...lista, concluida: true, dataConclusao: new Date().toISOString() });
    setModalFinalizar(false);
    navigation.goBack();
  };

  if (!idLista || !lista) {
=======
// ==================== DETALHES LISTA ====================
export function TelaDetalhesLista({ route, navigation }) {
  const { idLista } = route.params;
  const [lista, setLista] = useState(null);
>>>>>>> 22a61768673c58df3bf28a94baab7eb52948f5fa

  useEffect(() => {
    carregarLista();
  }, []);

  const carregarLista = async () => {
<<<<<<< HEAD
    const encontrada = await armazenamento.obterPorId(idLista);
    setLista(encontrada);
  };

  const toggleItem = async (idItem) => {
    const novosItens = lista.itens.map(item =>
      item.id === idItem ? { ...item, marcado: !item.marcado } : item
    );

    const novaLista = { ...lista, itens: novosItens };
    setLista(novaLista);
    await armazenamento.atualizar(idLista, novaLista);
  };

  const confirmarFinalizacao = async () => {
    await armazenamento.concluir(idLista);
    setModalFinalizar(false);
    navigation.goBack();
=======
    const encontrada = await armazenamento.obterListaPorId(idLista);
    setLista(encontrada);
  };

  const alternarItem = async (idItem) => {
    feedback.vibrarCurto();
    
    const itensAtualizados = lista.itens.map(item =>
      item.id === idItem ? { ...item, marcado: !item.marcado } : item
    );
    
    const listaAtualizada = { ...lista, itens: itensAtualizados };
    setLista(listaAtualizada);
    await armazenamento.atualizarLista(idLista, listaAtualizada);
  };

  const finalizar = () => {
    feedback.confirmarExclusao(
      'Finalizar Lista',
      'Marcar como concluída?',
      async () => {
        await armazenamento.concluirLista(idLista);
        feedback.vibrarSucesso();
        navigation.goBack();
      }
    );
>>>>>>> 22a61768673c58df3bf28a94baab7eb52948f5fa
  };

  if (!lista) {
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
    return (
      <View style={estilos.containerCentralizado}>
        <Text>Carregando...</Text>
      </View>
    );
  }

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
  const progresso = utils.calcularProgresso(lista.itens);
  const feitos = utils.contarMarcados(lista.itens);

  return (
    <View style={estilos.container}>
      <ModalConfirmar
        visivel={modalFinalizar}
        titulo="✅ Finalizar Compras"
        mensagem={
          feitos === lista.itens.length
            ? 'Marcar como concluída?'
            : `Apenas ${feitos}/${lista.itens.length} itens marcados.\n\nFinalizar mesmo assim?`
        }
        onConfirmar={confirmarFinalizacao}
        onCancelar={() => setModalFinalizar(false)}
      />

      <View style={estilos.cabecalho}>
        <Text style={estilos.titulo}>{lista.nome}</Text>
<<<<<<< HEAD
        <Text style={estilos.textoMini}>{lista.categoria}</Text>
        <Text style={estilos.textoProgresso}>{feitos}/{lista.itens.length} ({progresso.toFixed(0)}%)</Text>
=======
        <Text style={estilos.textoProgresso}>
          {feitos}/{lista.itens.length} itens ({progresso.toFixed(0)}%)
=======
  const progresso = calculos.calcularProgresso(lista.itens);
  const concluidos = lista.itens.filter(i => i.marcado).length;
  const completa = progresso === 100;

  return (
    <View style={estilos.container}>
      <View style={estilos.cabecalho}>
        <Text style={estilos.titulo}>{lista.nome}</Text>
        <Text style={estilos.textoProgresso}>
          {concluidos}/{lista.itens.length} itens
>>>>>>> 22a61768673c58df3bf28a94baab7eb52948f5fa
        </Text>
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
        <View style={estilos.barraProgresso}>
          <View style={[estilos.preenchimentoProgresso, { width: `${progresso}%` }]} />
        </View>
      </View>

      <FlatList
        data={lista.itens}
<<<<<<< HEAD
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={estilos.itemContainer} onPress={() => toggleItem(item.id)}>
=======
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={estilos.itemContainer}
<<<<<<< HEAD
            onPress={() => toggleItem(item.id)}
=======
            onPress={() => alternarItem(item.id)}
>>>>>>> 22a61768673c58df3bf28a94baab7eb52948f5fa
          >
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
            <MaterialIcons
              name={item.marcado ? 'check-box' : 'check-box-outline-blank'}
              size={28}
              color={item.marcado ? CORES.primaria : CORES.cinzaMedio}
            />
<<<<<<< HEAD
            <Text style={[estilos.itemTexto, item.marcado && estilos.textoMarcado]}>{item.nome}</Text>
          </TouchableOpacity>
        )}
=======
            <Text style={[estilos.itemTexto, item.marcado && estilos.textoMarcado]}>
              {item.nome}
            </Text>
          </TouchableOpacity>
        )}
<<<<<<< HEAD
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <View style={estilos.rodapeFixo}>
        <TouchableOpacity
          style={estilos.botaoPrimario}
<<<<<<< HEAD
          onPress={() => {
            feedback.vibrarMedio(); // VIBRA AO CLICAR
            setModalFinalizar(true);
          }}
        >
          <View style={estilos.linha}>
            <MaterialIcons name="check-circle" size={22} color={CORES.branco} />
            <Text style={[estilos.textoBotao, { marginLeft: 8 }]}>Finalizar Compras</Text>
          </View>
        </TouchableOpacity>
      </View>
=======
          onPress={() => setModalFinalizar(true)}
        >
          <View style={estilos.linha}>
            <MaterialIcons name="check-circle" size={24} color={CORES.branco} />
            <Text style={[estilos.textoBotao, { marginLeft: 10 }]}>
              Finalizar Compras
            </Text>
          </View>
        </TouchableOpacity>
      </View>
=======
      />

      {completa && (
        <TouchableOpacity style={estilos.botaoFinalizar} onPress={finalizar}>
          <MaterialIcons name="check-circle" size={24} color={CORES.branco} />
          <Text style={[estilos.textoBotao, { marginLeft: 10 }]}>Finalizar Lista</Text>
        </TouchableOpacity>
      )}
>>>>>>> 22a61768673c58df3bf28a94baab7eb52948f5fa
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
    </View>
  );
}

<<<<<<< HEAD
// ==================== TELA: COMPARADOR DE PREÇOS ====================
export function TelaComparadorPrecos() {
  const [itemBusca, setItemBusca] = useState('');
  const [resultados, setResultados] = useState([]);
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    carregarHistorico();
  }, []);

  const carregarHistorico = async () => {
    try {
      const h = await AsyncStorage.getItem('@historico_buscas');
      if (h) setHistorico(JSON.parse(h));
    } catch (e) {
      console.error(e);
    }
  };

  const salvarHistorico = async (termo) => {
    const novo = [termo, ...historico.filter(i => i !== termo)].slice(0, 5);
    setHistorico(novo);
    await AsyncStorage.setItem('@historico_buscas', JSON.stringify(novo));
  };

  const buscarPrecos = () => {
    if (!itemBusca.trim()) return;
    feedback.vibrarCurto(); // VIBRA AO BUSCAR

    salvarHistorico(itemBusca.trim());

    const precos = [
      { id: '1', mercado: 'Supermercado Central', preco: (Math.random() * 10 + 5).toFixed(2), distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { id: '2', mercado: 'Atacadão Popular', preco: (Math.random() * 10 +5).toFixed(2), distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { id: '3', mercado: 'Mercado Bom Preço', preco: (Math.random() * 10 + 5).toFixed(2), distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' },
    ].sort((a, b) => parseFloat(a.preco) - parseFloat(b.preco));

    setResultados(precos);
  };

  return (
    <ScrollView style={estilos.container}>
      <View style={estilos.conteudo}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <MaterialIcons name="compare-arrows" size={24} color={CORES.primaria} />
          <Text style={[estilos.titulo, { marginLeft: 8, fontSize: 20 }]}>Comparador de Preços</Text>
        </View>

        <Text style={estilos.textoPequeno}>Compare preços em mercados próximos</Text>

        <View style={[estilos.containerAdicionarItem, { marginTop: 15 }]}>
          <TextInput
            style={[estilos.input, estilos.inputItem]}
            placeholder="Digite o produto (ex: Arroz)"
            value={itemBusca}
            onChangeText={setItemBusca}
            onSubmitEditing={buscarPrecos}
          />
          <TouchableOpacity style={estilos.botaoAdicionar} onPress={buscarPrecos}>
            <MaterialIcons name="search" size={24} color={CORES.branco} />
          </TouchableOpacity>
        </View>

        {historico.length > 0 && resultados.length === 0 && (
          <View style={{ marginTop: 15 }}>
            <Text style={estilos.rotulo}>Buscas recentes</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
              {historico.map((termo, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={{
                    backgroundColor: CORES.cinzaClaro,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 15,
                    marginRight: 8,
                    marginBottom: 8,
                  }}
                  onPress={() => {
                    setItemBusca(termo);
                    setTimeout(buscarPrecos, 100);
                  }}
                >
                  <Text style={estilos.textoMini}>{termo}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {resultados.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <MaterialIcons name="local-offer" size={20} color={CORES.primaria} />
              <Text style={[estilos.subtitulo, { marginLeft: 8 }]}>
                Resultados para "{itemBusca}"
              </Text>
            </View>

            {resultados.map((resultado, idx) => (
              <TouchableOpacity
                key={resultado.id}
                style={[
                  estilos.card,
                  idx === 0 && { borderWidth: 2, borderColor: CORES.primaria, backgroundColor: '#e8f5e9' },
                ]}
                onPress={() => feedback.vibrarCurto()}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={{ uri: resultado.foto }} style={estilos.imagemMercado} />
                  <View style={{ marginLeft: 12, flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={estilos.subtitulo}>{resultado.mercado}</Text>
                      {idx === 0 && (
                        <View style={{
                          backgroundColor: CORES.primaria,
                          paddingHorizontal: 8,
                          paddingVertical: 3,
                          borderRadius: 5,
                          marginLeft: 8,
                        }}>
                          <Text style={{ color: CORES.branco, fontSize: 10, fontWeight: 'bold' }}>MELHOR</Text>
                        </View>
                      )}
                    </View>
                    <Text style={estilos.textoMini}>📍 {resultado.distancia}</Text>
                    <Text style={[estilos.textoProgresso, { fontSize: 22, marginTop: 5 }]}>
                      R$ {resultado.preco}
                    </Text>
                  </View>
                  <MaterialIcons name="chevron-right" size={24} color={CORES.cinzaMedio} />
                </View>
              </TouchableOpacity>
            ))}

            <View style={{ backgroundColor: CORES.primaria, padding: 15, borderRadius: 10, marginTop: 10 }}>
              <Text style={{ color: CORES.branco, fontSize: 16, fontWeight: 'bold' }}>
                💰 Economia Potencial
              </Text>
              <Text style={{ color: CORES.branco, fontSize: 14, marginTop: 5 }}>
                Economize até R$ {(parseFloat(resultados[resultados.length - 1].preco) - parseFloat(resultados[0].preco)).toFixed(2)} comprando no mercado mais barato!
              </Text>
            </View>
          </View>
        )}

        {resultados.length === 0 && historico.length === 0 && (
          <View style={[estilos.vazioContainer, { marginTop: 50 }]}>
            <MaterialIcons name="search" size={60} color={CORES.cinzaClaro} />
            <Text style={[estilos.vazioMensagem, { fontSize: 16 }]}>
              Busque um produto para comparar
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

// ==================== TELA: RECEITAS SUGERIDAS ====================
export function TelaReceitasSugeridas({ navigation }) {
  const [receitaSelecionada, setReceitaSelecionada] = useState(null);

  const criarListaDeReceita = async (receita) => {
    feedback.vibrarSucesso(); // VIBRA AO CRIAR LISTA
    const novaLista = {
      id: utils.gerarId(),
      nome: `Receita: ${receita.nome}`,
      categoria: 'Receita',
      itens: receita.ingredientes.map(ing => ({
        id: utils.gerarId(),
        nome: ing,
        marcado: false,
      })),
      dataCriacao: new Date().toISOString(),
      concluida: false,
    };

    await armazenamento.adicionar(novaLista);
    Alert.alert(
      '✅ Lista Criada!',
      `A lista de compras para "${receita.nome}" foi criada!`,
      [{ text: 'OK', onPress: () => navigation.navigate('Listas') }]
    );
  };

  if (receitaSelecionada) {
    return (
      <ScrollView style={estilos.container}>
        <Image source={{ uri: receitaSelecionada.foto }} style={estilos.imagemMercadoGrande} />

        <View style={estilos.conteudo}>
          <TouchableOpacity
            onPress={() => {
              feedback.vibrarCurto();
              setReceitaSelecionada(null);
            }}
            style={{ marginBottom: 10 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="arrow-back" size={24} color={CORES.primaria} />
              <Text style={{ marginLeft: 8, color: CORES.primaria }}>Voltar</Text>
            </View>
          </TouchableOpacity>

          <Text style={estilos.titulo}>{receitaSelecionada.nome}</Text>

          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
              <MaterialIcons name="schedule" size={18} color={CORES.primaria} />
              <Text style={[estilos.textoPequeno, { marginLeft: 5 }]}>{receitaSelecionada.tempo}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="star" size={18} color={CORES.alerta} />
              <Text style={[estilos.textoPequeno, { marginLeft: 5 }]}>{receitaSelecionada.dificuldade}</Text>
            </View>
          </View>

          <View style={[estilos.card, { marginTop: 20 }]}>
            <Text style={estilos.subtitulo}>📋 Ingredientes</Text>
            {receitaSelecionada.ingredientes.map((ing, idx) => (
              <Text key={idx} style={[estilos.textoNormal, { marginTop: 8 }]}>• {ing}</Text>
            ))}
          </View>

          <View style={[estilos.card, { marginTop: 15 }]}>
            <Text style={estilos.subtitulo}>👨‍🍳 Modo de Preparo</Text>
            {receitaSelecionada.modo.map((passo, idx) => (
              <View key={idx} style={{ flexDirection: 'row', marginTop: 12 }}>
                <Text style={[estilos.textoProgresso, { marginRight: 8 }]}>{idx + 1}.</Text>
                <Text style={[estilos.textoNormal, { flex: 1 }]}>{passo}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={[estilos.botaoPrimario, { marginTop: 20, marginBottom: 30 }]}
            onPress={() => criarListaDeReceita(receitaSelecionada)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="add-shopping-cart" size={20} color={CORES.branco} />
              <Text style={[estilos.textoBotao, { marginLeft: 8 }]}>Criar Lista de Compras</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={estilos.container}>
      <View style={estilos.conteudo}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <MaterialIcons name="restaurant-menu" size={24} color={CORES.primaria} />
          <Text style={[estilos.titulo, { marginLeft: 8, fontSize: 20 }]}>Receitas Sugeridas</Text>
        </View>

        <Text style={estilos.textoPequeno}>
          Escolha uma receita e crie sua lista automaticamente
        </Text>

        {dadosMock.receitas.map(receita => (
          <TouchableOpacity
            key={receita.id}
            style={[estilos.card, { marginTop: 15 }]}
            onPress={() => {
              feedback.vibrarCurto(); // VIBRA AO SELECIONAR
              setReceitaSelecionada(receita);
            }}
            activeOpacity={0.7}
          >
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={{ uri: receita.foto }}
                style={{ width: 80, height: 80, borderRadius: 10, backgroundColor: CORES.cinzaClaro }}
              />
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={estilos.subtitulo}>{receita.nome}</Text>
                <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                  <MaterialIcons name="schedule" size={16} color={CORES.textoMedio} />
                  <Text style={[estilos.textoMini, { marginLeft: 4 }]}>{receita.tempo}</Text>
                  <Text style={[estilos.textoMini, { marginLeft: 10 }]}>• {receita.dificuldade}</Text>
                </View>
                <Text style={[estilos.textoMini, { marginTop: 5 }]}>
                  {receita.ingredientes.length} ingredientes
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={CORES.cinzaMedio} />
            </View>
          </TouchableOpacity>
        ))}
=======
<<<<<<< HEAD
// ==================== TELA: MERCADOS PRÓXIMOS ====================
export function TelaMercadosProximos({ navigation }) {
  return (
    <View style={estilos.container}>
      <View style={[estilos.cabecalho, { flexDirection: 'row', alignItems: 'center' }]}>
        <MaterialIcons name="location-on" size={24} color={CORES.primaria} />
        <Text style={[estilos.textoPequeno, { marginLeft: 10 }]}>Mercados próximos</Text>
      </View>

      <FlatList
        data={dadosMock.mercados}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={estilos.card}
            onPress={() => navigation.navigate('DetalhesMercado', { mercado: item })}
            activeOpacity={0.7}
          >
            {item.promo && (
              <View style={estilos.badgePromocao}>
                <Text style={estilos.textoBadge}>🔥 PROMOÇÃO</Text>
              </View>
            )}

            <View style={estilos.linha}>
              <Image source={{ uri: item.foto }} style={estilos.imagemMercado} resizeMode="cover" />

              <View style={{ marginLeft: 15, flex: 1 }}>
                <Text style={estilos.subtitulo}>{item.nome}</Text>
                <Text style={estilos.textoPequeno}>{item.end}</Text>
                <Text style={estilos.textoProgresso}>📍 {item.dist}</Text>
              </View>

              <MaterialIcons name="chevron-right" size={28} color={CORES.cinzaMedio} />
            </View>
          </TouchableOpacity>
=======
// ==================== MERCADOS PRÓXIMOS ====================
export function TelaMercadosProximos() {
  const mercados = [
    { id: '1', nome: 'Supermercado Exemplo', endereco: 'Rua das Flores, 123', distancia: '500m', promocao: true },
    { id: '2', nome: 'Mercado Bom Preço', endereco: 'Av. Principal, 456', distancia: '1.2km', promocao: false },
  ];

  return (
    <View style={estilos.container}>
      <FlatList
        data={mercados}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={estilos.card}>
            {item.promocao && (
              <View style={{ position: 'absolute', top: 10, right: 10, backgroundColor: CORES.alerta, padding: 5, borderRadius: 5 }}>
                <Text style={{ color: CORES.branco, fontSize: 10, fontWeight: 'bold' }}>PROMOÇÃO</Text>
              </View>
            )}
            <View style={estilos.linha}>
              <MaterialIcons name="store" size={32} color={CORES.primaria} />
              <View style={{ marginLeft: 15, flex: 1 }}>
                <Text style={estilos.subtitulo}>{item.nome}</Text>
                <Text style={estilos.textoPequeno}>{item.endereco}</Text>
                <Text style={estilos.textoProgresso}>📍 {item.distancia}</Text>
              </View>
            </View>
          </View>
>>>>>>> 22a61768673c58df3bf28a94baab7eb52948f5fa
        )}
      />
    </View>
  );
}

<<<<<<< HEAD
// ==================== TELA: DETALHES DO MERCADO ====================
export function TelaDetalhesMercado({ route }) {
  const { mercado } = route.params;

  return (
    <ScrollView style={estilos.container}>
      <Image source={{ uri: mercado.foto }} style={estilos.imagemMercadoGrande} resizeMode="cover" />

      {mercado.promo && (
        <View style={[estilos.badgePromocao, { top: 20, right: 20 }]}>
          <Text style={[estilos.textoBadge, { fontSize: 12 }]}>🔥 PROMOÇÃO</Text>
        </View>
      )}

      <View style={estilos.conteudo}>
        <Text style={estilos.titulo}>{mercado.nome}</Text>

        <View style={[estilos.linha, { marginTop: 10 }]}>
          <MaterialIcons name="location-on" size={20} color={CORES.primaria} />
          <Text style={[estilos.textoPequeno, { marginLeft: 5 }]}>{mercado.end}</Text>
        </View>

        <View style={[estilos.linha, { marginTop: 5 }]}>
          <MaterialIcons name="directions-walk" size={20} color={CORES.secundaria} />
          <Text style={[estilos.textoProgresso, { marginLeft: 5 }]}>{mercado.dist} de distância</Text>
        </View>

        {/* HORÁRIO */}
        <View style={[estilos.card, { marginTop: 20 }]}>
          <View style={[estilos.linha, { marginBottom: 10 }]}>
            <MaterialIcons name="access-time" size={24} color={CORES.primaria} />
            <Text style={[estilos.subtitulo, { marginLeft: 10 }]}>Horário</Text>
          </View>
          <Text style={estilos.textoNormal}>{dadosMock.horarioFuncionamento.semana}</Text>
          <Text style={estilos.textoNormal}>{dadosMock.horarioFuncionamento.domingo}</Text>
        </View>

        {/* AVALIAÇÃO */}
        <View style={[estilos.card, { marginTop: 15 }]}>
          <View style={[estilos.linha, { marginBottom: 10 }]}>
            <MaterialIcons name="star" size={24} color="#FFD700" />
            <Text style={[estilos.subtitulo, { marginLeft: 10 }]}>Avaliação</Text>
          </View>
          <View style={estilos.linha}>
            {[1, 2, 3, 4, 5].map(i => (
              <MaterialIcons
                key={i}
                name={i <= dadosMock.avaliacao.nota ? 'star' : 'star-border'}
                size={28}
                color="#FFD700"
              />
            ))}
            <Text style={[estilos.textoPequeno, { marginLeft: 10, alignSelf: 'center' }]}>
              {dadosMock.avaliacao.nota}.0 ({dadosMock.avaliacao.quantidade} avaliações)
            </Text>
          </View>
        </View>

        {/* PROMOÇÕES */}
        {mercado.promo && (
          <View style={{ marginTop: 15 }}>
            <Text style={estilos.subtitulo}>🔥 Promoções da Semana</Text>

            {dadosMock.produtosPromocao.map(produto => (
              <View key={produto.id} style={[estilos.card, { marginTop: 10 }]}>
                <View style={estilos.linha}>
                  <Image source={{ uri: produto.foto }} style={estilos.imagemProduto} resizeMode="cover" />
                  <View style={{ marginLeft: 15, flex: 1 }}>
                    <Text style={estilos.textoNormal}>{produto.nome}</Text>
                    <Text style={[estilos.textoMini, { textDecorationLine: 'line-through' }]}>
                      {produto.precoAntigo}
                    </Text>
                    <Text style={[estilos.textoProgresso, { fontSize: 18 }]}>
                      {produto.precoNovo}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* BOTÃO COMO CHEGAR */}
        <TouchableOpacity
          style={[estilos.botaoPrimario, { marginTop: 20, marginBottom: 30, backgroundColor: CORES.secundaria }]}
        >
          <View style={estilos.linha}>
            <MaterialIcons name="directions" size={24} color={CORES.branco} />
            <Text style={[estilos.textoBotao, { marginLeft: 10 }]}>Como Chegar</Text>
          </View>
        </TouchableOpacity>
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
      </View>
    </ScrollView>
  );
}

// ==================== TELA: HISTÓRICO ====================
export function TelaHistorico({ navigation }) {
  const [listas, setListas] = useState([]);

  useEffect(() => {
    carregarHistorico();
    const unsubscribe = navigation.addListener('focus', carregarHistorico);
    return unsubscribe;
  }, [navigation]);

  const carregarHistorico = async () => {
    const concluidas = await armazenamento.obterConcluidas();
    setListas(concluidas.reverse());
<<<<<<< HEAD
=======
=======
// ==================== HISTÓRICO ====================
export function TelaHistorico() {
  const [concluidas, setConcluidas] = useState([]);

  useEffect(() => {
    carregarHistorico();
  }, []);

  const carregarHistorico = async () => {
    const listas = await armazenamento.obterListasConcluidas();
    setConcluidas(listas.reverse());
>>>>>>> 22a61768673c58df3bf28a94baab7eb52948f5fa
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
  };

  return (
    <View style={estilos.container}>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
      {listas.length === 0 ? (
        <View style={estilos.vazioContainer}>
          <MaterialIcons name="history" size={80} color={CORES.cinzaClaro} />
          <Text style={estilos.vazioMensagem}>Nenhuma concluída</Text>
<<<<<<< HEAD
          <Text style={estilos.vazioSubmensagem}>Complete uma lista para ver aqui</Text>
=======
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
        </View>
      ) : (
        <FlatList
          data={listas}
<<<<<<< HEAD
          keyExtractor={i => i.id}
=======
          keyExtractor={item => item.id}
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
          renderItem={({ item }) => (
            <View style={estilos.card}>
              <View style={estilos.linha}>
                <MaterialIcons name="check-circle" size={32} color={CORES.primaria} />
<<<<<<< HEAD
                <View style={{ marginLeft: 12, flex: 1 }}>
                  <Text style={estilos.subtitulo}>{item.nome}</Text>
                  <Text style={estilos.textoMini}>
                    Concluída: {utils.formatarData(item.dataConclusao || item.dataCriacao)}
                  </Text>
                  <Text style={estilos.textoProgresso}>{item.itens.length} itens</Text>
=======
                <View style={{ marginLeft: 15, flex: 1 }}>
                  <Text style={estilos.subtitulo}>{item.nome}</Text>
                  <Text style={estilos.textoMini}>
                    {utils.formatarData(item.dataCriacao)}
                  </Text>
                  <Text style={estilos.textoProgresso}>
                    {item.itens.length} itens
                  </Text>
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

<<<<<<< HEAD
// ==================== TELA: RELATÓRIOS ====================
export function TelaRelatorios() {
  const [dados, setDados] = useState({ total: 0, concluidas: 0, categorias: {} });

  useEffect(() => {
    (async () => {
      const todas = await armazenamento.obterTodas();
      const categorias = {};
      todas.forEach(l => {
        const cat = l.categoria || 'Sem categoria';
        categorias[cat] = (categorias[cat] || 0) + 1;
      });
      setDados({
        total: todas.length,
        concluidas: todas.filter(l => l.concluida).length,
        categorias
      });
    })();
  }, []);
=======
// ==================== TELA: CONQUISTAS ====================
export function TelaConquistas({ navigation }) {
  const [conquistas, setConquistas] = useState([]);

  useEffect(() => {
    carregarConquistas();
    const unsubscribe = navigation.addListener('focus', carregarConquistas);
    return unsubscribe;
  }, [navigation]);

  const carregarConquistas = async () => {
    const todas = await armazenamento.obterTodas();
    const badges = calcularConquistas(todas);
    setConquistas(badges);
  };

  const conquistasDesbloqueadas = conquistas.filter(c => c.conquistado).length;
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4

  return (
    <ScrollView style={estilos.container}>
      <View style={estilos.conteudo}>
<<<<<<< HEAD
        <Text style={estilos.titulo}>📊 Relatórios</Text>

        <View style={[estilos.card, { marginTop: 15 }]}>
          <Text style={estilos.textoNormal}>Total de listas: {dados.total}</Text>
          <Text style={estilos.textoNormal}>Concluídas: {dados.concluidas}</Text>
          <Text style={estilos.textoNormal}>
            Taxa de conclusão: {dados.total > 0 ? ((dados.concluidas / dados.total) * 100).toFixed(0) : 0}%
          </Text>
        </View>

        <Text style={[estilos.subtitulo, { marginTop: 20 }]}>Por categoria</Text>
        {Object.keys(dados.categorias).length === 0 ? (
          <Text style={estilos.textoPequeno}>Nenhuma categoria.</Text>
        ) : (
          Object.entries(dados.categorias).map(([cat, qtd]) => (
            <View key={cat} style={[estilos.itemContainer, { justifyContent: 'space-between' }]}>
              <Text style={estilos.textoNormal}>{cat}</Text>
              <Text style={estilos.textoProgresso}>{qtd}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
=======
        <View style={estilos.conquistaBanner}>
          <Text style={{ fontSize: 40, marginBottom: 10 }}>🏆</Text>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: CORES.branco }}>
            Conquistas
          </Text>
          <Text style={{ fontSize: 16, color: CORES.branco, marginTop: 5 }}>
            {conquistasDesbloqueadas}/{conquistas.length} desbloqueadas
          </Text>
        </View>

        {conquistas.map(conquista => (
          <View
            key={conquista.id}
            style={[estilos.card, !conquista.conquistado && { opacity: 0.5 }]}
          >
            <View style={estilos.linha}>
              <View
                style={[
                  estilos.conquistaIcone,
                  {
                    backgroundColor: conquista.conquistado ? CORES.primaria : CORES.cinzaClaro,
                  },
                ]}
              >
                <Text style={{ fontSize: 35 }}>{conquista.icone}</Text>
              </View>

              <View style={{ marginLeft: 15, flex: 1 }}>
                <Text style={estilos.subtitulo}>{conquista.nome}</Text>
                <Text style={estilos.textoPequeno}>{conquista.descricao}</Text>

                {!conquista.conquistado && (
                  <View style={{ marginTop: 10 }}>
                    <Text style={estilos.textoMini}>
                      {conquista.progresso}/{conquista.meta}
                    </Text>
                    <View style={[estilos.barraProgresso, { marginTop: 5 }]}>
                      <View
                        style={[
                          estilos.preenchimentoProgresso,
                          { width: `${(conquista.progresso / conquista.meta) * 100}%` },
                        ]}
                      />
                    </View>
                  </View>
                )}

                {conquista.conquistado && (
                  <View style={estilos.conquistaTag}>
                    <Text style={{ color: CORES.primaria, fontSize: 12, fontWeight: 'bold' }}>
                      ✓ CONQUISTADO
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
=======
      <FlatList
        data={concluidas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={estilos.card}>
            <View style={estilos.linha}>
              <MaterialIcons name="check-circle" size={32} color={CORES.primaria} />
              <View style={{ marginLeft: 15, flex: 1 }}>
                <Text style={estilos.subtitulo}>{item.nome}</Text>
                <Text style={estilos.textoMini}>
                  Concluída em: {calculos.formatarData(item.dataCriacao)}
                </Text>
                <Text style={estilos.textoProgresso}>
                  {item.itens.length} itens comprados
                </Text>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={estilos.vazioContainer}>
            <MaterialIcons name="history" size={80} color={CORES.cinzaClaro} />
            <Text style={estilos.vazioMensagem}>Nenhuma lista concluída</Text>
          </View>
        }
      />
    </View>
>>>>>>> 22a61768673c58df3bf28a94baab7eb52948f5fa
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
  );
}