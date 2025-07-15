// app/page.tsx
'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import * as LucideIcons from 'lucide-react'
import Link from 'next/link'
import { perfilPessoal } from '@/data/perfil'

const HomePage = () => {
  const metricas = [
    { valor: "85%", label: "Redução de retrabalho", icone: "TrendingDown" },
    { valor: "3x", label: "Velocidade de entrega", icone: "Zap" },
    { valor: "90%", label: "Aprovação na 1ª apresentação", icone: "CheckCircle" },
    { valor: "<1h", label: "Tempo médio de desenvolvimento", icone: "Clock" }
  ]

  const diferenciais = [
    {
      titulo: "Metodologia AI-Enhanced",
      descricao: "Framework proprietário que combina design thinking com inteligência artificial",
      icone: "Brain"
    },
    {
      titulo: "Código + Design",
      descricao: "Prototipagem funcional em Next.js/TypeScript para validação real",
      icone: "Code"
    },
    {
      titulo: "Pensamento Lógico",
      descricao: "Análise sistemática de processos para otimização e automação",
      icone: "Target"
    },
    {
      titulo: "Resultados Mensuráveis",
      descricao: "Métricas comprovadas de performance e qualidade de entrega",
      icone: "BarChart3"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-violet-600/10 to-blue-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              Product Design AI-Enhanced
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Designer que{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                otimiza processos
              </span>
              <br />
              com IA e código
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Criador da metodologia Product Design AI-Enhanced. Acelero entregas, 
              melhoro qualidade e inovo processos através da combinação de design 
              centrado no usuário com inteligência artificial.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Link href="/cases">
                  <LucideIcons.Eye className="mr-2 h-5 w-5" />
                  Ver Cases
                </Link>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Resultados Comprovados
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Métricas reais de impacto da metodologia Product Design AI-Enhanced
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metricas.map((metrica, index) => {
              const IconeComponente = LucideIcons[metrica.icone as keyof typeof LucideIcons] as any
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg mb-4">
                      <IconeComponente className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
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

      {/* Diferenciais */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Diferenciais Únicos
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Combinação única de competências que geram resultados excepcionais
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {diferenciais.map((diferencial, index) => {
              const IconeComponente = LucideIcons[diferencial.icone as keyof typeof LucideIcons] as any
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
                        <IconeComponente className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {diferencial.titulo}
                        </h3>
                        <p className="text-gray-600">
                          {diferencial.descricao}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
      Interessado em conhecer meu trabalho?
    </h2>
    <p className="text-xl text-purple-100 mb-8">
      Explore meus cases e veja como a metodologia AI-Enhanced funciona na prática
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
        <Link href="/cases">
          <LucideIcons.Eye className="mr-2 h-5 w-5" />
          Explorar Cases
        </Link>
      </Button>
      <Button asChild variant="outline" size="lg" className="border-white text-purple-600 hover:bg-white hover:text-purple-600">
        <Link href="/contato">
          <LucideIcons.MessageCircle className="mr-2 h-5 w-5" />
          Vamos Conversar
        </Link>
      </Button>
    </div>
  </div>
</section>
    </div>
  )
}

export default HomePage