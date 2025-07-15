// data/cases.ts
import { Case } from '@/types'

export const cases: Case[] = [
  {
    id: 'meta-case-portfolio',
    titulo: 'Portfolio Marcos Bricches',
    tipo: 'meta-case',
    complexidade: 'avançado',
    categoria: 'SaaS',
    descricao: 'Desenvolvimento do próprio portfólio usando a metodologia Product Design AI-Enhanced. Demonstração prática de como a metodologia acelera entregas mantendo alta qualidade.',
    funcionalidades: [
      'Sistema de navegação responsivo',
      'Filtros avançados para cases',
      'Hero section com métricas',
      'Design system consistente',
      'Tipagem TypeScript completa'
    ],
    tecnologias: ['Next.js', 'TypeScript', 'Tailwind', 'Shadcn/UI'],
    tempoDesenvolvimento: '2h-6h',
    tags: ['meta-case', 'portfolio', 'methodology', 'ai-enhanced'],
    destaque: true,
    cor_tema: 'from-purple-600 to-blue-600',
    data_criacao: '2024-01-15'
  },
  {
    id: 'dashboard-vendas-saas',
    titulo: 'Dashboard de Vendas SaaS',
    tipo: 'gerado',
    complexidade: 'avançado',
    categoria: 'Dashboard',
    descricao: 'Dashboard completo para gestão de vendas com métricas em tempo real, pipeline de oportunidades e análise de performance de vendedores.',
    funcionalidades: [
      'Métricas em tempo real',
      'Pipeline de oportunidades',
      'Análise de performance',
      'Filtros avançados',
      'Exportação de relatórios',
      'Gráficos interativos'
    ],
    tecnologias: ['React', 'TypeScript', 'Chart.js', 'Shadcn/UI'],
    tempoDesenvolvimento: '2h-6h',
    tags: ['dashboard', 'sales', 'analytics', 'real-time'],
    destaque: false,
    cor_tema: 'from-green-600 to-emerald-600',
    data_criacao: '2024-01-10'
  },
  {
    id: 'app-delivery-mobile',
    titulo: 'App de Delivery Mobile',
    tipo: 'gerado',
    complexidade: 'avançado',
    categoria: 'Mobile',
    descricao: 'Aplicativo mobile para delivery de comida com interface intuitiva, sistema de pedidos em tempo real e integração com pagamento.',
    funcionalidades: [
      'Interface mobile-first',
      'Sistema de pedidos',
      'Integração pagamento',
      'Rastreamento em tempo real',
      'Avaliações e reviews',
      'Carrinho inteligente'
    ],
    tecnologias: ['React Native', 'TypeScript', 'Expo', 'Stripe'],
    tempoDesenvolvimento: '>6h',
    tags: ['mobile', 'delivery', 'real-time', 'payments'],
    destaque: false,
    cor_tema: 'from-orange-600 to-red-600',
    data_criacao: '2024-01-08'
  },
  {
    id: 'crm-gestao-clientes',
    titulo: 'CRM para Gestão de Clientes',
    tipo: 'gerado',
    complexidade: 'avançado',
    categoria: 'CRM',
    descricao: 'Sistema completo de CRM com gestão de leads, pipeline de vendas, histórico de interações e automação de marketing.',
    funcionalidades: [
      'Gestão de leads',
      'Pipeline de vendas',
      'Histórico de interações',
      'Automação de marketing',
      'Relatórios avançados',
      'Integração com email'
    ],
    tecnologias: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
    tempoDesenvolvimento: '>6h',
    tags: ['crm', 'sales', 'automation', 'leads'],
    destaque: false,
    cor_tema: 'from-blue-600 to-indigo-600',
    data_criacao: '2024-01-05'
  },
  {
    id: 'ecommerce-marketplace',
    titulo: 'Marketplace E-commerce',
    tipo: 'gerado',
    complexidade: 'avançado',
    categoria: 'E-commerce',
    descricao: 'Plataforma de marketplace com múltiplos vendedores, sistema de pagamentos, gestão de estoque e avaliações.',
    funcionalidades: [
      'Múltiplos vendedores',
      'Sistema de pagamentos',
      'Gestão de estoque',
      'Sistema de avaliações',
      'Carrinho de compras',
      'Checkout otimizado'
    ],
    tecnologias: ['Next.js', 'TypeScript', 'Stripe', 'MongoDB'],
    tempoDesenvolvimento: '>6h',
    tags: ['ecommerce', 'marketplace', 'payments', 'multi-vendor'],
    destaque: false,
    cor_tema: 'from-purple-600 to-pink-600',
    data_criacao: '2024-01-03'
  },
  {
    id: 'fintech-dashboard',
    titulo: 'Dashboard FinTech',
    tipo: 'gerado',
    complexidade: 'avançado',
    categoria: 'FinTech',
    descricao: 'Dashboard financeiro completo com análise de investimentos, controle de gastos, metas financeiras e relatórios detalhados. Implementado com padrões defensivos específicos para dados financeiros críticos.',
    funcionalidades: [
      'Análise detalhada de portfolio de investimentos',
      'Controle de gastos com categorização automática',
      'Sistema de metas financeiras com acompanhamento',
      'Relatórios detalhados de performance',
      'Gráficos interativos com D3.js',
      'Alertas automáticos de mercado e metas',
      'Formatação monetária robusta e defensiva',
      'Estados UI específicos para dados financeiros',
      'Timeouts adaptativos para APIs financeiras',
      'Interface responsiva para mobile e desktop'
    ],
    tecnologias: ['React', 'TypeScript', 'D3.js', 'Node.js', 'Tailwind CSS'],
    tempoDesenvolvimento: '2h-6h',
    tags: ['fintech', 'investments', 'analytics', 'finance', 'dashboard', 'portfolio'],
    destaque: false,
    cor_tema: 'from-teal-600 to-cyan-600',
    data_criacao: '2024-01-01',
    github_url: 'https://github.com/marcos-bricches/fintech-dashboard'
  },
  {
    id: 'sistema-aprovacoes',
    titulo: 'Sistema de Aprovações',
    tipo: 'gerado',
    complexidade: 'medio',
    categoria: 'Workflow',
    descricao: 'Sistema completo de workflow para aprovações corporativas com múltiplos níveis, notificações automáticas, dashboard de pendências e histórico detalhado de decisões.',
    funcionalidades: [
      'Múltiplos níveis de aprovação configuráveis',
      'Notificações automáticas por email e sistema',
      'Dashboard de pendências para aprovadores',
      'Histórico completo de decisões e comentários',
      'Relatórios de performance e métricas',
      'Interface específica para solicitantes e aprovadores',
      'Estados de workflow com transições controladas',
      'Sistema de comentários e feedback',
      'Filtros avançados por status, tipo e prioridade',
      'Auditoria completa para compliance'
    ],
    tecnologias: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma'],
    tempoDesenvolvimento: '30min-2h',
    tags: ['workflow', 'approvals', 'notifications', 'automation', 'corporate'],
    destaque: false,
    cor_tema: 'from-yellow-600 to-orange-600',
    data_criacao: '2023-12-28',
    github_url: 'https://github.com/marcos-bricches/sistema-aprovacoes'
  },
  {
    id: 'task-manager-simple',
    titulo: 'Gerenciador de Tarefas',
    tipo: 'gerado',
    complexidade: 'basico',
    categoria: 'Workflow',
    descricao: 'Sistema simples de gerenciamento de tarefas com kanban board, filtros e notificações.',
    funcionalidades: [
      'Kanban board',
      'Filtros por status',
      'Notificações',
      'Drag and drop',
      'Busca rápida'
    ],
    tecnologias: ['React', 'TypeScript', 'Tailwind'],
    tempoDesenvolvimento: '<30min',
    tags: ['tasks', 'kanban', 'simple', 'productivity'],
    destaque: false,
    cor_tema: 'from-slate-600 to-gray-600',
    data_criacao: '2023-12-25'
  },
  {
    id: 'chat-app-real-time',
    titulo: 'Chat em Tempo Real',
    tipo: 'gerado',
    complexidade: 'medio',
    categoria: 'SaaS',
    descricao: 'Aplicativo de chat com mensagens em tempo real, salas de grupo e compartilhamento de arquivos.',
    funcionalidades: [
      'Mensagens em tempo real',
      'Salas de grupo',
      'Compartilhamento de arquivos',
      'Notificações push',
      'Status online/offline'
    ],
    tecnologias: ['Next.js', 'Socket.io', 'TypeScript', 'MongoDB'],
    tempoDesenvolvimento: '30min-2h',
    tags: ['chat', 'real-time', 'messaging', 'collaboration'],
    destaque: false,
    cor_tema: 'from-blue-600 to-purple-600',
    data_criacao: '2023-12-20'
  },
  {
    id: 'landing-page-saas',
    titulo: 'Landing Page SaaS',
    tipo: 'gerado',
    complexidade: 'basico',
    categoria: 'SaaS',
    descricao: 'Landing page otimizada para conversão com hero section, features, pricing e testimonials.',
    funcionalidades: [
      'Hero section otimizada',
      'Seção de features',
      'Pricing table',
      'Testimonials',
      'Call-to-actions'
    ],
    tecnologias: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
    tempoDesenvolvimento: '<30min',
    tags: ['landing', 'conversion', 'marketing', 'saas'],
    destaque: false,
    cor_tema: 'from-indigo-600 to-blue-600',
    data_criacao: '2023-12-18'
  },
  {
    id: 'admin-panel-complete',
    titulo: 'Painel Administrativo',
    tipo: 'gerado',
    complexidade: 'avançado',
    categoria: 'Dashboard',
    descricao: 'Painel administrativo completo com gestão de usuários, permissões, analytics e configurações do sistema.',
    funcionalidades: [
      'Gestão de usuários',
      'Sistema de permissões',
      'Analytics avançados',
      'Configurações do sistema',
      'Logs de auditoria',
      'Backup e restore'
    ],
    tecnologias: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis'],
    tempoDesenvolvimento: '>6h',
    tags: ['admin', 'permissions', 'analytics', 'system'],
    destaque: false,
    cor_tema: 'from-red-600 to-pink-600',
    data_criacao: '2023-12-15'
  },
  {
    id: 'mobile-banking-app',
    titulo: 'App de Mobile Banking',
    tipo: 'gerado',
    complexidade: 'avançado',
    categoria: 'FinTech',
    descricao: 'Aplicativo bancário mobile com transferências, pagamentos, investimentos e controle financeiro.',
    funcionalidades: [
      'Transferências PIX',
      'Pagamento de boletos',
      'Investimentos',
      'Controle financeiro',
      'Cartão virtual',
      'Biometria'
    ],
    tecnologias: ['React Native', 'TypeScript', 'Expo', 'Biometrics'],
    tempoDesenvolvimento: '>6h',
    tags: ['banking', 'mobile', 'payments', 'security'],
    destaque: false,
    cor_tema: 'from-green-600 to-teal-600',
    data_criacao: '2023-12-12'
  },
  {
    id: 'inventory-management',
    titulo: 'Gestão de Estoque',
    tipo: 'gerado',
    complexidade: 'medio',
    categoria: 'Workflow',
    descricao: 'Sistema de gestão de estoque com controle de entrada/saída, alertas de baixo estoque e relatórios.',
    funcionalidades: [
      'Controle entrada/saída',
      'Alertas de baixo estoque',
      'Relatórios de movimento',
      'Código de barras',
      'Fornecedores'
    ],
    tecnologias: ['React', 'TypeScript', 'Node.js', 'MySQL'],
    tempoDesenvolvimento: '30min-2h',
    tags: ['inventory', 'stock', 'alerts', 'reports'],
    destaque: false,
    cor_tema: 'from-amber-600 to-yellow-600',
    data_criacao: '2023-12-10'
  },
  {
    id: 'booking-system',
    titulo: 'Sistema de Reservas',
    tipo: 'gerado',
    complexidade: 'medio',
    categoria: 'SaaS',
    descricao: 'Sistema de reservas para restaurantes com calendário, gestão de mesas e confirmações automáticas.',
    funcionalidades: [
      'Calendário de reservas',
      'Gestão de mesas',
      'Confirmações automáticas',
      'Lista de espera',
      'Integração WhatsApp'
    ],
    tecnologias: ['Next.js', 'TypeScript', 'Calendar API', 'WhatsApp API'],
    tempoDesenvolvimento: '30min-2h',
    tags: ['booking', 'calendar', 'restaurant', 'automation'],
    destaque: false,
    cor_tema: 'from-violet-600 to-purple-600',
    data_criacao: '2023-12-08'
  },
  {
    id: 'social-media-scheduler',
    titulo: 'Agendador de Redes Sociais',
    tipo: 'gerado',
    complexidade: 'medio',
    categoria: 'SaaS',
    descricao: 'Ferramenta para agendamento de posts em múltiplas redes sociais com analytics e calendário editorial.',
    funcionalidades: [
      'Agendamento multi-plataforma',
      'Calendário editorial',
      'Analytics de engagement',
      'Biblioteca de mídia',
      'Aprovação de posts'
    ],
    tecnologias: ['Next.js', 'TypeScript', 'Social APIs', 'Cron Jobs'],
    tempoDesenvolvimento: '2h-6h',
    tags: ['social-media', 'scheduling', 'analytics', 'content'],
    destaque: false,
    cor_tema: 'from-pink-600 to-rose-600',
    data_criacao: '2023-12-05'
  }
]

// Função para filtrar cases
export const filtrarCases = (casos: Case[], filtros: any) => {
  return casos.filter(caso => {
    const matchTipo = filtros.tipo === 'todos' || caso.tipo === filtros.tipo
    const matchComplexidade = filtros.complexidade === 'todas' || caso.complexidade === filtros.complexidade
    const matchCategoria = filtros.categoria === 'todas' || caso.categoria === filtros.categoria
    const matchTempo = filtros.tempoDesenvolvimento === 'todos' || caso.tempoDesenvolvimento === filtros.tempoDesenvolvimento
    const matchDestaque = !filtros.destaque || caso.destaque
    const matchTecnologias = filtros.tecnologias.length === 0 || 
      filtros.tecnologias.some((tech: string) => caso.tecnologias.includes(tech))
    const matchBusca = !filtros.busca || 
      caso.titulo.toLowerCase().includes(filtros.busca.toLowerCase()) ||
      caso.descricao.toLowerCase().includes(filtros.busca.toLowerCase()) ||
      caso.tags.some(tag => tag.toLowerCase().includes(filtros.busca.toLowerCase()))
    
    return matchTipo && matchComplexidade && matchCategoria && 
           matchTempo && matchDestaque && matchTecnologias && matchBusca
  })
}

// Função para obter case por ID
export const obterCasePorId = (id: string): Case | undefined => {
  return cases.find(caso => caso.id === id)
}

// Função para obter cases em destaque
export const obterCasesDestaque = (): Case[] => {
  return cases.filter(caso => caso.destaque).slice(0, 6)
}

// Função para obter tecnologias únicas
export const obterTecnologiasUnicas = (): string[] => {
  const tecnologias = new Set<string>()
  cases.forEach(caso => {
    caso.tecnologias.forEach(tech => tecnologias.add(tech))
  })
  return Array.from(tecnologias).sort()
}