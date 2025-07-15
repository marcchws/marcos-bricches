// components/cases/TaskManagerPreview.tsx
'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import * as LucideIcons from 'lucide-react'

interface Tarefa {
  id: string
  titulo: string
  descricao: string
  status: 'todo' | 'progress' | 'done'
  prioridade: 'alta' | 'media' | 'baixa'
  criadaEm: Date
}

type StatusType = 'todo' | 'progress' | 'done'
type PrioridadeType = 'alta' | 'media' | 'baixa'

const TaskManagerPreview: React.FC = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([
    {
      id: '1',
      titulo: 'Implementar autenticação',
      descricao: 'Sistema de login e registro de usuários',
      status: 'todo',
      prioridade: 'alta',
      criadaEm: new Date('2024-01-15')
    },
    {
      id: '2',
      titulo: 'Design da interface',
      descricao: 'Criar wireframes e protótipos',
      status: 'progress',
      prioridade: 'media',
      criadaEm: new Date('2024-01-14')
    },
    {
      id: '3',
      titulo: 'Setup do banco de dados',
      descricao: 'Configurar PostgreSQL e migrações',
      status: 'done',
      prioridade: 'alta',
      criadaEm: new Date('2024-01-13')
    },
    {
      id: '4',
      titulo: 'Testes unitários',
      descricao: 'Escrever testes para componentes',
      status: 'todo',
      prioridade: 'baixa',
      criadaEm: new Date('2024-01-12')
    }
  ])

  const [busca, setBusca] = useState('')
  const [filtroStatus, setFiltroStatus] = useState<StatusType | 'todos'>('todos')
  const [filtroPrioridade, setFiltroPrioridade] = useState<PrioridadeType | 'todas'>('todas')
  const [modalAberto, setModalAberto] = useState(false)
  const [novaTarefa, setNovaTarefa] = useState({
    titulo: '',
    descricao: '',
    prioridade: 'media' as PrioridadeType
  })
  const [tarefaArrastando, setTarefaArrastando] = useState<string | null>(null)

  // Filtrar tarefas
  const tarefasFiltradas = tarefas.filter(tarefa => {
    const matchBusca = !busca || 
      tarefa.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      tarefa.descricao.toLowerCase().includes(busca.toLowerCase())
    
    const matchStatus = filtroStatus === 'todos' || tarefa.status === filtroStatus
    const matchPrioridade = filtroPrioridade === 'todas' || tarefa.prioridade === filtroPrioridade
    
    return matchBusca && matchStatus && matchPrioridade
  })

  // Agrupar tarefas por status
  const tarefasPorStatus = {
    todo: tarefasFiltradas.filter(t => t.status === 'todo'),
    progress: tarefasFiltradas.filter(t => t.status === 'progress'),
    done: tarefasFiltradas.filter(t => t.status === 'done')
  }

  const criarTarefa = () => {
    if (novaTarefa.titulo.trim()) {
      const tarefa: Tarefa = {
        id: Date.now().toString(),
        titulo: novaTarefa.titulo,
        descricao: novaTarefa.descricao,
        status: 'todo',
        prioridade: novaTarefa.prioridade,
        criadaEm: new Date()
      }
      
      setTarefas([...tarefas, tarefa])
      setNovaTarefa({ titulo: '', descricao: '', prioridade: 'media' })
      setModalAberto(false)
    }
  }

  const moverTarefa = (id: string, novoStatus: StatusType) => {
    setTarefas(tarefas.map(tarefa => 
      tarefa.id === id ? { ...tarefa, status: novoStatus } : tarefa
    ))
  }

  const excluirTarefa = (id: string) => {
    setTarefas(tarefas.filter(tarefa => tarefa.id !== id))
  }

  const handleDragStart = (e: React.DragEvent, tarefaId: string) => {
    setTarefaArrastando(tarefaId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, novoStatus: StatusType) => {
    e.preventDefault()
    if (tarefaArrastando) {
      moverTarefa(tarefaArrastando, novoStatus)
      setTarefaArrastando(null)
    }
  }

  const limparFiltros = () => {
    setBusca('')
    setFiltroStatus('todos')
    setFiltroPrioridade('todas')
  }

  const getPrioridadeCor = (prioridade: PrioridadeType) => {
    switch (prioridade) {
      case 'alta': return 'bg-red-100 text-red-800 border-red-200'
      case 'media': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'baixa': return 'bg-green-100 text-green-800 border-green-200'
    }
  }

  const getStatusConfig = (status: StatusType) => {
    switch (status) {
      case 'todo':
        return {
          titulo: 'A Fazer',
          cor: 'bg-slate-50 border-slate-200',
          iconeCor: 'text-slate-600',
          icone: 'Circle'
        }
      case 'progress':
        return {
          titulo: 'Em Progresso',
          cor: 'bg-blue-50 border-blue-200',
          iconeCor: 'text-blue-600',
          icone: 'Clock'
        }
      case 'done':
        return {
          titulo: 'Concluído',
          cor: 'bg-green-50 border-green-200',
          iconeCor: 'text-green-600',
          icone: 'CheckCircle'
        }
    }
  }

  const IconeComponente = ({ nome, className }: { nome: string, className?: string }) => {
    const IconeElemento = (LucideIcons as any)[nome]
    return IconeElemento ? <IconeElemento className={className} /> : <LucideIcons.Circle className={className} />
  }

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-6xl mx-auto border">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-600 to-gray-600 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold">Gerenciador de Tarefas</h3>
            <p className="text-slate-200">Organize suas tarefas com eficiência</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={modalAberto} onOpenChange={setModalAberto}>
              <DialogTrigger asChild>
                <Button className="bg-white text-slate-600 hover:bg-slate-100">
                  <LucideIcons.Plus className="h-4 w-4 mr-2" />
                  Nova Tarefa
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Nova Tarefa</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Título</label>
                    <Input
                      placeholder="Digite o título da tarefa"
                      value={novaTarefa.titulo}
                      onChange={(e) => setNovaTarefa({...novaTarefa, titulo: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Descrição</label>
                    <Textarea
                      placeholder="Descrição detalhada (opcional)"
                      value={novaTarefa.descricao}
                      onChange={(e) => setNovaTarefa({...novaTarefa, descricao: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Prioridade</label>
                    <Select 
                      value={novaTarefa.prioridade} 
                      onValueChange={(value: PrioridadeType) => setNovaTarefa({...novaTarefa, prioridade: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alta">Alta</SelectItem>
                        <SelectItem value="media">Média</SelectItem>
                        <SelectItem value="baixa">Baixa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={criarTarefa} className="flex-1">
                      Criar Tarefa
                    </Button>
                    <Button variant="outline" onClick={() => setModalAberto(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Input
              placeholder="Buscar tarefas..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
            />
          </div>
          <Select value={filtroStatus} onValueChange={(value: StatusType | 'todos') => setFiltroStatus(value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="todo">A Fazer</SelectItem>
              <SelectItem value="progress">Em Progresso</SelectItem>
              <SelectItem value="done">Concluído</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filtroPrioridade} onValueChange={(value: PrioridadeType | 'todas') => setFiltroPrioridade(value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Prioridade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas</SelectItem>
              <SelectItem value="alta">Alta</SelectItem>
              <SelectItem value="media">Média</SelectItem>
              <SelectItem value="baixa">Baixa</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            onClick={limparFiltros}
            className="border-white/20 text-white hover:bg-white/10"
          >
            Limpar Filtros
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['todo', 'progress', 'done'] as StatusType[]).map((status) => {
            const config = getStatusConfig(status)
            const tarefasStatus = tarefasPorStatus[status]
            
            return (
              <div
                key={status}
                className={`rounded-lg border-2 border-dashed p-4 min-h-96 ${config.cor}`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, status)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <IconeComponente nome={config.icone} className={`h-5 w-5 ${config.iconeCor}`} />
                    <h3 className="font-semibold text-gray-900">{config.titulo}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {tarefasStatus.length}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  {tarefasStatus.map((tarefa) => (
                    <Card
                      key={tarefa.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, tarefa.id)}
                      className={`cursor-move hover:shadow-md transition-all ${
                        tarefaArrastando === tarefa.id ? 'opacity-50' : ''
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900 text-sm">{tarefa.titulo}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => excluirTarefa(tarefa.id)}
                            className="h-6 w-6 p-0 text-gray-400 hover:text-red-600"
                          >
                            <LucideIcons.X className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {tarefa.descricao && (
                          <p className="text-xs text-gray-600 mb-3">
                            {tarefa.descricao}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getPrioridadeCor(tarefa.prioridade)}`}
                          >
                            {tarefa.prioridade}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {tarefa.criadaEm.toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {tarefasStatus.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <IconeComponente nome="Package" className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">Nenhuma tarefa nesta coluna</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer com estatísticas */}
      <div className="bg-gray-50 p-4 border-t">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex gap-6">
            <span>Total: {tarefas.length} tarefas</span>
            <span>A fazer: {tarefasPorStatus.todo.length}</span>
            <span>Em progresso: {tarefasPorStatus.progress.length}</span>
            <span>Concluídas: {tarefasPorStatus.done.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <LucideIcons.MousePointer className="h-4 w-4" />
            <span>Arraste tarefas entre colunas</span>
          </div>
        </div>
      </div>

      {/* Indicador de interatividade */}
      <div className="bg-gradient-to-r from-slate-600 to-gray-600 text-white p-2 text-center">
        <div className="flex items-center justify-center gap-2 text-xs">
          <LucideIcons.Hand className="h-3 w-3" />
          <span>Sistema interativo • Crie, mova e organize suas tarefas</span>
        </div>
      </div>
    </div>
  )
}

export default TaskManagerPreview 