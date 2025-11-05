# 🛒 Smart Shopping List

## 📋 Visão Geral e Requisitos

### Descrição do Projeto
O **Smart Shopping List** é um aplicativo móvel desenvolvido em React Native que revoluciona a experiência de criar e gerenciar listas de compras. O app oferece funcionalidades inteligentes como comparação de preços entre mercados, sugestões de receitas e relatórios detalhados de consumo.

### Motivação
A motivação para o desenvolvimento deste aplicativo surgiu da necessidade de otimizar o processo de compras do dia a dia, ajudando usuários a economizar tempo e dinheiro através de:
- Organização eficiente de listas de compras
- Comparação de preços em tempo real entre diferentes mercados
- Sugestões de receitas baseadas em ingredientes comuns
- Histórico e análise de padrões de consumo

### Objetivos
- ✅ Facilitar a criação e gerenciamento de listas de compras
- ✅ Proporcionar economia através de comparação de preços
- ✅ Inspirar novas receitas e automatizar listas de ingredientes
- ✅ Oferecer insights sobre hábitos de consumo através de relatórios

### Requisitos Atendidos
- [x] **Mínimo de 4 telas** - O app possui 7 telas principais
- [x] **Uso de imagens** - Implementado em cards de produtos e receitas
- [x] **Armazenamento de dados** - Utiliza AsyncStorage para persistência local
- [x] **Sensor/Atuador** - Implementa feedback tátil (vibração) para interações

---

## 🚀 Tecnologias Utilizadas

### Core
- **React Native** - Framework principal para desenvolvimento mobile
- **Expo** - Plataforma para build e desenvolvimento
- **JavaScript (ES6+)** - Linguagem de programação

### Navegação
- **@react-navigation/native** (^6.x) - Navegação base
- **@react-navigation/stack** - Navegação em pilha
- **@react-navigation/bottom-tabs** - Navegação por abas inferiores

### Armazenamento
- **@react-native-async-storage/async-storage** (^1.x) - Persistência local de dados

### UI/UX
- **@expo/vector-icons** - Ícones Material Design
- **react-native-gesture-handler** - Gestos e interações
- **react-native-screens** - Otimização de telas

### Funcionalidades Nativas
- **Vibration API** - Feedback háptico para melhor experiência do usuário

---

## ⚡ Funcionalidades

### 1. 📝 Gerenciamento de Listas
- **Criação de listas personalizadas** com nome e categoria
- **Adição/remoção dinâmica de itens**
- **Marcação de itens comprados** com feedback visual
- **Barra de progresso** mostrando percentual de conclusão
- **Exclusão de listas** com confirmação de segurança
- **Armazenamento persistente** usando AsyncStorage

### 2. 💰 Comparador de Preços
- **Busca inteligente de produtos** em banco de dados local com 20+ produtos
- **Comparação automática** entre 3 mercados diferentes
- **Ordenação por melhor preço** (menor para maior)
- **Informações detalhadas**: preço, distância e foto do mercado
- **Destaque visual** para melhor oferta
- **Cálculo de economia potencial** entre preços
- **Histórico de buscas** (últimas 5 pesquisas)
- **Listagem completa** de produtos disponíveis
- **Normalização de texto** para busca sem acentos

### 3. 🍳 Receitas Sugeridas
- **Catálogo de receitas** com fotos e informações nutricionais
- **Detalhes completos**: tempo de preparo, dificuldade, porções
- **Lista de ingredientes** organizada
- **Modo de preparo** passo a passo numerado
- **Conversão automática** de receita para lista de compras
- **Navegação intuitiva** entre lista e detalhes

### 4. 📊 Histórico
- **Registro de listas concluídas** com data de finalização
- **Visualização de itens comprados** por lista
- **Informações de categoria** e quantidade de itens
- **Ordenação cronológica** (mais recentes primeiro)
- **Pull-to-refresh** para atualização manual

### 5. 📈 Relatórios e Estatísticas
- **Dashboard completo** com métricas detalhadas:
  - Total de listas criadas
  - Listas ativas vs concluídas
  - Taxa de conclusão percentual
  - Total de itens cadastrados
  - Taxa de compra de itens
- **Análise por categoria** com ranking
- **Visualização gráfica** através de barras de progresso
- **Indicadores visuais coloridos** para diferentes métricas

### 6. 🎨 Experiência do Usuário
- **Tema escuro moderno** com esquema de cores laranja/preto
- **Feedback háptico** (vibração) em todas as interações importantes
- **Animações suaves** de transição entre telas
- **Modais de confirmação** para ações destrutivas
- **Mensagens de erro/sucesso** com auto-dismiss
- **Estados vazios informativos** com ícones e orientações
- **Badges e indicadores visuais** para destacar informações
- **Loading states** durante operações assíncronas

---

## 📱 Demonstração

### Telas Principais

#### Tela Inicial - Minhas Listas
- Visualização de todas as listas ativas
- Cards com nome, categoria, progresso e data de criação
- Botão flutuante (+) para criar nova lista
- Pull-to-refresh para atualizar dados

#### Tela de Criação
- Formulário intuitivo com validação
- Adição dinâmica de itens com feedback visual
- Preview dos itens adicionados
- Opção de limpar todos os itens

#### Tela de Detalhes
- Lista completa de itens com checkbox
- Barra de progresso visual
- Estatísticas (X/Y itens marcados)
- Banner de parabéns ao completar 100%
- Botão de finalizar compras

#### Comparador de Preços
- Campo de busca com ícone
- Histórico de buscas recentes (tags clicáveis)
- Botão "Ver Todos os Produtos"
- Cards de resultados com:
  - Foto do mercado
  - Nome e distância
  - Preço destacado
  - Badge "MELHOR PREÇO" para primeira opção
- Card de economia potencial

#### Receitas
- Grid de cards com fotos de receitas
- Informações: tempo, dificuldade, porções
- Tela de detalhes com:
  - Foto em destaque
  - Lista de ingredientes com checkmarks
  - Passos numerados do preparo
  - Botão para criar lista automaticamente

#### Histórico
- Lista de compras concluídas
- Ícone de check verde
- Data de conclusão
- Estatísticas de itens marcados

#### Relatórios
- Cards informativos com ícones
- Barras de progresso coloridas
- Seções: Resumo Geral, Itens, Por Categoria
- Cores diferentes para cada métrica

---

## 🔧 Instalação e Execução

### Pré-requisitos
- Node.js (v14 ou superior)
- npm ou yarn
- Expo CLI instalado globalmente
- Aplicativo Expo Go (para testar no celular)

### Passo 1: Clone o Repositório
```bash
git clone [URL_DO_SEU_REPOSITORIO]
cd smart-shopping-list
```

### Passo 2: Instale as Dependências
```bash
npm install
# ou
yarn install
```

### Passo 3: Inicie o Projeto
```bash
npx expo start
# ou
yarn start
```

### Passo 4: Execute no Dispositivo

#### Opção 1: Celular Físico
1. Instale o app **Expo Go** na Play Store/App Store
2. Escaneie o QR Code que aparece no terminal
3. Aguarde o carregamento do app

#### Opção 2: Emulador Android
```bash
npx expo start --android
```

#### Opção 3: Simulador iOS (apenas Mac)
```bash
npx expo start --ios
```

#### Opção 4: Web (para testes rápidos)
```bash
npx expo start --web
