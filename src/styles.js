<<<<<<< HEAD
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
=======
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const CORES = {
  // Cores principais
  primaria: '#FF6B00',
  secundaria: '#FF8C42',
  perigo: '#FF3D00',
  sucesso: '#4CAF50',
  alerta: '#FFA726',
  info: '#2196F3',
  
  // Cores de fundo
  branco: '#FFFFFF',
  preto: '#000000',
  fundoEscuro: '#1A1A1A',
  fundoClaro: '#2D2D2D',
  fundoCard: '#252525',
  
  // Cinzas
  cinzaEscuro: '#3D3D3D',
  cinzaMedio: '#808080',
  cinzaClaro: '#B0B0B0',
  
  // Cores de texto
  textoEscuro: '#FFFFFF',
  textoMedio: '#D0D0D0',
  textoClaro: '#A0A0A0',
  
  // Outros
  borda: '#404040',
  overlay: 'rgba(0, 0, 0, 0.8)',
};

export const ESPACAMENTO = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

export const TAMANHOS_FONTE = {
  mini: 10,
  pequeno: 12,
  normal: 14,
  medio: 16,
  grande: 18,
  titulo: 20,
  tituloPrincipal: 24,
};

export const estilos = StyleSheet.create({
  // ==================== CONTAINERS ====================
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
  container: { 
    flex: 1, 
    backgroundColor: CORES.fundoEscuro 
  },
<<<<<<< HEAD
=======
  
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
  containerCentralizado: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
<<<<<<< HEAD
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
=======
    backgroundColor: CORES.fundoEscuro,
    padding: ESPACAMENTO.lg,
  },
  
  conteudo: { 
    padding: ESPACAMENTO.lg 
  },

  // ==================== CARDS ====================
  card: {
    backgroundColor: CORES.fundoClaro,
    marginHorizontal: ESPACAMENTO.md,
    marginVertical: ESPACAMENTO.sm,
    padding: ESPACAMENTO.lg,
    borderRadius: 12,
    elevation: 4,
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
    shadowColor: CORES.preto,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: CORES.borda,
  },

<<<<<<< HEAD
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
=======
  cardDestaque: {
    borderWidth: 2,
    borderColor: CORES.primaria,
    backgroundColor: 'rgba(255, 107, 0, 0.05)',
  },

  // ==================== INPUTS ====================
  input: {
    backgroundColor: CORES.fundoClaro,
    color: CORES.textoEscuro,
    padding: ESPACAMENTO.md,
    borderRadius: 8,
    fontSize: TAMANHOS_FONTE.medio,
    borderWidth: 1,
    borderColor: CORES.borda,
  },

  inputFocado: {
    borderColor: CORES.primaria,
    borderWidth: 2,
  },

  containerAdicionarItem: { 
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: ESPACAMENTO.md,
  },

  inputItem: { 
    flex: 1, 
    marginRight: ESPACAMENTO.sm,
  },

  // ==================== BOTÕES ====================
  botaoPrimario: {
    backgroundColor: CORES.primaria,
    padding: ESPACAMENTO.lg,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: CORES.primaria,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  botaoSecundario: {
    backgroundColor: CORES.secundaria,
    padding: ESPACAMENTO.md,
    borderRadius: 8,
    alignItems: 'center',
  },

  botaoPerigo: {
    backgroundColor: CORES.perigo,
    padding: ESPACAMENTO.md,
    borderRadius: 8,
    alignItems: 'center',
  },

  botaoOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: CORES.primaria,
    padding: ESPACAMENTO.md,
    borderRadius: 8,
    alignItems: 'center',
  },

>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
  botaoAdicionar: {
    backgroundColor: CORES.primaria,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
<<<<<<< HEAD
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

=======
    shadowColor: CORES.primaria,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },

  botaoFlutuante: {
    position: 'absolute',
    right: ESPACAMENTO.xl,
    bottom: ESPACAMENTO.xl,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: CORES.primaria,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: CORES.primaria,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },

  botaoIcone: { 
    padding: ESPACAMENTO.sm, 
    borderRadius: 8, 
    backgroundColor: CORES.cinzaEscuro 
  },

  // ==================== TEXTOS ====================
  titulo: { 
    fontSize: TAMANHOS_FONTE.tituloPrincipal, 
    fontWeight: 'bold', 
    color: CORES.textoEscuro,
    marginBottom: ESPACAMENTO.sm,
  },

  subtitulo: { 
    fontSize: TAMANHOS_FONTE.grande, 
    fontWeight: '600', 
    color: CORES.textoEscuro,
    marginBottom: ESPACAMENTO.xs,
  },

  textoBotao: { 
    color: CORES.branco, 
    fontSize: TAMANHOS_FONTE.grande, 
    fontWeight: 'bold' 
  },

  textoNormal: { 
    fontSize: TAMANHOS_FONTE.medio, 
    color: CORES.textoEscuro,
    lineHeight: 22,
  },

  textoPequeno: { 
    fontSize: TAMANHOS_FONTE.normal, 
    color: CORES.textoMedio,
    lineHeight: 20,
  },

  textoMini: { 
    fontSize: TAMANHOS_FONTE.pequeno, 
    color: CORES.textoClaro,
    lineHeight: 18,
  },

  textoProgresso: { 
    fontSize: TAMANHOS_FONTE.medio, 
    color: CORES.primaria, 
    marginTop: ESPACAMENTO.sm, 
    fontWeight: '600' 
  },

  textoMarcado: { 
    textDecorationLine: 'line-through', 
    color: CORES.cinzaMedio,
    opacity: 0.6,
  },

  textoDestaque: {
    color: CORES.primaria,
    fontWeight: 'bold',
  },

  // ==================== PROGRESSO ====================
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
  barraProgresso: { 
    height: 8, 
    backgroundColor: CORES.cinzaEscuro, 
    borderRadius: 4, 
<<<<<<< HEAD
    marginTop: 10, 
    overflow: 'hidden' 
  },
  preenchimentoProgresso: { 
    height: '100%', 
    backgroundColor: CORES.primaria 
  },

=======
    marginTop: ESPACAMENTO.sm, 
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: CORES.borda,
  },

  preenchimentoProgresso: { 
    height: '100%', 
    backgroundColor: CORES.primaria,
    borderRadius: 4,
  },

  // ==================== LAYOUTS ====================
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
  linha: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
<<<<<<< HEAD
=======

>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
  linhaEntre: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },

<<<<<<< HEAD
  rotulo: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: CORES.textoEscuro, 
    marginBottom: 8 
  },

=======
  colunaEntre: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  centralizado: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ==================== LABELS E ROTULOS ====================
  rotulo: { 
    fontSize: TAMANHOS_FONTE.medio, 
    fontWeight: '600', 
    color: CORES.textoEscuro, 
    marginBottom: ESPACAMENTO.sm,
  },

  badge: {
    backgroundColor: CORES.primaria,
    paddingHorizontal: ESPACAMENTO.sm,
    paddingVertical: ESPACAMENTO.xs,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },

  badgeTexto: {
    color: CORES.branco,
    fontSize: TAMANHOS_FONTE.mini,
    fontWeight: 'bold',
  },

  // ==================== ITENS DE LISTA ====================
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CORES.fundoClaro,
<<<<<<< HEAD
    padding: 15,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 8,
=======
    padding: ESPACAMENTO.lg,
    marginHorizontal: ESPACAMENTO.md,
    marginVertical: ESPACAMENTO.xs,
    borderRadius: 10,
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
    elevation: 2,
    borderWidth: 1,
    borderColor: CORES.borda,
  },
<<<<<<< HEAD
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

=======

  itemTexto: { 
    fontSize: TAMANHOS_FONTE.medio, 
    color: CORES.textoEscuro, 
    marginLeft: ESPACAMENTO.md, 
    flex: 1,
    lineHeight: 22,
  },

  // ==================== CABEÇALHOS ====================
  cabecalho: { 
    backgroundColor: CORES.fundoClaro, 
    padding: ESPACAMENTO.xl, 
    borderBottomWidth: 1, 
    borderBottomColor: CORES.borda,
    elevation: 2,
  },

  // ==================== ESTADOS VAZIOS ====================
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
  vazioContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
<<<<<<< HEAD
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

=======
    paddingTop: height * 0.15,
    paddingHorizontal: ESPACAMENTO.xl,
  },

  vazioMensagem: { 
    fontSize: TAMANHOS_FONTE.titulo, 
    color: CORES.cinzaMedio, 
    marginTop: ESPACAMENTO.xl,
    fontWeight: '600',
    textAlign: 'center',
  },

  vazioSubmensagem: { 
    fontSize: TAMANHOS_FONTE.normal, 
    color: CORES.cinzaClaro, 
    marginTop: ESPACAMENTO.sm,
    textAlign: 'center',
  },

  // ==================== MODAIS ====================
  modalOverlay: { 
    flex: 1, 
    backgroundColor: CORES.overlay, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: ESPACAMENTO.lg,
  },

  modalContainer: { 
    backgroundColor: CORES.fundoClaro, 
    borderRadius: 16, 
    padding: ESPACAMENTO.xxl, 
    width: '90%', 
    maxWidth: 400,
    borderWidth: 2,
    borderColor: CORES.primaria,
    elevation: 10,
  },

  modalTitulo: { 
    fontSize: TAMANHOS_FONTE.titulo, 
    fontWeight: 'bold', 
    marginBottom: ESPACAMENTO.lg,
    color: CORES.textoEscuro,
  },

  modalMensagem: { 
    fontSize: TAMANHOS_FONTE.medio, 
    color: CORES.textoMedio, 
    marginBottom: ESPACAMENTO.xxl,
    lineHeight: 22,
  },

  modalBotoes: { 
    flexDirection: 'row', 
    justifyContent: 'flex-end',
    gap: ESPACAMENTO.md,
  },

  modalBotaoCancelar: { 
    padding: ESPACAMENTO.md,
    paddingHorizontal: ESPACAMENTO.lg,
    borderRadius: 8,
    backgroundColor: CORES.cinzaEscuro,
  },

  modalBotaoConfirmar: { 
    backgroundColor: CORES.primaria, 
    padding: ESPACAMENTO.md, 
    paddingHorizontal: ESPACAMENTO.xl, 
    borderRadius: 8,
    elevation: 2,
  },

  // ==================== ALERTAS E NOTIFICAÇÕES ====================
  bannerErro: { 
    backgroundColor: 'rgba(255, 61, 0, 0.15)', 
    padding: ESPACAMENTO.lg, 
    borderRadius: 10, 
    marginBottom: ESPACAMENTO.lg, 
    borderLeftWidth: 4, 
    borderLeftColor: CORES.perigo,
  },

  bannerSucesso: {
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
    padding: ESPACAMENTO.lg,
    borderRadius: 10,
    marginBottom: ESPACAMENTO.lg,
    borderLeftWidth: 4,
    borderLeftColor: CORES.sucesso,
  },

  bannerInfo: {
    backgroundColor: 'rgba(33, 150, 243, 0.15)',
    padding: ESPACAMENTO.lg,
    borderRadius: 10,
    marginBottom: ESPACAMENTO.lg,
    borderLeftWidth: 4,
    borderLeftColor: CORES.info,
  },

  textoErro: { 
    color: CORES.perigo, 
    fontWeight: '600',
    fontSize: TAMANHOS_FONTE.medio,
  },

  textoSucesso: {
    color: CORES.sucesso,
    fontWeight: '600',
    fontSize: TAMANHOS_FONTE.medio,
  },

  // ==================== IMAGENS ====================
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
  imagemMercado: { 
    width: 70, 
    height: 70, 
    borderRadius: 10, 
<<<<<<< HEAD
    backgroundColor: CORES.cinzaEscuro 
  },
  imagemMercadoGrande: { 
    width: '100%', 
    height: 250, 
    backgroundColor: CORES.cinzaEscuro 
  },
=======
    backgroundColor: CORES.cinzaEscuro,
    borderWidth: 1,
    borderColor: CORES.borda,
  },

  imagemMercadoGrande: { 
    width: '100%', 
    height: 250, 
    backgroundColor: CORES.cinzaEscuro,
  },

>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
  imagemProduto: { 
    width: 70, 
    height: 70, 
    borderRadius: 8, 
<<<<<<< HEAD
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

=======
    backgroundColor: CORES.fundoClaro,
    borderWidth: 1,
    borderColor: CORES.borda,
  },

  // ==================== BADGES E TAGS ====================
  badgePromocao: { 
    position: 'absolute', 
    top: ESPACAMENTO.sm, 
    right: ESPACAMENTO.sm, 
    backgroundColor: CORES.alerta, 
    paddingHorizontal: ESPACAMENTO.sm, 
    paddingVertical: ESPACAMENTO.xs, 
    borderRadius: 6, 
    zIndex: 10,
    elevation: 3,
  },

  textoBadge: { 
    color: CORES.branco, 
    fontSize: TAMANHOS_FONTE.mini, 
    fontWeight: 'bold' 
  },

  tag: {
    backgroundColor: CORES.cinzaEscuro,
    paddingHorizontal: ESPACAMENTO.md,
    paddingVertical: ESPACAMENTO.sm,
    borderRadius: 16,
    marginRight: ESPACAMENTO.sm,
    marginBottom: ESPACAMENTO.sm,
    borderWidth: 1,
    borderColor: CORES.borda,
  },

  tagTexto: {
    color: CORES.textoMedio,
    fontSize: TAMANHOS_FONTE.pequeno,
    fontWeight: '500',
  },

  // ==================== RODAPÉ ====================
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
  rodapeFixo: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
<<<<<<< HEAD
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
=======
    padding: ESPACAMENTO.lg, 
    backgroundColor: CORES.fundoEscuro, 
    borderTopWidth: 1, 
    borderTopColor: CORES.borda,
    elevation: 8,
  },

  // ==================== DIVISORES ====================
  divisor: {
    height: 1,
    backgroundColor: CORES.borda,
    marginVertical: ESPACAMENTO.md,
  },

  divisorGrosso: {
    height: 2,
    backgroundColor: CORES.borda,
    marginVertical: ESPACAMENTO.lg,
  },

  // ==================== UTILITÁRIOS ====================
  sombra: {
    elevation: 4,
    shadowColor: CORES.preto,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  sombraForte: {
    elevation: 8,
    shadowColor: CORES.preto,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  // ==================== ESPAÇAMENTOS ====================
  mt_xs: { marginTop: ESPACAMENTO.xs },
  mt_sm: { marginTop: ESPACAMENTO.sm },
  mt_md: { marginTop: ESPACAMENTO.md },
  mt_lg: { marginTop: ESPACAMENTO.lg },
  mt_xl: { marginTop: ESPACAMENTO.xl },

  mb_xs: { marginBottom: ESPACAMENTO.xs },
  mb_sm: { marginBottom: ESPACAMENTO.sm },
  mb_md: { marginBottom: ESPACAMENTO.md },
  mb_lg: { marginBottom: ESPACAMENTO.lg },
  mb_xl: { marginBottom: ESPACAMENTO.xl },

  p_xs: { padding: ESPACAMENTO.xs },
  p_sm: { padding: ESPACAMENTO.sm },
  p_md: { padding: ESPACAMENTO.md },
  p_lg: { padding: ESPACAMENTO.lg },
  p_xl: { padding: ESPACAMENTO.xl },
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
});