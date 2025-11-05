import AsyncStorage from '@react-native-async-storage/async-storage';
import { Vibration, Platform } from 'react-native';

// ==================== CONSTANTES E CONFIGURAÇÃO ====================
const CHAVE_ARMAZENAMENTO = '@compras_app:listas';
const EH_WEB = Platform.OS === 'web';

// ==================== AJUSTE DE ERROS ====================
/**
 * Trata e registra erros de armazenamento, retornando um valor seguro.
 * @param {Error} erro - O objeto de erro.
 * @param {string} operacao - Nome da operação que falhou.
 * @returns {any} Retorna [] para leitura ou false para escrita.
 */
const tratarErro = (erro, operacao) => {
  console.error(`[ERRO_ARMAZENAMENTO] Falha ao ${operacao}:`, erro);
  return operacao.startsWith('obter') ? [] : false;
};

// ==================== FEEDBACK (VIBRAÇÃO) ====================
export const feedback = {
  /**
   * Vibra o dispositivo com um padrão específico, se não for web.
   * @param {number | number[]} padrao - O padrão de vibração.
   */
  vibrar(padrao) {
    if (!EH_WEB) {
      Vibration.vibrate(padrao);
    }
  },

  vibrarCurto: () => feedback.vibrar(30),
  vibrarMedio: () => feedback.vibrar(50),
  vibrarSucesso: () => feedback.vibrar([0, 50, 100, 50]),
  vibrarAlerta: () => feedback.vibrar([0, 100, 50, 100]),
};

// ==================== ARMAZENAMENTO (ASYNCSTORAGE) ====================
export const armazenamento = {
  /**
   * Obtém todas as listas salvas.
   * @returns {Promise<Object[]>}
   */
  async obterTodas() {
    try {
      const json = await AsyncStorage.getItem(CHAVE_ARMAZENAMENTO);
      return json ? JSON.parse(json) : [];
    } catch (erro) {
      return tratarErro(erro, 'obter todas');
    }
  },

  /**
   * Salva o array completo de listas.
   * @param {Object[]} listas - Array de listas a ser salvo.
   * @returns {Promise<boolean>}
   */
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
    return todas.find(lista => lista.id === id);
  },

  async adicionar(novaLista) {
    const todas = await armazenamento.obterTodas();
    todas.push(novaLista);
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
};

// ==================== UTILITÁRIOS GERAIS ====================
export const utils = {
  /** Gera um ID alfanumérico único. */
  gerarId() {
    return Date.now().toString() + Math.random().toString(36).slice(2, 9);
  },

  /** Formata uma data ISO para o padrão 'pt-BR'. */
  formatarData(dataISO) {
    try {
      const data = new Date(dataISO);
      if (isNaN(data.getTime())) return 'Data inválida';
      return data.toLocaleDateString('pt-BR');
    } catch {
      return 'Data inválida';
    }
  },

  /** Calcula a porcentagem de itens marcados (progresso). */
  calcularProgresso(itens) {
    if (!itens || itens.length === 0) return 0;
    const marcados = itens.filter(i => i.marcado).length;
    return (marcados / itens.length) * 100;
  },

  /** Conta o número de itens marcados. */
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

// ==================== ARRAY DE PRODUTOS COM PREÇOS ====================
export const PRODUTOS_MERCADOS = [
  {
    nome: 'Arroz',
    categoria: 'Grãos',
    precos: [
      { mercado: 'Supermercado Extra', preco: 4.99, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 4.50, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supermercado Assai', preco: 5.20, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Feijão',
    categoria: 'Grãos',
    precos: [
      { mercado: 'Supermercado Extra', preco: 7.99, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 7.20, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supermercado Assai', preco: 8.50, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Macarrão',
    categoria: 'Massas',
    precos: [
      { mercado: 'Supermercado Extra', preco: 3.50, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 2.99, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supermercado Assai', preco: 3.80, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Açúcar',
    categoria: 'Condimentos',
    precos: [
      { mercado: 'Supermercado Extra', preco: 3.20, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 2.80, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supermercado Assai', preco: 3.50, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Café',
    categoria: 'Bebidas',
    precos: [
      { mercado: 'Supermercado Extra', preco: 8.50, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 7.99, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supermercado Assai', preco: 9.20, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Leite',
    categoria: 'Laticínios',
    precos: [
      { mercado: 'Supermercado Extra', preco: 4.80, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 4.20, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supermercado Assai', preco: 5.10, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Óleo',
    categoria: 'Condimentos',
    precos: [
      { mercado: 'Supermercado Extra', preco: 6.50, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 5.99, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supermercado Assai', preco: 6.80, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Farinha',
    categoria: 'Grãos',
    precos: [
      { mercado: 'Supermercado Extra', preco: 4.20, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 3.80, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supermercado Assai', preco: 4.50, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Sal',
    categoria: 'Condimentos',
    precos: [
      { mercado: 'Supermercado Extra', preco: 1.80, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 1.50, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supermercado Assai', preco: 2.00, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Pão',
    categoria: 'Padaria',
    precos: [
      { mercado: 'Supermercado Extra', preco: 8.50, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 7.80, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supermercado Assai', preco: 9.00, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Manteiga',
    categoria: 'Laticínios',
    precos: [
      { mercado: 'Supermercado Extra', preco: 12.50, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 11.80, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supermercado Assai', preco: 13.20, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Queijo',
    categoria: 'Laticínios',
    precos: [
      { mercado: 'Supermercado Extra', preco: 18.90, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 17.50, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supermercado Assai', preco: 19.80, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Frango',
    categoria: 'Carnes',
    precos: [
      { mercado: 'Supermercado Extra', preco: 14.90, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 13.50, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supermercado Assai', preco: 15.80, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Carne',
    categoria: 'Carnes',
    precos: [
      { mercado: 'Supermercado Extra', preco: 32.90, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 29.80, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supermercado Assai', preco: 34.50, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Tomate',
    categoria: 'Hortifruti',
    precos: [
      { mercado: 'Supermercado Extra', preco: 5.50, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 4.80, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supermercado Assai', preco: 6.20, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Cebola',
    categoria: 'Hortifruti',
    precos: [
      { mercado: 'Supermercado Extra', preco: 4.20, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 3.80, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supermercado Assai', preco: 4.60, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Alho',
    categoria: 'Hortifruti',
    precos: [
      { mercado: 'Supermercado Extra', preco: 28.90, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 26.50, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supermercado Assai', preco: 30.80, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Batata',
    categoria: 'Hortifruti',
    precos: [
      { mercado: 'Supermercado Extra', preco: 4.90, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 4.20, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supermercado Assai', preco: 5.50, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Banana',
    categoria: 'Frutas',
    precos: [
      { mercado: 'Supermercado Extra', preco: 5.80, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 4.99, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supermercado Assai', preco: 6.50, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Maçã',
    categoria: 'Frutas',
    precos: [
      { mercado: 'Supermercado Extra', preco: 7.90, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 6.80, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supermercado Assai', preco: 8.50, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  }
];

// ==================== FUNÇÃO DE BUSCA DE PRODUTOS ====================
/**
 * Busca um produto no array e retorna os preços ordenados do menor para o maior
 * @param {string} termoBusca - Nome do produto a buscar
 * @returns {Object|null} - Objeto com produto, categoria e preços ordenados ou null
 */
export const buscarProduto = (termoBusca) => {
  if (!termoBusca || termoBusca.trim() === '') return null;
  
  // Normaliza o termo (remove acentos, lowercase)
  const termoNormalizado = termoBusca
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  
  // Busca o produto
  const produtoEncontrado = PRODUTOS_MERCADOS.find(produto => {
    const nomeNormalizado = produto.nome
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    
    return nomeNormalizado.includes(termoNormalizado);
  });
  
  if (!produtoEncontrado) return null;
  
  // Retorna os preços ordenados do MENOR para o MAIOR
  const precosOrdenados = [...produtoEncontrado.precos]
    .map((item, index) => ({
      ...item,
      id: `${index + 1}`,
    }))
    .sort((a, b) => parseFloat(a.preco) - parseFloat(b.preco));
  
  return {
    produto: produtoEncontrado.nome,
    categoria: produtoEncontrado.categoria,
    precos: precosOrdenados
  };
};

/**
 * Retorna lista de todos os produtos disponíveis
 * @returns {Array} - Array com nomes dos produtos
 */
export const obterTodosProdutos = () => {
  return PRODUTOS_MERCADOS.map(p => p.nome);
};