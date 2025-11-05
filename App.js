import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar, ActivityIndicator, View } from 'react-native';

// Importa estilos e telas
import { CORES, estilos } from './src/styles';
import {
  TelaInicial,
  TelaCriarLista,
  TelaDetalhesLista,
  TelaComparadorPrecos,
  TelaReceitasSugeridas,
  TelaHistorico,
  TelaRelatorios
} from './src/main';

// Importa telas de autenticação
import { TelaLogin, TelaCadastro, TelaEsqueceuSenha } from './src/auth';

// Importa telas admin
import {
  TelaPainelAdmin,
  TelaAdminReceitas,
  TelaAdminNovaReceita,
  TelaAdminProdutos,
  TelaAdminUsuarios
} from './src/admin';

import { armazenamento } from './src/funcoes';

// ==================== CONFIGURAÇÃO DE NAVEGAÇÃO ====================

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// ==================== NAVEGADOR DE ABAS (Bottom Tabs) ====================
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const icons = {
            'Listas': 'shopping-cart',
            'Comparar': 'compare-arrows',
            'Receitas': 'restaurant-menu',
            'Histórico': 'history',
            'Relatórios': 'bar-chart'
          };
          return <MaterialIcons name={icons[route.name] || 'home'} size={size} color={color} />;
        },
        tabBarActiveTintColor: CORES.primaria,
        tabBarInactiveTintColor: CORES.cinzaMedio,
        tabBarLabelStyle: { 
          fontSize: 11, 
          fontWeight: '600',
          marginBottom: 4
        },
        tabBarStyle: {
          backgroundColor: CORES.fundoClaro,
          borderTopColor: CORES.borda,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 4
        }
      })}
    >
      <Tab.Screen name="Listas" component={TelaInicial} />
      <Tab.Screen name="Comparar" component={TelaComparadorPrecos} />
      <Tab.Screen name="Receitas" component={TelaReceitasSugeridas} />
      <Tab.Screen name="Histórico" component={TelaHistorico} />
      <Tab.Screen name="Relatórios" component={TelaRelatorios} />
    </Tab.Navigator>
  );
}

// ==================== NAVEGADOR ADMIN ====================
function AdminNavigator({ onLogout }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { 
          backgroundColor: CORES.fundoClaro,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: CORES.borda
        },
        headerTintColor: CORES.textoEscuro,
        headerTitleStyle: { 
          fontWeight: 'bold',
          fontSize: 18
        },
        headerTitleAlign: 'center',
        cardStyle: { backgroundColor: CORES.fundoEscuro },
      }}
    >
      <Stack.Screen 
        name="PainelAdmin" 
        options={{ headerShown: false }}
      >
        {props => <TelaPainelAdmin {...props} onLogout={onLogout} />}
      </Stack.Screen>
      
      <Stack.Screen 
        name="AdminReceitas" 
        component={TelaAdminReceitas}
        options={{ title: 'Gerenciar Receitas' }}
      />
      
      <Stack.Screen 
        name="AdminNovaReceita" 
        component={TelaAdminNovaReceita}
        options={{ title: 'Nova Receita' }}
      />
      
      <Stack.Screen 
        name="AdminProdutos" 
        component={TelaAdminProdutos}
        options={{ title: 'Gerenciar Produtos' }}
      />
      
      <Stack.Screen 
        name="AdminUsuarios" 
        component={TelaAdminUsuarios}
        options={{ title: 'Usuários' }}
      />
    </Stack.Navigator>
  );
}

// ==================== APP PRINCIPAL ====================
export default function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    verificarLogin();
  }, []);

  const verificarLogin = async () => {
    try {
      const usuario = await armazenamento.obterUsuarioLogado();
      setUsuarioLogado(usuario);
    } catch (erro) {
      console.error('Erro ao verificar login:', erro);
    } finally {
      setCarregando(false);
    }
  };

  const handleLogin = async (usuario) => {
    setUsuarioLogado(usuario);
  };

  const handleLogout = async () => {
    await armazenamento.limparUsuarioLogado();
    setUsuarioLogado(null);
  };

  if (carregando) {
    return (
      <View style={estilos.containerCentralizado}>
        <ActivityIndicator size="large" color={CORES.primaria} />
      </View>
    );
  }

  return (
    <>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={CORES.fundoEscuro}
      />
      <NavigationContainer>
        {!usuarioLogado ? (
          // NAVEGAÇÃO DE AUTENTICAÇÃO
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: CORES.fundoEscuro },
            }}
          >
            <Stack.Screen name="Login">
              {props => <TelaLogin {...props} onLogin={handleLogin} />}
            </Stack.Screen>
            <Stack.Screen name="Cadastro" component={TelaCadastro} />
            <Stack.Screen name="EsqueceuSenha" component={TelaEsqueceuSenha} />
          </Stack.Navigator>
        ) : usuarioLogado.tipo === 'admin' ? (
          // NAVEGAÇÃO ADMIN
          <AdminNavigator onLogout={handleLogout} />
        ) : (
          // NAVEGAÇÃO USUÁRIO NORMAL
          <Stack.Navigator
            screenOptions={{
              headerStyle: { 
                backgroundColor: CORES.fundoClaro,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 1,
                borderBottomColor: CORES.borda
              },
              headerTintColor: CORES.textoEscuro,
              headerTitleStyle: { 
                fontWeight: 'bold',
                fontSize: 18
              },
              headerTitleAlign: 'center',
              cardStyle: { backgroundColor: CORES.fundoEscuro },
              cardStyleInterpolator: ({ current, layouts }) => {
                return {
                  cardStyle: {
                    opacity: current.progress,
                  },
                };
              },
            }}
          >
            <Stack.Screen 
              name="Home" 
              component={TabNavigator} 
              options={{ 
                headerShown: false 
              }} 
            />
            
            <Stack.Screen 
              name="CriarLista" 
              component={TelaCriarLista} 
              options={{ 
                title: '🛒 Nova Lista',
                headerBackTitle: 'Voltar'
              }} 
            />
            
            <Stack.Screen 
              name="DetalhesLista" 
              component={TelaDetalhesLista} 
              options={{ 
                title: 'Detalhes',
                headerBackTitle: 'Voltar'
              }} 
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
}