import AsyncStorage from '@react-native-async-storage/async-storage';
import { Vibration, Alert } from 'react-native';

const CHAVE_LISTAS = 'shoppingLists';

// ==================== ARMAZENAMENTO ====================
export const armazenamento = {
  async obterTodasListas() {
    try {
      const dados = await AsyncStorage.getItem(CHAVE_LISTAS);
      return dados ? JSON.parse(dados) : [];
    } catch (erro) {
      console.error('Erro:', erro);
      return [];
    }
  },

  async obterListasAtivas() {
    const todas = await this.obterTodasListas();
    return todas.filter(lista => !lista.concluida);
  },

  async obterListasConcluidas() {
    const todas = await this.obterTodasListas();
    return todas.filter(lista => lista.concluida);
  },

  async obterListaPorId(id) {
    const todas = await this.obterTodasListas();
    return todas.find(lista => lista.id === id);
  },

  async salvarLista(novaLista) {
    try {
      const listas = await this.obterTodasListas();
      listas.push(novaLista);
      await AsyncStorage.setItem(CHAVE_LISTAS, JSON.stringify(listas));
      return true;
    } catch (erro) {
      return false;
    }
  },

  async atualizarLista(id, listaAtualizada) {
    try {
      const listas = await this.obterTodasListas();
      const indice = listas.findIndex(l => l.id === id);
      if (indice !== -1) {
        listas[indice] = listaAtualizada;
        await AsyncStorage.setItem(CHAVE_LISTAS, JSON.stringify(listas));
        return true;
      }
      return false;
    } catch (erro) {
      return false;
    }
  },

  async excluirLista(id) {
    try {
      const listas = await this.obterTodasListas();
      const novas = listas.filter(lista => lista.id !== id);
      await AsyncStorage.setItem(CHAVE_LISTAS, JSON.stringify(novas));
      return true;
    } catch (erro) {
      return false;
    }
  },

  async concluirLista(id) {
    const lista = await this.obterListaPorId(id);
    if (lista) {
      lista.concluida = true;
      return await this.atualizarLista(id, lista);
    }
    return false;
  },
};

// ==================== FEEDBACK ====================
export const feedback = {
  vibrarCurto() {
    Vibration.vibrate(30);
  },

  vibrarSucesso() {
    Vibration.vibrate([0, 50, 100, 50]);
  },

  confirmarExclusao(titulo, mensagem, aoConfirmar) {
    Alert.alert(titulo, mensagem, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          this.vibrarCurto();
          aoConfirmar();
        },
      },
    ]);
  },

  mostrarSucesso(titulo, mensagem, aoFechar) {
    this.vibrarSucesso();
    Alert.alert(titulo, mensagem, [{ text: 'OK', onPress: aoFechar }]);
  },

  mostrarErro(mensagem) {
    Alert.alert('Erro', mensagem);
  },
};

// ==================== CÁLCULOS ====================
export const calculos = {
  calcularProgresso(itens) {
    const total = itens.length;
    const concluidos = itens.filter(item => item.marcado).length;
    return total > 0 ? (concluidos / total) * 100 : 0;
  },

  formatarData(dataISO) {
    return new Date(dataISO).toLocaleDateString('pt-BR');
  },

  gerarId() {
    return Date.now().toString();
  },
};