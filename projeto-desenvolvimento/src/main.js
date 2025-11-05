import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, FlatList, TouchableOpacity, ScrollView, Modal, Image, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { estilos, CORES } from './styles';
import { armazenamento, utils, dadosMock, feedback, buscarProduto, obterTodosProdutos } from './funcoes';

// ==================== MODAL DE CONFIRMAÇÃO ====================
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
    feedback.vibrarCurto();
    setModalExcluir({ visivel: true, item });
  };

  const confirmarExclusao = async () => {
    if (!modalExcluir.item) return;
    feedback.vibrarMedio();
    await armazenamento.excluir(modalExcluir.item.id);
    setModalExcluir({ visivel: false, item: null });
    carregarListas();
  };

  const renderizarLista = ({ item }) => {
    const progresso = utils.calcularProgresso(item.itens);
    const feitos = utils.contarMarcados(item.itens);

    return (
      <View style={estilos.card}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            feedback.vibrarCurto();
            navigation.navigate('DetalhesLista', { idLista: item.id });
          }}
        >
          <View style={estilos.linhaEntre}>
            <Text style={estilos.subtitulo}>{item.nome}</Text>
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                abrirModalExcluir(item);
              }}
              style={estilos.botaoIcone}
            >
              <MaterialIcons name="delete" size={22} color={CORES.perigo} />
            </TouchableOpacity>
          </View>

          <Text style={estilos.textoMini}>{item.categoria || 'Sem categoria'}</Text>
          <Text style={estilos.textoProgresso}>{feitos}/{item.itens.length} itens</Text>

          <View style={estilos.barraProgresso}>
            <View style={[estilos.preenchimentoProgresso, { width: `${progresso}%` }]} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={estilos.container}>
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
        <FlatList data={listas} keyExtractor={i => i.id} renderItem={renderizarLista} />
      )}

      <TouchableOpacity
        style={estilos.botaoFlutuante}
        onPress={() => {
          feedback.vibrarCurto();
          navigation.navigate('CriarLista');
        }}
      >
        <MaterialIcons name="add" size={32} color={CORES.branco} />
      </TouchableOpacity>
    </View>
  );
}

// ==================== TELA: CRIAR LISTA ====================
export function TelaCriarLista({ navigation }) {
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [itemNome, setItemNome] = useState('');
  const [itens, setItens] = useState([]);
  const [erro, setErro] = useState('');

  const adicionarItem = () => {
    if (!itemNome.trim()) return;
    feedback.vibrarCurto();
    setItens(prev => [...prev, { id: utils.gerarId(), nome: itemNome.trim(), marcado: false }]);
    setItemNome('');
  };

  const removerItem = (id) => {
    feedback.vibrarCurto();
    setItens(prev => prev.filter(i => i.id !== id));
  };

  const salvar = async () => {
    if (!nome.trim()) {
      feedback.vibrarAlerta();
      setErro('Digite o nome da lista');
      setTimeout(() => setErro(''), 2500);
      return;
    }
    if (itens.length === 0) {
      feedback.vibrarAlerta();
      setErro('Adicione ao menos 1 item');
      setTimeout(() => setErro(''), 2500);
      return;
    }

    const nova = {
      id: utils.gerarId(),
      nome: nome.trim(),
      categoria: categoria.trim() || 'Sem categoria',
      itens,
      dataCriacao: new Date().toISOString(),
      concluida: false,
    };

    await armazenamento.adicionar(nova);
    feedback.vibrarSucesso();
    navigation.goBack();
  };

  return (
    <ScrollView style={estilos.container}>
      <View style={estilos.conteudo}>
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
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

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
    feedback.vibrarCurto();
    const novosItens = lista.itens.map(item =>
      item.id === idItem ? { ...item, marcado: !item.marcado } : item
    );
    const nova = { ...lista, itens: novosItens };
    setLista(nova);
    await armazenamento.atualizar(lista.id, nova);
  };

  const confirmarFinalizacao = async () => {
    if (!lista) return;
    feedback.vibrarSucesso();
    await armazenamento.atualizar(lista.id, { ...lista, concluida: true, dataConclusao: new Date().toISOString() });
    setModalFinalizar(false);
    navigation.goBack();
  };

  if (!idLista || !lista) {
    return (
      <View style={estilos.containerCentralizado}>
        <Text>Carregando...</Text>
      </View>
    );
  }

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
        <Text style={estilos.textoMini}>{lista.categoria}</Text>
        <Text style={estilos.textoProgresso}>{feitos}/{lista.itens.length} ({progresso.toFixed(0)}%)</Text>
        <View style={estilos.barraProgresso}>
          <View style={[estilos.preenchimentoProgresso, { width: `${progresso}%` }]} />
        </View>
      </View>

      <FlatList
        data={lista.itens}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={estilos.itemContainer} onPress={() => toggleItem(item.id)}>
            <MaterialIcons
              name={item.marcado ? 'check-box' : 'check-box-outline-blank'}
              size={28}
              color={item.marcado ? CORES.primaria : CORES.cinzaMedio}
            />
            <Text style={[estilos.itemTexto, item.marcado && estilos.textoMarcado]}>{item.nome}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <View style={estilos.rodapeFixo}>
        <TouchableOpacity
          style={estilos.botaoPrimario}
          onPress={() => {
            feedback.vibrarMedio();
            setModalFinalizar(true);
          }}
        >
          <View style={estilos.linha}>
            <MaterialIcons name="check-circle" size={22} color={CORES.branco} />
            <Text style={[estilos.textoBotao, { marginLeft: 8 }]}>Finalizar Compras</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ==================== TELA: COMPARADOR DE PREÇOS (ATUALIZADO) ====================
export function TelaComparadorPrecos() {
  const [itemBusca, setItemBusca] = useState('');
  const [resultados, setResultados] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [produtoNome, setProdutoNome] = useState('');
  const [naoEncontrado, setNaoEncontrado] = useState(false);

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
    feedback.vibrarCurto();

    salvarHistorico(itemBusca.trim());

    // USA A FUNÇÃO DE BUSCA REAL DO FUNCOES.JS
    const resultado = buscarProduto(itemBusca);

    if (!resultado) {
      // Produto não encontrado
      setNaoEncontrado(true);
      setResultados([]);
      setProdutoNome('');
      setTimeout(() => setNaoEncontrado(false), 3000);
      return;
    }

    // Produto encontrado - os preços já vêm ordenados do menor para o maior
    setNaoEncontrado(false);
    setProdutoNome(resultado.produto);
    setResultados(resultado.precos);
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

        {naoEncontrado && (
          <View style={[estilos.bannerErro, { marginTop: 15 }]}>
            <Text style={estilos.textoErro}>❌ Produto não encontrado!</Text>
            <Text style={[estilos.textoPequeno, { marginTop: 5 }]}>
              Tente: {obterTodosProdutos().slice(0, 5).join(', ')}...
            </Text>
          </View>
        )}

        {historico.length > 0 && resultados.length === 0 && !naoEncontrado && (
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
                Resultados para "{produtoNome}"
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
                    <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                      <Text style={estilos.subtitulo}>{resultado.mercado}</Text>
                      {idx === 0 && (
                        <View style={{
                          backgroundColor: CORES.primaria,
                          paddingHorizontal: 8,
                          paddingVertical: 3,
                          borderRadius: 5,
                          marginLeft: 8,
                        }}>
                          <Text style={{ color: CORES.branco, fontSize: 10, fontWeight: 'bold' }}>MELHOR PREÇO</Text>
                        </View>
                      )}
                    </View>
                    <Text style={estilos.textoMini}>📍 {resultado.distancia}</Text>
                    <Text style={[estilos.textoProgresso, { fontSize: 22, marginTop: 5 }]}>
                      R$ {resultado.preco.toFixed(2)}
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

        {resultados.length === 0 && historico.length === 0 && !naoEncontrado && (
          <View style={[estilos.vazioContainer, { marginTop: 50 }]}>
            <MaterialIcons name="search" size={60} color={CORES.cinzaClaro} />
            <Text style={[estilos.vazioMensagem, { fontSize: 16 }]}>
              Busque um produto para comparar
            </Text>
            <Text style={[estilos.textoMini, { marginTop: 10, textAlign: 'center', paddingHorizontal: 20 }]}>
              Produtos disponíveis: {obterTodosProdutos().slice(0, 5).join(', ')} e mais!
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
    feedback.vibrarSucesso();
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
              feedback.vibrarCurto();
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
  };

  return (
    <View style={estilos.container}>
      {listas.length === 0 ? (
        <View style={estilos.vazioContainer}>
          <MaterialIcons name="history" size={80} color={CORES.cinzaClaro} />
          <Text style={estilos.vazioMensagem}>Nenhuma concluída</Text>
          <Text style={estilos.vazioSubmensagem}>Complete uma lista para ver aqui</Text>
        </View>
      ) : (
        <FlatList
          data={listas}
          keyExtractor={i => i.id}
          renderItem={({ item }) => (
            <View style={estilos.card}>
              <View style={estilos.linha}>
                <MaterialIcons name="check-circle" size={32} color={CORES.primaria} />
                <View style={{ marginLeft: 12, flex: 1 }}>
                  <Text style={estilos.subtitulo}>{item.nome}</Text>
                  <Text style={estilos.textoMini}>
                    Concluída: {utils.formatarData(item.dataConclusao || item.dataCriacao)}
                  </Text>
                  <Text style={estilos.textoProgresso}>{item.itens.length} itens</Text>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

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

  return (
    <ScrollView style={estilos.container}>
      <View style={estilos.conteudo}>
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
  );
}