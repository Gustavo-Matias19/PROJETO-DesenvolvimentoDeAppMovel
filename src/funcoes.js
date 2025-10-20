import AsyncStorage from '@react-native-async-storage/async-storage';
import { Vibration, Platform } from 'react-native';

const CHAVE = '@compras_app:listas';

// ==================== ARMAZENAMENTO ====================
export const armazenamento = {
  // Obter todas as listas
  async obterTodas() {
    try {
      const json = await AsyncStorage.getItem(CHAVE);
      return json ? JSON.parse(json) : [];
    } catch (erro) {
      console.error('Erro ao obter:', erro);
      return [];
    }
  },

  // Salvar array de listas
  async salvar(listas) {
    try {
      await AsyncStorage.setItem(CHAVE, JSON.stringify(listas));
      return true;
    } catch (erro) {
      console.error('Erro ao salvar:', erro);
      return false;
    }
  },

  // Obter apenas listas ativas
  async obterAtivas() {
    const todas = await this.obterTodas();
    return todas.filter(lista => !lista.concluida);
  },

  // Obter apenas listas concluídas
  async obterConcluidas() {
    const todas = await this.obterTodas();
    return todas.filter(lista => lista.concluida);
  },

  // Obter lista específica por ID
  async obterPorId(id) {
    const todas = await this.obterTodas();
    return todas.find(lista => lista.id === id);
  },

  // Adicionar nova lista
  async adicionar(novaLista) {
    const todas = await this.obterTodas();
    todas.push(novaLista);
    return await this.salvar(todas);
  },

  // Atualizar lista existente
  async atualizar(id, listaAtualizada) {
    const todas = await this.obterTodas();
    const indice = todas.findIndex(lista => lista.id === id);
    
    if (indice >= 0) {
      todas[indice] = listaAtualizada;
      return await this.salvar(todas);
    }
    return false;
  },

  // Excluir lista
  async excluir(id) {
    const todas = await this.obterTodas();
    const novas = todas.filter(lista => lista.id !== id);
    return await this.salvar(novas);
  },

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
};

// ==================== FEEDBACK ====================
export const feedback = {
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
};

// ==================== UTILITÁRIOS ====================
export const utils = {
  // Gerar ID único
  gerarId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  },

  // Formatar data ISO para PT-BR
  formatarData(dataISO) {
    try {
      const data = new Date(dataISO);
      return data.toLocaleDateString('pt-BR');
    } catch (erro) {
      return 'Data inválida';
    }
  },

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
  }
};

// ==================== DADOS MOCKADOS ====================
export const dadosMock = {
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
};