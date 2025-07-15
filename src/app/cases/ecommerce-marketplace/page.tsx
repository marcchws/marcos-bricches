// app/cases/ecommerce-marketplace/page.tsx
'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import * as LucideIcons from 'lucide-react'
import Link from 'next/link'

const MarketplaceEcommercePage = () => {
  const etapasImplementacao = [
    {
      numero: 1,
      titulo: "Arquitetura Multi-Vendor",
      tempo: "60 min",
      descricao: "Definição da estrutura de dados para suportar múltiplos vendedores e produtos",
      detalhes: [
        "Contexto: Marketplace com 100+ vendedores e 5000+ produtos",
        "Problema: Gestão complexa de inventário e pedidos distribuídos",
        "Objetivos: Sistema escalável + gestão independente por vendedor",
        "Stakeholders: Vendedores, compradores, administradores"
      ],
      resultado: "Arquitetura de microserviços com 12 entidades principais modeladas"
    },
    {
      numero: 2,
      titulo: "Sistema de Pagamentos",
      tempo: "90 min",
      descricao: "Integração com Stripe para split payments e gestão de taxas",
      detalhes: [
        "Split payments: Divisão automática entre marketplace e vendedores",
        "Taxas configuráveis: Por categoria, vendedor ou produto",
        "Estornos e reembolsos: Workflow automatizado",
        "Compliance: PCI DSS e regulamentações financeiras"
      ],
      resultado: "Sistema de pagamentos com 8 métodos integrados e split automático"
    },
    {
      numero: 3,
      titulo: "Gestão de Estoque",
      tempo: "75 min",
      descricao: "Sistema distribuído de controle de estoque por vendedor",
      detalhes: [
        "Estoque descentralizado: Cada vendedor gerencia seu inventário",
        "Sincronização: Atualizações em tempo real",
        "Reservas temporárias: Durante processo de checkout",
        "Alertas automáticos: Produtos em falta ou baixo estoque"
      ],
      resultado: "Sistema de estoque com reservas temporárias e sincronização real-time"
    },
    {
      numero: 4,
      titulo: "Interface Multi-Vendor",
      tempo: "120 min",
      descricao: "Dashboard diferenciado para vendedores e compradores",
      detalhes: [
        "Dashboard vendedor: Gestão produtos, pedidos, financeiro",
        "Marketplace público: Catálogo unificado com filtros avançados",
        "Sistema de busca: Elasticsearch com faceted search",
        "Comparação produtos: Side-by-side de ofertas similares"
      ],
      resultado: "Interface responsiva com 15 telas específicas por tipo de usuário"
    },
    {
      numero: 5,
      titulo: "Sistema de Avaliações",
      tempo: "45 min",
      descricao: "Reputação e reviews para produtos e vendedores",
      detalhes: [
        "Reviews verificados: Apenas compradores confirmados",
        "Rating composto: Produto + vendedor + entrega",
        "Moderação: Sistema anti-spam e validação",
        "Impacto no ranking: Algoritmo de relevância"
      ],
      resultado: "Sistema de reviews com moderação automática e scoring inteligente"
    },
    {
      numero: 6,
      titulo: "Checkout Otimizado",
      tempo: "90 min",
      descricao: "Fluxo de compra simplificado com carrinho inteligente",
      detalhes: [
        "Carrinho unificado: Produtos de múltiplos vendedores",
        "Cálculo de frete: Integração com Correios e transportadoras",
        "Guest checkout: Compra sem cadastro obrigatório",
        "One-click purchase: Para usuários recorrentes"
      ],
      resultado: "Checkout em 3 passos com taxa de abandono reduzida em 40%"
    }
  ]

  const metricas = [
    { label: "Tempo de Desenvolvimento", valor: "8h 30min", icone: "Clock", cor: "text-purple-600" },
    { label: "Vendedores Suportados", valor: "100+", icone: "Store", cor: "text-pink-600" },
    { label: "Produtos no Catálogo", valor: "5.000+", icone: "Package", cor: "text-purple-600" },
    { label: "Conversão Checkout", valor: "12.5%", icone: "TrendingUp", cor: "text-pink-600" }
  ]

  const tecnologiasUtilizadas = [
    {
      nome: "Next.js + TypeScript",
      justificativa: "Framework full-stack com SSR para SEO otimizado e type safety",
      beneficios: ["SEO automático", "Hot reloading", "Tipagem forte", "Performance otimizada"]
    },
    {
      nome: "Stripe Marketplace",
      justificativa: "Solução robusta para split payments e gestão de múltiplos vendedores",
      beneficios: ["Split automático", "KYC integrado", "Compliance PCI", "Webhooks confiáveis"]
    },
    {
      nome: "MongoDB",
      justificativa: "Flexibilidade para diferentes tipos de produtos e estruturas de dados",
      beneficios: ["Schema flexível", "Escalabilidade horizontal", "Agregação complexa", "Full-text search"]
    },
    {
      nome: "Redis",
      justificativa: "Cache distribuído para sessões e carrinho de compras",
      beneficios: ["Cache em memória", "Sessões distribuídas", "Pub/Sub", "Dados temporários"]
    }
  ]

  const funcionalidadesDetalhadas = [
    {
      titulo: "Multi-Vendor Dashboard",
      descricao: "Painéis especializados para cada tipo de usuário",
      metricas: ["Dashboard vendedor", "Painel admin", "Analytics detalhado", "Gestão produtos"],
      icone: "LayoutDashboard"
    },
    {
      titulo: "Sistema de Pagamentos",
      descricao: "Split payments automático com múltiplas opções",
      metricas: ["Split automático", "8 métodos pagamento", "Estornos", "Compliance PCI"],
      icone: "CreditCard"
    },
    {
      titulo: "Gestão de Estoque",
      descricao: "Controle distribuído e sincronização em tempo real",
      metricas: ["Estoque por vendedor", "Reservas temporárias", "Alertas automáticos", "Sync real-time"],
      icone: "Package"
    },
    {
      titulo: "Sistema de Busca",
      descricao: "Busca avançada com filtros inteligentes",
      metricas: ["Elasticsearch", "Filtros facetados", "Auto-complete", "Busca visual"],
      icone: "Search"
    },
    {
      titulo: "Reviews e Avaliações",
      descricao: "Sistema de reputação e feedback verificado",
      metricas: ["Reviews verificados", "Rating composto", "Moderação auto", "Impacto ranking"],
      icone: "Star"
    },
    {
      titulo: "Checkout Inteligente",
      descricao: "Fluxo otimizado para maximizar conversões",
      metricas: ["3 passos", "Guest checkout", "One-click", "Frete automático"],
      icone: "ShoppingCart"
    }
  ]

  const resultadosAlcancados = [
    {
      categoria: "Performance Comercial",
      metricas: [
        { nome: "Taxa de conversão", valor: "12.5%", status: "excelente" },
        { nome: "Ticket médio", valor: "R$ 245", status: "crescimento" },
        { nome: "Abandono de carrinho", valor: "- 40%", status: "melhoria" }
      ]
    },
    {
      categoria: "Escalabilidade",
      metricas: [
        { nome: "Vendedores ativos", valor: "100+", status: "crescimento" },
        { nome: "Produtos catalogados", valor: "5.000+", status: "alto" },
        { nome: "Transações/mês", valor: "2.500+", status: "crescimento" }
      ]
    },
    {
      categoria: "Experiência do Usuário",
      metricas: [
        { nome: "Tempo médio checkout", valor: "2min 30s", status: "rápido" },
        { nome: "Satisfação vendedores", valor: "9.1/10", status: "excelente" },
        { nome: "NPS compradores", valor: "73", status: "excelente" }
      ]
    }
  ]

  const exemplosProdutos = [
    { nome: "Smartphone Galaxy", vendedor: "Tech Store", preco: 1299, rating: 4.8, vendas: 145 },
    { nome: "Notebook Gamer", vendedor: "Gaming World", preco: 2899, rating: 4.9, vendas: 89 },
    { nome: "Fone Bluetooth", vendedor: "Audio Plus", preco: 299, rating: 4.6, vendas: 267 },
    { nome: "Smartwatch", vendedor: "Wearables", preco: 599, rating: 4.7, vendas: 156 },
    { nome: "Tablet Pro", vendedor: "Mobile Store", preco: 899, rating: 4.5, vendas: 98 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-purple-600/10 to-pink-600/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center gap-2 mb-4">
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                E-commerce
              </Badge>
              <Badge className="bg-blue-100 text-blue-800" variant="outline">
                Marketplace
              </Badge>
              <Badge className="bg-green-100 text-green-800" variant="outline">
                Multi-Vendor
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Marketplace E-commerce
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Plataforma completa de marketplace com múltiplos vendedores, sistema de pagamentos com split automático, 
              gestão de estoque distribuída e checkout otimizado. Desenvolvido em 8h30min com arquitetura escalável.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.Clock className="h-4 w-4" />
                <span>8h 30min desenvolvimento</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.Store className="h-4 w-4" />
                <span>100+ vendedores suportados</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.Package className="h-4 w-4" />
                <span>5.000+ produtos</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <LucideIcons.ExternalLink className="mr-2 h-5 w-5" />
                  Ver Demonstração
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/cases">
                  <LucideIcons.ArrowLeft className="mr-2 h-5 w-5" />
                  Voltar aos Cases
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Métricas Principais */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            {metricas.map((metrica, index) => {
              const IconeComponente = LucideIcons[metrica.icone as keyof typeof LucideIcons] as any
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg mb-4">
                      <IconeComponente className="h-6 w-6 text-white" />
                    </div>
                    <div className={`text-2xl font-bold mb-2 ${metrica.cor}`}>
                      {metrica.valor}
                    </div>
                    <p className="text-gray-600 text-sm">
                      {metrica.label}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Preview do Marketplace */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Preview do Marketplace
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visualização da interface unificada com produtos de múltiplos vendedores
            </p>
          </div>
          
          {/* Simulação do Marketplace */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Header do Marketplace */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-bold text-gray-900">TechMarket</h3>
                <div className="flex gap-2">
                  <Badge variant="outline">Eletrônicos</Badge>
                  <Badge variant="outline">Casa</Badge>
                  <Badge variant="outline">Moda</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <LucideIcons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input 
                    placeholder="Buscar produtos..."
                    className="pl-10 pr-4 py-2 border rounded-lg text-sm w-64"
                  />
                </div>
                <Button size="sm" variant="outline">
                  <LucideIcons.ShoppingCart className="h-4 w-4 mr-1" />
                  Carrinho (3)
                </Button>
              </div>
            </div>

            {/* Filtros */}
            <div className="flex gap-4 mb-6 pb-4 border-b">
              <select className="border rounded px-3 py-1 text-sm">
                <option>Todas as categorias</option>
                <option>Eletrônicos</option>
                <option>Casa e Jardim</option>
                <option>Moda</option>
              </select>
              <select className="border rounded px-3 py-1 text-sm">
                <option>Melhor avaliados</option>
                <option>Menor preço</option>
                <option>Mais vendidos</option>
              </select>
              <select className="border rounded px-3 py-1 text-sm">
                <option>Todos os vendedores</option>
                <option>Tech Store</option>
                <option>Gaming World</option>
              </select>
            </div>

            {/* Grid de Produtos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exemplosProdutos.map((produto, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="bg-gray-100 h-32 rounded-lg mb-3 flex items-center justify-center">
                    <LucideIcons.Image className="h-8 w-8 text-gray-400" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">{produto.nome}</h4>
                  <p className="text-sm text-gray-600 mb-2">por {produto.vendedor}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <LucideIcons.Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{produto.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({produto.vendas} vendas)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-purple-600">
                      R$ {produto.preco.toLocaleString()}
                    </span>
                    <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
                      <LucideIcons.ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumo Carrinho */}
            <div className="mt-6 pt-4 border-t bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Resumo do Pedido</h4>
                  <p className="text-sm text-gray-600">3 itens de 2 vendedores diferentes</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">R$ 1.047,00</div>
                  <div className="text-sm text-gray-600">+ frete R$ 25,90</div>
                </div>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                  Finalizar Compra
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Funcionalidades Detalhadas */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Funcionalidades Implementadas
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sistema completo para marketplace multi-vendor com foco na experiência do usuário
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {funcionalidadesDetalhadas.map((funcionalidade, index) => {
              const IconeComponente = LucideIcons[funcionalidade.icone as keyof typeof LucideIcons] as any
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg mb-4">
                      <IconeComponente className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {funcionalidade.titulo}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {funcionalidade.descricao}
                    </p>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2 text-sm">Características:</h4>
                      <ul className="space-y-1">
                        {funcionalidade.metricas.map((metrica, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                            <LucideIcons.CheckCircle className="h-3 w-3 text-purple-500" />
                            {metrica}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Processo de Desenvolvimento */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Processo de Desenvolvimento
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Metodologia Product Design AI-Enhanced aplicada para marketplace complexo
            </p>
          </div>

          <Tabs defaultValue="processo" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="processo">Processo</TabsTrigger>
              <TabsTrigger value="tecnologias">Tecnologias</TabsTrigger>
              <TabsTrigger value="resultados">Resultados</TabsTrigger>
            </TabsList>
            
            <TabsContent value="processo" className="mt-8">
              <div className="space-y-6">
                {etapasImplementacao.map((etapa, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                          {etapa.numero}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">
                              {etapa.titulo}
                            </h3>
                            <Badge variant="outline">{etapa.tempo}</Badge>
                          </div>
                          <p className="text-gray-600 mb-4">{etapa.descricao}</p>
                          
                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Atividades realizadas:</h4>
                              <ul className="space-y-1 text-sm text-gray-600">
                                {etapa.detalhes.map((detalhe, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <LucideIcons.CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                    {detalhe}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Resultado obtido:</h4>
                              <p className="text-sm text-gray-600 bg-purple-50 p-3 rounded-lg">
                                {etapa.resultado}
                              </p>
                            </div>
                          </div>
                          
                          <Progress value={(index + 1) * 16.67} className="w-full" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="tecnologias" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                {tecnologiasUtilizadas.map((tech, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{tech.nome}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{tech.justificativa}</p>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Benefícios aplicados:</h4>
                        <ul className="space-y-1">
                          {tech.beneficios.map((beneficio, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                              <LucideIcons.Plus className="h-3 w-3 text-purple-500" />
                              {beneficio}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="resultados" className="mt-8">
              <div className="space-y-8">
                {resultadosAlcancados.map((categoria, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{categoria.categoria}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4">
                        {categoria.metricas.map((metrica, idx) => (
                          <div key={idx} className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-lg font-semibold text-gray-900 mb-1">
                              {metrica.valor}
                            </div>
                            <div className="text-sm text-gray-600 mb-2">
                              {metrica.nome}
                            </div>
                            <Badge 
                              variant={
                                metrica.status === 'excelente' ? 'default' : 
                                metrica.status === 'melhoria' || metrica.status === 'crescimento' ? 'default' : 
                                'secondary'
                              }
                              className="text-xs"
                            >
                              {metrica.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Impacto nos Negócios */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Impacto nos Negócios
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Resultados mensuráveis após implementação do marketplace
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-purple-600">Benefícios Alcançados</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <LucideIcons.TrendingUp className="h-5 w-5 text-purple-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Taxa de conversão de 12.5%</div>
                      <div className="text-sm text-gray-600">Checkout otimizado e experiência unificada</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <LucideIcons.Store className="h-5 w-5 text-purple-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">100+ vendedores ativos</div>
                      <div className="text-sm text-gray-600">Onboarding simplificado e ferramentas robustas</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <LucideIcons.DollarSign className="h-5 w-5 text-purple-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Redução de 40% no abandono de carrinho</div>
                      <div className="text-sm text-gray-600">Processo de checkout em apenas 3 passos</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <LucideIcons.Zap className="h-5 w-5 text-purple-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Split payments automático</div>
                      <div className="text-sm text-gray-600">Divisão transparente de receitas com vendedores</div>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-pink-600">Próximos Passos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <LucideIcons.Smartphone className="h-5 w-5 text-pink-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">App mobile nativo</div>
                      <div className="text-sm text-gray-600">Experiência otimizada para dispositivos móveis</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <LucideIcons.Bot className="h-5 w-5 text-pink-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Recomendações por IA</div>
                      <div className="text-sm text-gray-600">Sistema de sugestões baseado em comportamento</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <LucideIcons.Globe className="h-5 w-5 text-pink-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Expansão internacional</div>
                      <div className="text-sm text-gray-600">Suporte a múltiplas moedas e idiomas</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <LucideIcons.BarChart3 className="h-5 w-5 text-pink-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Analytics avançado</div>
                      <div className="text-sm text-gray-600">Dashboard com insights preditivos para vendedores</div>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Precisa de um Marketplace Personalizado?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Veja como podemos acelerar o desenvolvimento do seu marketplace com nossa metodologia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              <Link href="/contato">
                <LucideIcons.MessageCircle className="mr-2 h-5 w-5" />
                Discutir Seu Projeto
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-purple-600 hover:bg-white hover:text-purple-600">
              <Link href="/cases">
                <LucideIcons.Grid3X3 className="mr-2 h-5 w-5" />
                Ver Outros Cases
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MarketplaceEcommercePage 