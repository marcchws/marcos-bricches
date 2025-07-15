'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import * as LucideIcons from 'lucide-react'

interface Produto {
  id: string
  nome: string
  categoria: string
  quantidade: number
  estoqueMinimo: number
  estoqueMaximo: number
  preco: number
  fornecedor: string
  codigoBarras: string
  criadoEm: Date
}

interface Movimentacao {
  id: string
  produtoId: string
  produtoNome: string
  tipo: 'entrada' | 'saida'
  quantidade: number
  motivo: string
  usuario: string
  dataHora: Date
}

interface Fornecedor {
  id: string
  nome: string
  contato: string
  email: string
}

type TipoMovimentacao = 'entrada' | 'saida'
type CategoriaFiltro = 'todas' | 'eletronicos' | 'roupas' | 'livros' | 'casa'

const InventoryManagementPreview: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([
    {
      id: '1',
      nome: 'iPhone 15 Pro',
      categoria: 'eletronicos',
      quantidade: 15,
      estoqueMinimo: 10,
      estoqueMaximo: 50,
      preco: 899.99,
      fornecedor: 'Tech Distribuidor',
      codigoBarras: '7890123456789',
      criadoEm: new Date('2024-01-15')
    },
    {
      id: '2',
      nome: 'Camiseta Nike',
      categoria: 'roupas',
      quantidade: 5,
      estoqueMinimo: 15,
      estoqueMaximo: 100,
      preco: 79.90,
      fornecedor: 'Moda Brasil',
      codigoBarras: '7890123456790',
      criadoEm: new Date('2024-01-14')
    },
    {
      id: '3',
      nome: 'Clean Code',
      categoria: 'livros',
      quantidade: 25,
      estoqueMinimo: 10,
      estoqueMaximo: 40,
      preco: 89.90,
      fornecedor: 'Livros Tech',
      codigoBarras: '7890123456791',
      criadoEm: new Date('2024-01-13')
    },
    {
      id: '4',
      nome: 'Smart TV 55"',
      categoria: 'eletronicos',
      quantidade: 8,
      estoqueMinimo: 5,
      estoqueMaximo: 20,
      preco: 2299.99,
      fornecedor: 'Tech Distribuidor',
      codigoBarras: '7890123456792',
      criadoEm: new Date('2024-01-12')
    }
  ])

  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([
    {
      id: '1',
      produtoId: '1',
      produtoNome: 'iPhone 15 Pro',
      tipo: 'entrada',
      quantidade: 20,
      motivo: 'Compra do fornecedor',
      usuario: 'João Silva',
      dataHora: new Date('2024-01-15T10:30:00')
    },
    {
      id: '2',
      produtoId: '2',
      produtoNome: 'Camiseta Nike',
      tipo: 'saida',
      quantidade: 15,
      motivo: 'Venda online',
      usuario: 'Maria Santos',
      dataHora: new Date('2024-01-14T14:20:00')
    }
  ])

  const [fornecedores] = useState<Fornecedor[]>([
    { id: '1', nome: 'Tech Distribuidor', contato: '(11) 99999-9999', email: 'contato@techdist.com' },
    { id: '2', nome: 'Moda Brasil', contato: '(11) 88888-8888', email: 'vendas@modabrasil.com' },
    { id: '3', nome: 'Livros Tech', contato: '(11) 77777-7777', email: 'pedidos@livrostech.com' }
  ])

  const [busca, setBusca] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState<CategoriaFiltro>('todas')
  const [abaAtiva, setAbaAtiva] = useState('dashboard')
  const [modalProdutoAberto, setModalProdutoAberto] = useState(false)
  const [modalMovimentacaoAberto, setModalMovimentacaoAberto] = useState(false)

  const [novoProduto, setNovoProduto] = useState({
    nome: '',
    categoria: 'eletronicos',
    quantidade: 0,
    estoqueMinimo: 10,
    estoqueMaximo: 100,
    preco: 0,
    fornecedor: ''
  })

  const [novaMovimentacao, setNovaMovimentacao] = useState({
    produtoId: '',
    tipo: 'entrada' as TipoMovimentacao,
    quantidade: 0,
    motivo: '',
    usuario: 'Sistema'
  })

  // Filtrar produtos
  const produtosFiltrados = produtos.filter(produto => {
    const matchBusca = !busca || 
      produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
      produto.codigoBarras.includes(busca)
    
    const matchCategoria = categoriaFiltro === 'todas' || produto.categoria === categoriaFiltro
    
    return matchBusca && matchCategoria
  })

  // Produtos com baixo estoque
  const produtosBaixoEstoque = produtos.filter(p => p.quantidade <= p.estoqueMinimo)

  // Calcular métricas
  const metricas = {
    totalProdutos: produtos.length,
    valorTotal: produtos.reduce((acc, p) => acc + (p.quantidade * p.preco), 0),
    alertasBaixoEstoque: produtosBaixoEstoque.length,
    movimentacoesHoje: movimentacoes.filter(m => 
      m.dataHora.toDateString() === new Date().toDateString()
    ).length
  }

  const criarProduto = () => {
    if (novoProduto.nome.trim()) {
      const produto: Produto = {
        id: Date.now().toString(),
        ...novoProduto,
        codigoBarras: `789${Date.now().toString().slice(-10)}`,
        criadoEm: new Date()
      }
      
      setProdutos([...produtos, produto])
      setNovoProduto({
        nome: '',
        categoria: 'eletronicos',
        quantidade: 0,
        estoqueMinimo: 10,
        estoqueMaximo: 100,
        preco: 0,
        fornecedor: ''
      })
      setModalProdutoAberto(false)
    }
  }

  const criarMovimentacao = () => {
    if (novaMovimentacao.produtoId && novaMovimentacao.quantidade > 0) {
      const produto = produtos.find(p => p.id === novaMovimentacao.produtoId)
      if (!produto) return

      const movimentacao: Movimentacao = {
        id: Date.now().toString(),
        produtoNome: produto.nome,
        dataHora: new Date(),
        ...novaMovimentacao
      }

      // Atualizar estoque
      const novaQuantidade = novaMovimentacao.tipo === 'entrada' 
        ? produto.quantidade + novaMovimentacao.quantidade
        : produto.quantidade - novaMovimentacao.quantidade

      if (novaQuantidade < 0) {
        alert('Estoque insuficiente para esta saída!')
        return
      }

      setProdutos(produtos.map(p => 
        p.id === novaMovimentacao.produtoId 
          ? { ...p, quantidade: novaQuantidade }
          : p
      ))

      setMovimentacoes([movimentacao, ...movimentacoes])
      setNovaMovimentacao({
        produtoId: '',
        tipo: 'entrada',
        quantidade: 0,
        motivo: '',
        usuario: 'Sistema'
      })
      setModalMovimentacaoAberto(false)
    }
  }

  const getCategoriaCor = (categoria: string) => {
    switch (categoria) {
      case 'eletronicos': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'roupas': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'livros': return 'bg-green-100 text-green-800 border-green-200'
      case 'casa': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusEstoque = (produto: Produto) => {
    if (produto.quantidade <= produto.estoqueMinimo) {
      return { status: 'baixo', cor: 'text-red-600', icone: 'AlertTriangle' }
    } else if (produto.quantidade >= produto.estoqueMaximo * 0.8) {
      return { status: 'alto', cor: 'text-green-600', icone: 'TrendingUp' }
    } else {
      return { status: 'normal', cor: 'text-yellow-600', icone: 'Minus' }
    }
  }

  const IconeComponente = ({ nome, className }: { nome: string, className?: string }) => {
    const IconeElemento = (LucideIcons as any)[nome]
    return IconeElemento ? <IconeElemento className={className} /> : <LucideIcons.Circle className={className} />
  }

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-6xl mx-auto border">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold">Sistema de Gestão de Estoque</h3>
            <p className="text-amber-100">Controle completo do seu inventário</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={modalProdutoAberto} onOpenChange={setModalProdutoAberto}>
              <DialogTrigger asChild>
                <Button className="bg-white text-amber-600 hover:bg-amber-50">
                  <LucideIcons.Package className="h-4 w-4 mr-2" />
                  Novo Produto
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cadastrar Produto</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Nome do Produto</label>
                    <Input
                      placeholder="Digite o nome do produto"
                      value={novoProduto.nome}
                      onChange={(e) => setNovoProduto({...novoProduto, nome: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Categoria</label>
                      <Select 
                        value={novoProduto.categoria} 
                        onValueChange={(value) => setNovoProduto({...novoProduto, categoria: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="eletronicos">Eletrônicos</SelectItem>
                          <SelectItem value="roupas">Roupas</SelectItem>
                          <SelectItem value="livros">Livros</SelectItem>
                          <SelectItem value="casa">Casa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Fornecedor</label>
                      <Input
                        placeholder="Nome do fornecedor"
                        value={novoProduto.fornecedor}
                        onChange={(e) => setNovoProduto({...novoProduto, fornecedor: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium">Quantidade</label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={novoProduto.quantidade}
                        onChange={(e) => setNovoProduto({...novoProduto, quantidade: Number(e.target.value)})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Estoque Mín.</label>
                      <Input
                        type="number"
                        placeholder="10"
                        value={novoProduto.estoqueMinimo}
                        onChange={(e) => setNovoProduto({...novoProduto, estoqueMinimo: Number(e.target.value)})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Preço</label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={novoProduto.preco}
                        onChange={(e) => setNovoProduto({...novoProduto, preco: Number(e.target.value)})}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={criarProduto} className="flex-1">
                      Cadastrar Produto
                    </Button>
                    <Button variant="outline" onClick={() => setModalProdutoAberto(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={modalMovimentacaoAberto} onOpenChange={setModalMovimentacaoAberto}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-amber-600">
                  <LucideIcons.ArrowUpDown className="h-4 w-4 mr-2" />
                  Nova Movimentação
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Registrar Movimentação</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Produto</label>
                    <Select 
                      value={novaMovimentacao.produtoId} 
                      onValueChange={(value) => setNovaMovimentacao({...novaMovimentacao, produtoId: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um produto" />
                      </SelectTrigger>
                      <SelectContent>
                        {produtos.map(produto => (
                          <SelectItem key={produto.id} value={produto.id}>
                            {produto.nome} (Estoque: {produto.quantidade})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Tipo</label>
                      <Select 
                        value={novaMovimentacao.tipo} 
                        onValueChange={(value: TipoMovimentacao) => setNovaMovimentacao({...novaMovimentacao, tipo: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="entrada">Entrada</SelectItem>
                          <SelectItem value="saida">Saída</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Quantidade</label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={novaMovimentacao.quantidade}
                        onChange={(e) => setNovaMovimentacao({...novaMovimentacao, quantidade: Number(e.target.value)})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Motivo</label>
                    <Input
                      placeholder="Descreva o motivo da movimentação"
                      value={novaMovimentacao.motivo}
                      onChange={(e) => setNovaMovimentacao({...novaMovimentacao, motivo: e.target.value})}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={criarMovimentacao} className="flex-1">
                      Registrar Movimentação
                    </Button>
                    <Button variant="outline" onClick={() => setModalMovimentacaoAberto(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filtros rápidos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Input
              placeholder="Buscar produtos ou código de barras..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
            />
          </div>
          <Select value={categoriaFiltro} onValueChange={(value: CategoriaFiltro) => setCategoriaFiltro(value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas Categorias</SelectItem>
              <SelectItem value="eletronicos">Eletrônicos</SelectItem>
              <SelectItem value="roupas">Roupas</SelectItem>
              <SelectItem value="livros">Livros</SelectItem>
              <SelectItem value="casa">Casa</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            onClick={() => { setBusca(''); setCategoriaFiltro('todas') }}
            className="border-white/20 text-white hover:bg-white/10"
          >
            Limpar Filtros
          </Button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="p-6">
        <Tabs value={abaAtiva} onValueChange={setAbaAtiva}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="produtos">Produtos</TabsTrigger>
            <TabsTrigger value="movimentacoes">Movimentações</TabsTrigger>
            <TabsTrigger value="alertas">Alertas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="mt-6">
            {/* Métricas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Produtos</p>
                      <p className="text-2xl font-bold">{metricas.totalProdutos}</p>
                    </div>
                    <LucideIcons.Package className="h-8 w-8 text-amber-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Valor Total</p>
                      <p className="text-2xl font-bold">R$ {metricas.valorTotal.toLocaleString('pt-BR')}</p>
                    </div>
                    <LucideIcons.DollarSign className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Alertas</p>
                      <p className="text-2xl font-bold text-red-600">{metricas.alertasBaixoEstoque}</p>
                    </div>
                    <LucideIcons.AlertTriangle className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Movimentações Hoje</p>
                      <p className="text-2xl font-bold">{metricas.movimentacoesHoje}</p>
                    </div>
                    <LucideIcons.Activity className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lista de produtos com baixo estoque */}
            {produtosBaixoEstoque.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-red-600 flex items-center gap-2">
                    <LucideIcons.AlertTriangle className="h-5 w-5" />
                    Produtos com Baixo Estoque
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {produtosBaixoEstoque.map(produto => (
                      <div key={produto.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div>
                          <h4 className="font-medium">{produto.nome}</h4>
                          <p className="text-sm text-gray-600">
                            Estoque atual: {produto.quantidade} | Mínimo: {produto.estoqueMinimo}
                          </p>
                        </div>
                        <Badge variant="destructive">Baixo Estoque</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="produtos" className="mt-6">
            <div className="space-y-4">
              {produtosFiltrados.map(produto => {
                const statusEstoque = getStatusEstoque(produto)
                return (
                  <Card key={produto.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-lg">{produto.nome}</h4>
                            <Badge className={getCategoriaCor(produto.categoria)}>
                              {produto.categoria}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <IconeComponente nome={statusEstoque.icone} className={`h-4 w-4 ${statusEstoque.cor}`} />
                              <span className={`text-xs ${statusEstoque.cor}`}>
                                {statusEstoque.status}
                              </span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Estoque: </span>
                              <span className={produto.quantidade <= produto.estoqueMinimo ? 'text-red-600 font-semibold' : ''}>
                                {produto.quantidade}
                              </span>
                            </div>
                            <div>
                              <span className="font-medium">Preço: </span>
                              R$ {produto.preco.toFixed(2)}
                            </div>
                            <div>
                              <span className="font-medium">Fornecedor: </span>
                              {produto.fornecedor}
                            </div>
                            <div>
                              <span className="font-medium">Código: </span>
                              {produto.codigoBarras}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">
                            R$ {(produto.quantidade * produto.preco).toLocaleString('pt-BR')}
                          </div>
                          <div className="text-xs text-gray-500">Valor total</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}

              {produtosFiltrados.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <LucideIcons.Package className="h-12 w-12 mx-auto mb-4" />
                  <p>Nenhum produto encontrado</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="movimentacoes" className="mt-6">
            <div className="space-y-4">
              {movimentacoes.map(movimentacao => (
                <Card key={movimentacao.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          movimentacao.tipo === 'entrada' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-red-100 text-red-600'
                        }`}>
                          <IconeComponente 
                            nome={movimentacao.tipo === 'entrada' ? 'ArrowDown' : 'ArrowUp'} 
                            className="h-4 w-4" 
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold">{movimentacao.produtoNome}</h4>
                          <p className="text-sm text-gray-600">{movimentacao.motivo}</p>
                          <p className="text-xs text-gray-500">
                            {movimentacao.dataHora.toLocaleString('pt-BR')} • {movimentacao.usuario}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${
                          movimentacao.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {movimentacao.tipo === 'entrada' ? '+' : '-'}{movimentacao.quantidade}
                        </div>
                        <Badge variant={movimentacao.tipo === 'entrada' ? 'default' : 'destructive'}>
                          {movimentacao.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {movimentacoes.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <LucideIcons.Activity className="h-12 w-12 mx-auto mb-4" />
                  <p>Nenhuma movimentação registrada</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="alertas" className="mt-6">
            <div className="space-y-4">
              {produtosBaixoEstoque.length > 0 ? (
                produtosBaixoEstoque.map(produto => (
                  <Card key={produto.id} className="border-red-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                            <LucideIcons.AlertTriangle className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-red-900">{produto.nome}</h4>
                            <p className="text-sm text-red-700">
                              Estoque baixo: {produto.quantidade} unidades (mínimo: {produto.estoqueMinimo})
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="destructive">Urgente</Badge>
                          <p className="text-xs text-gray-500 mt-1">
                            Reabastecer {produto.estoqueMaximo - produto.quantidade} unidades
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <LucideIcons.CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                  <p className="text-green-600">Todos os produtos estão com estoque adequado!</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-4 border-t">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex gap-6">
            <span>Total de produtos: {produtos.length}</span>
            <span>Movimentações: {movimentacoes.length}</span>
            <span>Alertas ativos: {produtosBaixoEstoque.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <LucideIcons.Scan className="h-4 w-4" />
            <span>Sistema integrado com código de barras</span>
          </div>
        </div>
      </div>

      {/* Indicador de interatividade */}
      <div className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white p-2 text-center">
        <div className="flex items-center justify-center gap-2 text-xs">
          <LucideIcons.MousePointer className="h-3 w-3" />
          <span>Sistema interativo • Cadastre produtos, registre movimentações e monitore alertas</span>
        </div>
      </div>
    </div>
  )
}

export default InventoryManagementPreview 