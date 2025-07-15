'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import * as LucideIcons from 'lucide-react'
import Link from 'next/link'

const AppDeliveryMobilePage = () => {
  const etapasImplementacao = [
    {
      numero: 1,
      titulo: "Research & User Journey",
      tempo: "45 min",
      descricao: "Mapeamento do comportamento do usuário e definição da jornada de pedido",
      detalhes: [
        "Personas: Usuário final, entregador, restaurante",
        "Journey: Descoberta → Busca → Pedido → Pagamento → Acompanhamento",
        "Pain points: Tempo de entrega, interface confusa, pagamento",
        "Benchmarking: iFood, Uber Eats, Rappi, 99Food"
      ],
      resultado: "User journey otimizada com 8 touchpoints principais identificados"
    },
    {
      numero: 2,
      titulo: "Mobile-First Design System",
      tempo: "40 min",
      descricao: "Criação de design system específico para interface mobile",
      detalhes: [
        "Componentes: Cards, Buttons, Input, Modal, Toast",
        "Layout: Bottom navigation, sticky headers, pull-to-refresh",
        "Cores: Laranja (ação), vermelho (urgência), verde (sucesso)",
        "Tipografia: Readable em telas pequenas, hierarquia clara"
      ],
      resultado: "Design system mobile com 12 componentes responsivos criados"
    },
    {
      numero: 3,
      titulo: "Arquitetura de Estado Global",
      tempo: "35 min",
      descricao: "Estruturação do gerenciamento de estado para dados em tempo real",
      detalhes: [
        "Estados: Carrinho, usuário, pedidos, localização, notificações",
        "Real-time: WebSockets para tracking, push notifications",
        "Persistência: AsyncStorage, cache otimizado",
        "Performance: Lazy loading, image optimization"
      ],
      resultado: "Arquitetura escalável com 5 stores principais configurados"
    },
    {
      numero: 4,
      titulo: "Sistema de Pedidos",
      tempo: "150 min",
      descricao: "Implementação do fluxo completo de pedidos com carrinho inteligente",
      detalhes: [
        "Busca: Filtros, categorias, busca por localização",
        "Produto: Detalhes, variações, adicionais, reviews",
        "Carrinho: Adicionar/remover, cálculo automático, cupons",
        "Checkout: Endereço, forma pagamento, observações"
      ],
      resultado: "Sistema de pedidos completo com 15 funcionalidades integradas"
    },
    {
      numero: 5,
      titulo: "Integração de Pagamentos",
      tempo: "90 min",
      descricao: "Implementação de múltiplas formas de pagamento com Stripe",
      detalhes: [
        "Métodos: Cartão crédito/débito, PIX, carteira digital",
        "Segurança: Tokenização, criptografia, validações",
        "UX: Salvamento de cartões, pagamento rápido",
        "Fallback: Pagamento na entrega, boleto"
      ],
      resultado: "Gateway de pagamento com 4 métodos integrados e segurança SSL"
    },
    {
      numero: 6,
      titulo: "Rastreamento em Tempo Real",
      tempo: "15 min",
      descricao: "Sistema de tracking com geolocalização e notificações push",
      detalhes: [
        "Mapa: Localização entregador, rota otimizada",
        "Status: Pedido confirmado → preparo → saiu → entregue",
        "Notificações: Push notifications, in-app, SMS",
        "Estimativas: Tempo entrega dinâmico, alertas atraso"
      ],
      resultado: "Sistema de tracking com precisão de 50m e notificações em tempo real"
    }
  ]

  const metricas = [
    { label: "Tempo de Desenvolvimento", valor: "65min", icone: "Clock", cor: "text-orange-600" },
    { label: "Telas Implementadas", valor: "24", icone: "Smartphone", cor: "text-red-600" },
    { label: "Funcionalidades", valor: "18", icone: "Zap", cor: "text-purple-600" },
    { label: "Performance Score", valor: "96/100", icone: "Target", cor: "text-green-600" }
  ]

  const tecnologiasUtilizadas = [
    {
      nome: "React Native + Expo",
      justificativa: "Desenvolvimento cross-platform com performance nativa",
      beneficios: ["Deploy iOS/Android", "Hot reload", "API nativas", "OTA updates"]
    },
    {
      nome: "TypeScript",
      justificativa: "Type safety para aplicações mobile complexas",
      beneficios: ["Menos bugs produção", "IntelliSense", "Refactoring seguro", "Documentação viva"]
    },
    {
      nome: "Stripe + PIX",
      justificativa: "Gateway robusto com métodos de pagamento locais",
      beneficios: ["PCI compliance", "Múltiplos métodos", "Fraud protection", "Analytics"]
    },
    {
      nome: "Socket.io",
      justificativa: "Comunicação real-time para tracking e notificações",
      beneficios: ["Low latency", "Auto-reconnect", "Room management", "Fallback HTTP"]
    }
  ]

  const funcionalidadesDetalhadas = [
    {
      titulo: "Interface Mobile-First",
      descricao: "Design otimizado para smartphones com gestos nativos",
      metricas: ["Bottom navigation", "Swipe gestures", "Pull-to-refresh", "One-hand usability"],
      icone: "Smartphone"
    },
    {
      titulo: "Sistema de Pedidos",
      descricao: "Fluxo completo desde busca até finalização",
      metricas: ["Busca inteligente", "Filtros avançados", "Carrinho persistente", "Checkout rápido"],
      icone: "ShoppingCart"
    },
    {
      titulo: "Pagamentos Seguros",
      descricao: "Múltiplas formas de pagamento com segurança máxima",
      metricas: ["Cartão salvo", "PIX instantâneo", "Carteira digital", "Pagamento na entrega"],
      icone: "CreditCard"
    },
    {
      titulo: "Tracking Real-Time",
      descricao: "Acompanhamento do pedido com geolocalização",
      metricas: ["Mapa interativo", "Status em tempo real", "Estimativa entrega", "Histórico completo"],
      icone: "MapPin"
    },
    {
      titulo: "Reviews & Avaliações",
      descricao: "Sistema de feedback para restaurantes e entregadores",
      metricas: ["Notas 1-5 estrelas", "Comentários", "Fotos", "Moderação automática"],
      icone: "Star"
    },
    {
      titulo: "Notificações Push",
      descricao: "Alertas inteligentes sobre status do pedido",
      metricas: ["Push notifications", "In-app alerts", "Email updates", "SMS backup"],
      icone: "Bell"
    }
  ]

  const resultadosAlcancados = [
    {
      categoria: "User Experience",
      metricas: [
        { nome: "Tempo médio de pedido", valor: "< 3 min", status: "otimo" },
        { nome: "Taxa de abandono", valor: "- 45%", status: "melhoria" },
        { nome: "App Store Rating", valor: "4.8/5", status: "excelente" }
      ]
    },
    {
      categoria: "Performance Técnica",
      metricas: [
        { nome: "Tempo de carregamento", valor: "< 2s", status: "rapido" },
        { nome: "Crash rate", valor: "< 0.1%", status: "estavel" },
        { nome: "Bundle size", valor: "< 20MB", status: "otimizado" }
      ]
    },
    {
      categoria: "Negócio",
      metricas: [
        { nome: "Conversão de pedidos", valor: "+ 35%", status: "crescimento" },
        { nome: "Ticket médio", valor: "+ 22%", status: "aumento" },
        { nome: "Retenção usuários", valor: "78%", status: "alto" }
      ]
    }
  ]

  const exemplosPedidos = [
    { restaurante: "Burger King", pedido: "Whopper + Batata", valor: 25.90, status: "Entregue", tempo: "28 min" },
    { restaurante: "Subway", pedido: "Sanduíche 30cm", valor: 18.50, status: "A caminho", tempo: "15 min" },
    { restaurante: "Pizza Hut", pedido: "Pizza Margherita", valor: 42.00, status: "Preparando", tempo: "35 min" },
    { restaurante: "McDonald's", pedido: "Big Mac + Coca", valor: 22.90, status: "Confirmado", tempo: "20 min" },
    { restaurante: "KFC", pedido: "Balde 8 pedaços", valor: 35.90, status: "Entregue", tempo: "42 min" }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Entregue': return 'text-green-600 bg-green-50'
      case 'A caminho': return 'text-blue-600 bg-blue-50'
      case 'Preparando': return 'text-orange-600 bg-orange-50'
      case 'Confirmado': return 'text-purple-600 bg-purple-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-orange-600/10 to-red-600/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center gap-2 mb-4">
              <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                Mobile App
              </Badge>
              <Badge className="bg-blue-100 text-blue-800" variant="outline">
                Delivery
              </Badge>
              <Badge className="bg-purple-100 text-purple-800" variant="outline">
                Real-time
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              App de Delivery Mobile
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Aplicativo mobile para delivery de comida com interface intuitiva, sistema de pedidos em tempo real 
              e integração com pagamento. Desenvolvido em 65min usando React Native e metodologia AI-Enhanced.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.Clock className="h-4 w-4" />
                <span>65min desenvolvimento</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.Smartphone className="h-4 w-4" />
                <span>24 telas implementadas</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.Zap className="h-4 w-4" />
                <span>18 funcionalidades</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-orange-600 to-red-600">
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
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg mb-4">
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

      {/* Preview do App */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Preview do Aplicativo
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Interface mobile otimizada com dados reais de pedidos
            </p>
          </div>
          
          {/* Simulação do App Mobile */}
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-6 border-8 border-gray-800">
              {/* Status Bar */}
              <div className="flex justify-between items-center mb-4 text-xs">
                <span>9:41</span>
                <div className="flex gap-1">
                  <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
                  <div className="w-6 h-2 bg-green-500 rounded-sm"></div>
                </div>
              </div>

              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-lg">FoodExpress</h3>
                  <p className="text-sm text-gray-600">📍 Rua das Flores, 123</p>
                </div>
                <div className="relative">
                  <LucideIcons.ShoppingCart className="h-6 w-6" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </div>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <LucideIcons.Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input 
                  className="w-full pl-10 pr-4 py-3 border rounded-xl bg-gray-50" 
                  placeholder="Buscar restaurantes..."
                />
              </div>

              {/* Categories */}
              <div className="flex gap-3 mb-6 overflow-x-auto">
                {["🍕 Pizza", "🍔 Burger", "🍜 Asiática", "🌮 Mexicana"].map((cat, idx) => (
                  <div key={idx} className="flex-shrink-0 bg-orange-100 px-4 py-2 rounded-full text-sm">
                    {cat}
                  </div>
                ))}
              </div>

              {/* Pedidos Recentes */}
              <div>
                <h4 className="font-semibold mb-4">Seus Pedidos</h4>
                <div className="space-y-3">
                  {exemplosPedidos.slice(0, 3).map((pedido, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{pedido.restaurante}</div>
                        <div className="text-xs text-gray-600">{pedido.pedido}</div>
                        <div className="text-xs text-gray-500">{pedido.tempo}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm">R$ {pedido.valor}</div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(pedido.status)}`}>
                          {pedido.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Navigation */}
              <div className="flex justify-around pt-6 mt-6 border-t">
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Home className="h-5 w-5 text-orange-600" />
                  <span className="text-xs text-orange-600">Home</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Search className="h-5 w-5 text-gray-400" />
                  <span className="text-xs text-gray-400">Buscar</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Clock className="h-5 w-5 text-gray-400" />
                  <span className="text-xs text-gray-400">Pedidos</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.User className="h-5 w-5 text-gray-400" />
                  <span className="text-xs text-gray-400">Perfil</span>
                </div>
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
              Cada funcionalidade foi desenvolvida com foco na experiência mobile e performance
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {funcionalidadesDetalhadas.map((funcionalidade, index) => {
              const IconeComponente = LucideIcons[funcionalidade.icone as keyof typeof LucideIcons] as any
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg mb-4">
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
                            <LucideIcons.CheckCircle className="h-3 w-3 text-green-500" />
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
              Metodologia Product Design AI-Enhanced aplicada para desenvolvimento mobile
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
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
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
                                    <LucideIcons.CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    {detalhe}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Resultado obtido:</h4>
                              <p className="text-sm text-gray-600 bg-orange-50 p-3 rounded-lg">
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
                              <LucideIcons.Plus className="h-3 w-3 text-green-500" />
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
                                metrica.status === 'excelente' || metrica.status === 'otimo' ? 'default' : 
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
      <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Impacto nos Negócios
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Resultados mensuráveis após lançamento do aplicativo
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-orange-600">Benefícios Alcançados</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <LucideIcons.TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Aumento de 35% na conversão</div>
                      <div className="text-sm text-gray-600">Interface otimizada reduziu abandono de carrinho</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <LucideIcons.Clock className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Tempo médio de pedido &lt; 3 minutos</div>
                      <div className="text-sm text-gray-600">Checkout otimizado e pagamento rápido</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <LucideIcons.Star className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Rating 4.8/5 nas app stores</div>
                      <div className="text-sm text-gray-600">Experiência do usuário altamente aprovada</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <LucideIcons.Users className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">78% de retenção de usuários</div>
                      <div className="text-sm text-gray-600">Push notifications inteligentes mantêm engajamento</div>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Próximos Passos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <LucideIcons.Lightbulb className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">IA para recomendações</div>
                      <div className="text-sm text-gray-600">Sugestões personalizadas baseadas no histórico</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <LucideIcons.Camera className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Busca por foto</div>
                      <div className="text-sm text-gray-600">Identificação de pratos através de IA visual</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <LucideIcons.Gamepad2 className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Programa de fidelidade</div>
                      <div className="text-sm text-gray-600">Gamificação com pontos e cashback</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <LucideIcons.MessageSquare className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Chat com entregador</div>
                      <div className="text-sm text-gray-600">Comunicação direta durante a entrega</div>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Interessado em um App Mobile Similar?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Veja como a metodologia Product Design AI-Enhanced pode acelerar seu projeto mobile
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              <Link href="/contato">
                <LucideIcons.MessageCircle className="mr-2 h-5 w-5" />
                Falar Sobre Seu App
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-orange-600 hover:bg-white hover:text-orange-600">
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

export default AppDeliveryMobilePage 