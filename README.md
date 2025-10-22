# 🛒 SmartList – Aplicativo de Listas de Compras

## 📋 Visão Geral e Requisitos

O **SmartList** é um aplicativo móvel desenvolvido em **React Native** com o objetivo de **organizar listas de compras de forma simples e prática**.  
O app permite criar, editar, marcar e excluir itens de compras, armazenando os dados localmente no dispositivo.

### 🎯 Objetivo
Facilitar o controle de compras do usuário, substituindo o papel e proporcionando uma interface amigável e funcional.

### ✅ Requisitos atendidos
- **4 telas implementadas:**
  - Tela Inicial (visualização das listas)
  - Tela de Criação de Lista
  - Tela de Detalhes da Lista
  - Tela de Conclusão / Estado de Itens
- **Imagens**: uso de ícones (MaterialIcons) e elementos visuais do React Native.
- **Armazenamento local**: via `AsyncStorage`.
- **Atuador utilizado**: vibração do dispositivo (`Vibration`).
- **Interface responsiva** feita com `React Native` e `Expo`.

---

## ⚙️ Tecnologias Utilizadas

| Tecnologia | Descrição |
|-------------|------------|
| **React Native (Expo)** | Framework principal do app. |
| **JavaScript (ES6)** | Linguagem utilizada. |
| **AsyncStorage** | Armazenamento local dos dados. |
| **React Navigation** | Navegação entre telas. |
| **Material Icons** | Ícones e elementos visuais. |
| **Vibration API** | Recurso de vibração do celular para feedback tátil. |

---

## 💡 Funcionalidades

| Função | Descrição |
|--------|------------|
| 📝 **Criar Lista** | Permite criar novas listas de compras com nome e itens personalizados. |
| 🛍️ **Adicionar Itens** | Adiciona produtos à lista de compras. |
| ✅ **Marcar como Concluído** | Marca itens comprados e exibe progresso da lista. |
| 🗑️ **Excluir Listas** | Remove listas inteiras com apenas um toque. |
| 💾 **Salvar Automaticamente** | Todos os dados são armazenados localmente no dispositivo. |
| 📳 **Feedback por Vibração** | O app vibra em certas ações, melhorando a interação do usuário. 
