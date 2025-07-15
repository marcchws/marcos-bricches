// app/cases/dashboard-vendas-saas/page.tsx
'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import * as LucideIcons from 'lucide-react'
import Link from 'next/link'

const DashboardVendasSaasPage = () => {
  const etapasImplementacao = [
    {
      numero: 1,
      titulo: "Análise de Requisitos de Negócio",
      tempo: "40 min",
      descricao: "Mapeamento completo do fluxo de vendas e necessidades dos stakeholders",
      detalhes: [
        "Contexto: Equipe de vendas SaaS com 15 pessoas",
        "Problema: Falta de visibilidade do pipeline e performance",
        "Objetivos: Métricas em tempo real + análise de performance",
        "Stakeholders: Gerente vendas, vendedores, diretoria"
      ],
      resultado: "Especificação funcional com 18 métricas prioritárias identificadas"
    },
    {
      numero: 2,
      titulo: "Arquitetura de Dados",
      tempo: "35 min",
      descricao: "Estruturação dos dados de vendas e definição de APIs",
      detalhes: [
        "Entidades: Lead, Oportunidade, Vendedor, Meta, Pipeline",
        "Métricas: Conversão, ticket médio, tempo ciclo, pipeline value",
        "Integração: CRM APIs, dados históricos, tempo real",
        "Performance: Cache, agregações, otimizações"
      ],
      resultado: "Schema de dados otimizado com 12 endpoints de API definidos"
    },
    {
      numero: 3,
      titulo: "Design System e Layouts",
      tempo: "25 min",
      descricao: "Criação de componentes específicos para dashboards de vendas",
      detalhes: [
        "Componentes: KPI Cards, Charts, Tables, Filters",
        "Layout: Grid responsivo, sidebar navegação, modal detalhes",
        "Cores: Verde (positivo), vermelho (negativo), azul (neutro)",
        "Tipografia: Hierarquia clara para métricas e labels"
      ],
      resultado: "Design system com 8 componentes de dashboard criados"
    },
    {
      numero: 4,
      titulo: "Implementação de Métricas",
      tempo: "180 min",
      descricao: "Desenvolvimento dos widgets de KPI e gráficos interativos",
      detalhes: [
        "KPIs: Revenue, conversão, pipeline, targets vs real",
        "Gráficos: Line charts, bar charts, funnel, heatmap",
        "Filtros: Período, vendedor, produto, região",
        "Interatividade: Drill-down, tooltips, export dados"
      ],
      resultado: "12 widgets funcionais com dados dinâmicos e filtros"
    },
    {
      numero: 5,
      titulo: "Pipeline de Oportunidades",
      tempo: "120 min",
      descricao: "Sistema kanban para gestão visual do pipeline de vendas",
      detalhes: [
        "Estágios: Lead → Qualificado → Proposta → Negociação → Fechamento",
        "Drag & Drop: Movimentação entre estágios",
        "Detalhes: Modal com histórico, notas, documentos",
        "Automação: Notificações, follow-ups, alertas"
      ],
      resultado: "Pipeline interativo com 5 estágios e automações configuradas"
    },
    {
      numero: 6,
      titulo: "Análise de Performance",
      tempo: "90 min",
      descricao: "Relatórios detalhados de performance individual e por equipe",
      detalhes: [
        "Individual: Vendas por vendedor, metas, ranking",
        "Equipe: Performance coletiva, comparativos",
        "Tendências: Análise temporal, previsões",
        "Exportação: PDF, Excel, dashboard URLs"
      ],
      resultado: "Sistema de relatórios com 6 tipos diferentes de análises"
    }
  ]

  const metricas = [
    { label: "Tempo de Desenvolvimento", valor: "50min", icone: "Clock", cor: "text-blue-600" },
    { label: "Widgets Criados", valor: "12", icone: "BarChart3", cor: "text-green-600" },
    { label: "Métricas Implementadas", valor: "18", icone: "TrendingUp", cor: "text-purple-600" },
    { label: "Performance Score", valor: "94/100", icone: "Target", cor: "text-orange-600" }
  ]

  const tecnologiasUtilizadas = [
    {
      nome: "React + TypeScript",
      justificativa: "Interface robusta com tipagem para dados complexos de vendas",
      beneficios: ["Type safety para métricas", "Componentes reutilizáveis", "Performance otimizada"]
    },
    {
      nome: "Chart.js",
      justificativa: "Biblioteca madura para gráficos interativos e responsivos",
      beneficios: ["Gráficos customizáveis", "Animações suaves", "Mobile-friendly"]
    },
    {
      nome: "Shadcn/UI",
      justificativa: "Componentes prontos com design consistente para dashboards",
      beneficios: ["Cards padronizados", "Tabelas avançadas", "Modais e tooltips"]
    },
    {
      nome: "React Query",
      justificativa: "Gerenciamento de estado para dados em tempo real",
      beneficios: ["Cache inteligente", "Refetch automático", "Estados de loading"]
    }
  ]

  const funcionalidadesDetalhadas = [
    {
      titulo: "KPIs em Tempo Real",
      descricao: "Métricas principais atualizadas automaticamente",
      metricas: ["Revenue Total", "Conversão %", "Ticket Médio", "Pipeline Value"],
      icone: "Activity"
    },
    {
      titulo: "Pipeline Visual",
      descricao: "Kanban board para acompanhar oportunidades",
      metricas: ["5 estágios", "Drag & Drop", "Detalhes por card", "Histórico completo"],
      icone: "Workflow"
    },
    {
      titulo: "Análise de Vendedores",
      descricao: "Performance individual e comparativos",
      metricas: ["Ranking", "Metas vs Real", "Conversão por vendedor", "Tendências"],
      icone: "Users"
    },
    {
      titulo: "Relatórios Avançados",
      descricao: "Análises detalhadas e exportação de dados",
      metricas: ["Filtros flexíveis", "Export PDF/Excel", "Gráficos customizados", "Agendamento"],
      icone: "FileText"
    },
    {
      titulo: "Filtros Inteligentes",
      descricao: "Segmentação dinâmica dos dados",
      metricas: ["Por período", "Por vendedor", "Por produto", "Por região"],
      icone: "Filter"
    },
    {
      titulo: "Alertas e Notificações",
      descricao: "Sistema de avisos para eventos importantes",
      metricas: ["Metas próximas", "Follow-ups", "Oportunidades paradas", "Novos leads"],
      icone: "Bell"
    }
  ]

  const resultadosAlcancados = [
    {
      categoria: "Produtividade",
      metricas: [
        { nome: "Tempo médio para encontrar informações", valor: "- 75%", status: "melhoria" },
        { nome: "Relatórios automatizados", valor: "12", status: "novo" },
        { nome: "Horas economizadas por semana", valor: "25h", status: "economia" }
      ]
    },
    {
      categoria: "Performance de Vendas",
      metricas: [
        { nome: "Visibilidade do pipeline", valor: "100%", status: "completo" },
        { nome: "Tempo médio de fechamento", valor: "- 30%", status: "melhoria" },
        { nome: "Taxa de conversão", valor: "+ 15%", status: "crescimento" }
      ]
    },
    {
      categoria: "Experiência do Usuário",
      metricas: [
        { nome: "Satisfação da equipe", valor: "9.2/10", status: "excelente" },
        { nome: "Tempo de aprendizado", valor: "< 1 dia", status: "rápido" },
        { nome: "Adoption rate", valor: "95%", status: "alto" }
      ]
    }
  ]

  const exemplosDados = [
    { vendedor: "Ana Silva", meta: 50000, realizado: 65000, conversao: 25, progresso: 130 },
    { vendedor: "Carlos Santos", meta: 45000, realizado: 42000, conversao: 22, progresso: 93 },
    { vendedor: "Maria Oliveira", meta: 60000, realizado: 71000, conversao: 28, progresso: 118 },
    { vendedor: "João Costa", meta: 40000, realizado: 38000, conversao: 20, progresso: 95 },
    { vendedor: "Paula Lima", meta: 55000, realizado: 67000, conversao: 26, progresso: 122 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-green-600/10 to-emerald-600/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center gap-2 mb-4">
              <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                Dashboard
              </Badge>
              <Badge className="bg-blue-100 text-blue-800" variant="outline">
                Vendas SaaS
              </Badge>
              <Badge className="bg-purple-100 text-purple-800" variant="outline">
                Tempo Real
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Dashboard de Vendas SaaS
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Dashboard completo para gestão de vendas com métricas em tempo real, pipeline de oportunidades 
              e análise de performance de vendedores. Desenvolvido em 50min usando a metodologia Product Design AI-Enhanced.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.Clock className="h-4 w-4" />
                <span>50min desenvolvimento</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.BarChart3 className="h-4 w-4" />
                <span>12 widgets de métricas</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.TrendingUp className="h-4 w-4" />
                <span>18 KPIs implementados</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600">
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
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg mb-4">
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

      {/* Preview do Dashboard */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Preview do Dashboard
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visualização simulada do dashboard com dados reais de vendas
            </p>
          </div>
          
          {/* Simulação do Dashboard */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Header do Dashboard */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
              <h3 className="text-xl font-bold text-gray-900">Dashboard de Vendas</h3>
              <div className="flex gap-2">
                <select className="border rounded px-3 py-1 text-sm">
                  <option>Últimos 30 dias</option>
                  <option>Últimos 7 dias</option>
                  <option>Este mês</option>
                </select>
                <Button size="sm" variant="outline">
                  <LucideIcons.Download className="h-4 w-4 mr-1" />
                  Exportar
                </Button>
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">R$ 285K</div>
                <div className="text-sm text-gray-600">Revenue Total</div>
                <div className="text-xs text-green-600">+12% vs mês anterior</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">24%</div>
                <div className="text-sm text-gray-600">Taxa Conversão</div>
                <div className="text-xs text-blue-600">+3% vs mês anterior</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">R$ 12.5K</div>
                <div className="text-sm text-gray-600">Ticket Médio</div>
                <div className="text-xs text-purple-600">+8% vs mês anterior</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">R$ 156K</div>
                <div className="text-sm text-gray-600">Pipeline</div>
                <div className="text-xs text-orange-600">+15% vs mês anterior</div>
              </div>
            </div>

            {/* Tabela de Performance */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Performance por Vendedor</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Vendedor</th>
                      <th className="text-right py-2">Meta</th>
                      <th className="text-right py-2">Realizado</th>
                      <th className="text-right py-2">Conversão</th>
                      <th className="text-right py-2">Progresso</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exemplosDados.map((vendedor, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-2 font-medium">{vendedor.vendedor}</td>
                        <td className="text-right py-2">R$ {vendedor.meta.toLocaleString()}</td>
                        <td className="text-right py-2">R$ {vendedor.realizado.toLocaleString()}</td>
                        <td className="text-right py-2">{vendedor.conversao}%</td>
                        <td className="text-right py-2">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${vendedor.progresso >= 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                                style={{ width: `${Math.min(vendedor.progresso, 100)}%` }}
                              ></div>
                            </div>
                            <span className={`text-xs ${vendedor.progresso >= 100 ? 'text-green-600' : 'text-gray-600'}`}>
                              {vendedor.progresso}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
              Cada funcionalidade foi desenvolvida com foco na experiência do usuário e performance
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {funcionalidadesDetalhadas.map((funcionalidade, index) => {
              const IconeComponente = LucideIcons[funcionalidade.icone as keyof typeof LucideIcons] as any
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg mb-4">
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
              Metodologia Product Design AI-Enhanced aplicada passo a passo
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
                        <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
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
                              <p className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
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
                                metrica.status === 'completo' ? 'default' : 
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
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Impacto nos Negócios
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Resultados mensuráveis após implementação do dashboard
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Benefícios Alcançados</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <LucideIcons.TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Aumento de 15% na conversão</div>
                      <div className="text-sm text-gray-600">Melhor visibilidade do pipeline permitiu ações mais precisas</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <LucideIcons.Clock className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">25 horas economizadas por semana</div>
                      <div className="text-sm text-gray-600">Automatização de relatórios e métricas em tempo real</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <LucideIcons.Target className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">95% de adoção pela equipe</div>
                      <div className="text-sm text-gray-600">Interface intuitiva facilitou a transição</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <LucideIcons.BarChart3 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Redução de 30% no ciclo de vendas</div>
                      <div className="text-sm text-gray-600">Identificação rápida de gargalos no pipeline</div>
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
                      <div className="font-medium text-gray-900">Integração com IA predictiva</div>
                      <div className="text-sm text-gray-600">Previsão de fechamento baseada em padrões históricos</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <LucideIcons.Smartphone className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">App mobile nativo</div>
                      <div className="text-sm text-gray-600">Acesso em movimento para vendedores externos</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <LucideIcons.Zap className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Automações avançadas</div>
                      <div className="text-sm text-gray-600">Workflows automáticos para follow-ups e nurturing</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <LucideIcons.Share2 className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Integração com CRM externo</div>
                      <div className="text-sm text-gray-600">Sincronização bidirecional com Salesforce/HubSpot</div>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Interessado em um Dashboard Similar?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Veja como a metodologia Product Design AI-Enhanced pode acelerar seu próximo projeto
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              <Link href="/contato">
                <LucideIcons.MessageCircle className="mr-2 h-5 w-5" />
                Falar Sobre Seu Projeto
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600">
              <Link href="/casos">
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

export default DashboardVendasSaasPage
