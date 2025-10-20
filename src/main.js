import React, { useState, useEffect } from 'react';
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
    );
  };

  return (
    <View style={estilos.container}>
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
      <TouchableOpacity
        style={estilos.botaoFlutuante}
        onPress={() => navigation.navigate('CriarLista')}
      >
        <MaterialIcons name="add" size={30} color={CORES.branco} />
      </TouchableOpacity>
    </View>
  );
}

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
    setItens(itens.filter(item => item.id !== id));
  };

  const salvar = async () => {
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
      itens,
      dataCriacao: new Date().toISOString(),
      concluida: false,
    };

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
  };

  return (
    <ScrollView style={estilos.container}>
      <View style={estilos.conteudo}>
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
              onSubmitEditing={adicionarItem}
            />
            <TouchableOpacity style={estilos.botaoAdicionar} onPress={adicionarItem}>
              <MaterialIcons name="add" size={24} color={CORES.branco} />
            </TouchableOpacity>
          </View>
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
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// ==================== DETALHES LISTA ====================
export function TelaDetalhesLista({ route, navigation }) {
  const { idLista } = route.params;
  const [lista, setLista] = useState(null);

  useEffect(() => {
    carregarLista();
  }, []);

  const carregarLista = async () => {
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
  };

  if (!lista) {
    return (
      <View style={estilos.containerCentralizado}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  const progresso = calculos.calcularProgresso(lista.itens);
  const concluidos = lista.itens.filter(i => i.marcado).length;
  const completa = progresso === 100;

  return (
    <View style={estilos.container}>
      <View style={estilos.cabecalho}>
        <Text style={estilos.titulo}>{lista.nome}</Text>
        <Text style={estilos.textoProgresso}>
          {concluidos}/{lista.itens.length} itens
        </Text>
        <View style={estilos.barraProgresso}>
          <View style={[estilos.preenchimentoProgresso, { width: `${progresso}%` }]} />
        </View>
      </View>

      <FlatList
        data={lista.itens}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={estilos.itemContainer}
            onPress={() => alternarItem(item.id)}
          >
            <MaterialIcons
              name={item.marcado ? 'check-box' : 'check-box-outline-blank'}
              size={28}
              color={item.marcado ? CORES.primaria : CORES.cinzaMedio}
            />
            <Text style={[estilos.itemTexto, item.marcado && estilos.textoMarcado]}>
              {item.nome}
            </Text>
          </TouchableOpacity>
        )}
      />

      {completa && (
        <TouchableOpacity style={estilos.botaoFinalizar} onPress={finalizar}>
          <MaterialIcons name="check-circle" size={24} color={CORES.branco} />
          <Text style={[estilos.textoBotao, { marginLeft: 10 }]}>Finalizar Lista</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

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
        )}
      />
    </View>
  );
}

// ==================== HISTÓRICO ====================
export function TelaHistorico() {
  const [concluidas, setConcluidas] = useState([]);

  useEffect(() => {
    carregarHistorico();
  }, []);

  const carregarHistorico = async () => {
    const listas = await armazenamento.obterListasConcluidas();
    setConcluidas(listas.reverse());
  };

  return (
    <View style={estilos.container}>
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
  );
}