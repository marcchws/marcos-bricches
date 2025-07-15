'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import * as LucideIcons from 'lucide-react'
import Link from 'next/link'
import AdminPanelCompletePreview from '@/components/cases/AdminPanelCompletePreview'

const AdminPanelCompletePage = () => {
  const etapasImplementacao = [
    {
      numero: 1,
      titulo: "Arquitetura e Autenticação",
      tempo: "15 min",
      descricao: "Setup da arquitetura base com sistema de autenticação robusto e controle de sessão",
      detalhes: [
        "Arquitetura: Layout hierárquico com sidebar administrativo e breadcrumbs",
        "Autenticação: Sistema JWT com refresh tokens e múltiplos níveis",
        "Permissões: Framework baseado em roles e recursos granulares",
        "Sessão: Controle de sessões múltiplas e timeout inteligente"
      ],
      resultado: "Base sólida com segurança empresarial implementada"
    },
    {
      numero: 2,
      titulo: "Gestão de Usuários e Permissões",
      tempo: "20 min",
      descricao: "Sistema completo de gestão de usuários com roles, permissões e hierarquia organizacional",
      detalhes: [
        "Usuários: CRUD completo com filtros avançados e busca",
        "Roles: Sistema flexível de papéis com herança de permissões",
        "Hierarquia: Estrutura organizacional com grupos e departamentos",
        "Delegação: Sistema de delegação temporária de permissões"
      ],
      resultado: "Controle granular completo de acessos e usuários"
    },
    {
      numero: 3,
      titulo: "Dashboard e Analytics",
      tempo: "12 min",
      descricao: "Dashboard executivo com métricas em tempo real e analytics comportamentais",
      detalhes: [
        "Métricas: KPIs em tempo real com alertas automáticos",
        "Analytics: Análise comportamental de usuários e performance",
        "Relatórios: Sistema de relatórios customizáveis e agendados",
        "Visualização: Gráficos interativos com drill-down capabilities"
      ],
      resultado: "Insights acionáveis para tomada de decisão"
    },
    {
      numero: 4,
      titulo: "Auditoria e Compliance",
      tempo: "8 min",
      descricao: "Sistema completo de auditoria com logs detalhados e compliance automatizado",
      detalhes: [
        "Logs: Rastreamento completo de ações com contexto",
        "Auditoria: Trail completo para compliance e investigações",
        "Backup: Sistema automatizado de backup e restore",
        "Compliance: Relatórios automáticos para auditorias externas"
      ],
      resultado: "Conformidade total com padrões empresariais"
    },
    {
      numero: 5,
      titulo: "Configurações e Integrações",
      tempo: "7 min",
      descricao: "Painel de configurações avançadas com integrações e automações",
      detalhes: [
        "Configurações: Interface para customização do sistema",
        "Integrações: Conectores para sistemas externos (SSO, APIs)",
        "Automações: Workflows automatizados para operações rotineiras",
        "Monitoramento: Health checks e alertas de sistema"
      ],
      resultado: "Sistema altamente configurável e integrado"
    }
  ]

  const metricas = [
    { label: "Tempo de Desenvolvimento", valor: "75min", icone: "Clock", cor: "text-red-600" },
    { label: "Redução Tempo Admin", valor: "80%", icone: "TrendingUp", cor: "text-pink-600" },
    { label: "Compliance Score", valor: "99%", icone: "Shield", cor: "text-red-600" },
    { label: "Complexidade", valor: "Avançado", icone: "Layers", cor: "text-pink-600" }
  ]

  const tecnologiasUtilizadas = [
    {
      nome: "Next.js + TypeScript",
      justificativa: "Framework completo para aplicações administrativas com SSR, API routes e type safety crítica para dados sensíveis",
      beneficios: ["Server-side rendering", "API routes seguras", "Type safety completa", "Performance otimizada"]
    },
    {
      nome: "PostgreSQL + Redis",
      justificativa: "Banco robusto para dados críticos com cache Redis para performance e sessões distribuídas",
      beneficios: ["ACID compliance", "Cache inteligente", "Sessões distribuídas", "Performance escalável"]
    },
    {
      nome: "RBAC + JWT",
      justificativa: "Sistema de controle de acesso baseado em roles com tokens JWT para segurança empresarial",
      beneficios: ["Segurança granular", "Controle de sessão", "Auditoria completa", "Escalabilidade"]
    },
    {
      nome: "Chart.js + D3.js",
      justificativa: "Visualizações avançadas para analytics administrativos com interatividade e drill-down",
      beneficios: ["Gráficos interativos", "Performance otimizada", "Customização total", "Exportação facilitada"]
    }
  ]

  const funcionalidadesDetalhadas = [
    {
      titulo: "Gestão de Usuários",
      descricao: "CRUD completo com filtros avançados e controle de acesso",
      metricas: ["User management", "Role assignment", "Bulk operations", "Advanced search"],
      icone: "Users"
    },
    {
      titulo: "Sistema de Permissões",
      descricao: "Controle granular baseado em recursos e ações",
      metricas: ["Role-based access", "Resource permissions", "Inheritance rules", "Dynamic delegation"],
      icone: "Shield"
    },
    {
      titulo: "Analytics Avançado",
      descricao: "Métricas em tempo real com insights acionáveis",
      metricas: ["Real-time metrics", "Behavioral analysis", "Custom reports", "Predictive insights"],
      icone: "BarChart3"
    },
    {
      titulo: "Logs de Auditoria",
      descricao: "Rastreamento completo para compliance",
      metricas: ["Action tracking", "Audit trails", "Compliance reports", "Investigation tools"],
      icone: "FileText"
    },
    {
      titulo: "Configurações Sistema",
      descricao: "Painel avançado de configurações e integrações",
      metricas: ["System settings", "Integration management", "Workflow automation", "Health monitoring"],
      icone: "Settings"
    },
    {
      titulo: "Backup e Restore",
      descricao: "Sistema automatizado de backup com restore pontual",
      metricas: ["Automated backups", "Point-in-time restore", "Data integrity", "Disaster recovery"],
      icone: "Database"
    }
  ]

  const resultadosAlcancados = [
    {
      categoria: "Performance e Eficiência",
      metricas: [
        { nome: "Redução tempo admin", valor: "80%", status: "excelente" },
        { nome: "Automação processos", valor: "95%", status: "completo" },
        { nome: "Tempo resposta", valor: "< 200ms", status: "rápido" }
      ]
    },
    {
      categoria: "Segurança e Compliance",
      metricas: [
        { nome: "Score de segurança", valor: "A+", status: "excelente" },
        { nome: "Compliance", valor: "99%", status: "completo" },
        { nome: "Auditoria automática", valor: "100%", status: "completo" }
      ]
    },
    {
      categoria: "Operacional",
      metricas: [
        { nome: "Tempo desenvolvimento", valor: "75 min", status: "rápido" },
        { nome: "Uptime sistema", valor: "99.9%", status: "estável" },
        { nome: "Satisfação admins", valor: "4.9/5", status: "alta" }
      ]
    }
  ]

  const exemplosDados = [
    { funcionalidade: "Criar usuário", tempo: "< 30s", uso: "100%", feedback: "Muito intuitivo" },
    { funcionalidade: "Configurar permissões", tempo: "2 minutos", uso: "95%", feedback: "Flexível" },
    { funcionalidade: "Gerar relatório", tempo: "< 5s", uso: "89%", feedback: "Rápido e detalhado" },
    { funcionalidade: "Fazer backup", tempo: "1 clique", uso: "98%", feedback: "Automático e confiável" }
  ]

  // Componente para renderizar ícones dinamicamente
  const IconeComponente = ({ nome, className }: { nome: string, className?: string }) => {
    const IconeElemento = (LucideIcons as any)[nome]
    return IconeElemento ? <IconeElemento className={className} /> : <LucideIcons.Circle className={className} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-red-600/10 to-pink-600/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center gap-2 mb-4">
              <Badge className="bg-gradient-to-r from-red-600 to-pink-600 text-white">
                Painel Administrativo
              </Badge>
              <Badge className="bg-red-100 text-red-800" variant="outline">
                Gestão
              </Badge>
              <Badge className="bg-pink-100 text-pink-800" variant="outline">
                Avançado
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Painel Administrativo Completo
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Sistema administrativo empresarial completo com gestão de usuários, controle granular de permissões, 
              analytics avançados, auditoria e compliance. Desenvolvido em 75 minutos usando metodologia 
              Product Design AI-Enhanced para máxima eficiência operacional.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.Clock className="h-4 w-4" />
                <span>55min desenvolvimento</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.TrendingUp className="h-4 w-4" />
                <span>80% redução tempo admin</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.Shield className="h-4 w-4" />
                <span>99% compliance score</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-red-600 to-pink-600">
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

      {/* Métricas */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metricas.map((metrica, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-600 to-pink-600 rounded-lg mb-3">
                  <IconeComponente nome={metrica.icone} className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{metrica.valor}</div>
                <div className="text-sm text-gray-600">{metrica.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="py-16 bg-gradient-to-br from-red-50 to-pink-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Funcionalidades Principais
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sistema administrativo empresarial com foco em segurança, eficiência e compliance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {funcionalidadesDetalhadas.map((funcionalidade, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-600 to-pink-600 rounded-lg mb-4">
                    <IconeComponente nome={funcionalidade.icone} className="h-6 w-6 text-white" />
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
                          <LucideIcons.CheckCircle className="h-3 w-3 text-red-500" />
                          {metrica}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Interativo */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Preview Interativo
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore o painel administrativo. Gerencie usuários, configure permissões e analise métricas em tempo real.
            </p>
          </div>
          
          <div className="flex justify-center">
            <AdminPanelCompletePreview />
          </div>
          
          <div className="text-center mt-8">
            <div className="grid md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-red-100 rounded-lg mb-2">
                  <LucideIcons.Users className="h-5 w-5 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Usuários</h3>
                <p className="text-xs text-gray-600">
                  Gestão completa
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-pink-100 rounded-lg mb-2">
                  <LucideIcons.Shield className="h-5 w-5 text-pink-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Permissões</h3>
                <p className="text-xs text-gray-600">
                  Controle granular
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mb-2">
                  <LucideIcons.BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Analytics</h3>
                <p className="text-xs text-gray-600">
                  Métricas em tempo real
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mb-2">
                  <LucideIcons.FileText className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Auditoria</h3>
                <p className="text-xs text-gray-600">
                  Logs completos
                </p>
              </div>
            </div>
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
              Metodologia Product Design AI-Enhanced aplicada para sistema administrativo empresarial
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
                        <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
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
                                    <LucideIcons.CheckCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                                    {detalhe}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Resultado obtido:</h4>
                              <p className="text-sm text-gray-600 bg-red-50 p-3 rounded-lg">
                                {etapa.resultado}
                              </p>
                            </div>
                          </div>
                          
                          <Progress value={(index + 1) * 20} className="w-full" />
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
                        <h4 className="font-medium text-gray-900 mb-2">Benefícios:</h4>
                        <ul className="space-y-2">
                          {tech.beneficios.map((beneficio, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                              <LucideIcons.CheckCircle className="h-4 w-4 text-red-500" />
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
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {resultadosAlcancados.map((categoria, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{categoria.categoria}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {categoria.metricas.map((metrica, idx) => (
                          <div key={idx} className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">{metrica.nome}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{metrica.valor}</span>
                              <Badge variant={
                                metrica.status === 'excelente' ? 'default' :
                                metrica.status === 'rápido' ? 'secondary' :
                                metrica.status === 'completo' ? 'default' :
                                'outline'
                              } className="text-xs">
                                {metrica.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Performance por Funcionalidade</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {exemplosDados.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium">{item.funcionalidade}</h4>
                          <p className="text-sm text-gray-600">Tempo médio: {item.tempo}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{item.uso} dos admins</div>
                          <div className="text-sm text-red-600">{item.feedback}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Precisa de um Painel Administrativo Personalizado?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Veja como a metodologia Product Design AI-Enhanced pode acelerar seu projeto administrativo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-red-600 hover:bg-gray-100">
              <Link href="/contato">
                <LucideIcons.Users className="mr-2 h-5 w-5" />
                Falar Sobre Seu Projeto
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-red-600 hover:bg-white hover:text-red-600">
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

export default AdminPanelCompletePage 