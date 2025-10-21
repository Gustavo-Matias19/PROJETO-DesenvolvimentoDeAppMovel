import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
<<<<<<< HEAD
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
=======

import { TelaInicial, TelaCriarLista, TelaDetalhesLista, TelaMercadosProximos, TelaHistorico } from './src/main';
import { CORES } from './src/styles';
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Abas() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
<<<<<<< HEAD
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let icone = 'help';
          switch (route.name) {
            case 'Listas': icone = 'shopping-cart'; break;
            case 'Comparador': icone = 'compare-arrows'; break;
            case 'Receitas': icone = 'restaurant-menu'; break;
            case 'Histórico': icone = 'history'; break;
            case 'Relatórios': icone = 'bar-chart'; break;
          }
=======
        tabBarIcon: ({ color, size }) => {
          let icone;
          if (route.name === 'Listas') icone = 'shopping-cart';
          else if (route.name === 'Mercados') icone = 'store';
          else if (route.name === 'Histórico') icone = 'history';
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
          return <MaterialIcons name={icone} size={size} color={color} />;
        },
        tabBarActiveTintColor: CORES.primaria,
        tabBarInactiveTintColor: CORES.cinzaMedio,
<<<<<<< HEAD
        tabBarLabelStyle: { fontSize: 11 },
      })}
    >
      <Tab.Screen name="Listas" component={TelaInicial} />
      <Tab.Screen name="Comparador" component={TelaComparadorPrecos} />
      <Tab.Screen name="Receitas" component={TelaReceitasSugeridas} />
      <Tab.Screen name="Histórico" component={TelaHistorico} />
      <Tab.Screen name="Relatórios" component={TelaRelatorios} />
=======
      })}
    >
      <Tab.Screen name="Listas" component={TelaInicial} />
      <Tab.Screen name="Mercados" component={TelaMercadosProximos} />
      <Tab.Screen name="Histórico" component={TelaHistorico} />
>>>>>>> a26775ecddc8798c1c06dd6fb4589e6e9cb2e5b4
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Abas} options={{ headerShown: false }} />
        <Stack.Screen name="CriarLista" component={TelaCriarLista} options={{ title: 'Nova Lista' }} />
        <Stack.Screen name="DetalhesLista" component={TelaDetalhesLista} options={{ title: 'Detalhes' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}