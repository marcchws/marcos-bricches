// components/cases/MobileBankingPreview.tsx
'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import * as LucideIcons from 'lucide-react'

interface TransacaoRecente {
  id: string
  tipo: 'pix' | 'boleto' | 'cartao' | 'investimento'
  descricao: string
  valor: number
  data: string
  status: 'concluida' | 'pendente'
}

const MobileBankingPreview: React.FC = () => {
  const [telaAtiva, setTelaAtiva] = useState<'home' | 'pix' | 'investimentos' | 'cartao'>('home')
  const [saldoVisivel, setSaldoVisivel] = useState(true)
  const [valorPix, setValorPix] = useState('')
  const [chavePix, setChavePix] = useState('')
  const [loading, setLoading] = useState(false)

  const saldo = 15742.50
  const investimentos = 25830.75
  const limite = 5000.00

  const transacoesRecentes: TransacaoRecente[] = [
    { id: '1', tipo: 'pix', descricao: 'Pagamento - João Silva', valor: -350.00, data: '10:45', status: 'concluida' },
    { id: '2', tipo: 'cartao', descricao: 'Compra - Amazon', valor: -89.90, data: '09:23', status: 'concluida' },
    { id: '3', tipo: 'investimento', descricao: 'Rendimento CDB', valor: +45.32, data: '08:00', status: 'concluida' },
    { id: '4', tipo: 'boleto', descricao: 'Energia - CEMIG', valor: -234.56, data: 'Ontem', status: 'pendente' }
  ]

  const investimentosData = [
    { produto: 'CDB Banco Inter', valor: 12500.00, rentabilidade: '+2.3%', cor: 'text-green-600' },
    { produto: 'LCI Itaú', valor: 8500.00, rentabilidade: '+1.8%', cor: 'text-green-600' },
    { produto: 'Tesouro Direto', valor: 4830.75, rentabilidade: '+0.9%', cor: 'text-green-600' }
  ]

  const handlePixTransfer = () => {
    if (valorPix && chavePix) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        setValorPix('')
        setChavePix('')
        setTelaAtiva('home')
        // Simulação de transação bem-sucedida
      }, 2000)
    }
  }

  const getIconeTransacao = (tipo: string) => {
    switch (tipo) {
      case 'pix': return <LucideIcons.Zap className="h-4 w-4 text-purple-600" />
      case 'boleto': return <LucideIcons.FileText className="h-4 w-4 text-blue-600" />
      case 'cartao': return <LucideIcons.CreditCard className="h-4 w-4 text-orange-600" />
      case 'investimento': return <LucideIcons.TrendingUp className="h-4 w-4 text-green-600" />
      default: return <LucideIcons.DollarSign className="h-4 w-4 text-gray-600" />
    }
  }

  const PreviewHeader = () => (
    <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-4 rounded-t-3xl">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm opacity-90">9:41</span>
        <div className="flex gap-1">
          <div className="w-4 h-2 bg-white/30 rounded-sm"></div>
          <div className="w-6 h-2 bg-white rounded-sm"></div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">Olá, Marcos!</h3>
          <p className="text-sm opacity-90">Como podemos te ajudar?</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
            onClick={() => setSaldoVisivel(!saldoVisivel)}
          >
            {saldoVisivel ? 
              <LucideIcons.EyeOff className="h-5 w-5" /> : 
              <LucideIcons.Eye className="h-5 w-5" />
            }
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <LucideIcons.Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )

  const HomeScreen = () => (
    <div className="p-4 space-y-4">
      {/* Saldo */}
      <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-700">Saldo disponível</h4>
            <LucideIcons.CreditCard className="h-4 w-4 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {saldoVisivel ? `R$ ${saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '••••••••'}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Limite disponível: R$ {limite.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </CardContent>
      </Card>

      {/* Ações Rápidas */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { acao: 'PIX', icone: 'Zap', tela: 'pix' },
          { acao: 'Boleto', icone: 'FileText', tela: 'home' },
          { acao: 'Cartão', icone: 'CreditCard', tela: 'cartao' },
          { acao: 'Investir', icone: 'TrendingUp', tela: 'investimentos' }
        ].map((item, index) => {
          const IconeComponente = LucideIcons[item.icone as keyof typeof LucideIcons] as any
          return (
            <Button
              key={index}
              variant="outline"
              className="h-16 flex-col gap-1 text-xs"
              onClick={() => setTelaAtiva(item.tela as any)}
            >
              <IconeComponente className="h-5 w-5" />
              {item.acao}
            </Button>
          )
        })}
      </div>

      {/* Investimentos Resumo */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Investimentos</h4>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setTelaAtiva('investimentos')}
            >
              <LucideIcons.ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xl font-bold text-green-600 mb-2">
            R$ {investimentos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <LucideIcons.TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-green-600">+5.2% no mês</span>
          </div>
        </CardContent>
      </Card>

      {/* Transações Recentes */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Últimas transações</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-3">
            {transacoesRecentes.slice(0, 3).map((transacao) => (
              <div key={transacao.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getIconeTransacao(transacao.tipo)}
                  <div>
                    <p className="text-sm font-medium">{transacao.descricao}</p>
                    <p className="text-xs text-gray-600">{transacao.data}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    transacao.valor > 0 ? 'text-green-600' : 'text-gray-900'
                  }`}>
                    {transacao.valor > 0 ? '+' : ''}R$ {Math.abs(transacao.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <Badge 
                    variant={transacao.status === 'concluida' ? 'secondary' : 'outline'}
                    className="text-xs"
                  >
                    {transacao.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const PixScreen = () => (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setTelaAtiva('home')}
        >
          <LucideIcons.ArrowLeft className="h-4 w-4 mr-1" />
          Voltar
        </Button>
        <h3 className="font-semibold">Transferência PIX</h3>
        <div></div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Chave PIX</label>
              <Input 
                placeholder="Digite CPF, email ou telefone"
                value={chavePix}
                onChange={(e) => setChavePix(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Valor</label>
              <Input 
                placeholder="R$ 0,00"
                value={valorPix}
                onChange={(e) => setValorPix(e.target.value)}
                className="mt-1"
              />
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-green-600 to-teal-600"
              onClick={handlePixTransfer}
              disabled={loading || !valorPix || !chavePix}
            >
              {loading ? (
                <>
                  <LucideIcons.Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <LucideIcons.Send className="h-4 w-4 mr-2" />
                  Transferir
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-16 flex-col gap-1">
          <LucideIcons.QrCode className="h-5 w-5" />
          <span className="text-xs">QR Code</span>
        </Button>
        <Button variant="outline" className="h-16 flex-col gap-1">
          <LucideIcons.Copy className="h-5 w-5" />
          <span className="text-xs">Copia e Cola</span>
        </Button>
      </div>
    </div>
  )

  const InvestimentosScreen = () => (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setTelaAtiva('home')}
        >
          <LucideIcons.ArrowLeft className="h-4 w-4 mr-1" />
          Voltar
        </Button>
        <h3 className="font-semibold">Investimentos</h3>
        <div></div>
      </div>

      <Card className="bg-gradient-to-br from-green-50 to-teal-50">
        <CardContent className="p-4">
          <h4 className="font-medium mb-2">Patrimônio Total</h4>
          <p className="text-2xl font-bold text-green-600 mb-2">
            R$ {investimentos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <LucideIcons.TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-green-600">+R$ 892,34 (+5.2%) no mês</span>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {investimentosData.map((inv, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium text-sm">{inv.produto}</h5>
                  <p className="text-lg font-bold">
                    R$ {inv.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className={inv.cor}>
                    {inv.rentabilidade}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button className="w-full bg-gradient-to-r from-green-600 to-teal-600">
        <LucideIcons.Plus className="h-4 w-4 mr-2" />
        Investir Mais
      </Button>
    </div>
  )

  const CartaoScreen = () => (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setTelaAtiva('home')}
        >
          <LucideIcons.ArrowLeft className="h-4 w-4 mr-1" />
          Voltar
        </Button>
        <h3 className="font-semibold">Meus Cartões</h3>
        <div></div>
      </div>

      {/* Cartão Principal */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 text-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-sm opacity-80">Cartão de Débito</p>
            <p className="font-bold">MARCOS BRICCHES</p>
          </div>
          <div className="w-8 h-6 bg-white/20 rounded"></div>
        </div>
        
        <div className="space-y-1 mb-6">
          <p className="text-lg tracking-wider">**** **** **** 3456</p>
          <div className="flex gap-4 text-sm">
            <span>CVV: ***</span>
            <span>VAL: 12/29</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Badge className="bg-white/20 text-white">Ativo</Badge>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <LucideIcons.Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <LucideIcons.Lock className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Cartão Virtual */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium">Cartão Virtual</h5>
              <p className="text-sm text-gray-600">Para compras online seguras</p>
            </div>
            <Button variant="outline" size="sm">
              <LucideIcons.Plus className="h-4 w-4 mr-1" />
              Criar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Limites */}
      <Card>
        <CardContent className="p-4">
          <h5 className="font-medium mb-3">Limites</h5>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Limite disponível</span>
              <span className="font-medium">R$ {limite.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Limite total</span>
              <span className="font-medium">R$ 5.000,00</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const BottomNavigation = () => (
    <div className="bg-white border-t border-gray-200 p-4 rounded-b-3xl">
      <div className="flex justify-around">
        {[
          { icone: 'Home', label: 'Início', tela: 'home' },
          { icone: 'Zap', label: 'PIX', tela: 'pix' },
          { icone: 'TrendingUp', label: 'Investir', tela: 'investimentos' },
          { icone: 'CreditCard', label: 'Cartões', tela: 'cartao' }
        ].map((item, index) => {
          const IconeComponente = LucideIcons[item.icone as keyof typeof LucideIcons] as any
          const ativo = telaAtiva === item.tela
          
          return (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className={`flex-col gap-1 h-12 ${
                ativo ? 'text-green-600' : 'text-gray-600'
              }`}
              onClick={() => setTelaAtiva(item.tela as any)}
            >
              <IconeComponente className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-sm mx-auto border-8 border-gray-800">
      <PreviewHeader />
      
      <div className="h-96 overflow-y-auto bg-gray-50">
        {telaAtiva === 'home' && <HomeScreen />}
        {telaAtiva === 'pix' && <PixScreen />}
        {telaAtiva === 'investimentos' && <InvestimentosScreen />}
        {telaAtiva === 'cartao' && <CartaoScreen />}
      </div>
      
      <BottomNavigation />
      
      {/* Indicador de interatividade */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-2 text-center">
        <div className="flex items-center justify-center gap-2 text-xs">
          <LucideIcons.Smartphone className="h-3 w-3" />
          <span>App interativo • Navegue pelas funcionalidades</span>
        </div>
      </div>
    </div>
  )
}

export default MobileBankingPreview 