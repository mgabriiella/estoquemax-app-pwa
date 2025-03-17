import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';


const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

// Simulação de Banco de Dados em Memória
let produtos = [];
let clientes = [];
let vendas = [];

// Função para gerar IDs únicos
function generateId() {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

// Validação de dados
function validateProduct(produto) {
  if (!produto.name || typeof produto.name !== "string") {
    throw new Error("Nome do produto é obrigatório");
  }
  if (!produto.price || isNaN(produto.price) || produto.price <= 0) {
    throw new Error("Preço do produto deve ser um número positivo");
  }
  if (typeof produto.stock !== "number" && typeof produto.stock !== "string") {
    throw new Error("Estoque deve ser um número não negativo");
  }
  
  // Converter estoque para número se for string
  if (typeof produto.stock === "string") {
    produto.stock = parseInt(produto.stock);
  }
  
  if (isNaN(produto.stock) || produto.stock < 0) {
    throw new Error("Estoque deve ser um número não negativo");
  }
}

function validateClient(cliente) {
  if (!cliente.name || typeof cliente.name !== "string") {
    throw new Error("Nome do cliente é obrigatório");
  }
  if (!cliente.email || !cliente.email.includes("@")) {
    throw new Error("Email inválido");
  }
  if (!cliente.phone) {
    throw new Error("Telefone é obrigatório");
  }
}

function validateSale(venda) {
  if (!venda.clientId) {
    throw new Error("Cliente é obrigatório");
  }
  
  if (!Array.isArray(venda.items) || venda.items.length === 0) {
    throw new Error("A venda deve conter pelo menos um item");
  }
  
  venda.items.forEach(item => {
    if (!item.productId) {
      throw new Error("ID do produto é obrigatório");
    }
    if (!item.quantity || isNaN(item.quantity) || item.quantity <= 0) {
      throw new Error("Quantidade deve ser um número positivo");
    }
    if (!item.price || isNaN(item.price) || item.price <= 0) {
      throw new Error("Preço deve ser um número positivo");
    }
  });
}

// Rotas para Produtos
app.get("/api/produtos", (req, res) => {
  res.json(produtos);
});

app.get("/api/produtos/:id", (req, res) => {
  const produto = produtos.find((p) => p._id === req.params.id);
  if (!produto) return res.status(404).json({ error: "Produto não encontrado" });
  res.json(produto);
});

app.post("/api/produtos", (req, res) => {
  try {
    const produto = req.body;
    validateProduct(produto);

    const novoProduto = {
      _id: generateId(),
      ...produto,
      createdAt: new Date(),
    };

    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/api/produtos/:id", (req, res) => {
  try {
    const index = produtos.findIndex((p) => p._id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Produto não encontrado" });

    const updatedProduct = { ...req.body };
    validateProduct(updatedProduct);

    produtos[index] = { 
      ...produtos[index], 
      ...updatedProduct, 
      updatedAt: new Date() 
    };
    
    res.json(produtos[index]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/api/produtos/:id", (req, res) => {
  const index = produtos.findIndex((p) => p._id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Produto não encontrado" });

  const produtoRemovido = produtos.splice(index, 1);
  res.json(produtoRemovido[0]);
});

// Rotas para Clientes
app.get("/api/clientes", (req, res) => {
  res.json(clientes);
});

app.get("/api/clientes/:id", (req, res) => {
  const cliente = clientes.find((c) => c._id === req.params.id);
  if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" });
  res.json(cliente);
});

app.post("/api/clientes", (req, res) => {
  try {
    const cliente = req.body;
    validateClient(cliente);

    if (clientes.some((c) => c.email === cliente.email)) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const novoCliente = {
      _id: generateId(),
      ...cliente,
      createdAt: new Date(),
    };

    clientes.push(novoCliente);
    res.status(201).json(novoCliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/api/clientes/:id", (req, res) => {
  try {
    const index = clientes.findIndex((c) => c._id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Cliente não encontrado" });

    if (req.body.email && clientes.some((c) => c.email === req.body.email && c._id !== req.params.id)) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    validateClient({ ...clientes[index], ...req.body });

    clientes[index] = { ...clientes[index], ...req.body, updatedAt: new Date() };
    res.json(clientes[index]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/api/clientes/:id", (req, res) => {
  const index = clientes.findIndex((c) => c._id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Cliente não encontrado" });

  const clienteRemovido = clientes.splice(index, 1);
  res.json(clienteRemovido[0]);
});

// Rotas para Vendas
app.get("/api/vendas", (req, res) => {
  res.json(vendas);
});

app.get("/api/vendas/:id", (req, res) => {
  const venda = vendas.find((v) => v._id === req.params.id);
  if (!venda) return res.status(404).json({ error: "Venda não encontrada" });
  res.json(venda);
});

app.post("/api/vendas", (req, res) => {
  try {
    const venda = req.body;
    validateSale(venda);

    // Verificar se o cliente existe
    const cliente = clientes.find((c) => c._id === venda.clientId);
    if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" });

    // Verificar se os produtos existem e têm estoque suficiente
    for (const item of venda.items) {
      const produto = produtos.find((p) => p._id === item.productId);
      if (!produto) {
        return res.status(404).json({ error: `Produto com ID ${item.productId} não encontrado` });
      }
      
      if (produto.stock < item.quantity) {
        return res.status(400).json({ 
          error: `Estoque insuficiente para o produto ${produto.name}. Disponível: ${produto.stock}` 
        });
      }
    }

    // Calcular o total da venda
    let total = 0;
    for (const item of venda.items) {
      total += item.price * item.quantity;
    }

    // Criar a nova venda
    const novaVenda = {
      _id: generateId(),
      ...venda,
      total,
      date: new Date(),
      createdAt: new Date(),
    };

    // Atualizar o estoque dos produtos
    for (const item of venda.items) {
      const produtoIndex = produtos.findIndex((p) => p._id === item.productId);
      produtos[produtoIndex].stock -= item.quantity;
    }

    vendas.push(novaVenda);
    res.status(201).json(novaVenda);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para o Dashboard
app.get("/api/dashboard", (req, res) => {
  try {
    // Calcular receita do mês atual
    const hoje = new Date();
    const primeiroDiaMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    
    const vendasDoMes = vendas.filter(v => new Date(v.date) >= primeiroDiaMes);
    const receitaMes = vendasDoMes.reduce((total, venda) => total + venda.total, 0);
    
    // Calcular variação em relação ao mês anterior
    const primeiroDiaMesAnterior = new Date(hoje.getFullYear(), hoje.getMonth() - 1, 1);
    const ultimoDiaMesAnterior = new Date(hoje.getFullYear(), hoje.getMonth(), 0);
    
    const vendasMesAnterior = vendas.filter(v => {
      const dataVenda = new Date(v.date);
      return dataVenda >= primeiroDiaMesAnterior && dataVenda <= ultimoDiaMesAnterior;
    });
    
    const receitaMesAnterior = vendasMesAnterior.reduce((total, venda) => total + venda.total, 0);
    
    let variacaoReceita = 0;
    if (receitaMesAnterior > 0) {
      variacaoReceita = ((receitaMes - receitaMesAnterior) / receitaMesAnterior) * 100;
    }
    
    // Produtos com baixo estoque (menos de 5 unidades)
    const produtosBaixoEstoque = produtos
      .filter(p => p.stock < 5)
      .map(p => ({
        _id: p._id,
        name: p.name,
        stock: p.stock
      }));
    
    // Vendas recentes (últimas 5)
    const vendasRecentes = vendas
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5)
      .map(v => {
        const cliente = clientes.find(c => c._id === v.clientId);
        return {
          _id: v._id,
          clientName: cliente ? cliente.name : "Cliente não encontrado",
          date: v.date,
          total: v.total
        };
      });
    
    res.json({
      receitaMes,
      variacaoReceita,
      totalProdutos: produtos.length,
      totalClientes: clientes.length,
      produtosBaixoEstoque,
      vendasRecentes
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Adicionar alguns dados de exemplo para testes
function addSampleData() {
  // Adicionar produtos de exemplo
  if (produtos.length === 0) {
    produtos = [
      {
        _id: "prod1",
        name: "Smartphone Galaxy S21",
        price: 3999.99,
        stock: 15,
        createdAt: new Date()
      },
      {
        _id: "prod2",
        name: "Notebook Dell Inspiron",
        price: 4500.00,
        stock: 8,
        createdAt: new Date()
      },
      {
        _id: "prod3",
        name: "Smart TV 55\"",
        price: 2799.90,
        stock: 12,
        createdAt: new Date()
      },
      {
        _id: "prod4",
        name: "Fone de Ouvido Bluetooth",
        price: 199.90,
        stock: 30,
        createdAt: new Date()
      },
      {
        _id: "prod5",
        name: "Mouse sem Fio",
        price: 89.90,
        stock: 25,
        createdAt: new Date()
      },
      {
        _id: "prod6",
        name: "Teclado Mecânico",
        price: 349.90,
        stock: 3,
        createdAt: new Date()
      }
    ];
  }

  // Adicionar clientes de exemplo
  if (clientes.length === 0) {
    clientes = [
      {
        _id: "client1",
        name: "João Silva",
        email: "joao@email.com",
        phone: "(11) 98765-4321",
        createdAt: new Date()
      },
      {
        _id: "client2",
        name: "Maria Oliveira",
        email: "maria@email.com",
        phone: "(11) 91234-5678",
        createdAt: new Date()
      },
      {
        _id: "client3",
        name: "Pedro Santos",
        email: "pedro@email.com",
        phone: "(21) 99876-5432",
        createdAt: new Date()
      }
    ];
  }

  // Adicionar vendas de exemplo
  if (vendas.length === 0) {
    vendas = [
      {
        _id: "venda1",
        clientId: "client1",
        items: [
          {
            productId: "prod1",
            quantity: 1,
            price: 3999.99
          },
          {
            productId: "prod4",
            quantity: 2,
            price: 199.90
          }
        ],
        total: 4399.79,
        date: new Date(new Date().setDate(new Date().getDate() - 2)),
        createdAt: new Date(new Date().setDate(new Date().getDate() - 2))
      },
      {
        _id: "venda2",
        clientId: "client2",
        items: [
          {
            productId: "prod3",
            quantity: 1,
            price: 2799.90
          }
        ],
        total: 2799.90,
        date: new Date(new Date().setDate(new Date().getDate() - 5)),
        createdAt: new Date(new Date().setDate(new Date().getDate() - 5))
      },
      {
        _id: "venda3",
        clientId: "client3",
        items: [
          {
            productId: "prod2",
            quantity: 1,
            price: 4500.00
          },
          {
            productId: "prod5",
            quantity: 1,
            price: 89.90
          }
        ],
        total: 4589.90,
        date: new Date(),
        createdAt: new Date()
      }
    ];
  }
}

// Adicionar dados de exemplo ao iniciar o servidor
addSampleData();

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`API disponível em http://localhost:${PORT}/api`);
});