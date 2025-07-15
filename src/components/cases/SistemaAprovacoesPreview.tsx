// components/cases/SistemaAprovacoesPreview.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { toast } from 'sonner'
import * as LucideIcons from 'lucide-react'

interface Solicitacao {
  id: string
  titulo: string
  tipo: 'ferias' | 'compra' | 'viagem' | 'contratacao'
  descricao: string
  valor?: number
  status: 'rascunho' | 'pendente' | 'em_analise' | 'aprovado' | 'rejeitado' | 'cancelado'
  solicitante: string
  data_criacao: string
  data_atualizacao: string
  etapa_atual: number
  total_etapas: number
  aprovadores: string[]
  comentarios: Comentario[]
  prioridade: 'baixa' | 'media' | 'alta'
}

interface Comentario {
  id: string
  autor: string
  texto: string
  data: string
  tipo: 'comentario' | 'aprovacao' | 'rejeicao'
}

const SistemaAprovacoesPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'solicitante' | 'aprovador' | 'dashboard'>('solicitante')
  const [usuario, setUsuario] = useState<'funcionario' | 'gestor' | 'admin'>('funcionario')
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([])
  const [loading, setLoading] = useState(false)
  const [modalSolicitacao, setModalSolicitacao] = useState<Solicitacao | null>(null)
  const [modalNova, setModalNova] = useState(false)
  const [filtros, setFiltros] = useState({
    status: 'todas',
    tipo: 'todos',
    prioridade: 'todas'
  })

  // Dados simulados
  const solicitacoesIniciais: Solicitacao[] = [
    {
      id: '1',
      titulo: 'Férias de Dezembro',
      tipo: 'ferias',
      descricao: 'Solicitação de 15 dias de férias para dezembro de 2024',
      status: 'pendente',
      solicitante: 'João Silva',
      data_criacao: '2024-01-15',
      data_atualizacao: '2024-01-15',
      etapa_atual: 1,
      total_etapas: 2,
      aprovadores: ['Maria Santos', 'Pedro Costa'],
      comentarios: [],
      prioridade: 'media'
    },
    {
      id: '2',
      titulo: 'Compra de Notebooks',
      tipo: 'compra',
      descricao: 'Aquisição de 5 notebooks Dell para equipe de desenvolvimento',
      valor: 25000,
      status: 'em_analise',
      solicitante: 'Ana Paula',
      data_criacao: '2024-01-12',
      data_atualizacao: '2024-01-14',
      etapa_atual: 2,
      total_etapas: 3,
      aprovadores: ['Carlos Lima', 'Roberto Ferreira', 'Diretoria'],
      comentarios: [
        {
          id: '1',
          autor: 'Carlos Lima',
          texto: 'Especificações aprovadas. Seguindo para análise financeira.',
          data: '2024-01-14',
          tipo: 'aprovacao'
        }
      ],
      prioridade: 'alta'
    },
    {
      id: '3',
      titulo: 'Viagem Técnica São Paulo',
      tipo: 'viagem',
      descricao: 'Participação em conferência de tecnologia',
      valor: 3500,
      status: 'aprovado',
      solicitante: 'Lucas Oliveira',
      data_criacao: '2024-01-08',
      data_atualizacao: '2024-01-10',
      etapa_atual: 2,
      total_etapas: 2,
      aprovadores: ['Maria Santos', 'Pedro Costa'],
      comentarios: [
        {
          id: '2',
          autor: 'Maria Santos',
          texto: 'Aprovado. Importante para desenvolvimento da equipe.',
          data: '2024-01-10',
          tipo: 'aprovacao'
        }
      ],
      prioridade: 'baixa'
    },
    {
      id: '4',
      titulo: 'Contratação Desenvolvedor Junior',
      tipo: 'contratacao',
      descricao: 'Contratação de desenvolvedor junior para projeto web',
      status: 'rejeitado',
      solicitante: 'Fernando Rocha',
      data_criacao: '2024-01-05',
      data_atualizacao: '2024-01-11',
      etapa_atual: 1,
      total_etapas: 2,
      aprovadores: ['Maria Santos', 'Pedro Costa'],
      comentarios: [
        {
          id: '3',
          autor: 'Maria Santos',
          texto: 'Aguardar aprovação de budget adicional para Q2.',
          data: '2024-01-11',
          tipo: 'rejeicao'
        }
      ],
      prioridade: 'media'
    }
  ]

  useEffect(() => {
    setSolicitacoes(solicitacoesIniciais)
  }, [])

  const solicitacoesFiltradas = solicitacoes.filter(sol => {
    const matchStatus = filtros.status === 'todas' || sol.status === filtros.status
    const matchTipo = filtros.tipo === 'todos' || sol.tipo === filtros.tipo
    const matchPrioridade = filtros.prioridade === 'todas' || sol.prioridade === filtros.prioridade
    
    if (activeTab === 'aprovador') {
      return matchStatus && matchTipo && matchPrioridade && 
             (sol.status === 'pendente' || sol.status === 'em_analise')
    }
    
    return matchStatus && matchTipo && matchPrioridade
  })

  const getStatusCor = (status: string) => {
    switch (status) {
      case 'rascunho': return 'bg-gray-100 text-gray-800'
      case 'pendente': return 'bg-yellow-100 text-yellow-800'
      case 'em_analise': return 'bg-blue-100 text-blue-800'
      case 'aprovado': return 'bg-green-100 text-green-800'
      case 'rejeitado': return 'bg-red-100 text-red-800'
      case 'cancelado': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPrioridadeCor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta': return 'text-red-600'
      case 'media': return 'text-yellow-600'
      case 'baixa': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'ferias': return 'Calendar'
      case 'compra': return 'ShoppingCart'
      case 'viagem': return 'Plane'
      case 'contratacao': return 'UserPlus'
      default: return 'FileText'
    }
  }

  const formatarMoeda = (valor: number | undefined) => {
    if (!valor) return ''
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor)
  }

  const aprovarSolicitacao = (solicitacao: Solicitacao) => {
    setLoading(true)
    setTimeout(() => {
      setSolicitacoes(prev => prev.map(sol => {
        if (sol.id === solicitacao.id) {
          const novoStatus = sol.etapa_atual === sol.total_etapas ? 'aprovado' : 'pendente'
          return {
            ...sol,
            status: novoStatus,
            etapa_atual: sol.etapa_atual + 1,
            data_atualizacao: new Date().toISOString().split('T')[0],
            comentarios: [
              ...sol.comentarios,
              {
                id: Date.now().toString(),
                autor: 'Gestor Atual',
                texto: `Aprovado na etapa ${sol.etapa_atual}/${sol.total_etapas}`,
                data: new Date().toISOString().split('T')[0],
                tipo: 'aprovacao'
              }
            ]
          }
        }
        return sol
      }))
      setLoading(false)
      toast.success('Solicitação aprovada com sucesso!')
      setModalSolicitacao(null)
    }, 1000)
  }

  const rejeitarSolicitacao = (solicitacao: Solicitacao, motivo: string) => {
    setLoading(true)
    setTimeout(() => {
      setSolicitacoes(prev => prev.map(sol => {
        if (sol.id === solicitacao.id) {
          return {
            ...sol,
            status: 'rejeitado',
            data_atualizacao: new Date().toISOString().split('T')[0],
            comentarios: [
              ...sol.comentarios,
              {
                id: Date.now().toString(),
                autor: 'Gestor Atual',
                texto: motivo || 'Solicitação rejeitada',
                data: new Date().toISOString().split('T')[0],
                tipo: 'rejeicao'
              }
            ]
          }
        }
        return sol
      }))
      setLoading(false)
      toast.error('Solicitação rejeitada')
      setModalSolicitacao(null)
    }, 1000)
  }

  const renderSolicitante = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Minhas Solicitações</h3>
        <Button onClick={() => setModalNova(true)} className="bg-gradient-to-r from-yellow-600 to-orange-600">
          <LucideIcons.Plus className="mr-2 h-4 w-4" />
          Nova Solicitação
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={filtros.status} onValueChange={(valor) => setFiltros(prev => ({ ...prev, status: valor }))}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todos os Status</SelectItem>
                <SelectItem value="rascunho">Rascunho</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="aprovado">Aprovado</SelectItem>
                <SelectItem value="rejeitado">Rejeitado</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filtros.tipo} onValueChange={(valor) => setFiltros(prev => ({ ...prev, tipo: valor }))}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Tipos</SelectItem>
                <SelectItem value="ferias">Férias</SelectItem>
                <SelectItem value="compra">Compra</SelectItem>
                <SelectItem value="viagem">Viagem</SelectItem>
                <SelectItem value="contratacao">Contratação</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filtros.prioridade} onValueChange={(valor) => setFiltros(prev => ({ ...prev, prioridade: valor }))}>
              <SelectTrigger>
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="alta">Alta</SelectItem>
                <SelectItem value="media">Média</SelectItem>
                <SelectItem value="baixa">Baixa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Solicitações */}
      <div className="space-y-4">
        {solicitacoesFiltradas.map((solicitacao) => {
          const IconeComponente = LucideIcons[getTipoIcon(solicitacao.tipo) as keyof typeof LucideIcons] as any
          return (
            <Card key={solicitacao.id} className="hover:shadow-md transition-shadow cursor-pointer" 
                  onClick={() => setModalSolicitacao(solicitacao)}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <IconeComponente className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{solicitacao.titulo}</h4>
                      <p className="text-sm text-gray-600 capitalize">{solicitacao.tipo.replace('_', ' ')}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Criado em {new Date(solicitacao.data_criacao).toLocaleDateString('pt-BR')}
                      </p>
                      {solicitacao.valor && (
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          {formatarMoeda(solicitacao.valor)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusCor(solicitacao.status)}>
                      {solicitacao.status.replace('_', ' ')}
                    </Badge>
                    <div className="mt-2 text-xs text-gray-500">
                      Etapa {solicitacao.etapa_atual}/{solicitacao.total_etapas}
                    </div>
                    <div className={`text-xs ${getPrioridadeCor(solicitacao.prioridade)} mt-1`}>
                      {solicitacao.prioridade}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )

  const renderAprovador = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Pendências de Aprovação</h3>
        <Badge className="bg-red-100 text-red-800">
          {solicitacoesFiltradas.length} pendente(s)
        </Badge>
      </div>

      {/* Lista de Pendências */}
      <div className="space-y-4">
        {solicitacoesFiltradas.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <LucideIcons.CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhuma pendência!
              </h3>
              <p className="text-gray-600">
                Todas as solicitações foram processadas.
              </p>
            </CardContent>
          </Card>
        ) : (
          solicitacoesFiltradas.map((solicitacao) => {
            const IconeComponente = LucideIcons[getTipoIcon(solicitacao.tipo) as keyof typeof LucideIcons] as any
            return (
              <Card key={solicitacao.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <IconeComponente className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{solicitacao.titulo}</h4>
                        <p className="text-sm text-gray-600">Por: {solicitacao.solicitante}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(solicitacao.data_criacao).toLocaleDateString('pt-BR')}
                        </p>
                        {solicitacao.valor && (
                          <p className="text-sm font-medium text-gray-900 mt-1">
                            {formatarMoeda(solicitacao.valor)}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getPrioridadeCor(solicitacao.prioridade)}>
                        {solicitacao.prioridade}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{solicitacao.descricao}</p>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => aprovarSolicitacao(solicitacao)}
                      disabled={loading}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <LucideIcons.Check className="mr-1 h-4 w-4" />
                      Aprovar
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setModalSolicitacao(solicitacao)}
                      disabled={loading}
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <LucideIcons.X className="mr-1 h-4 w-4" />
                      Rejeitar
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => setModalSolicitacao(solicitacao)}
                    >
                      <LucideIcons.Eye className="mr-1 h-4 w-4" />
                      Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )

  const renderDashboard = () => {
    const stats = {
      total: solicitacoes.length,
      pendentes: solicitacoes.filter(s => s.status === 'pendente' || s.status === 'em_analise').length,
      aprovadas: solicitacoes.filter(s => s.status === 'aprovado').length,
      rejeitadas: solicitacoes.filter(s => s.status === 'rejeitado').length
    }

    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Dashboard Executivo</h3>
        
        {/* Métricas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total', valor: stats.total, icone: 'FileText', cor: 'bg-blue-100 text-blue-600' },
            { label: 'Pendentes', valor: stats.pendentes, icone: 'Clock', cor: 'bg-yellow-100 text-yellow-600' },
            { label: 'Aprovadas', valor: stats.aprovadas, icone: 'CheckCircle', cor: 'bg-green-100 text-green-600' },
            { label: 'Rejeitadas', valor: stats.rejeitadas, icone: 'XCircle', cor: 'bg-red-100 text-red-600' }
          ].map((stat, index) => {
            const IconeComponente = LucideIcons[stat.icone as keyof typeof LucideIcons] as any
            return (
              <Card key={index}>
                <CardContent className="p-4 text-center">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-2 ${stat.cor}`}>
                    <IconeComponente className="h-5 w-5" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.valor}</div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Atividade Recente */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {solicitacoes
                .sort((a, b) => new Date(b.data_atualizacao).getTime() - new Date(a.data_atualizacao).getTime())
                .slice(0, 5)
                .map((solicitacao) => (
                  <div key={solicitacao.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{solicitacao.titulo}</p>
                      <p className="text-xs text-gray-500">por {solicitacao.solicitante}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusCor(solicitacao.status)} variant="outline">
                        {solicitacao.status}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(solicitacao.data_atualizacao).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <LucideIcons.GitBranch className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Sistema de Aprovações</h2>
              <p className="text-sm opacity-90">Workflow Corporativo</p>
            </div>
          </div>
          <Select value={usuario} onValueChange={(valor) => setUsuario(valor as any)}>
            <SelectTrigger className="w-40 bg-white/20 border-white/30 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="funcionario">👤 Funcionário</SelectItem>
              <SelectItem value="gestor">👨‍💼 Gestor</SelectItem>
              <SelectItem value="admin">⚙️ Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Navegação */}
      <div className="border-b border-gray-200">
        <nav className="flex">
          {[
            { id: 'solicitante', label: 'Minhas Solicitações', icone: 'FileText' },
            { id: 'aprovador', label: 'Aprovar', icone: 'CheckSquare' },
            { id: 'dashboard', label: 'Dashboard', icone: 'BarChart3' }
          ].map((tab) => {
            const IconeComponente = LucideIcons[tab.icone as keyof typeof LucideIcons] as any
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-yellow-600 border-b-2 border-yellow-600 bg-yellow-50'
                    : 'text-gray-600 hover:text-yellow-600 hover:bg-gray-50'
                }`}
              >
                <IconeComponente className="h-4 w-4" />
                {tab.label}
                {tab.id === 'aprovador' && solicitacoesFiltradas.filter(s => 
                  s.status === 'pendente' || s.status === 'em_analise'
                ).length > 0 && (
                  <Badge className="bg-red-500 text-white text-xs">
                    {solicitacoesFiltradas.filter(s => s.status === 'pendente' || s.status === 'em_analise').length}
                  </Badge>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Conteúdo */}
      <div className="p-6">
        {activeTab === 'solicitante' && renderSolicitante()}
        {activeTab === 'aprovador' && renderAprovador()}
        {activeTab === 'dashboard' && renderDashboard()}
      </div>

      {/* Modal de Detalhes */}
      {modalSolicitacao && (
        <Dialog open={true} onOpenChange={() => setModalSolicitacao(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{modalSolicitacao.titulo}</DialogTitle>
              <DialogDescription>
                Solicitação de {modalSolicitacao.solicitante} • {modalSolicitacao.tipo}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label>Descrição</Label>
                <p className="text-sm text-gray-600 mt-1">{modalSolicitacao.descricao}</p>
              </div>
              
              {modalSolicitacao.valor && (
                <div>
                  <Label>Valor</Label>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {formatarMoeda(modalSolicitacao.valor)}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Status</Label>
                  <Badge className={`${getStatusCor(modalSolicitacao.status)} mt-1`}>
                    {modalSolicitacao.status}
                  </Badge>
                </div>
                <div>
                  <Label>Progresso</Label>
                  <p className="text-sm text-gray-600 mt-1">
                    Etapa {modalSolicitacao.etapa_atual}/{modalSolicitacao.total_etapas}
                  </p>
                </div>
              </div>

              {modalSolicitacao.comentarios.length > 0 && (
                <div>
                  <Label>Histórico</Label>
                  <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                    {modalSolicitacao.comentarios.map((comentario) => (
                      <div key={comentario.id} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{comentario.autor}</span>
                          <span className="text-xs text-gray-500">
                            {new Date(comentario.data).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{comentario.texto}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              {activeTab === 'aprovador' && (modalSolicitacao.status === 'pendente' || modalSolicitacao.status === 'em_analise') && (
                <>
                  <Button 
                    onClick={() => rejeitarSolicitacao(modalSolicitacao, 'Rejeitado via modal')}
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    Rejeitar
                  </Button>
                  <Button 
                    onClick={() => aprovarSolicitacao(modalSolicitacao)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Aprovar
                  </Button>
                </>
              )}
              <Button variant="outline" onClick={() => setModalSolicitacao(null)}>
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Footer */}
      <div className="bg-gray-50 p-3 text-center border-t">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
          <LucideIcons.Workflow className="h-3 w-3" />
          <span>Sistema completo de workflow • Múltiplos níveis de aprovação</span>
        </div>
      </div>
    </div>
  )
}

export default SistemaAprovacoesPreview