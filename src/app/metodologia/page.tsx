// app/metodologia/page.tsx
'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import * as LucideIcons from 'lucide-react'
import Link from 'next/link'

const MetodologiaPage = () => {
  const [calculadoraInputs, setCalculadoraInputs] = useState({
    numeroProjetosAnuais: 12,
    tempoMedioAtual: 80,
    custoPorHora: 100,
    taxaRetrabalho: 30
  })

  const etapasMetodologia = [
    {
      numero: 1,
      titulo: "Análise Multicamada Obrigatória",
      descricao: "Análise sistemática em 6 camadas: contexto, requisitos, arquitetura, UX, regras e validação técnica",
      tempo: "30-45 min",
      icone: "Search",
      cor: "from-blue-600 to-indigo-600"
    },
    {
      numero: 2,
      titulo: "Inteligência de Requisitos",
      descricao: "Parser semântico que extrai requisitos explícitos, infere implícitos e identifica ambiguidades",
      tempo: "15-20 min",
      icone: "Brain",
      cor: "from-purple-600 to-violet-600"
    },
    {
      numero: 3,
      titulo: "Arquitetura de Interface",
      descricao: "Decisão arquitetural baseada em métricas objetivas: componente único vs sistema modular",
      tempo: "20-30 min",
      icone: "Building",
      cor: "from-green-600 to-emerald-600"
    },
    {
      numero: 4,
      titulo: "Mapeamento de Estados",
      descricao: "100% dos estados UI mapeados: loading, erro, vazio, sucesso, condicionais por contexto",
      tempo: "25-35 min",
      icone: "GitBranch",
      cor: "from-yellow-600 to-orange-600"
    },
    {
      numero: 5,
      titulo: "Implementação Defensiva",
      descricao: "Código funcional com padrões robustos: tratamento de erros, timeouts, feedback imediato",
      tempo: "60-120 min",
      icone: "Code",
      cor: "from-red-600 to-pink-600"
    },
    {
      numero: 6,
      titulo: "Validação de Qualidade",
      descricao: "Score automatizado ≥90/100 baseado em heurísticas, acessibilidade e funcionalidade",
      tempo: "10-15 min",
      icone: "CheckCircle",
      cor: "from-teal-600 to-cyan-600"
    }
  ]

  const beneficios = [
    {
      titulo: "85% Redução de Retrabalho",
      descricao: "Análise sistemática elimina ambiguidades que geram retrabalho",
      icone: "TrendingDown",
      metrica: "85%"
    },
    {
      titulo: "3x Velocidade de Entrega",
      descricao: "Automação inteligente acelera processo sem perder qualidade",
      icone: "Zap",
      metrica: "3x"
    },
    {
      titulo: "90% Aprovação Primeira Apresentação",
      descricao: "Requisitos 100% mapeados garantem alinhamento com stakeholders",
      icone: "Target",
      metrica: "90%"
    },
    {
      titulo: "Zero Edge Cases",
      descricao: "Estados UI completos previnem bugs e comportamentos inesperados",
      icone: "Shield",
      metrica: "0"
    }
  ]

  const calcularROI = () => {
    const { numeroProjetosAnuais, tempoMedioAtual, custoPorHora, taxaRetrabalho } = calculadoraInputs
    
    // Cálculos baseados nas métricas da metodologia
    const reducaoTempo = 0.67 // 67% de redução (3x mais rápido)
    const reducaoRetrabalho = 0.85 // 85% de redução de retrabalho
    
    const tempoComRetrabalho = tempoMedioAtual * (1 + taxaRetrabalho / 100)
    const tempoComMetodologia = tempoMedioAtual * (1 - reducaoTempo) * (1 - reducaoRetrabalho)
    
    const horasEconomizadasPorProjeto = tempoComRetrabalho - tempoComMetodologia
    const horasEconomizadasAnuais = horasEconomizadasPorProjeto * numeroProjetosAnuais
    const valorEconomizado = horasEconomizadasAnuais * custoPorHora
    
    const projetosAdicionais = Math.floor(horasEconomizadasAnuais / tempoComMetodologia)
    const melhoriaProdutividade = ((horasEconomizadasAnuais / (tempoComRetrabalho * numeroProjetosAnuais)) * 100)
    
    return {
      tempoEconomizado: Math.round(horasEconomizadasAnuais),
      valorEconomizado: Math.round(valorEconomizado),
      projetosAdicionais,
      melhoriaProdutividade: Math.round(melhoriaProdutividade)
    }
  }

  const resultadosROI = calcularROI()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-purple-600/10 to-blue-600/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              Metodologia Proprietária
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Product Design{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI-Enhanced
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Metodologia sistemática que combina análise inteligente de requisitos com 
              implementação técnica robusta, acelerando entregas e garantindo qualidade excepcional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600">
                <Link href="/cases">
                  <LucideIcons.Eye className="mr-2 h-5 w-5" />
                  Ver Cases Práticos
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/sobre">
                  <LucideIcons.User className="mr-2 h-5 w-5" />
                  Conhecer o Criador
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problema vs Solução */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Da Interpretação Subjetiva à Análise Sistemática
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Como transformei o processo tradicional de design em uma metodologia precisa e replicável
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Problema */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center gap-2">
                  <LucideIcons.AlertTriangle className="h-5 w-5" />
                  Processo Tradicional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <LucideIcons.X className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800">PRD ambíguo</p>
                      <p className="text-sm text-red-600">Requisitos incompletos ou mal especificados</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <LucideIcons.X className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800">Interpretação subjetiva</p>
                      <p className="text-sm text-red-600">Cada designer interpreta diferente</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <LucideIcons.X className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800">Wireframes baseados em suposições</p>
                      <p className="text-sm text-red-600">Estados não mapeados, edge cases ignorados</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <LucideIcons.X className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800">Retrabalho constante</p>
                      <p className="text-sm text-red-600">Iterações infinitas por falta de precisão</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Solução */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <LucideIcons.CheckCircle className="h-5 w-5" />
                  Product Design AI-Enhanced
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <LucideIcons.Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-800">Análise multicamada obrigatória</p>
                      <p className="text-sm text-green-600">6 camadas de análise sistemática</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <LucideIcons.Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-800">Parser semântico de requisitos</p>
                      <p className="text-sm text-green-600">Extração automatizada de entidades e regras</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <LucideIcons.Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-800">100% dos estados UI mapeados</p>
                      <p className="text-sm text-green-600">Zero edge cases não previstos</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <LucideIcons.Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-800">Código funcional + validação</p>
                      <p className="text-sm text-green-600">Score ≥90/100 antes do handoff</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Etapas da Metodologia */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              As 6 Etapas da Metodologia
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Processo sistemático que garante qualidade e velocidade em cada entrega
            </p>
          </div>
          
          <div className="grid gap-6">
            {etapasMetodologia.map((etapa, index) => {
              const IconeComponente = LucideIcons[etapa.icone as keyof typeof LucideIcons] as any
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${etapa.cor} flex items-center justify-center text-white font-bold text-lg`}>
                        {etapa.numero}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {etapa.titulo}
                          </h3>
                          <Badge variant="outline" className="text-sm">
                            {etapa.tempo}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-4">
                          {etapa.descricao}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <IconeComponente className="h-4 w-4" />
                          <span>Automatizado com IA</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Resultados Comprovados
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Métricas reais de impacto em projetos utilizando a metodologia
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {beneficios.map((beneficio, index) => {
              const IconeComponente = LucideIcons[beneficio.icone as keyof typeof LucideIcons] as any
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg mb-4">
                      <IconeComponente className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {beneficio.metrica}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {beneficio.titulo}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {beneficio.descricao}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Meta-case */}
      <section className="py-16 bg-white ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meta-case: Este Portfólio
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Demonstração prática: como usei a própria metodologia para criar este portfólio
            </p>
          </div>
          
          <Tabs defaultValue="analise" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="analise">Análise</TabsTrigger>
              <TabsTrigger value="implementacao">Implementação</TabsTrigger>
              <TabsTrigger value="resultados">Resultados</TabsTrigger>
            </TabsList>
            
            <TabsContent value="analise" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Análise Multicamada do Portfólio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Contexto de Produto</h4>
                      <p className="text-gray-600">Portfólio profissional para estabelecer thought leadership e conseguir posições como Product Designer.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Público-alvo</h4>
                      <p className="text-gray-600">Recruiters, designers, fundadores - pessoas que precisam validar competência técnica e inovação.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Arquitetura</h4>
                      <p className="text-gray-600">Sistema modular ({'>'}20 pontos de complexidade): múltiplas páginas, filtros avançados, estados condicionais.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Estados Mapeados</h4>
                      <p className="text-gray-600">23 estados UI identificados: loading, filtros, vazio, responsivo, etc.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="implementacao" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Implementação com Padrões Defensivos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Tecnologias</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Next.js', 'TypeScript', 'Tailwind', 'Shadcn/UI'].map(tech => (
                          <Badge key={tech} variant="secondary">{tech}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Funcionalidades</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Sistema de navegação responsivo</li>
                        <li>• Filtros avançados para cases</li>
                        <li>• Calculadora ROI interativa</li>
                        <li>• Design system consistente</li>
                        <li>• Tipagem TypeScript completa</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="resultados" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resultados Alcançados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">4h</div>
                      <p className="text-sm text-gray-600">Tempo total desenvolvimento</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">95/100</div>
                      <p className="text-sm text-gray-600">Score de qualidade</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">100%</div>
                      <p className="text-sm text-gray-600">Estados UI mapeados</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link href="/cases/meta-case-portfolio">
                <LucideIcons.ExternalLink className="mr-2 h-4 w-4" />
                Ver Case Completo
              </Link>
            </Button>
          </div>
        </div>
      </section>

        <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
            Quer saber mais sobre a metodologia?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
            Estou sempre aberto para conversar sobre design, IA e processos inovadores
            </p>
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            <Link href="/contato">
                <LucideIcons.MessageCircle className="mr-2 h-5 w-5" />
                Vamos Conversar
            </Link>
            </Button>
        </div>
        </section>
    </div>
  )
}

export default MetodologiaPage