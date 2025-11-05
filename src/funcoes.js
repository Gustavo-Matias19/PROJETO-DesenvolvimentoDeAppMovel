import AsyncStorage from '@react-native-async-storage/async-storage';
import { Vibration, Platform } from 'react-native';

// ==================== CONSTANTES E CONFIGURAÇÃO ====================
const CHAVE_ARMAZENAMENTO = '@compras_app:listas';
const CHAVE_HISTORICO = '@compras_app:historico_buscas';
const EH_WEB = Platform.OS === 'web';

// ==================== TRATAMENTO DE ERROS ====================
const tratarErro = (erro, operacao) => {
  console.error(`[ERRO_ARMAZENAMENTO] ${operacao}:`, erro);
  return operacao.includes('obter') ? [] : false;
};

// ==================== FEEDBACK (VIBRAÇÃO) ====================
export const feedback = {
  vibrar(padrao) {
    if (!EH_WEB) {
      try {
        Vibration.vibrate(padrao);
      } catch (e) {
        console.warn('Vibração não suportada:', e);
      }
    }
  },
  vibrarCurto: () => feedback.vibrar(30),
  vibrarMedio: () => feedback.vibrar(50),
  vibrarSucesso: () => feedback.vibrar([0, 50, 100, 50]),
  vibrarAlerta: () => feedback.vibrar([0, 100, 50, 100]),
};

// ==================== ARMAZENAMENTO (ASYNCSTORAGE) ====================
export const armazenamento = {
  async obterTodas() {
    try {
      const json = await AsyncStorage.getItem(CHAVE_ARMAZENAMENTO);
      return json ? JSON.parse(json) : [];
    } catch (erro) {
      return tratarErro(erro, 'obter todas');
    }
  },

  async salvarTodas(listas) {
    try {
      await AsyncStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(listas));
      return true;
    } catch (erro) {
      return tratarErro(erro, 'salvar todas');
    }
  },

  async obterAtivas() {
    const todas = await armazenamento.obterTodas();
    return todas.filter(lista => !lista.concluida);
  },

  async obterConcluidas() {
    const todas = await armazenamento.obterTodas();
    return todas.filter(lista => lista.concluida);
  },

  async obterPorId(id) {
    const todas = await armazenamento.obterTodas();
    return todas.find(lista => lista.id === id) || null;
  },

  async adicionar(novaLista) {
    const todas = await armazenamento.obterTodas();
    todas.unshift(novaLista); // Adiciona no início
    return await armazenamento.salvarTodas(todas);
  },

  async atualizar(id, listaAtualizada) {
    const todas = await armazenamento.obterTodas();
    const indice = todas.findIndex(lista => lista.id === id);

    if (indice >= 0) {
      todas[indice] = { ...todas[indice], ...listaAtualizada };
      return await armazenamento.salvarTodas(todas);
    }
    return false;
  },

  async excluir(id) {
    const todas = await armazenamento.obterTodas();
    const novas = todas.filter(lista => lista.id !== id);
    return await armazenamento.salvarTodas(novas);
  },

  // Métodos para histórico de busca
  async obterHistorico() {
    try {
      const json = await AsyncStorage.getItem(CHAVE_HISTORICO);
      return json ? JSON.parse(json) : [];
    } catch (erro) {
      return tratarErro(erro, 'obter histórico');
    }
  },

  async salvarHistorico(historico) {
    try {
      await AsyncStorage.setItem(CHAVE_HISTORICO, JSON.stringify(historico));
      return true;
    } catch (erro) {
      return tratarErro(erro, 'salvar histórico');
    }
  },

  async limparHistorico() {
    try {
      await AsyncStorage.removeItem(CHAVE_HISTORICO);
      return true;
    } catch (erro) {
      return tratarErro(erro, 'limpar histórico');
    }
  }
};

// ==================== UTILITÁRIOS GERAIS ====================
export const utils = {
  gerarId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  },

  formatarData(dataISO) {
    try {
      const data = new Date(dataISO);
      if (isNaN(data.getTime())) return 'Data inválida';
      
      const opcoes = { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      
      return data.toLocaleDateString('pt-BR', opcoes);
    } catch {
      return 'Data inválida';
    }
  },

  formatarDataCurta(dataISO) {
    try {
      const data = new Date(dataISO);
      if (isNaN(data.getTime())) return 'Inválida';
      return data.toLocaleDateString('pt-BR');
    } catch {
      return 'Inválida';
    }
  },

  calcularProgresso(itens) {
    if (!itens || itens.length === 0) return 0;
    const marcados = itens.filter(i => i.marcado).length;
    return Math.round((marcados / itens.length) * 100);
  },

  contarMarcados(itens) {
    return itens ? itens.filter(i => i.marcado).length : 0;
  },

  normalizarTexto(texto) {
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  },

  formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  },

  calcularEconomia(precos) {
    if (!precos || precos.length < 2) return 0;
    const valores = precos.map(p => parseFloat(p.preco));
    return Math.max(...valores) - Math.min(...valores);
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
      porcoes: '2-3 pessoas',
      ingredientes: [
        'Macarrão 500g',
        'Alho 6 dentes',
        'Azeite 100ml',
        'Sal a gosto',
        'Pimenta do reino a gosto',
        'Queijo parmesão ralado (opcional)'
      ],
      modo: [
        'Cozinhe o macarrão em água fervente com sal por 10 minutos até ficar al dente',
        'Enquanto isso, pique o alho em lâminas finas',
        'Em uma frigideira, aqueça o azeite e refogue o alho até dourar levemente',
        'Escorra o macarrão reservando um pouco da água do cozimento',
        'Misture o macarrão com o alho e adicione água do cozimento se necessário',
        'Tempere com pimenta do reino e finalize com queijo parmesão'
      ],
      foto: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
    },
    {
      id: '2',
      nome: '🍲 Arroz com Feijão Completo',
      tempo: '40 min',
      dificuldade: 'Médio',
      porcoes: '4 pessoas',
      ingredientes: [
        'Arroz 2 xícaras',
        'Feijão 1 xícara',
        'Alho 4 dentes',
        'Cebola 1 unidade',
        'Óleo 3 colheres',
        'Sal a gosto',
        'Louro 2 folhas'
      ],
      modo: [
        'Deixe o feijão de molho por pelo menos 2 horas',
        'Cozinhe o feijão na panela de pressão com água e louro por 20 minutos',
        'Para o arroz: refogue alho e cebola picados no óleo',
        'Adicione o arroz e refogue por 2 minutos',
        'Adicione água (2x a medida do arroz) e deixe cozinhar em fogo baixo',
        'Tempere o feijão cozido com alho, cebola e sal, refogando novamente'
      ],
      foto: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
    },
    {
      id: '3',
      nome: '🥗 Salada Caesar',
      tempo: '10 min',
      dificuldade: 'Fácil',
      porcoes: '2 pessoas',
      ingredientes: [
        'Alface romana 1 maço',
        'Peito de frango 200g',
        'Queijo parmesão 50g',
        'Molho Caesar 100ml',
        'Croutons 1 xícara',
        'Limão (opcional)'
      ],
      modo: [
        'Lave bem a alface e corte em pedaços médios',
        'Tempere e grelhe o frango, depois corte em cubos',
        'Monte a salada com alface, frango e croutons em uma tigela',
        'Regue generosamente com molho Caesar',
        'Finalize com parmesão ralado na hora',
        'Sirva imediatamente para manter a crocância'
      ],
      foto: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
    },
    {
      id: '4',
      nome: '🍳 Omelete Caprichado',
      tempo: '8 min',
      dificuldade: 'Fácil',
      porcoes: '1 pessoa',
      ingredientes: [
        'Ovos 3 unidades',
        'Queijo muçarela 50g',
        'Tomate 1 unidade',
        'Sal a gosto',
        'Manteiga 1 colher',
        'Orégano a gosto'
      ],
      modo: [
        'Bata os ovos com sal em um bowl até ficarem homogêneos',
        'Aqueça a frigideira antiaderente com manteiga',
        'Despeje os ovos e espalhe bem pela frigideira',
        'Adicione queijo e tomate picado em uma metade',
        'Quando começar a firmar, dobre ao meio',
        'Sirva quente polvilhado com orégano'
      ],
      foto: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400',
    },
  ],
};

// ==================== PRODUTOS E PREÇOS ====================
export const PRODUTOS_MERCADOS = [
  {
    nome: 'Arroz',
    categoria: 'Grãos',
    unidade: 'kg',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 4.99, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão', preco: 4.50, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 5.20, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Feijão',
    categoria: 'Grãos',
    unidade: 'kg',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 7.99, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão', preco: 7.20, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 8.50, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Macarrão',
    categoria: 'Massas',
    unidade: 'pacote',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 3.50, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão', preco: 2.99, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 3.80, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Açúcar',
    categoria: 'Condimentos',
    unidade: 'kg',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 3.20, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão', preco: 2.80, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 3.50, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Café',
    categoria: 'Bebidas',
    unidade: 'pacote',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 8.50, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão', preco: 7.99, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 9.20, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Leite',
    categoria: 'Laticínios',
    unidade: 'litro',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 4.80, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão', preco: 4.20, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 5.10, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Óleo',
    categoria: 'Condimentos',
    unidade: 'litro',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 6.50, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão', preco: 5.99, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 6.80, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Sal',
    categoria: 'Condimentos',
    unidade: 'kg',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 1.80, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão', preco: 1.50, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 2.00, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Pão',
    categoria: 'Padaria',
    unidade: 'kg',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 8.50, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão', preco: 7.80, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 9.00, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Manteiga',
    categoria: 'Laticínios',
    unidade: 'unidade',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 12.50, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão', preco: 11.80, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 13.20, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Queijo',
    categoria: 'Laticínios',
    unidade: 'kg',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 18.90, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão', preco: 17.50, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 19.80, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Frango',
    categoria: 'Carnes',
    unidade: 'kg',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 14.90, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão', preco: 13.50, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 15.80, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Carne',
    categoria: 'Carnes',
    unidade: 'kg',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 32.90, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão', preco: 29.80, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 34.50, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Tomate',
    categoria: 'Hortifruti',
    unidade: 'kg',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 5.50, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão', preco: 4.80, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 6.20, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Cebola',
    categoria: 'Hortifruti',
    unidade: 'kg',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 4.20, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão', preco: 3.80, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 4.60, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Alho',
    categoria: 'Hortifruti',
    unidade: 'kg',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 28.90, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão', preco: 26.50, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 30.80, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Batata',
    categoria: 'Hortifruti',
    unidade: 'kg',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 4.90, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão', preco: 4.20, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 5.50, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Banana',
    categoria: 'Frutas',
    unidade: 'kg',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 5.80, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão', preco: 4.99, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 6.50, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Maçã',
    categoria: 'Frutas',
    unidade: 'kg',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 7.90, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão', preco: 6.80, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 8.50, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  }
];

// ==================== FUNÇÕES DE BUSCA ====================
export const buscarProduto = (termoBusca) => {
  if (!termoBusca || termoBusca.trim() === '') return null;
  
  const termoNormalizado = utils.normalizarTexto(termoBusca);
  
  const produtoEncontrado = PRODUTOS_MERCADOS.find(produto => {
    const nomeNormalizado = utils.normalizarTexto(produto.nome);
    return nomeNormalizado.includes(termoNormalizado) || 
           termoNormalizado.includes(nomeNormalizado);
  });
  
  if (!produtoEncontrado) return null;
  
  const precosOrdenados = [...produtoEncontrado.precos]
    .map((item, index) => ({
      ...item,
      id: utils.gerarId(),
      indice: index
    }))
    .sort((a, b) => parseFloat(a.preco) - parseFloat(b.preco));
  
  return {
    produto: produtoEncontrado.nome,
    categoria: produtoEncontrado.categoria,
    unidade: produtoEncontrado.unidade,
    precos: precosOrdenados
  };
};

export const obterTodosProdutos = () => {
  return PRODUTOS_MERCADOS.map(p => p.nome).sort();
};

export const buscarPorCategoria = (categoria) => {
  return PRODUTOS_MERCADOS.filter(p => p.categoria === categoria);
};

export const obterCategorias = () => {
  const categorias = [...new Set(PRODUTOS_MERCADOS.map(p => p.categoria))];
  return categorias.sort();
};

// ==================== AUTENTICAÇÃO E USUÁRIOS ====================
const CHAVE_USUARIOS = '@compras_app:usuarios';
const CHAVE_USUARIO_LOGADO = '@compras_app:usuario_logado';

export const armazenamentoAuth = {
  // Usuários
  async obterUsuarios() {
    try {
      const json = await AsyncStorage.getItem(CHAVE_USUARIOS);
      return json ? JSON.parse(json) : [];
    } catch (erro) {
      return tratarErro(erro, 'obter usuários');
    }
  },

  async salvarUsuarios(usuarios) {
    try {
      await AsyncStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuarios));
      return true;
    } catch (erro) {
      return tratarErro(erro, 'salvar usuários');
    }
  },

  async adicionarUsuario(novoUsuario) {
    const usuarios = await armazenamentoAuth.obterUsuarios();
    usuarios.push(novoUsuario);
    return await armazenamentoAuth.salvarUsuarios(usuarios);
  },

  // Usuário logado
  async obterUsuarioLogado() {
    try {
      const json = await AsyncStorage.getItem(CHAVE_USUARIO_LOGADO);
      return json ? JSON.parse(json) : null;
    } catch (erro) {
      return null;
    }
  },

  async salvarUsuarioLogado(usuario) {
    try {
      await AsyncStorage.setItem(CHAVE_USUARIO_LOGADO, JSON.stringify(usuario));
      return true;
    } catch (erro) {
      return false;
    }
  },

  async limparUsuarioLogado() {
    try {
      await AsyncStorage.removeItem(CHAVE_USUARIO_LOGADO);
      return true;
    } catch (erro) {
      return false;
    }
  }
};

// Adiciona métodos de autenticação ao armazenamento principal
armazenamento.obterUsuarios = armazenamentoAuth.obterUsuarios;
armazenamento.salvarUsuarios = armazenamentoAuth.salvarUsuarios;
armazenamento.adicionarUsuario = armazenamentoAuth.adicionarUsuario;
armazenamento.obterUsuarioLogado = armazenamentoAuth.obterUsuarioLogado;
armazenamento.salvarUsuarioLogado = armazenamentoAuth.salvarUsuarioLogado;
armazenamento.limparUsuarioLogado = armazenamentoAuth.limparUsuarioLogado;

// ==================== RECEITAS CUSTOMIZADAS (ADMIN) ====================
const CHAVE_RECEITAS_CUSTOM = '@compras_app:receitas_custom';

armazenamento.obterReceitasCustom = async () => {
  try {
    const json = await AsyncStorage.getItem(CHAVE_RECEITAS_CUSTOM);
    return json ? JSON.parse(json) : [];
  } catch (erro) {
    return tratarErro(erro, 'obter receitas custom');
  }
};

armazenamento.salvarReceitasCustom = async (receitas) => {
  try {
    await AsyncStorage.setItem(CHAVE_RECEITAS_CUSTOM, JSON.stringify(receitas));
    return true;
  } catch (erro) {
    return tratarErro(erro, 'salvar receitas custom');
  }
};

armazenamento.adicionarReceita = async (receita) => {
  const receitas = await armazenamento.obterReceitasCustom();
  receitas.push(receita);
  return await armazenamento.salvarReceitasCustom(receitas);
};

armazenamento.excluirReceita = async (id) => {
  const receitas = await armazenamento.obterReceitasCustom();
  const novas = receitas.filter(r => r.id !== id);
  return await armazenamento.salvarReceitasCustom(novas);
};

// Função para obter TODAS as receitas (mock + custom)
export const obterTodasReceitas = async () => {
  const custom = await armazenamento.obterReceitasCustom();
  return [...dadosMock.receitas, ...custom];
};

// ==================== PRODUTOS CUSTOMIZADOS (ADMIN) ====================
const CHAVE_PRODUTOS_CUSTOM = '@compras_app:produtos_custom';

armazenamento.obterProdutosCustom = async () => {
  try {
    const json = await AsyncStorage.getItem(CHAVE_PRODUTOS_CUSTOM);
    return json ? JSON.parse(json) : [];
  } catch (erro) {
    return tratarErro(erro, 'obter produtos custom');
  }
};

armazenamento.salvarProdutosCustom = async (produtos) => {
  try {
    await AsyncStorage.setItem(CHAVE_PRODUTOS_CUSTOM, JSON.stringify(produtos));
    return true;
  } catch (erro) {
    return tratarErro(erro, 'salvar produtos custom');
  }
};

armazenamento.adicionarProduto = async (produto) => {
  const produtos = await armazenamento.obterProdutosCustom();
  produtos.push(produto);
  return await armazenamento.salvarProdutosCustom(produtos);
};

armazenamento.excluirProduto = async (id) => {
  const produtos = await armazenamento.obterProdutosCustom();
  const novos = produtos.filter(p => p.id !== id);
  return await armazenamento.salvarProdutosCustom(novos);
};

// Função para obter TODOS os produtos (mock + custom)
export const obterTodosProdutosCompleto = async () => {
  const custom = await armazenamento.obterProdutosCustom();
  return [...PRODUTOS_MERCADOS, ...custom];
};