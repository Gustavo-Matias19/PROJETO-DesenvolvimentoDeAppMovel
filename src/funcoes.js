import AsyncStorage from '@react-native-async-storage/async-storage';
import { Vibration, Platform } from 'react-native';

const CHAVE = '@compras_app:listas';

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
  async obterTodas() {
    try {
      const json = await AsyncStorage.getItem(CHAVE);
      return json ? JSON.parse(json) : [];
    } catch (erro) {
      console.error('Erro ao obter:', erro);
      return [];
    }
  },

  async salvar(listas) {
    try {
      await AsyncStorage.setItem(CHAVE, JSON.stringify(listas));
      return true;
    } catch (erro) {
      console.error('Erro ao salvar:', erro);
      return false;
    }
  },

  async obterAtivas() {
    const todas = await this.obterTodas();
    return todas.filter(lista => !lista.concluida);
  },

  async obterConcluidas() {
    const todas = await this.obterTodas();
    return todas.filter(lista => lista.concluida);
  },

  async obterPorId(id) {
    const todas = await this.obterTodas();
    return todas.find(lista => lista.id === id);
  },

  async adicionar(novaLista) {
    const todas = await this.obterTodas();
    todas.push(novaLista);
    return await this.salvar(todas);
  },

  async atualizar(id, listaAtualizada) {
    const todas = await this.obterTodas();
    const indice = todas.findIndex(lista => lista.id === id);

    if (indice >= 0) {
      todas[indice] = listaAtualizada;
      return await this.salvar(todas);
    }
    return false;
  },

  async excluir(id) {
    const todas = await this.obterTodas();
    const novas = todas.filter(lista => lista.id !== id);
    return await this.salvar(novas);
  },
};

// ==================== UTILITÁRIOS ====================
export const utils = {
  gerarId() {
    return Date.now().toString() + Math.random().toString(36).slice(2, 9);
  },

  formatarData(dataISO) {
    try {
      const data = new Date(dataISO);
      return data.toLocaleDateString('pt-BR');
    } catch {
      return 'Data inválida';
    }
  },

  calcularProgresso(itens) {
    if (!itens || itens.length === 0) return 0;
    const marcados = itens.filter(i => i.marcado).length;
    return (marcados / itens.length) * 100;
  },

  contarMarcados(itens) {
    if (!itens) return 0;
    return itens.filter(i => i.marcado).length;
  }
};

// ==================== DADOS MOCKADOS ====================
export const dadosMock = {
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
};