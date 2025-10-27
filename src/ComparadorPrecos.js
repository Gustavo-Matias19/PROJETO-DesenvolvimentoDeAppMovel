import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

// ==================== CORES ====================
const CORES = {
  primaria: '#4CAF50',
  perigo: '#f44336',
  branco: '#FFFFFF',
  fundoClaro: '#f5f5f5',
  cinzaClaro: '#e0e0e0',
  cinzaMedio: '#999999',
  textoEscuro: '#333333',
  textoMedio: '#666666',
  textoClaro: '#999999',
  borda: '#dddddd',
};

// ==================== ARRAY DE PRODUTOS ====================
const PRODUTOS_MERCADOS = [
  {
    nome: 'Arroz',
    categoria: 'Grãos',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 4.99, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão ', preco: 4.50, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 5.20, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Feijão',
    categoria: 'Grãos',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 7.99, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão ', preco: 7.20, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 8.50, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Macarrão',
    categoria: 'Massas',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 3.50, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão ', preco: 2.99, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 3.80, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Açúcar',
    categoria: 'Condimentos',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 3.20, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão ', preco: 2.80, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 3.50, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Café',
    categoria: 'Bebidas',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 8.50, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão ', preco: 7.99, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 9.20, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Leite',
    categoria: 'Laticínios',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 4.80, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão ', preco: 4.20, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 5.10, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Óleo',
    categoria: 'Condimentos',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 6.50, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão ', preco: 5.99, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 6.80, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Sal',
    categoria: 'Condimentos',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 1.80, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão ', preco: 1.50, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 2.00, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Pão',
    categoria: 'Padaria',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 8.50, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão ', preco: 7.80, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 9.00, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Manteiga',
    categoria: 'Laticínios',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 12.50, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão ', preco: 11.80, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 13.20, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Queijo',
    categoria: 'Laticínios',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 18.90, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão ', preco: 17.50, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 19.80, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Frango',
    categoria: 'Carnes',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 14.90, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão ', preco: 13.50, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 15.80, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Carne',
    categoria: 'Carnes',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 32.90, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão ', preco: 29.80, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 34.50, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Tomate',
    categoria: 'Hortifruti',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 5.50, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão ', preco: 4.80, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 6.20, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Cebola',
    categoria: 'Hortifruti',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 4.20, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão ', preco: 3.80, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 4.60, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Alho',
    categoria: 'Hortifruti',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 28.90, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão ', preco: 26.50, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 30.80, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Batata',
    categoria: 'Hortifruti',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 4.90, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão ', preco: 4.20, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 5.50, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Banana',
    categoria: 'Frutas',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 5.80, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão ', preco: 4.99, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 6.50, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Maçã',
    categoria: 'Frutas',
    precos: [
      { mercado: 'Supermercado Carrefour', preco: 7.90, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Atacadão ', preco: 6.80, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Mercado Assai', preco: 8.50, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  }
];

// ==================== FUNÇÃO DE BUSCA ====================
const buscarProduto = (termoBusca) => {
  if (!termoBusca || termoBusca.trim() === '') return null;
  
  const termoNormalizado = termoBusca
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  
  const produtoEncontrado = PRODUTOS_MERCADOS.find(produto => {
    const nomeNormalizado = produto.nome
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    
    return nomeNormalizado.includes(termoNormalizado);
  });
  
  if (!produtoEncontrado) return null;
  
  // Ordena do MENOR para o MAIOR preço
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

const obterTodosProdutos = () => {
  return PRODUTOS_MERCADOS.map(p => p.nome);
};

// ==================== COMPONENTE PRINCIPAL ====================
export default function ComparadorPrecos() {
  const [itemBusca, setItemBusca] = useState('');
  const [resultados, setResultados] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [produtoNome, setProdutoNome] = useState('');
  const [naoEncontrado, setNaoEncontrado] = useState(false);
  const [mostrarTodosProdutos, setMostrarTodosProdutos] = useState(false);

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

    salvarHistorico(itemBusca.trim());

    const resultado = buscarProduto(itemBusca);

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
  };

  const selecionarProduto = (nomeProduto) => {
    setItemBusca(nomeProduto);
    setMostrarTodosProdutos(false);
    setTimeout(() => {
      const resultado = buscarProduto(nomeProduto);
      if (resultado) {
        setProdutoNome(resultado.produto);
        setResultados(resultado.precos);
        salvarHistorico(nomeProduto);
      }
    }, 100);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.conteudo}>
        {/* CABEÇALHO */}
        <View style={styles.linhaIcone}>
          <MaterialIcons name="compare-arrows" size={28} color={CORES.primaria} />
          <Text style={styles.titulo}>Comparador de Preços</Text>
        </View>

        <Text style={styles.subtitulo}>Compare preços em mercados próximos</Text>

        {/* CAMPO DE BUSCA */}
        <View style={styles.containerBusca}>
          <TextInput
            style={styles.input}
            placeholder="Digite o produto (ex: Arroz)"
            value={itemBusca}
            onChangeText={setItemBusca}
            onSubmitEditing={buscarPrecos}
          />
          <TouchableOpacity style={styles.botaoBuscar} onPress={buscarPrecos}>
            <MaterialIcons name="search" size={24} color={CORES.branco} />
          </TouchableOpacity>
        </View>

        {/* BOTÃO VER TODOS OS PRODUTOS */}
        <TouchableOpacity
          style={styles.botaoVerTodos}
          onPress={() => {
            setMostrarTodosProdutos(!mostrarTodosProdutos);
            setResultados([]);
            setNaoEncontrado(false);
          }}
        >
          <MaterialIcons 
            name={mostrarTodosProdutos ? "close" : "list"} 
            size={20} 
            color={CORES.branco} 
          />
          <Text style={styles.textoBotaoVerTodos}>
            {mostrarTodosProdutos ? 'Fechar Lista' : 'Ver Todos os Produtos'}
          </Text>
        </TouchableOpacity>

        {/* LISTA DE TODOS OS PRODUTOS */}
        {mostrarTodosProdutos && (
          <View style={styles.containerListaProdutos}>
            <Text style={styles.tituloListaProdutos}>
              📦 Produtos Disponíveis ({obterTodosProdutos().length})
            </Text>
            {obterTodosProdutos().map((produto, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.itemProduto,
                  { backgroundColor: idx % 2 === 0 ? CORES.fundoClaro : CORES.branco }
                ]}
                onPress={() => selecionarProduto(produto)}
              >
                <Text style={styles.nomeProdutoLista}>🛒 {produto}</Text>
                <MaterialIcons name="chevron-right" size={20} color={CORES.primaria} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* ERRO - PRODUTO NÃO ENCONTRADO */}
        {naoEncontrado && (
          <View style={styles.bannerErro}>
            <Text style={styles.textoErro}>❌ Produto não encontrado!</Text>
            <Text style={styles.textoErroDetalhe}>
              Tente: {obterTodosProdutos().slice(0, 5).join(', ')}...
            </Text>
          </View>
        )}

        {/* HISTÓRICO DE BUSCAS */}
        {historico.length > 0 && resultados.length === 0 && !naoEncontrado && !mostrarTodosProdutos && (
          <View style={styles.secaoHistorico}>
            <Text style={styles.rotuloHistorico}>Buscas recentes</Text>
            <View style={styles.containerTags}>
              {historico.map((termo, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.tag}
                  onPress={() => {
                    setItemBusca(termo);
                    setTimeout(buscarPrecos, 100);
                  }}
                >
                  <Text style={styles.textoTag}>{termo}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* RESULTADOS */}
        {resultados.length > 0 && (
          <View style={styles.secaoResultados}>
            <View style={styles.linhaIcone}>
              <MaterialIcons name="local-offer" size={20} color={CORES.primaria} />
              <Text style={styles.tituloResultados}>
                Resultados para "{produtoNome}"
              </Text>
            </View>

            {resultados.map((resultado, idx) => (
              <View
                key={resultado.id}
                style={[
                  styles.cardMercado,
                  idx === 0 && styles.cardMelhorPreco,
                ]}
              >
                <Image source={{ uri: resultado.foto }} style={styles.imagemMercado} />
                <View style={styles.infoMercado}>
                  <View style={styles.linhaNomeMercado}>
                    <Text style={styles.nomeMercado}>{resultado.mercado}</Text>
                    {idx === 0 && (
                      <View style={styles.badgeMelhor}>
                        <Text style={styles.textoBadge}>MELHOR PREÇO</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.distancia}>📍 {resultado.distancia}</Text>
                  <Text style={styles.preco}>R$ {resultado.preco.toFixed(2)}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color={CORES.cinzaMedio} />
              </View>
            ))}

            {/* CARD DE ECONOMIA */}
            <View style={styles.cardEconomia}>
              <Text style={styles.tituloEconomia}>💰 Economia Potencial</Text>
              <Text style={styles.textoEconomia}>
                Economize até R$ {(parseFloat(resultados[resultados.length - 1].preco) - parseFloat(resultados[0].preco)).toFixed(2)} comprando no mercado mais barato!
              </Text>
            </View>
          </View>
        )}

        {/* ESTADO VAZIO */}
        {resultados.length === 0 && historico.length === 0 && !naoEncontrado && !mostrarTodosProdutos && (
          <View style={styles.vazioContainer}>
            <MaterialIcons name="search" size={70} color={CORES.cinzaClaro} />
            <Text style={styles.vazioTitulo}>Busque um produto para comparar</Text>
            <Text style={styles.vazioSubtitulo}>
              Produtos disponíveis: {obterTodosProdutos().slice(0, 5).join(', ')} e mais!
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
    await AsyncStorage.setItem('@historico_buscas', JSON.stringify(novo));
  };

  const buscarPrecos = () => {
    if (!itemBusca.trim()) return;

    salvarHistorico(itemBusca.trim());

    const resultado = buscarProduto(itemBusca);

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
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.conteudo}>
        {/* CABEÇALHO */}
        <View style={styles.linhaIcone}>
          <MaterialIcons name="compare-arrows" size={28} color={CORES.primaria} />
          <Text style={styles.titulo}>Comparador de Preços</Text>
        </View>

        <Text style={styles.subtitulo}>Compare preços em mercados próximos</Text>

        {/* CAMPO DE BUSCA */}
        <View style={styles.containerBusca}>
          <TextInput
            style={styles.input}
            placeholder="Digite o produto (ex: Arroz)"
            value={itemBusca}
            onChangeText={setItemBusca}
            onSubmitEditing={buscarPrecos}
          />
          <TouchableOpacity style={styles.botaoBuscar} onPress={buscarPrecos}>
            <MaterialIcons name="search" size={24} color={CORES.branco} />
          </TouchableOpacity>
        </View>

        {/* ERRO - PRODUTO NÃO ENCONTRADO */}
        {naoEncontrado && (
          <View style={styles.bannerErro}>
            <Text style={styles.textoErro}>❌ Produto não encontrado!</Text>
            <Text style={styles.textoErroDetalhe}>
              Tente: {obterTodosProdutos().slice(0, 5).join(', ')}...
            </Text>
          </View>
        )}

        {/* HISTÓRICO DE BUSCAS */}
        {historico.length > 0 && resultados.length === 0 && !naoEncontrado && (
          <View style={styles.secaoHistorico}>
            <Text style={styles.rotuloHistorico}>Buscas recentes</Text>
            <View style={styles.containerTags}>
              {historico.map((termo, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.tag}
                  onPress={() => {
                    setItemBusca(termo);
                    setTimeout(buscarPrecos, 100);
                  }}
                >
                  <Text style={styles.textoTag}>{termo}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* RESULTADOS */}
        {resultados.length > 0 && (
          <View style={styles.secaoResultados}>
            <View style={styles.linhaIcone}>
              <MaterialIcons name="local-offer" size={20} color={CORES.primaria} />
              <Text style={styles.tituloResultados}>
                Resultados para "{produtoNome}"
              </Text>
            </View>

            {resultados.map((resultado, idx) => (
              <View
                key={resultado.id}
                style={[
                  styles.cardMercado,
                  idx === 0 && styles.cardMelhorPreco,
                ]}
              >
                <Image source={{ uri: resultado.foto }} style={styles.imagemMercado} />
                <View style={styles.infoMercado}>
                  <View style={styles.linhaNomeMercado}>
                    <Text style={styles.nomeMercado}>{resultado.mercado}</Text>
                    {idx === 0 && (
                      <View style={styles.badgeMelhor}>
                        <Text style={styles.textoBadge}>MELHOR PREÇO</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.distancia}>📍 {resultado.distancia}</Text>
                  <Text style={styles.preco}>R$ {resultado.preco.toFixed(2)}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color={CORES.cinzaMedio} />
              </View>
            ))}

            {/* CARD DE ECONOMIA */}
            <View style={styles.cardEconomia}>
              <Text style={styles.tituloEconomia}>💰 Economia Potencial</Text>
              <Text style={styles.textoEconomia}>
                Economize até R$ {(parseFloat(resultados[resultados.length - 1].preco) - parseFloat(resultados[0].preco)).toFixed(2)} comprando no mercado mais barato!
              </Text>
            </View>
          </View>
        )}

        {/* ESTADO VAZIO */}
        {resultados.length === 0 && historico.length === 0 && !naoEncontrado && (
          <View style={styles.vazioContainer}>
            <MaterialIcons name="search" size={70} color={CORES.cinzaClaro} />
            <Text style={styles.vazioTitulo}>Busque um produto para comparar</Text>
            <Text style={styles.vazioSubtitulo}>
              Produtos disponíveis: {obterTodosProdutos().slice(0, 5).join(', ')} e mais!
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
