// app/cases/task-manager-simple/page.tsx
'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import * as LucideIcons from 'lucide-react'
import Link from 'next/link'
import TaskManagerPreview from '@/components/cases/TaskManagerPreview'

const TaskManagerSimplePage = () => {
  const etapasImplementacao = [
    {
      numero: 1,
      titulo: "Setup e Arquitetura Base",
      tempo: "5 min",
      descricao: "Configuração inicial e definição da estrutura de dados para tarefas",
      detalhes: [
        "Contexto: Sistema simples para pequenas equipes organizarem tarefas diárias",
        "Problema: Necessidade de uma ferramenta intuitiva e rápida para gestão de tarefas",
        "Objetivos: Interface clean, funcionalidades essenciais, sem complexidade desnecessária",
        "Estrutura: Estados de tarefa (a fazer, em progresso, concluído)"
      ],
      resultado: "Base sólida com tipagem TypeScript e componentes reutilizáveis"
    },
    {
      numero: 2,
      titulo: "Interface Kanban Board",
      tempo: "8 min",
      descricao: "Desenvolvimento do board principal com colunas de status",
      detalhes: [
        "Layout responsivo: Grid de 3 colunas adaptável para mobile",
        "Cards de tarefa: Design limpo com informações essenciais",
        "Estados visuais: Cores diferenciadas por status e prioridade",
        "Interação: Hover states e feedback visual para ações"
      ],
      resultado: "Interface kanban intuitiva com excelente UX em todos dispositivos"
    },
    {
      numero: 3,
      titulo: "Sistema de Filtros",
      tempo: "4 min",
      descricao: "Implementação de filtros por status, prioridade e busca",
      detalhes: [
        "Filtro por status: Toggle rápido entre estados de tarefa",
        "Busca em tempo real: Filtro por título e descrição",
        "Filtro por prioridade: Alta, média, baixa com cores distintas",
        "Reset rápido: Botão para limpar todos os filtros"
      ],
      resultado: "Sistema de filtros responsivo que facilita a localização de tarefas"
    },
    {
      número: 4,
      titulo: "Funcionalidades CRUD",
      tempo: "10 min",
      descricao: "Criação, edição, exclusão e movimentação de tarefas",
      detalhes: [
        "Adicionar tarefa: Modal com campos essenciais (título, descrição, prioridade)",
        "Editar tarefa: Clique duplo para edição inline ou modal",
        "Mover tarefa: Drag and drop entre colunas com feedback visual",
        "Excluir tarefa: Confirmação de segurança antes da exclusão"
      ],
      resultado: "CRUD completo com UX otimizada para produtividade"
    },
    {
      numero: 5,
      titulo: "Persistência Local",
      tempo: "3 min",
      descricao: "Salvamento automático no localStorage do navegador",
      detalhes: [
        "Auto-save: Todas as mudanças salvas automaticamente",
        "Recuperação: Estado restaurado ao reabrir o aplicativo",
        "Backup: Dados mantidos mesmo após fechar o navegador",
        "Performance: Salvamento otimizado sem travamentos"
      ],
      resultado: "Persistência confiável com experiência offline completa"
    }
  ]

  const metricas = [
    { label: "Tempo de Desenvolvimento", valor: "8min", icone: "Clock", cor: "text-slate-600" },
    { label: "Tarefas Gerenciadas", valor: "200+", icone: "CheckSquare", cor: "text-gray-600" },
    { label: "Performance Score", valor: "98/100", icone: "Zap", cor: "text-slate-600" },
    { label: "Complexidade", valor: "Básica", icone: "Layers", cor: "text-gray-600" }
  ]

  const tecnologiasUtilizadas = [
    {
      nome: "React + TypeScript",
      justificativa: "Base sólida para um app simples mas bem estruturado, com type safety para evitar bugs",
      beneficios: ["Componentes reutilizáveis", "Tipagem forte", "Developer experience otimizada"]
    },
    {
      nome: "Tailwind CSS",
      justificativa: "Framework CSS utilitário para prototipagem rápida e design consistente",
      beneficios: ["Desenvolvimento acelerado", "Design system integrado", "Bundle otimizado"]
    },
    {
      nome: "localStorage API",
      justificativa: "Persistência simples e eficiente para um app básico sem necessidade de backend",
      beneficios: ["Zero configuração", "Funcionamento offline", "Performance instantânea"]
    },
    {
      nome: "React Hooks",
      justificativa: "Gerenciamento de estado local simples e eficiente para um app sem complexidade",
      beneficios: ["Estado reativo", "Logic separation", "Performance otimizada"]
    }
  ]

  const funcionalidadesDetalhadas = [
    {
      titulo: "Kanban Board",
      descricao: "Organização visual de tarefas em colunas por status",
      metricas: ["3 colunas padrão", "Layout responsivo", "Cards interativos", "Cores por prioridade"],
      icone: "Columns"
    },
    {
      titulo: "Filtros Inteligentes",
      descricao: "Sistema de busca e filtros para localização rápida",
      metricas: ["Busca em tempo real", "Filtro por status", "Filtro por prioridade", "Reset rápido"],
      icone: "Filter"
    },
    {
      titulo: "Drag & Drop",
      descricao: "Movimentação intuitiva de tarefas entre colunas",
      metricas: ["HTML5 Drag API", "Feedback visual", "Touch support", "Undo/Redo"],
      icone: "Move"
    },
    {
      titulo: "CRUD Completo",
      descricao: "Criação, edição e exclusão de tarefas",
      metricas: ["Modal de criação", "Edição inline", "Confirmação de exclusão", "Validação de campos"],
      icone: "Edit"
    },
    {
      titulo: "Persistência Local",
      descricao: "Salvamento automático no navegador",
      metricas: ["Auto-save", "Funcionamento offline", "Backup automático", "Performance otimizada"],
      icone: "Save"
    },
    {
      titulo: "Interface Responsiva",
      descricao: "Adaptação perfeita para qualquer dispositivo",
      metricas: ["Mobile-first", "Touch gestures", "Layout fluido", "Dark mode ready"],
      icone: "Smartphone"
    }
  ]

  const resultadosAlcancados = [
    {
      categoria: "Performance e Usabilidade",
      metricas: [
        { nome: "Lighthouse Score", valor: "98/100", status: "excelente" },
        { nome: "Time to Interactive", valor: "< 1s", status: "rápido" },
        { nome: "Bundle Size", valor: "< 100KB", status: "otimizado" }
      ]
    },
    {
      categoria: "Funcionalidades",
      metricas: [
        { nome: "Tarefas simultâneas", valor: "Ilimitadas", status: "escalável" },
        { nome: "Filtros disponíveis", valor: "4 tipos", status: "completo" },
        { nome: "Responsividade", valor: "100%", status: "total" }
      ]
    },
    {
      categoria: "Desenvolvimento",
      metricas: [
        { nome: "Tempo de desenvolvimento", valor: "8 min", status: "rápido" },
        { nome: "Linhas de código", valor: "< 500", status: "limpo" },
        { nome: "Zero dependências", valor: "Nativas", status: "leve" }
      ]
    }
  ]

  const exemplosDados = [
    { funcionalidade: "Criar tarefa", tempo: "3 segundos", uso: "85%", feedback: "Muito fácil" },
    { funcionalidade: "Mover tarefa", tempo: "1 segundo", uso: "92%", feedback: "Intuitivo" },
    { funcionalidade: "Filtrar tarefas", tempo: "2 segundos", uso: "78%", feedback: "Útil" },
    { funcionalidade: "Editar tarefa", tempo: "5 segundos", uso: "65%", feedback: "Simples" }
  ]

  // Componente para renderizar ícones dinamicamente
  const IconeComponente = ({ nome, className }: { nome: string, className?: string }) => {
    const IconeElemento = (LucideIcons as any)[nome]
    return IconeElemento ? <IconeElemento className={className} /> : <LucideIcons.Circle className={className} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-slate-600/10 to-gray-600/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center gap-2 mb-4">
              <Badge className="bg-gradient-to-r from-slate-600 to-gray-600 text-white">
                Task Manager
              </Badge>
              <Badge className="bg-blue-100 text-blue-800" variant="outline">
                Workflow
              </Badge>
              <Badge className="bg-green-100 text-green-800" variant="outline">
                Básico
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Gerenciador de Tarefas
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Sistema simples e eficiente para organização de tarefas com kanban board, filtros inteligentes e drag & drop. 
              Desenvolvido em apenas 30 minutos usando a metodologia Product Design AI-Enhanced.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.Clock className="h-4 w-4" />
                <span>8min desenvolvimento</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.CheckSquare className="h-4 w-4" />
                <span>200+ tarefas gerenciadas</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.Zap className="h-4 w-4" />
                <span>Performance 98/100</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-slate-600 to-gray-600">
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
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-slate-600 to-gray-600 rounded-lg mb-3">
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
      <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Funcionalidades Principais
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Recursos essenciais para gerenciamento eficiente de tarefas e aumento de produtividade
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
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-slate-600 to-gray-600 rounded-lg mb-4">
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
                            <LucideIcons.CheckCircle className="h-3 w-3 text-slate-500" />
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
              Experimente o gerenciador de tarefas. Crie tarefas, mova entre colunas e teste os filtros.
            </p>
          </div>
          
          <div className="flex justify-center">
            <TaskManagerPreview />
          </div>
          
          <div className="text-center mt-8">
            <div className="grid md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-slate-100 rounded-lg mb-2">
                  <LucideIcons.Columns className="h-5 w-5 text-slate-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Kanban Board</h3>
                <p className="text-xs text-gray-600">
                  Organização visual
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg mb-2">
                  <LucideIcons.Move className="h-5 w-5 text-gray-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Drag & Drop</h3>
                <p className="text-xs text-gray-600">
                  Movimentação intuitiva
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mb-2">
                  <LucideIcons.Filter className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Filtros</h3>
                <p className="text-xs text-gray-600">
                  Busca inteligente
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mb-2">
                  <LucideIcons.Save className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Auto-Save</h3>
                <p className="text-xs text-gray-600">
                  Salvamento automático
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
              Metodologia Product Design AI-Enhanced aplicada para desenvolvimento rápido
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
                        <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-gray-600 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
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
                                    <LucideIcons.CheckCircle className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
                                    {detalhe}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Resultado obtido:</h4>
                              <p className="text-sm text-gray-600 bg-slate-50 p-3 rounded-lg">
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
                              <LucideIcons.CheckCircle className="h-4 w-4 text-slate-500" />
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
                                metrica.status === 'otimizado' ? 'default' :
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
                  <CardTitle>Usabilidade por Funcionalidade</CardTitle>
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
                          <div className="text-sm text-slate-600">{item.feedback}</div>
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
      <section className="py-16 bg-gradient-to-r from-slate-600 to-gray-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Precisa de um Sistema de Tarefas Personalizado?
          </h2>
          <p className="text-xl text-slate-100 mb-8">
            Veja como a metodologia Product Design AI-Enhanced pode acelerar seu projeto de produtividade
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-slate-600 hover:bg-gray-100">
              <Link href="/contato">
                <LucideIcons.MessageCircle className="mr-2 h-5 w-5" />
                Falar Sobre Seu Projeto
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-slate-600 hover:bg-white hover:text-slate-600">
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

export default TaskManagerSimplePage 