import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView, 
  FlatList, Alert, ActivityIndicator, Modal
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { estilos, CORES } from './styles';
import { armazenamento, utils, feedback } from './funcoes';

// ==================== TELA: PAINEL ADMIN ====================
export function TelaPainelAdmin({ navigation, onLogout }) {
  const [stats, setStats] = useState({
    receitas: 0,
    produtos: 0,
    usuarios: 0
  });

  useEffect(() => {
    carregarEstatisticas();
  }, []);

  const carregarEstatisticas = async () => {
    const receitas = await armazenamento.obterReceitasCustom();
    const produtos = await armazenamento.obterProdutosCustom();
    const usuarios = await armazenamento.obterUsuarios();

    setStats({
      receitas: receitas.length,
      produtos: produtos.length,
      usuarios: usuarios.length
    });
  };

  const opcoes = [
    {
      id: '1',
      titulo: 'Gerenciar Receitas',
      descricao: 'Adicionar, editar ou remover receitas',
      icone: 'restaurant-menu',
      cor: CORES.primaria,
      tela: 'AdminReceitas'
    },
    {
      id: '2',
      titulo: 'Gerenciar Produtos',
      descricao: 'Adicionar produtos e preços',
      icone: 'shopping-basket',
      cor: CORES.secundaria,
      tela: 'AdminProdutos'
    },
    {
      id: '3',
      titulo: 'Usuários',
      descricao: 'Visualizar usuários cadastrados',
      icone: 'people',
      cor: CORES.info,
      tela: 'AdminUsuarios'
    }
  ];

  return (
    <ScrollView style={estilos.container}>
      <View style={estilos.conteudo}>
        {/* CABEÇALHO */}
        <View style={[estilos.card, { backgroundColor: CORES.primaria }]}>
          <View style={estilos.linhaEntre}>
            <View>
              <Text style={[estilos.titulo, { color: CORES.branco, marginBottom: 5 }]}>
                👑 Painel Admin
              </Text>
              <Text style={[estilos.textoPequeno, { color: CORES.branco }]}>
                Bem-vindo, Administrador!
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Sair',
                  'Deseja sair do modo administrador?',
                  [
                    { text: 'Cancelar', style: 'cancel' },
                    {
                      text: 'Sair',
                      style: 'destructive',
                      onPress: () => {
                        feedback.vibrarMedio();
                        onLogout();
                      }
                    }
                  ]
                );
              }}
              style={estilos.botaoIcone}
            >
              <MaterialIcons name="logout" size={22} color={CORES.branco} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ESTATÍSTICAS */}
        <View style={[estilos.linha, estilos.mt_md, { justifyContent: 'space-between' }]}>
          <View style={[estilos.card, { flex: 1, marginRight: 5, alignItems: 'center' }]}>
            <MaterialIcons name="restaurant-menu" size={30} color={CORES.primaria} />
            <Text style={[estilos.textoProgresso, { fontSize: 24, marginTop: 10 }]}>
              {stats.receitas}
            </Text>
            <Text style={estilos.textoMini}>Receitas</Text>
          </View>

          <View style={[estilos.card, { flex: 1, marginHorizontal: 5, alignItems: 'center' }]}>
            <MaterialIcons name="shopping-basket" size={30} color={CORES.secundaria} />
            <Text style={[estilos.textoProgresso, { fontSize: 24, marginTop: 10 }]}>
              {stats.produtos}
            </Text>
            <Text style={estilos.textoMini}>Produtos</Text>
          </View>

          <View style={[estilos.card, { flex: 1, marginLeft: 5, alignItems: 'center' }]}>
            <MaterialIcons name="people" size={30} color={CORES.info} />
            <Text style={[estilos.textoProgresso, { fontSize: 24, marginTop: 10 }]}>
              {stats.usuarios}
            </Text>
            <Text style={estilos.textoMini}>Usuários</Text>
          </View>
        </View>

        {/* OPÇÕES */}
        <Text style={[estilos.subtitulo, estilos.mt_xl]}>Gerenciamento</Text>
        {opcoes.map(opcao => (
          <TouchableOpacity
            key={opcao.id}
            style={[estilos.card, estilos.mt_md]}
            onPress={() => {
              feedback.vibrarCurto();
              navigation.navigate(opcao.tela);
            }}
            activeOpacity={0.7}
          >
            <View style={estilos.linha}>
              <View style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: opcao.cor,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <MaterialIcons name={opcao.icone} size={26} color={CORES.branco} />
              </View>
              <View style={{ marginLeft: 15, flex: 1 }}>
                <Text style={estilos.subtitulo}>{opcao.titulo}</Text>
                <Text style={estilos.textoMini}>{opcao.descricao}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={CORES.cinzaMedio} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

// ==================== TELA: ADMIN RECEITAS ====================
export function TelaAdminReceitas({ navigation }) {
  const [receitas, setReceitas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarReceitas();
  }, []);

  const carregarReceitas = async () => {
    try {
      setCarregando(true);
      const receitasCustom = await armazenamento.obterReceitasCustom();
      setReceitas(receitasCustom);
    } finally {
      setCarregando(false);
    }
  };

  const excluirReceita = (id) => {
    Alert.alert(
      'Excluir Receita',
      'Deseja realmente excluir esta receita?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await armazenamento.excluirReceita(id);
            feedback.vibrarMedio();
            carregarReceitas();
          }
        }
      ]
    );
  };

  if (carregando) {
    return (
      <View style={estilos.containerCentralizado}>
        <ActivityIndicator size="large" color={CORES.primaria} />
      </View>
    );
  }

  return (
    <View style={estilos.container}>
      <View style={estilos.conteudo}>
        <View style={estilos.linhaEntre}>
          <Text style={estilos.titulo}>Gerenciar Receitas</Text>
          <Text style={estilos.textoProgresso}>{receitas.length} total</Text>
        </View>

        {receitas.length === 0 ? (
          <View style={estilos.vazioContainer}>
            <MaterialIcons name="restaurant-menu" size={60} color={CORES.cinzaClaro} />
            <Text style={estilos.vazioMensagem}>Nenhuma receita criada</Text>
          </View>
        ) : (
          <FlatList
            data={receitas}
            keyExtractor={i => i.id}
            renderItem={({ item }) => (
              <View style={[estilos.card, estilos.mt_md]}>
                <View style={estilos.linhaEntre}>
                  <View style={{ flex: 1 }}>
                    <Text style={estilos.subtitulo}>{item.nome}</Text>
                    <Text style={estilos.textoMini}>
                      {item.ingredientes.length} ingredientes • {item.tempo}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => excluirReceita(item.id)}
                    style={estilos.botaoIcone}
                  >
                    <MaterialIcons name="delete" size={20} color={CORES.perigo} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>

      <TouchableOpacity
        style={estilos.botaoFlutuante}
        onPress={() => {
          feedback.vibrarCurto();
          navigation.navigate('AdminNovaReceita');
        }}
      >
        <MaterialIcons name="add" size={32} color={CORES.branco} />
      </TouchableOpacity>
    </View>
  );
}

// ==================== TELA: ADMIN NOVA RECEITA ====================
export function TelaAdminNovaReceita({ navigation }) {
  const [nome, setNome] = useState('');
  const [tempo, setTempo] = useState('');
  const [dificuldade, setDificuldade] = useState('Fácil');
  const [porcoes, setPorcoes] = useState('');
  const [ingrediente, setIngrediente] = useState('');
  const [ingredientes, setIngredientes] = useState([]);
  const [passo, setPasso] = useState('');
  const [passos, setPassos] = useState([]);
  const [foto, setFoto] = useState('');
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  const mostrarErro = (msg) => {
    feedback.vibrarAlerta();
    setErro(msg);
    setTimeout(() => setErro(''), 3000);
  };

  const adicionarIngrediente = () => {
    if (!ingrediente.trim()) return;
    setIngredientes([...ingredientes, ingrediente.trim()]);
    setIngrediente('');
    feedback.vibrarCurto();
  };

  const adicionarPasso = () => {
    if (!passo.trim()) return;
    setPassos([...passos, passo.trim()]);
    setPasso('');
    feedback.vibrarCurto();
  };

  const salvarReceita = async () => {
    if (!nome.trim() || !tempo.trim()) {
      mostrarErro('Preencha nome e tempo');
      return;
    }

    if (ingredientes.length === 0) {
      mostrarErro('Adicione ao menos 1 ingrediente');
      return;
    }

    if (passos.length === 0) {
      mostrarErro('Adicione ao menos 1 passo');
      return;
    }

    try {
      setSalvando(true);

      const novaReceita = {
        id: utils.gerarId(),
        nome: nome.trim(),
        tempo: tempo.trim(),
        dificuldade,
        porcoes: porcoes.trim() || '2 pessoas',
        ingredientes,
        modo: passos,
        foto: foto.trim() || 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
        custom: true
      };

      await armazenamento.adicionarReceita(novaReceita);
      feedback.vibrarSucesso();
      
      Alert.alert('Sucesso', 'Receita criada com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);

    } catch (erro) {
      mostrarErro('Erro ao salvar receita');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <ScrollView style={estilos.container} keyboardShouldPersistTaps="handled">
      <View style={estilos.conteudo}>
        <Text style={estilos.titulo}>Nova Receita</Text>

        {erro !== '' && (
          <View style={estilos.bannerErro}>
            <Text style={estilos.textoErro}>⚠️ {erro}</Text>
          </View>
        )}

        {/* INFORMAÇÕES BÁSICAS */}
        <Text style={[estilos.rotulo, estilos.mt_md]}>Nome da Receita *</Text>
        <TextInput
          style={estilos.input}
          placeholder="Ex: Bolo de Chocolate"
          placeholderTextColor={CORES.textoClaro}
          value={nome}
          onChangeText={setNome}
          maxLength={50}
        />

        <Text style={[estilos.rotulo, estilos.mt_md]}>Tempo de Preparo *</Text>
        <TextInput
          style={estilos.input}
          placeholder="Ex: 30 min"
          placeholderTextColor={CORES.textoClaro}
          value={tempo}
          onChangeText={setTempo}
          maxLength={20}
        />

        <Text style={[estilos.rotulo, estilos.mt_md]}>Dificuldade *</Text>
        <View style={estilos.linha}>
          {['Fácil', 'Médio', 'Difícil'].map(nivel => (
            <TouchableOpacity
              key={nivel}
              style={[
                estilos.botaoOutline,
                { flex: 1, marginRight: 5 },
                dificuldade === nivel && { backgroundColor: CORES.primaria, borderColor: CORES.primaria }
              ]}
              onPress={() => setDificuldade(nivel)}
            >
              <Text style={[
                estilos.textoNormal,
                { color: dificuldade === nivel ? CORES.branco : CORES.primaria, textAlign: 'center' }
              ]}>
                {nivel}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[estilos.rotulo, estilos.mt_md]}>Porções</Text>
        <TextInput
          style={estilos.input}
          placeholder="Ex: 4 pessoas"
          placeholderTextColor={CORES.textoClaro}
          value={porcoes}
          onChangeText={setPorcoes}
          maxLength={30}
        />

        <Text style={[estilos.rotulo, estilos.mt_md]}>URL da Foto</Text>
        <TextInput
          style={estilos.input}
          placeholder="https://..."
          placeholderTextColor={CORES.textoClaro}
          value={foto}
          onChangeText={setFoto}
        />

        {/* INGREDIENTES */}
        <View style={estilos.divisor} />
        <Text style={[estilos.rotulo, estilos.mt_md]}>Ingredientes *</Text>
        <View style={estilos.containerAdicionarItem}>
          <TextInput
            style={[estilos.input, estilos.inputItem]}
            placeholder="Ex: Farinha de trigo 500g"
            placeholderTextColor={CORES.textoClaro}
            value={ingrediente}
            onChangeText={setIngrediente}
            onSubmitEditing={adicionarIngrediente}
          />
          <TouchableOpacity style={estilos.botaoAdicionar} onPress={adicionarIngrediente}>
            <MaterialIcons name="add" size={24} color={CORES.branco} />
          </TouchableOpacity>
        </View>

        {ingredientes.length > 0 && (
          <View style={[estilos.card, estilos.mt_sm]}>
            {ingredientes.map((ing, idx) => (
              <View key={idx} style={[estilos.linha, estilos.mt_xs, { justifyContent: 'space-between' }]}>
                <Text style={estilos.textoNormal}>{idx + 1}. {ing}</Text>
                <TouchableOpacity onPress={() => setIngredientes(ingredientes.filter((_, i) => i !== idx))}>
                  <MaterialIcons name="close" size={18} color={CORES.perigo} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* MODO DE PREPARO */}
        <View style={estilos.divisor} />
        <Text style={[estilos.rotulo, estilos.mt_md]}>Modo de Preparo *</Text>
        <TextInput
          style={[estilos.input, { height: 80 }]}
          placeholder="Descreva um passo..."
          placeholderTextColor={CORES.textoClaro}
          value={passo}
          onChangeText={setPasso}
          multiline
          numberOfLines={3}
        />
        <TouchableOpacity 
          style={[estilos.botaoSecundario, estilos.mt_sm]} 
          onPress={adicionarPasso}
        >
          <Text style={estilos.textoBotao}>Adicionar Passo</Text>
        </TouchableOpacity>

        {passos.length > 0 && (
          <View style={[estilos.card, estilos.mt_md]}>
            {passos.map((p, idx) => (
              <View key={idx} style={[estilos.linha, { alignItems: 'flex-start', marginTop: 10 }]}>
                <View style={[estilos.badge, { minWidth: 28, justifyContent: 'center', alignItems: 'center' }]}>
                  <Text style={estilos.badgeTexto}>{idx + 1}</Text>
                </View>
                <Text style={[estilos.textoNormal, { flex: 1, marginLeft: 10 }]}>{p}</Text>
                <TouchableOpacity onPress={() => setPassos(passos.filter((_, i) => i !== idx))}>
                  <MaterialIcons name="close" size={18} color={CORES.perigo} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* BOTÃO SALVAR */}
        <TouchableOpacity
          style={[estilos.botaoPrimario, estilos.mt_xl, estilos.mb_xl]}
          onPress={salvarReceita}
          disabled={salvando}
        >
          {salvando ? (
            <ActivityIndicator color={CORES.branco} />
          ) : (
            <View style={estilos.linha}>
              <MaterialIcons name="check" size={22} color={CORES.branco} />
              <Text style={[estilos.textoBotao, { marginLeft: 8 }]}>Salvar Receita</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// ==================== TELA: ADMIN PRODUTOS ====================
export function TelaAdminProdutos({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      setCarregando(true);
      const produtosCustom = await armazenamento.obterProdutosCustom();
      setProdutos(produtosCustom);
    } finally {
      setCarregando(false);
    }
  };

  const excluirProduto = (id) => {
    Alert.alert(
      'Excluir Produto',
      'Deseja realmente excluir este produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await armazenamento.excluirProduto(id);
            feedback.vibrarMedio();
            carregarProdutos();
          }
        }
      ]
    );
  };

  if (carregando) {
    return (
      <View style={estilos.containerCentralizado}>
        <ActivityIndicator size="large" color={CORES.primaria} />
      </View>
    );
  }

  return (
    <View style={estilos.container}>
      <View style={estilos.conteudo}>
        <View style={estilos.linhaEntre}>
          <Text style={estilos.titulo}>Gerenciar Produtos</Text>
          <Text style={estilos.textoProgresso}>{produtos.length} total</Text>
        </View>

        {produtos.length === 0 ? (
          <View style={estilos.vazioContainer}>
            <MaterialIcons name="shopping-basket" size={60} color={CORES.cinzaClaro} />
            <Text style={estilos.vazioMensagem}>Nenhum produto criado</Text>
          </View>
        ) : (
          <FlatList
            data={produtos}
            keyExtractor={i => i.id}
            renderItem={({ item }) => (
              <View style={[estilos.card, estilos.mt_md]}>
                <View style={estilos.linhaEntre}>
                  <View style={{ flex: 1 }}>
                    <Text style={estilos.subtitulo}>{item.nome}</Text>
                    <View style={estilos.badge}>
                      <Text style={estilos.badgeTexto}>{item.categoria}</Text>
                    </View>
                    <Text style={[estilos.textoMini, estilos.mt_xs]}>
                      {item.precos.length} mercados cadastrados
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => excluirProduto(item.id)}
                    style={estilos.botaoIcone}
                  >
                    <MaterialIcons name="delete" size={20} color={CORES.perigo} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>

      <TouchableOpacity
        style={estilos.botaoFlutuante}
        onPress={() => {
          feedback.vibrarCurto();
          navigation.navigate('AdminNovoProduto');
        }}
      >
        <MaterialIcons name="add" size={32} color={CORES.branco} />
      </TouchableOpacity>
    </View>
  );
}

// ==================== TELA: ADMIN USUÁRIOS ====================
export function TelaAdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      setCarregando(true);
      const users = await armazenamento.obterUsuarios();
      setUsuarios(users);
    } finally {
      setCarregando(false);
    }
  };

  if (carregando) {
    return (
      <View style={estilos.containerCentralizado}>
        <ActivityIndicator size="large" color={CORES.primaria} />
      </View>
    );
  }

  return (
    <ScrollView style={estilos.container}>
      <View style={estilos.conteudo}>
        <View style={estilos.linhaEntre}>
          <Text style={estilos.titulo}>Usuários Cadastrados</Text>
          <Text style={estilos.textoProgresso}>{usuarios.length}</Text>
        </View>

        {usuarios.length === 0 ? (
          <View style={estilos.vazioContainer}>
            <MaterialIcons name="people" size={60} color={CORES.cinzaClaro} />
            <Text style={estilos.vazioMensagem}>Nenhum usuário cadastrado</Text>
          </View>
        ) : (
          usuarios.map(user => (
            <View key={user.id} style={[estilos.card, estilos.mt_md]}>
              <View style={estilos.linha}>
                <MaterialIcons name="person" size={40} color={CORES.primaria} />
                <View style={{ marginLeft: 15, flex: 1 }}>
                  <Text style={estilos.subtitulo}>{user.nome}</Text>
                  <Text style={estilos.textoMini}>{user.email}</Text>
                  {user.dataCriacao && (
                    <Text style={[estilos.textoMini, estilos.mt_xs]}>
                      Cadastrado em: {utils.formatarDataCurta(user.dataCriacao)}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}