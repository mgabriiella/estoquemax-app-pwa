// Configuração da API
const API_URL = "http://localhost:3001/api"

// Funções de utilidade
function formatCurrency(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("pt-BR")
}

// Funcionalidade do menu mobile
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle")
    const mobileMenu = document.getElementById("mobile-menu")

    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("active")
      })
    }

    // Fechar o menu ao clicar em um link
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

    if (mobileNavLinks.length > 0) {
      mobileNavLinks.forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenu.classList.remove("active")
        })
      })
    }

    // Inicializar página específica
    if (window.location.pathname.includes("dashboard.html")) {
      initDashboard()
    } else if (window.location.pathname.includes("produtos.html")) {
      initProdutos()
    } else if (window.location.pathname.includes("clientes.html")) {
      initClientes()
    } else if (window.location.pathname.includes("vendas.html")) {
      initVendas()
    }

    // Inicializar modais
    initModals()
  })
}

// Script para o campo de pesquisa
const searchInput = document.querySelector(".search-input")
const searchButton = document.querySelector(".search-button")

if (searchButton && searchInput) {
  searchButton.addEventListener("click", () => {
    if (searchInput.value.trim() !== "") {
      alert("Buscando: " + searchInput.value)
      // Aqui você pode adicionar a lógica para realizar a busca de fato
    } else {
      alert("Por favor, insira um termo de pesquisa.")
    }
  })
}

// Script para perfil
const profileButton = document.querySelector(".profile-btn")

if (profileButton) {
  profileButton.addEventListener("click", () => {
    alert("Você clicou no perfil!")
    // Aqui você pode adicionar lógica para abrir o perfil do usuário
  })
}

// Script para o botão de login
const loginButton = document.querySelector(".login-button")

if (loginButton) {
  loginButton.addEventListener("click", (e) => {
    e.preventDefault()
    window.location.href = "login.html" // Redireciona para a página de login
  })
}

// Funções para manipulação de dados via API
async function fetchProdutos() {
  try {
    const response = await fetch(`${API_URL}/produtos`)
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || "Erro ao buscar produtos")
    }
    return await response.json()
  } catch (error) {
    console.error("Erro:", error)
    alert(error.message || "Erro ao buscar produtos")
    return []
  }
}

async function fetchClientes() {
  try {
    const response = await fetch(`${API_URL}/clientes`)
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || "Erro ao buscar clientes")
    }
    return await response.json()
  } catch (error) {
    console.error("Erro:", error)
    alert(error.message || "Erro ao buscar clientes")
    return []
  }
}

async function fetchVendas() {
  try {
    const response = await fetch(`${API_URL}/vendas`)
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || "Erro ao buscar vendas")
    }
    return await response.json()
  } catch (error) {
    console.error("Erro:", error)
    alert(error.message || "Erro ao buscar vendas")
    return []
  }
}

async function fetchDashboard() {
  try {
    const response = await fetch(`${API_URL}/dashboard`)
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || "Erro ao buscar dados do dashboard")
    }
    return await response.json()
  } catch (error) {
    console.error("Erro:", error)
    alert(error.message || "Erro ao buscar dados do dashboard")
    return null
  }
}

async function addProduct(product) {
  try {
    const response = await fetch(`${API_URL}/produtos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Erro ao adicionar produto")
    }

    return data
  } catch (error) {
    console.error("Erro:", error)
    alert(error.message)
    return null
  }
}

async function updateProduct(id, updatedProduct) {
  try {
    const response = await fetch(`${API_URL}/produtos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Erro ao atualizar produto")
    }

    return data
  } catch (error) {
    console.error("Erro:", error)
    alert(error.message)
    return null
  }
}

async function deleteProduct(id) {
  try {
    const response = await fetch(`${API_URL}/produtos/${id}`, {
      method: "DELETE",
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Erro ao excluir produto")
    }

    return data
  } catch (error) {
    console.error("Erro:", error)
    alert(error.message)
    return null
  }
}

async function addClient(client) {
  try {
    const response = await fetch(`${API_URL}/clientes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Erro ao adicionar cliente")
    }

    return data
  } catch (error) {
    console.error("Erro:", error)
    alert(error.message)
    return null
  }
}

async function updateClient(id, updatedClient) {
  try {
    const response = await fetch(`${API_URL}/clientes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedClient),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Erro ao atualizar cliente")
    }

    return data
  } catch (error) {
    console.error("Erro:", error)
    alert(error.message)
    return null
  }
}

async function deleteClient(id) {
  try {
    const response = await fetch(`${API_URL}/clientes/${id}`, {
      method: "DELETE",
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Erro ao excluir cliente")
    }

    return data
  } catch (error) {
    console.error("Erro:", error)
    alert(error.message)
    return null
  }
}

// Modificar a função addSale para incluir mais logs e tratamento de erros
async function addSale(sale) {
  try {
    console.log("Enviando venda para API:", sale)

    const response = await fetch(`${API_URL}/vendas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sale),
    })

    console.log("Status da resposta:", response.status)
    const data = await response.json()
    console.log("Dados da resposta:", data)

    if (!response.ok) {
      throw new Error(data.error || "Erro ao adicionar venda")
    }

    return data
  } catch (error) {
    console.error("Erro detalhado:", error)
    alert(error.message || "Erro ao adicionar venda")
    return null
  }
}

// Inicialização de modais
function initModals() {
  console.log("Inicializando modais")

  const btnCadastrarProduto = document.getElementById("btnCadastrarProduto")
  const btnCadastrarCliente = document.getElementById("btnCadastrarCliente")
  const btnNovaVenda = document.getElementById("btnNovaVenda")

  const modalProduto = document.getElementById("modalProduto")
  const modalCliente = document.getElementById("modalCliente")
  const modalVenda = document.getElementById("modalVenda")

  console.log("Modal de venda encontrado:", !!modalVenda)

  const closeBtns = document.querySelectorAll(".close-btn")

  const btnCancelarProduto = document.getElementById("btnCancelarProduto")
  const btnCancelarCliente = document.getElementById("btnCancelarCliente")
  const btnCancelarVenda = document.getElementById("btnCancelarVenda")

  const btnSalvarProduto = document.getElementById("btnSalvarProduto")
  const btnSalvarCliente = document.getElementById("btnSalvarCliente")
  const btnFinalizarVenda = document.getElementById("btnFinalizarVenda")

  if (btnCadastrarProduto) {
    btnCadastrarProduto.addEventListener("click", () => {
      // Limpar o formulário
      document.getElementById("nomeProduto").value = ""
      document.getElementById("precoProduto").value = ""
      document.getElementById("estoqueProduto").value = ""

      // Resetar o botão para "Salvar" (caso tenha sido alterado para edição)
      if (btnSalvarProduto) {
        btnSalvarProduto.textContent = "Salvar"
        btnSalvarProduto.onclick = handleSalvarProduto
      }

      modalProduto.classList.add("active")
    })
  }

  if (btnCadastrarCliente) {
    btnCadastrarCliente.addEventListener("click", () => {
      // Limpar o formulário
      document.getElementById("nomeCliente").value = ""
      document.getElementById("emailCliente").value = ""
      document.getElementById("telefoneCliente").value = ""

      // Resetar o botão para "Salvar" (caso tenha sido alterado para edição)
      if (btnSalvarCliente) {
        btnSalvarCliente.textContent = "Salvar"
        btnSalvarCliente.onclick = handleSalvarCliente
      }

      modalCliente.classList.add("active")
    })
  }

  if (btnNovaVenda) {
    btnNovaVenda.addEventListener("click", () => {
      modalVenda.classList.add("active")
      initVendaForm()
    })
  }

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal")
      modal.classList.remove("active")
    })
  })

  if (btnCancelarProduto) {
    btnCancelarProduto.addEventListener("click", () => modalProduto.classList.remove("active"))
  }

  if (btnCancelarCliente) {
    btnCancelarCliente.addEventListener("click", () => modalCliente.classList.remove("active"))
  }

  if (btnCancelarVenda) {
    btnCancelarVenda.addEventListener("click", () => modalVenda.classList.remove("active"))
  }

  // Função para salvar produto
  function handleSalvarProduto() {
    saveProduto()
  }

  // Salvar produto
  if (btnSalvarProduto) {
    btnSalvarProduto.onclick = handleSalvarProduto
  }

  // Função para salvar cliente
  function handleSalvarCliente() {
    saveCliente()
  }

  // Salvar cliente
  if (btnSalvarCliente) {
    btnSalvarCliente.onclick = handleSalvarCliente
  }

  // Finalizar venda
  if (btnFinalizarVenda) {
    btnFinalizarVenda.addEventListener("click", finalizarVenda)
  }
}

// Função para salvar produto
async function saveProduto() {
  try {
    const nome = document.getElementById("nomeProduto").value.trim()
    const preco = Number.parseFloat(document.getElementById("precoProduto").value)
    const estoque = Number.parseInt(document.getElementById("estoqueProduto").value)

    if (!nome) throw new Error("Nome do produto é obrigatório")
    if (isNaN(preco) || preco <= 0) throw new Error("Preço deve ser maior que zero")
    if (isNaN(estoque) || estoque < 0) throw new Error("Quantidade em estoque inválida")

    const novoProduto = {
      name: nome,
      price: preco,
      stock: estoque,
    }

    const resultado = await addProduct(novoProduto)

    if (resultado) {
      alert("Produto cadastrado com sucesso!")
      document.getElementById("modalProduto").classList.remove("active")
      window.location.reload()
    }
  } catch (error) {
    alert(error.message)
  }
}

// Função para salvar cliente
async function saveCliente() {
  try {
    const nome = document.getElementById("nomeCliente").value.trim()
    const email = document.getElementById("emailCliente").value.trim()
    const telefone = document.getElementById("telefoneCliente").value.trim()

    // Validações
    if (!nome) throw new Error("Por favor, insira o nome do cliente")
    if (!email) throw new Error("Por favor, insira o email do cliente")
    if (!telefone) throw new Error("Por favor, insira o telefone do cliente")

    const novoCliente = { name: nome, email: email, phone: telefone }
    const resultado = await addClient(novoCliente)

    if (resultado) {
      alert("Cliente cadastrado com sucesso!")
      document.getElementById("modalCliente").classList.remove("active")
      window.location.reload()
    }
  } catch (error) {
    alert(error.message || "Erro ao cadastrar cliente")
  }
}

// Inicialização da página de dashboard
async function initDashboard() {
  try {
    const dashboardData = await fetchDashboard()

    if (!dashboardData) {
      console.error("Não foi possível carregar os dados do dashboard")
      return
    }

    // Atualizar receita do mês
    const receitaElement = document.querySelector(".dashboard-card:nth-child(1) .dashboard-value")
    if (receitaElement) {
      receitaElement.textContent = formatCurrency(dashboardData.receitaMes || 0)
    }

    const receitaTrendElement = document.querySelector(".dashboard-card:nth-child(1) .dashboard-trend")
    if (receitaTrendElement) {
      const variacao = dashboardData.variacaoReceita || 0
      receitaTrendElement.textContent =
        variacao > 0
          ? `+${variacao.toFixed(2)}% em relação ao mês anterior`
          : `${variacao.toFixed(2)}% em relação ao mês anterior`

      receitaTrendElement.className = "dashboard-trend " + (variacao >= 0 ? "positive" : "negative")
    }

    // Atualizar total de produtos
    const produtosElement = document.querySelector(".dashboard-card:nth-child(2) .dashboard-value")
    if (produtosElement) {
      produtosElement.textContent = dashboardData.totalProdutos || 0
    }

    const produtosInfoElement = document.querySelector(".dashboard-card:nth-child(2) .dashboard-info")
    if (produtosInfoElement) {
      produtosInfoElement.textContent = "Produtos cadastrados"
    }

    // Atualizar total de clientes
    const clientesElement = document.querySelector(".dashboard-card:nth-child(3) .dashboard-value")
    if (clientesElement) {
      clientesElement.textContent = dashboardData.totalClientes || 0
    }

    const clientesInfoElement = document.querySelector(".dashboard-card:nth-child(3) .dashboard-info")
    if (clientesInfoElement) {
      clientesInfoElement.textContent = "Clientes cadastrados"
    }

    // Atualizar produtos com baixo estoque
    const baixoEstoqueElement = document.querySelector(".dashboard-card:nth-child(4) .dashboard-content")
    if (baixoEstoqueElement) {
      if (dashboardData.produtosBaixoEstoque && dashboardData.produtosBaixoEstoque.length > 0) {
        let html = "<ul class='low-stock-list'>"
        dashboardData.produtosBaixoEstoque.forEach((produto) => {
          html += `<li><span class="product-name">${produto.name}</span> <span class="product-stock">${produto.stock} unidades</span></li>`
        })
        html += "</ul>"
        baixoEstoqueElement.innerHTML = html
      } else {
        baixoEstoqueElement.innerHTML = "<p>Nenhum produto com estoque baixo.</p>"
      }
    }

    // Atualizar vendas recentes
    const vendasRecentesElement = document.querySelector(".dashboard-card:nth-child(5) .dashboard-content")
    if (vendasRecentesElement) {
      if (dashboardData.vendasRecentes && dashboardData.vendasRecentes.length > 0) {
        let html = ""
        dashboardData.vendasRecentes.forEach((venda) => {
          html += `
            <div class="recent-sale">
              <div>
                <div class="sale-customer">${venda.clientName}</div>
                <div class="sale-date">${formatDate(venda.date)}</div>
              </div>
              <div class="sale-amount">${formatCurrency(venda.total)}</div>
            </div>
          `
        })
        vendasRecentesElement.innerHTML = html
      } else {
        vendasRecentesElement.innerHTML = "<p>Nenhuma venda recente.</p>"
      }
    }
  } catch (error) {
    console.error("Erro ao inicializar dashboard:", error)
    alert("Erro ao carregar dados do dashboard: " + error.message)
  }
}

// Inicialização da página de produtos
async function initProdutos() {
  const productsGrid = document.querySelector(".products-grid")
  if (!productsGrid) return

  // Limpar o grid (exceto o modal)
  const modal = productsGrid.querySelector(".modal")
  productsGrid.innerHTML = ""
  if (modal) productsGrid.appendChild(modal)

  // Buscar produtos da API
  const produtos = await fetchProdutos()

  if (produtos.length === 0) {
    productsGrid.innerHTML = "<div class='empty-message'>Nenhum produto cadastrado</div>"
    if (modal) productsGrid.appendChild(modal)
    return
  }

  // Renderizar cada produto
  produtos.forEach((produto) => {
    const productCard = document.createElement("div")
    productCard.className = "product-card"

    productCard.innerHTML = `
      <div class="product-image">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#cccccc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
          <path d="M3 9h18"></path>
        </svg>
      </div>
      <div class="product-info">
        <h3>${produto.name}</h3>
        <div class="product-sku">SKU: ${produto.sku || "N/A"}</div>
        <div class="product-price">${formatCurrency(produto.price)}</div>
        <div class="product-stock">Estoque: ${produto.stock} unidades</div>
        <div class="product-actions">
          <button class="btn-secondary btn-edit" data-id="${produto._id}">Editar</button>
          <button class="btn-danger btn-delete" data-id="${produto._id}">Excluir</button>
        </div>
      </div>
    `

    productsGrid.appendChild(productCard)
  })

  // Adicionar eventos aos botões
  document.querySelectorAll(".btn-edit").forEach((btn) => {
    btn.addEventListener("click", async function () {
      const id = this.getAttribute("data-id")
      const produto = produtos.find((p) => p._id === id)

      if (produto) {
        document.getElementById("nomeProduto").value = produto.name
        document.getElementById("precoProduto").value = produto.price
        document.getElementById("estoqueProduto").value = produto.stock

        const btnSalvar = document.getElementById("btnSalvarProduto")
        btnSalvar.textContent = "Salvar alterações"

        // Substituir o handler do botão salvar
        btnSalvar.onclick = async () => {
          try {
            const nome = document.getElementById("nomeProduto").value.trim()
            const preco = Number.parseFloat(document.getElementById("precoProduto").value)
            const estoque = Number.parseInt(document.getElementById("estoqueProduto").value)

            if (!nome) throw new Error("Nome do produto é obrigatório")
            if (isNaN(preco) || preco <= 0) throw new Error("Preço deve ser maior que zero")
            if (isNaN(estoque) || estoque < 0) throw new Error("Quantidade em estoque inválida")

            const produtoAtualizado = { name: nome, price: preco, stock: estoque }
            const resultado = await updateProduct(id, produtoAtualizado)

            if (resultado) {
              alert("Produto atualizado com sucesso!")
              document.getElementById("modalProduto").classList.remove("active")
              window.location.reload()
            }
          } catch (error) {
            alert(error.message || "Erro ao atualizar produto")
          }
        }

        document.getElementById("modalProduto").classList.add("active")
      }
    })
  })

  document.querySelectorAll(".btn-delete").forEach((btn) => {
    btn.addEventListener("click", async function () {
      const id = this.getAttribute("data-id")

      if (confirm("Tem certeza que deseja excluir este produto?")) {
        try {
          const resultado = await deleteProduct(id)

          if (resultado) {
            alert("Produto excluído com sucesso!")
            window.location.reload()
          }
        } catch (error) {
          alert(error.message || "Erro ao excluir produto")
        }
      }
    })
  })
}

// Inicialização da página de clientes
async function initClientes() {
  const clientsList = document.querySelector(".clients-list")
  if (!clientsList) return

  // Limpar a lista
  clientsList.innerHTML = ""

  // Buscar clientes da API
  const clientes = await fetchClientes()

  if (clientes.length === 0) {
    clientsList.innerHTML = "<div class='empty-message'>Nenhum cliente cadastrado</div>"
    return
  }

  // Renderizar cada cliente
  clientes.forEach((cliente) => {
    const clientCard = document.createElement("div")
    clientCard.className = "client-card"

    clientCard.innerHTML = `
      <div class="client-avatar">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cccccc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
        </svg>
      </div>
      <div class="client-info">
        <h3>${cliente.name}</h3>
        <p>${cliente.email} • ${cliente.phone}</p>
      </div>
      <div class="client-actions">
        <button class="btn-secondary btn-small btn-edit-client" data-id="${cliente._id}">Editar</button>
        <button class="btn-danger btn-small btn-delete-client" data-id="${cliente._id}">Excluir</button>
      </div>
    `

    clientsList.appendChild(clientCard)
  })

  // Adicionar eventos aos botões
  document.querySelectorAll(".btn-edit-client").forEach((btn) => {
    btn.addEventListener("click", async function () {
      const id = this.getAttribute("data-id")
      const cliente = clientes.find((c) => c._id === id)

      if (cliente) {
        document.getElementById("nomeCliente").value = cliente.name
        document.getElementById("emailCliente").value = cliente.email
        document.getElementById("telefoneCliente").value = cliente.phone

        const btnSalvar = document.getElementById("btnSalvarCliente")
        btnSalvar.textContent = "Salvar alterações"

        // Substituir o handler do botão salvar
        btnSalvar.onclick = async () => {
          try {
            const nome = document.getElementById("nomeCliente").value.trim()
            const email = document.getElementById("emailCliente").value.trim()
            const telefone = document.getElementById("telefoneCliente").value.trim()

            if (!nome) throw new Error("Nome do cliente é obrigatório")
            if (!email) throw new Error("Email do cliente é obrigatório")
            if (!telefone) throw new Error("Telefone do cliente é obrigatório")

            const clienteAtualizado = { name: nome, email: email, phone: telefone }
            const resultado = await updateClient(id, clienteAtualizado)

            if (resultado) {
              alert("Cliente atualizado com sucesso!")
              document.getElementById("modalCliente").classList.remove("active")
              window.location.reload()
            }
          } catch (error) {
            alert(error.message || "Erro ao atualizar cliente")
          }
        }

        document.getElementById("modalCliente").classList.add("active")
      }
    })
  })

  document.querySelectorAll(".btn-delete-client").forEach((btn) => {
    btn.addEventListener("click", async function () {
      const id = this.getAttribute("data-id")

      if (confirm("Tem certeza que deseja excluir este cliente?")) {
        try {
          const resultado = await deleteClient(id)

          if (resultado) {
            alert("Cliente excluído com sucesso!")
            window.location.reload()
          }
        } catch (error) {
          alert(error.message || "Erro ao excluir cliente")
        }
      }
    })
  })
}

// Variáveis para controle de vendas
let selectedProducts = []

// Inicialização da página de vendas
async function initVendas() {
  const salesList = document.querySelector(".sales-list")
  if (!salesList) return

  // Limpar a lista
  salesList.innerHTML = ""

  // Buscar vendas, clientes e produtos da API
  const [vendas, clientes, produtos] = await Promise.all([fetchVendas(), fetchClientes(), fetchProdutos()])

  if (vendas.length === 0) {
    salesList.innerHTML = "<div class='empty-message'>Nenhuma venda registrada</div>"
    return
  }

  // Renderizar cada venda
  vendas.forEach((venda) => {
    const cliente = clientes.find((c) => c._id === venda.clientId)

    const saleCard = document.createElement("div")
    saleCard.className = "sale-card"

    // Header da venda
    const saleHeader = document.createElement("div")
    saleHeader.className = "sale-header"
    saleHeader.innerHTML = `
      <div class="sale-customer">${cliente ? cliente.name : "Cliente não encontrado"}</div>
      <div class="sale-date">${formatDate(venda.date)}</div>
    `

    // Botões de ação
    const actionButtons = document.createElement("div")
    actionButtons.className = "sale-actions"
    actionButtons.innerHTML = `
      <button class="btn-icon edit-sale" data-id="${venda._id}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
      </svg>
    </button>
  `

    saleHeader.appendChild(actionButtons)
    saleCard.appendChild(saleHeader)

    // Itens da venda
    const saleItems = document.createElement("div")
    saleItems.className = "sale-items"

    venda.items.forEach((item) => {
      const produto = produtos.find((p) => p._id === item.productId)
      const saleItem = document.createElement("div")
      saleItem.className = "sale-item"
      saleItem.innerHTML = `
        <div class="item-name">${item.quantity}x ${produto ? produto.name : "Produto não encontrado"}</div>
        <div class="item-price">${formatCurrency(item.price * item.quantity)}</div>
      `
      saleItems.appendChild(saleItem)
    })

    saleCard.appendChild(saleItems)

    // Total da venda
    const saleTotal = document.createElement("div")
    saleTotal.className = "sale-total"
    saleTotal.innerHTML = `
      <div class="total-label">Total</div>
      <div class="total-value">${formatCurrency(venda.total)}</div>
    `

    saleCard.appendChild(saleTotal)
    salesList.appendChild(saleCard)
  })

  // Adicionar eventos aos botões de edição
  document.querySelectorAll(".edit-sale").forEach((button) => {
    button.addEventListener("click", function () {
      const saleId = this.getAttribute("data-id")
      alert("Funcionalidade de edição de venda será implementada em breve.")
      // openSaleModal(saleId) - Implementar no futuro
    })
  })

  // Inicializar o formulário de venda
  initVendaForm()
}

// Inicialização do formulário de venda
async function initVendaForm() {
  console.log("Inicializando formulário de venda...")

  const clienteSelect = document.getElementById("clienteVenda")
  const productSelect = document.querySelector(".product-select")
  const addProductButton = document.querySelector(".add-product")
  const summaryItems = document.getElementById("summaryItems")
  const vendaTotal = document.getElementById("vendaTotal")

  console.log("Elementos do formulário:", {
    clienteSelect: !!clienteSelect,
    productSelect: !!productSelect,
    addProductButton: !!addProductButton,
    summaryItems: !!summaryItems,
    vendaTotal: !!vendaTotal,
  })

  if (!clienteSelect || !productSelect || !addProductButton || !summaryItems || !vendaTotal) {
    console.error("Elementos do formulário não encontrados")
    return
  }

  // Limpar seleções anteriores
  clienteSelect.innerHTML = '<option value="">Selecione um cliente</option>'
  productSelect.innerHTML = '<option value="">Selecione um produto</option>'
  summaryItems.innerHTML = ""
  vendaTotal.textContent = "R$ 0,00"
  selectedProducts = []

  // Buscar clientes e produtos
  console.log("Buscando clientes e produtos...")
  const [clientes, produtos] = await Promise.all([fetchClientes(), fetchProdutos()])
  console.log(`Encontrados ${clientes.length} clientes e ${produtos.length} produtos`)

  // Preencher select de clientes
  clientes.forEach((cliente) => {
    const option = document.createElement("option")
    option.value = cliente._id
    option.textContent = cliente.name
    clienteSelect.appendChild(option)
  })

  // Preencher select de produtos
  produtos.forEach((produto) => {
    const option = document.createElement("option")
    option.value = produto._id
    option.textContent = `${produto.name} - ${formatCurrency(produto.price)} (${produto.stock} em estoque)`
    option.dataset.price = produto.price
    option.dataset.stock = produto.stock
    productSelect.appendChild(option)
  })

  // Remover qualquer evento anterior para evitar duplicação
  const newAddProductButton = addProductButton.cloneNode(true)
  addProductButton.parentNode.replaceChild(newAddProductButton, addProductButton)

  // Adicionar evento ao botão de adicionar produto
  newAddProductButton.addEventListener("click", (e) => {
    e.preventDefault() // Prevenir comportamento padrão do botão
    console.log("Botão de adicionar produto clicado")
    adicionarProdutoVenda()
  })

  console.log("Formulário de venda inicializado com sucesso")
}

// Função para adicionar produtos à venda
function adicionarProdutoVenda() {
  console.log("Função adicionarProdutoVenda chamada")

  const productSelect = document.querySelector(".product-select")
  const quantityInput = document.querySelector(".product-quantity")

  if (!productSelect || !quantityInput) {
    console.error("Elementos do formulário não encontrados")
    return
  }

  const productId = productSelect.value
  if (!productId) {
    alert("Por favor, selecione um produto")
    return
  }

  const quantity = Number.parseInt(quantityInput.value)
  if (isNaN(quantity) || quantity <= 0) {
    alert("Por favor, insira uma quantidade válida")
    return
  }

  const selectedOption = productSelect.options[productSelect.selectedIndex]
  const productName = selectedOption.textContent.split(" - ")[0]
  const price = Number.parseFloat(selectedOption.dataset.price)
  const stock = Number.parseInt(selectedOption.dataset.stock)

  console.log("Produto selecionado:", {
    productId,
    productName,
    price,
    stock,
    quantity,
  })

  if (quantity > stock) {
    alert(`Estoque insuficiente. Disponível: ${stock} unidades`)
    return
  }

  // Verificar se o produto já está na lista
  const existingProductIndex = selectedProducts.findIndex((p) => p.productId === productId)
  if (existingProductIndex !== -1) {
    // Atualizar quantidade
    const newQuantity = selectedProducts[existingProductIndex].quantity + quantity
    if (newQuantity > stock) {
      alert(`Estoque insuficiente. Disponível: ${stock} unidades`)
      return
    }
    selectedProducts[existingProductIndex].quantity = newQuantity
  } else {
    // Adicionar novo produto
    selectedProducts.push({
      productId,
      productName,
      quantity,
      price,
    })
  }

  console.log("Produtos após adição:", selectedProducts)

  // Atualizar a lista de itens
  updateSaleItems()

  // Limpar seleção
  productSelect.value = ""
  quantityInput.value = "1"

  console.log("Produto adicionado com sucesso. Total de produtos:", selectedProducts.length)
}

// Função para atualizar os itens da venda
function updateSaleItems() {
  console.log("Atualizando itens da venda")

  // Verificar se estamos usando uma tabela ou div para os itens
  const isTable = document.querySelector("table") !== null

  if (isTable) {
    // Estamos usando uma tabela (como na imagem)
    const tbody = document.querySelector("tbody")
    const totalCell = document.querySelector("td:contains('Total:') + td") || document.querySelector("#vendaTotal")

    if (!tbody || !totalCell) {
      console.error("Elementos da tabela não encontrados")
      return
    }

    // Limpar linhas existentes
    tbody.innerHTML = ""

    // Calcular o total
    let total = 0

    // Adicionar cada produto à tabela
    selectedProducts.forEach((product, index) => {
      const subtotal = product.price * product.quantity
      total += subtotal

      const row = document.createElement("tr")
      row.innerHTML = `
        <td>${product.productName}</td>
        <td>${product.quantity}</td>
        <td>${formatCurrency(subtotal)}</td>
      `

      tbody.appendChild(row)
    })

    // Atualizar o total
    totalCell.textContent = formatCurrency(total)
  } else {
    // Estamos usando divs (como no código original)
    const summaryItems = document.getElementById("summaryItems")
    const vendaTotal = document.getElementById("vendaTotal")

    if (!summaryItems || !vendaTotal) {
      console.error("Elementos do resumo não encontrados")
      return
    }

    // Limpar itens existentes
    summaryItems.innerHTML = ""

    // Calcular o total
    let total = 0

    // Adicionar cada produto à lista
    selectedProducts.forEach((product, index) => {
      const subtotal = product.price * product.quantity
      total += subtotal

      const itemRow = document.createElement("div")
      itemRow.className = "summary-item"

      itemRow.innerHTML = `
        <div>${product.productName}</div>
        <div>${product.quantity}</div>
        <div>${formatCurrency(product.price)}</div>
        <div>${formatCurrency(subtotal)}</div>
        <div>
          <button class="btn-remove" data-index="${index}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      `

      summaryItems.appendChild(itemRow)
    })

    // Atualizar o elemento de total
    vendaTotal.textContent = formatCurrency(total)
    vendaTotal.dataset.total = total

    // Adicionar eventos aos botões de remoção
    document.querySelectorAll(".btn-remove").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = Number.parseInt(this.getAttribute("data-index"))
        console.log("Removendo produto no índice:", index)
        selectedProducts.splice(index, 1)
        updateSaleItems()
      })
    })
  }

  console.log("Interface atualizada com sucesso")
}

// Função para finalizar a venda
async function finalizarVenda() {
  try {
    console.log("Iniciando finalização da venda...")

    const clienteSelect = document.getElementById("clienteVenda")
    if (!clienteSelect) {
      console.error("Elemento clienteVenda não encontrado")
      return
    }

    const clienteId = clienteSelect.value
    console.log("Cliente selecionado:", clienteId)

    if (!clienteId) {
      alert("Por favor, selecione um cliente")
      return
    }

    if (selectedProducts.length === 0) {
      alert("Por favor, adicione pelo menos um produto à venda")
      return
    }

    // Calcular o total da venda
    let total = 0
    selectedProducts.forEach((product) => {
      const subtotal = product.price * product.quantity
      total += subtotal
      console.log(
        `Produto: ${product.productName}, Quantidade: ${product.quantity}, Preço: ${product.price}, Subtotal: ${subtotal}`,
      )
    })

    console.log("Total calculado:", total)

    // Preparar os itens da venda
    const items = selectedProducts.map((product) => ({
      productId: product.productId,
      quantity: product.quantity,
      price: product.price,
    }))

    console.log("Itens da venda:", items)

    // Criar objeto da venda
    const venda = {
      clientId: clienteId,
      items,
      total, // Incluir o total calculado
    }

    console.log("Objeto da venda a ser enviado:", venda)

    // Enviar para a API
    const resultado = await addSale(venda)
    console.log("Resposta da API:", resultado)

    if (resultado) {
      alert("Venda registrada com sucesso!")
      const modalVenda = document.getElementById("modalVenda")
      if (modalVenda) {
        modalVenda.classList.remove("active")
      }
      window.location.reload()
    }
  } catch (error) {
    console.error("Erro ao finalizar venda:", error)
    alert(error.message || "Erro ao finalizar venda")
  }
}

// Exibir o nome da loja no header
document.addEventListener("DOMContentLoaded", () => {
  const storeNameElement = document.getElementById("storeName")
  const storeName = localStorage.getItem("storeName")

  if (storeNameElement && storeName) {
    storeNameElement.textContent = `| ${storeName}`
  }
})




