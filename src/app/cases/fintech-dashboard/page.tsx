// app/cases/fintech-dashboard/page.tsx
'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import * as LucideIcons from 'lucide-react'
import Link from 'next/link'
import FinTechDashboardPreview from '@/components/cases/FinTechDashboardPreview'

const FinTechDashboardPage = () => {
  const especificacoes = {
    produto: "Dashboard FinTech",
    categoria: "FinTech",
    complexidade: "Avançado",
    tempo: "2h-6h",
    tecnologias: ['React', 'TypeScript', 'D3.js', 'Node.js'],
    funcionalidades: [
      'Análise de investimentos',
      'Controle de gastos',
      'Metas financeiras',
      'Relatórios detalhados',
      'Gráficos interativos',
      'Alertas automáticos'
    ]
  }

  const arquitecturaDecisao = {
    estrategia: "Sistema Modular",
    justificativa: "Complexidade: 32 pontos (>20) - Múltiplas entidades financeiras, dashboards especializados",
    estrutura: [
      "page.tsx - Orquestrador principal",
      "overview.tsx - Visão geral e métricas",
      "investments.tsx - Análise de investimentos", 
      "expenses.tsx - Controle de gastos",
      "goals.tsx - Metas financeiras"
    ]
  }

  const estadosUI = [
    { categoria: "Estados Primários", estados: ["Loading dados financeiros", "Dashboard populado", "Erro conexão API", "Dados desatualizados"] },
    { categoria: "Estados Condicionais", estados: ["Primeiro acesso (onboarding)", "Portfolio vazio", "Metas não definidas", "Alertas ativos"] },
    { categoria: "Estados de Transição", estados: ["Carregando gráficos", "Atualizando dados", "Sincronizando contas", "Processando relatório"] },
    { categoria: "Estados de Feedback", estados: ["Transação adicionada", "Meta alcançada", "Alerta disparado", "Exportação concluída"] }
  ]

  const padroesTecnicos = [
    {
      padrao: "Formatação Monetária Defensiva",
      codigo: `const formatarMoeda = (valor: number | undefined): string => {
  if (valor === undefined || valor === null || isNaN(valor)) return 'R$ 0,00';
  
  try {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  } catch (error) {
    console.error('Erro ao formatar moeda:', error);
    return 'Valor inválido';
  }
};`,
      justificativa: "Dados financeiros críticos exigem formatação robusta e tratamento de erros"
    },
    {
      padrao: "Timeout Contextualizado para APIs Financeiras",
      codigo: `const timeouts = {
  'portfolio': 10000,    // 10s - dados críticos
  'mercado': 5000,       // 5s - dados em tempo real
  'historico': 15000     // 15s - relatórios pesados
};

const carregarDadosFinanceiros = async (tipo: string) => {
  const timeoutId = setTimeout(() => {
    if (montadoRef.current) {
      setErro('Dados financeiros indisponíveis. Tente novamente.');
    }
  }, timeouts[tipo] || 8000);
  
  // ... resto da implementação
};`,
      justificativa: "APIs financeiras têm latências variáveis, timeout adaptativo melhora UX"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-teal-600/10 to-cyan-600/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center gap-2 mb-4">
              <Badge className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
                FinTech
              </Badge>
              <Badge className="bg-red-100 text-red-800" variant="outline">
                Avançado
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Dashboard FinTech
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Dashboard financeiro completo com análise de investimentos, controle de gastos, 
              metas financeiras e relatórios detalhados. Implementado com padrões defensivos 
              para dados financeiros críticos.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.Clock className="h-4 w-4" />
                <span>2h-6h desenvolvimento</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.Layers className="h-4 w-4" />
                <span>6 módulos funcionais</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.Shield className="h-4 w-4" />
                <span>Dados financeiros seguros</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-teal-600 to-cyan-600">
                <a href="https://github.com/marcos-bricches/fintech-dashboard" target="_blank" rel="noopener noreferrer">
                  <LucideIcons.Github className="mr-2 h-5 w-5" />
                  Ver Código Fonte
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

      {/* Preview Funcional */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Dashboard Funcional
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore todas as funcionalidades implementadas. Dashboard completamente interativo 
              com dados simulados realistas.
            </p>
          </div>
          
          <FinTechDashboardPreview />
        </div>
      </section>

      {/* Especificações */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="arquitetura">Arquitetura</TabsTrigger>
              <TabsTrigger value="estados">Estados UI</TabsTrigger>
              <TabsTrigger value="padroes">Padrões</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Especificações do Produto</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Categoria:</span>
                        <span className="font-medium">{especificacoes.categoria}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Complexidade:</span>
                        <Badge className="bg-red-100 text-red-800">{especificacoes.complexidade}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tempo desenvolvimento:</span>
                        <span className="font-medium">{especificacoes.tempo}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 block mb-2">Tecnologias:</span>
                        <div className="flex flex-wrap gap-1">
                          {especificacoes.tecnologias.map(tech => (
                            <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Funcionalidades Implementadas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {especificacoes.funcionalidades.map((func, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <LucideIcons.CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 text-sm">{func}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="arquitetura" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Decisão Arquitetural</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Estratégia Escolhida</h4>
                      <div className="bg-blue-50 p-4 rounded-lg mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <LucideIcons.Building className="h-5 w-5 text-blue-600" />
                          <span className="font-semibold text-blue-900">{arquitecturaDecisao.estrategia}</span>
                        </div>
                        <p className="text-blue-800 text-sm">{arquitecturaDecisao.justificativa}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Métricas de Complexidade:</h5>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>• Entidades: 6 (Portfolio, Investimento, Gasto, Meta, Alerta, Relatório)</li>
                          <li>• Módulos: 5 (Overview, Investimentos, Gastos, Metas, Relatórios)</li>
                          <li>• Estados UI: 16 mapeados</li>
                          <li>• APIs: 4 integrations (Portfolio, Market, Transactions, Reports)</li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Estrutura de Componentes</h4>
                      <div className="space-y-2">
                        {arquitecturaDecisao.estrutura.map((item, index) => (
                          <div key={index} className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                            <LucideIcons.FileCode className="h-4 w-4 text-gray-500 mt-0.5" />
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="estados" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                {estadosUI.map((categoria, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{categoria.categoria}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {categoria.estados.map((estado, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <LucideIcons.CheckCircle className="h-4 w-4 text-teal-500" />
                            <span className="text-sm text-gray-600">{estado}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="padroes" className="mt-8">
              <div className="space-y-8">
                {padroesTecnicos.map((item, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{item.padrao}</CardTitle>
                      <p className="text-gray-600">{item.justificativa}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-green-400 text-sm">
                          <code>{item.codigo}</code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Aplicação da Metodologia */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Metodologia AI-Enhanced Aplicada
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Como cada etapa da metodologia foi aplicada neste case específico
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                etapa: "Análise Multicamada",
                aplicacao: "Mapeamento completo do domínio financeiro e identificação de dados críticos",
                resultado: "32 pontos de complexidade → Sistema Modular",
                icone: "Search"
              },
              {
                etapa: "Inteligência de Requisitos",
                aplicacao: "Parser semântico identificou 6 entidades financeiras e regras de negócio",
                resultado: "Estrutura de dados robusta para portfolio e transações",
                icone: "Brain"
              },
              {
                etapa: "Arquitetura de Interface",
                aplicacao: "Divisão em módulos especializados por funcionalidade financeira",
                resultado: "5 módulos independentes com responsabilidades claras",
                icone: "Building"
              },
              {
                etapa: "Mapeamento de Estados",
                aplicacao: "16 estados UI específicos para contexto financeiro mapeados",
                resultado: "Cobertura completa: dados sensíveis, atualizações, erros",
                icone: "GitBranch"
              },
              {
                etapa: "Implementação Defensiva",
                aplicacao: "Padrões especializados para dados financeiros críticos",
                resultado: "Formatação monetária robusta e timeouts adaptativos",
                icone: "Shield"
              },
              {
                etapa: "Validação de Qualidade",
                aplicacao: "Testes específicos para precisão de cálculos financeiros",
                resultado: "Score 94/100 - Aprovado para ambiente financeiro",
                icone: "CheckCircle"
              }
            ].map((item, index) => {
              const IconeComponente = LucideIcons[item.icone as keyof typeof LucideIcons] as any
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-lg mb-4">
                      <IconeComponente className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.etapa}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {item.aplicacao}
                    </p>
                    <div className="bg-teal-50 p-3 rounded-lg">
                      <p className="text-teal-800 text-sm font-medium">
                        {item.resultado}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Impressionado com a Qualidade?
          </h2>
          <p className="text-xl text-teal-100 mb-8">
            Este dashboard foi criado em menos de 6 horas usando a metodologia AI-Enhanced
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-teal-600 hover:bg-gray-100">
              <Link href="/metodologia">
                <LucideIcons.BookOpen className="mr-2 h-5 w-5" />
                Como Funciona a Metodologia
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-teal-600">
              <Link href="/contato">
                <LucideIcons.MessageCircle className="mr-2 h-5 w-5" />
                Interessado? Vamos Conversar
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FinTechDashboardPage