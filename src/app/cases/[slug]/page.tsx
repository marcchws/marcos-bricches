// app/cases/[slug]/page.tsx
'use client'

import React from 'react'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import * as LucideIcons from 'lucide-react'
import Link from 'next/link'
import { obterCasePorId } from '@/data/cases'

interface CaseDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

const CaseDetailPage: React.FC<CaseDetailPageProps> = async ({ params }) => {
  const { slug } = await params
  const caso = obterCasePorId(slug)
  
  if (!caso) {
    notFound()
  }

  const getComplexidadeCor = (complexidade: string) => {
    switch (complexidade) {
      case 'basico': return 'bg-green-100 text-green-800'
      case 'medio': return 'bg-yellow-100 text-yellow-800'
      case 'avançado': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatarTempo = (tempo: string) => {
    switch (tempo) {
      case '<10min': return 'Menos de 10 minutos'
      case '10-30min': return '10 - 30 minutos'
      case '30min-2h': return '30 minutos - 2 horas'
      case '2h-6h': return '2 horas - 6 horas'
      default: return tempo
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-purple-600/10 to-blue-600/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center gap-2 mb-4">
              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                {caso.categoria}
              </Badge>
              <Badge className={getComplexidadeCor(caso.complexidade)} variant="outline">
                {caso.complexidade}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {caso.titulo}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {caso.descricao}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.Clock className="h-4 w-4" />
                <span>{formatarTempo(caso.tempoDesenvolvimento)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.Layers className="h-4 w-4" />
                <span>{caso.funcionalidades.length} funcionalidades</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.Code className="h-4 w-4" />
                <span>{caso.tecnologias.length} tecnologias</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {caso.github_url && (
                <Button asChild variant="outline" size="lg">
                  <a href={caso.github_url} target="_blank" rel="noopener noreferrer">
                    <LucideIcons.Github className="mr-2 h-5 w-5" />
                    Ver Código
                  </a>
                </Button>
              )}
              {caso.notion_url && (
                <Button asChild variant="outline" size="lg">
                  <a href={caso.notion_url} target="_blank" rel="noopener noreferrer">
                    <LucideIcons.ExternalLink className="mr-2 h-5 w-5" />
                    Ver no Notion
                  </a>
                </Button>
              )}
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600">
                <Link href="/cases">
                  <LucideIcons.ArrowLeft className="mr-2 h-5 w-5" />
                  Voltar aos Cases
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Preview */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`h-96 rounded-xl bg-gradient-to-br ${caso.cor_tema} flex items-center justify-center mb-12`}>
            <div className="text-white text-center">
              <LucideIcons.Monitor className="h-16 w-16 mx-auto mb-4 opacity-60" />
              <h3 className="text-2xl font-semibold mb-2">Preview do Case</h3>
              <p className="opacity-80">Interface será implementada aqui</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detalhes */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="funcionalidades">Funcionalidades</TabsTrigger>
              <TabsTrigger value="tecnologias">Tecnologias</TabsTrigger>
              <TabsTrigger value="processo">Processo</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Sobre o Projeto</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{caso.descricao}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Categoria:</span>
                        <span className="font-medium">{caso.categoria}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Complexidade:</span>
                        <span className="font-medium">{caso.complexidade}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tempo de desenvolvimento:</span>
                        <span className="font-medium">{formatarTempo(caso.tempoDesenvolvimento)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <Badge variant={caso.destaque ? "default" : "secondary"}>
                          {caso.destaque ? 'Destaque' : 'Padrão'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Metodologia Aplicada</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <LucideIcons.Search className="h-5 w-5 text-purple-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold">Análise Multicamada</h4>
                          <p className="text-sm text-gray-600">Requisitos mapeados sistematicamente</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <LucideIcons.GitBranch className="h-5 w-5 text-purple-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold">Estados UI Completos</h4>
                          <p className="text-sm text-gray-600">Todos os cenários previstos</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <LucideIcons.Code className="h-5 w-5 text-purple-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold">Padrões Defensivos</h4>
                          <p className="text-sm text-gray-600">Código robusto e otimizado</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <LucideIcons.CheckCircle className="h-5 w-5 text-purple-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold">Validação Automática</h4>
                          <p className="text-sm text-gray-600">Score de qualidade ≥90/100</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="funcionalidades" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Funcionalidades Implementadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {caso.funcionalidades.map((funcionalidade, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{funcionalidade}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tecnologias" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Stack Tecnológico</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {caso.tecnologias.map((tecnologia, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {tecnologia}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Por que essas tecnologias?</h4>
                    <p className="text-blue-800 text-sm">
                      Escolha baseada em performance, produtividade e alinhamento com a metodologia AI-Enhanced. 
                      Cada tecnologia foi selecionada para maximizar eficiência e qualidade de entrega.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="processo" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Processo de Desenvolvimento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Análise de Requisitos</h4>
                        <p className="text-gray-600 text-sm">Mapeamento completo das funcionalidades e regras de negócio</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Design de Interface</h4>
                        <p className="text-gray-600 text-sm">Criação de wireframes e definição de estados UI</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Implementação</h4>
                        <p className="text-gray-600 text-sm">Desenvolvimento com padrões defensivos e validação contínua</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Validação</h4>
                        <p className="text-gray-600 text-sm">Testes de qualidade e score automatizado</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Gostou deste case?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Vamos conversar sobre como posso ajudar em seus projetos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              <Link href="/contato">
                <LucideIcons.MessageCircle className="mr-2 h-5 w-5" />
                Vamos Conversar
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600">
              <Link href="/metodologia">
                <LucideIcons.BookOpen className="mr-2 h-5 w-5" />
                Conhecer Metodologia
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CaseDetailPage