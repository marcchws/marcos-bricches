// app/contato/page.tsx
'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import * as LucideIcons from 'lucide-react'
import { perfilPessoal } from '@/data/perfil'

const ContatoPage = () => {
  const formasContato = [
    {
      tipo: 'Email',
      descricao: 'Para oportunidades profissionais e parcerias',
      valor: perfilPessoal.contato.email,
      icone: 'Mail',
      acao: `mailto:${perfilPessoal.contato.email}?subject=Oportunidade Profissional&body=Olá Marcos,%0D%0A%0D%0AGostaria de conversar sobre...`,
      cor: 'from-red-500 to-pink-500',
      primary: true
    },
    {
      tipo: 'LinkedIn',
      descricao: 'Conecte-se para networking e oportunidades',
      valor: 'Marcos Bricches',
      icone: 'Linkedin',
      acao: perfilPessoal.contato.linkedin,
      cor: 'from-blue-600 to-blue-700',
      primary: true
    },
    {
      tipo: 'GitHub',
      descricao: 'Explore meus repositórios e projetos',
      valor: 'Ver código e projetos',
      icone: 'Github',
      acao: perfilPessoal.contato.github,
      cor: 'from-gray-700 to-gray-800',
      primary: false
    },
    {
      tipo: 'Behance',
      descricao: 'Portfolio visual e projetos de design',
      valor: 'Ver portfolio visual',
      icone: 'Palette',
      acao: 'https://www.behance.net/marcosbricches',
      cor: 'from-purple-600 to-violet-600',
      primary: false
    }
  ]

  const tiposConversa = [
    {
      titulo: 'Oportunidades de Emprego',
      descricao: 'Interessado em posições como Product Designer',
      icone: 'Briefcase',
      sugestaoEmail: 'Oportunidade de Emprego'
    },
    {
      titulo: 'Parcerias e Projetos',
      descricao: 'Colaborações em projetos interessantes',
      icone: 'Handshake',
      sugestaoEmail: 'Parceria em Projeto'
    },
    {
      titulo: 'Networking',
      descricao: 'Conversar sobre design, IA e metodologias',
      icone: 'Users',
      sugestaoEmail: 'Networking'
    },
    {
      titulo: 'Mentoria',
      descricao: 'Compartilhar conhecimento sobre design',
      icone: 'GraduationCap',
      sugestaoEmail: 'Mentoria'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-purple-600/10 to-blue-600/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Vamos{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Conversar
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Estou sempre aberto para novas oportunidades, parcerias interessantes 
              e conversas sobre design, IA e inovação em processos.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                Resposta rápida
              </Badge>
              <Badge variant="outline">Networking</Badge>
              <Badge variant="outline">Oportunidades</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Formas de Contato */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Como me encontrar
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Escolha a forma de contato que preferir. Respondo rapidamente e adoro 
              conhecer pessoas interessantes da área.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {formasContato.map((contato, index) => {
              const IconeComponente = LucideIcons[contato.icone as keyof typeof LucideIcons] as any
              return (
                <Card key={index} className={`hover:shadow-lg transition-all duration-300 ${contato.primary ? 'ring-2 ring-purple-100' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${contato.cor} flex items-center justify-center flex-shrink-0`}>
                        <IconeComponente className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {contato.tipo}
                          </h3>
                          {contato.primary && (
                            <Badge variant="secondary" className="text-xs">
                              Preferido
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                          {contato.descricao}
                        </p>
                        <Button 
                          asChild 
                          className={`w-full ${contato.primary ? 'bg-gradient-to-r from-purple-600 to-blue-600' : ''}`}
                          variant={contato.primary ? 'default' : 'outline'}
                        >
                          <a 
                            href={contato.acao}
                            target={contato.tipo === 'Email' ? '_self' : '_blank'}
                            rel={contato.tipo === 'Email' ? undefined : 'noopener noreferrer'}
                          >
                            <IconeComponente className="mr-2 h-4 w-4" />
                            {contato.valor}
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>


      {/* Dicas para Contato */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Dicas para nosso primeiro contato
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg mb-4">
                <LucideIcons.Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Resposta Rápida</h3>
              <p className="text-gray-600 text-sm">
                Costumo responder emails em até 24 horas, principalmente sobre oportunidades profissionais
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg mb-4">
                <LucideIcons.MessageCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Contexto Claro</h3>
              <p className="text-gray-600 text-sm">
                Mencione como me encontrou e o que despertou seu interesse. Adoro saber sobre o contexto
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg mb-4">
                <LucideIcons.Coffee className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Conversa Casual</h3>
              <p className="text-gray-600 text-sm">
                Sou bem acessível e gosto de conversas descontraídas. Pode ser direto e informal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Vamos nos conectar?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Estou sempre interessado em conhecer pessoas da área e explorar oportunidades
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              <a href={`mailto:${perfilPessoal.contato.email}?subject=Oportunidade Profissional&body=Olá Marcos,%0D%0A%0D%0AConheci seu portfólio e gostaria de conversar sobre...`}>
                <LucideIcons.Mail className="mr-2 h-5 w-5" />
                Enviar Email
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-purple-600 hover:bg-white hover:text-purple-600">
              <a href={perfilPessoal.contato.linkedin} target="_blank" rel="noopener noreferrer">
                <LucideIcons.Linkedin className="mr-2 h-5 w-5" />
                Conectar no LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContatoPage