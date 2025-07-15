'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import * as LucideIcons from 'lucide-react'
import Link from 'next/link'
import BookingSystemPreview from '@/components/cases/BookingSystemPreview'

const BookingSystemPage = () => {
  const etapasImplementacao = [
    {
      numero: 1,
      titulo: "Setup e Estrutura Base",
      tempo: "5 min",
      descricao: "Configuração inicial do sistema com calendário e componentes base",
      detalhes: [
        "Estrutura: Layout responsivo com sidebar de navegação e área principal",
        "Calendário: Implementação com React e biblioteca de datas",
        "Componentes: Criação dos componentes base para reservas e mesas",
        "Estado: Configuração do gerenciamento de estado para reservas"
      ],
      resultado: "Base sólida com estrutura de calendário funcional"
    },
    {
      numero: 2,
      titulo: "Gestão de Mesas e Disponibilidade",
      tempo: "8 min",
      descricao: "Sistema de mesas com controle de capacidade e disponibilidade em tempo real",
      detalhes: [
        "Mesas: Configuração de mesas com capacidade e posicionamento",
        "Disponibilidade: Verificação em tempo real de horários disponíveis",
        "Ocupação: Controle visual do status das mesas (livre, ocupada, reservada)",
        "Layout: Visualização do layout do restaurante com mesas interativas"
      ],
      resultado: "Sistema completo de gestão e visualização de mesas"
    },
    {
      numero: 3,
      titulo: "Processo de Reserva",
      tempo: "10 min",
      descricao: "Fluxo completo de criação de reservas com validações e confirmações",
      detalhes: [
        "Formulário: Interface intuitiva para dados do cliente e preferências",
        "Validação: Verificação de disponibilidade e conflitos de horário",
        "Confirmação: Sistema de confirmação automática via email/WhatsApp",
        "Estados: Diferentes status de reserva (pendente, confirmada, cancelada)"
      ],
      resultado: "Processo de reserva fluido e automatizado"
    },
    {
      numero: 4,
      titulo: "Lista de Espera e Notificações",
      tempo: "6 min",
      descricao: "Sistema inteligente de lista de espera com notificações automáticas",
      detalhes: [
        "Lista de espera: Fila automática quando não há disponibilidade",
        "Notificações: Alertas automáticos via WhatsApp e email",
        "Priorização: Sistema de prioridade baseado em histórico do cliente",
        "Realocação: Oferecimento automático de vagas que abrem"
      ],
      resultado: "Sistema completo de otimização de ocupação"
    },
    {
      numero: 5,
      titulo: "Dashboard e Analytics",
      tempo: "6 min",
      descricao: "Painel administrativo com métricas e relatórios de performance",
      detalhes: [
        "Métricas: Taxa de ocupação, no-show, satisfação do cliente",
        "Relatórios: Análise de picos de demanda e padrões de reserva",
        "Previsões: Algoritmo para prever demanda e otimizar capacidade",
        "Export: Relatórios exportáveis para análise externa"
      ],
      resultado: "Insights valiosos para otimização do negócio"
    }
  ]

  const metricas = [
    { label: "Tempo de Desenvolvimento", valor: "18min", icone: "Clock", cor: "text-violet-600" },
    { label: "Taxa de Ocupação", valor: "95%", icone: "TrendingUp", cor: "text-purple-600" },
    { label: "Redução No-Show", valor: "60%", icone: "CheckCircle", cor: "text-violet-600" },
    { label: "Complexidade", valor: "Médio", icone: "Layers", cor: "text-purple-600" }
  ]

  const tecnologiasUtilizadas = [
    {
      nome: "Next.js + TypeScript",
      justificativa: "Framework robusto para aplicações de reserva com SSR e type safety para dados críticos",
      beneficios: ["Server-side rendering", "API routes integradas", "Type safety completa"]
    },
    {
      nome: "Calendar API Integration",
      justificativa: "Integração nativa com calendários externos para sincronização automática",
      beneficios: ["Sincronização automática", "Eventos bidirecionais", "Timezone support"]
    },
    {
      nome: "WhatsApp Business API",
      justificativa: "Comunicação direta e eficiente com clientes através do canal preferido",
      beneficios: ["Confirmações instantâneas", "Lembretes automáticos", "Alta taxa de abertura"]
    },
    {
      nome: "Real-time Database",
      justificativa: "Atualizações em tempo real de disponibilidade para evitar conflitos",
      beneficios: ["Consistência de dados", "Atualizações instantâneas", "Conflito prevention"]
    }
  ]

  const funcionalidadesDetalhadas = [
    {
      titulo: "Calendário Inteligente",
      descricao: "Sistema avançado de agendamento com disponibilidade dinâmica",
      metricas: ["Real-time availability", "Conflict detection", "Time slot optimization", "Recurring bookings"],
      icone: "Calendar"
    },
    {
      titulo: "Gestão de Mesas",
      descricao: "Controle visual e otimizado de layout do restaurante",
      metricas: ["Table mapping", "Capacity control", "Visual layout", "Availability status"],
      icone: "Grid3X3"
    },
    {
      titulo: "Confirmações Automáticas",
      descricao: "Sistema inteligente de comunicação com clientes",
      metricas: ["WhatsApp integration", "Email notifications", "SMS backup", "Auto confirmations"],
      icone: "MessageSquare"
    },
    {
      titulo: "Lista de Espera",
      descricao: "Gestão otimizada de demanda excedente",
      metricas: ["Intelligent queuing", "Priority system", "Auto-notifications", "Waitlist analytics"],
      icone: "Users"
    },
    {
      titulo: "Analytics Avançado",
      descricao: "Insights para otimização do negócio",
      metricas: ["Occupancy rates", "No-show tracking", "Peak analysis", "Revenue insights"],
      icone: "BarChart3"
    },
    {
      titulo: "Mobile Experience",
      descricao: "Interface otimizada para dispositivos móveis",
      metricas: ["Mobile-first design", "Touch optimization", "Offline support", "PWA ready"],
      icone: "Smartphone"
    }
  ]

  const resultadosAlcancados = [
    {
      categoria: "Performance e Eficiência",
      metricas: [
        { nome: "Taxa de ocupação", valor: "95%", status: "excelente" },
        { nome: "Redução no-show", valor: "60%", status: "significativo" },
        { nome: "Tempo médio reserva", valor: "2 min", status: "rápido" }
      ]
    },
    {
      categoria: "Experiência do Cliente",
      metricas: [
        { nome: "Satisfação", valor: "4.8/5", status: "alta" },
        { nome: "Confirmações automáticas", valor: "100%", status: "completo" },
        { nome: "Resposta WhatsApp", valor: "< 30s", status: "instantâneo" }
      ]
    },
    {
      categoria: "Operacional",
      metricas: [
        { nome: "Tempo de desenvolvimento", valor: "35 min", status: "rápido" },
        { nome: "Integrações", valor: "4 APIs", status: "completo" },
        { nome: "Uptime sistema", valor: "99.9%", status: "estável" }
      ]
    }
  ]

  const exemplosDados = [
    { funcionalidade: "Fazer reserva", tempo: "< 2 min", uso: "98%", feedback: "Muito fácil" },
    { funcionalidade: "Confirmar presença", tempo: "10 segundos", uso: "92%", feedback: "Prático" },
    { funcionalidade: "Entrar na lista espera", tempo: "30 segundos", uso: "76%", feedback: "Útil" },
    { funcionalidade: "Remarcar reserva", tempo: "1 minuto", uso: "45%", feedback: "Simples" }
  ]

  // Componente para renderizar ícones dinamicamente
  const IconeComponente = ({ nome, className }: { nome: string, className?: string }) => {
    const IconeElemento = (LucideIcons as any)[nome]
    return IconeElemento ? <IconeElemento className={className} /> : <LucideIcons.Circle className={className} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-violet-600/10 to-purple-600/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center gap-2 mb-4">
              <Badge className="bg-gradient-to-r from-violet-600 to-purple-600 text-white">
                Sistema de Reservas
              </Badge>
              <Badge className="bg-violet-100 text-violet-800" variant="outline">
                Restaurantes
              </Badge>
              <Badge className="bg-purple-100 text-purple-800" variant="outline">
                Médio
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Sistema de Reservas
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Sistema completo de reservas para restaurantes com calendário inteligente, gestão de mesas, 
              confirmações automáticas via WhatsApp e lista de espera otimizada. 
              Desenvolvido em 35 minutos usando metodologia Product Design AI-Enhanced.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.Clock className="h-4 w-4" />
                <span>18min desenvolvimento</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.TrendingUp className="h-4 w-4" />
                <span>95% taxa de ocupação</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.CheckCircle className="h-4 w-4" />
                <span>60% redução no-show</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-violet-600 to-purple-600">
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
            {metricas.map((metrica, index) => {
              const IconeComponente = ({ nome, className }: { nome: string, className?: string }) => {
                const IconeElemento = (LucideIcons as any)[nome]
                return IconeElemento ? <IconeElemento className={className} /> : <LucideIcons.Circle className={className} />
              }

              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-600 rounded-lg mb-3">
                    <IconeComponente nome={metrica.icone} className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{metrica.valor}</div>
                  <div className="text-sm text-gray-600">{metrica.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="py-16 bg-gradient-to-br from-violet-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Funcionalidades Principais
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sistema completo de reservas com foco na experiência do cliente e otimização operacional
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {funcionalidadesDetalhadas.map((funcionalidade, index) => {
              const IconeComponente = ({ nome, className }: { nome: string, className?: string }) => {
                const IconeElemento = (LucideIcons as any)[nome]
                return IconeElemento ? <IconeElemento className={className} /> : <LucideIcons.Circle className={className} />
              }

              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-600 rounded-lg mb-4">
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
                            <LucideIcons.CheckCircle className="h-3 w-3 text-violet-500" />
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

      {/* Preview Interativo */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Preview Interativo
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experimente o sistema de reservas. Crie reservas, gerencie mesas e teste o fluxo completo.
            </p>
          </div>
          
          <div className="flex justify-center">
            <BookingSystemPreview />
          </div>
          
          <div className="text-center mt-8">
            <div className="grid md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-violet-100 rounded-lg mb-2">
                  <LucideIcons.Calendar className="h-5 w-5 text-violet-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Calendário</h3>
                <p className="text-xs text-gray-600">
                  Agendamento inteligente
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mb-2">
                  <LucideIcons.Grid3X3 className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Mesas</h3>
                <p className="text-xs text-gray-600">
                  Gestão visual
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mb-2">
                  <LucideIcons.MessageSquare className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">WhatsApp</h3>
                <p className="text-xs text-gray-600">
                  Confirmações automáticas
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg mb-2">
                  <LucideIcons.Users className="h-5 w-5 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Lista Espera</h3>
                <p className="text-xs text-gray-600">
                  Otimização automática
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
              Metodologia Product Design AI-Enhanced aplicada para sistema de reservas
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
                        <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
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
                                    <LucideIcons.CheckCircle className="h-4 w-4 text-violet-500 mt-0.5 flex-shrink-0" />
                                    {detalhe}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Resultado obtido:</h4>
                              <p className="text-sm text-gray-600 bg-violet-50 p-3 rounded-lg">
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
                              <LucideIcons.CheckCircle className="h-4 w-4 text-violet-500" />
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
                                metrica.status === 'significativo' ? 'default' :
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
                          <div className="font-semibold">{item.uso} dos usuários</div>
                          <div className="text-sm text-violet-600">{item.feedback}</div>
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
      <section className="py-16 bg-gradient-to-r from-violet-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Precisa de um Sistema de Reservas Personalizado?
          </h2>
          <p className="text-xl text-violet-100 mb-8">
            Veja como a metodologia Product Design AI-Enhanced pode acelerar seu projeto de reservas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-violet-600 hover:bg-gray-100">
              <Link href="/contato">
                <LucideIcons.Calendar className="mr-2 h-5 w-5" />
                Falar Sobre Seu Projeto
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-violet-600 hover:bg-white hover:text-violet-600">
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

export default BookingSystemPage 