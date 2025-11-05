import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView, 
  KeyboardAvoidingView, Platform, ActivityIndicator, Image
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { estilos, CORES } from './styles';
import { armazenamento, utils, feedback } from './funcoes';

// ==================== TELA: LOGIN ====================
export function TelaLogin({ navigation, onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const mostrarErro = (mensagem) => {
    feedback.vibrarAlerta();
    setErro(mensagem);
    setTimeout(() => setErro(''), 3000);
  };

  const fazerLogin = async () => {
    const emailTrim = email.trim().toLowerCase();
    const senhaTrim = senha.trim();

    // Validações
    if (!emailTrim || !senhaTrim) {
      mostrarErro('Preencha todos os campos');
      return;
    }

    try {
      setCarregando(true);

      // Login ADMIN
      if (emailTrim === 'admin' && senhaTrim === 'admin') {
        feedback.vibrarSucesso();
        await armazenamento.salvarUsuarioLogado({
          email: 'admin',
          nome: 'Administrador',
          tipo: 'admin'
        });
        onLogin({ tipo: 'admin', nome: 'Administrador' });
        return;
      }

      // Login de usuário normal
      const usuarios = await armazenamento.obterUsuarios();
      const usuario = usuarios.find(u => u.email === emailTrim && u.senha === senhaTrim);

      if (!usuario) {
        mostrarErro('Email ou senha incorretos');
        return;
      }

      feedback.vibrarSucesso();
      await armazenamento.salvarUsuarioLogado({
        email: usuario.email,
        nome: usuario.nome,
        tipo: 'usuario'
      });
      onLogin({ tipo: 'usuario', nome: usuario.nome });

    } catch (erro) {
      console.error('Erro ao fazer login:', erro);
      mostrarErro('Erro ao fazer login');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={estilos.container}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[estilos.conteudo, { justifyContent: 'center', minHeight: '100%' }]}>
          {/* LOGO */}
          <View style={[estilos.centralizado, { marginBottom: 40 }]}>
            <View style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: CORES.primaria,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20
            }}>
              <MaterialIcons name="shopping-cart" size={50} color={CORES.branco} />
            </View>
            <Text style={[estilos.titulo, { fontSize: 32, marginBottom: 0 }]}>SmartCart</Text>
            <Text style={estilos.textoPequeno}>Suas compras inteligentes</Text>
          </View>

          {/* ERRO */}
          {erro !== '' && (
            <View style={estilos.bannerErro}>
              <Text style={estilos.textoErro}>⚠️ {erro}</Text>
            </View>
          )}

          {/* CAMPO EMAIL */}
          <Text style={estilos.rotulo}>Email ou Usuário</Text>
          <View style={[estilos.inputContainer]}>
            <MaterialIcons name="person" size={20} color={CORES.textoClaro} style={{ marginRight: 10 }} />
            <TextInput
              style={[estilos.input, { flex: 1, marginBottom: 0 }]}
              placeholder="Digite seu email"
              placeholderTextColor={CORES.textoClaro}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
            />
          </View>

          {/* CAMPO SENHA */}
          <Text style={[estilos.rotulo, estilos.mt_md]}>Senha</Text>
          <View style={[estilos.inputContainer]}>
            <MaterialIcons name="lock" size={20} color={CORES.textoClaro} style={{ marginRight: 10 }} />
            <TextInput
              style={[estilos.input, { flex: 1, marginBottom: 0 }]}
              placeholder="Digite sua senha"
              placeholderTextColor={CORES.textoClaro}
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!mostrarSenha}
              returnKeyType="go"
              onSubmitEditing={fazerLogin}
            />
            <TouchableOpacity
              onPress={() => setMostrarSenha(!mostrarSenha)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MaterialIcons
                name={mostrarSenha ? "visibility" : "visibility-off"}
                size={20}
                color={CORES.textoClaro}
              />
            </TouchableOpacity>
          </View>

          {/* ESQUECEU SENHA */}
          <TouchableOpacity
            onPress={() => {
              feedback.vibrarCurto();
              navigation.navigate('EsqueceuSenha');
            }}
            style={{ alignSelf: 'flex-end', marginTop: 10 }}
          >
            <Text style={[estilos.textoPequeno, { color: CORES.primaria }]}>
              Esqueceu a senha?
            </Text>
          </TouchableOpacity>

          {/* BOTÃO LOGIN */}
          <TouchableOpacity
            style={[estilos.botaoPrimario, estilos.mt_xl]}
            onPress={fazerLogin}
            disabled={carregando}
            activeOpacity={0.7}
          >
            {carregando ? (
              <ActivityIndicator color={CORES.branco} />
            ) : (
              <View style={estilos.linha}>
                <MaterialIcons name="login" size={22} color={CORES.branco} />
                <Text style={[estilos.textoBotao, { marginLeft: 8 }]}>Entrar</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* DICA ADMIN */}
          <View style={[estilos.bannerInfo, estilos.mt_lg]}>
            <Text style={[estilos.textoMini, { color: CORES.info, textAlign: 'center' }]}>
              💡 Dica: Use "admin" / "admin" para acessar o modo administrador
            </Text>
          </View>

          {/* CRIAR CONTA */}
          <View style={[estilos.linha, estilos.mt_xl, { justifyContent: 'center' }]}>
            <Text style={estilos.textoPequeno}>Não tem uma conta? </Text>
            <TouchableOpacity
              onPress={() => {
                feedback.vibrarCurto();
                navigation.navigate('Cadastro');
              }}
            >
              <Text style={[estilos.textoPequeno, { color: CORES.primaria, fontWeight: 'bold' }]}>
                Criar conta
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ==================== TELA: CADASTRO ====================
export function TelaCadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(false);

  const mostrarErro = (mensagem) => {
    feedback.vibrarAlerta();
    setErro(mensagem);
    setTimeout(() => setErro(''), 3000);
  };

  const mostrarSucesso = (mensagem) => {
    setSucesso(mensagem);
    setTimeout(() => setSucesso(''), 2000);
  };

  const validarEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const criarConta = async () => {
    const nomeTrim = nome.trim();
    const emailTrim = email.trim().toLowerCase();
    const senhaTrim = senha.trim();

    // Validações
    if (!nomeTrim || !emailTrim || !senhaTrim || !confirmarSenha) {
      mostrarErro('Preencha todos os campos');
      return;
    }

    if (nomeTrim.length < 3) {
      mostrarErro('Nome deve ter no mínimo 3 caracteres');
      return;
    }

    if (!validarEmail(emailTrim)) {
      mostrarErro('Email inválido');
      return;
    }

    if (senhaTrim.length < 4) {
      mostrarErro('Senha deve ter no mínimo 4 caracteres');
      return;
    }

    if (senhaTrim !== confirmarSenha) {
      mostrarErro('As senhas não coincidem');
      return;
    }

    if (emailTrim === 'admin') {
      mostrarErro('Este email não pode ser usado');
      return;
    }

    try {
      setCarregando(true);

      // Verifica se email já existe
      const usuarios = await armazenamento.obterUsuarios();
      if (usuarios.some(u => u.email === emailTrim)) {
        mostrarErro('Email já cadastrado');
        return;
      }

      // Cria novo usuário
      const novoUsuario = {
        id: utils.gerarId(),
        nome: nomeTrim,
        email: emailTrim,
        senha: senhaTrim,
        dataCriacao: new Date().toISOString()
      };

      await armazenamento.adicionarUsuario(novoUsuario);
      feedback.vibrarSucesso();
      mostrarSucesso('Conta criada com sucesso!');

      setTimeout(() => {
        navigation.goBack();
      }, 1500);

    } catch (erro) {
      console.error('Erro ao criar conta:', erro);
      mostrarErro('Erro ao criar conta');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={estilos.container}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={estilos.conteudo}>
          {/* CABEÇALHO */}
          <View style={[estilos.centralizado, estilos.mt_lg, { marginBottom: 30 }]}>
            <MaterialIcons name="person-add" size={60} color={CORES.primaria} />
            <Text style={[estilos.titulo, { marginTop: 15 }]}>Criar Conta</Text>
            <Text style={estilos.textoPequeno}>Preencha os dados abaixo</Text>
          </View>

          {/* ERRO */}
          {erro !== '' && (
            <View style={estilos.bannerErro}>
              <Text style={estilos.textoErro}>⚠️ {erro}</Text>
            </View>
          )}

          {/* SUCESSO */}
          {sucesso !== '' && (
            <View style={estilos.bannerSucesso}>
              <Text style={estilos.textoSucesso}>✅ {sucesso}</Text>
            </View>
          )}

          {/* CAMPO NOME */}
          <Text style={estilos.rotulo}>Nome Completo *</Text>
          <View style={estilos.inputContainer}>
            <MaterialIcons name="person" size={20} color={CORES.textoClaro} style={{ marginRight: 10 }} />
            <TextInput
              style={[estilos.input, { flex: 1, marginBottom: 0 }]}
              placeholder="Digite seu nome"
              placeholderTextColor={CORES.textoClaro}
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
              returnKeyType="next"
              maxLength={50}
            />
          </View>

          {/* CAMPO EMAIL */}
          <Text style={[estilos.rotulo, estilos.mt_md]}>Email *</Text>
          <View style={estilos.inputContainer}>
            <MaterialIcons name="email" size={20} color={CORES.textoClaro} style={{ marginRight: 10 }} />
            <TextInput
              style={[estilos.input, { flex: 1, marginBottom: 0 }]}
              placeholder="Digite seu email"
              placeholderTextColor={CORES.textoClaro}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
            />
          </View>

          {/* CAMPO SENHA */}
          <Text style={[estilos.rotulo, estilos.mt_md]}>Senha *</Text>
          <View style={estilos.inputContainer}>
            <MaterialIcons name="lock" size={20} color={CORES.textoClaro} style={{ marginRight: 10 }} />
            <TextInput
              style={[estilos.input, { flex: 1, marginBottom: 0 }]}
              placeholder="Mínimo 4 caracteres"
              placeholderTextColor={CORES.textoClaro}
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!mostrarSenha}
              returnKeyType="next"
            />
            <TouchableOpacity
              onPress={() => setMostrarSenha(!mostrarSenha)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MaterialIcons
                name={mostrarSenha ? "visibility" : "visibility-off"}
                size={20}
                color={CORES.textoClaro}
              />
            </TouchableOpacity>
          </View>

          {/* CAMPO CONFIRMAR SENHA */}
          <Text style={[estilos.rotulo, estilos.mt_md]}>Confirmar Senha *</Text>
          <View style={estilos.inputContainer}>
            <MaterialIcons name="lock" size={20} color={CORES.textoClaro} style={{ marginRight: 10 }} />
            <TextInput
              style={[estilos.input, { flex: 1, marginBottom: 0 }]}
              placeholder="Digite a senha novamente"
              placeholderTextColor={CORES.textoClaro}
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry={!mostrarSenha}
              returnKeyType="go"
              onSubmitEditing={criarConta}
            />
          </View>

          {/* BOTÃO CRIAR CONTA */}
          <TouchableOpacity
            style={[estilos.botaoPrimario, estilos.mt_xl]}
            onPress={criarConta}
            disabled={carregando}
            activeOpacity={0.7}
          >
            {carregando ? (
              <ActivityIndicator color={CORES.branco} />
            ) : (
              <View style={estilos.linha}>
                <MaterialIcons name="check-circle" size={22} color={CORES.branco} />
                <Text style={[estilos.textoBotao, { marginLeft: 8 }]}>Criar Conta</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* VOLTAR PARA LOGIN */}
          <View style={[estilos.linha, estilos.mt_lg, { justifyContent: 'center' }]}>
            <Text style={estilos.textoPequeno}>Já tem uma conta? </Text>
            <TouchableOpacity
              onPress={() => {
                feedback.vibrarCurto();
                navigation.goBack();
              }}
            >
              <Text style={[estilos.textoPequeno, { color: CORES.primaria, fontWeight: 'bold' }]}>
                Fazer login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ==================== TELA: ESQUECEU SENHA ====================
export function TelaEsqueceuSenha({ navigation }) {
  const [email, setEmail] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(false);

  const mostrarErro = (mensagem) => {
    feedback.vibrarAlerta();
    setErro(mensagem);
    setTimeout(() => setErro(''), 3000);
  };

  const mostrarSucesso = (mensagem) => {
    setSucesso(mensagem);
    setTimeout(() => setSucesso(''), 2000);
  };

  const recuperarSenha = async () => {
    const emailTrim = email.trim().toLowerCase();

    if (!emailTrim) {
      mostrarErro('Digite seu email');
      return;
    }

    try {
      setCarregando(true);

      const usuarios = await armazenamento.obterUsuarios();
      const usuario = usuarios.find(u => u.email === emailTrim);

      if (!usuario) {
        mostrarErro('Email não encontrado');
        return;
      }

      // Simula envio de email
      feedback.vibrarSucesso();
      mostrarSucesso('Instruções enviadas para o email!');

      // Em um app real, enviaria email com link de recuperação
      setTimeout(() => {
        navigation.goBack();
      }, 2000);

    } catch (erro) {
      console.error('Erro ao recuperar senha:', erro);
      mostrarErro('Erro ao recuperar senha');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={estilos.container}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[estilos.conteudo, { justifyContent: 'center', minHeight: '100%' }]}>
          {/* CABEÇALHO */}
          <View style={[estilos.centralizado, { marginBottom: 40 }]}>
            <MaterialIcons name="lock-reset" size={70} color={CORES.primaria} />
            <Text style={[estilos.titulo, { marginTop: 20 }]}>Esqueceu a Senha?</Text>
            <Text style={[estilos.textoPequeno, { textAlign: 'center', marginTop: 10 }]}>
              Digite seu email e enviaremos instruções para redefinir sua senha
            </Text>
          </View>

          {/* ERRO */}
          {erro !== '' && (
            <View style={estilos.bannerErro}>
              <Text style={estilos.textoErro}>⚠️ {erro}</Text>
            </View>
          )}

          {/* SUCESSO */}
          {sucesso !== '' && (
            <View style={estilos.bannerSucesso}>
              <Text style={estilos.textoSucesso}>✅ {sucesso}</Text>
            </View>
          )}

          {/* CAMPO EMAIL */}
          <Text style={estilos.rotulo}>Email</Text>
          <View style={estilos.inputContainer}>
            <MaterialIcons name="email" size={20} color={CORES.textoClaro} style={{ marginRight: 10 }} />
            <TextInput
              style={[estilos.input, { flex: 1, marginBottom: 0 }]}
              placeholder="Digite seu email"
              placeholderTextColor={CORES.textoClaro}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="send"
              onSubmitEditing={recuperarSenha}
            />
          </View>

          {/* BOTÃO RECUPERAR */}
          <TouchableOpacity
            style={[estilos.botaoPrimario, estilos.mt_xl]}
            onPress={recuperarSenha}
            disabled={carregando}
            activeOpacity={0.7}
          >
            {carregando ? (
              <ActivityIndicator color={CORES.branco} />
            ) : (
              <View style={estilos.linha}>
                <MaterialIcons name="send" size={22} color={CORES.branco} />
                <Text style={[estilos.textoBotao, { marginLeft: 8 }]}>Enviar Instruções</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* VOLTAR */}
          <TouchableOpacity
            style={[estilos.botaoOutline, estilos.mt_md]}
            onPress={() => {
              feedback.vibrarCurto();
              navigation.goBack();
            }}
            activeOpacity={0.7}
          >
            <View style={estilos.linha}>
              <MaterialIcons name="arrow-back" size={20} color={CORES.primaria} />
              <Text style={[estilos.textoBotao, { marginLeft: 8, color: CORES.primaria }]}>
                Voltar para Login
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}