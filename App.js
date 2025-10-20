import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import { TelaInicial, TelaCriarLista, TelaDetalhesLista, TelaMercadosProximos, TelaHistorico } from './src/main';
import { CORES } from './src/styles';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Abas() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let icone;
          if (route.name === 'Listas') icone = 'shopping-cart';
          else if (route.name === 'Mercados') icone = 'store';
          else if (route.name === 'Histórico') icone = 'history';
          return <MaterialIcons name={icone} size={size} color={color} />;
        },
        tabBarActiveTintColor: CORES.primaria,
        tabBarInactiveTintColor: CORES.cinzaMedio,
      })}
    >
      <Tab.Screen name="Listas" component={TelaInicial} />
      <Tab.Screen name="Mercados" component={TelaMercadosProximos} />
      <Tab.Screen name="Histórico" component={TelaHistorico} />
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