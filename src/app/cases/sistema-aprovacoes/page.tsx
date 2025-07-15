// app/cases/sistema-aprovacoes/page.tsx
'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import * as LucideIcons from 'lucide-react'
import Link from 'next/link'
import SistemaAprovacoesPreview from '@/components/cases/SistemaAprovacoesPreview'

const SistemaAprovacoesPage = () => {
  const especificacoes = {
    produto: "Sistema de Aprovações",
    categoria: "Workflow",
    complexidade: "Médio",
    tempo: "15min",
    tecnologias: ['Next.js', 'TypeScript', 'Tailwind', 'Prisma'],
    funcionalidades: [
      'Múltiplos níveis de aprovação',
      'Notificações automáticas',
      'Histórico de decisões',
      'Dashboard de pendências',
      'Relatórios de performance',
      'Comentários e feedback'
    ]
  }

  const arquiteturaDecisao = {
    estrategia: "Sistema Modular",
    justificativa: "Complexidade: 25 pontos (>20) - Múltiplos perfis de usuário, workflows ramificados",
    estrutura: [
      "page.tsx - Orquestrador principal com abas",
      "solicitacoes.tsx - Interface do solicitante",
      "aprovacoes.tsx - Interface do aprovador", 
      "dashboard.tsx - Métricas e relatórios",
      "historico.tsx - Auditoria e histórico"
    ],
    metricas: {
      entidades: 5,
      perfis: 3,
      fluxos: 4,
      estados: 8,
      total: 25
    }
  }

  const estadosWorkflow = [
    {
      categoria: "Estados do Processo",
      estados: [
        { nome: "Rascunho", descricao: "Solicitação sendo criada", cor: "gray" },
        { nome: "Pendente", descricao: "Aguardando aprovação", cor: "yellow" },
        { nome: "Em Análise", descricao: "Sendo analisada pelo aprovador", cor: "blue" },
        { nome: "Aprovado", descricao: "Aprovado em todas as etapas", cor: "green" },
        { nome: "Rejeitado", descricao: "Rejeitado em alguma etapa", cor: "red" },
        { nome: "Cancelado", descricao: "Cancelado pelo solicitante", cor: "gray" }
      ]
    },
    {
      categoria: "Estados de Interface",
      estados: [
        { nome: "Loading Pendências", descricao: "Carregando lista de aprovações", cor: "blue" },
        { nome: "Sem Pendências", descricao: "Nenhuma solicitação para aprovar", cor: "gray" },
        { nome: "Notificação Ativa", descricao: "Novas solicitações disponíveis", cor: "orange" },
        { nome: "Filtros Aplicados", descricao: "Lista filtrada por critérios", cor: "purple" }
      ]
    }
  ]

  const fluxosWorkflow = [
    {
      titulo: "Fluxo do Solicitante",
      etapas: [
        "Criar nova solicitação",
        "Preencher formulário detalhado",
        "Enviar para aprovação",
        "Receber notificações de status",
        "Acompanhar progresso",
        "Receber resultado final"
      ]
    },
    {
      titulo: "Fluxo do Aprovador",
      etapas: [
        "Receber notificação de nova solicitação",
        "Acessar dashboard de pendências",
        "Analisar detalhes da solicitação",
        "Adicionar comentários (opcional)",
        "Aprovar ou rejeitar",
        "Notificar automaticamente próxima etapa"
      ]
    }
  ]

  const padroesTecnicos = [
    {
      padrao: "Estados de Workflow Defensivos",
      codigo: `interface StatusSolicitacao {
  status: 'rascunho' | 'pendente' | 'em_analise' | 'aprovado' | 'rejeitado' | 'cancelado';
  etapa_atual: number;
  aprovadores_pendentes: string[];
  historico: HistoricoEtapa[];
}

const validarTransicaoStatus = (statusAtual: string, novoStatus: string): boolean => {
  const transicoesValidas = {
    'rascunho': ['pendente', 'cancelado'],
    'pendente': ['em_analise', 'cancelado'],
    'em_analise': ['aprovado', 'rejeitado', 'pendente'],
    'aprovado': [], // Estado final
    'rejeitado': [], // Estado final
    'cancelado': [] // Estado final
  };
  
  return transicoesValidas[statusAtual]?.includes(novoStatus) || false;
};`,
      justificativa: "Workflow exige controle rigoroso de transições de estado para evitar inconsistências"
    },
    {
      padrao: "Notificações Automáticas",
      codigo: `const enviarNotificacao = async (
  solicitacao: Solicitacao, 
  tipo: 'nova' | 'aprovada' | 'rejeitada' | 'comentario'
) => {
  if (!montadoRef.current) return;
  
  try {
    const destinatarios = obterDestinatarios(solicitacao, tipo);
    const template = obterTemplate(tipo, solicitacao);
    
    await Promise.all([
      enviarEmail(destinatarios, template),
      criarNotificacaoInterna(destinatarios, template),
      atualizarContadores()
    ]);
    
    if (montadoRef.current) {
      toast.success('Notificações enviadas com sucesso');
    }
  } catch (error) {
    console.error('Erro ao enviar notificações:', error);
    // Não bloquear o workflow por falha de notificação
  }
};`,
      justificativa: "Notificações são críticas para workflow eficiente, mas não devem bloquear o processo"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-yellow-600/10 to-orange-600/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center gap-2 mb-4">
              <Badge className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
                Workflow
              </Badge>
              <Badge className="bg-yellow-100 text-yellow-800" variant="outline">
                Médio
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Sistema de Aprovações
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Sistema completo de workflow para aprovações corporativas com múltiplos níveis, 
              notificações automáticas e dashboard de acompanhamento. Implementado com estados 
              defensivos e controle rigoroso de transições.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.Clock className="h-4 w-4" />
                <span>15min desenvolvimento</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.Users className="h-4 w-4" />
                <span>Múltiplos perfis de usuário</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.GitBranch className="h-4 w-4" />
                <span>Workflow automatizado</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-yellow-600 to-orange-600">
                <a href="https://github.com/marcos-bricches/sistema-aprovacoes" target="_blank" rel="noopener noreferrer">
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
              Sistema Funcional de Aprovações
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore o workflow completo. Teste como solicitante e aprovador, 
              veja notificações automáticas e acompanhe o processo em tempo real.
            </p>
          </div>
          
          <SistemaAprovacoesPreview />
        </div>
      </section>

      {/* Análise Detalhada */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="arquitetura">Arquitetura</TabsTrigger>
              <TabsTrigger value="workflow">Workflow</TabsTrigger>
              <TabsTrigger value="padroes">Padrões</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Especificações do Sistema</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Categoria:</span>
                        <span className="font-medium">{especificacoes.categoria}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Complexidade:</span>
                        <Badge className="bg-yellow-100 text-yellow-800">{especificacoes.complexidade}</Badge>
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
                    <CardTitle>Funcionalidades Principais</CardTitle>
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
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Decisão Arquitetural</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-orange-50 p-4 rounded-lg mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <LucideIcons.Building className="h-5 w-5 text-orange-600" />
                        <span className="font-semibold text-orange-900">{arquiteturaDecisao.estrategia}</span>
                      </div>
                      <p className="text-orange-800 text-sm">{arquiteturaDecisao.justificativa}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">{arquiteturaDecisao.metricas.entidades}</div>
                        <div className="text-xs text-gray-600">Entidades</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">{arquiteturaDecisao.metricas.perfis}</div>
                        <div className="text-xs text-gray-600">Perfis de Usuário</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">{arquiteturaDecisao.metricas.fluxos}</div>
                        <div className="text-xs text-gray-600">Fluxos Principais</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">{arquiteturaDecisao.metricas.estados}</div>
                        <div className="text-xs text-gray-600">Estados UI</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Estrutura de Componentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {arquiteturaDecisao.estrutura.map((item, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                          <LucideIcons.FileCode className="h-4 w-4 text-gray-500 mt-0.5" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="workflow" className="mt-8">
              <div className="space-y-8">
                {/* Estados do Workflow */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Estados do Sistema</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {estadosWorkflow.map((categoria, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="text-lg">{categoria.categoria}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {categoria.estados.map((estado, idx) => (
                              <div key={idx} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                                <div className={`w-3 h-3 rounded-full ${
                                  estado.cor === 'green' ? 'bg-green-500' :
                                  estado.cor === 'red' ? 'bg-red-500' :
                                  estado.cor === 'yellow' ? 'bg-yellow-500' :
                                  estado.cor === 'blue' ? 'bg-blue-500' :
                                  estado.cor === 'orange' ? 'bg-orange-500' :
                                  estado.cor === 'purple' ? 'bg-purple-500' :
                                  'bg-gray-500'
                                }`}></div>
                                <div>
                                  <p className="font-medium text-gray-900 text-sm">{estado.nome}</p>
                                  <p className="text-xs text-gray-600">{estado.descricao}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Fluxos do Sistema */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Fluxos do Sistema</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {fluxosWorkflow.map((fluxo, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="text-lg">{fluxo.titulo}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {fluxo.etapas.map((etapa, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                                  {idx + 1}
                                </div>
                                <p className="text-sm text-gray-600">{etapa}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
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
                        <pre className="text-green-400 text-sm whitespace-pre-wrap">
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

      {/* Metodologia Aplicada */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Product Design AI-Enhanced em Ação
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Como a metodologia sistematizou um workflow complexo em uma solução robusta
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                etapa: "Análise de Contexto",
                aplicacao: "Identificação de perfis múltiplos e necessidades de compliance",
                resultado: "Arquitetura modular para diferentes tipos de usuário",
                icone: "Users",
                cor: "from-blue-600 to-blue-700"
              },
              {
                etapa: "Mapeamento de Estados",
                aplicacao: "8 estados de processo + 4 estados de interface mapeados",
                resultado: "Controle rigoroso de transições e validações",
                icone: "GitBranch",
                cor: "from-yellow-600 to-orange-600"
              },
              {
                etapa: "Workflow Defensivo",
                aplicacao: "Validação de transições e notificações não-bloqueantes",
                resultado: "Sistema robusto que nunca trava o processo",
                icone: "Shield",
                cor: "from-green-600 to-green-700"
              },
              {
                etapa: "Interface Contextual",
                aplicacao: "Dashboards específicos para cada perfil de usuário",
                resultado: "UX otimizada para solicitantes e aprovadores",
                icone: "Layout",
                cor: "from-purple-600 to-purple-700"
              },
              {
                etapa: "Notificações Inteligentes",
                aplicacao: "Sistema automatizado sem bloquear workflow principal",
                resultado: "Comunicação eficiente sem impactar performance",
                icone: "Bell",
                cor: "from-orange-600 to-red-600"
              },
              {
                etapa: "Auditoria Completa",
                aplicacao: "Histórico detalhado de todas as ações e decisões",
                resultado: "Compliance e transparência para auditoria",
                icone: "FileText",
                cor: "from-teal-600 to-cyan-600"
              }
            ].map((item, index) => {
              const IconeComponente = LucideIcons[item.icone as keyof typeof LucideIcons] as any
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${item.cor} rounded-lg mb-4`}>
                      <IconeComponente className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.etapa}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {item.aplicacao}
                    </p>
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <p className="text-yellow-800 text-sm font-medium">
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
      <section className="py-16 bg-gradient-to-r from-yellow-600 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Workflow Complexo, Implementação Simples
          </h2>
          <p className="text-xl text-yellow-100 mb-8">
            Sistema completo de aprovações criado em menos de 2 horas com a metodologia AI-Enhanced
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-yellow-600 hover:bg-gray-100">
              <Link href="/metodologia">
                <LucideIcons.Cog className="mr-2 h-5 w-5" />
                Ver Como Funciona
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-yellow-600">
              <Link href="/contato">
                <LucideIcons.MessageCircle className="mr-2 h-5 w-5" />
                Implementar na Sua Empresa
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SistemaAprovacoesPage