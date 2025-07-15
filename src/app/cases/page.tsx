// app/cases/page.tsx
'use client'

import React, { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import * as LucideIcons from 'lucide-react'
import FiltrosCasesComponent from '@/components/cases/FiltrosCases'
import CaseCard from '@/components/cases/CaseCard'
import { cases, filtrarCases } from '@/data/cases'
import { FiltrosCases } from '@/types'

const CasesPage = () => {
  const [filtros, setFiltros] = useState<FiltrosCases>({
    tipo: 'todos',
    complexidade: 'todas',
    categoria: 'todas',
    tecnologias: [],
    tempoDesenvolvimento: 'todos',
    busca: '',
    destaque: false
  })

  const [visualizacao, setVisualizacao] = useState<'grid' | 'lista'>('grid')

  const casesFiltrados = useMemo(() => {
    return filtrarCases(cases, filtros)
  }, [filtros])

  const casesOrdenados = useMemo(() => {
    return [...casesFiltrados].sort((a, b) => {
      // Casos em destaque primeiro
      if (a.destaque && !b.destaque) return -1
      if (!a.destaque && b.destaque) return 1
      
      // Depois por data de criação (mais recente primeiro)
      return new Date(b.data_criacao).getTime() - new Date(a.data_criacao).getTime()
    })
  }, [casesFiltrados])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-purple-600/10 to-blue-600/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Cases de{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Product Design
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Explore exemplos práticos da metodologia Product Design AI-Enhanced. 
              Cada case demonstra como acelerar entregas mantendo alta qualidade.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1">
                {cases.length} Cases Disponíveis
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                {cases.filter(c => c.destaque).length} Cases em Destaque
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                Tempo médio: &lt; 6 horas
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filtros */}
          <div className="mb-8">
            <FiltrosCasesComponent
              filtros={filtros}
              onFiltrosChange={setFiltros}
              totalCases={cases.length}
              casesEncontrados={casesFiltrados.length}
            />
          </div>

          {/* Controles de Visualização */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Visualização:</span>
              <div className="flex items-center gap-1 border rounded-lg p-1">
                <Button
                  variant={visualizacao === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setVisualizacao('grid')}
                >
                  <LucideIcons.Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={visualizacao === 'lista' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setVisualizacao('lista')}
                >
                  <LucideIcons.List className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              {casesOrdenados.length} {casesOrdenados.length === 1 ? 'case encontrado' : 'cases encontrados'}
            </div>
          </div>

          {/* Lista de Cases */}
          {casesOrdenados.length > 0 ? (
            <div className={
              visualizacao === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'grid grid-cols-1 lg:grid-cols-2 gap-6'
            }>
              {casesOrdenados.map((caso) => (
                <CaseCard key={caso.id} caso={caso} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <LucideIcons.Search className="h-16 w-16 text-gray-300 mx-auto mb-6" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Nenhum case encontrado
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                Nenhum case corresponde aos filtros aplicados. 
                Tente ajustar os critérios de busca.
              </p>
              <Button 
                onClick={() => setFiltros({
                  tipo: 'todos',
                  complexidade: 'todas',
                  categoria: 'todas',
                  tecnologias: [],
                  tempoDesenvolvimento: 'todos',
                  busca: '',
                  destaque: false
                })}
                variant="outline"
              >
                <LucideIcons.RefreshCw className="mr-2 h-4 w-4" />
                Limpar Filtros
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default CasesPage