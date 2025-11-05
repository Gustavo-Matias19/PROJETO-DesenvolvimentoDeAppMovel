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
      { mercado: 'Supermercado Supermercado Extra', preco: 4.99, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 4.50, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supercado Assai', preco: 5.20, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Feijão',
    categoria: 'Grãos',
    precos: [
      { mercado: 'Supermercado Extra', preco: 7.99, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 7.20, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supercado Assai', preco: 8.50, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Macarrão',
    categoria: 'Massas',
    precos: [
      { mercado: 'Supermercado Extra', preco: 3.50, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 2.99, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supercado Assai', preco: 3.80, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Açúcar',
    categoria: 'Condimentos',
    precos: [
      { mercado: 'Supermercado Extra', preco: 3.20, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 2.80, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supercado Assai', preco: 3.50, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Café',
    categoria: 'Bebidas',
    precos: [
      { mercado: 'Supermercado Extra', preco: 8.50, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 7.99, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supercado Assai', preco: 9.20, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Leite',
    categoria: 'Laticínios',
    precos: [
      { mercado: 'Supermercado Extra', preco: 4.80, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 4.20, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supercado Assai', preco: 5.10, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Óleo',
    categoria: 'Condimentos',
    precos: [
      { mercado: 'Supermercado Extra', preco: 6.50, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 5.99, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supercado Assai', preco: 6.80, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Sal',
    categoria: 'Condimentos',
    precos: [
      { mercado: 'Supermercado Extra', preco: 1.80, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 1.50, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supercado Assai', preco: 2.00, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Pão',
    categoria: 'Padaria',
    precos: [
      { mercado: 'Supermercado Extra', preco: 8.50, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 7.80, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supercado Assai', preco: 9.00, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Manteiga',
    categoria: 'Laticínios',
    precos: [
      { mercado: 'Supermercado Extra', preco: 12.50, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 11.80, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supercado Assai', preco: 13.20, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Queijo',
    categoria: 'Laticínios',
    precos: [
      { mercado: 'Supermercado Extra', preco: 18.90, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 17.50, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supercado Assai', preco: 19.80, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Frango',
    categoria: 'Carnes',
    precos: [
      { mercado: 'Supermercado Extra', preco: 14.90, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 13.50, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supercado Assai', preco: 15.80, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Carne',
    categoria: 'Carnes',
    precos: [
      { mercado: 'Supermercado Extra', preco: 32.90, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 29.80, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supercado Assai', preco: 34.50, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Tomate',
    categoria: 'Hortifruti',
    precos: [
      { mercado: 'Supermercado Extra', preco: 5.50, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 4.80, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supercado Assai', preco: 6.20, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Cebola',
    categoria: 'Hortifruti',
    precos: [
      { mercado: 'Supermercado Extra', preco: 4.20, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 3.80, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supercado Assai', preco: 4.60, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Alho',
    categoria: 'Hortifruti',
    precos: [
      { mercado: 'Supermercado Extra', preco: 28.90, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 26.50, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supercado Assai', preco: 30.80, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Batata',
    categoria: 'Hortifruti',
    precos: [
      { mercado: 'Supermercado Extra', preco: 4.90, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 4.20, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supercado Assai', preco: 5.50, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Banana',
    categoria: 'Frutas',
    precos: [
      { mercado: 'Supermercado Extra', preco: 5.80, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 4.99, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supercado Assai', preco: 6.50, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
    ]
  },
  {
    nome: 'Maçã',
    categoria: 'Frutas',
    precos: [
      { mercado: 'Supermercado Extra', preco: 7.90, distancia: '500m', foto: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200' },
      { mercado: 'Supermercado Nagumo', preco: 6.80, distancia: '1.2km', foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200' },
      { mercado: 'Supercado Assai', preco: 8.50, distancia: '2km', foto: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200' }
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

// ==================== ESTILOS ====================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CORES.fundoClaro,
  },
  conteudo: {
    padding: 20,
  },
  linhaIcone: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: CORES.textoEscuro,
    marginLeft: 10,
  },
  subtitulo: {
    fontSize: 14,
    color: CORES.textoMedio,
    marginBottom: 20,
  },
  containerBusca: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    backgroundColor: CORES.branco,
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: CORES.borda,
    marginRight: 10,
  },
  botaoBuscar: {
    backgroundColor: CORES.primaria,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  bannerErro: {
    backgroundColor: '#ffebee',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: CORES.perigo,
  },
  textoErro: {
    color: CORES.perigo,
    fontWeight: 'bold',
    fontSize: 16,
  },
  textoErroDetalhe: {
    color: CORES.textoMedio,
    fontSize: 13,
    marginTop: 5,
  },
  secaoHistorico: {
    marginBottom: 20,
  },
  rotuloHistorico: {
    fontSize: 16,
    fontWeight: '600',
    color: CORES.textoEscuro,
    marginBottom: 10,
  },
  containerTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: CORES.cinzaClaro,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  textoTag: {
    fontSize: 13,
    color: CORES.textoEscuro,
  },
  secaoResultados: {
    marginTop: 10,
  },
  tituloResultados: {
    fontSize: 18,
    fontWeight: 'bold',
    color: CORES.textoEscuro,
    marginLeft: 8,
    marginBottom: 15,
  },
  cardMercado: {
    backgroundColor: CORES.branco,
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardMelhorPreco: {
    borderWidth: 2,
    borderColor: CORES.primaria,
    backgroundColor: '#e8f5e9',
  },
  imagemMercado: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: CORES.cinzaClaro,
  },
  infoMercado: {
    marginLeft: 12,
    flex: 1,
  },
  linhaNomeMercado: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  nomeMercado: {
    fontSize: 16,
    fontWeight: 'bold',
    color: CORES.textoEscuro,
  },
  badgeMelhor: {
    backgroundColor: CORES.primaria,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  textoBadge: {
    color: CORES.branco,
    fontSize: 10,
    fontWeight: 'bold',
  },
  distancia: {
    fontSize: 12,
    color: CORES.textoClaro,
    marginTop: 3,
  },
  preco: {
    fontSize: 24,
    fontWeight: 'bold',
    color: CORES.primaria,
    marginTop: 5,
  },
  cardEconomia: {
    backgroundColor: CORES.primaria,
    padding: 18,
    borderRadius: 12,
    marginTop: 10,
  },
  tituloEconomia: {
    color: CORES.branco,
    fontSize: 18,
    fontWeight: 'bold',
  },
  textoEconomia: {
    color: CORES.branco,
    fontSize: 15,
    marginTop: 8,
    lineHeight: 22,
  },
  vazioContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    paddingHorizontal: 20,
  },
  vazioTitulo: {
    fontSize: 18,
    color: CORES.cinzaMedio,
    marginTop: 20,
    textAlign: 'center',
  },
  vazioSubtitulo: {
    fontSize: 13,
    color: CORES.textoClaro,
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 20,
  },
});