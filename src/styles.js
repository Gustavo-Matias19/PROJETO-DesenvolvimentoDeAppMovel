import { StyleSheet } from 'react-native';

export const CORES = {
  primaria: '#4CAF50',
  secundaria: '#2196F3',
  perigo: '#f44336',
  alerta: '#FF5722',
  
  branco: '#FFFFFF',
  preto: '#000000',
  
  fundoClaro: '#f5f5f5',
  
  cinzaClaro: '#e0e0e0',
  cinzaMedio: '#999999',
  
  textoEscuro: '#333333',
  textoMedio: '#666666',
  textoClaro: '#999999',
  
  borda: '#dddddd',
};

export const estilos = StyleSheet.create({
  // CONTAINERS
  container: {
    flex: 1,
    backgroundColor: CORES.fundoClaro,
  },
  containerCentralizado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  conteudo: {
    padding: 15,
  },

  // CARDS
  card: {
    backgroundColor: CORES.branco,
    margin: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: CORES.preto,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  // INPUTS
  input: {
    backgroundColor: CORES.branco,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: CORES.borda,
  },

  // BOTÕES
  botaoPrimario: {
    backgroundColor: CORES.primaria,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoAdicionar: {
    backgroundColor: CORES.primaria,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoFlutuante: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: CORES.primaria,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  botaoFinalizar: {
    flexDirection: 'row',
    backgroundColor: CORES.primaria,
    margin: 15,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // TEXTOS
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: CORES.textoEscuro,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: CORES.textoEscuro,
  },
  textoBotao: {
    color: CORES.branco,
    fontSize: 18,
    fontWeight: 'bold',
  },
  textoNormal: {
    fontSize: 16,
    color: CORES.textoEscuro,
  },
  textoPequeno: {
    fontSize: 14,
    color: CORES.textoMedio,
  },
  textoMini: {
    fontSize: 12,
    color: CORES.textoClaro,
  },
  textoVazio: {
    textAlign: 'center',
    color: CORES.cinzaMedio,
    marginTop: 20,
    fontSize: 14,
  },
  textoProgresso: {
    fontSize: 16,
    color: CORES.primaria,
    marginTop: 10,
    fontWeight: '600',
  },
  textoMarcado: {
    textDecorationLine: 'line-through',
    color: CORES.cinzaMedio,
  },

  // PROGRESS BAR
  barraProgresso: {
    height: 8,
    backgroundColor: CORES.cinzaClaro,
    borderRadius: 4,
    marginTop: 10,
    overflow: 'hidden',
  },
  preenchimentoProgresso: {
    height: '100%',
    backgroundColor: CORES.primaria,
  },

  // LAYOUTS
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linhaEntre: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  secao: {
    marginBottom: 20,
  },
  rotulo: {
    fontSize: 16,
    fontWeight: '600',
    color: CORES.textoEscuro,
    marginBottom: 8,
  },

  // ITEM LISTA
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CORES.branco,
    padding: 15,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 8,
    elevation: 2,
  },
  itemTexto: {
    fontSize: 16,
    color: CORES.textoEscuro,
    marginLeft: 15,
    flex: 1,
  },

  // CABECALHOS
  cabecalho: {
    backgroundColor: CORES.branco,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: CORES.borda,
  },

  // TELA VAZIA
  vazioContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  vazioMensagem: {
    fontSize: 20,
    color: CORES.cinzaMedio,
    marginTop: 20,
  },
  vazioSubmensagem: {
    fontSize: 14,
    color: CORES.cinzaClaro,
    marginTop: 5,
  },

  // INPUT ITEM
  containerAdicionarItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputItem: {
    flex: 1,
    marginRight: 10,
  },
});
