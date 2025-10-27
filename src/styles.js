import { StyleSheet } from 'react-native';

export const CORES = {
  primaria: '#FF6B00',        // Laranja principal
  secundaria: '#FF8C42',      // Laranja claro
  perigo: '#FF3D00',          // Vermelho laranjado
  alerta: '#FFA726',          // Laranja suave
  branco: '#FFFFFF',
  preto: '#000000',
  fundoEscuro: '#1A1A1A',     // Preto suave para fundo
  fundoClaro: '#2D2D2D',      // Cinza escuro para cards
  cinzaEscuro: '#3D3D3D',     // Cinza médio escuro
  cinzaMedio: '#808080',
  cinzaClaro: '#B0B0B0',
  textoEscuro: '#FFFFFF',     // Texto principal (branco em fundo escuro)
  textoMedio: '#D0D0D0',      // Texto secundário
  textoClaro: '#A0A0A0',      // Texto terciário
  borda: '#404040',           // Borda escura
};

export const estilos = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: CORES.fundoEscuro 
  },
  containerCentralizado: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: CORES.fundoEscuro
  },
  conteudo: { 
    padding: 15 
  },

  card: {
    backgroundColor: CORES.fundoClaro,
    margin: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: CORES.preto,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: CORES.borda,
  },

  input: {
    backgroundColor: CORES.fundoClaro,
    color: CORES.textoEscuro,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: CORES.borda,
  },
  containerAdicionarItem: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  inputItem: { 
    flex: 1, 
    marginRight: 10 
  },

  botaoPrimario: {
    backgroundColor: CORES.primaria,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
  },
  botaoAdicionar: {
    backgroundColor: CORES.primaria,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
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

  titulo: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: CORES.textoEscuro 
  },
  subtitulo: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: CORES.textoEscuro 
  },
  textoBotao: { 
    color: CORES.branco, 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  textoNormal: { 
    fontSize: 16, 
    color: CORES.textoEscuro 
  },
  textoPequeno: { 
    fontSize: 14, 
    color: CORES.textoMedio 
  },
  textoMini: { 
    fontSize: 12, 
    color: CORES.textoClaro 
  },
  textoProgresso: { 
    fontSize: 16, 
    color: CORES.primaria, 
    marginTop: 10, 
    fontWeight: '600' 
  },
  textoMarcado: { 
    textDecorationLine: 'line-through', 
    color: CORES.cinzaMedio 
  },

  barraProgresso: { 
    height: 8, 
    backgroundColor: CORES.cinzaEscuro, 
    borderRadius: 4, 
    marginTop: 10, 
    overflow: 'hidden' 
  },
  preenchimentoProgresso: { 
    height: '100%', 
    backgroundColor: CORES.primaria 
  },

  linha: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  linhaEntre: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },

  rotulo: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: CORES.textoEscuro, 
    marginBottom: 8 
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CORES.fundoClaro,
    padding: 15,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: CORES.borda,
  },
  itemTexto: { 
    fontSize: 16, 
    color: CORES.textoEscuro, 
    marginLeft: 15, 
    flex: 1 
  },

  cabecalho: { 
    backgroundColor: CORES.fundoClaro, 
    padding: 20, 
    borderBottomWidth: 1, 
    borderBottomColor: CORES.borda 
  },

  vazioContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 100 
  },
  vazioMensagem: { 
    fontSize: 20, 
    color: CORES.cinzaMedio, 
    marginTop: 20 
  },
  vazioSubmensagem: { 
    fontSize: 14, 
    color: CORES.cinzaClaro, 
    marginTop: 5 
  },

  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.8)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  modalContainer: { 
    backgroundColor: CORES.fundoClaro, 
    borderRadius: 15, 
    padding: 25, 
    width: '85%', 
    maxWidth: 400,
    borderWidth: 2,
    borderColor: CORES.primaria,
  },
  modalTitulo: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 15,
    color: CORES.textoEscuro
  },
  modalMensagem: { 
    fontSize: 16, 
    color: CORES.textoMedio, 
    marginBottom: 25 
  },
  modalBotoes: { 
    flexDirection: 'row', 
    justifyContent: 'flex-end' 
  },
  modalBotaoCancelar: { 
    padding: 12, 
    marginRight: 10 
  },
  modalBotaoConfirmar: { 
    backgroundColor: CORES.primaria, 
    padding: 12, 
    paddingHorizontal: 20, 
    borderRadius: 8 
  },

  bannerErro: { 
    backgroundColor: '#4D1F1F', 
    padding: 15, 
    borderRadius: 8, 
    marginBottom: 15, 
    borderLeftWidth: 4, 
    borderLeftColor: CORES.perigo 
  },
  textoErro: { 
    color: CORES.perigo, 
    fontWeight: '600' 
  },

  imagemMercado: { 
    width: 70, 
    height: 70, 
    borderRadius: 10, 
    backgroundColor: CORES.cinzaEscuro 
  },
  imagemMercadoGrande: { 
    width: '100%', 
    height: 250, 
    backgroundColor: CORES.cinzaEscuro 
  },
  imagemProduto: { 
    width: 70, 
    height: 70, 
    borderRadius: 8, 
    backgroundColor: CORES.fundoClaro 
  },

  badgePromocao: { 
    position: 'absolute', 
    top: 10, 
    right: 10, 
    backgroundColor: CORES.alerta, 
    paddingHorizontal: 8, 
    paddingVertical: 5, 
    borderRadius: 5, 
    zIndex: 10 
  },
  textoBadge: { 
    color: CORES.branco, 
    fontSize: 10, 
    fontWeight: 'bold' 
  },

  rodapeFixo: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    padding: 15, 
    backgroundColor: CORES.fundoEscuro, 
    borderTopWidth: 1, 
    borderTopColor: CORES.borda 
  },

  botaoIcone: { 
    padding: 8, 
    borderRadius: 8, 
    backgroundColor: CORES.cinzaEscuro 
  },
});