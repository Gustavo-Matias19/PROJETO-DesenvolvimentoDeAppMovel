<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, FlatList, TouchableOpacity, ScrollView, Modal, Image, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
=======
import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, TextInput, FlatList, TouchableOpacity, ScrollView, 
  Modal, Image, Alert, RefreshControl, ActivityIndicator
} from 'react-native';
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
import { MaterialIcons } from '@expo/vector-icons';
import { estilos, CORES } from './styles';
import { armazenamento, utils, dadosMock, feedback, buscarProduto, obterTodosProdutos } from './funcoes';

// ==================== MODAL DE CONFIRMAÇÃO ====================
<<<<<<< HEAD
function ModalConfirmar({ visivel, titulo, mensagem, onConfirmar, onCancelar }) {
  return (
    <Modal transparent visible={visivel} animationType="fade">
=======
function ModalConfirmar({ visivel, titulo, mensagem, onConfirmar, onCancelar, tipo = 'primario' }) {
  const corBotao = tipo === 'perigo' ? CORES.perigo : CORES.primaria;
  
  return (
    <Modal transparent visible={visivel} animationType="fade" onRequestClose={onCancelar}>
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
      <View style={estilos.modalOverlay}>
        <View style={estilos.modalContainer}>
          <Text style={estilos.modalTitulo}>{titulo}</Text>
          <Text style={estilos.modalMensagem}>{mensagem}</Text>
          <View style={estilos.modalBotoes}>
<<<<<<< HEAD
            <TouchableOpacity onPress={onCancelar} style={estilos.modalBotaoCancelar}>
=======
            <TouchableOpacity 
              onPress={onCancelar} 
              style={estilos.modalBotaoCancelar}
              activeOpacity={0.7}
            >
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
              <Text style={{ fontSize: 16, color: CORES.textoMedio, fontWeight: '600' }}>
                Cancelar
              </Text>
            </TouchableOpacity>
<<<<<<< HEAD
            <TouchableOpacity onPress={onConfirmar} style={estilos.modalBotaoConfirmar}>
=======
            <TouchableOpacity 
              onPress={onConfirmar} 
              style={[estilos.modalBotaoConfirmar, { backgroundColor: corBotao }]}
              activeOpacity={0.7}
            >
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
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
<<<<<<< HEAD
=======
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
  const [modalExcluir, setModalExcluir] = useState({ visivel: false, item: null });

  useEffect(() => {
    carregarListas();
    const unsubscribe = navigation.addListener('focus', carregarListas);
    return unsubscribe;
  }, [navigation]);

  const carregarListas = async () => {
<<<<<<< HEAD
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
=======
    try {
      setCarregando(true);
      const ativas = await armazenamento.obterAtivas();
      setListas(ativas);
    } catch (erro) {
      console.error('Erro ao carregar listas:', erro);
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  };

  const aoAtualizar = useCallback(() => {
    setAtualizando(true);
    carregarListas();
  }, []);

  const abrirModalExcluir = useCallback((item) => {
    feedback.vibrarCurto();
    setModalExcluir({ visivel: true, item });
  }, []);

  const confirmarExclusao = async () => {
    if (!modalExcluir.item) return;
    
    try {
      feedback.vibrarMedio();
      await armazenamento.excluir(modalExcluir.item.id);
      setModalExcluir({ visivel: false, item: null });
      carregarListas();
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível excluir a lista');
    }
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
  };

  const renderizarLista = ({ item }) => {
    const progresso = utils.calcularProgresso(item?.itens || []);
    const feitos = utils.contarMarcados(item?.itens || []);
    const totalItens = item?.itens?.length || 0;
<<<<<<< HEAD

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
            <Text style={estilos.subtitulo}>{item?.nome || 'Sem nome'}</Text>
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

          <Text style={estilos.textoMini}>{item?.categoria || 'Sem categoria'}</Text>
          <Text style={estilos.textoProgresso}>{feitos}/{totalItens} itens</Text>

          <View style={estilos.barraProgresso}>
            <View style={[estilos.preenchimentoProgresso, { width: `${progresso}%` }]} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

=======
    const percentual = Math.round(progresso);

    return (
      <TouchableOpacity
        style={estilos.card}
        activeOpacity={0.7}
        onPress={() => {
          feedback.vibrarCurto();
          navigation.navigate('DetalhesLista', { idLista: item.id });
        }}
      >
        <View style={estilos.linhaEntre}>
          <View style={{ flex: 1 }}>
            <Text style={estilos.subtitulo} numberOfLines={1}>
              {item?.nome || 'Sem nome'}
            </Text>
            <Text style={estilos.textoMini}>{item?.categoria || 'Sem categoria'}</Text>
          </View>
          <TouchableOpacity
            onPress={() => abrirModalExcluir(item)}
            style={estilos.botaoIcone}
            activeOpacity={0.7}
          >
            <MaterialIcons name="delete" size={22} color={CORES.perigo} />
          </TouchableOpacity>
        </View>

        <View style={[estilos.linha, estilos.mt_sm]}>
          <MaterialIcons name="shopping-basket" size={16} color={CORES.primaria} />
          <Text style={[estilos.textoProgresso, { marginTop: 0, marginLeft: 6 }]}>
            {feitos}/{totalItens} itens ({percentual}%)
          </Text>
        </View>

        <View style={estilos.barraProgresso}>
          <View style={[estilos.preenchimentoProgresso, { width: `${progresso}%` }]} />
        </View>

        {item.dataCriacao && (
          <Text style={[estilos.textoMini, estilos.mt_xs]}>
            Criada em: {utils.formatarDataCurta(item.dataCriacao)}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  if (carregando) {
    return (
      <View style={estilos.containerCentralizado}>
        <ActivityIndicator size="large" color={CORES.primaria} />
        <Text style={[estilos.textoPequeno, estilos.mt_md]}>Carregando listas...</Text>
      </View>
    );
  }

>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
  return (
    <View style={estilos.container}>
      <ModalConfirmar
        visivel={modalExcluir.visivel}
        titulo="🗑️ Excluir Lista"
<<<<<<< HEAD
        mensagem={`Deseja excluir "${modalExcluir.item?.nome}"?`}
        onConfirmar={confirmarExclusao}
        onCancelar={() => setModalExcluir({ visivel: false, item: null })}
=======
        mensagem={`Deseja realmente excluir "${modalExcluir.item?.nome}"? Esta ação não pode ser desfeita.`}
        onConfirmar={confirmarExclusao}
        onCancelar={() => setModalExcluir({ visivel: false, item: null })}
        tipo="perigo"
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
      />

      {listas.length === 0 ? (
        <View style={estilos.vazioContainer}>
          <MaterialIcons name="shopping-cart" size={80} color={CORES.cinzaClaro} />
<<<<<<< HEAD
          <Text style={estilos.vazioMensagem}>Nenhuma lista</Text>
          <Text style={estilos.vazioSubmensagem}>Toque no + para criar</Text>
        </View>
      ) : (
        <FlatList data={listas} keyExtractor={i => i.id} renderItem={renderizarLista} />
=======
          <Text style={estilos.vazioMensagem}>Nenhuma lista criada</Text>
          <Text style={estilos.vazioSubmensagem}>
            Toque no botão + para criar sua primeira lista de compras
          </Text>
        </View>
      ) : (
        <FlatList
          data={listas}
          keyExtractor={i => i.id}
          renderItem={renderizarLista}
          refreshControl={
            <RefreshControl
              refreshing={atualizando}
              onRefresh={aoAtualizar}
              colors={[CORES.primaria]}
              tintColor={CORES.primaria}
            />
          }
          contentContainerStyle={{ paddingBottom: 100 }}
        />
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
      )}

      <TouchableOpacity
        style={estilos.botaoFlutuante}
        onPress={() => {
          feedback.vibrarCurto();
          navigation.navigate('CriarLista');
        }}
<<<<<<< HEAD
=======
        activeOpacity={0.8}
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
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
<<<<<<< HEAD

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
=======
  const [sucesso, setSucesso] = useState('');
  const [salvando, setSalvando] = useState(false);

  const mostrarErro = (mensagem) => {
    feedback.vibrarAlerta();
    setErro(mensagem);
    setTimeout(() => setErro(''), 3000);
  };

  const mostrarSucesso = (mensagem) => {
    setSucesso(mensagem);
    setTimeout(() => setSucesso(''), 2000);
  };

  const adicionarItem = useCallback(() => {
    const itemTrim = itemNome.trim();
    
    if (!itemTrim) {
      mostrarErro('Digite o nome do item');
      return;
    }

    // Verifica duplicatas
    if (itens.some(i => i.nome.toLowerCase() === itemTrim.toLowerCase())) {
      mostrarErro('Este item já foi adicionado');
      return;
    }

    feedback.vibrarCurto();
    setItens(prev => [...prev, { 
      id: utils.gerarId(), 
      nome: itemTrim, 
      marcado: false 
    }]);
    setItemNome('');
    mostrarSucesso('Item adicionado!');
  }, [itemNome, itens]);

  const removerItem = useCallback((id) => {
    feedback.vibrarCurto();
    setItens(prev => prev.filter(i => i.id !== id));
  }, []);

  const salvar = async () => {
    const nomeTrim = nome.trim();
    
    if (!nomeTrim) {
      mostrarErro('Digite o nome da lista');
      return;
    }
    
    if (itens.length === 0) {
      mostrarErro('Adicione ao menos 1 item');
      return;
    }

    try {
      setSalvando(true);
      const nova = {
        id: utils.gerarId(),
        nome: nomeTrim,
        categoria: categoria.trim() || 'Geral',
        itens,
        dataCriacao: new Date().toISOString(),
        concluida: false,
      };

      const sucesso = await armazenamento.adicionar(nova);
      
      if (sucesso) {
        feedback.vibrarSucesso();
        navigation.goBack();
      } else {
        mostrarErro('Erro ao salvar lista');
      }
    } catch (erro) {
      mostrarErro('Erro ao salvar lista');
      console.error(erro);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <ScrollView style={estilos.container} keyboardShouldPersistTaps="handled">
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
      <View style={estilos.conteudo}>
        {erro !== '' && (
          <View style={estilos.bannerErro}>
            <Text style={estilos.textoErro}>⚠️ {erro}</Text>
          </View>
        )}

<<<<<<< HEAD
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
=======
        {sucesso !== '' && (
          <View style={estilos.bannerSucesso}>
            <Text style={estilos.textoSucesso}>✅ {sucesso}</Text>
          </View>
        )}

        <Text style={estilos.rotulo}>Nome da Lista *</Text>
        <TextInput
          style={estilos.input}
          placeholder="Ex: Supermercado Mensal"
          placeholderTextColor={CORES.textoClaro}
          value={nome}
          onChangeText={setNome}
          maxLength={50}
        />

        <Text style={[estilos.rotulo, estilos.mt_lg]}>Categoria</Text>
        <TextInput
          style={estilos.input}
          placeholder="Ex: Casa, Festa, Churrasco"
          placeholderTextColor={CORES.textoClaro}
          value={categoria}
          onChangeText={setCategoria}
          maxLength={30}
        />

        <View style={estilos.divisor} />

        <Text style={[estilos.rotulo, estilos.mt_md]}>Adicionar Itens *</Text>
        <View style={estilos.containerAdicionarItem}>
          <TextInput
            style={[estilos.input, estilos.inputItem]}
            placeholder="Ex: Arroz 5kg"
            placeholderTextColor={CORES.textoClaro}
            value={itemNome}
            onChangeText={setItemNome}
            onSubmitEditing={adicionarItem}
            returnKeyType="done"
            maxLength={50}
          />
          <TouchableOpacity 
            style={estilos.botaoAdicionar} 
            onPress={adicionarItem}
            activeOpacity={0.7}
          >
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
            <MaterialIcons name="add" size={24} color={CORES.branco} />
          </TouchableOpacity>
        </View>

        {itens.length > 0 && (
<<<<<<< HEAD
          <View style={{ marginTop: 10 }}>
            {itens.map(i => (
              <View key={i.id} style={[estilos.itemContainer, { justifyContent: 'space-between' }]}>
                <Text style={estilos.itemTexto}>• {i.nome}</Text>
                <TouchableOpacity onPress={() => removerItem(i.id)}>
                  <MaterialIcons name="close" size={20} color={CORES.perigo} />
=======
          <View style={[estilos.card, estilos.mt_md]}>
            <View style={estilos.linhaEntre}>
              <Text style={estilos.subtitulo}>📝 Itens ({itens.length})</Text>
              {itens.length > 0 && (
                <TouchableOpacity 
                  onPress={() => {
                    Alert.alert(
                      'Limpar Tudo',
                      'Deseja remover todos os itens?',
                      [
                        { text: 'Cancelar', style: 'cancel' },
                        { 
                          text: 'Limpar', 
                          style: 'destructive',
                          onPress: () => {
                            feedback.vibrarMedio();
                            setItens([]);
                          }
                        }
                      ]
                    );
                  }}
                >
                  <Text style={{ color: CORES.perigo, fontSize: 14 }}>Limpar tudo</Text>
                </TouchableOpacity>
              )}
            </View>
            
            <View style={estilos.divisor} />
            
            {itens.map((item, index) => (
              <View
                key={item.id}
                style={[
                  estilos.itemContainer,
                  { 
                    marginHorizontal: 0, 
                    marginVertical: 4,
                    backgroundColor: index % 2 === 0 ? CORES.fundoEscuro : CORES.fundoClaro 
                  }
                ]}
              >
                <Text style={estilos.itemTexto} numberOfLines={1}>
                  {index + 1}. {item.nome}
                </Text>
                <TouchableOpacity 
                  onPress={() => removerItem(item.id)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <MaterialIcons name="close" size={22} color={CORES.perigo} />
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

<<<<<<< HEAD
        <TouchableOpacity style={[estilos.botaoPrimario, { marginTop: 20 }]} onPress={salvar}>
          <Text style={estilos.textoBotao}>✅ Salvar Lista</Text>
=======
        <TouchableOpacity
          style={[estilos.botaoPrimario, estilos.mt_xl, estilos.mb_xl]}
          onPress={salvar}
          disabled={salvando}
          activeOpacity={0.7}
        >
          {salvando ? (
            <ActivityIndicator color={CORES.branco} />
          ) : (
            <View style={estilos.linha}>
              <MaterialIcons name="check-circle" size={22} color={CORES.branco} />
              <Text style={[estilos.textoBotao, { marginLeft: 8 }]}>
                Criar Lista
              </Text>
            </View>
          )}
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
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
<<<<<<< HEAD
=======
  const [carregando, setCarregando] = useState(true);
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
  const [modalFinalizar, setModalFinalizar] = useState(false);

  useEffect(() => {
    carregar();
  }, [idLista]);

  const carregar = async () => {
<<<<<<< HEAD
    if (!idLista) {
      setLista(null);
      return;
    }
    const encontrada = await armazenamento.obterPorId(idLista);
    setLista(encontrada || null);
=======
    try {
      setCarregando(true);
      if (!idLista) {
        setLista(null);
        return;
      }
      const encontrada = await armazenamento.obterPorId(idLista);
      setLista(encontrada || null);
    } catch (erro) {
      console.error('Erro ao carregar lista:', erro);
    } finally {
      setCarregando(false);
    }
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
  };

  const toggleItem = async (idItem) => {
    if (!lista) return;
<<<<<<< HEAD
=======
    
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
    feedback.vibrarCurto();
    const novosItens = lista.itens.map(item =>
      item.id === idItem ? { ...item, marcado: !item.marcado } : item
    );
<<<<<<< HEAD
    const nova = { ...lista, itens: novosItens };
    setLista(nova);
    await armazenamento.atualizar(lista.id, nova);
=======
    const novaLista = { ...lista, itens: novosItens };
    setLista(novaLista);
    await armazenamento.atualizar(lista.id, novaLista);
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
  };

  const confirmarFinalizacao = async () => {
    if (!lista) return;
<<<<<<< HEAD
    feedback.vibrarSucesso();
    await armazenamento.atualizar(lista.id, { ...lista, concluida: true, dataConclusao: new Date().toISOString() });
    setModalFinalizar(false);
    navigation.goBack();
  };

  if (!idLista || !lista) {
    return (
      <View style={estilos.containerCentralizado}>
        <Text>Carregando...</Text>
=======
    
    try {
      feedback.vibrarSucesso();
      await armazenamento.atualizar(lista.id, { 
        ...lista, 
        concluida: true, 
        dataConclusao: new Date().toISOString() 
      });
      setModalFinalizar(false);
      
      Alert.alert(
        '✅ Lista Concluída!',
        'Sua lista foi marcada como concluída e movida para o histórico.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível finalizar a lista');
    }
  };

  if (carregando) {
    return (
      <View style={estilos.containerCentralizado}>
        <ActivityIndicator size="large" color={CORES.primaria} />
        <Text style={[estilos.textoPequeno, estilos.mt_md]}>Carregando...</Text>
      </View>
    );
  }

  if (!idLista || !lista) {
    return (
      <View style={estilos.containerCentralizado}>
        <MaterialIcons name="error-outline" size={60} color={CORES.perigo} />
        <Text style={[estilos.vazioMensagem, estilos.mt_md]}>Lista não encontrada</Text>
        <TouchableOpacity 
          style={[estilos.botaoOutline, estilos.mt_lg]}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: CORES.primaria, fontWeight: 'bold' }}>Voltar</Text>
        </TouchableOpacity>
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
      </View>
    );
  }

  const progresso = utils.calcularProgresso(lista.itens);
  const feitos = utils.contarMarcados(lista.itens);
<<<<<<< HEAD
=======
  const totalItens = lista.itens.length;
  const percentual = Math.round(progresso);
  const todosMarcados = feitos === totalItens;
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)

  return (
    <View style={estilos.container}>
      <ModalConfirmar
        visivel={modalFinalizar}
        titulo="✅ Finalizar Compras"
        mensagem={
<<<<<<< HEAD
          feitos === lista.itens.length
            ? 'Marcar como concluída?'
            : `Apenas ${feitos}/${lista.itens.length} itens marcados.\n\nFinalizar mesmo assim?`
=======
          todosMarcados
            ? `Todos os ${totalItens} itens foram marcados!\n\nDeseja marcar esta lista como concluída?`
            : `Apenas ${feitos} de ${totalItens} itens foram marcados.\n\nDeseja finalizar mesmo assim?`
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
        }
        onConfirmar={confirmarFinalizacao}
        onCancelar={() => setModalFinalizar(false)}
      />

<<<<<<< HEAD
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

=======
      {/* CABEÇALHO */}
      <View style={estilos.cabecalho}>
        <Text style={estilos.titulo} numberOfLines={2}>{lista.nome}</Text>
        
        <View style={estilos.linha}>
          <View style={estilos.badge}>
            <Text style={estilos.badgeTexto}>{lista.categoria}</Text>
          </View>
          {lista.dataCriacao && (
            <Text style={[estilos.textoMini, { marginLeft: 10 }]}>
              {utils.formatarDataCurta(lista.dataCriacao)}
            </Text>
          )}
        </View>

        <View style={[estilos.linhaEntre, estilos.mt_md]}>
          <View style={estilos.linha}>
            <MaterialIcons name="shopping-basket" size={20} color={CORES.primaria} />
            <Text style={[estilos.textoProgresso, { marginTop: 0, marginLeft: 6 }]}>
              {feitos}/{totalItens}
            </Text>
          </View>
          <Text style={estilos.textoProgresso}>
            {percentual}% concluído
          </Text>
        </View>

        <View style={estilos.barraProgresso}>
          <View style={[estilos.preenchimentoProgresso, { width: `${progresso}%` }]} />
        </View>

        {todosMarcados && (
          <View style={[estilos.bannerSucesso, estilos.mt_md, { marginBottom: 0 }]}>
            <Text style={estilos.textoSucesso}>🎉 Todos os itens marcados!</Text>
          </View>
        )}
      </View>

      {/* LISTA DE ITENS */}
      <FlatList
        data={lista.itens}
        keyExtractor={i => i.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              estilos.itemContainer,
              item.marcado && { opacity: 0.6 }
            ]}
            onPress={() => toggleItem(item.id)}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name={item.marcado ? 'check-box' : 'check-box-outline-blank'}
              size={28}
              color={item.marcado ? CORES.sucesso : CORES.cinzaMedio}
            />
            <Text 
              style={[
                estilos.itemTexto, 
                item.marcado && estilos.textoMarcado
              ]}
              numberOfLines={2}
            >
              {index + 1}. {item.nome}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={estilos.vazioContainer}>
            <Text style={estilos.vazioMensagem}>Nenhum item na lista</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* RODAPÉ FIXO */}
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
      <View style={estilos.rodapeFixo}>
        <TouchableOpacity
          style={estilos.botaoPrimario}
          onPress={() => {
            feedback.vibrarMedio();
            setModalFinalizar(true);
          }}
<<<<<<< HEAD
        >
          <View style={estilos.linha}>
            <MaterialIcons name="check-circle" size={22} color={CORES.branco} />
            <Text style={[estilos.textoBotao, { marginLeft: 8 }]}>Finalizar Compras</Text>
=======
          activeOpacity={0.7}
        >
          <View style={estilos.linha}>
            <MaterialIcons name="check-circle" size={22} color={CORES.branco} />
            <Text style={[estilos.textoBotao, { marginLeft: 8 }]}>
              Finalizar Compras
            </Text>
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

<<<<<<< HEAD
// ==================== TELA: COMPARADOR DE PREÇOS (ATUALIZADO) ====================
=======
// ==================== TELA: COMPARADOR DE PREÇOS ====================
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
export function TelaComparadorPrecos() {
  const [itemBusca, setItemBusca] = useState('');
  const [resultados, setResultados] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [produtoNome, setProdutoNome] = useState('');
  const [naoEncontrado, setNaoEncontrado] = useState(false);
  const [mostrarTodosProdutos, setMostrarTodosProdutos] = useState(false);
<<<<<<< HEAD
=======
  const [buscando, setBuscando] = useState(false);
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)

  useEffect(() => {
    carregarHistorico();
  }, []);

  const carregarHistorico = async () => {
<<<<<<< HEAD
    try {
      const h = await AsyncStorage.getItem('@historico_buscas');
      if (h) setHistorico(JSON.parse(h));
    } catch (e) {
      console.error(e);
    }
=======
    const h = await armazenamento.obterHistorico();
    setHistorico(h);
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
  };

  const salvarHistorico = async (termo) => {
    const novo = [termo, ...historico.filter(i => i !== termo)].slice(0, 5);
    setHistorico(novo);
<<<<<<< HEAD
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
    setMostrarTodosProdutos(false); // Fecha a lista ao buscar
  };

  const selecionarProduto = (nomeProduto) => {
    feedback.vibrarCurto();
    setItemBusca(nomeProduto);
    setMostrarTodosProdutos(false);
=======
    await armazenamento.salvarHistorico(novo);
  };

  const buscarPrecos = useCallback(async () => {
    const termoBusca = itemBusca.trim();
    if (!termoBusca) {
      feedback.vibrarAlerta();
      return;
    }

    try {
      setBuscando(true);
      feedback.vibrarCurto();

      await salvarHistorico(termoBusca);
      const resultado = buscarProduto(termoBusca);

      if (!resultado) {
        setNaoEncontrado(true);
        setResultados([]);
        setProdutoNome('');
        setTimeout(() => setNaoEncontrado(false), 3000);
        return;
      }

      setNaoEncontrado(false);
      setProdutoNome(resultado.produto);
      setResultados(resultado.precos);
      setMostrarTodosProdutos(false);
    } finally {
      setBuscando(false);
    }
  }, [itemBusca, historico]);

  const selecionarProduto = useCallback((nomeProduto) => {
    feedback.vibrarCurto();
    setItemBusca(nomeProduto);
    setMostrarTodosProdutos(false);
    
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
    setTimeout(() => {
      const resultado = buscarProduto(nomeProduto);
      if (resultado) {
        setProdutoNome(resultado.produto);
        setResultados(resultado.precos);
        salvarHistorico(nomeProduto);
      }
    }, 100);
<<<<<<< HEAD
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
=======
  }, []);

  const limparHistorico = () => {
    Alert.alert(
      'Limpar Histórico',
      'Deseja limpar todo o histórico de buscas?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: async () => {
            await armazenamento.limparHistorico();
            setHistorico([]);
            feedback.vibrarMedio();
          }
        }
      ]
    );
  };

  const economia = resultados.length > 1 
    ? utils.calcularEconomia(resultados)
    : 0;

  return (
    <ScrollView style={estilos.container} keyboardShouldPersistTaps="handled">
      <View style={estilos.conteudo}>
        {/* CABEÇALHO */}
        <View style={estilos.linha}>
          <MaterialIcons name="compare-arrows" size={28} color={CORES.primaria} />
          <Text style={[estilos.titulo, { marginLeft: 10, marginBottom: 0 }]}>
            Comparador de Preços
          </Text>
        </View>
        <Text style={[estilos.textoPequeno, estilos.mt_xs]}>
          Compare preços em mercados próximos e economize
        </Text>

        {/* CAMPO DE BUSCA */}
        <View style={[estilos.containerAdicionarItem, estilos.mt_lg]}>
          <TextInput
            style={[estilos.input, estilos.inputItem]}
            placeholder="Digite o produto (ex: Arroz)"
            placeholderTextColor={CORES.textoClaro}
            value={itemBusca}
            onChangeText={setItemBusca}
            onSubmitEditing={buscarPrecos}
            returnKeyType="search"
          />
          <TouchableOpacity
            style={estilos.botaoAdicionar}
            onPress={buscarPrecos}
            disabled={buscando}
            activeOpacity={0.7}
          >
            {buscando ? (
              <ActivityIndicator color={CORES.branco} size="small" />
            ) : (
              <MaterialIcons name="search" size={24} color={CORES.branco} />
            )}
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
          </TouchableOpacity>
        </View>

        {/* BOTÃO VER TODOS OS PRODUTOS */}
        <TouchableOpacity
<<<<<<< HEAD
          style={{
            backgroundColor: CORES.secundaria,
            padding: 12,
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 15,
          }}
=======
          style={[estilos.botaoSecundario, estilos.mt_md]}
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
          onPress={() => {
            feedback.vibrarCurto();
            setMostrarTodosProdutos(!mostrarTodosProdutos);
            setResultados([]);
            setNaoEncontrado(false);
          }}
<<<<<<< HEAD
        >
          <MaterialIcons 
            name={mostrarTodosProdutos ? "close" : "list"} 
            size={20} 
            color={CORES.branco} 
          />
          <Text style={{ color: CORES.branco, fontSize: 15, fontWeight: 'bold', marginLeft: 8 }}>
            {mostrarTodosProdutos ? 'Fechar Lista' : 'Ver Todos os Produtos'}
          </Text>
=======
          activeOpacity={0.7}
        >
          <View style={estilos.linha}>
            <MaterialIcons
              name={mostrarTodosProdutos ? "close" : "list"}
              size={20}
              color={CORES.branco}
            />
            <Text style={[estilos.textoBotao, { marginLeft: 8, fontSize: 15 }]}>
              {mostrarTodosProdutos ? 'Fechar Lista' : 'Ver Todos os Produtos'}
            </Text>
          </View>
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
        </TouchableOpacity>

        {/* LISTA DE TODOS OS PRODUTOS */}
        {mostrarTodosProdutos && (
<<<<<<< HEAD
          <View style={[estilos.card, { marginBottom: 20 }]}>
            <Text style={[estilos.subtitulo, { marginBottom: 12 }]}>
              📦 Produtos Disponíveis ({obterTodosProdutos().length})
            </Text>
=======
          <View style={[estilos.card, estilos.mt_md]}>
            <Text style={estilos.subtitulo}>
              📦 Produtos Disponíveis ({obterTodosProdutos().length})
            </Text>
            <View style={estilos.divisor} />
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
            {obterTodosProdutos().map((produto, idx) => (
              <TouchableOpacity
                key={idx}
                style={{
                  padding: 12,
<<<<<<< HEAD
                  backgroundColor: idx % 2 === 0 ? CORES.fundoClaro : CORES.branco,
                  borderRadius: 6,
                  marginBottom: 5,
=======
                  backgroundColor: idx % 2 === 0 ? CORES.fundoEscuro : CORES.fundoClaro,
                  borderRadius: 8,
                  marginBottom: 6,
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onPress={() => selecionarProduto(produto)}
<<<<<<< HEAD
=======
                activeOpacity={0.7}
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
              >
                <Text style={estilos.textoNormal}>🛒 {produto}</Text>
                <MaterialIcons name="chevron-right" size={20} color={CORES.primaria} />
              </TouchableOpacity>
            ))}
          </View>
        )}

<<<<<<< HEAD
        {naoEncontrado && (
          <View style={[estilos.bannerErro, { marginTop: 15 }]}>
            <Text style={estilos.textoErro}>❌ Produto não encontrado!</Text>
            <Text style={[estilos.textoPequeno, { marginTop: 5 }]}>
=======
        {/* ERRO - PRODUTO NÃO ENCONTRADO */}
        {naoEncontrado && (
          <View style={[estilos.bannerErro, estilos.mt_md]}>
            <Text style={estilos.textoErro}>❌ Produto não encontrado!</Text>
            <Text style={[estilos.textoPequeno, { marginTop: 5, color: CORES.textoMedio }]}>
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
              Tente: {obterTodosProdutos().slice(0, 5).join(', ')}...
            </Text>
          </View>
        )}

<<<<<<< HEAD
        {historico.length > 0 && resultados.length === 0 && !naoEncontrado && !mostrarTodosProdutos && (
          <View style={{ marginTop: 15 }}>
            <Text style={estilos.rotulo}>Buscas recentes</Text>
=======
        {/* HISTÓRICO DE BUSCAS */}
        {historico.length > 0 && resultados.length === 0 && !naoEncontrado && !mostrarTodosProdutos && (
          <View style={estilos.mt_lg}>
            <View style={estilos.linhaEntre}>
              <Text style={estilos.rotulo}>Buscas recentes</Text>
              <TouchableOpacity onPress={limparHistorico}>
                <Text style={{ color: CORES.perigo, fontSize: 12 }}>Limpar</Text>
              </TouchableOpacity>
            </View>
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
              {historico.map((termo, idx) => (
                <TouchableOpacity
                  key={idx}
<<<<<<< HEAD
                  style={{
                    backgroundColor: CORES.cinzaClaro,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 15,
                    marginRight: 8,
                    marginBottom: 8,
                  }}
=======
                  style={estilos.tag}
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
                  onPress={() => {
                    setItemBusca(termo);
                    setTimeout(buscarPrecos, 100);
                  }}
<<<<<<< HEAD
                >
                  <Text style={estilos.textoMini}>{termo}</Text>
=======
                  activeOpacity={0.7}
                >
                  <Text style={estilos.tagTexto}>{termo}</Text>
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

<<<<<<< HEAD
        {resultados.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <MaterialIcons name="local-offer" size={20} color={CORES.primaria} />
=======
        {/* RESULTADOS */}
        {resultados.length > 0 && (
          <View style={estilos.mt_xl}>
            <View style={estilos.linha}>
              <MaterialIcons name="local-offer" size={22} color={CORES.primaria} />
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
              <Text style={[estilos.subtitulo, { marginLeft: 8 }]}>
                Resultados para "{produtoNome}"
              </Text>
            </View>

            {resultados.map((resultado, idx) => (
              <TouchableOpacity
                key={resultado.id}
                style={[
                  estilos.card,
<<<<<<< HEAD
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
=======
                  idx === 0 && estilos.cardDestaque,
                ]}
                onPress={() => feedback.vibrarCurto()}
                activeOpacity={0.7}
              >
                <View style={estilos.linha}>
                  <Image
                    source={{ uri: resultado.foto }}
                    style={estilos.imagemMercado}
                  />
                  <View style={{ marginLeft: 12, flex: 1 }}>
                    <View style={estilos.linha}>
                      <Text style={estilos.subtitulo} numberOfLines={1}>
                        {resultado.mercado}
                      </Text>
                    </View>
                    {idx === 0 && (
                      <View style={[estilos.badge, { marginTop: 4 }]}>
                        <Text style={estilos.badgeTexto}>💰 MELHOR PREÇO</Text>
                      </View>
                    )}
                    <Text style={[estilos.textoMini, estilos.mt_xs]}>
                      📍 {resultado.distancia}
                    </Text>
                    <Text style={[estilos.textoProgresso, { fontSize: 24, marginTop: 6 }]}>
                      {utils.formatarMoeda(resultado.preco)}
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
                    </Text>
                  </View>
                  <MaterialIcons name="chevron-right" size={24} color={CORES.cinzaMedio} />
                </View>
              </TouchableOpacity>
            ))}

<<<<<<< HEAD
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

        {resultados.length === 0 && historico.length === 0 && !naoEncontrado && !mostrarTodosProdutos && (
          <View style={[estilos.vazioContainer, { marginTop: 50 }]}>
            <MaterialIcons name="search" size={60} color={CORES.cinzaClaro} />
            <Text style={[estilos.vazioMensagem, { fontSize: 16 }]}>
              Busque um produto para comparar
            </Text>
            <Text style={[estilos.textoMini, { marginTop: 10, textAlign: 'center', paddingHorizontal: 20 }]}>
              Produtos disponíveis: {obterTodosProdutos().slice(0, 5).join(', ')} e mais!
=======
            {/* CARD DE ECONOMIA */}
            {economia > 0 && (
              <View style={[estilos.card, { backgroundColor: CORES.primaria }]}>
                <Text style={[estilos.subtitulo, { color: CORES.branco }]}>
                  💰 Economia Potencial
                </Text>
                <Text style={[estilos.textoNormal, { color: CORES.branco, marginTop: 8 }]}>
                  Economize até {utils.formatarMoeda(economia)} comprando no mercado mais barato!
                </Text>
              </View>
            )}
          </View>
        )}

        {/* ESTADO VAZIO */}
        {resultados.length === 0 && historico.length === 0 && !naoEncontrado && !mostrarTodosProdutos && (
          <View style={[estilos.vazioContainer, { marginTop: 60 }]}>
            <MaterialIcons name="search" size={70} color={CORES.cinzaClaro} />
            <Text style={estilos.vazioMensagem}>
              Busque um produto para comparar
            </Text>
            <Text style={[estilos.vazioSubmensagem, { paddingHorizontal: 30 }]}>
              Temos {obterTodosProdutos().length} produtos disponíveis para comparação
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
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
<<<<<<< HEAD

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
=======
  const [criandoLista, setCriandoLista] = useState(false);

  const criarListaDeReceita = async (receita) => {
    try {
      setCriandoLista(true);
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

      const sucesso = await armazenamento.adicionar(novaLista);
      
      if (sucesso) {
        Alert.alert(
          '✅ Lista Criada!',
          `A lista de compras para "${receita.nome}" foi criada com sucesso!`,
          [
            { text: 'Ver Lista', onPress: () => navigation.navigate('Listas') },
            { text: 'OK', style: 'cancel' }
          ]
        );
      } else {
        Alert.alert('Erro', 'Não foi possível criar a lista');
      }
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível criar a lista');
      console.error(erro);
    } finally {
      setCriandoLista(false);
    }
  };

  // VISUALIZAÇÃO DETALHADA DA RECEITA
  if (receitaSelecionada) {
    return (
      <ScrollView style={estilos.container}>
        <Image
          source={{ uri: receitaSelecionada.foto }}
          style={estilos.imagemMercadoGrande}
        />
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)

        <View style={estilos.conteudo}>
          <TouchableOpacity
            onPress={() => {
              feedback.vibrarCurto();
              setReceitaSelecionada(null);
            }}
<<<<<<< HEAD
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
=======
            style={[estilos.botaoOutline, { alignSelf: 'flex-start' }]}
            activeOpacity={0.7}
          >
            <View style={estilos.linha}>
              <MaterialIcons name="arrow-back" size={20} color={CORES.primaria} />
              <Text style={[estilos.textoNormal, { marginLeft: 6, color: CORES.primaria }]}>
                Voltar
              </Text>
            </View>
          </TouchableOpacity>

          <Text style={[estilos.titulo, estilos.mt_md]}>{receitaSelecionada.nome}</Text>

          {/* INFORMAÇÕES */}
          <View style={[estilos.linha, estilos.mt_md, { flexWrap: 'wrap' }]}>
            <View style={estilos.linha}>
              <MaterialIcons name="schedule" size={18} color={CORES.primaria} />
              <Text style={[estilos.textoPequeno, { marginLeft: 5, marginRight: 15 }]}>
                {receitaSelecionada.tempo}
              </Text>
            </View>
            <View style={estilos.linha}>
              <MaterialIcons name="star" size={18} color={CORES.alerta} />
              <Text style={[estilos.textoPequeno, { marginLeft: 5, marginRight: 15 }]}>
                {receitaSelecionada.dificuldade}
              </Text>
            </View>
            {receitaSelecionada.porcoes && (
              <View style={estilos.linha}>
                <MaterialIcons name="people" size={18} color={CORES.info} />
                <Text style={[estilos.textoPequeno, { marginLeft: 5 }]}>
                  {receitaSelecionada.porcoes}
                </Text>
              </View>
            )}
          </View>

          {/* INGREDIENTES */}
          <View style={[estilos.card, estilos.mt_lg]}>
            <View style={estilos.linha}>
              <MaterialIcons name="shopping-basket" size={22} color={CORES.primaria} />
              <Text style={[estilos.subtitulo, { marginLeft: 8 }]}>Ingredientes</Text>
            </View>
            <View style={estilos.divisor} />
            {receitaSelecionada.ingredientes.map((ing, idx) => (
              <View key={idx} style={[estilos.linha, estilos.mt_sm]}>
                <MaterialIcons name="check" size={18} color={CORES.sucesso} />
                <Text style={[estilos.textoNormal, { marginLeft: 8, flex: 1 }]}>{ing}</Text>
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
              </View>
            ))}
          </View>

<<<<<<< HEAD
          <TouchableOpacity
            style={[estilos.botaoPrimario, { marginTop: 20, marginBottom: 30 }]}
            onPress={() => criarListaDeReceita(receitaSelecionada)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="add-shopping-cart" size={20} color={CORES.branco} />
              <Text style={[estilos.textoBotao, { marginLeft: 8 }]}>Criar Lista de Compras</Text>
            </View>
=======
          {/* MODO DE PREPARO */}
          <View style={[estilos.card, estilos.mt_md]}>
            <View style={estilos.linha}>
              <MaterialIcons name="restaurant" size={22} color={CORES.primaria} />
              <Text style={[estilos.subtitulo, { marginLeft: 8 }]}>Modo de Preparo</Text>
            </View>
            <View style={estilos.divisor} />
            {receitaSelecionada.modo.map((passo, idx) => (
              <View key={idx} style={[estilos.linha, { alignItems: 'flex-start', marginTop: 12 }]}>
                <View style={[
                  estilos.badge,
                  { minWidth: 28, height: 28, justifyContent: 'center', alignItems: 'center' }
                ]}>
                  <Text style={estilos.badgeTexto}>{idx + 1}</Text>
                </View>
                <Text style={[estilos.textoNormal, { flex: 1, marginLeft: 10 }]}>{passo}</Text>
              </View>
            ))}
          </View>

          {/* BOTÃO CRIAR LISTA */}
          <TouchableOpacity
            style={[estilos.botaoPrimario, estilos.mt_xl, estilos.mb_xl]}
            onPress={() => criarListaDeReceita(receitaSelecionada)}
            disabled={criandoLista}
            activeOpacity={0.7}
          >
            {criandoLista ? (
              <ActivityIndicator color={CORES.branco} />
            ) : (
              <View style={estilos.linha}>
                <MaterialIcons name="add-shopping-cart" size={22} color={CORES.branco} />
                <Text style={[estilos.textoBotao, { marginLeft: 8 }]}>
                  Criar Lista de Compras
                </Text>
              </View>
            )}
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

<<<<<<< HEAD
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
=======
  // LISTA DE RECEITAS
  return (
    <ScrollView style={estilos.container}>
      <View style={estilos.conteudo}>
        <View style={estilos.linha}>
          <MaterialIcons name="restaurant-menu" size={28} color={CORES.primaria} />
          <Text style={[estilos.titulo, { marginLeft: 10, marginBottom: 0 }]}>
            Receitas Sugeridas
          </Text>
        </View>
        <Text style={[estilos.textoPequeno, estilos.mt_xs]}>
          Escolha uma receita e crie sua lista automaticamente
        </Text>

        <View style={[estilos.bannerInfo, estilos.mt_lg]}>
          <Text style={[estilos.textoNormal, { color: CORES.info }]}>
            💡 Dica: Toque em uma receita para ver os ingredientes e modo de preparo
          </Text>
        </View>

        {dadosMock.receitas.map((receita, idx) => (
          <TouchableOpacity
            key={receita.id}
            style={[estilos.card, idx === 0 && estilos.mt_md]}
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
            onPress={() => {
              feedback.vibrarCurto();
              setReceitaSelecionada(receita);
            }}
            activeOpacity={0.7}
          >
<<<<<<< HEAD
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
=======
            <View style={estilos.linha}>
              <Image
                source={{ uri: receita.foto }}
                style={estilos.imagemProduto}
              />
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={estilos.subtitulo} numberOfLines={2}>{receita.nome}</Text>
                <View style={[estilos.linha, estilos.mt_xs, { flexWrap: 'wrap' }]}>
                  <View style={estilos.linha}>
                    <MaterialIcons name="schedule" size={14} color={CORES.textoMedio} />
                    <Text style={[estilos.textoMini, { marginLeft: 4 }]}>
                      {receita.tempo}
                    </Text>
                  </View>
                  <Text style={[estilos.textoMini, { marginHorizontal: 8 }]}>•</Text>
                  <Text style={estilos.textoMini}>{receita.dificuldade}</Text>
                </View>
                <Text style={[estilos.textoMini, estilos.mt_xs]}>
                  📝 {receita.ingredientes.length} ingredientes
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
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
<<<<<<< HEAD
=======
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)

  useEffect(() => {
    carregarHistorico();
    const unsubscribe = navigation.addListener('focus', carregarHistorico);
    return unsubscribe;
  }, [navigation]);

  const carregarHistorico = async () => {
<<<<<<< HEAD
    const concluidas = await armazenamento.obterConcluidas();
    setListas(concluidas.reverse());
  };

=======
    try {
      setCarregando(true);
      const concluidas = await armazenamento.obterConcluidas();
      setListas(concluidas.reverse());
    } catch (erro) {
      console.error('Erro ao carregar histórico:', erro);
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  };

  const aoAtualizar = useCallback(() => {
    setAtualizando(true);
    carregarHistorico();
  }, []);

  if (carregando) {
    return (
      <View style={estilos.containerCentralizado}>
        <ActivityIndicator size="large" color={CORES.primaria} />
        <Text style={[estilos.textoPequeno, estilos.mt_md]}>Carregando histórico...</Text>
      </View>
    );
  }

>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
  return (
    <View style={estilos.container}>
      {listas.length === 0 ? (
        <View style={estilos.vazioContainer}>
          <MaterialIcons name="history" size={80} color={CORES.cinzaClaro} />
<<<<<<< HEAD
          <Text style={estilos.vazioMensagem}>Nenhuma concluída</Text>
          <Text style={estilos.vazioSubmensagem}>Complete uma lista para ver aqui</Text>
=======
          <Text style={estilos.vazioMensagem}>Nenhuma lista concluída</Text>
          <Text style={estilos.vazioSubmensagem}>
            Complete uma lista de compras para vê-la aqui
          </Text>
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
        </View>
      ) : (
        <FlatList
          data={listas}
          keyExtractor={i => i.id}
<<<<<<< HEAD
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
=======
          renderItem={({ item }) => {
            const totalItens = item.itens?.length || 0;
            const marcados = utils.contarMarcados(item.itens || []);
            
            return (
              <View style={estilos.card}>
                <View style={estilos.linha}>
                  <MaterialIcons name="check-circle" size={36} color={CORES.sucesso} />
                  <View style={{ marginLeft: 12, flex: 1 }}>
                    <Text style={estilos.subtitulo} numberOfLines={1}>{item.nome}</Text>
                    <View style={estilos.badge}>
                      <Text style={estilos.badgeTexto}>{item.categoria}</Text>
                    </View>
                    <Text style={[estilos.textoMini, estilos.mt_xs]}>
                      Concluída: {utils.formatarDataCurta(item.dataConclusao || item.dataCriacao)}
                    </Text>
                    <Text style={[estilos.textoProgresso, { fontSize: 14 }]}>
                      {marcados}/{totalItens} itens marcados
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
          refreshControl={
            <RefreshControl
              refreshing={atualizando}
              onRefresh={aoAtualizar}
              colors={[CORES.primaria]}
              tintColor={CORES.primaria}
            />
          }
          contentContainerStyle={{ paddingBottom: 20 }}
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
        />
      )}
    </View>
  );
}

// ==================== TELA: RELATÓRIOS ====================
export function TelaRelatorios() {
<<<<<<< HEAD
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
  const [dados, setDados] = useState({
    total: 0,
    concluidas: 0,
    ativas: 0,
    categorias: {},
    totalItens: 0,
    itensMarcados: 0
  });
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setCarregando(true);
      const todas = await armazenamento.obterTodas();
      
      const categorias = {};
      let totalItens = 0;
      let itensMarcados = 0;
      
      todas.forEach(lista => {
        const cat = lista.categoria || 'Sem categoria';
        categorias[cat] = (categorias[cat] || 0) + 1;
        
        if (lista.itens) {
          totalItens += lista.itens.length;
          itensMarcados += utils.contarMarcados(lista.itens);
        }
      });

      setDados({
        total: todas.length,
        concluidas: todas.filter(l => l.concluida).length,
        ativas: todas.filter(l => !l.concluida).length,
        categorias,
        totalItens,
        itensMarcados
      });
    } catch (erro) {
      console.error('Erro ao carregar relatórios:', erro);
    } finally {
      setCarregando(false);
    }
  };

  if (carregando) {
    return (
      <View style={estilos.containerCentralizado}>
        <ActivityIndicator size="large" color={CORES.primaria} />
        <Text style={[estilos.textoPequeno, estilos.mt_md]}>Gerando relatórios...</Text>
      </View>
    );
  }

  const taxaConclusao = dados.total > 0 
    ? Math.round((dados.concluidas / dados.total) * 100)
    : 0;

  const taxaItens = dados.totalItens > 0
    ? Math.round((dados.itensMarcados / dados.totalItens) * 100)
    : 0;
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)

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
=======
        <View style={estilos.linha}>
          <MaterialIcons name="bar-chart" size={28} color={CORES.primaria} />
          <Text style={[estilos.titulo, { marginLeft: 10, marginBottom: 0 }]}>
            Relatórios
          </Text>
        </View>
        <Text style={[estilos.textoPequeno, estilos.mt_xs]}>
          Estatísticas das suas listas de compras
        </Text>

        {/* RESUMO GERAL */}
        <View style={[estilos.card, estilos.mt_lg]}>
          <Text style={estilos.subtitulo}>📊 Resumo Geral</Text>
          <View style={estilos.divisor} />
          
          <View style={[estilos.linhaEntre, estilos.mt_sm]}>
            <Text style={estilos.textoNormal}>Total de listas:</Text>
            <Text style={estilos.textoDestaque}>{dados.total}</Text>
          </View>
          
          <View style={[estilos.linhaEntre, estilos.mt_sm]}>
            <Text style={estilos.textoNormal}>Listas ativas:</Text>
            <Text style={[estilos.textoDestaque, { color: CORES.alerta }]}>{dados.ativas}</Text>
          </View>
          
          <View style={[estilos.linhaEntre, estilos.mt_sm]}>
            <Text style={estilos.textoNormal}>Listas concluídas:</Text>
            <Text style={[estilos.textoDestaque, { color: CORES.sucesso }]}>{dados.concluidas}</Text>
          </View>
          
          <View style={[estilos.linhaEntre, estilos.mt_sm]}>
            <Text style={estilos.textoNormal}>Taxa de conclusão:</Text>
            <Text style={estilos.textoDestaque}>{taxaConclusao}%</Text>
          </View>

          {dados.total > 0 && (
            <>
              <View style={estilos.barraProgresso}>
                <View style={[estilos.preenchimentoProgresso, { width: `${taxaConclusao}%` }]} />
              </View>
            </>
          )}
        </View>

        {/* ESTATÍSTICAS DE ITENS */}
        <View style={[estilos.card, estilos.mt_md]}>
          <Text style={estilos.subtitulo}>🛒 Itens</Text>
          <View style={estilos.divisor} />
          
          <View style={[estilos.linhaEntre, estilos.mt_sm]}>
            <Text style={estilos.textoNormal}>Total de itens:</Text>
            <Text style={estilos.textoDestaque}>{dados.totalItens}</Text>
          </View>
          
          <View style={[estilos.linhaEntre, estilos.mt_sm]}>
            <Text style={estilos.textoNormal}>Itens marcados:</Text>
            <Text style={[estilos.textoDestaque, { color: CORES.sucesso }]}>{dados.itensMarcados}</Text>
          </View>
          
          <View style={[estilos.linhaEntre, estilos.mt_sm]}>
            <Text style={estilos.textoNormal}>Taxa de compra:</Text>
            <Text style={estilos.textoDestaque}>{taxaItens}%</Text>
          </View>

          {dados.totalItens > 0 && (
            <View style={estilos.barraProgresso}>
              <View style={[estilos.preenchimentoProgresso, { 
                width: `${taxaItens}%`,
                backgroundColor: CORES.sucesso
              }]} />
            </View>
          )}
        </View>

        {/* POR CATEGORIA */}
        <View style={[estilos.card, estilos.mt_md, estilos.mb_lg]}>
          <Text style={estilos.subtitulo}>📁 Por Categoria</Text>
          <View style={estilos.divisor} />
          
          {Object.keys(dados.categorias).length === 0 ? (
            <Text style={estilos.textoPequeno}>Nenhuma categoria registrada</Text>
          ) : (
            Object.entries(dados.categorias)
              .sort((a, b) => b[1] - a[1])
              .map(([cat, qtd]) => (
                <View key={cat} style={[estilos.linhaEntre, estilos.mt_sm]}>
                  <Text style={estilos.textoNormal} numberOfLines={1}>{cat}</Text>
                  <View style={estilos.badge}>
                    <Text style={estilos.badgeTexto}>{qtd}</Text>
                  </View>
                </View>
              ))
          )}
        </View>
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
      </View>
    </ScrollView>
  );
}