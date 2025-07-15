'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import * as LucideIcons from 'lucide-react'
import Link from 'next/link'
import InventoryManagementPreview from '@/components/cases/InventoryManagementPreview'

const InventoryManagementPage = () => {
  const etapasImplementacao = [
    {
      numero: 1,
      titulo: "Modelagem de Dados e Setup",
      tempo: "8 min",
      descricao: "Definição da estrutura de dados para produtos, movimentações e fornecedores",
      detalhes: [
        "Contexto: Sistema para controle de estoque de empresas de pequeno e médio porte",
        "Problema: Necessidade de visibilidade sobre níveis de estoque e movimentações",
        "Objetivos: Controle preciso, alertas automáticos e relatórios de movimentação",
        "Estrutura: Produtos, fornecedores, movimentações e configurações de alerta"
      ],
      resultado: "Base de dados robusta com relacionamentos bem definidos"
    },
    {
      numero: 2,
      titulo: "Dashboard e Visão Geral",
      tempo: "12 min",
      descricao: "Interface principal com métricas em tempo real e alertas visuais",
      detalhes: [
        "Dashboard responsivo: Cards com métricas principais de estoque",
        "Alertas visuais: Produtos com baixo estoque em destaque",
        "Gráficos de movimento: Visualização de entradas e saídas",
        "Busca inteligente: Filtros por categoria, fornecedor e status"
      ],
      resultado: "Dashboard intuitivo com visibilidade completa do estoque"
    },
    {
      numero: 3,
      titulo: "Gestão de Produtos",
      tempo: "10 min",
      descricao: "CRUD completo para produtos com categorização e configuração de alertas",
      detalhes: [
        "Cadastro de produtos: Formulário com validações e campos essenciais",
        "Categorização: Sistema de categorias para organização",
        "Níveis de estoque: Configuração de estoque mínimo e máximo",
        "Código de barras: Geração e leitura para agilizar processos"
      ],
      resultado: "Sistema completo de gestão de produtos com alertas configuráveis"
    },
    {
      numero: 4,
      titulo: "Controle de Movimentações",
      tempo: "15 min",
      descricao: "Sistema para registrar entradas, saídas e transferências de estoque",
      detalhes: [
        "Entrada de estoque: Registro de compras e devoluções",
        "Saída de estoque: Vendas, transferências e ajustes",
        "Histórico completo: Timeline de todas as movimentações",
        "Validações: Controles para evitar estoque negativo"
      ],
      resultado: "Controle preciso de movimentações com histórico detalhado"
    },
    {
      numero: 5,
      titulo: "Relatórios e Analytics",
      tempo: "8 min",
      descricao: "Geração de relatórios automáticos e análises de desempenho",
      detalhes: [
        "Relatórios automáticos: Movimentação, giro de estoque e produtos críticos",
        "Análise de tendências: Gráficos de consumo e sazonalidade",
        "Exportação: PDF e Excel para análises externas",
        "Alertas por email: Notificações automáticas para gestores"
      ],
      resultado: "Sistema de relatórios completo para tomada de decisões"
    }
  ]

  const metricas = [
    { label: "Tempo de Desenvolvimento", valor: "25min", icone: "Clock", cor: "text-amber-600" },
    { label: "Produtos Gerenciados", valor: "500+", icone: "Package", cor: "text-yellow-600" },
    { label: "Redução de Faltas", valor: "85%", icone: "TrendingUp", cor: "text-amber-600" },
    { label: "Complexidade", valor: "Médio", icone: "BarChart3", cor: "text-yellow-600" }
  ]

  const tecnologiasUtilizadas = [
    {
      nome: "React + TypeScript",
      justificativa: "Base sólida para um sistema que requer precisão de dados e interface responsiva",
      beneficios: ["Type safety para dados críticos", "Componentes reutilizáveis", "Manutenibilidade alta"]
    },
    {
      nome: "Node.js + Express",
      justificativa: "Backend robusto para APIs de movimentação e relatórios com performance otimizada",
      beneficios: ["APIs RESTful", "Processamento assíncrono", "Escalabilidade horizontal"]
    },
    {
      nome: "MySQL Database",
      justificativa: "Banco relacional para garantir consistência de dados financeiros e de estoque",
      beneficios: ["ACID compliance", "Relatórios complexos", "Backup e recuperação"]
    },
    {
      nome: "Chart.js + D3.js",
      justificativa: "Visualizações interativas para relatórios e dashboards analíticos",
      beneficios: ["Gráficos responsivos", "Interatividade avançada", "Exportação de dados"]
    }
  ]

  const funcionalidadesDetalhadas = [
    {
      titulo: "Controle de Entrada/Saída",
      descricao: "Registro preciso de todas as movimentações de estoque",
      metricas: ["Entradas por compra", "Saídas por venda", "Transferências", "Ajustes de inventário"],
      icone: "ArrowUpDown"
    },
    {
      titulo: "Alertas de Baixo Estoque",
      descricao: "Sistema inteligente de notificações automáticas",
      metricas: ["Níveis configuráveis", "Notificações email", "Dashboard visual", "Histórico de alertas"],
      icone: "AlertTriangle"
    },
    {
      titulo: "Relatórios de Movimento",
      descricao: "Análises detalhadas de movimentação e performance",
      metricas: ["Giro de estoque", "Produtos mais vendidos", "Análise ABC", "Tendências sazonais"],
      icone: "FileText"
    },
    {
      titulo: "Código de Barras",
      descricao: "Integração com leitores para agilizar processos",
      metricas: ["Geração automática", "Leitura por câmera", "Integração mobile", "Impressão em lote"],
      icone: "Scan"
    },
    {
      titulo: "Gestão de Fornecedores",
      descricao: "Cadastro e controle de fornecedores e compras",
      metricas: ["Cadastro completo", "Histórico de compras", "Avaliação performance", "Contatos integrados"],
      icone: "Truck"
    },
    {
      titulo: "Dashboard Analytics",
      descricao: "Visão gerencial com métricas em tempo real",
      metricas: ["KPIs principais", "Gráficos interativos", "Filtros avançados", "Exportação de dados"],
      icone: "BarChart3"
    }
  ]

  const resultadosAlcancados = [
    {
      categoria: "Eficiência Operacional",
      metricas: [
        { nome: "Redução de faltas", valor: "85%", status: "excelente" },
        { nome: "Tempo de contagem", valor: "-60%", status: "otimizado" },
        { nome: "Acuracidade estoque", valor: "98%", status: "preciso" }
      ]
    },
    {
      categoria: "Performance Técnica",
      metricas: [
        { nome: "Tempo de resposta", valor: "< 200ms", status: "rápido" },
        { nome: "Disponibilidade", valor: "99.9%", status: "confiável" },
        { nome: "Processamento batch", valor: "1000/min", status: "escalável" }
      ]
    },
    {
      categoria: "Impacto no Negócio",
      metricas: [
        { nome: "ROI em 6 meses", valor: "320%", status: "excelente" },
        { nome: "Redução de custos", valor: "40%", status: "significativo" },
        { nome: "Satisfação usuários", valor: "9.2/10", status: "alto" }
      ]
    }
  ]

  const exemplosDados = [
    { funcionalidade: "Registro entrada", tempo: "30 segundos", uso: "95%", feedback: "Muito rápido" },
    { funcionalidade: "Consulta estoque", tempo: "2 segundos", uso: "98%", feedback: "Instantâneo" },
    { funcionalidade: "Geração relatório", tempo: "5 segundos", uso: "78%", feedback: "Eficiente" },
    { funcionalidade: "Configurar alerta", tempo: "1 minuto", uso: "85%", feedback: "Intuitivo" }
  ]

  // Componente para renderizar ícones dinamicamente
  const IconeComponente = ({ nome, className }: { nome: string, className?: string }) => {
    const IconeElemento = (LucideIcons as any)[nome]
    return IconeElemento ? <IconeElemento className={className} /> : <LucideIcons.Circle className={className} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-amber-600/10 to-yellow-600/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center gap-2 mb-4">
              <Badge className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white">
                Inventory Management
              </Badge>
              <Badge className="bg-orange-100 text-orange-800" variant="outline">
                Workflow
              </Badge>
              <Badge className="bg-blue-100 text-blue-800" variant="outline">
                Médio
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Sistema de Gestão de Estoque
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Sistema completo para controle de estoque com alertas automáticos, relatórios detalhados e integração com código de barras. 
              Desenvolvido em 53 minutos usando a metodologia Product Design AI-Enhanced.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.Clock className="h-4 w-4" />
                <span>25min desenvolvimento</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.Package className="h-4 w-4" />
                <span>500+ produtos gerenciados</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <LucideIcons.TrendingUp className="h-4 w-4" />
                <span>85% redução de faltas</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-amber-600 to-yellow-600">
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
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-600 to-yellow-600 rounded-lg mb-3">
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
      <section className="py-16 bg-gradient-to-br from-amber-50 to-yellow-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Funcionalidades Principais
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Recursos completos para gestão eficiente de estoque e controle de movimentações
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
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-600 to-yellow-600 rounded-lg mb-4">
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
                            <LucideIcons.CheckCircle className="h-3 w-3 text-amber-500" />
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
              Explore o sistema de gestão de estoque. Adicione produtos, registre movimentações e configure alertas.
            </p>
          </div>
          
          <div className="flex justify-center">
            <InventoryManagementPreview />
          </div>
          
          <div className="text-center mt-8">
            <div className="grid md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-amber-100 rounded-lg mb-2">
                  <LucideIcons.ArrowUpDown className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Movimentações</h3>
                <p className="text-xs text-gray-600">
                  Entrada e saída
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg mb-2">
                  <LucideIcons.AlertTriangle className="h-5 w-5 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Alertas</h3>
                <p className="text-xs text-gray-600">
                  Baixo estoque
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg mb-2">
                  <LucideIcons.FileText className="h-5 w-5 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Relatórios</h3>
                <p className="text-xs text-gray-600">
                  Analytics detalhado
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-amber-100 rounded-lg mb-2">
                  <LucideIcons.Scan className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Código Barras</h3>
                <p className="text-xs text-gray-600">
                  Agilidade operacional
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
              Metodologia Product Design AI-Enhanced aplicada para desenvolvimento acelerado
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
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-yellow-600 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
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
                                    <LucideIcons.CheckCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                    {detalhe}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Resultado obtido:</h4>
                              <p className="text-sm text-gray-600 bg-amber-50 p-3 rounded-lg">
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
                              <LucideIcons.CheckCircle className="h-4 w-4 text-amber-500" />
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
                                metrica.status === 'otimizado' ? 'secondary' :
                                metrica.status === 'preciso' ? 'default' :
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
                      <div key={index} className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                        <div>
                          <h4 className="font-medium">{item.funcionalidade}</h4>
                          <p className="text-sm text-gray-600">Tempo médio: {item.tempo}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{item.uso} dos usuários</div>
                          <div className="text-sm text-amber-600">{item.feedback}</div>
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
      <section className="py-16 bg-gradient-to-r from-amber-600 to-yellow-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Precisa de um Sistema de Estoque Personalizado?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Veja como a metodologia Product Design AI-Enhanced pode acelerar seu projeto de gestão
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-amber-600 hover:bg-amber-50">
              <Link href="/contato">
                <LucideIcons.MessageCircle className="mr-2 h-5 w-5" />
                Falar Sobre Seu Projeto
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-amber-600">
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

export default InventoryManagementPage 