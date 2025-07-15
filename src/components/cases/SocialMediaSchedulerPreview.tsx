// components/cases/SocialMediaSchedulerPreview.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import * as LucideIcons from 'lucide-react'

interface PostAgendado {
  id: string
  conteudo: string
  plataformas: string[]
  data_agendamento: string
  status: 'agendado' | 'publicado' | 'falhado'
  engagement?: {
    likes: number
    shares: number
    comments: number
  }
}

interface Analytics {
  total_posts: number
  alcance_total: number
  engagement_rate: number
  melhor_horario: string
}

const SocialMediaSchedulerPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scheduler' | 'calendar' | 'analytics' | 'library'>('scheduler')
  const [loading, setLoading] = useState(false)
  const [novoPost, setNovoPost] = useState('')
  const [plataformasSelecionadas, setPlataformasSelecionadas] = useState<string[]>(['instagram'])
  const [dataAgendamento, setDataAgendamento] = useState('')
  const [postsAgendados, setPostsAgendados] = useState<PostAgendado[]>([])

  // Dados simulados
  const plataformas = [
    { id: 'instagram', nome: 'Instagram', cor: 'from-pink-500 to-purple-600', icone: 'Instagram', ativo: true },
    { id: 'twitter', nome: 'Twitter', cor: 'from-blue-400 to-blue-600', icone: 'Twitter', ativo: true },
    { id: 'linkedin', nome: 'LinkedIn', cor: 'from-blue-600 to-blue-800', icone: 'Linkedin', ativo: false },
    { id: 'facebook', nome: 'Facebook', cor: 'from-blue-500 to-blue-700', icone: 'Facebook', ativo: true },
    { id: 'tiktok', nome: 'TikTok', cor: 'from-black to-gray-800', icone: 'Music', ativo: false }
  ]

  const analytics: Analytics = {
    total_posts: 47,
    alcance_total: 12400,
    engagement_rate: 4.8,
    melhor_horario: '18:00-20:00'
  }

  const postsExemplo: PostAgendado[] = [
    {
      id: '1',
      conteudo: 'Lançando nossa nova feature de análise! 🚀 #produto #inovacao',
      plataformas: ['instagram', 'twitter'],
      data_agendamento: '2024-01-20T14:00:00',
      status: 'agendado'
    },
    {
      id: '2',
      conteudo: 'Dicas para aumentar seu engagement nas redes sociais ✨',
      plataformas: ['instagram', 'facebook'],
      data_agendamento: '2024-01-19T18:30:00',
      status: 'publicado',
      engagement: {
        likes: 234,
        shares: 45,
        comments: 18
      }
    },
    {
      id: '3',
      conteudo: 'Workshop gratuito sobre marketing digital nesta sexta! 🎯',
      plataformas: ['linkedin', 'facebook'],
      data_agendamento: '2024-01-18T09:00:00',
      status: 'publicado',
      engagement: {
        likes: 156,
        shares: 89,
        comments: 23
      }
    }
  ]

  useEffect(() => {
    setPostsAgendados(postsExemplo)
    
    // Configurar data padrão para hoje + 1 hora
    const agora = new Date()
    agora.setHours(agora.getHours() + 1)
    setDataAgendamento(agora.toISOString().slice(0, 16))
  }, [])

  const handleAgendarPost = () => {
    if (!novoPost.trim() || plataformasSelecionadas.length === 0 || !dataAgendamento) {
      alert('Preencha todos os campos obrigatórios')
      return
    }

    setLoading(true)
    
    setTimeout(() => {
      const novoPostObj: PostAgendado = {
        id: Date.now().toString(),
        conteudo: novoPost,
        plataformas: plataformasSelecionadas,
        data_agendamento: dataAgendamento,
        status: 'agendado'
      }
      
      setPostsAgendados([novoPostObj, ...postsAgendados])
      setNovoPost('')
      setPlataformasSelecionadas(['instagram'])
      setLoading(false)
      
      // Simular notificação de sucesso
      alert('Post agendado com sucesso!')
    }, 1500)
  }

  const togglePlataforma = (plataformaId: string) => {
    setPlataformasSelecionadas(prev => 
      prev.includes(plataformaId)
        ? prev.filter(p => p !== plataformaId)
        : [...prev, plataformaId]
    )
  }

  const formatarData = (dataString: string): string => {
    return new Date(dataString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'agendado': return 'text-blue-600 bg-blue-100'
      case 'publicado': return 'text-green-600 bg-green-100'
      case 'falhado': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPlatformIcon = (platform: string) => {
    const plat = plataformas.find(p => p.id === platform)
    return plat?.icone || 'Share2'
  }

  const renderScheduler = () => (
    <div className="space-y-6">
      {/* Novo Post */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Criar Novo Post</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Conteúdo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Conteúdo do Post
            </label>
            <Textarea
              value={novoPost}
              onChange={(e) => setNovoPost(e.target.value)}
              placeholder="Escreva o conteúdo do seu post aqui..."
              className="min-h-24"
              maxLength={280}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{novoPost.length}/280 caracteres</span>
              <span>Twitter limit</span>
            </div>
          </div>

          {/* Plataformas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selecionar Plataformas
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {plataformas.map((plataforma) => {
                const IconeComponente = LucideIcons[plataforma.icone as keyof typeof LucideIcons] as any
                const selecionada = plataformasSelecionadas.includes(plataforma.id)
                
                return (
                  <button
                    key={plataforma.id}
                    onClick={() => togglePlataforma(plataforma.id)}
                    disabled={!plataforma.ativo}
                    className={`p-3 rounded-lg border transition-all ${
                      plataforma.ativo
                        ? selecionada
                          ? `bg-gradient-to-r ${plataforma.cor} text-white border-transparent`
                          : 'bg-white hover:bg-gray-50 border-gray-200'
                        : 'bg-gray-100 border-gray-200 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <IconeComponente className="h-4 w-4" />
                      <span className="text-sm font-medium">{plataforma.nome}</span>
                      {!plataforma.ativo && (
                        <Badge variant="secondary" className="text-xs">Em breve</Badge>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Data e Hora */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data e Hora de Publicação
              </label>
              <Input
                type="datetime-local"
                value={dataAgendamento}
                onChange={(e) => setDataAgendamento(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>
            
            <div className="flex items-end">
              <Button 
                onClick={handleAgendarPost}
                disabled={loading || !novoPost.trim() || plataformasSelecionadas.length === 0}
                className="w-full bg-gradient-to-r from-pink-600 to-rose-600"
              >
                {loading ? (
                  <>
                    <LucideIcons.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Agendando...
                  </>
                ) : (
                  <>
                    <LucideIcons.Calendar className="mr-2 h-4 w-4" />
                    Agendar Post
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts Agendados */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Posts Agendados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {postsAgendados.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <LucideIcons.Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Nenhum post agendado ainda</p>
              </div>
            ) : (
              postsAgendados.map((post) => (
                <div key={post.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <p className="text-gray-900 mb-2">{post.conteudo}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <LucideIcons.Clock className="h-4 w-4" />
                        <span>{formatarData(post.data_agendamento)}</span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(post.status)}>
                      {post.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {post.plataformas.map((plataforma) => {
                        const IconeComponente = LucideIcons[getPlatformIcon(plataforma) as keyof typeof LucideIcons] as any
                        return (
                          <div key={plataforma} className="p-1 bg-gray-100 rounded">
                            <IconeComponente className="h-3 w-3 text-gray-600" />
                          </div>
                        )
                      })}
                    </div>
                    
                    {post.engagement && (
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          <LucideIcons.Heart className="h-3 w-3" />
                          {post.engagement.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <LucideIcons.Share2 className="h-3 w-3" />
                          {post.engagement.shares}
                        </span>
                        <span className="flex items-center gap-1">
                          <LucideIcons.MessageCircle className="h-3 w-3" />
                          {post.engagement.comments}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderCalendar = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Calendário Editorial</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map((dia) => (
            <div key={dia} className="p-2 text-center text-sm font-medium text-gray-600 bg-gray-50 rounded">
              {dia}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }, (_, i) => {
            const dia = i - 2 // Começar no domingo anterior
            const data = new Date()
            data.setDate(data.getDate() + dia)
            const isToday = dia === 0
            const hasPost = [2, 5, 8, 12, 15, 18, 22, 25].includes(i)
            
            return (
              <div
                key={i}
                className={`p-2 h-12 rounded border text-sm ${
                  isToday 
                    ? 'bg-pink-100 border-pink-300 text-pink-800' 
                    : hasPost
                    ? 'bg-blue-50 border-blue-200 text-blue-800'
                    : 'bg-white border-gray-200 text-gray-600'
                }`}
              >
                <div className="text-center">
                  {data.getDate()}
                  {hasPost && (
                    <div className="w-1 h-1 bg-blue-500 rounded-full mx-auto mt-1"></div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        
        <div className="flex items-center gap-4 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-pink-100 border border-pink-300 rounded"></div>
            <span>Hoje</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-50 border border-blue-200 rounded"></div>
            <span>Com posts agendados</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Métricas Principais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { titulo: 'Posts Publicados', valor: analytics.total_posts, icone: 'FileText', variacao: '+12%' },
          { titulo: 'Alcance Total', valor: analytics.alcance_total.toLocaleString(), icone: 'Eye', variacao: '+24%' },
          { titulo: 'Taxa de Engagement', valor: `${analytics.engagement_rate}%`, icone: 'Heart', variacao: '+0.8%' },
          { titulo: 'Melhor Horário', valor: analytics.melhor_horario, icone: 'Clock', variacao: 'Estável' }
        ].map((metrica, index) => {
          const IconeComponente = LucideIcons[metrica.icone as keyof typeof LucideIcons] as any
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-pink-100 rounded-lg">
                    <IconeComponente className="h-4 w-4 text-pink-600" />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">{metrica.titulo}</p>
                  <p className="text-lg font-bold text-gray-900">{metrica.valor}</p>
                  <p className="text-xs text-green-600">{metrica.variacao}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Gráfico de Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Performance por Plataforma</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { nome: 'Instagram', engagement: 6.2, posts: 15, alcance: 4500 },
              { nome: 'Facebook', engagement: 4.1, posts: 12, alcance: 3200 },
              { nome: 'Twitter', engagement: 3.8, posts: 20, alcance: 4800 }
            ].map((plataforma, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{plataforma.nome}</span>
                  <span className="text-sm text-gray-600">{plataforma.engagement}% engagement</span>
                </div>
                <Progress value={plataforma.engagement * 10} className="h-2" />
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <span>{plataforma.posts} posts</span>
                  <span>{plataforma.alcance.toLocaleString()} alcance</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderLibrary = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Biblioteca de Mídia</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center hover:from-gray-200 hover:to-gray-300 transition-colors cursor-pointer">
              <LucideIcons.Image className="h-8 w-8 text-gray-400" />
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button variant="outline" className="border-dashed">
            <LucideIcons.Plus className="mr-2 h-4 w-4" />
            Adicionar Nova Mídia
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <LucideIcons.Share2 className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Social Media Scheduler</h2>
              <p className="text-sm opacity-90">Gerenciamento de Redes Sociais</p>
            </div>
          </div>
          <Badge className="bg-white/20 text-white">
            5 Plataformas
          </Badge>
        </div>
      </div>

      {/* Navegação */}
      <div className="border-b border-gray-200">
        <nav className="flex">
          {[
            { id: 'scheduler', label: 'Agendador', icone: 'Calendar' },
            { id: 'calendar', label: 'Calendário', icone: 'CalendarDays' },
            { id: 'analytics', label: 'Analytics', icone: 'BarChart3' },
            { id: 'library', label: 'Biblioteca', icone: 'Image' }
          ].map((tab) => {
            const IconeComponente = LucideIcons[tab.icone as keyof typeof LucideIcons] as any
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-pink-600 border-b-2 border-pink-600 bg-pink-50'
                    : 'text-gray-600 hover:text-pink-600 hover:bg-gray-50'
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
        {activeTab === 'scheduler' && renderScheduler()}
        {activeTab === 'calendar' && renderCalendar()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'library' && renderLibrary()}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-3 text-center border-t">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
          <LucideIcons.Zap className="h-3 w-3" />
          <span>Agendamento automático • APIs integradas • Analytics em tempo real</span>
        </div>
      </div>
    </div>
  )
}

export default SocialMediaSchedulerPreview 