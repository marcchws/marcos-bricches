// app/sobre/page.tsx
'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import * as LucideIcons from 'lucide-react'
import Link from 'next/link'
import { perfilPessoal } from '@/data/perfil'

const SobrePage = () => {
  const timeline = [
    {
      periodo: "2023 - Presente",
      cargo: "Product Designer",
      empresa: "Devio",
      descricao: "Desenvolvimento e aplicação da metodologia Product Design AI-Enhanced. Criação de sistemas de design robustos e otimização de processos através de automação inteligente.",
      realizacoes: [
        "Criação da metodologia Product Design AI-Enhanced",
        "85% redução de retrabalho na equipe",
        "Implementação de padrões defensivos",
        "Automação de processos repetitivos"
      ]
    },
    {
      periodo: "2021 - 2023",
      cargo: "UX Designer",
      empresa: "Mestres da Web",
      descricao: "Projetos múltiplos focados em ERPs e sistemas complexos. Pesquisa estratégica de usuários e otimização de interfaces.",
      realizacoes: [
        "Redesign de 15+ sistemas ERP",
        "Pesquisa de usuários para produtos B2B",
        "Otimização de fluxos complexos",
        "Implementação de design systems"
      ]
    }
  ]

  const competenciasPorCategoria = {
    design: [
      "Product Design",
      "UX Research", 
      "UI Design",
      "Design Systems"
    ],
    tecnico: [
      "Next.js",
      "TypeScript",
      "Figma", 
      "AI Integration"
    ],
    metodologias: [
      "Design Thinking",
      "Product Design AI-Enhanced",
      "Agile/Scrum",
      "User Research"
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-purple-600/10 to-blue-600/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Avatar className="w-32 h-32 mx-auto mb-6">
              <AvatarImage src="/marcos-bricches.png" alt="Marcos Bricches" />
              <AvatarFallback className="text-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                MB
              </AvatarFallback>
            </Avatar>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {perfilPessoal.nome}
            </h1>
            
            <p className="text-xl text-gray-600 mb-6">
              {perfilPessoal.titulo}
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                3+ anos de experiência
              </Badge>
              <Badge variant="outline">Metodologia proprietária</Badge>
              <Badge variant="outline">AI-Enhanced Design</Badge>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600">
                <Link href="/contato">
                  <LucideIcons.MessageCircle className="mr-2 h-5 w-5" />
                  Vamos Conversar
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={perfilPessoal.contato.linkedin} target="_blank" rel="noopener noreferrer">
                  <LucideIcons.Linkedin className="mr-2 h-5 w-5" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Resumo */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Sobre mim</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p>
                  Sou um Product Designer com mais de 3 anos de experiência, apaixonado por encontrar 
                  soluções criativas para problemas complexos. Minha abordagem combina design centrado 
                  no usuário com tecnologia, sempre buscando maneiras de tornar o trabalho mais eficiente 
                  e os resultados mais impactantes.
                </p>
                
                <p>
                  O que me move é a possibilidade de transformar ideias abstratas em interfaces funcionais 
                  que realmente fazem sentido para quem as usa. Tenho um interesse particular em como a IA 
                  pode potencializar o trabalho do designer, não para substituir a criatividade humana, mas 
                  para liberar mais tempo para o que realmente importa: entender usuários e resolver problemas.
                </p>
                
                <p>
                  Trabalho principalmente com Figma e tenho conhecimentos sólidos em front-end (Next.js, TypeScript), 
                  o que me permite criar protótipos funcionais e manter uma comunicação mais fluida com equipes 
                  de desenvolvimento. Essa ponte técnica tem sido fundamental para traduzir visões de produto em realidade.
                </p>
                
                <p>
                  Nos últimos tempos, tenho me dedicado a desenvolver processos que aproveitam IA para automatizar 
                  tarefas repetitivas e melhorar a qualidade das entregas. O objetivo é sempre dedicar mais energia 
                  à estratégia e menos tempo às operações.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trajetória Profissional</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Evolução desde UX Designer até criador de metodologia proprietária
            </p>
          </div>
          
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <LucideIcons.Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {item.cargo}
                          </h3>
                          <p className="text-purple-600 font-medium">{item.empresa}</p>
                        </div>
                        <Badge variant="outline">{item.periodo}</Badge>
                      </div>
                      <p className="text-gray-600 mb-4">{item.descricao}</p>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Principais realizações:</h4>
                        <ul className="space-y-1">
                          {item.realizacoes.map((realizacao, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-600">
                              <LucideIcons.CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {realizacao}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Competências */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Competências Técnicas</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Combinação única de design, tecnologia e metodologia
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(competenciasPorCategoria).map(([categoria, competencias]) => (
              <Card key={categoria}>
                <CardHeader>
                  <CardTitle className="capitalize">
                    {categoria === 'design' && 'Design'}
                    {categoria === 'tecnico' && 'Técnico'}
                    {categoria === 'metodologias' && 'Metodologias'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {competencias.map((comp, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {comp}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certificações */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Certificações</h2>
            <p className="text-gray-600">Formação contínua em design e tecnologia</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {perfilPessoal.certificacoes.map((cert, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                      <LucideIcons.Award className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-900">{cert}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-16 bg-gradient-to-br from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Meu Diferencial</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <LucideIcons.Brain className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Pensamento Lógico</h3>
              <p className="text-purple-100">
                Capacidade de estruturar processos complexos e identificar oportunidades de otimização
              </p>
            </div>
            <div className="text-center">
              <LucideIcons.Code className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Ponte Técnica</h3>
              <p className="text-purple-100">
                Conhecimento em programação facilita comunicação com development e prototipagem funcional
              </p>
            </div>
            <div className="text-center">
              <LucideIcons.Zap className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Metodologia Proprietária</h3>
              <p className="text-purple-100">
                Framework único que acelera entregas mantendo qualidade através de automação inteligente
              </p>
            </div>
          </div>
          
          <div className="mt-12">
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              <Link href="/metodologia">
                <LucideIcons.ArrowRight className="mr-2 h-5 w-5" />
                Conheça a Metodologia
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SobrePage