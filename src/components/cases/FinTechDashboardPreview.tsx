// components/cases/FinTechDashboardPreview.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import * as LucideIcons from 'lucide-react'

interface Investment {
  id: string
  nome: string
  tipo: 'acao' | 'fundo' | 'renda_fixa' | 'cripto'
  valor_atual: number
  valor_investido: number
  rentabilidade: number
  cor: string
}

interface Expense {
  id: string
  categoria: string
  valor: number
  data: string
  descricao: string
  tipo: 'receita' | 'despesa'
}

interface Goal {
  id: string
  titulo: string
  valor_meta: number
  valor_atual: number
  prazo: string
  categoria: string
}

const FinTechDashboardPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'investments' | 'expenses' | 'goals'>('overview')
  const [loading, setLoading] = useState(false)
  const [periodo, setPeriodo] = useState('mes')
  const [dados, setDados] = useState({
    portfolio: 0,
    rentabilidade: 0,
    gastos_mes: 0,
    metas_concluidas: 0
  })

  // Dados simulados realistas
  const investments: Investment[] = [
    {
      id: '1',
      nome: 'ITUB4',
      tipo: 'acao',
      valor_atual: 15200,
      valor_investido: 12000,
      rentabilidade: 26.67,
      cor: 'from-blue-600 to-blue-700'
    },
    {
      id: '2', 
      nome: 'Tesouro IPCA+ 2029',
      tipo: 'renda_fixa',
      valor_atual: 25800,
      valor_investido: 25000,
      rentabilidade: 3.2,
      cor: 'from-green-600 to-green-700'
    },
    {
      id: '3',
      nome: 'XP Allocation FIC FIM',
      tipo: 'fundo',
      valor_atual: 8900,
      valor_investido: 8500,
      rentabilidade: 4.71,
      cor: 'from-purple-600 to-purple-700'
    },
    {
      id: '4',
      nome: 'Bitcoin',
      tipo: 'cripto',
      valor_atual: 3200,
      valor_investido: 4000,
      rentabilidade: -20.0,
      cor: 'from-orange-600 to-orange-700'
    }
  ]

  const expenses: Expense[] = [
    { id: '1', categoria: 'Alimentação', valor: -850, data: '2024-01-15', descricao: 'Supermercado', tipo: 'despesa' },
    { id: '2', categoria: 'Transporte', valor: -320, data: '2024-01-14', descricao: 'Uber', tipo: 'despesa' },
    { id: '3', categoria: 'Salário', valor: 8500, data: '2024-01-01', descricao: 'Salário Janeiro', tipo: 'receita' },
    { id: '4', categoria: 'Moradia', valor: -1800, data: '2024-01-05', descricao: 'Aluguel', tipo: 'despesa' },
    { id: '5', categoria: 'Lazer', valor: -280, data: '2024-01-12', descricao: 'Cinema', tipo: 'despesa' }
  ]

  const goals: Goal[] = [
    {
      id: '1',
      titulo: 'Reserva de Emergência',
      valor_meta: 50000,
      valor_atual: 32000,
      prazo: '2024-12-31',
      categoria: 'Emergência'
    },
    {
      id: '2',
      titulo: 'Viagem Europa',
      valor_meta: 15000,
      valor_atual: 8500,
      prazo: '2024-07-01',
      categoria: 'Lazer'
    },
    {
      id: '3',
      titulo: 'Entrada Apartamento',
      valor_meta: 80000,
      valor_atual: 45000,
      prazo: '2025-06-01',
      categoria: 'Imóveis'
    }
  ]

  useEffect(() => {
    // Simular carregamento de dados
    setLoading(true)
    setTimeout(() => {
      const portfolio_total = investments.reduce((acc, inv) => acc + inv.valor_atual, 0)
      const valor_investido_total = investments.reduce((acc, inv) => acc + inv.valor_investido, 0)
      const rentabilidade_geral = ((portfolio_total - valor_investido_total) / valor_investido_total) * 100
      const gastos_mes = expenses.filter(e => e.tipo === 'despesa').reduce((acc, e) => acc + Math.abs(e.valor), 0)
      const metas_concluidas = goals.filter(g => g.valor_atual >= g.valor_meta).length

      setDados({
        portfolio: portfolio_total,
        rentabilidade: rentabilidade_geral,
        gastos_mes,
        metas_concluidas
      })
      setLoading(false)
    }, 1000)
  }, [periodo])

  const formatarMoeda = (valor: number): string => {
    if (valor === undefined || valor === null || isNaN(valor)) return 'R$ 0,00'
    
    try {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(valor)
    } catch (error) {
      console.error('Erro ao formatar moeda:', error)
      return 'Valor inválido'
    }
  }

  const formatarPercentual = (valor: number): string => {
    const sinal = valor >= 0 ? '+' : ''
    return `${sinal}${valor.toFixed(2)}%`
  }

  const getCorRentabilidade = (valor: number): string => {
    return valor >= 0 ? 'text-green-600' : 'text-red-600'
  }

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'acao': return 'TrendingUp'
      case 'renda_fixa': return 'Shield'
      case 'fundo': return 'Package'
      case 'cripto': return 'Coins'
      default: return 'DollarSign'
    }
  }

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case 'Alimentação': return 'Utensils'
      case 'Transporte': return 'Car'
      case 'Moradia': return 'Home'
      case 'Lazer': return 'Coffee'
      case 'Salário': return 'Banknote'
      default: return 'ShoppingCart'
    }
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Métricas Principais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { 
            titulo: 'Portfolio Total', 
            valor: formatarMoeda(dados.portfolio), 
            variacao: formatarPercentual(dados.rentabilidade),
            icone: 'Wallet',
            cor: getCorRentabilidade(dados.rentabilidade)
          },
          { 
            titulo: 'Gastos do Mês', 
            valor: formatarMoeda(dados.gastos_mes), 
            variacao: '-12% vs mês anterior',
            icone: 'CreditCard',
            cor: 'text-green-600'
          },
          { 
            titulo: 'Metas Concluídas', 
            valor: `${dados.metas_concluidas}/${goals.length}`, 
            variacao: '+1 este mês',
            icone: 'Target',
            cor: 'text-blue-600'
          },
          { 
            titulo: 'Receita Mensal', 
            valor: formatarMoeda(8500), 
            variacao: '+5% vs mês anterior',
            icone: 'TrendingUp',
            cor: 'text-green-600'
          }
        ].map((metrica, index) => {
          const IconeComponente = LucideIcons[metrica.icone as keyof typeof LucideIcons] as any
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-teal-100 rounded-lg">
                    <IconeComponente className="h-4 w-4 text-teal-600" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-600">{metrica.titulo}</p>
                  <p className="text-lg font-bold text-gray-900">{metrica.valor}</p>
                  <p className={`text-xs ${metrica.cor}`}>{metrica.variacao}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Gráfico de Portfolio */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Distribuição do Portfolio</CardTitle>
            <Select value={periodo} onValueChange={setPeriodo}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semana">Semana</SelectItem>
                <SelectItem value="mes">Mês</SelectItem>
                <SelectItem value="trimestre">Trimestre</SelectItem>
                <SelectItem value="ano">Ano</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              {investments.map((investment) => {
                const porcentagem = (investment.valor_atual / dados.portfolio) * 100
                return (
                  <div key={investment.id} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{investment.nome}</span>
                      <span className="text-gray-600">{porcentagem.toFixed(1)}%</span>
                    </div>
                    <Progress value={porcentagem} className="h-2" />
                  </div>
                )
              })}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {investments.map((investment) => {
                const IconeComponente = LucideIcons[getTipoIcon(investment.tipo) as keyof typeof LucideIcons] as any
                return (
                  <div key={investment.id} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <IconeComponente className="h-4 w-4 text-teal-600" />
                      <span className="text-sm font-medium">{investment.nome}</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-lg font-bold">{formatarMoeda(investment.valor_atual)}</p>
                      <p className={`text-xs ${getCorRentabilidade(investment.rentabilidade)}`}>
                        {formatarPercentual(investment.rentabilidade)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderInvestments = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Análise de Investimentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {investments.map((investment) => {
              const IconeComponente = LucideIcons[getTipoIcon(investment.tipo) as keyof typeof LucideIcons] as any
              return (
                <div key={investment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 bg-gradient-to-br ${investment.cor} rounded-lg`}>
                      <IconeComponente className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{investment.nome}</h3>
                      <p className="text-sm text-gray-600 capitalize">{investment.tipo.replace('_', ' ')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{formatarMoeda(investment.valor_atual)}</p>
                    <p className={`text-sm ${getCorRentabilidade(investment.rentabilidade)}`}>
                      {formatarPercentual(investment.rentabilidade)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderExpenses = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Controle de Gastos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {expenses.map((expense) => {
              const IconeComponente = LucideIcons[getCategoriaIcon(expense.categoria) as keyof typeof LucideIcons] as any
              return (
                <div key={expense.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${expense.tipo === 'receita' ? 'bg-green-100' : 'bg-red-100'}`}>
                      <IconeComponente className={`h-4 w-4 ${expense.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{expense.descricao}</p>
                      <p className="text-sm text-gray-600">{expense.categoria}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${expense.valor >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatarMoeda(expense.valor)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(expense.data).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderGoals = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Metas Financeiras</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {goals.map((goal) => {
              const progresso = (goal.valor_atual / goal.valor_meta) * 100
              const restante = goal.valor_meta - goal.valor_atual
              const concluida = progresso >= 100
              
              return (
                <div key={goal.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{goal.titulo}</h3>
                      <p className="text-sm text-gray-600">{goal.categoria}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{formatarMoeda(goal.valor_atual)}</p>
                      <p className="text-sm text-gray-600">de {formatarMoeda(goal.valor_meta)}</p>
                    </div>
                  </div>
                  
                  <Progress value={Math.min(progresso, 100)} className="h-3" />
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className={concluida ? 'text-green-600' : 'text-gray-600'}>
                      {concluida ? '✓ Meta concluída!' : `Faltam ${formatarMoeda(restante)}`}
                    </span>
                    <span className="text-gray-500">
                      {new Date(goal.prazo).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header do Dashboard */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <LucideIcons.DollarSign className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">FinTech Dashboard</h2>
              <p className="text-sm opacity-90">Gestão Financeira Pessoal</p>
            </div>
          </div>
          <Badge className="bg-white/20 text-white">
            {loading ? 'Atualizando...' : 'Atualizado'}
          </Badge>
        </div>
      </div>

      {/* Navegação */}
      <div className="border-b border-gray-200">
        <nav className="flex">
          {[
            { id: 'overview', label: 'Visão Geral', icone: 'LayoutDashboard' },
            { id: 'investments', label: 'Investimentos', icone: 'TrendingUp' },
            { id: 'expenses', label: 'Gastos', icone: 'CreditCard' },
            { id: 'goals', label: 'Metas', icone: 'Target' }
          ].map((tab) => {
            const IconeComponente = LucideIcons[tab.icone as keyof typeof LucideIcons] as any
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50'
                    : 'text-gray-600 hover:text-teal-600 hover:bg-gray-50'
                }`}
              >
                <IconeComponente className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Conteúdo */}
      <div className="p-6">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'investments' && renderInvestments()}
            {activeTab === 'expenses' && renderExpenses()}
            {activeTab === 'goals' && renderGoals()}
          </>
        )}
      </div>

      {/* Footer com indicador */}
      <div className="bg-gray-50 p-3 text-center border-t">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
          <LucideIcons.Smartphone className="h-3 w-3" />
          <span>Dashboard totalmente responsivo • Dados simulados realistas</span>
        </div>
      </div>
    </div>
  )
}

export default FinTechDashboardPreview