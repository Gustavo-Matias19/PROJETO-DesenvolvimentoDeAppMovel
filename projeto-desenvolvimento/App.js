import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

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
  );
}

// ==================== NAVEGADOR PRINCIPAL (Stack) ====================
export default function App() {
  return (
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
  );
}