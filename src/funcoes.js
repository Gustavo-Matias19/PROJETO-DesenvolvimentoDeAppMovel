import AsyncStorage from '@react-native-async-storage/async-storage';
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
import { Vibration, Platform } from 'react-native';

const CHAVE = '@compras_app:listas';

<<<<<<< HEAD
// ==================== FEEDBACK COM VIBRAÇÃO ====================
export const feedback = {
  vibrarCurto() {
    if (Platform.OS !== 'web') {
      Vibration.vibrate(30);
    }
  },

  vibrarMedio() {
    if (Platform.OS !== 'web') {
      Vibration.vibrate(50);
    }
  },

  vibrarSucesso() {
    if (Platform.OS !== 'web') {
      Vibration.vibrate([0, 50, 100, 50]);
    }
  },

  vibrarAlerta() {
    if (Platform.OS !== 'web') {
      Vibration.vibrate([0, 100, 50, 100]);
    }
  },
};

// ==================== ARMAZENAMENTO ====================
export const armazenamento = {
=======
// ==================== ARMAZENAMENTO ====================
export const armazenamento = {
  // Obter todas as listas
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
  async obterTodas() {
    try {
      const json = await AsyncStorage.getItem(CHAVE);
      return json ? JSON.parse(json) : [];
    } catch (erro) {
      console.error('Erro ao obter:', erro);
<<<<<<< HEAD
=======
=======
import { Vibration, Alert } from 'react-native';

const CHAVE_LISTAS = 'shoppingLists';

// ==================== ARMAZENAMENTO ====================
export const armazenamento = {
  async obterTodasListas() {
    try {
      const dados = await AsyncStorage.getItem(CHAVE_LISTAS);
      return dados ? JSON.parse(dados) : [];
    } catch (erro) {
      console.error('Erro:', erro);
>>>>>>> 22a61768673c58df3bf28a94baab7eb52948f5fa
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
      return [];
    }
  },

<<<<<<< HEAD
=======
<<<<<<< HEAD
  // Salvar array de listas
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
  async salvar(listas) {
    try {
      await AsyncStorage.setItem(CHAVE, JSON.stringify(listas));
      return true;
    } catch (erro) {
      console.error('Erro ao salvar:', erro);
      return false;
    }
  },

<<<<<<< HEAD
=======
  // Obter apenas listas ativas
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
  async obterAtivas() {
    const todas = await this.obterTodas();
    return todas.filter(lista => !lista.concluida);
  },

<<<<<<< HEAD
=======
  // Obter apenas listas concluídas
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
  async obterConcluidas() {
    const todas = await this.obterTodas();
    return todas.filter(lista => lista.concluida);
  },

<<<<<<< HEAD
=======
  // Obter lista específica por ID
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
  async obterPorId(id) {
    const todas = await this.obterTodas();
    return todas.find(lista => lista.id === id);
  },

<<<<<<< HEAD
=======
  // Adicionar nova lista
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
  async adicionar(novaLista) {
    const todas = await this.obterTodas();
    todas.push(novaLista);
    return await this.salvar(todas);
  },

<<<<<<< HEAD
  async atualizar(id, listaAtualizada) {
    const todas = await this.obterTodas();
    const indice = todas.findIndex(lista => lista.id === id);

=======
  // Atualizar lista existente
  async atualizar(id, listaAtualizada) {
    const todas = await this.obterTodas();
    const indice = todas.findIndex(lista => lista.id === id);
    
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
    if (indice >= 0) {
      todas[indice] = listaAtualizada;
      return await this.salvar(todas);
    }
    return false;
  },

<<<<<<< HEAD
=======
  // Excluir lista
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
  async excluir(id) {
    const todas = await this.obterTodas();
    const novas = todas.filter(lista => lista.id !== id);
    return await this.salvar(novas);
  },
<<<<<<< HEAD
=======

  // Marcar lista como concluída
  async concluir(id) {
    const todas = await this.obterTodas();
    const indice = todas.findIndex(lista => lista.id === id);
    
    if (indice >= 0) {
      todas[indice].concluida = true;
      todas[indice].dataConclusao = new Date().toISOString();
      return await this.salvar(todas);
    }
    return false;
  },

  // Limpar tudo (útil para testes)
  async limparTudo() {
    try {
      await AsyncStorage.removeItem(CHAVE);
      return true;
    } catch (erro) {
      console.error('Erro ao limpar:', erro);
      return false;
    }
  }
=======
  async obterListasAtivas() {
    const todas = await this.obterTodasListas();
    return todas.filter(lista => !lista.concluida);
  },

  async obterListasConcluidas() {
    const todas = await this.obterTodasListas();
    return todas.filter(lista => lista.concluida);
  },

  async obterListaPorId(id) {
    const todas = await this.obterTodasListas();
    return todas.find(lista => lista.id === id);
  },

  async salvarLista(novaLista) {
    try {
      const listas = await this.obterTodasListas();
      listas.push(novaLista);
      await AsyncStorage.setItem(CHAVE_LISTAS, JSON.stringify(listas));
      return true;
    } catch (erro) {
      return false;
    }
  },

  async atualizarLista(id, listaAtualizada) {
    try {
      const listas = await this.obterTodasListas();
      const indice = listas.findIndex(l => l.id === id);
      if (indice !== -1) {
        listas[indice] = listaAtualizada;
        await AsyncStorage.setItem(CHAVE_LISTAS, JSON.stringify(listas));
        return true;
      }
      return false;
    } catch (erro) {
      return false;
    }
  },

  async excluirLista(id) {
    try {
      const listas = await this.obterTodasListas();
      const novas = listas.filter(lista => lista.id !== id);
      await AsyncStorage.setItem(CHAVE_LISTAS, JSON.stringify(novas));
      return true;
    } catch (erro) {
      return false;
    }
  },

  async concluirLista(id) {
    const lista = await this.obterListaPorId(id);
    if (lista) {
      lista.concluida = true;
      return await this.atualizarLista(id, lista);
    }
    return false;
  },
>>>>>>> 22a61768673c58df3bf28a94baab7eb52948f5fa
};

// ==================== FEEDBACK ====================
export const feedback = {
<<<<<<< HEAD
  // Vibração curta
  vibrar() {
    if (Platform.OS !== 'web') {
      Vibration.vibrate(50);
    }
  },

  // Vibração de sucesso (padrão)
  vibrarSucesso() {
    if (Platform.OS !== 'web') {
      Vibration.vibrate([0, 50, 100, 50]);
    }
  }
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
};

// ==================== UTILITÁRIOS ====================
export const utils = {
<<<<<<< HEAD
  gerarId() {
    return Date.now().toString() + Math.random().toString(36).slice(2, 9);
  },

=======
  // Gerar ID único
  gerarId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  },

  // Formatar data ISO para PT-BR
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
  formatarData(dataISO) {
    try {
      const data = new Date(dataISO);
      return data.toLocaleDateString('pt-BR');
<<<<<<< HEAD
    } catch {
=======
    } catch (erro) {
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
      return 'Data inválida';
    }
  },

<<<<<<< HEAD
  calcularProgresso(itens) {
    if (!itens || itens.length === 0) return 0;
    const marcados = itens.filter(i => i.marcado).length;
    return (marcados / itens.length) * 100;
  },

  contarMarcados(itens) {
    if (!itens) return 0;
    return itens.filter(i => i.marcado).length;
=======
  // Calcular progresso de itens marcados
  calcularProgresso(itens) {
    if (!itens || itens.length === 0) return 0;
    const marcados = itens.filter(item => item.marcado).length;
    return (marcados / itens.length) * 100;
  },

  // Contar itens marcados
  contarMarcados(itens) {
    if (!itens || itens.length === 0) return 0;
    return itens.filter(item => item.marcado).length;
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
  }
};

// ==================== DADOS MOCKADOS ====================
export const dadosMock = {
<<<<<<< HEAD
  receitas: [
    {
      id: '1',
      nome: '🍝 Macarrão ao Alho e Óleo',
      tempo: '15 min',
      dificuldade: 'Fácil',
      ingredientes: ['Macarrão 500g', 'Alho 6 dentes', 'Azeite 100ml', 'Sal', 'Pimenta do reino'],
      modo: [
        'Cozinhe o macarrão em água fervente com sal por 10 minutos',
        'Pique o alho em lâminas finas',
        'Refogue o alho no azeite até dourar levemente',
        'Escorra o macarrão e misture com o alho',
        'Tempere com pimenta do reino e sirva quente'
      ],
      foto: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
    },
    {
      id: '2',
      nome: '🍲 Arroz com Feijão Completo',
      tempo: '40 min',
      dificuldade: 'Médio',
      ingredientes: ['Arroz 2 xícaras', 'Feijão 1 xícara', 'Alho 4 dentes', 'Cebola 1 unidade', 'Óleo', 'Sal'],
      modo: [
        'Deixe o feijão de molho por 2 horas',
        'Cozinhe o feijão na panela de pressão por 20 minutos',
        'Refogue alho e cebola, adicione o arroz',
        'Adicione água (2x a medida do arroz) e deixe cozinhar',
        'Tempere o feijão cozido e refogue novamente'
      ],
      foto: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
    },
    {
      id: '3',
      nome: '🥗 Salada Caesar',
      tempo: '10 min',
      dificuldade: 'Fácil',
      ingredientes: ['Alface romana', 'Peito de frango 200g', 'Queijo parmesão', 'Molho Caesar', 'Croutons'],
      modo: [
        'Lave e corte a alface em pedaços médios',
        'Grelhe o frango e corte em cubos',
        'Monte a salada com alface, frango e croutons',
        'Regue com molho Caesar',
        'Finalize com parmesão ralado na hora'
      ],
      foto: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
    },
    {
      id: '4',
      nome: '🍳 Omelete Caprichado',
      tempo: '8 min',
      dificuldade: 'Fácil',
      ingredientes: ['Ovos 3 unidades', 'Queijo muçarela', 'Tomate', 'Sal', 'Manteiga', 'Orégano'],
      modo: [
        'Bata os ovos com sal em um bowl',
        'Aqueça a frigideira com manteiga',
        'Despeje os ovos e espalhe bem',
        'Adicione queijo e tomate picado',
        'Dobre ao meio e sirva'
      ],
      foto: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400',
    },
  ],
=======
  // Mercados de exemplo
  mercados: [
    { 
      id: '1', 
      nome: 'Super Exemplo', 
      end: 'Rua das Flores, 123', 
      dist: '500m', 
      promo: true,
      foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400'
    },
    { 
      id: '2', 
      nome: 'Mercado Bom Preço', 
      end: 'Av. Principal, 456', 
      dist: '1.2km', 
      promo: false,
      foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400'
    },
    { 
      id: '3', 
      nome: 'Atacadão Central', 
      end: 'Av. Central, 789', 
      dist: '2.5km', 
      promo: true,
      foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=400'
    },
  ],

  // Produtos em promoção
  produtosPromocao: [
    {
      id: '1',
      nome: 'Pão Francês',
      precoAntigo: 'R$ 15,00/kg',
      precoNovo: 'R$ 10,99/kg',
      foto: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200'
    },
    {
      id: '2',
      nome: 'Leite Integral 1L',
      precoAntigo: 'R$ 5,99',
      precoNovo: 'R$ 4,49',
      foto: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200'
    },
    {
      id: '3',
      nome: 'Banana Prata',
      precoAntigo: 'R$ 6,50/kg',
      precoNovo: 'R$ 4,99/kg',
      foto: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200'
    },
  ],

  // Horário de funcionamento
  horarioFuncionamento: {
    semana: 'Seg a Sáb: 7h às 22h',
    domingo: 'Domingo: 8h às 20h'
  },

  // Avaliação
  avaliacao: {
    nota: 4,
    total: 5,
    quantidade: 250
  }
};

// ==================== CONQUISTAS ====================
export const calcularConquistas = (todasListas) => {
  const concluidas = todasListas.filter(l => l.concluida);
  const ativas = todasListas.filter(l => !l.concluida);

  return [
    {
      id: 1,
      nome: '🎉 Primeira Lista',
      descricao: 'Criou sua primeira lista',
      icone: '🎉',
      conquistado: todasListas.length >= 1,
      progresso: Math.min(todasListas.length, 1),
      meta: 1,
    },
    {
      id: 2,
      nome: '✅ Comprador Iniciante',
      descricao: 'Complete 1 lista de compras',
      icone: '✅',
      conquistado: concluidas.length >= 1,
      progresso: Math.min(concluidas.length, 1),
      meta: 1,
    },
    {
      id: 3,
      nome: '🏆 Comprador Experiente',
      descricao: 'Complete 5 listas',
      icone: '🏆',
      conquistado: concluidas.length >= 5,
      progresso: Math.min(concluidas.length, 5),
      meta: 5,
    },
    {
      id: 4,
      nome: '💎 Mestre das Compras',
      descricao: 'Complete 10 listas',
      icone: '💎',
      conquistado: concluidas.length >= 10,
      progresso: Math.min(concluidas.length, 10),
      meta: 10,
    },
    {
      id: 5,
      nome: '📋 Organizador',
      descricao: 'Tenha 3 listas ativas',
      icone: '📋',
      conquistado: ativas.length >= 3,
      progresso: Math.min(ativas.length, 3),
      meta: 3,
    },
  ];
=======
  vibrarCurto() {
    Vibration.vibrate(30);
  },

  vibrarSucesso() {
    Vibration.vibrate([0, 50, 100, 50]);
  },

  confirmarExclusao(titulo, mensagem, aoConfirmar) {
    Alert.alert(titulo, mensagem, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          this.vibrarCurto();
          aoConfirmar();
        },
      },
    ]);
  },

  mostrarSucesso(titulo, mensagem, aoFechar) {
    this.vibrarSucesso();
    Alert.alert(titulo, mensagem, [{ text: 'OK', onPress: aoFechar }]);
  },

  mostrarErro(mensagem) {
    Alert.alert('Erro', mensagem);
  },
};

// ==================== CÁLCULOS ====================
export const calculos = {
  calcularProgresso(itens) {
    const total = itens.length;
    const concluidos = itens.filter(item => item.marcado).length;
    return total > 0 ? (concluidos / total) * 100 : 0;
  },

  formatarData(dataISO) {
    return new Date(dataISO).toLocaleDateString('pt-BR');
  },

  gerarId() {
    return Date.now().toString();
  },
>>>>>>> 22a61768673c58df3bf28a94baab7eb52948f5fa
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
};