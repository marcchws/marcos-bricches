'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import * as LucideIcons from 'lucide-react'

interface Usuario {
  id: string
  nome: string
  email: string
  role: 'admin' | 'moderador' | 'editor' | 'viewer'
  status: 'ativo' | 'inativo' | 'suspenso'
  ultimoLogin: Date
  criadoEm: Date
  departamento: string
  permissions: string[]
}

interface LogAuditoria {
  id: string
  usuario: string
  acao: string
  recurso: string
  detalhes: string
  ip: string
  timestamp: Date
  nivel: 'info' | 'warning' | 'error' | 'critical'
}

interface Configuracao {
  chave: string
  valor: string | boolean | number
  descricao: string
  categoria: 'sistema' | 'seguranca' | 'notificacoes' | 'integracao'
  tipo: 'text' | 'boolean' | 'number' | 'select'
  opcoes?: string[]
}

const AdminPanelCompletePreview: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      id: '1',
      nome: 'João Silva',
      email: 'joao.silva@empresa.com',
      role: 'admin',
      status: 'ativo',
      ultimoLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
      criadoEm: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      departamento: 'TI',
      permissions: ['users.create', 'users.read', 'users.update', 'users.delete', 'system.config']
    },
    {
      id: '2',
      nome: 'Maria Santos',
      email: 'maria.santos@empresa.com',
      role: 'moderador',
      status: 'ativo',
      ultimoLogin: new Date(Date.now() - 1 * 60 * 60 * 1000),
      criadoEm: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      departamento: 'RH',
      permissions: ['users.read', 'users.update', 'reports.read']
    },
    {
      id: '3',
      nome: 'Carlos Oliveira',
      email: 'carlos.oliveira@empresa.com',
      role: 'editor',
      status: 'inativo',
      ultimoLogin: new Date(Date.now() - 24 * 60 * 60 * 1000),
      criadoEm: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      departamento: 'Marketing',
      permissions: ['content.create', 'content.read', 'content.update']
    }
  ])

  const [logsAuditoria, setLogsAuditoria] = useState<LogAuditoria[]>([
    {
      id: '1',
      usuario: 'João Silva',
      acao: 'CREATE_USER',
      recurso: 'users',
      detalhes: 'Criou usuário Maria Santos',
      ip: '192.168.1.100',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      nivel: 'info'
    },
    {
      id: '2',
      usuario: 'Maria Santos',
      acao: 'UPDATE_PERMISSIONS',
      recurso: 'permissions',
      detalhes: 'Alterou permissões do usuário Carlos Oliveira',
      ip: '192.168.1.101',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      nivel: 'warning'
    },
    {
      id: '3',
      usuario: 'Sistema',
      acao: 'LOGIN_FAILED',
      recurso: 'auth',
      detalhes: 'Tentativa de login falhada para admin@test.com',
      ip: '192.168.1.200',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      nivel: 'error'
    }
  ])

  const [configuracoes, setConfiguracoes] = useState<Configuracao[]>([
    {
      chave: 'session_timeout',
      valor: 30,
      descricao: 'Timeout de sessão em minutos',
      categoria: 'seguranca',
      tipo: 'number'
    },
    {
      chave: 'enable_2fa',
      valor: true,
      descricao: 'Habilitar autenticação de dois fatores',
      categoria: 'seguranca',
      tipo: 'boolean'
    },
    {
      chave: 'max_login_attempts',
      valor: 3,
      descricao: 'Máximo de tentativas de login',
      categoria: 'seguranca',
      tipo: 'number'
    },
    {
      chave: 'email_notifications',
      valor: true,
      descricao: 'Enviar notificações por email',
      categoria: 'notificacoes',
      tipo: 'boolean'
    }
  ])

  const [abaDashboard, setAbaDashboard] = useState<'dashboard' | 'usuarios' | 'permissoes' | 'auditoria' | 'configuracoes'>('dashboard')
  const [modalNovoUsuario, setModalNovoUsuario] = useState(false)
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<string | null>(null)
  const [filtroUsuarios, setFiltroUsuarios] = useState('')
  const [filtroLogs, setFiltroLogs] = useState('')

  // Estados do formulário de novo usuário
  const [novoUsuario, setNovoUsuario] = useState({
    nome: '',
    email: '',
    role: 'viewer' as Usuario['role'],
    departamento: '',
    permissions: [] as string[]
  })

  const [metricas, setMetricas] = useState({
    totalUsuarios: usuarios.length,
    usuariosAtivos: usuarios.filter(u => u.status === 'ativo').length,
    loginsMes: 1247,
    tentativasFalhas: 8,
    uptime: 99.9,
    storageUsado: 78,
    apiCalls: 15420,
    alerts: 2
  })

  const roles = [
    { value: 'admin', label: 'Administrador', color: 'bg-red-100 text-red-800' },
    { value: 'moderador', label: 'Moderador', color: 'bg-orange-100 text-orange-800' },
    { value: 'editor', label: 'Editor', color: 'bg-blue-100 text-blue-800' },
    { value: 'viewer', label: 'Visualizador', color: 'bg-gray-100 text-gray-800' }
  ]

  const permissions = [
    { id: 'users.create', label: 'Criar usuários', categoria: 'Usuários' },
    { id: 'users.read', label: 'Visualizar usuários', categoria: 'Usuários' },
    { id: 'users.update', label: 'Editar usuários', categoria: 'Usuários' },
    { id: 'users.delete', label: 'Excluir usuários', categoria: 'Usuários' },
    { id: 'reports.read', label: 'Visualizar relatórios', categoria: 'Relatórios' },
    { id: 'reports.create', label: 'Criar relatórios', categoria: 'Relatórios' },
    { id: 'system.config', label: 'Configurar sistema', categoria: 'Sistema' },
    { id: 'content.create', label: 'Criar conteúdo', categoria: 'Conteúdo' },
    { id: 'content.read', label: 'Visualizar conteúdo', categoria: 'Conteúdo' },
    { id: 'content.update', label: 'Editar conteúdo', categoria: 'Conteúdo' }
  ]

  const criarUsuario = () => {
    if (!novoUsuario.nome || !novoUsuario.email) return

    const usuario: Usuario = {
      id: Date.now().toString(),
      nome: novoUsuario.nome,
      email: novoUsuario.email,
      role: novoUsuario.role,
      status: 'ativo',
      ultimoLogin: new Date(),
      criadoEm: new Date(),
      departamento: novoUsuario.departamento,
      permissions: novoUsuario.permissions
    }

    setUsuarios(prev => [...prev, usuario])
    
    // Adicionar log de auditoria
    const log: LogAuditoria = {
      id: Date.now().toString(),
      usuario: 'Admin Atual',
      acao: 'CREATE_USER',
      recurso: 'users',
      detalhes: `Criou usuário ${novoUsuario.nome}`,
      ip: '192.168.1.105',
      timestamp: new Date(),
      nivel: 'info'
    }
    setLogsAuditoria(prev => [log, ...prev])

    // Atualizar métricas
    setMetricas(prev => ({
      ...prev,
      totalUsuarios: prev.totalUsuarios + 1,
      usuariosAtivos: prev.usuariosAtivos + 1
    }))

    // Limpar form
    setNovoUsuario({
      nome: '',
      email: '',
      role: 'viewer',
      departamento: '',
      permissions: []
    })
    setModalNovoUsuario(false)
  }

  const alternarStatusUsuario = (userId: string) => {
    setUsuarios(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'ativo' ? 'inativo' : 'ativo' as Usuario['status'] }
        : user
    ))

    const usuario = usuarios.find(u => u.id === userId)
    if (usuario) {
      const log: LogAuditoria = {
        id: Date.now().toString(),
        usuario: 'Admin Atual',
        acao: 'UPDATE_USER_STATUS',
        recurso: 'users',
        detalhes: `Alterou status do usuário ${usuario.nome}`,
        ip: '192.168.1.105',
        timestamp: new Date(),
        nivel: 'warning'
      }
      setLogsAuditoria(prev => [log, ...prev])
    }
  }

  const atualizarConfiguracao = (chave: string, valor: any) => {
    setConfiguracoes(prev => prev.map(config => 
      config.chave === chave ? { ...config, valor } : config
    ))

    const log: LogAuditoria = {
      id: Date.now().toString(),
      usuario: 'Admin Atual',
      acao: 'UPDATE_CONFIG',
      recurso: 'system',
      detalhes: `Alterou configuração ${chave} para ${valor}`,
      ip: '192.168.1.105',
      timestamp: new Date(),
      nivel: 'info'
    }
    setLogsAuditoria(prev => [log, ...prev])
  }

  const formatarData = (date: Date) => {
    return date.toLocaleString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const obterCorStatus = (status: Usuario['status']) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-800'
      case 'inativo': return 'bg-gray-100 text-gray-800'
      case 'suspenso': return 'bg-red-100 text-red-800'
    }
  }

  const obterCorNivelLog = (nivel: LogAuditoria['nivel']) => {
    switch (nivel) {
      case 'info': return 'bg-blue-100 text-blue-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'error': return 'bg-red-100 text-red-800'
      case 'critical': return 'bg-purple-100 text-purple-800'
    }
  }

  const usuariosFiltrados = usuarios.filter(usuario =>
    usuario.nome.toLowerCase().includes(filtroUsuarios.toLowerCase()) ||
    usuario.email.toLowerCase().includes(filtroUsuarios.toLowerCase()) ||
    usuario.departamento.toLowerCase().includes(filtroUsuarios.toLowerCase())
  )

  const logsFiltrados = logsAuditoria.filter(log =>
    log.usuario.toLowerCase().includes(filtroLogs.toLowerCase()) ||
    log.acao.toLowerCase().includes(filtroLogs.toLowerCase()) ||
    log.detalhes.toLowerCase().includes(filtroLogs.toLowerCase())
  )

  // Simular atualização de métricas em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setMetricas(prev => ({
        ...prev,
        apiCalls: prev.apiCalls + Math.floor(Math.random() * 10),
        uptime: 99.9 + (Math.random() * 0.1),
        storageUsado: prev.storageUsado + (Math.random() - 0.5) * 0.1
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="h-[700px] overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Painel Administrativo - Sistema Empresarial</CardTitle>
            <div className="flex gap-2">
              <Dialog open={modalNovoUsuario} onOpenChange={setModalNovoUsuario}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">
                    <LucideIcons.Plus className="h-4 w-4 mr-1" />
                    Novo Usuário
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Novo Usuário</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input
                        id="nome"
                        value={novoUsuario.nome}
                        onChange={(e) => setNovoUsuario(prev => ({ ...prev, nome: e.target.value }))}
                        placeholder="Nome do usuário"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={novoUsuario.email}
                        onChange={(e) => setNovoUsuario(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="email@empresa.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="departamento">Departamento</Label>
                      <Input
                        id="departamento"
                        value={novoUsuario.departamento}
                        onChange={(e) => setNovoUsuario(prev => ({ ...prev, departamento: e.target.value }))}
                        placeholder="TI, RH, Marketing..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="role">Função</Label>
                      <Select 
                        value={novoUsuario.role} 
                        onValueChange={(role) => setNovoUsuario(prev => ({ ...prev, role: role as Usuario['role'] }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map(role => (
                            <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Permissões</Label>
                      <div className="max-h-32 overflow-y-auto border rounded p-2 space-y-2">
                        {permissions.map(perm => (
                          <div key={perm.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={perm.id}
                              checked={novoUsuario.permissions.includes(perm.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setNovoUsuario(prev => ({
                                    ...prev,
                                    permissions: [...prev.permissions, perm.id]
                                  }))
                                } else {
                                  setNovoUsuario(prev => ({
                                    ...prev,
                                    permissions: prev.permissions.filter(p => p !== perm.id)
                                  }))
                                }
                              }}
                              className="rounded"
                            />
                            <label htmlFor={perm.id} className="text-sm">{perm.label}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button onClick={criarUsuario} className="w-full">
                      Criar Usuário
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button size="sm" variant="outline">
                <LucideIcons.Download className="h-4 w-4 mr-1" />
                Backup
              </Button>
            </div>
          </div>
          
          {/* Abas de navegação */}
          <div className="flex gap-1 mt-4">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: 'BarChart3' },
              { id: 'usuarios', label: 'Usuários', icon: 'Users' },
              { id: 'permissoes', label: 'Permissões', icon: 'Shield' },
              { id: 'auditoria', label: 'Auditoria', icon: 'FileText' },
              { id: 'configuracoes', label: 'Config', icon: 'Settings' }
            ].map(aba => (
              <Button
                key={aba.id}
                variant={abaDashboard === aba.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setAbaDashboard(aba.id as any)}
                className="text-xs"
              >
                <LucideIcons.BarChart3 className="h-3 w-3 mr-1" />
                {aba.label}
              </Button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="h-[580px]">
            {/* Dashboard */}
            {abaDashboard === 'dashboard' && (
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Total Usuários</p>
                          <p className="text-2xl font-bold">{metricas.totalUsuarios}</p>
                        </div>
                        <LucideIcons.Users className="h-8 w-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Usuários Ativos</p>
                          <p className="text-2xl font-bold text-green-600">{metricas.usuariosAtivos}</p>
                        </div>
                        <LucideIcons.UserCheck className="h-8 w-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Logins Mês</p>
                          <p className="text-2xl font-bold">{metricas.loginsMes.toLocaleString()}</p>
                        </div>
                        <LucideIcons.LogIn className="h-8 w-8 text-purple-500" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Uptime</p>
                          <p className="text-2xl font-bold text-green-600">{metricas.uptime.toFixed(1)}%</p>
                        </div>
                        <LucideIcons.Activity className="h-8 w-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Estatísticas do Sistema</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Storage Utilizado</span>
                            <span>{metricas.storageUsado.toFixed(1)}%</span>
                          </div>
                          <Progress value={metricas.storageUsado} className="h-2" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 pt-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">{metricas.apiCalls.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">API Calls Hoje</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-red-600">{metricas.alerts}</p>
                            <p className="text-sm text-gray-600">Alertas Ativos</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Atividade Recente</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {logsAuditoria.slice(0, 5).map(log => (
                          <div key={log.id} className="flex items-start gap-3 p-2 bg-gray-50 rounded">
                            <Badge className={`text-xs ${obterCorNivelLog(log.nivel)}`}>
                              {log.nivel}
                            </Badge>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{log.acao}</p>
                              <p className="text-xs text-gray-600 truncate">{log.detalhes}</p>
                              <p className="text-xs text-gray-500">{formatarData(log.timestamp)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Gestão de Usuários */}
            {abaDashboard === 'usuarios' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Gestão de Usuários</h3>
                  <Input
                    placeholder="Buscar usuários..."
                    value={filtroUsuarios}
                    onChange={(e) => setFiltroUsuarios(e.target.value)}
                    className="max-w-xs"
                  />
                </div>
                
                <ScrollArea className="h-[480px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Último Login</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usuariosFiltrados.map(usuario => {
                        const role = roles.find(r => r.value === usuario.role)
                        return (
                          <TableRow key={usuario.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{usuario.nome}</div>
                                <div className="text-sm text-gray-500">{usuario.departamento}</div>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">{usuario.email}</TableCell>
                            <TableCell>
                              <Badge className={role?.color}>
                                {role?.label}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={obterCorStatus(usuario.status)}>
                                {usuario.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              {formatarData(usuario.ultimoLogin)}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setUsuarioSelecionado(
                                    usuarioSelecionado === usuario.id ? null : usuario.id
                                  )}
                                >
                                  <LucideIcons.Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant={usuario.status === 'ativo' ? 'destructive' : 'default'}
                                  onClick={() => alternarStatusUsuario(usuario.id)}
                                >
                                  {usuario.status === 'ativo' ? 
                                    <LucideIcons.UserX className="h-3 w-3" /> :
                                    <LucideIcons.UserCheck className="h-3 w-3" />
                                  }
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </ScrollArea>

                {usuarioSelecionado && (
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle className="text-lg">Detalhes do Usuário</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {(() => {
                        const usuario = usuarios.find(u => u.id === usuarioSelecionado)
                        if (!usuario) return null

                        return (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">Informações Básicas</h4>
                              <div className="space-y-1 text-sm">
                                <p><strong>ID:</strong> {usuario.id}</p>
                                <p><strong>Criado em:</strong> {formatarData(usuario.criadoEm)}</p>
                                <p><strong>Departamento:</strong> {usuario.departamento}</p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Permissões</h4>
                              <div className="space-y-1">
                                {usuario.permissions.map(perm => {
                                  const permissao = permissions.find(p => p.id === perm)
                                  return permissao ? (
                                    <Badge key={perm} variant="outline" className="text-xs mr-1">
                                      {permissao.label}
                                    </Badge>
                                  ) : null
                                })}
                              </div>
                            </div>
                          </div>
                        )
                      })()}
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Sistema de Permissões */}
            {abaDashboard === 'permissoes' && (
              <div className="p-6">
                <h3 className="font-semibold mb-4">Sistema de Permissões</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Roles e Permissões</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {roles.map(role => (
                          <div key={role.value} className="border rounded p-3">
                            <div className="flex items-center justify-between mb-2">
                              <Badge className={role.color}>
                                {role.label}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {usuarios.filter(u => u.role === role.value).length} usuários
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">
                              Permissões padrão para este role
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Permissões Disponíveis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(permissions.reduce((acc, perm) => {
                          if (!acc[perm.categoria]) {
                            acc[perm.categoria] = []
                          }
                          acc[perm.categoria].push(perm)
                          return acc
                        }, {} as Record<string, typeof permissions>)).map(([categoria, perms]) => (
                          <div key={categoria} className="border rounded p-3">
                            <h4 className="font-medium mb-2">{categoria}</h4>
                            <div className="space-y-1">
                              {perms.map(perm => (
                                <div key={perm.id} className="flex items-center justify-between">
                                  <span className="text-sm">{perm.label}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {usuarios.filter(u => u.permissions.includes(perm.id)).length}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Logs de Auditoria */}
            {abaDashboard === 'auditoria' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Logs de Auditoria</h3>
                  <Input
                    placeholder="Buscar logs..."
                    value={filtroLogs}
                    onChange={(e) => setFiltroLogs(e.target.value)}
                    className="max-w-xs"
                  />
                </div>
                
                <ScrollArea className="h-[480px]">
                  <div className="space-y-2">
                    {logsFiltrados.map(log => (
                      <Card key={log.id} className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className={`text-xs ${obterCorNivelLog(log.nivel)}`}>
                                {log.nivel.toUpperCase()}
                              </Badge>
                              <span className="font-medium">{log.acao}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{log.detalhes}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>Usuário: {log.usuario}</span>
                              <span>IP: {log.ip}</span>
                              <span>Recurso: {log.recurso}</span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatarData(log.timestamp)}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            {/* Configurações */}
            {abaDashboard === 'configuracoes' && (
              <div className="p-6">
                <h3 className="font-semibold mb-4">Configurações do Sistema</h3>
                
                <div className="space-y-6">
                  {Object.entries(configuracoes.reduce((acc, config) => {
                    if (!acc[config.categoria]) {
                      acc[config.categoria] = []
                    }
                    acc[config.categoria].push(config)
                    return acc
                  }, {} as Record<string, typeof configuracoes>)).map(([categoria, configs]) => (
                    <Card key={categoria}>
                      <CardHeader>
                        <CardTitle className="text-lg capitalize">{categoria}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {configs.map(config => (
                            <div key={config.chave} className="flex items-center justify-between p-3 border rounded">
                              <div className="flex-1">
                                <h4 className="font-medium">{config.chave.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h4>
                                <p className="text-sm text-gray-600">{config.descricao}</p>
                              </div>
                              <div className="ml-4">
                                {config.tipo === 'boolean' ? (
                                  <Switch
                                    checked={config.valor as boolean}
                                    onCheckedChange={(checked) => atualizarConfiguracao(config.chave, checked)}
                                  />
                                ) : config.tipo === 'number' ? (
                                  <Input
                                    type="number"
                                    value={config.valor as number}
                                    onChange={(e) => atualizarConfiguracao(config.chave, parseInt(e.target.value))}
                                    className="w-20"
                                  />
                                ) : (
                                  <Input
                                    value={config.valor as string}
                                    onChange={(e) => atualizarConfiguracao(config.chave, e.target.value)}
                                    className="w-32"
                                  />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-4 text-center">
        <div className="flex justify-center gap-6 text-xs text-gray-500 mb-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>Gestão de Usuários</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Controle de Permissões</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Auditoria e Logs</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Configurações</span>
          </div>
        </div>
        <p className="text-xs text-gray-400">
          Crie usuários • Configure permissões • Monitore atividades • Ajuste configurações • Gerencie sistema
        </p>
      </div>
    </div>
  )
}

export default AdminPanelCompletePreview 