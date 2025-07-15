'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import * as LucideIcons from 'lucide-react'

interface Usuario {
  id: string
  nome: string
  avatar: string
  status: 'online' | 'offline' | 'ausente'
  ultimaAtividade: Date
}

interface Mensagem {
  id: string
  remetenteId: string
  conteudo: string
  tipo: 'texto' | 'arquivo' | 'imagem'
  timestamp: Date
  lida: boolean
}

interface Conversa {
  id: string
  nome: string
  tipo: 'privada' | 'grupo'
  participantes: string[]
  ultimaMensagem?: Mensagem
  mensagemNaoLida: number
  ativo: boolean
}

const ChatAppPreview: React.FC = () => {
  const [usuarios] = useState<Usuario[]>([
    {
      id: '1',
      nome: 'Ana Silva',
      avatar: '👩‍💼',
      status: 'online',
      ultimaAtividade: new Date()
    },
    {
      id: '2',
      nome: 'Carlos Santos',
      avatar: '👨‍💻',
      status: 'online',
      ultimaAtividade: new Date()
    },
    {
      id: '3',
      nome: 'Maria João',
      avatar: '👩‍🎨',
      status: 'ausente',
      ultimaAtividade: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: '4',
      nome: 'João Costa',
      avatar: '👨‍🔧',
      status: 'offline',
      ultimaAtividade: new Date(Date.now() - 2 * 60 * 60 * 1000)
    }
  ])

  const [usuarioAtual] = useState<Usuario>({
    id: 'user',
    nome: 'Você',
    avatar: '😊',
    status: 'online',
    ultimaAtividade: new Date()
  })

  const [conversas, setConversas] = useState<Conversa[]>([
    {
      id: '1',
      nome: 'Ana Silva',
      tipo: 'privada',
      participantes: ['user', '1'],
      mensagemNaoLida: 2,
      ativo: false
    },
    {
      id: '2',
      nome: 'Equipe Design',
      tipo: 'grupo',
      participantes: ['user', '1', '2', '3'],
      mensagemNaoLida: 5,
      ativo: false
    },
    {
      id: '3',
      nome: 'Carlos Santos',
      tipo: 'privada',
      participantes: ['user', '2'],
      mensagemNaoLida: 0,
      ativo: false
    },
    {
      id: '4',
      nome: 'Projeto Beta',
      tipo: 'grupo',
      participantes: ['user', '2', '4'],
      mensagemNaoLida: 1,
      ativo: false
    }
  ])

  const [mensagens, setMensagens] = useState<{ [conversaId: string]: Mensagem[] }>({
    '1': [
      {
        id: '1',
        remetenteId: '1',
        conteudo: 'Olá! Como está o andamento do projeto?',
        tipo: 'texto',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        lida: true
      },
      {
        id: '2',
        remetenteId: 'user',
        conteudo: 'Está indo bem! Acabei de finalizar o design das telas principais.',
        tipo: 'texto',
        timestamp: new Date(Date.now() - 8 * 60 * 1000),
        lida: true
      },
      {
        id: '3',
        remetenteId: '1',
        conteudo: 'Perfeito! Podemos agendar uma review para amanhã?',
        tipo: 'texto',
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        lida: false
      }
    ],
    '2': [
      {
        id: '4',
        remetenteId: '2',
        conteudo: 'Pessoal, a reunião de hoje foi cancelada.',
        tipo: 'texto',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        lida: true
      },
      {
        id: '5',
        remetenteId: '3',
        conteudo: 'Ok! Vamos reagendar para amanhã então.',
        tipo: 'texto',
        timestamp: new Date(Date.now() - 25 * 60 * 1000),
        lida: true
      },
      {
        id: '6',
        remetenteId: '1',
        conteudo: 'design-system-v2.fig',
        tipo: 'arquivo',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        lida: false
      }
    ]
  })

  const [conversaAtiva, setConversaAtiva] = useState<string | null>(null)
  const [novaMensagem, setNovaMensagem] = useState('')
  const [usuarioDigitando, setUsuarioDigitando] = useState<string | null>(null)
  const [modalNovoGrupo, setModalNovoGrupo] = useState(false)
  const [nomeNovoGrupo, setNomeNovoGrupo] = useState('')
  const [participantesSelecionados, setParticipantesSelecionados] = useState<string[]>([])
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [mensagens, conversaAtiva])

  // Simular usuário digitando
  useEffect(() => {
    if (conversaAtiva && mensagens[conversaAtiva]) {
      const timer = setTimeout(() => {
        const usuarios = ['1', '2', '3', '4']
        const usuarioAleatorio = usuarios[Math.floor(Math.random() * usuarios.length)]
        setUsuarioDigitando(usuarioAleatorio)
        
        setTimeout(() => {
          setUsuarioDigitando(null)
        }, 3000)
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [conversaAtiva, mensagens])

  const selecionarConversa = (conversaId: string) => {
    setConversaAtiva(conversaId)
    
    // Marcar mensagens como lidas
    setConversas(prev => prev.map(conv => 
      conv.id === conversaId 
        ? { ...conv, mensagemNaoLida: 0, ativo: true }
        : { ...conv, ativo: false }
    ))

    if (mensagens[conversaId]) {
      setMensagens(prev => ({
        ...prev,
        [conversaId]: prev[conversaId].map(msg => ({ ...msg, lida: true }))
      }))
    }
  }

  const enviarMensagem = () => {
    if (!novaMensagem.trim() || !conversaAtiva) return

    const novaMensagemObj: Mensagem = {
      id: Date.now().toString(),
      remetenteId: 'user',
      conteudo: novaMensagem,
      tipo: 'texto',
      timestamp: new Date(),
      lida: true
    }

    setMensagens(prev => ({
      ...prev,
      [conversaAtiva]: [...(prev[conversaAtiva] || []), novaMensagemObj]
    }))

    setNovaMensagem('')

    // Simular resposta automática
    setTimeout(() => {
      const conversa = conversas.find(c => c.id === conversaAtiva)
      if (conversa && conversa.participantes.length > 1) {
        const outrosParticipantes = conversa.participantes.filter(p => p !== 'user')
        const remetenteAleatorio = outrosParticipantes[Math.floor(Math.random() * outrosParticipantes.length)]
        
        const respostasAutomaticas = [
          'Entendi! Vou verificar isso.',
          'Perfeito, obrigado pela informação.',
          'Ótimo trabalho! 👏',
          'Pode deixar comigo.',
          'Vamos dar uma olhada nisso juntos.',
          'Excelente ideia!',
          'Concordo totalmente.',
          'Vou implementar essa mudança.'
        ]
        
        const respostaAleatoria = respostasAutomaticas[Math.floor(Math.random() * respostasAutomaticas.length)]
        
        const respostaMensagem: Mensagem = {
          id: (Date.now() + 1).toString(),
          remetenteId: remetenteAleatorio,
          conteudo: respostaAleatoria,
          tipo: 'texto',
          timestamp: new Date(),
          lida: false
        }

        setMensagens(prev => ({
          ...prev,
          [conversaAtiva]: [...(prev[conversaAtiva] || []), respostaMensagem]
        }))
      }
    }, 1000 + Math.random() * 2000)
  }

  const criarGrupo = () => {
    if (!nomeNovoGrupo.trim() || participantesSelecionados.length === 0) return

    const novaConversa: Conversa = {
      id: Date.now().toString(),
      nome: nomeNovoGrupo,
      tipo: 'grupo',
      participantes: ['user', ...participantesSelecionados],
      mensagemNaoLida: 0,
      ativo: false
    }

    setConversas(prev => [...prev, novaConversa])
    setMensagens(prev => ({
      ...prev,
      [novaConversa.id]: []
    }))
    
    setNomeNovoGrupo('')
    setParticipantesSelecionados([])
    setModalNovoGrupo(false)
  }

  const obterUsuario = (id: string): Usuario => {
    if (id === 'user') return usuarioAtual
    return usuarios.find(u => u.id === id) || usuarios[0]
  }

  const formatarHora = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  }

  const StatusIndicator = ({ status }: { status: string }) => {
    const cores = {
      online: 'bg-green-500',
      ausente: 'bg-yellow-500',
      offline: 'bg-gray-400'
    }
    return <div className={`w-3 h-3 rounded-full ${cores[status as keyof typeof cores]} border-2 border-white`} />
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Card className="h-[600px] overflow-hidden">
        <div className="flex h-full">
          {/* Sidebar - Lista de Conversas */}
          <div className="w-80 border-r bg-gray-50 flex flex-col">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Conversas</CardTitle>
                <Dialog open={modalNovoGrupo} onOpenChange={setModalNovoGrupo}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <LucideIcons.Plus className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Criar Novo Grupo</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Nome do grupo"
                        value={nomeNovoGrupo}
                        onChange={(e) => setNomeNovoGrupo(e.target.value)}
                      />
                      <div>
                        <h4 className="font-medium mb-2">Adicionar Participantes:</h4>
                        <div className="space-y-2">
                          {usuarios.map(usuario => (
                            <label key={usuario.id} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={participantesSelecionados.includes(usuario.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setParticipantesSelecionados(prev => [...prev, usuario.id])
                                  } else {
                                    setParticipantesSelecionados(prev => prev.filter(id => id !== usuario.id))
                                  }
                                }}
                              />
                              <div className="flex items-center gap-2">
                                <div className="text-lg">{usuario.avatar}</div>
                                <span className="text-sm">{usuario.nome}</span>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                      <Button onClick={criarGrupo} className="w-full">
                        Criar Grupo
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            
            <ScrollArea className="flex-1 px-4">
              <div className="space-y-2">
                {conversas.map(conversa => {
                  const ultimoParticipante = conversa.participantes.find(p => p !== 'user')
                  const usuario = ultimoParticipante ? obterUsuario(ultimoParticipante) : null
                  
                  return (
                    <div
                      key={conversa.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        conversa.ativo ? 'bg-blue-100 border border-blue-200' : 'bg-white hover:bg-gray-100'
                      }`}
                      onClick={() => selecionarConversa(conversa.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          {conversa.tipo === 'grupo' ? (
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                              <LucideIcons.Users className="h-5 w-5" />
                            </div>
                          ) : (
                            <div className="text-2xl">{usuario?.avatar}</div>
                          )}
                          {conversa.tipo === 'privada' && usuario && (
                            <div className="absolute -bottom-1 -right-1">
                              <StatusIndicator status={usuario.status} />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-sm truncate">{conversa.nome}</h3>
                            {conversa.mensagemNaoLida > 0 && (
                              <Badge className="bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                                {conversa.mensagemNaoLida}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            {conversa.tipo === 'grupo' && (
                              <LucideIcons.Users className="h-3 w-3" />
                            )}
                            <span className="truncate">
                              {conversa.ultimaMensagem?.conteudo || 'Iniciar conversa...'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Área Principal do Chat */}
          <div className="flex-1 flex flex-col">
            {conversaAtiva ? (
              <>
                {/* Header da Conversa */}
                <div className="p-4 border-b bg-white">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const conversa = conversas.find(c => c.id === conversaAtiva)
                      if (!conversa) return null
                      
                      if (conversa.tipo === 'grupo') {
                        return (
                          <>
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                              <LucideIcons.Users className="h-5 w-5" />
                            </div>
                            <div>
                              <h2 className="font-semibold">{conversa.nome}</h2>
                              <p className="text-sm text-gray-500">
                                {conversa.participantes.length} membros
                              </p>
                            </div>
                          </>
                        )
                      } else {
                        const outroParticipante = conversa.participantes.find(p => p !== 'user')
                        const usuario = outroParticipante ? obterUsuario(outroParticipante) : null
                        
                        return (
                          <>
                            <div className="relative">
                              <div className="text-3xl">{usuario?.avatar}</div>
                              <div className="absolute -bottom-1 -right-1">
                                <StatusIndicator status={usuario?.status || 'offline'} />
                              </div>
                            </div>
                            <div>
                              <h2 className="font-semibold">{usuario?.nome}</h2>
                              <p className="text-sm text-gray-500">
                                {usuario?.status === 'online' ? 'Online' : 
                                 usuario?.status === 'ausente' ? 'Ausente' : 
                                 `Visto por último ${formatarHora(usuario?.ultimaAtividade || new Date())}`}
                              </p>
                            </div>
                          </>
                        )
                      }
                    })()}
                  </div>
                </div>

                {/* Mensagens */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {(mensagens[conversaAtiva] || []).map(mensagem => {
                      const isUser = mensagem.remetenteId === 'user'
                      const remetente = obterUsuario(mensagem.remetenteId)
                      
                      return (
                        <div key={mensagem.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                          <div className={`flex gap-2 max-w-[70%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                            {!isUser && (
                              <div className="text-xl flex-shrink-0">{remetente.avatar}</div>
                            )}
                            
                            <div className={`p-3 rounded-lg ${
                              isUser 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-100 text-gray-900'
                            }`}>
                              {!isUser && (
                                <div className="text-xs font-medium mb-1">{remetente.nome}</div>
                              )}
                              
                              {mensagem.tipo === 'arquivo' ? (
                                <div className="flex items-center gap-2">
                                  <LucideIcons.FileText className="h-4 w-4" />
                                  <span className="text-sm">{mensagem.conteudo}</span>
                                </div>
                              ) : (
                                <div>{mensagem.conteudo}</div>
                              )}
                              
                              <div className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                                {formatarHora(mensagem.timestamp)}
                                {isUser && (
                                  <span className="ml-1">
                                    {mensagem.lida ? '✓✓' : '✓'}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    
                    {usuarioDigitando && (
                      <div className="flex justify-start">
                        <div className="flex gap-2 max-w-[70%]">
                          <div className="text-xl">{obterUsuario(usuarioDigitando).avatar}</div>
                          <div className="bg-gray-100 p-3 rounded-lg">
                            <div className="text-xs text-gray-500 mb-1">
                              {obterUsuario(usuarioDigitando).nome} está digitando...
                            </div>
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Input de Mensagem */}
                <div className="p-4 border-t bg-white">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Digite uma mensagem..."
                      value={novaMensagem}
                      onChange={(e) => setNovaMensagem(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && enviarMensagem()}
                      className="flex-1"
                    />
                    <Button onClick={enviarMensagem} size="sm">
                      <LucideIcons.Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <LucideIcons.MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Selecione uma conversa
                  </h3>
                  <p className="text-gray-500">
                    Escolha uma conversa da lista para começar a conversar
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
      
      <div className="mt-4 text-center">
        <div className="flex justify-center gap-6 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Online</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>Ausente</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span>Offline</span>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Clique em uma conversa para começar • Crie grupos • Experimente enviar mensagens
        </p>
      </div>
    </div>
  )
}

export default ChatAppPreview 