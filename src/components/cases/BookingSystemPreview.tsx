'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import * as LucideIcons from 'lucide-react'

interface Mesa {
  id: string
  numero: number
  capacidade: number
  status: 'livre' | 'ocupada' | 'reservada'
  posicao: { x: number; y: number }
  formato: 'redonda' | 'retangular'
}

interface Reserva {
  id: string
  clienteNome: string
  clienteEmail: string
  clienteTelefone: string
  data: string
  hora: string
  pessoas: number
  mesaId: string
  status: 'pendente' | 'confirmada' | 'finalizada' | 'cancelada'
  observacoes?: string
  criadoEm: Date
}

interface PessoaListaEspera {
  id: string
  nome: string
  telefone: string
  pessoas: number
  horarioPreferido: string
  criadoEm: Date
}

const BookingSystemPreview: React.FC = () => {
  const [mesas] = useState<Mesa[]>([
    { id: '1', numero: 1, capacidade: 2, status: 'livre', posicao: { x: 50, y: 100 }, formato: 'redonda' },
    { id: '2', numero: 2, capacidade: 4, status: 'ocupada', posicao: { x: 200, y: 100 }, formato: 'retangular' },
    { id: '3', numero: 3, capacidade: 2, status: 'reservada', posicao: { x: 350, y: 100 }, formato: 'redonda' },
    { id: '4', numero: 4, capacidade: 6, status: 'livre', posicao: { x: 50, y: 250 }, formato: 'retangular' },
    { id: '5', numero: 5, capacidade: 4, status: 'livre', posicao: { x: 200, y: 250 }, formato: 'retangular' },
    { id: '6', numero: 6, capacidade: 8, status: 'reservada', posicao: { x: 350, y: 250 }, formato: 'retangular' },
  ])

  const [reservas, setReservas] = useState<Reserva[]>([
    {
      id: '1',
      clienteNome: 'Ana Silva',
      clienteEmail: 'ana@email.com',
      clienteTelefone: '(11) 99999-0001',
      data: '2024-12-20',
      hora: '19:00',
      pessoas: 2,
      mesaId: '3',
      status: 'confirmada',
      observacoes: 'Aniversário, preferem mesa mais reservada',
      criadoEm: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '2',
      clienteNome: 'Carlos Santos',
      clienteEmail: 'carlos@email.com',
      clienteTelefone: '(11) 99999-0002',
      data: '2024-12-20',
      hora: '20:30',
      pessoas: 6,
      mesaId: '6',
      status: 'pendente',
      criadoEm: new Date(Date.now() - 1 * 60 * 60 * 1000)
    }
  ])

  const [listaEspera, setListaEspera] = useState<PessoaListaEspera[]>([
    {
      id: '1',
      nome: 'Maria João',
      telefone: '(11) 99999-0003',
      pessoas: 4,
      horarioPreferido: '19:30',
      criadoEm: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: '2',
      nome: 'João Costa',
      telefone: '(11) 99999-0004',
      pessoas: 2,
      horarioPreferido: '20:00',
      criadoEm: new Date(Date.now() - 15 * 60 * 1000)
    }
  ])

  const [abaDashboard, setAbaDashboard] = useState<'calendario' | 'mesas' | 'reservas' | 'espera'>('calendario')
  const [modalNovaReserva, setModalNovaReserva] = useState(false)
  const [modalListaEspera, setModalListaEspera] = useState(false)
  const [mesaSelecionada, setMesaSelecionada] = useState<string | null>(null)
  
  // Estados do formulário de nova reserva
  const [novaReserva, setNovaReserva] = useState({
    clienteNome: '',
    clienteEmail: '',
    clienteTelefone: '',
    data: '2024-12-20',
    hora: '',
    pessoas: 2,
    observacoes: ''
  })

  // Estados do formulário de lista de espera
  const [novaEspera, setNovaEspera] = useState({
    nome: '',
    telefone: '',
    pessoas: 2,
    horarioPreferido: ''
  })

  const [notificacaoWhatsApp, setNotificacaoWhatsApp] = useState<string | null>(null)

  const horariosDisponiveis = [
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
  ]

  const criarReserva = () => {
    if (!novaReserva.clienteNome || !novaReserva.hora) return

    // Verificar se há mesa disponível para o número de pessoas
    const mesaDisponivel = mesas.find(mesa => 
      mesa.status === 'livre' && mesa.capacidade >= novaReserva.pessoas
    )

    if (!mesaDisponivel) {
      // Adicionar à lista de espera se não há mesa disponível
      const pessoaEspera: PessoaListaEspera = {
        id: Date.now().toString(),
        nome: novaReserva.clienteNome,
        telefone: novaReserva.clienteTelefone,
        pessoas: novaReserva.pessoas,
        horarioPreferido: novaReserva.hora,
        criadoEm: new Date()
      }
      
      setListaEspera(prev => [...prev, pessoaEspera])
      setNotificacaoWhatsApp(`Lista de espera: ${novaReserva.clienteNome} foi adicionado à lista de espera para ${novaReserva.hora}`)
      
      // Limpar form
      setNovaReserva({
        clienteNome: '',
        clienteEmail: '',
        clienteTelefone: '',
        data: '2024-12-20',
        hora: '',
        pessoas: 2,
        observacoes: ''
      })
      setModalNovaReserva(false)
      return
    }

    const reserva: Reserva = {
      id: Date.now().toString(),
      clienteNome: novaReserva.clienteNome,
      clienteEmail: novaReserva.clienteEmail,
      clienteTelefone: novaReserva.clienteTelefone,
      data: novaReserva.data,
      hora: novaReserva.hora,
      pessoas: novaReserva.pessoas,
      mesaId: mesaDisponivel.id,
      status: 'confirmada',
      observacoes: novaReserva.observacoes,
      criadoEm: new Date()
    }

    setReservas(prev => [...prev, reserva])
    
    // Simular confirmação via WhatsApp
    setNotificacaoWhatsApp(
      `WhatsApp enviado: Olá ${novaReserva.clienteNome}! Sua reserva para ${novaReserva.pessoas} pessoas em ${novaReserva.hora} foi confirmada. Mesa ${mesaDisponivel.numero}. Restaurante Exemplo.`
    )

    // Limpar form
    setNovaReserva({
      clienteNome: '',
      clienteEmail: '',
      clienteTelefone: '',
      data: '2024-12-20',
      hora: '',
      pessoas: 2,
      observacoes: ''
    })
    setModalNovaReserva(false)
  }

  const adicionarListaEspera = () => {
    if (!novaEspera.nome || !novaEspera.telefone) return

    const pessoaEspera: PessoaListaEspera = {
      id: Date.now().toString(),
      nome: novaEspera.nome,
      telefone: novaEspera.telefone,
      pessoas: novaEspera.pessoas,
      horarioPreferido: novaEspera.horarioPreferido,
      criadoEm: new Date()
    }

    setListaEspera(prev => [...prev, pessoaEspera])
    setNotificacaoWhatsApp(`Lista de espera: ${novaEspera.nome} foi adicionado à lista de espera`)

    setNovaEspera({
      nome: '',
      telefone: '',
      pessoas: 2,
      horarioPreferido: ''
    })
    setModalListaEspera(false)
  }

  const confirmarReserva = (reservaId: string) => {
    setReservas(prev => prev.map(reserva => 
      reserva.id === reservaId 
        ? { ...reserva, status: 'confirmada' as const }
        : reserva
    ))

    const reserva = reservas.find(r => r.id === reservaId)
    if (reserva) {
      setNotificacaoWhatsApp(
        `WhatsApp enviado: Olá ${reserva.clienteNome}! Sua reserva foi confirmada para ${reserva.hora}. Obrigado!`
      )
    }
  }

  const liberarMesa = (mesaId: string) => {
    // Simular liberação de mesa e oferecer para lista de espera
    const pessoaEspera = listaEspera[0]
    if (pessoaEspera) {
      setNotificacaoWhatsApp(
        `WhatsApp enviado: Olá ${pessoaEspera.nome}! Uma mesa ficou disponível. Confirma sua reserva para ${pessoaEspera.horarioPreferido}?`
      )
      
      // Remover da lista de espera
      setListaEspera(prev => prev.filter(p => p.id !== pessoaEspera.id))
    }
  }

  const obterCorMesa = (status: Mesa['status']) => {
    switch (status) {
      case 'livre': return 'bg-green-200 border-green-400 text-green-800'
      case 'ocupada': return 'bg-red-200 border-red-400 text-red-800'
      case 'reservada': return 'bg-yellow-200 border-yellow-400 text-yellow-800'
    }
  }

  const formatarHora = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  }

  // Limpar notificação após 5 segundos
  useEffect(() => {
    if (notificacaoWhatsApp) {
      const timer = setTimeout(() => {
        setNotificacaoWhatsApp(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notificacaoWhatsApp])

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="h-[700px] overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Sistema de Reservas - Restaurante Exemplo</CardTitle>
            <div className="flex gap-2">
              <Dialog open={modalNovaReserva} onOpenChange={setModalNovaReserva}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-violet-600 hover:bg-violet-700">
                    <LucideIcons.Plus className="h-4 w-4 mr-1" />
                    Nova Reserva
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Nova Reserva</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="clienteNome">Nome do Cliente</Label>
                      <Input
                        id="clienteNome"
                        value={novaReserva.clienteNome}
                        onChange={(e) => setNovaReserva(prev => ({ ...prev, clienteNome: e.target.value }))}
                        placeholder="Nome completo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="clienteTelefone">Telefone</Label>
                      <Input
                        id="clienteTelefone"
                        value={novaReserva.clienteTelefone}
                        onChange={(e) => setNovaReserva(prev => ({ ...prev, clienteTelefone: e.target.value }))}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div>
                      <Label htmlFor="clienteEmail">Email</Label>
                      <Input
                        id="clienteEmail"
                        type="email"
                        value={novaReserva.clienteEmail}
                        onChange={(e) => setNovaReserva(prev => ({ ...prev, clienteEmail: e.target.value }))}
                        placeholder="email@exemplo.com"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="data">Data</Label>
                        <Input
                          id="data"
                          type="date"
                          value={novaReserva.data}
                          onChange={(e) => setNovaReserva(prev => ({ ...prev, data: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="hora">Horário</Label>
                        <Select 
                          value={novaReserva.hora} 
                          onValueChange={(hora) => setNovaReserva(prev => ({ ...prev, hora }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Escolha o horário" />
                          </SelectTrigger>
                          <SelectContent>
                            {horariosDisponiveis.map(hora => (
                              <SelectItem key={hora} value={hora}>{hora}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="pessoas">Número de Pessoas</Label>
                      <Select 
                        value={novaReserva.pessoas.toString()} 
                        onValueChange={(pessoas) => setNovaReserva(prev => ({ ...prev, pessoas: parseInt(pessoas) }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1,2,3,4,5,6,7,8].map(num => (
                            <SelectItem key={num} value={num.toString()}>{num} pessoa{num > 1 ? 's' : ''}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="observacoes">Observações</Label>
                      <Textarea
                        id="observacoes"
                        value={novaReserva.observacoes}
                        onChange={(e) => setNovaReserva(prev => ({ ...prev, observacoes: e.target.value }))}
                        placeholder="Pedidos especiais, aniversário, etc."
                        rows={2}
                      />
                    </div>
                    <Button onClick={criarReserva} className="w-full">
                      Criar Reserva
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={modalListaEspera} onOpenChange={setModalListaEspera}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <LucideIcons.Users className="h-4 w-4 mr-1" />
                    Lista Espera
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Adicionar à Lista de Espera</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="nome">Nome</Label>
                      <Input
                        id="nome"
                        value={novaEspera.nome}
                        onChange={(e) => setNovaEspera(prev => ({ ...prev, nome: e.target.value }))}
                        placeholder="Nome completo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        value={novaEspera.telefone}
                        onChange={(e) => setNovaEspera(prev => ({ ...prev, telefone: e.target.value }))}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pessoasEspera">Número de Pessoas</Label>
                      <Select 
                        value={novaEspera.pessoas.toString()} 
                        onValueChange={(pessoas) => setNovaEspera(prev => ({ ...prev, pessoas: parseInt(pessoas) }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1,2,3,4,5,6,7,8].map(num => (
                            <SelectItem key={num} value={num.toString()}>{num} pessoa{num > 1 ? 's' : ''}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="horarioPreferido">Horário Preferido</Label>
                      <Select 
                        value={novaEspera.horarioPreferido} 
                        onValueChange={(hora) => setNovaEspera(prev => ({ ...prev, horarioPreferido: hora }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Escolha o horário" />
                        </SelectTrigger>
                        <SelectContent>
                          {horariosDisponiveis.map(hora => (
                            <SelectItem key={hora} value={hora}>{hora}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={adicionarListaEspera} className="w-full">
                      Adicionar à Lista
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          {/* Abas de navegação */}
          <div className="flex gap-1 mt-4">
            {[
              { id: 'calendario', label: 'Calendário', icon: 'Calendar' },
              { id: 'mesas', label: 'Layout Mesas', icon: 'Grid3X3' },
              { id: 'reservas', label: 'Reservas', icon: 'BookOpen' },
              { id: 'espera', label: 'Lista Espera', icon: 'Users' }
            ].map(aba => (
              <Button
                key={aba.id}
                variant={abaDashboard === aba.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setAbaDashboard(aba.id as any)}
                className="text-xs"
              >
                <LucideIcons.Calendar className="h-3 w-3 mr-1" />
                {aba.label}
              </Button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="h-[580px]">
            {/* Calendário */}
            {abaDashboard === 'calendario' && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">Agenda do Dia - 20/12/2024</h3>
                    <div className="space-y-2">
                      {horariosDisponiveis.map(hora => {
                        const reservaNaHora = reservas.find(r => r.hora === hora)
                        const pessoasEsperando = listaEspera.filter(p => p.horarioPreferido === hora).length
                        
                        return (
                          <div
                            key={hora}
                            className={`p-3 border rounded-lg ${
                              reservaNaHora 
                                ? 'bg-violet-50 border-violet-200' 
                                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">{hora}</div>
                                {reservaNaHora ? (
                                  <div className="text-sm text-gray-600">
                                    {reservaNaHora.clienteNome} - {reservaNaHora.pessoas} pessoas
                                  </div>
                                ) : (
                                  <div className="text-sm text-gray-500">Disponível</div>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                {pessoasEsperando > 0 && (
                                  <Badge variant="secondary" className="text-xs">
                                    {pessoasEsperando} na espera
                                  </Badge>
                                )}
                                {reservaNaHora && (
                                  <Badge variant={
                                    reservaNaHora.status === 'confirmada' ? 'default' :
                                    reservaNaHora.status === 'pendente' ? 'secondary' : 'outline'
                                  } className="text-xs">
                                    {reservaNaHora.status}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4">Estatísticas do Dia</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-2xl font-bold text-green-700">
                          {Math.round((reservas.filter(r => r.status === 'confirmada').length / horariosDisponiveis.length) * 100)}%
                        </div>
                        <div className="text-sm text-green-600">Taxa de Ocupação</div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="text-2xl font-bold text-blue-700">{reservas.length}</div>
                        <div className="text-sm text-blue-600">Reservas Hoje</div>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <div className="text-2xl font-bold text-yellow-700">{listaEspera.length}</div>
                        <div className="text-sm text-yellow-600">Lista de Espera</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <div className="text-2xl font-bold text-purple-700">
                          {reservas.reduce((acc, r) => acc + r.pessoas, 0)}
                        </div>
                        <div className="text-sm text-purple-600">Total Pessoas</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Layout das Mesas */}
            {abaDashboard === 'mesas' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Layout do Restaurante</h3>
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-200 border border-green-400 rounded"></div>
                      <span>Livre</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-200 border border-red-400 rounded"></div>
                      <span>Ocupada</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-200 border border-yellow-400 rounded"></div>
                      <span>Reservada</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg h-96">
                  {mesas.map(mesa => (
                    <div
                      key={mesa.id}
                      className={`absolute w-20 h-16 ${obterCorMesa(mesa.status)} border-2 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-shadow ${
                        mesaSelecionada === mesa.id ? 'ring-2 ring-violet-500' : ''
                      }`}
                      style={{
                        left: mesa.posicao.x,
                        top: mesa.posicao.y,
                        borderRadius: mesa.formato === 'redonda' ? '50%' : '8px'
                      }}
                      onClick={() => setMesaSelecionada(mesaSelecionada === mesa.id ? null : mesa.id)}
                    >
                      <div className="font-bold text-sm">{mesa.numero}</div>
                      <div className="text-xs">{mesa.capacidade}p</div>
                    </div>
                  ))}
                  
                  {/* Legenda das áreas */}
                  <div className="absolute bottom-4 left-4 text-xs text-gray-500">
                    <div>Entrada ↑</div>
                  </div>
                  <div className="absolute top-4 right-4 text-xs text-gray-500">
                    <div>Cozinha →</div>
                  </div>
                </div>
                
                {mesaSelecionada && (
                  <div className="mt-4 p-4 bg-white border rounded-lg">
                    {(() => {
                      const mesa = mesas.find(m => m.id === mesaSelecionada)
                      const reserva = reservas.find(r => r.mesaId === mesaSelecionada)
                      if (!mesa) return null
                      
                      return (
                        <div>
                          <h4 className="font-semibold mb-2">Mesa {mesa.numero} - {mesa.capacidade} pessoas</h4>
                          <div className="text-sm text-gray-600 mb-2">
                            Status: <Badge className={mesa.status === 'livre' ? 'bg-green-100 text-green-800' : 
                                                    mesa.status === 'ocupada' ? 'bg-red-100 text-red-800' : 
                                                    'bg-yellow-100 text-yellow-800'}>
                              {mesa.status}
                            </Badge>
                          </div>
                          {reserva && (
                            <div className="text-sm">
                              <div>Cliente: {reserva.clienteNome}</div>
                              <div>Horário: {reserva.hora}</div>
                              <div>Pessoas: {reserva.pessoas}</div>
                              {reserva.observacoes && (
                                <div>Obs: {reserva.observacoes}</div>
                              )}
                            </div>
                          )}
                          {mesa.status === 'ocupada' && (
                            <Button 
                              size="sm" 
                              className="mt-2"
                              onClick={() => liberarMesa(mesa.id)}
                            >
                              Liberar Mesa
                            </Button>
                          )}
                        </div>
                      )
                    })()}
                  </div>
                )}
              </div>
            )}

            {/* Lista de Reservas */}
            {abaDashboard === 'reservas' && (
              <ScrollArea className="h-full p-6">
                <h3 className="font-semibold mb-4">Reservas do Dia</h3>
                <div className="space-y-3">
                  {reservas.map(reserva => {
                    const mesa = mesas.find(m => m.id === reserva.mesaId)
                    return (
                      <Card key={reserva.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{reserva.clienteNome}</div>
                            <div className="text-sm text-gray-600">
                              {reserva.hora} • {reserva.pessoas} pessoas • Mesa {mesa?.numero}
                            </div>
                            <div className="text-sm text-gray-500">
                              Tel: {reserva.clienteTelefone}
                            </div>
                            {reserva.observacoes && (
                              <div className="text-sm text-gray-500 mt-1">
                                Obs: {reserva.observacoes}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={
                              reserva.status === 'confirmada' ? 'default' :
                              reserva.status === 'pendente' ? 'secondary' : 'outline'
                            }>
                              {reserva.status}
                            </Badge>
                            {reserva.status === 'pendente' && (
                              <Button 
                                size="sm"
                                onClick={() => confirmarReserva(reserva.id)}
                              >
                                Confirmar
                              </Button>
                            )}
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </ScrollArea>
            )}

            {/* Lista de Espera */}
            {abaDashboard === 'espera' && (
              <ScrollArea className="h-full p-6">
                <h3 className="font-semibold mb-4">Lista de Espera</h3>
                <div className="space-y-3">
                  {listaEspera.map((pessoa, index) => (
                    <Card key={pessoa.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">#{index + 1} - {pessoa.nome}</div>
                          <div className="text-sm text-gray-600">
                            {pessoa.pessoas} pessoas • Preferência: {pessoa.horarioPreferido}
                          </div>
                          <div className="text-sm text-gray-500">
                            Tel: {pessoa.telefone}
                          </div>
                          <div className="text-xs text-gray-400">
                            Adicionado às {formatarHora(pessoa.criadoEm)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm"
                            onClick={() => {
                              setNotificacaoWhatsApp(
                                `WhatsApp enviado: Olá ${pessoa.nome}! Uma mesa está disponível agora. Pode vir?`
                              )
                              setListaEspera(prev => prev.filter(p => p.id !== pessoa.id))
                            }}
                          >
                            <LucideIcons.MessageSquare className="h-4 w-4 mr-1" />
                            Chamar
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                  
                  {listaEspera.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <LucideIcons.Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <div>Nenhuma pessoa na lista de espera</div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notificação WhatsApp */}
      {notificacaoWhatsApp && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="bg-green-500 rounded-full p-2">
              <LucideIcons.MessageSquare className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-green-800 mb-1">
                Notificação Automática Enviada
              </div>
              <div className="text-sm text-green-700">
                {notificacaoWhatsApp}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-4 text-center">
        <div className="flex justify-center gap-6 text-xs text-gray-500 mb-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
            <span>Sistema de Reservas</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>WhatsApp Automático</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Gestão de Mesas</span>
          </div>
        </div>
        <p className="text-xs text-gray-400">
          Crie reservas • Gerencie mesas • Teste a lista de espera • Veja as notificações automáticas
        </p>
      </div>
    </div>
  )
}

export default BookingSystemPreview 