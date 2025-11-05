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
```

---

## 🏗️ Estrutura do Projeto
```
smart-shopping-list/
├── App.js                    # Configuração de navegação
├── package.json              # Dependências do projeto
├── src/
│   ├── main.js              # Componentes de todas as telas
│   ├── styles.js            # Estilos globais e tema
│   └── funcoes.js           # Lógica de negócio e utilidades
├── assets/                   # Imagens e recursos (se houver)
└── README.md                # Este arquivo
```

### Descrição dos Arquivos Principais

#### `App.js`
- Configuração da navegação Stack e Bottom Tabs
- Definição das rotas e ícones das abas
- StatusBar e tema global

#### `src/main.js`
- Implementação de todos os componentes de tela:
  - `TelaInicial` - Lista de listas ativas
  - `TelaCriarLista` - Formulário de criação
  - `TelaDetalhesLista` - Visualização e marcação de itens
  - `TelaComparadorPrecos` - Busca e comparação
  - `TelaReceitasSugeridas` - Catálogo e detalhes
  - `TelaHistorico` - Listas concluídas
  - `TelaRelatorios` - Dashboard estatístico
  - `ModalConfirmar` - Modal reutilizável

#### `src/styles.js`
- Paleta de cores do tema escuro
- Estilos organizados por categoria
- Constantes de espaçamento e fontes
- Utilities classes (mt_md, p_lg, etc)

#### `src/funcoes.js`
- `armazenamento` - CRUD com AsyncStorage
- `feedback` - Funções de vibração
- `utils` - Utilitários (formatação, cálculos)
- `dadosMock` - Dados de receitas
- `PRODUTOS_MERCADOS` - Banco de produtos com preços
- `buscarProduto` - Lógica de busca e ordenação

---

## 💡 Aprendizados e Desafios

### Aprendizados Técnicos

1. **Gestão de Estado Complexa**
   - Aprendi a gerenciar múltiplos estados assíncronos com hooks
   - Implementação de loading states e error handling robusto
   - Uso de useCallback para otimização de performance

2. **AsyncStorage**
   - Compreensão profunda de armazenamento local no React Native
   - Estratégias de leitura/escrita otimizadas
   - Tratamento de erros e fallbacks

3. **Navegação Híbrida**
   - Combinação de Stack e Tab Navigation
   - Passagem de parâmetros entre telas
   - Gerenciamento do ciclo de vida com listeners

4. **Feedback Háptico**
   - Integração com Vibration API
   - Diferentes padrões para diferentes ações
   - Melhoria significativa na experiência do usuário

5. **Componentização**
   - Criação de componentes reutilizáveis (ModalConfirmar)
   - Separação de responsabilidades
   - Code splitting eficiente

### Desafios Superados

1. **Sincronização de Dados**
   - **Desafio**: Manter dados sincronizados entre telas
   - **Solução**: Uso de navigation listeners para recarregar dados ao focar tela

2. **Busca Inteligente**
   - **Desafio**: Implementar busca que ignore acentos e case
   - **Solução**: Normalização de texto com `normalize('NFD')`

3. **Performance com Listas**
   - **Desafio**: Renderização lenta com muitos itens
   - **Solução**: Uso de FlatList com keyExtractor otimizado

4. **UX em Operações Assíncronas**
   - **Desafio**: Usuário não sabia quando operação estava em andamento
   - **Solução**: Estados de loading com ActivityIndicator

5. **Validação de Formulários**
   - **Desafio**: Múltiplos pontos de validação
   - **Solução**: Funções centralizadas com feedback visual

### Melhorias Implementadas Durante o Desenvolvimento

- Adição de pull-to-refresh em listas
- Sistema de badges para categorias
- Cálculo de economia no comparador
- Histórico de buscas com persistência
- Mensagens de erro/sucesso com auto-dismiss
- Estados vazios informativos
- Divisores visuais para melhor organização
- Botão "Limpar tudo" em formulários
- Confirmação para ações destrutivas

---

## 🔮 Próximos Passos

### Funcionalidades Planejadas

1. **Backend e Sincronização**
   - Integração com Firebase para sync entre dispositivos
   - Compartilhamento de listas com outros usuários
   - Backup automático na nuvem

2. **Preços em Tempo Real**
   - API de supermercados para preços atualizados
   - Sistema de alertas de promoções
   - Geolocalização para mercados próximos

3. **Inteligência Artificial**
   - Sugestões de produtos baseadas em histórico
   - Previsão de quando comprar novamente
   - Reconhecimento de produtos por foto

4. **Social Features**
   - Compartilhamento de receitas entre usuários
   - Sistema de avaliações de receitas
   - Comunidade para dicas de economia

5. **Melhorias de UX**
   - Modo claro opcional
   - Customização de cores e temas
   - Widgets para tela inicial
   - Integração com assistentes de voz

6. **Análises Avançadas**
   - Gráficos interativos de gastos
   - Comparativo mensal de economia
   - Sugestões de orçamento
   - Export de relatórios em PDF

### Otimizações Técnicas

- Implementar cache de imagens
- Adicionar testes unitários e de integração
- Configurar CI/CD para deploys automáticos
- Otimizar bundle size
- Implementar lazy loading de componentes
- Adicionar analytics para métricas de uso

---
---

**Desenvolvido com ❤️ e ☕ por [Seu Nome]**
