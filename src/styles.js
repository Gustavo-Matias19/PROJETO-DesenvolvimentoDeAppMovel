import { StyleSheet } from 'react-native';

export const CORES = {
  primaria: '#4CAF50',
<<<<<<< HEAD
  primariaEscura: '#388E3C',
  primariaClara: '#C8E6C9',
  
  secundaria: '#2196F3',
  secundariaEscura: '#1976D2',
  
  perigo: '#f44336',
  alerta: '#FF5722',
  sucesso: '#4CAF50',
  info: '#00BCD4',
=======
  secundaria: '#2196F3',
  perigo: '#f44336',
  alerta: '#FF5722',
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
  
  branco: '#FFFFFF',
  preto: '#000000',
  
<<<<<<< HEAD
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
=======
  fundoClaro: '#f5f5f5',
  
  cinzaClaro: '#e0e0e0',
  cinzaMedio: '#999999',
  
  textoEscuro: '#333333',
  textoMedio: '#666666',
  textoClaro: '#999999',
  
  borda: '#dddddd',
};

export const estilos = StyleSheet.create({
<<<<<<< HEAD
  // ===== CONTAINERS =====
=======
  // CONTAINERS
>>>>>>> 22a61768673c58df3bf28a94baab7eb52948f5fa
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
  container: {
    flex: 1,
    backgroundColor: CORES.fundoClaro,
  },
  containerCentralizado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
<<<<<<< HEAD
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
=======
  },
  conteudo: {
    padding: 15,
  },

<<<<<<< HEAD
  // ===== CARDS =====
=======
  // CARDS
>>>>>>> 22a61768673c58df3bf28a94baab7eb52948f5fa
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

<<<<<<< HEAD
  // ===== INPUTS =====
=======
  // INPUTS
>>>>>>> 22a61768673c58df3bf28a94baab7eb52948f5fa
  input: {
    backgroundColor: CORES.branco,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: CORES.borda,
  },
<<<<<<< HEAD
  containerAdicionarItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputItem: {
    flex: 1,
    marginRight: 10,
  },

  // ===== BOTÕES =====
=======

  // BOTÕES
>>>>>>> 22a61768673c58df3bf28a94baab7eb52948f5fa
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
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
  },
  botaoFlutuante: {
    position: 'absolute',
    right: 20,
    bottom: 20,
<<<<<<< HEAD
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
=======
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: CORES.primaria,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
<<<<<<< HEAD

  // ===== TEXTOS =====
=======
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
>>>>>>> 22a61768673c58df3bf28a94baab7eb52948f5fa
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: CORES.textoEscuro,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
    color: CORES.textoEscuro,
  },
  textoBotao: {
    color: CORES.branco,
<<<<<<< HEAD
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
=======
    fontSize: 18,
    fontWeight: 'bold',
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
  },
  textoNormal: {
    fontSize: 16,
    color: CORES.textoEscuro,
<<<<<<< HEAD
    lineHeight: 24,
=======
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
  },
  textoPequeno: {
    fontSize: 14,
    color: CORES.textoMedio,
<<<<<<< HEAD
    lineHeight: 20,
=======
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
  },
  textoMini: {
    fontSize: 12,
    color: CORES.textoClaro,
  },
<<<<<<< HEAD
  textoProgresso: {
    fontSize: 15,
    color: CORES.primaria,
    marginTop: 8,
    fontWeight: '700',
=======
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
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
  },
  textoMarcado: {
    textDecorationLine: 'line-through',
    color: CORES.cinzaMedio,
<<<<<<< HEAD
    opacity: 0.6,
  },

  // ===== PROGRESS BAR MELHORADA =====
  barraProgresso: {
    height: 10,
    backgroundColor: CORES.cinzaClaro,
    borderRadius: 5,
    marginTop: 12,
=======
  },

<<<<<<< HEAD
  // ===== PROGRESS BAR =====
=======
  // PROGRESS BAR
>>>>>>> 22a61768673c58df3bf28a94baab7eb52948f5fa
  barraProgresso: {
    height: 8,
    backgroundColor: CORES.cinzaClaro,
    borderRadius: 4,
    marginTop: 10,
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
    overflow: 'hidden',
  },
  preenchimentoProgresso: {
    height: '100%',
    backgroundColor: CORES.primaria,
<<<<<<< HEAD
    borderRadius: 5,
  },

  // ===== LAYOUTS =====
=======
  },

<<<<<<< HEAD
  // ===== LAYOUTS =====
=======
  // LAYOUTS
>>>>>>> 22a61768673c58df3bf28a94baab7eb52948f5fa
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linhaEntre: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
<<<<<<< HEAD
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
=======
  secao: {
    marginBottom: 20,
  },
  rotulo: {
    fontSize: 16,
    fontWeight: '600',
    color: CORES.textoEscuro,
    marginBottom: 8,
  },

<<<<<<< HEAD
  // ===== ITEM LISTA =====
=======
  // ITEM LISTA
>>>>>>> 22a61768673c58df3bf28a94baab7eb52948f5fa
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CORES.branco,
    padding: 15,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 8,
    elevation: 2,
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
  },
  itemTexto: {
    fontSize: 16,
    color: CORES.textoEscuro,
<<<<<<< HEAD
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
=======
    marginLeft: 15,
    flex: 1,
  },

<<<<<<< HEAD
  // ===== CABEÇALHOS =====
=======
  // CABECALHOS
>>>>>>> 22a61768673c58df3bf28a94baab7eb52948f5fa
  cabecalho: {
    backgroundColor: CORES.branco,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: CORES.borda,
  },

<<<<<<< HEAD
  // ===== TELA VAZIA =====
=======
  // TELA VAZIA
>>>>>>> 22a61768673c58df3bf28a94baab7eb52948f5fa
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
  vazioContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
<<<<<<< HEAD
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
=======
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

<<<<<<< HEAD
  // ===== MODAL =====
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: CORES.branco,
<<<<<<< HEAD
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
=======
    borderRadius: 15,
    padding: 25,
    width: '85%',
    maxWidth: 400,
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
  },
  modalMensagem: {
    fontSize: 16,
    color: CORES.textoMedio,
<<<<<<< HEAD
    marginBottom: 24,
    lineHeight: 24,
=======
    marginBottom: 25,
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
  },
  modalBotoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
<<<<<<< HEAD
    gap: 12,
  },
  modalBotaoCancelar: {
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
=======
  },
  modalBotaoCancelar: {
    padding: 12,
    marginRight: 10,
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
  },
  modalBotaoConfirmar: {
    backgroundColor: CORES.primaria,
    padding: 12,
<<<<<<< HEAD
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
=======
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  // ===== ERRO =====
  bannerErro: {
    backgroundColor: '#ffebee',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: CORES.perigo,
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
  },
  textoErro: {
    color: CORES.perigo,
    fontWeight: '600',
<<<<<<< HEAD
    fontSize: 15,
  },

  // ===== IMAGENS MELHORADAS =====
  imagemMercado: {
    width: 80,
    height: 80,
    borderRadius: 16,
=======
  },

  // ===== IMAGENS =====
  imagemMercado: {
    width: 70,
    height: 70,
    borderRadius: 10,
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
    backgroundColor: CORES.cinzaClaro,
  },
  imagemMercadoGrande: {
    width: '100%',
<<<<<<< HEAD
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
=======
    height: 250,
    backgroundColor: CORES.cinzaClaro,
  },
  imagemProduto: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: CORES.fundoClaro,
  },

  // ===== BADGES =====
  badgePromocao: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: CORES.alerta,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
    zIndex: 10,
  },
  textoBadge: {
    color: CORES.branco,
    fontSize: 10,
    fontWeight: 'bold',
  },

  // ===== AVALIAÇÃO =====
  containerAvaliacao: {
    flexDirection: 'row',
  },

  // ===== CONQUISTAS =====
  conquistaBanner: {
    backgroundColor: CORES.primaria,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  conquistaIcone: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  conquistaTag: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 5,
    alignSelf: 'flex-start',
  },

  // ===== RODAPÉ FIXO =====
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
  rodapeFixo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
<<<<<<< HEAD
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
=======
    padding: 15,
    backgroundColor: CORES.branco,
    borderTopWidth: 1,
    borderTopColor: CORES.cinzaClaro,
  },
});
=======
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
>>>>>>> 22a61768673c58df3bf28a94baab7eb52948f5fa
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
