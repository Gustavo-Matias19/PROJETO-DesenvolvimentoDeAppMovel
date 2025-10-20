import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ScrollView, Modal, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { estilos, CORES } from './styles';
import { armazenamento, feedback, utils, dadosMock, calcularConquistas } from './funcoes';

// ==================== COMPONENTE: MODAL DE CONFIRMAÇÃO ====================
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
    setModalExcluir({ visivel: true, item });
  };

  const confirmarExclusao = async () => {
    if (modalExcluir.item) {
      await armazenamento.excluir(modalExcluir.item.id);
      setModalExcluir({ visivel: false, item: null });
      carregarListas();
    }
  };

  const renderizarLista = ({ item }) => {
    const progresso = utils.calcularProgresso(item.itens);
    const feitos = utils.contarMarcados(item.itens);

    return (
      <View style={estilos.card}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('DetalhesLista', { idLista: item.id })}
        >
          <View style={estilos.linhaEntre}>
            <Text style={estilos.subtitulo}>{item.nome}</Text>
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                abrirModalExcluir(item);
              }}
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
        <FlatList
          data={listas}
          keyExtractor={item => item.id}
          renderItem={renderizarLista}
        />
      )}

      <TouchableOpacity
        style={estilos.botaoFlutuante}
        onPress={() => navigation.navigate('CriarLista')}
      >
        <MaterialIcons name="add" size={32} color={CORES.branco} />
      </TouchableOpacity>
    </View>
  );
}

// ==================== TELA: CRIAR LISTA ====================
export function TelaCriarLista({ navigation }) {
  const [nome, setNome] = useState('');
  const [itemNome, setItemNome] = useState('');
  const [itens, setItens] = useState([]);
  const [salvando, setSalvando] = useState(false);
  const [modalSucesso, setModalSucesso] = useState(false);
  const [erro, setErro] = useState('');

  const adicionarItem = () => {
    if (!itemNome.trim()) return;

    setItens([...itens, {
      id: utils.gerarId(),
      nome: itemNome.trim(),
      marcado: false
    }]);
    setItemNome('');
  };

  const removerItem = (id) => {
    setItens(itens.filter(item => item.id !== id));
  };

  const salvar = async () => {
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
              onSubmitEditing={adicionarItem}
            />
            <TouchableOpacity style={estilos.botaoAdicionar} onPress={adicionarItem}>
              <MaterialIcons name="add" size={24} color={CORES.branco} />
            </TouchableOpacity>
          </View>

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

  useEffect(() => {
    carregarLista();
  }, []);

  const carregarLista = async () => {
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
  };

  if (!lista) {
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
        <Text style={estilos.textoProgresso}>
          {feitos}/{lista.itens.length} itens ({progresso.toFixed(0)}%)
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
            onPress={() => toggleItem(item.id)}
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
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <View style={estilos.rodapeFixo}>
        <TouchableOpacity
          style={estilos.botaoPrimario}
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
    </View>
  );
}

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
        )}
      />
    </View>
  );
}

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
        </View>
      ) : (
        <FlatList
          data={listas}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={estilos.card}>
              <View style={estilos.linha}>
                <MaterialIcons name="check-circle" size={32} color={CORES.primaria} />
                <View style={{ marginLeft: 15, flex: 1 }}>
                  <Text style={estilos.subtitulo}>{item.nome}</Text>
                  <Text style={estilos.textoMini}>
                    {utils.formatarData(item.dataCriacao)}
                  </Text>
                  <Text style={estilos.textoProgresso}>
                    {item.itens.length} itens
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

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

  return (
    <ScrollView style={estilos.container}>
      <View style={estilos.conteudo}>
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
  );
}