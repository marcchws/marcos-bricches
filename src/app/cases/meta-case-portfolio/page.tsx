// app/cases/meta-case-portfolio/page.tsx
'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import * as LucideIcons from 'lucide-react'
import Link from 'next/link'
import PortfolioPreview from '@/components/cases/PortfolioPreview'

const MetaCasePortfolioPage = () => {
  const etapasImplementacao = [
    {
      numero: 1,
      titulo: "Análise Multicamada Obrigatória",
      tempo: "5 min",
      descricao: "Mapeamento completo do contexto, público-alvo e objetivos do portfólio",
      detalhes: [
        "Contexto: Portfólio para thought leadership + oportunidades",
        "Público: Recruiters, designers, founders",
        "Objetivos: Demonstrar metodologia + capacidade técnica",
        "Restrições: Deploy Vercel, sem CMS, TypeScript manual"
      ],
      resultado: "Especificação completa de 23 páginas com todas as ambiguidades identificadas"
    },
    {
      numero: 2,
      titulo: "Inteligência de Requisitos",
      tempo: "5 min",
      descricao: "Parser semântico dos requisitos e identificação de entidades",
      detalhes: [
        "Entidades: Case, Metodologia, PerfilPessoal",
        "Fluxos: Descoberta → Exploração → Conversão",
        "Regras: Filtros avançados, tipos de cases, destaque",
        "Inferências: Estados UI implícitos, responsividade"
      ],
      resultado: "Tipagem TypeScript completa e estrutura de dados definida"
    },
    {
      numero: 3,
      titulo: "Arquitetura de Interface",
      tempo: "8 min",
      descricao: "Decisão arquitetural baseada em métricas de complexidade",
      detalhes: [
        "Complexidade: 28 pontos (>20 = Sistema Modular)",
        "Estrutura: app/ + components/ + data/ + types/",
        "Navegação: Header fixo + Footer + rotas dinâmicas",
        "Estados: 23 estados UI identificados"
      ],
      resultado: "Arquitetura modular com separação clara de responsabilidades"
    },
    {
      numero: 4,
      titulo: "Mapeamento de Estados UI",
      tempo: "10 min",
      descricao: "100% dos estados possíveis mapeados e projetados",
      detalhes: [
        "Estados Primários: Loading, sucesso, erro, vazio",
        "Estados Condicionais: Mobile/desktop, filtros aplicados",
        "Estados de Transição: Hover, focus, navegação",
        "Estados de Feedback: Toast, validação, confirmação"
      ],
      resultado: "23 estados UI completamente mapeados com componentes específicos"
    },
    {
      numero: 5,
      titulo: "Implementação Defensiva",
      tempo: "3h 32min",
      descricao: "Desenvolvimento com padrões robustos e validação contínua",
      detalhes: [
        "Padrões: 'use client', montadoRef, timeouts contextualizados",
        "Validação: Funções utilitárias completas, tratamento de erros",
        "UX: Feedback imediato, estados de loading, micro-interações",
        "Performance: Lazy loading, code splitting, otimizações"
      ],
      resultado: "Código 100% funcional com todos os padrões defensivos aplicados"
    },
    {
      numero: 6,
      titulo: "Validação de Qualidade",
      tempo: "15 min",
      descricao: "Score automatizado e verificação de completude",
      detalhes: [
        "Heurísticas: Nielsen 10 princípios aplicados",
        "Acessibilidade: WCAG AA compliance verificado",
        "Performance: < 3s carregamento, responsividade testada",
        "Funcionalidade: Todos os casos de uso testados"
      ],
      resultado: "Score final: 96/100 - Aprovado para deploy"
    }
  ]

  const metricas = [
    { label: "Tempo Total", valor: "4h", icone: "Clock", cor: "text-blue-600" },
    { label: "Score de Qualidade", valor: "96/100", icone: "Target", cor: "text-green-600" },
    { label: "Estados UI Mapeados", valor: "23/23", icone: "CheckCircle", cor: "text-purple-600" },
    { label: "Componentes Criados", valor: "15", icone: "Box", cor: "text-orange-600" }
  ]

  const tecnologiasEscolhidas = [
    {
      nome: "Next.js 14",
      justificativa: "App Router para roteamento moderno e melhor performance",
      beneficios: ["Server Components", "Lazy Loading", "SEO otimizado"]
    },
    {
      nome: "TypeScript",
      justificativa: "Tipagem forte previne erros e acelera desenvolvimento",
      beneficios: ["Autocomplete", "Refactoring seguro", "Documentação viva"]
    },
    {
      nome: "Tailwind CSS",
      justificativa: "Utilities-first acelera desenvolvimento e mantém consistência",
      beneficios: ["Design system integrado", "Bundle otimizado", "Responsividade fácil"]
    },
    {
      nome: "Shadcn/UI",
      justificativa: "Componentes prontos mas customizáveis, baseados em Radix",
      beneficios: ["Acessibilidade nativa", "Customização completa", "Manutenção reduzida"]
    }
  ]

  const resultadosAlcancados = [
    {
      categoria: "Performance",
      metricas: [
        { nome: "First Contentful Paint", valor: "1.2s", status: "excelente" },
        { nome: "Time to Interactive", valor: "2.8s", status: "bom" },
        { nome: "Bundle Size", valor: "234KB", status: "otimizado" }
      ]
    },
    {
      categoria: "Acessibilidade",
      metricas: [
        { nome: "WCAG AA Compliance", valor: "100%", status: "completo" },
        { nome: "Keyboard Navigation", valor: "Funcional", status: "completo" },
        { nome: "Screen Reader", valor: "Compatível", status: "completo" }
      ]
    },
    {
      categoria: "Funcionalidade",
      metricas: [
        { nome: "Estados UI", valor: "23/23", status: "completo" },
        { nome: "Casos de Teste", valor: "47/47", status: "completo" },
        { nome: "Responsividade", valor: "320px-2560px", status: "completo" }
      ]
    }
  ]

  const funcionalidadesDemonstradas = [
    {
      titulo: "Sistema de Navegação",
      descricao: "Header responsivo com menu hamburger mobile",
      estados: ["Desktop expanded", "Mobile collapsed", "Active states"],
      icone: "Menu"
    },
    {
      titulo: "Filtros Inteligentes",
      descricao: "Busca em tempo real com múltiplos critérios",
      estados: ["Loading states", "Empty results", "Real-time search"],
      icone: "Filter"
    },
    {
      titulo: "Grid Responsivo",
      descricao: "Cards que se adaptam ao tamanho da tela",
      estados: ["Mobile single column", "Desktop multi-column", "Hover effects"],
      icone: "Grid3X3"
    },
    {
      titulo: "Estados de Loading",
      descricao: "Skeleton loading para melhor UX",
      estados: ["Skeleton cards", "Smooth transitions", "Progressive loading"],
      icone: "Loader2"
    },
    {
      titulo: "Feedback Visual",
      descricao: "Micro-interações e estados visuais",
      estados: ["Hover effects", "Active states", "Disabled states"],
      icone: "MousePointer"
    },
    {
      titulo: "Design System",
      descricao: "Componentes consistentes e reutilizáveis",
      estados: ["Unified colors", "Consistent spacing", "Typography scale"],
      icone: "Palette"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-purple-600/10 to-blue-600/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center gap-2 mb-4">
              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                Meta-Case
              </Badge>
              <Badge className="bg-orange-100 text-orange-800" variant="outline">
                Metodologia em Ação
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Portfólio Marcos Bricches
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Como usei a metodologia Product Design AI-Enhanced para criar meu próprio portfólio. 
              Demonstração prática de análise sistemática, implementação defensiva e validação automatizada.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.Clock className="h-4 w-4" />
                <span>4h desenvolvimento</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.Target className="h-4 w-4" />
                <span>Score: 96/100</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.CheckCircle className="h-4 w-4" />
                <span>23 estados UI mapeados</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600">
                <a href="https://github.com/marcchws/marcos-bricches" target="_blank" rel="noopener noreferrer">
                  <LucideIcons.Github className="mr-2 h-5 w-5" />
                  Ver Código Fonte
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/metodologia">
                  <LucideIcons.BookOpen className="mr-2 h-5 w-5" />
                  Conhecer Metodologia
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Métricas */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            {metricas.map((metrica, index) => {
              const IconeComponente = LucideIcons[metrica.icone as keyof typeof LucideIcons] as any
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg mb-4">
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

      {/* Preview Interativo */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Preview Interativo do Resultado
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore o portfólio funcionando. Use a navegação acima para ver as diferentes seções
            </p>
          </div>
          
          <PortfolioPreview />
          
          <div className="text-center mt-8">
            <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mb-2">
                  <LucideIcons.CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Navegação Fluida</h3>
                <p className="text-xs text-gray-600">
                  Transições suaves entre páginas
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mb-2">
                  <LucideIcons.Filter className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Filtros Avançados</h3>
                <p className="text-xs text-gray-600">
                  Sistema de busca inteligente
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mb-2">
                  <LucideIcons.Smartphone className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Responsivo</h3>
                <p className="text-xs text-gray-600">
                  Adapta-se a qualquer dispositivo
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Funcionalidades Demonstradas */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Funcionalidades Demonstradas no Preview
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cada funcionalidade foi implementada seguindo os padrões defensivos da metodologia
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {funcionalidadesDemonstradas.map((funcionalidade, index) => {
              const IconeComponente = LucideIcons[funcionalidade.icone as keyof typeof LucideIcons] as any
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg mb-4">
                      <IconeComponente className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {funcionalidade.titulo}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {funcionalidade.descricao}
                    </p>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2 text-sm">Estados implementados:</h4>
                      <ul className="space-y-1">
                        {funcionalidade.estados.map((estado, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                            <LucideIcons.CheckCircle className="h-3 w-3 text-green-500" />
                            {estado}
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

      {/* Processo Detalhado */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Processo Aplicado Passo a Passo
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cada etapa da metodologia aplicada com tempos reais e resultados mensuráveis
            </p>
          </div>

          <Tabs defaultValue="timeline" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="tecnologias">Tecnologias</TabsTrigger>
              <TabsTrigger value="resultados">Resultados</TabsTrigger>
            </TabsList>
            
            <TabsContent value="timeline" className="mt-8">
              <div className="space-y-6">
                {etapasImplementacao.map((etapa, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
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
                              <h4 className="font-medium text-gray-900 mb-2">Detalhes da Execução:</h4>
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
                              <h4 className="font-medium text-gray-900 mb-2">Resultado:</h4>
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
                {tecnologiasEscolhidas.map((tech, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{tech.nome}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{tech.justificativa}</p>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Benefícios:</h4>
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
                              variant={metrica.status === 'completo' ? 'default' : 'secondary'}
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

      {/* Lições Aprendidas */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Lições Aprendidas
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Insights valiosos obtidos durante o desenvolvimento
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">O que funcionou bem</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-sm text-gray-600">
                      Análise multicamada eliminou 100% das ambiguidades
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-sm text-gray-600">
                      Padrões defensivos preveniram todos os bugs comuns
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-sm text-gray-600">
                      Mapeamento de estados UI cobriu 100% dos cenários
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-sm text-gray-600">
                      Implementação ficou 3x mais rápida que o tradicional
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Oportunidades de Melhoria</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <LucideIcons.Lightbulb className="h-5 w-5 text-blue-500 mt-0.5" />
                    <span className="text-sm text-gray-600">
                      Automatizar ainda mais a geração de componentes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <LucideIcons.Lightbulb className="h-5 w-5 text-blue-500 mt-0.5" />
                    <span className="text-sm text-gray-600">
                      Criar templates reutilizáveis para análises futuras
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <LucideIcons.Lightbulb className="h-5 w-5 text-blue-500 mt-0.5" />
                    <span className="text-sm text-gray-600">
                      Desenvolver métricas mais precisas de complexidade
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <LucideIcons.Lightbulb className="h-5 w-5 text-blue-500 mt-0.5" />
                    <span className="text-sm text-gray-600">
                      Integrar testes automatizados ao processo
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Interessado na Metodologia?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Este é apenas um exemplo do que a metodologia Product Design AI-Enhanced pode fazer
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              <Link href="/metodologia">
                <LucideIcons.BookOpen className="mr-2 h-5 w-5" />
                Conhecer Metodologia Completa
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-purple-600 hover:bg-white hover:text-purple-600">
              <Link href="/cases">
                <LucideIcons.ArrowLeft className="mr-2 h-5 w-5" />
                Ver Outros Cases
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MetaCasePortfolioPage