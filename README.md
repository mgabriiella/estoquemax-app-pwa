# 📦 PWA - Controle de Vendas

Este é um **Progressive Web App (PWA)** desenvolvido para gerenciamento de estoque e controle de vendas. O sistema permite adicionar produtos, cadastrar clientes, registrar vendas e acompanhar métricas através de um **dashboard interativo**.

---

## 🚀 Funcionalidades

### 🛍️ Cadastro e Gerenciamento de Produtos
- Adicionar produtos com **nome, quantidade e preço**
- Editar e excluir produtos conforme necessário
- Exibição organizada dos produtos cadastrados

### 👥 Cadastro e Gerenciamento de Clientes
- Registro de clientes com **nome, telefone e e-mail**
- Visualização e edição de clientes cadastrados

### 💳 Registro de Vendas
- Seleção de cliente para realizar uma venda
- Adição de produtos vendidos com **quantidade**
- Registro das vendas para acompanhamento

### 📊 Dashboard Interativo
- **Receita do mês** com comparação ao mês anterior 📈
- **Total de produtos cadastrados** 📦
- **Total de clientes cadastrados** 👥
- **Produtos com baixo estoque** ⚠

---

## 📲 Tecnologias Utilizadas
- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **API RESTful** para persistência dos dados
- **PWA (Progressive Web App)**
- **Service Workers** para funcionamento offline
- **Deploy**: Netlify (Frontend)

---

## 🔧 Instalação e Execução

### 📌 Como executar o frontend
1. Clone o repositório:
   ```bash
   git clone https://github.com/mgabriiella/estoquemax-app-pwa
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd estoquemax-app-pwa/public
   ```
3. Abra o arquivo `index.html` no navegador ou utilize uma extensão Live Server.

---

### 🌐 Como configurar e rodar a API

1. Instale o [Node.js](https://nodejs.org/)
2. Clone o repositório da API:
   ```bash
   git clone https://github.com/mgabriiella/estoquemax-app-pwa
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor com Nodemon para recarregar automaticamente:
   ```bash
   npm run dev
   ```
   Ou inicie manualmente com:
   ```bash
   node server.js
   ```
5. A API estará rodando em `http://localhost:3001`

---

## 🌎 Demonstração Online
- **Frontend:** [Link do Netlify]([estoquemax-app.netlify.app](https://estoquemax-app.netlify.app/))
---

## 📌 Melhorias Futuras
✅ Persistência de dados via API externa
✅ Integração com banco de dados NoSQL (MongoDB)
✅ Melhorias no design responsivo
✅ Implementação de autenticação JWT para segurança
✅ Implementação de notificações push para alertas de estoque

---



