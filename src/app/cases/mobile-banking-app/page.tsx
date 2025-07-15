// app/cases/mobile-banking-app/page.tsx
'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import * as LucideIcons from 'lucide-react'
import Link from 'next/link'
import MobileBankingPreview from '@/components/cases/MobileBankingPreview'

const MobileBankingAppPage = () => {
  const etapasImplementacao = [
    {
      numero: 1,
      titulo: "Arquitetura de Segurança Bancária",
      tempo: "90 min",
      descricao: "Definição de estrutura de segurança multi-camadas para transações financeiras",
      detalhes: [
        "Contexto: Fintech com foco em mobile banking seguro para 50mil usuários",
        "Problema: Necessidade de compliance LGPD + regulamentações Banco Central",
        "Objetivos: Criptografia end-to-end + biometria + autenticação múltipla",
        "Stakeholders: Time de segurança, compliance, arquitetura, produto"
      ],
      resultado: "Arquitetura de segurança com 8 camadas de proteção e certificação PCI DSS"
    },
    {
      numero: 2,
      titulo: "Integração Core Bancário",
      tempo: "120 min",
      descricao: "Desenvolvimento de APIs para integração com sistemas bancários legados",
      detalhes: [
        "Core Banking: Integração com mainframe via APIs REST seguras",
        "PIX: Implementação completa do protocolo PIX do Banco Central",
        "TED/DOC: Sistema de transferências com validação de limites",
        "Cartões: Gestão de cartões físicos e virtuais em tempo real"
      ],
      resultado: "Suite de 15 APIs integradas com core bancário e sistemas de pagamento"
    },
    {
      numero: 3,
      titulo: "Autenticação Biométrica",
      tempo: "75 min",
      descricao: "Implementação de múltiplos fatores de autenticação móvel",
      detalhes: [
        "Biometria nativa: Touch ID, Face ID e reconhecimento de voz",
        "Fallback seguro: PIN de 6 dígitos + token SMS",
        "Sessão inteligente: Timeout adaptativo baseado em comportamento",
        "Anti-fraude: Detecção de padrões suspeitos e localização"
      ],
      resultado: "Sistema de autenticação com 99.97% de disponibilidade e 0.01% de fraudes"
    },
    {
      numero: 4,
      titulo: "Interface Mobile-First",
      tempo: "140 min",
      descricao: "Design system especializado para transações financeiras mobile",
      detalhes: [
        "Componentes bancários: Cards de conta, botões de transferência, input de valores",
        "Acessibilidade: Suporte a leitores de tela e navegação por voz",
        "Modo escuro: Interface otimizada para uso noturno",
        "Gestão de estado: Offline-first com sincronização automática"
      ],
      resultado: "Interface responsiva com 22 componentes especializados e 98% de satisfação"
    },
    {
      numero: 5,
      titulo: "Sistema de Transferências",
      tempo: "180 min",
      descricao: "Implementação completa de PIX, TED, DOC e pagamentos",
      detalhes: [
        "PIX instantâneo: QR Code, chave PIX, copia e cola, agendamento",
        "Boletos: Leitura de código de barras e linha digitável automática",
        "Limites dinâmicos: Baseados em score e histórico do cliente",
        "Comprovantes: PDF automático + histórico detalhado"
      ],
      resultado: "Sistema de pagamentos com 12 modalidades e 99.9% de sucesso nas transações"
    },
    {
      numero: 6,
      titulo: "Plataforma de Investimentos",
      tempo: "160 min",
      descricao: "Módulo completo de investimentos integrado ao app bancário",
      detalhes: [
        "Produtos: CDB, LCI/LCA, Fundos, Tesouro Direto, Ações",
        "Simuladores: Calculadoras de rentabilidade e projeções",
        "Portfolio: Visão consolidada com gráficos de performance",
        "Educação: Conteúdo financeiro personalizado por perfil"
      ],
      resultado: "Plataforma com 15 produtos de investimento e R$ 2M em volume transacionado"
    }
  ]

  const metricas = [
    { label: "Tempo de Desenvolvimento", valor: "12h 45min", icone: "Clock", cor: "text-green-600" },
    { label: "Usuários Ativos", valor: "50k+", icone: "Users", cor: "text-teal-600" },
    { label: "Transações/Dia", valor: "125k", icone: "ArrowRightLeft", cor: "text-green-600" },
    { label: "Security Score", valor: "A+", icone: "Shield", cor: "text-teal-600" }
  ]

  const tecnologiasUtilizadas = [
    {
      nome: "React Native + TypeScript",
      justificativa: "Desenvolvimento nativo cross-platform com type safety para operações financeiras críticas",
      beneficios: ["Performance nativa iOS/Android", "Tipagem forte para valores monetários", "Debugging avançado para transações"]
    },
    {
      nome: "Expo + EAS Build",
      justificativa: "Plataforma moderna para desenvolvimento e distribuição segura de apps financeiros",
      beneficios: ["Build pipeline otimizado", "OTA updates seguros", "Desenvolvimento acelerado"]
    },
    {
      nome: "Biometrics + Keychain",
      justificativa: "Autenticação segura usando recursos nativos do dispositivo móvel",
      beneficios: ["Touch/Face ID nativo", "Armazenamento seguro de tokens", "Fallback automático para PIN"]
    },
    {
      nome: "React Query + Async Storage",
      justificativa: "Gerenciamento de estado offline-first essencial para apps bancários móveis",
      beneficios: ["Cache persistente de dados", "Sync automática quando online", "Estados de loading/error robustos"]
    }
  ]

  const funcionalidadesDetalhadas = [
    {
      titulo: "Transferências PIX",
      descricao: "Sistema completo de transferências instantâneas do Banco Central",
      metricas: ["QR Code dinâmico", "Chave PIX (CPF, email, telefone)", "Agendamento recorrente", "Limites personalizados"],
      icone: "Zap"
    },
    {
      titulo: "Pagamento de Boletos",
      descricao: "Leitura automática e pagamento de boletos bancários",
      metricas: ["Scan código de barras", "Linha digitável", "Agendamento", "Histórico organizado"],
      icone: "FileText"
    },
    {
      titulo: "Investimentos",
      descricao: "Plataforma completa de produtos de investimento",
      metricas: ["15 produtos disponíveis", "Simuladores avançados", "Portfolio consolidado", "Educação financeira"],
      icone: "TrendingUp"
    },
    {
      titulo: "Controle Financeiro",
      descricao: "Ferramenta inteligente de gestão de gastos pessoais",
      metricas: ["Categorização automática", "Metas personalizadas", "Gráficos intuitivos", "Alertas por categoria"],
      icone: "PieChart"
    },
    {
      titulo: "Cartão Virtual",
      descricao: "Geração instantânea de cartões virtuais para compras online",
      metricas: ["Criação em 30 segundos", "Limites flexíveis", "Bloqueio temporário", "Dados seguros"],
      icone: "CreditCard"
    },
    {
      titulo: "Biometria Avançada",
      descricao: "Autenticação multi-fator com biometria nativa",
      metricas: ["Touch ID/Face ID", "Reconhecimento de voz", "PIN de emergência", "Sessão inteligente"],
      icone: "Fingerprint"
    }
  ]

  const resultadosAlcancados = [
    {
      categoria: "Segurança e Compliance",
      metricas: [
        { nome: "Taxa de fraude", valor: "0.01%", status: "excelente" },
        { nome: "Uptime do sistema", valor: "99.97%", status: "alto" },
        { nome: "Certificações obtidas", valor: "PCI DSS", status: "completo" }
      ]
    },
    {
      categoria: "Performance Operacional",
      metricas: [
        { nome: "Transações processadas/dia", valor: "125.000", status: "alto" },
        { nome: "Tempo médio de transação", valor: "< 3 seg", status: "rápido" },
        { nome: "Volume financeiro mensal", valor: "R$ 50M", status: "crescimento" }
      ]
    },
    {
      categoria: "Experiência do Usuário",
      metricas: [
        { nome: "NPS (Net Promoter Score)", valor: "84", status: "excelente" },
        { nome: "Tempo de onboarding", valor: "< 5 min", status: "rápido" },
        { nome: "Adoption rate", valor: "92%", status: "alto" }
      ]
    }
  ]

  const exemplosDados = [
    { funcionalidade: "PIX", volume: "R$ 25M", transacoes: 45000, crescimento: "+85%" },
    { funcionalidade: "Boletos", volume: "R$ 8M", transacoes: 12000, crescimento: "+45%" },
    { funcionalidade: "Investimentos", volume: "R$ 15M", transacoes: 3500, crescimento: "+120%" },
    { funcionalidade: "Cartão Virtual", volume: "R$ 2M", transacoes: 8500, crescimento: "+200%" }
  ]

  // Componente para renderizar ícones dinamicamente
  const IconeComponente = ({ nome, className }: { nome: string, className?: string }) => {
    const IconeElemento = (LucideIcons as any)[nome]
    return IconeElemento ? <IconeElemento className={className} /> : <LucideIcons.Circle className={className} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-green-600/10 to-teal-600/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center gap-2 mb-4">
              <Badge className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
                Mobile Banking
              </Badge>
              <Badge className="bg-blue-100 text-blue-800" variant="outline">
                FinTech
              </Badge>
              <Badge className="bg-purple-100 text-purple-800" variant="outline">
                High Security
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              App de Mobile Banking
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Aplicativo bancário completo com transferências PIX, investimentos, controle financeiro e máxima segurança. 
              Desenvolvido em 12h45min para 50mil+ usuários ativos usando a metodologia Product Design AI-Enhanced.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.Clock className="h-4 w-4" />
                <span>12h 45min desenvolvimento</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.Users className="h-4 w-4" />
                <span>50k+ usuários ativos</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.ArrowRightLeft className="h-4 w-4" />
                <span>125k transações/dia</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-teal-600">
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
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-600 to-teal-600 rounded-lg mb-3">
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
      <section className="py-16 bg-gradient-to-br from-green-50 to-teal-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Funcionalidades Principais
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Recursos bancários completos para uma experiência financeira moderna e segura
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
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-600 to-teal-600 rounded-lg mb-4">
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

      {/* Preview Interativo */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Preview Interativo do App
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experimente as principais funcionalidades do aplicativo bancário. Use a navegação inferior para explorar diferentes seções.
            </p>
          </div>
          
          <div className="flex justify-center">
            <MobileBankingPreview />
          </div>
          
          <div className="text-center mt-8">
            <div className="grid md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mb-2">
                  <LucideIcons.Zap className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">PIX Instantâneo</h3>
                <p className="text-xs text-gray-600">
                  Transferências em tempo real
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-teal-100 rounded-lg mb-2">
                  <LucideIcons.TrendingUp className="h-5 w-5 text-teal-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Investimentos</h3>
                <p className="text-xs text-gray-600">
                  Portfolio completo
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mb-2">
                  <LucideIcons.CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Cartões</h3>
                <p className="text-xs text-gray-600">
                  Físico e virtual
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mb-2">
                  <LucideIcons.Fingerprint className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Biometria</h3>
                <p className="text-xs text-gray-600">
                  Segurança máxima
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
                        <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
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
                        <h4 className="font-medium text-gray-900 mb-2">Benefícios:</h4>
                        <ul className="space-y-2">
                          {tech.beneficios.map((beneficio, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                              <LucideIcons.CheckCircle className="h-4 w-4 text-green-500" />
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
                                metrica.status === 'alto' ? 'secondary' :
                                metrica.status === 'crescimento' ? 'default' :
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
                          <p className="text-sm text-gray-600">{item.transacoes.toLocaleString()} transações</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{item.volume}</div>
                          <div className="text-sm text-green-600">{item.crescimento}</div>
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
      <section className="py-16 bg-gradient-to-r from-green-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Interessado em um App Bancário Similar?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Veja como a metodologia Product Design AI-Enhanced pode acelerar seu projeto FinTech
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              <Link href="/contato">
                <LucideIcons.MessageCircle className="mr-2 h-5 w-5" />
                Falar Sobre Seu Projeto
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-green-600 hover:bg-white hover:text-green-600">
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

export default MobileBankingAppPage 