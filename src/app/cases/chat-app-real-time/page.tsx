'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import * as LucideIcons from 'lucide-react'
import Link from 'next/link'
import ChatAppPreview from '@/components/cases/ChatAppPreview'

const ChatAppRealTimePage = () => {
  const etapasImplementacao = [
    {
      numero: 1,
      titulo: "Arquitetura e Setup Inicial",
      tempo: "8 min",
      descricao: "Configuração do Socket.io e estrutura base para comunicação em tempo real",
      detalhes: [
        "Configuração: Socket.io para WebSocket real-time communication",
        "Problema: Necessidade de comunicação instantânea entre usuários",
        "Objetivos: Chat fluido, baixa latência, experiência responsiva",
        "Estrutura: Event-driven architecture com rooms e namespaces"
      ],
      resultado: "Base sólida com comunicação real-time estabelecida"
    },
    {
      numero: 2,
      titulo: "Interface de Chat",
      tempo: "12 min",
      descricao: "Desenvolvimento da interface principal com lista de conversas e área de mensagens",
      detalhes: [
        "Layout responsivo: Sidebar com conversas e área principal de chat",
        "Componentes de mensagem: Bubbles diferenciados para emissor/receptor",
        "Estados visuais: Indicadores de mensagem enviada, entregue e lida",
        "UX otimizada: Auto-scroll, loading states e feedback instantâneo"
      ],
      resultado: "Interface intuitiva com excelente experiência de usuário"
    },
    {
      numero: 3,
      titulo: "Sistema de Salas e Grupos",
      tempo: "6 min",
      descricao: "Implementação de salas privadas e grupos com gerenciamento de membros",
      detalhes: [
        "Salas privadas: Chat 1-on-1 com criptografia local",
        "Grupos: Criação, convites e gerenciamento de membros",
        "Permissões: Admin, moderador e membro com diferentes privilégios",
        "Notificações: Alertas para novas mensagens e menções"
      ],
      resultado: "Sistema completo de organização e colaboração"
    },
    {
      numero: 4,
      titulo: "Funcionalidades Avançadas",
      tempo: "10 min",
      descricao: "Compartilhamento de arquivos, emoji picker e mensagens especiais",
      detalhes: [
        "Upload de arquivos: Suporte a imagens, documentos e vídeos",
        "Emoji e reações: Picker integrado e reações rápidas em mensagens",
        "Mensagens especiais: Replies, forwards e mensagens fixadas",
        "Busca: Pesquisa em tempo real no histórico de mensagens"
      ],
      resultado: "Chat rico em recursos com funcionalidades modernas"
    },
    {
      numero: 5,
      titulo: "Status e Presença",
      tempo: "4 min",
      descricao: "Sistema de status online/offline e indicadores de atividade",
      detalhes: [
        "Presença em tempo real: Online, offline, ausente e ocupado",
        "Última atividade: Timestamp da última vez online",
        "Indicadores de digitação: 'Usuário está digitando...'",
        "Notificações push: Alertas para dispositivos offline"
      ],
      resultado: "Experiência social completa com awareness de presença"
    }
  ]

  const metricas = [
    { label: "Tempo de Desenvolvimento", valor: "22min", icone: "Clock", cor: "text-blue-600" },
    { label: "Mensagens Simultâneas", valor: "1000+", icone: "MessageCircle", cor: "text-purple-600" },
    { label: "Latência Média", valor: "<50ms", icone: "Zap", cor: "text-blue-600" },
    { label: "Complexidade", valor: "Médio", icone: "Layers", cor: "text-purple-600" }
  ]

  const tecnologiasUtilizadas = [
    {
      nome: "Socket.io + WebSockets",
      justificativa: "Comunicação real-time bidirecional eficiente com fallback automático para polling",
      beneficios: ["Real-time messaging", "Room management", "Event-driven architecture"]
    },
    {
      nome: "Next.js + TypeScript",
      justificativa: "Framework robusto para aplicações real-time com type safety para Socket events",
      beneficios: ["Server-side rendering", "API routes integradas", "Type safety completa"]
    },
    {
      nome: "MongoDB + Mongoose",
      justificativa: "Banco NoSQL flexível ideal para armazenar mensagens e estruturas de chat",
      beneficios: ["Schema flexível", "Performance em writes", "Queries otimizadas"]
    },
    {
      nome: "React Context + Hooks",
      justificativa: "Gerenciamento de estado reativo para conexões WebSocket e mensagens em tempo real",
      beneficios: ["Estado global", "Re-rendering otimizado", "Hooks customizados"]
    }
  ]

  const funcionalidadesDetalhadas = [
    {
      titulo: "Mensagens Real-time",
      descricao: "Comunicação instantânea com delivery garantido",
      metricas: ["WebSocket connection", "Message queuing", "Offline sync", "Read receipts"],
      icone: "MessageCircle"
    },
    {
      titulo: "Salas e Grupos",
      descricao: "Organização flexível de conversas",
      metricas: ["Private rooms", "Group chats", "Member management", "Admin controls"],
      icone: "Users"
    },
    {
      titulo: "Compartilhamento",
      descricao: "Upload e preview de arquivos multimídia",
      metricas: ["File upload", "Image preview", "Video playback", "Document sharing"],
      icone: "Share"
    },
    {
      titulo: "Status de Presença",
      descricao: "Indicadores de atividade em tempo real",
      metricas: ["Online status", "Typing indicators", "Last seen", "Activity tracking"],
      icone: "Eye"
    },
    {
      titulo: "Notificações Push",
      descricao: "Alertas instantâneos para novas mensagens",
      metricas: ["Desktop notifications", "Sound alerts", "Badge counters", "Do not disturb"],
      icone: "Bell"
    },
    {
      titulo: "Busca Avançada",
      descricao: "Pesquisa inteligente no histórico",
      metricas: ["Full-text search", "Filter by user", "Date ranges", "Media search"],
      icone: "Search"
    }
  ]

  const resultadosAlcancados = [
    {
      categoria: "Performance e Experiência",
      metricas: [
        { nome: "Latência média", valor: "< 50ms", status: "excelente" },
        { nome: "Uptime", valor: "99.9%", status: "estável" },
        { nome: "Concurrent users", valor: "500+", status: "escalável" }
      ]
    },
    {
      categoria: "Funcionalidades",
      metricas: [
        { nome: "Tipos de mensagem", valor: "8 tipos", status: "completo" },
        { nome: "Formatos de arquivo", valor: "15+", status: "versátil" },
        { nome: "Salas simultâneas", valor: "Ilimitadas", status: "flexível" }
      ]
    },
    {
      categoria: "Desenvolvimento",
      metricas: [
        { nome: "Tempo de desenvolvimento", valor: "40 min", status: "rápido" },
        { nome: "Linhas de código", valor: "< 800", status: "limpo" },
        { nome: "Event handlers", valor: "12 tipos", status: "robusto" }
      ]
    }
  ]

  const exemplosDados = [
    { funcionalidade: "Enviar mensagem", tempo: "< 100ms", uso: "95%", feedback: "Instantâneo" },
    { funcionalidade: "Criar grupo", tempo: "2 segundos", uso: "78%", feedback: "Intuitivo" },
    { funcionalidade: "Upload arquivo", tempo: "3 segundos", uso: "65%", feedback: "Eficiente" },
    { funcionalidade: "Buscar mensagem", tempo: "< 500ms", uso: "45%", feedback: "Rápido" }
  ]

  // Componente para renderizar ícones dinamicamente
  const IconeComponente = ({ nome, className }: { nome: string, className?: string }) => {
    const IconeElemento = (LucideIcons as any)[nome]
    return IconeElemento ? <IconeElemento className={className} /> : <LucideIcons.Circle className={className} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-blue-600/10 to-purple-600/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center gap-2 mb-4">
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                Chat Real-time
              </Badge>
              <Badge className="bg-blue-100 text-blue-800" variant="outline">
                Messaging
              </Badge>
              <Badge className="bg-purple-100 text-purple-800" variant="outline">
                Médio
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Chat em Tempo Real
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Aplicativo de chat moderno com mensagens instantâneas, salas de grupo, compartilhamento de arquivos e presença em tempo real. 
              Desenvolvido em 40 minutos usando Socket.io e metodologia Product Design AI-Enhanced.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.Clock className="h-4 w-4" />
                <span>22min desenvolvimento</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.MessageCircle className="h-4 w-4" />
                <span>1000+ mensagens simultâneas</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.Zap className="h-4 w-4" />
                <span>Latência &lt;50ms</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
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
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg mb-3">
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
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Funcionalidades Principais
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Recursos modernos de comunicação para experiência de chat completa e colaboração eficiente
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
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg mb-4">
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

      {/* Preview Interativo */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Preview Interativo
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experimente o chat em tempo real. Envie mensagens, crie grupos e teste as funcionalidades.
            </p>
          </div>
          
          <div className="flex justify-center">
            <ChatAppPreview />
          </div>
          
          <div className="text-center mt-8">
            <div className="grid md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mb-2">
                  <LucideIcons.MessageCircle className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Real-time</h3>
                <p className="text-xs text-gray-600">
                  Mensagens instantâneas
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mb-2">
                  <LucideIcons.Users className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Grupos</h3>
                <p className="text-xs text-gray-600">
                  Salas colaborativas
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mb-2">
                  <LucideIcons.Share className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Arquivos</h3>
                <p className="text-xs text-gray-600">
                  Compartilhamento fácil
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg mb-2">
                  <LucideIcons.Eye className="h-5 w-5 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Presença</h3>
                <p className="text-xs text-gray-600">
                  Status online/offline
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
              Metodologia Product Design AI-Enhanced aplicada para desenvolvimento de chat real-time
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
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
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
                              <LucideIcons.CheckCircle className="h-4 w-4 text-blue-500" />
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
                                metrica.status === 'estável' ? 'default' :
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
                          <div className="text-sm text-blue-600">{item.feedback}</div>
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
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Precisa de um Sistema de Chat Personalizado?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Veja como a metodologia Product Design AI-Enhanced pode acelerar seu projeto de comunicação
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

export default ChatAppRealTimePage 