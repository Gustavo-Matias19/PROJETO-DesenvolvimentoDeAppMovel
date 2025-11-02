import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
<<<<<<< HEAD
=======
import { StatusBar } from 'react-native';
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)

// Importa estilos e telas
import { CORES } from './src/styles';
import {
  TelaInicial,
  TelaCriarLista,
  TelaDetalhesLista,
  TelaComparadorPrecos,
  TelaReceitasSugeridas,
  TelaHistorico,
  TelaRelatorios
} from './src/main';

// ==================== CONFIGURAÇÃO DE NAVEGAÇÃO ====================

<<<<<<< HEAD
// Renomeando as variáveis de navegação
const Pilha = createStackNavigator(); // Stack
const AbasNavegador = createBottomTabNavigator(); // Tab

// ==================== NAVEGADOR DE ABAS (Bottom Tabs) ====================
function NavegadorAbas() {
  return (
    <AbasNavegador.Navigator
      screenOptions={({ route }) => ({
        // Esconde o cabeçalho, pois a Pilha (Stack) principal o controla
        headerShown: false, 
        
        // Configuração dos Ícones das Abas
        tabBarIcon: ({ color, size }) => {
          let nomeIcone = 'help';
          switch (route.name) {
            case 'Minhas Listas': nomeIcone = 'shopping-cart'; break;
            case 'Comparar': nomeIcone = 'compare-arrows'; break;
            case 'Receitas': nomeIcone = 'restaurant-menu'; break;
            case 'Histórico': nomeIcone = 'history'; break;
            case 'Relatórios': nomeIcone = 'bar-chart'; break;
            default: nomeIcone = 'home';
          }
          return <MaterialIcons name={nomeIcone} size={size} color={color} />;
        },
        
        // Estilos das Abas
        tabBarActiveTintColor: CORES.primaria,
        tabBarInactiveTintColor: CORES.cinzaMedio,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
      })}
    >
      {/* Telas que aparecem nas abas */}
      <AbasNavegador.Screen name="Minhas Listas" component={TelaInicial} />
      <AbasNavegador.Screen name="Comparar" component={TelaComparadorPrecos} />
      <AbasNavegador.Screen name="Receitas" component={TelaReceitasSugeridas} />
      <AbasNavegador.Screen name="Histórico" component={TelaHistorico} />
      <AbasNavegador.Screen name="Relatórios" component={TelaRelatorios} />
    </AbasNavegador.Navigator>
=======
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
      <Tab.Screen 
        name="Listas" 
        component={TelaInicial}
        options={{ tabBarBadge: null }} // Pode adicionar contador aqui
      />
      <Tab.Screen name="Comparar" component={TelaComparadorPrecos} />
      <Tab.Screen name="Receitas" component={TelaReceitasSugeridas} />
      <Tab.Screen name="Histórico" component={TelaHistorico} />
      <Tab.Screen name="Relatórios" component={TelaRelatorios} />
    </Tab.Navigator>
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
  );
}

// ==================== NAVEGADOR PRINCIPAL (Stack) ====================
export default function App() {
  return (
<<<<<<< HEAD
    <NavigationContainer>
      <Pilha.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: CORES.primaria },
          headerTintColor: CORES.branco,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* A tela "Abas" é a tela inicial (Home) e não tem cabeçalho próprio */}
        <Pilha.Screen name="Principal" component={NavegadorAbas} options={{ headerShown: false }} />
        
        {/* Telas que abrem sobre as abas */}
        <Pilha.Screen 
          name="CriarLista" 
          component={TelaCriarLista} 
          options={{ title: 'Nova Lista de Compras' }} 
        />
        <Pilha.Screen 
          name="DetalhesLista" 
          component={TelaDetalhesLista} 
          options={{ title: 'Detalhes da Lista' }} 
        />
      </Pilha.Navigator>
    </NavigationContainer>
=======
    <>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={CORES.fundoEscuro}
      />
      <NavigationContainer>
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
            // Animação de transição
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
            options={{ headerShown: false }} 
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
      </NavigationContainer>
    </>
>>>>>>> fb16ae4 (Subindo projeto novamente com melhorias)
  );
}