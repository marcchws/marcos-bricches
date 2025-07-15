// components/cases/FiltrosCases.tsx
'use client'

import React, { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import * as LucideIcons from 'lucide-react'
import { FiltrosCases } from '@/types'
import { obterTecnologiasUnicas } from '@/data/cases'

interface FiltrosCasesProps {
  filtros: FiltrosCases
  onFiltrosChange: (novosFiltros: FiltrosCases) => void
  totalCases: number
  casesEncontrados: number
}

const FiltrosCasesComponent: React.FC<FiltrosCasesProps> = ({
  filtros,
  onFiltrosChange,
  totalCases,
  casesEncontrados
}) => {
  const [filtrosAbertos, setFiltrosAbertos] = useState(false)
  const tecnologiasDisponiveis = obterTecnologiasUnicas()

  const handleFiltroChange = useCallback((campo: keyof FiltrosCases, valor: any) => {
    onFiltrosChange({
      ...filtros,
      [campo]: valor
    })
  }, [filtros, onFiltrosChange])

  const handleTecnologiaToggle = useCallback((tecnologia: string) => {
    const novasTecnologias = filtros.tecnologias.includes(tecnologia)
      ? filtros.tecnologias.filter(t => t !== tecnologia)
      : [...filtros.tecnologias, tecnologia]
    
    handleFiltroChange('tecnologias', novasTecnologias)
  }, [filtros.tecnologias, handleFiltroChange])

  const limparFiltros = useCallback(() => {
    onFiltrosChange({
      tipo: 'todos',
      complexidade: 'todas',
      categoria: 'todas',
      tecnologias: [],
      tempoDesenvolvimento: 'todos',
      busca: '',
      destaque: false
    })
  }, [onFiltrosChange])

  const temFiltrosAtivos = filtros.tipo !== 'todos' || 
    filtros.complexidade !== 'todas' || 
    filtros.categoria !== 'todas' || 
    filtros.tempoDesenvolvimento !== 'todos' || 
    filtros.tecnologias.length > 0 || 
    filtros.busca !== '' || 
    filtros.destaque

  return (
    <div className="space-y-4">
      {/* Header com busca e toggle mobile */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1">
          <LucideIcons.Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar cases..."
            value={filtros.busca}
            onChange={(e) => handleFiltroChange('busca', e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            {casesEncontrados} de {totalCases} cases
          </Badge>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFiltrosAbertos(!filtrosAbertos)}
          >
            {filtrosAbertos ? (
              <>
                <LucideIcons.ChevronUp className="h-4 w-4 mr-2" />
                Ocultar Filtros
              </>
            ) : (
              <>
                <LucideIcons.Filter className="h-4 w-4 mr-2" />
                Mostrar Filtros
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <div className={filtrosAbertos ? 'block' : 'hidden'}>
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Filtros</CardTitle>
              {temFiltrosAtivos && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={limparFiltros}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <LucideIcons.X className="h-4 w-4 mr-1" />
                  Limpar
                </Button>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Filtros básicos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="tipo">Tipo</Label>
                <Select value={filtros.tipo} onValueChange={(valor) => handleFiltroChange('tipo', valor)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os Tipos</SelectItem>
                    <SelectItem value="gerado">Gerado</SelectItem>
                    <SelectItem value="produto-completo">Produto Completo</SelectItem>
                    <SelectItem value="meta-case">Meta Case</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="complexidade">Complexidade</Label>
                <Select value={filtros.complexidade} onValueChange={(valor) => handleFiltroChange('complexidade', valor)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Complexidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    <SelectItem value="basico">Básico</SelectItem>
                    <SelectItem value="medio">Médio</SelectItem>
                    <SelectItem value="avançado">Avançado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="categoria">Categoria</Label>
                <Select value={filtros.categoria} onValueChange={(valor) => handleFiltroChange('categoria', valor)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    <SelectItem value="Dashboard">Dashboard</SelectItem>
                    <SelectItem value="Mobile">Mobile</SelectItem>
                    <SelectItem value="E-commerce">E-commerce</SelectItem>
                    <SelectItem value="SaaS">SaaS</SelectItem>
                    <SelectItem value="FinTech">FinTech</SelectItem>
                    <SelectItem value="Workflow">Workflow</SelectItem>
                    <SelectItem value="CRM">CRM</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tempo">Tempo de Desenvolvimento</Label>
                <Select value={filtros.tempoDesenvolvimento} onValueChange={(valor) => handleFiltroChange('tempoDesenvolvimento', valor)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tempo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="<10min">Menos de 10min</SelectItem>
                    <SelectItem value="10-30min">10 - 30min</SelectItem>
                    <SelectItem value="30min-2h">30min - 2h</SelectItem>
                    <SelectItem value="2h-6h">2h - 6h</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Checkbox destaque */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="destaque"
                checked={filtros.destaque}
                onCheckedChange={(checked) => handleFiltroChange('destaque', checked)}
              />
              <Label htmlFor="destaque" className="text-sm font-medium">
                Apenas cases em destaque
              </Label>
            </div>

            {/* Tecnologias */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Tecnologias</Label>
              <div className="flex flex-wrap gap-2">
                {tecnologiasDisponiveis.map((tecnologia) => (
                  <Badge
                    key={tecnologia}
                    variant={filtros.tecnologias.includes(tecnologia) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleTecnologiaToggle(tecnologia)}
                  >
                    {tecnologia}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default FiltrosCasesComponent