// app/cases/crm-gestao-clientes/page.tsx
'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import * as LucideIcons from 'lucide-react'
import Link from 'next/link'

const CrmGestaoClientesPage = () => {
  const etapasImplementacao = [
    {
      numero: 1,
      titulo: "Análise do Processo de Vendas",
      tempo: "50 min",
      descricao: "Mapeamento completo do fluxo de leads e relacionamento com clientes",
      detalhes: [
        "Contexto: Empresa B2B com 200+ leads mensais",
        "Problema: Perda de leads e falta de follow-up sistemático",
        "Objetivos: Automação do pipeline e histórico completo de interações",
        "Stakeholders: Vendas, marketing, atendimento, gestão"
      ],
      resultado: "Especificação funcional com 25 fluxos de processo mapeados"
    },
    {
      numero: 2,
      titulo: "Modelagem de Dados CRM",
      tempo: "60 min",
      descricao: "Estruturação das entidades de leads, clientes e oportunidades",
      detalhes: [
        "Entidades: Lead, Cliente, Oportunidade, Interação, Campanha, Tarefa",
        "Relacionamentos: Histórico completo, tags, segmentação",
        "Automação: Triggers, workflows, scoring de leads",
        "Integração: Email, telefonia, calendário, redes sociais"
      ],
      resultado: "Schema de banco otimizado com 18 tabelas e API REST completa"
    },
    {
      numero: 3,
      titulo: "Design System CRM",
      tempo: "40 min",
      descricao: "Interface específica para gestão de relacionamento com clientes",
      detalhes: [
        "Componentes: Lead cards, timeline, formulários dinâmicos",
        "Layout: Dashboard, listagens, modais de detalhes, kanban",
        "Cores: Azul (leads), verde (clientes), roxo (oportunidades)",
        "UX: Fluxos otimizados para vendedores e gestores"
      ],
      resultado: "Design system com 15 componentes específicos para CRM"
    },
    {
      numero: 4,
      titulo: "Pipeline de Leads",
      tempo: "180 min",
      descricao: "Sistema kanban para gestão visual do funil de vendas",
      detalhes: [
        "Estágios: Lead → Qualificado → Oportunidade → Proposta → Cliente",
        "Funcionalidades: Drag & Drop, scoring automático, alertas",
        "Automação: Rotação de leads, follow-ups, tarefas automáticas",
        "Analytics: Conversão por estágio, tempo médio, performance"
      ],
      resultado: "Pipeline interativo com 5 estágios e 12 automações configuradas"
    },
    {
      numero: 5,
      titulo: "Gestão de Interações",
      tempo: "150 min",
      descricao: "Histórico completo de todas as interações com leads e clientes",
      detalhes: [
        "Timeline: Emails, ligações, reuniões, propostas, contratos",
        "Integração: Gmail, Outlook, WhatsApp, calendário",
        "Automação: Log automático, classificação de interações",
        "Busca: Filtros avançados, pesquisa semântica"
      ],
      resultado: "Sistema de timeline com integração a 8 canais de comunicação"
    },
    {
      numero: 6,
      titulo: "Automação de Marketing",
      tempo: "120 min",
      descricao: "Campanhas automatizadas e nurturing de leads",
      detalhes: [
        "Email Marketing: Templates, sequências, A/B testing",
        "Segmentação: Comportamental, demográfica, personalizada",
        "Triggers: Ações baseadas em eventos, scoring",
        "Analytics: Open rate, click rate, conversão por campanha"
      ],
      resultado: "Sistema de automação com 20 templates e 15 workflows pré-configurados"
    }
  ]

  const metricas = [
    { label: "Tempo de Desenvolvimento", valor: "10h 30min", icone: "Clock", cor: "text-blue-600" },
    { label: "Funcionalidades Criadas", valor: "25", icone: "Zap", cor: "text-indigo-600" },
    { label: "Integrações Implementadas", valor: "8", icone: "Puzzle", cor: "text-purple-600" },
    { label: "Automações Configuradas", valor: "15", icone: "Workflow", cor: "text-blue-800" }
  ]

  const tecnologiasUtilizadas = [
    {
      nome: "Next.js + TypeScript",
      justificativa: "Framework full-stack para aplicação complexa com tipagem robusta",
      beneficios: ["SSR para performance", "API routes integradas", "Type safety completo"]
    },
    {
      nome: "PostgreSQL + Prisma",
      justificativa: "Banco relacional robusto com ORM moderno para relacionamentos complexos",
      beneficios: ["Relacionamentos complexos", "Migrations automáticas", "Type-safe queries"]
    },
    {
      nome: "Tailwind CSS",
      justificativa: "Framework CSS para interface responsiva e consistente",
      beneficios: ["Design system escalável", "Responsive first", "Performance otimizada"]
    },
    {
      nome: "React Hook Form",
      justificativa: "Gerenciamento eficiente de formulários complexos",
      beneficios: ["Validação robusta", "Performance otimizada", "UX fluida"]
    }
  ]

  const funcionalidadesDetalhadas = [
    {
      titulo: "Gestão de Leads",
      descricao: "Captura, qualificação e nurturing de leads",
      metricas: ["Formulários dinâmicos", "Scoring automático", "Rotação inteligente", "Tags personalizadas"],
      icone: "Users"
    },
    {
      titulo: "Pipeline de Vendas",
      descricao: "Funil visual para acompanhar oportunidades",
      metricas: ["5 estágios customizáveis", "Drag & Drop", "Previsão de fechamento", "Métricas por estágio"],
      icone: "TrendingUp"
    },
    {
      titulo: "Histórico de Interações",
      descricao: "Timeline completa de todas as comunicações",
      metricas: ["Emails automáticos", "Ligações registradas", "Reuniões agendadas", "Arquivos anexos"],
      icone: "MessageSquare"
    },
    {
      titulo: "Automação de Marketing",
      descricao: "Campanhas automatizadas e personalizadas",
      metricas: ["Email sequences", "Triggers comportamentais", "A/B testing", "Segmentação avançada"],
      icone: "Zap"
    },
    {
      titulo: "Relatórios Avançados",
      descricao: "Analytics detalhados de performance",
      metricas: ["Conversão por estágio", "ROI campanhas", "Performance vendedores", "Forecast vendas"],
      icone: "BarChart3"
    },
    {
      titulo: "Integrações",
      descricao: "Conectividade com ferramentas essenciais",
      metricas: ["Gmail/Outlook", "WhatsApp Business", "Calendário", "Telefonia VoIP"],
      icone: "Puzzle"
    }
  ]

  const resultadosAlcancados = [
    {
      categoria: "Gestão de Leads",
      metricas: [
        { nome: "Taxa de captura de leads", valor: "+ 40%", status: "crescimento" },
        { nome: "Tempo de qualificação", valor: "- 60%", status: "melhoria" },
        { nome: "Follow-up automático", valor: "100%", status: "completo" }
      ]
    },
    {
      categoria: "Performance de Vendas",
      metricas: [
        { nome: "Conversão lead → cliente", valor: "+ 35%", status: "crescimento" },
        { nome: "Ciclo médio de vendas", valor: "- 25%", status: "melhoria" },
        { nome: "Receita por lead", valor: "+ 50%", status: "crescimento" }
      ]
    },
    {
      categoria: "Produtividade da Equipe",
      metricas: [
        { nome: "Horas economizadas/semana", valor: "40h", status: "economia" },
        { nome: "Satisfação da equipe", valor: "9.5/10", status: "excelente" },
        { nome: "Adoção do sistema", valor: "98%", status: "alto" }
      ]
    }
  ]

  const exemplosPipeline = [
    { estagio: "Leads", quantidade: 245, valor: "R$ 1.2M", conversao: 25, cor: "bg-blue-500" },
    { estagio: "Qualificados", quantidade: 86, valor: "R$ 890K", conversao: 40, cor: "bg-indigo-500" },
    { estagio: "Oportunidades", quantidade: 34, valor: "R$ 670K", conversao: 55, cor: "bg-purple-500" },
    { estagio: "Propostas", quantidade: 18, valor: "R$ 420K", conversao: 70, cor: "bg-blue-600" },
    { estagio: "Fechados", quantidade: 12, valor: "R$ 285K", conversao: 100, cor: "bg-green-500" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-blue-600/10 to-indigo-600/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center gap-2 mb-4">
              <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                CRM
              </Badge>
              <Badge className="bg-purple-100 text-purple-800" variant="outline">
                Gestão de Clientes
              </Badge>
              <Badge className="bg-green-100 text-green-800" variant="outline">
                Automação
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              CRM para Gestão de Clientes
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Sistema completo de CRM com gestão de leads, pipeline de vendas, histórico de interações 
              e automação de marketing. Desenvolvido em 10h30min usando a metodologia Product Design AI-Enhanced.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.Clock className="h-4 w-4" />
                <span>10h 30min desenvolvimento</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.Zap className="h-4 w-4" />
                <span>25 funcionalidades</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.Puzzle className="h-4 w-4" />
                <span>8 integrações</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600">
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
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg mb-4">
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

      {/* Preview do CRM */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Preview do Sistema CRM
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visualização simulada do CRM com pipeline real de vendas
            </p>
          </div>
          
          {/* Simulação do CRM */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Header do CRM */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
              <h3 className="text-xl font-bold text-gray-900">Pipeline de Vendas</h3>
              <div className="flex gap-2">
                <select className="border rounded px-3 py-1 text-sm">
                  <option>Todos os vendedores</option>
                  <option>Marcos Silva</option>
                  <option>Ana Costa</option>
                </select>
                <Button size="sm" variant="outline">
                  <LucideIcons.Plus className="h-4 w-4 mr-1" />
                  Novo Lead
                </Button>
              </div>
            </div>

            {/* Pipeline Kanban */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              {exemplosPipeline.map((estagio, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 text-sm">{estagio.estagio}</h4>
                    <Badge variant="outline" className="text-xs">{estagio.quantidade}</Badge>
                  </div>
                  <div className="text-lg font-bold text-gray-900 mb-1">{estagio.valor}</div>
                  <div className="text-xs text-gray-600 mb-3">Valor total do estágio</div>
                  
                  {/* Exemplo de cards no estágio */}
                  {index < 3 && (
                    <div className="space-y-2">
                      <div className="bg-white p-3 rounded border-l-4 border-l-blue-500">
                        <div className="font-medium text-sm">Empresa ABC Ltda</div>
                        <div className="text-xs text-gray-600">R$ 45.000 • há 3 dias</div>
                      </div>
                      {index === 0 && (
                        <div className="bg-white p-3 rounded border-l-4 border-l-green-500">
                          <div className="font-medium text-sm">Tech Solutions</div>
                          <div className="text-xs text-gray-600">R$ 32.000 • há 1 dia</div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Taxa de conversão</span>
                      <span>{estagio.conversao}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${estagio.cor}`}
                        style={{ width: `${estagio.conversao}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Atividades Recentes */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Atividades Recentes</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <LucideIcons.Mail className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Email enviado para Empresa ABC Ltda</div>
                    <div className="text-xs text-gray-600">Proposta comercial • há 2 horas</div>
                  </div>
                  <Badge variant="outline" className="text-xs">Email</Badge>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <LucideIcons.Phone className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Ligação realizada para Tech Solutions</div>
                    <div className="text-xs text-gray-600">Follow-up da proposta • há 4 horas</div>
                  </div>
                  <Badge variant="outline" className="text-xs">Ligação</Badge>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <LucideIcons.Calendar className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Reunião agendada com Inovação Digital</div>
                    <div className="text-xs text-gray-600">Apresentação da solução • amanhã 14h</div>
                  </div>
                  <Badge variant="outline" className="text-xs">Reunião</Badge>
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
              Cada funcionalidade foi desenvolvida para otimizar o relacionamento com clientes
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {funcionalidadesDetalhadas.map((funcionalidade, index) => {
              const IconeComponente = LucideIcons[funcionalidade.icone as keyof typeof LucideIcons] as any
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg mb-4">
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
                            <LucideIcons.CheckCircle className="h-3 w-3 text-blue-500" />
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
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
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
                                    <LucideIcons.CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                    {detalhe}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Resultado obtido:</h4>
                              <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
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
                              <LucideIcons.Plus className="h-3 w-3 text-blue-500" />
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
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Impacto nos Negócios
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Resultados mensuráveis após implementação do CRM
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Benefícios Alcançados</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <LucideIcons.TrendingUp className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Aumento de 35% na conversão</div>
                      <div className="text-sm text-gray-600">Pipeline estruturado e follow-up automático</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <LucideIcons.Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">40 horas economizadas por semana</div>
                      <div className="text-sm text-gray-600">Automação de tarefas repetitivas e relatórios</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <LucideIcons.Target className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">98% de adoção pela equipe</div>
                      <div className="text-sm text-gray-600">Interface intuitiva e processo simplificado</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <LucideIcons.DollarSign className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Aumento de 50% na receita por lead</div>
                      <div className="text-sm text-gray-600">Melhor qualificação e nurturing automatizado</div>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-indigo-600">Próximos Passos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <LucideIcons.Brain className="h-5 w-5 text-indigo-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">IA para scoring de leads</div>
                      <div className="text-sm text-gray-600">Machine learning para qualificação automática</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <LucideIcons.MessageSquare className="h-5 w-5 text-indigo-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Chatbot inteligente</div>
                      <div className="text-sm text-gray-600">Atendimento 24/7 e qualificação inicial</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <LucideIcons.Smartphone className="h-5 w-5 text-indigo-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">App mobile para vendedores</div>
                      <div className="text-sm text-gray-600">CRM completo em dispositivos móveis</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <LucideIcons.BarChart3 className="h-5 w-5 text-indigo-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Business Intelligence avançado</div>
                      <div className="text-sm text-gray-600">Dashboards executivos e previsão de vendas</div>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Precisa de um CRM Personalizado?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Veja como a metodologia Product Design AI-Enhanced pode otimizar sua gestão de clientes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/contato">
                <LucideIcons.MessageCircle className="mr-2 h-5 w-5" />
                Falar Sobre Seu Projeto
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-blue-600 hover:bg-white hover:text-blue-600">
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

export default CrmGestaoClientesPage 