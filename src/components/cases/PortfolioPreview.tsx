// components/cases/PortfolioPreview.tsx
'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import * as LucideIcons from 'lucide-react'

interface PreviewCase {
  id: string
  titulo: string
  categoria: string
  complexidade: string
  tempo: string
  tecnologias: string[]
  cor: string
}

const PortfolioPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'cases' | 'metodologia'>('home')
  const [filtros, setFiltros] = useState({
    termo: '',
    categoria: 'todas',
    complexidade: 'todas'
  })
  const [loading, setLoading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const previewCases: PreviewCase[] = [
    {
      id: '1',
      titulo: 'Dashboard de Vendas SaaS',
      categoria: 'Dashboard',
      complexidade: 'avançado',
      tempo: '2h-6h',
      tecnologias: ['React', 'TypeScript', 'Chart.js'],
      cor: 'from-green-600 to-emerald-600'
    },
    {
      id: '2',
      titulo: 'App de Delivery Mobile',
      categoria: 'Mobile',
      complexidade: 'avançado',
      tempo: '>6h',
      tecnologias: ['React Native', 'TypeScript', 'Expo'],
      cor: 'from-orange-600 to-red-600'
    },
    {
      id: '3',
      titulo: 'Sistema de Aprovações',
      categoria: 'Workflow',
      complexidade: 'medio',
      tempo: '30min-2h',
      tecnologias: ['Next.js', 'TypeScript', 'Tailwind'],
      cor: 'from-yellow-600 to-orange-600'
    },
    {
      id: '4',
      titulo: 'Gerenciador de Tarefas',
      categoria: 'Workflow',
      complexidade: 'basico',
      tempo: '<30min',
      tecnologias: ['React', 'TypeScript'],
      cor: 'from-slate-600 to-gray-600'
    }
  ]

  const filteredCases = previewCases.filter(caso => {
    const matchTermo = !filtros.termo || caso.titulo.toLowerCase().includes(filtros.termo.toLowerCase())
    const matchCategoria = filtros.categoria === 'todas' || caso.categoria === filtros.categoria
    const matchComplexidade = filtros.complexidade === 'todas' || caso.complexidade === filtros.complexidade
    return matchTermo && matchCategoria && matchComplexidade
  })

  const handleFilterChange = (key: string, value: string) => {
    setLoading(true)
    setTimeout(() => {
      setFiltros(prev => ({ ...prev, [key]: value }))
      setLoading(false)
    }, 500)
  }

  const PreviewNavigation = () => (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">MB</span>
            </div>
            <span className="font-semibold text-gray-900 text-sm">Marcos Bricches</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {['home', 'cases', 'metodologia'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`text-xs font-medium transition-colors ${
                  activeTab === tab 
                    ? 'text-purple-600 border-b-2 border-purple-600 pb-1' 
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                {tab === 'home' && 'Início'}
                {tab === 'cases' && 'Cases'}
                {tab === 'metodologia' && 'Metodologia'}
              </button>
            ))}
            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 text-xs">
              Contato
            </Button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 rounded-md text-gray-700 hover:text-purple-600"
          >
            {mobileMenuOpen ? (
              <LucideIcons.X className="h-4 w-4" />
            ) : (
              <LucideIcons.Menu className="h-4 w-4" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-2 border-t border-gray-200">
            {['home', 'cases', 'metodologia'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab as any)
                  setMobileMenuOpen(false)
                }}
                className={`block w-full text-left py-1 text-xs font-medium transition-colors ${
                  activeTab === tab ? 'text-purple-600' : 'text-gray-700'
                }`}
              >
                {tab === 'home' && 'Início'}
                {tab === 'cases' && 'Cases'}
                {tab === 'metodologia' && 'Metodologia'}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )

  const PreviewHome = () => (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div className="text-center py-8 bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-lg mb-6">
          <Badge className="mb-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs">
            Product Design AI-Enhanced
          </Badge>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Designer que{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              otimiza processos
            </span>
            <br />
            com IA e código
          </h1>
          <p className="text-sm text-gray-600 mb-4 max-w-2xl mx-auto">
            Criador da metodologia Product Design AI-Enhanced. Acelero entregas, 
            melhoro qualidade e inovo processos.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-purple-600 to-blue-600"
              onClick={() => setActiveTab('cases')}
            >
              <LucideIcons.Eye className="mr-1 h-3 w-3" />
              Ver Cases
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setActiveTab('metodologia')}
            >
              <LucideIcons.BookOpen className="mr-1 h-3 w-3" />
              Conhecer Metodologia
            </Button>
          </div>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { valor: "85%", label: "Redução de retrabalho", icone: "TrendingDown" },
            { valor: "3x", label: "Velocidade de entrega", icone: "Zap" },
            { valor: "90%", label: "Aprovação na 1ª apresentação", icone: "CheckCircle" },
            { valor: "<6h", label: "Tempo médio", icone: "Clock" }
          ].map((metrica, index) => {
            const IconeComponente = LucideIcons[metrica.icone as keyof typeof LucideIcons] as any
            return (
              <Card key={index} className="text-center">
                <CardContent className="pt-3 pb-3">
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg mb-2">
                    <IconeComponente className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-lg font-bold text-gray-900 mb-1">
                    {metrica.valor}
                  </div>
                  <p className="text-xs text-gray-600">
                    {metrica.label}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Diferenciais */}
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              titulo: "Metodologia AI-Enhanced",
              descricao: "Framework proprietário que combina design thinking com IA",
              icone: "Brain"
            },
            {
              titulo: "Código + Design",
              descricao: "Prototipagem funcional em Next.js/TypeScript",
              icone: "Code"
            }
          ].map((diferencial, index) => {
            const IconeComponente = LucideIcons[diferencial.icone as keyof typeof LucideIcons] as any
            return (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
                      <IconeComponente className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">
                        {diferencial.titulo}
                      </h3>
                      <p className="text-xs text-gray-600">
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
    </div>
  )

  const PreviewCases = () => (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center py-6 bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-lg mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Cases de{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Product Design
            </span>
          </h1>
          <p className="text-sm text-gray-600 mb-4">
            Explore exemplos práticos da metodologia Product Design AI-Enhanced
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs">
              15 Cases Disponíveis
            </Badge>
            <Badge variant="outline" className="text-xs">
              6 Cases em Destaque
            </Badge>
          </div>
        </div>

        {/* Filtros */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="relative">
                <LucideIcons.Search className="absolute left-2 top-2 h-3 w-3 text-gray-400" />
                <Input
                  placeholder="Buscar cases..."
                  value={filtros.termo}
                  onChange={(e) => handleFilterChange('termo', e.target.value)}
                  className="pl-7 text-xs"
                />
              </div>
              
              <Select value={filtros.categoria} onValueChange={(valor) => handleFilterChange('categoria', valor)}>
                <SelectTrigger className="text-xs">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as Categorias</SelectItem>
                  <SelectItem value="Dashboard">Dashboard</SelectItem>
                  <SelectItem value="Mobile">Mobile</SelectItem>
                  <SelectItem value="Workflow">Workflow</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filtros.complexidade} onValueChange={(valor) => handleFilterChange('complexidade', valor)}>
                <SelectTrigger className="text-xs">
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
          </CardContent>
        </Card>

        {/* Cases Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex gap-2">
                      <div className="h-4 w-16 bg-gray-200 rounded"></div>
                      <div className="h-4 w-12 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-16 bg-gray-200 rounded mb-3"></div>
                  <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCases.map((caso) => (
              <Card key={caso.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        {caso.categoria}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          caso.complexidade === 'basico' ? 'bg-green-100 text-green-800' :
                          caso.complexidade === 'medio' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        {caso.complexidade}
                      </Badge>
                    </div>
                  </div>
                  
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    {caso.titulo}
                  </h3>
                  
                  <div className={`h-16 rounded-lg bg-gradient-to-br ${caso.cor} mb-3 flex items-center justify-center`}>
                    <div className="text-white text-center">
                      <LucideIcons.Monitor className="h-6 w-6 mx-auto mb-1 opacity-60" />
                      <p className="text-xs opacity-80">Preview</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <LucideIcons.Clock className="h-3 w-3" />
                      {caso.tempo}
                    </div>
                    <div className="flex items-center gap-1">
                      <LucideIcons.Code className="h-3 w-3" />
                      {caso.tecnologias.length} techs
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {caso.tecnologias.slice(0, 2).map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {caso.tecnologias.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{caso.tecnologias.length - 2}
                      </Badge>
                    )}
                  </div>
                  
                  <Button size="sm" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-xs">
                    Ver Detalhes
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredCases.length === 0 && !loading && (
          <div className="text-center py-8">
            <LucideIcons.Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Nenhum case encontrado
            </h3>
            <p className="text-xs text-gray-600 mb-4">
              Nenhum case corresponde aos filtros aplicados
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setFiltros({ termo: '', categoria: 'todas', complexidade: 'todas' })}
            >
              <LucideIcons.RefreshCw className="mr-1 h-3 w-3" />
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  )

  const PreviewMetodologia = () => (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center py-6 bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-lg mb-6">
          <Badge className="mb-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs">
            Metodologia Proprietária
          </Badge>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Product Design{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI-Enhanced
            </span>
          </h1>
          <p className="text-sm text-gray-600 mb-4">
            Metodologia sistemática que combina análise inteligente com implementação robusta
          </p>
        </div>

        {/* Etapas */}
        <div className="space-y-4">
          {[
            { numero: 1, titulo: "Análise Multicamada", tempo: "30-45 min", icone: "Search" },
            { numero: 2, titulo: "Inteligência de Requisitos", tempo: "15-20 min", icone: "Brain" },
            { numero: 3, titulo: "Arquitetura de Interface", tempo: "20-30 min", icone: "Building" },
            { numero: 4, titulo: "Mapeamento de Estados", tempo: "25-35 min", icone: "GitBranch" },
            { numero: 5, titulo: "Implementação Defensiva", tempo: "60-120 min", icone: "Code" },
            { numero: 6, titulo: "Validação de Qualidade", tempo: "10-15 min", icone: "CheckCircle" }
          ].map((etapa, index) => {
            const IconeComponente = LucideIcons[etapa.icone as keyof typeof LucideIcons] as any
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      {etapa.numero}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-semibold text-gray-900">
                          {etapa.titulo}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {etapa.tempo}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <IconeComponente className="h-3 w-3" />
                        <span>Automatizado com IA</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Benefícios */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {[
            { titulo: "85%", descricao: "Redução de retrabalho", icone: "TrendingDown" },
            { titulo: "3x", descricao: "Velocidade de entrega", icone: "Zap" },
            { titulo: "90%", descricao: "Aprovação primeira vez", icone: "Target" },
            { titulo: "0", descricao: "Edge cases", icone: "Shield" }
          ].map((beneficio, index) => {
            const IconeComponente = LucideIcons[beneficio.icone as keyof typeof LucideIcons] as any
            return (
              <Card key={index} className="text-center">
                <CardContent className="pt-3 pb-3">
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg mb-2">
                    <IconeComponente className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-lg font-bold text-gray-900 mb-1">
                    {beneficio.titulo}
                  </div>
                  <p className="text-xs text-gray-600">
                    {beneficio.descricao}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <PreviewNavigation />
      <div className="h-96 overflow-y-auto">
        {activeTab === 'home' && <PreviewHome />}
        {activeTab === 'cases' && <PreviewCases />}
        {activeTab === 'metodologia' && <PreviewMetodologia />}
      </div>
      
      {/* Indicador de interatividade */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 text-center">
        <div className="flex items-center justify-center gap-2 text-xs">
          <LucideIcons.MousePointer className="h-3 w-3" />
          <span>Preview interativo • Navegue pelas abas para explorar</span>
        </div>
      </div>
    </div>
  )
}

export default PortfolioPreview