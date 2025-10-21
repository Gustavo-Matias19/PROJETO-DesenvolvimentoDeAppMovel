import { StyleSheet } from 'react-native';

export const CORES = {
  primaria: '#4CAF50',
  primariaEscura: '#388E3C',
  primariaClara: '#C8E6C9',
  
  secundaria: '#2196F3',
  secundariaEscura: '#1976D2',
  
  perigo: '#f44336',
  alerta: '#FF5722',
  sucesso: '#4CAF50',
  info: '#00BCD4',
  
  branco: '#FFFFFF',
  preto: '#000000',
  
  fundoClaro: '#F8F9FA',
  fundoCard: '#FFFFFF',
  
  cinzaClaro: '#E0E0E0',
  cinzaMedio: '#9E9E9E',
  cinzaEscuro: '#616161',
  
  textoEscuro: '#212121',
  textoMedio: '#757575',
  textoClaro: '#BDBDBD',
  
  borda: '#E0E0E0',
  
  gradiente1: '#4CAF50',
  gradiente2: '#81C784',
};

export const estilos = StyleSheet.create({
  // ===== CONTAINERS =====
  container: {
    flex: 1,
    backgroundColor: CORES.fundoClaro,
  },
  containerCentralizado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  conteudo: {
    padding: 16,
  },

  // ===== CARDS MELHORADOS =====
  card: {
    backgroundColor: CORES.fundoCard,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 16,
    elevation: 4,
    shadowColor: CORES.preto,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  
  cardDestaque: {
    backgroundColor: CORES.primariaClara,
    borderWidth: 2,
    borderColor: CORES.primaria,
  },

  // ===== INPUTS MODERNOS =====
  input: {
    backgroundColor: CORES.fundoCard,
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 2,
    borderColor: CORES.cinzaClaro,
    color: CORES.textoEscuro,
  },
  inputFocused: {
    borderColor: CORES.primaria,
  },
  containerAdicionarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  inputItem: {
    flex: 1,
  },

  // ===== BOTÕES MODERNOS =====
  botaoPrimario: {
    backgroundColor: CORES.primaria,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: CORES.primaria,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  botaoSecundario: {
    backgroundColor: CORES.secundaria,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  botaoOutline: {
    backgroundColor: 'transparent',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: CORES.primaria,
  },
  botaoAdicionar: {
    backgroundColor: CORES.primaria,
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: CORES.primaria,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  botaoFlutuante: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: CORES.primaria,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: CORES.primaria,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  botaoIcone: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: CORES.fundoClaro,
  },

  // ===== TEXTOS MELHORADOS =====
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: CORES.textoEscuro,
    letterSpacing: -0.5,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: '700',
    color: CORES.textoEscuro,
  },
  textoBotao: {
    color: CORES.branco,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  textoNormal: {
    fontSize: 16,
    color: CORES.textoEscuro,
    lineHeight: 24,
  },
  textoPequeno: {
    fontSize: 14,
    color: CORES.textoMedio,
    lineHeight: 20,
  },
  textoMini: {
    fontSize: 12,
    color: CORES.textoClaro,
  },
  textoProgresso: {
    fontSize: 15,
    color: CORES.primaria,
    marginTop: 8,
    fontWeight: '700',
  },
  textoMarcado: {
    textDecorationLine: 'line-through',
    color: CORES.cinzaMedio,
    opacity: 0.6,
  },

  // ===== PROGRESS BAR MELHORADA =====
  barraProgresso: {
    height: 10,
    backgroundColor: CORES.cinzaClaro,
    borderRadius: 5,
    marginTop: 12,
    overflow: 'hidden',
  },
  preenchimentoProgresso: {
    height: '100%',
    backgroundColor: CORES.primaria,
    borderRadius: 5,
  },

  // ===== LAYOUTS =====
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linhaEntre: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rotulo: {
    fontSize: 15,
    fontWeight: '700',
    color: CORES.textoEscuro,
    marginBottom: 10,
    letterSpacing: 0.3,
  },

  // ===== ITEM LISTA MELHORADO =====
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CORES.fundoCard,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    elevation: 2,
    shadowColor: CORES.preto,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemTexto: {
    fontSize: 16,
    color: CORES.textoEscuro,
    marginLeft: 12,
    flex: 1,
  },

  // ===== CABEÇALHOS =====
  cabecalho: {
    backgroundColor: CORES.fundoCard,
    padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
    shadowColor: CORES.preto,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cabecalhoGradiente: {
    backgroundColor: CORES.primaria,
    padding: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  // ===== TELA VAZIA =====
  vazioContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  vazioMensagem: {
    fontSize: 22,
    color: CORES.cinzaMedio,
    marginTop: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  vazioSubmensagem: {
    fontSize: 15,
    color: CORES.cinzaClaro,
    marginTop: 8,
    textAlign: 'center',
  },

  // ===== MODAIS MELHORADOS =====
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: CORES.branco,
    borderRadius: 24,
    padding: 28,
    width: '88%',
    maxWidth: 420,
    elevation: 10,
    shadowColor: CORES.preto,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  modalTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: CORES.textoEscuro,
  },
  modalMensagem: {
    fontSize: 16,
    color: CORES.textoMedio,
    marginBottom: 24,
    lineHeight: 24,
  },
  modalBotoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  modalBotaoCancelar: {
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalBotaoConfirmar: {
    backgroundColor: CORES.primaria,
    padding: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    elevation: 2,
  },

  // ===== BANNERS =====
  bannerErro: {
    backgroundColor: '#FFEBEE',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: CORES.perigo,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerSucesso: {
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: CORES.sucesso,
  },
  textoErro: {
    color: CORES.perigo,
    fontWeight: '600',
    fontSize: 15,
  },

  // ===== IMAGENS MELHORADAS =====
  imagemMercado: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: CORES.cinzaClaro,
  },
  imagemMercadoGrande: {
    width: '100%',
    height: 280,
    backgroundColor: CORES.cinzaClaro,
  },
  imagemProduto: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: CORES.fundoClaro,
  },
  imagemReceita: {
    width: 90,
    height: 90,
    borderRadius: 16,
    backgroundColor: CORES.cinzaClaro,
  },

  // ===== BADGES MELHORADOS =====
  badgePromocao: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: CORES.alerta,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    zIndex: 10,
    elevation: 4,
  },
  badgeMelhor: {
    backgroundColor: CORES.primaria,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  textoBadge: {
    color: CORES.branco,
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },

  // ===== TAGS =====
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    backgroundColor: CORES.primariaClara,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  tagTexto: {
    color: CORES.primariaEscura,
    fontSize: 13,
    fontWeight: '600',
  },

  // ===== CARDS ESPECIAIS =====
  cardEconomia: {
    backgroundColor: CORES.primaria,
    padding: 20,
    borderRadius: 16,
    marginTop: 12,
    elevation: 4,
  },
  cardInfo: {
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    borderLeftWidth: 4,
    borderLeftColor: CORES.secundaria,
  },

  // ===== RODAPÉ =====
  rodapeFixo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: CORES.fundoCard,
    borderTopWidth: 1,
    borderTopColor: CORES.borda,
    elevation: 8,
    shadowColor: CORES.preto,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  // ===== SEPARADORES =====
  separador: {
    height: 1,
    backgroundColor: CORES.borda,
    marginVertical: 16,
  },
  separadorGrosso: {
    height: 8,
    backgroundColor: CORES.fundoClaro,
    marginVertical: 16,
  },

  // ===== ESTATÍSTICAS =====
  estatisticaCard: {
    backgroundColor: CORES.fundoCard,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 6,
    elevation: 2,
  },
  estatisticaNumero: {
    fontSize: 32,
    fontWeight: 'bold',
    color: CORES.primaria,
  },
  estatisticaLabel: {
    fontSize: 14,
    color: CORES.textoMedio,
    marginTop: 4,
  },
});