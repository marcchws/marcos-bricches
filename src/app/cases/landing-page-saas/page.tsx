// app/cases/landing-page-saas/page.tsx
'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import * as LucideIcons from 'lucide-react'
import Link from 'next/link'
import LandingPageSaasPreview from '@/components/cases/LandingPageSaasPreview'

const LandingPageSaasPage = () => {
  const especificacoes = {
    produto: "Landing Page SaaS",
    categoria: "SaaS",
    complexidade: "Básico",
    tempo: "<10min",
    tecnologias: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
    funcionalidades: [
      'Hero section otimizada',
      'Seção de features',
      'Pricing table',
      'Testimonials',
      'Call-to-actions',
      'Design responsivo'
    ]
  }

  const arquitecturaDecisao = {
    estrategia: "Componente Único",
    justificativa: "Complexidade: 8 pontos (<15) - Landing page com seções simples e foco em conversão",
    estrutura: [
      "page.tsx - Componente principal",
      "HeroSection - Apresentação inicial",
      "FeaturesSection - Recursos do produto", 
      "PricingSection - Tabela de preços",
      "TestimonialsSection - Depoimentos de clientes"
    ]
  }

  const estadosUI = [
    { categoria: "Estados Primários", estados: ["Loading inicial", "Página carregada", "Erro de carregamento", "Modo responsivo"] },
    { categoria: "Estados Condicionais", estados: ["Primeiro visitante", "Visitante recorrente", "Mobile/Desktop", "Dark/Light mode"] },
    { categoria: "Estados de Transição", estados: ["Animações de entrada", "Scroll suave", "Hover effects", "Modal aberto"] },
    { categoria: "Estados de Feedback", estados: ["CTA clicado", "Formulário enviado", "Newsletter subscrita", "Demo solicitada"] }
  ]

  const padroesTecnicos = [
    {
      categoria: "Performance",
      tecnicas: [
        "Lazy loading de imagens",
        "Code splitting automático",
        "Otimização de Core Web Vitals",
        "Preload de recursos críticos"
      ]
    },
    {
      categoria: "SEO",
      tecnicas: [
        "Meta tags otimizadas",
        "Schema markup",
        "Open Graph tags",
        "Sitemap automático"
      ]
    },
    {
      categoria: "Conversão",
      tecnicas: [
        "A/B testing ready",
        "Analytics tracking",
        "Heat mapping",
        "Conversion funnel"
      ]
    },
    {
      categoria: "UX",
      tecnicas: [
        "Micro-interactions",
        "Smooth scrolling",
        "Progressive disclosure",
        "Social proof"
      ]
    }
  ]

  const decisoesTecnicas = [
    {
      aspecto: "Framework",
      escolha: "Next.js 14 + App Router",
      justificativa: "SSG para performance, SEO otimizado, deployment simples"
    },
    {
      aspecto: "Styling",
      escolha: "Tailwind CSS",
      justificativa: "Desenvolvimento rápido, design system consistente, bundle otimizado"
    },
    {
      aspecto: "Animações",
      escolha: "Framer Motion",
      justificativa: "Animações fluidas, gestos touch, performance otimizada"
    },
    {
      aspecto: "Tipografia",
      escolha: "Next/Font",
      justificativa: "Carregamento otimizado, fallbacks automáticos, performance"
    }
  ]

  const metrics = [
    { label: "Lighthouse Score", valor: "98/100", cor: "text-green-600" },
    { label: "First Paint", valor: "0.8s", cor: "text-green-600" },
    { label: "Time to Interactive", valor: "1.2s", cor: "text-green-600" },
    { label: "Bundle Size", valor: "< 100KB", cor: "text-green-600" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/cases" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <LucideIcons.ArrowLeft className="w-4 h-4" />
              Voltar aos Cases
            </Link>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                {especificacoes.categoria}
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {especificacoes.complexidade}
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center">
              <LucideIcons.Globe className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{especificacoes.produto}</h1>
              <p className="text-xl text-gray-600">Landing page otimizada para conversão com foco em performance e SEO</p>
            </div>
          </div>

          {/* Métricas Rápidas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {metrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-4 text-center">
                  <div className={`text-2xl font-bold ${metric.cor}`}>{metric.valor}</div>
                  <div className="text-sm text-gray-600">{metric.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {especificacoes.tecnologias.map((tech, index) => (
              <Badge key={index} variant="secondary" className="bg-indigo-100 text-indigo-800">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview - Coluna Principal */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LucideIcons.Monitor className="w-5 h-5" />
                  Preview Interativo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LandingPageSaasPreview />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar com Especificações */}
          <div className="space-y-6">
            {/* Especificações */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LucideIcons.FileText className="w-5 h-5" />
                  Especificações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="font-medium text-gray-700">Categoria</label>
                  <p className="text-gray-600">{especificacoes.categoria}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Complexidade</label>
                  <p className="text-gray-600">{especificacoes.complexidade}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Tempo de Desenvolvimento</label>
                  <p className="text-gray-600">{especificacoes.tempo}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Funcionalidades</label>
                  <ul className="text-gray-600 text-sm space-y-1 mt-1">
                    {especificacoes.funcionalidades.map((func, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <LucideIcons.Check className="w-3 h-3 text-green-600" />
                        {func}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Decisão de Arquitetura */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LucideIcons.GitBranch className="w-5 h-5" />
                  Arquitetura
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {arquitecturaDecisao.estrategia}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{arquitecturaDecisao.justificativa}</p>
                  <div>
                    <label className="font-medium text-gray-700 text-sm">Estrutura:</label>
                    <ul className="text-sm text-gray-600 mt-1 space-y-1">
                      {arquitecturaDecisao.estrutura.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Seções Detalhadas */}
        <div className="mt-12">
          <Tabs defaultValue="estados" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="estados">Estados de UI</TabsTrigger>
              <TabsTrigger value="padroes">Padrões Técnicos</TabsTrigger>
              <TabsTrigger value="decisoes">Decisões Técnicas</TabsTrigger>
            </TabsList>

            <TabsContent value="estados">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {estadosUI.map((categoria, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium">{categoria.categoria}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-2">
                        {categoria.estados.map((estado, estadoIndex) => (
                          <li key={estadoIndex} className="text-sm text-gray-600 flex items-center gap-2">
                            <div className="w-1 h-1 bg-indigo-400 rounded-full"></div>
                            {estado}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="padroes">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {padroesTecnicos.map((padrao, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{padrao.categoria}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {padrao.tecnicas.map((tecnica, tecnicaIndex) => (
                          <li key={tecnicaIndex} className="flex items-center gap-2 text-gray-600">
                            <LucideIcons.CheckCircle className="w-4 h-4 text-green-600" />
                            {tecnica}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="decisoes">
              <div className="space-y-4">
                {decisoesTecnicas.map((decisao, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{decisao.aspecto}</h3>
                          <p className="text-indigo-600 font-medium mb-2">{decisao.escolha}</p>
                          <p className="text-gray-600 text-sm">{decisao.justificativa}</p>
                        </div>
                        <LucideIcons.ArrowRight className="w-5 h-5 text-gray-400 mt-1 ml-4" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* CTA Final */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-indigo-600 to-blue-600 border-0">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Pronto para criar sua Landing Page?
              </h2>
              <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
                Este template demonstra como criar uma landing page de alta conversão 
                seguindo as melhores práticas de UX e performance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white text-indigo-600 hover:bg-gray-50"
                >
                  <LucideIcons.Download className="w-5 h-5 mr-2" />
                  Baixar Template
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  <LucideIcons.Github className="w-5 h-5 mr-2" />
                  Ver no GitHub
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default LandingPageSaasPage 