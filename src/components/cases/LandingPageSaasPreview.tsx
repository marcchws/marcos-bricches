// components/cases/LandingPageSaasPreview.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import * as LucideIcons from 'lucide-react'

interface Feature {
  id: string
  icon: string
  titulo: string
  descricao: string
  destaque: boolean
}

interface PricingPlan {
  id: string
  nome: string
  preco: number
  periodo: string
  recursos: string[]
  popular: boolean
  cor: string
}

interface Testimonial {
  id: string
  nome: string
  cargo: string
  empresa: string
  depoimento: string
  avatar: string
  rating: number
}

const LandingPageSaasPreview: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'hero' | 'features' | 'pricing' | 'testimonials' | 'cta'>('hero')
  const [loading, setLoading] = useState(false)
  const [emailNewsletter, setEmailNewsletter] = useState('')
  const [showDemo, setShowDemo] = useState(false)
  const [metrics, setMetrics] = useState({
    usuarios_ativos: 0,
    empresas_usando: 0,
    tempo_economia: 0,
    satisfacao: 0
  })

  const features: Feature[] = [
    {
      id: '1',
      icon: 'Zap',
      titulo: 'Performance Otimizada',
      descricao: 'Carregamento ultra-rápido com Core Web Vitals otimizados',
      destaque: true
    },
    {
      id: '2',
      icon: 'Shield',
      titulo: 'Segurança Avançada',
      descricao: 'Proteção completa com SSL, GDPR e backups automáticos',
      destaque: false
    },
    {
      id: '3',
      icon: 'Smartphone',
      titulo: 'Mobile-First',
      descricao: 'Design responsivo perfeito em todos os dispositivos',
      destaque: true
    },
    {
      id: '4',
      icon: 'BarChart3',
      titulo: 'Analytics Integrado',
      descricao: 'Relatórios detalhados e insights de conversão',
      destaque: false
    },
    {
      id: '5',
      icon: 'Palette',
      titulo: 'Customização Total',
      descricao: 'Editor visual para personalizar cores, fontes e layout',
      destaque: true
    },
    {
      id: '6',
      icon: 'Users',
      titulo: 'Colaboração em Equipe',
      descricao: 'Trabalhe em equipe com comentários e aprovações',
      destaque: false
    }
  ]

  const pricingPlans: PricingPlan[] = [
    {
      id: 'starter',
      nome: 'Starter',
      preco: 29,
      periodo: 'mês',
      recursos: [
        '1 Landing Page',
        'Templates Básicos',
        'SSL Incluído',
        'Support Email'
      ],
      popular: false,
      cor: 'from-gray-500 to-gray-600'
    },
    {
      id: 'pro',
      nome: 'Professional',
      preco: 79,
      periodo: 'mês',
      recursos: [
        '5 Landing Pages',
        'Templates Premium',
        'Analytics Avançado',
        'A/B Testing',
        'Support Prioritário',
        'Integrações'
      ],
      popular: true,
      cor: 'from-indigo-500 to-blue-600'
    },
    {
      id: 'enterprise',
      nome: 'Enterprise',
      preco: 199,
      periodo: 'mês',
      recursos: [
        'Landing Pages Ilimitadas',
        'White Label',
        'API Personalizada',
        'Gerente Dedicado',
        'SLA 99.9%',
        'Treinamento Incluso'
      ],
      popular: false,
      cor: 'from-purple-500 to-pink-600'
    }
  ]

  const testimonials: Testimonial[] = [
    {
      id: '1',
      nome: 'Ana Silva',
      cargo: 'CEO',
      empresa: 'TechStart',
      depoimento: 'Aumentamos nossa conversão em 300% em apenas 2 meses. A plataforma é incrível!',
      avatar: 'AS',
      rating: 5
    },
    {
      id: '2',
      nome: 'Carlos Mendes',
      cargo: 'Marketing Director',
      empresa: 'Growth Corp',
      depoimento: 'Interface intuitiva e resultados comprovados. Recomendo para qualquer empresa.',
      avatar: 'CM',
      rating: 5
    },
    {
      id: '3',
      nome: 'Marina Costa',
      cargo: 'Founder',
      empresa: 'SaaS Innovations',
      depoimento: 'O ROI foi imediato. Em 30 dias já recuperamos o investimento.',
      avatar: 'MC',
      rating: 5
    }
  ]

  // Simular carregamento de métricas
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        usuarios_ativos: Math.min(prev.usuarios_ativos + Math.random() * 100, 25000),
        empresas_usando: Math.min(prev.empresas_usando + Math.random() * 10, 1200),
        tempo_economia: Math.min(prev.tempo_economia + Math.random() * 2, 85),
        satisfacao: Math.min(prev.satisfacao + Math.random() * 1, 98.5)
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    setTimeout(() => {
      setLoading(false)
      setEmailNewsletter('')
      alert('Sucesso! Você foi inscrito na nossa newsletter.')
    }, 1500)
  }

  const IconComponent = ({ name }: { name: string }) => {
    const Icon = (LucideIcons as any)[name] || LucideIcons.Circle
    return <Icon className="w-8 h-8" />
  }

  const renderHeroSection = () => (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-lg">
      <div className="text-center max-w-4xl mx-auto">
        <Badge className="mb-4 bg-indigo-100 text-indigo-800">
          🚀 Novo: Templates com IA
        </Badge>
        
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Crie Landing Pages que{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Convertem
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Aumente suas vendas em até 300% com nossas landing pages otimizadas. 
          Design profissional, performance garantida e resultados comprovados.
        </p>

        {/* Métricas Hero */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">
              {Math.round(metrics.usuarios_ativos).toLocaleString()}+
            </div>
            <div className="text-sm text-gray-600">Usuários Ativos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">
              {Math.round(metrics.empresas_usando)}+
            </div>
            <div className="text-sm text-gray-600">Empresas Usando</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">
              {Math.round(metrics.tempo_economia)}%
            </div>
            <div className="text-sm text-gray-600">Menos Tempo</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">
              {metrics.satisfacao.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Satisfação</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-indigo-600 hover:bg-indigo-700"
            onClick={() => setShowDemo(true)}
          >
            <LucideIcons.Play className="w-5 h-5 mr-2" />
            Ver Demo Grátis
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => setActiveSection('pricing')}
          >
            Ver Preços
          </Button>
        </div>

        {/* Newsletter */}
        <form onSubmit={handleNewsletterSubmit} className="mt-8 max-w-md mx-auto">
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              value={emailNewsletter}
              onChange={(e) => setEmailNewsletter(e.target.value)}
              required
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={loading}
              variant="secondary"
            >
              {loading ? (
                <LucideIcons.Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Inscrever'
              )}
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            📧 Receba dicas de conversão e novos templates
          </p>
        </form>
      </div>
    </div>
  )

  const renderFeaturesSection = () => (
    <div className="p-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Tudo que você precisa para converter mais
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Recursos profissionais que garantem o máximo de performance e conversão
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Card 
            key={feature.id} 
            className={`relative overflow-hidden transition-all hover:shadow-lg ${
              feature.destaque ? 'border-indigo-200 bg-indigo-50/50' : ''
            }`}
          >
            {feature.destaque && (
              <div className="absolute top-0 right-0">
                <Badge className="bg-indigo-600 text-white rounded-none rounded-bl-lg">
                  Popular
                </Badge>
              </div>
            )}
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  feature.destaque 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  <IconComponent name={feature.icon} />
                </div>
                <h3 className="font-semibold text-gray-900">{feature.titulo}</h3>
              </div>
              <p className="text-gray-600 text-sm">{feature.descricao}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderPricingSection = () => (
    <div className="p-8 bg-gray-50 rounded-lg">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Escolha o plano ideal para você
        </h2>
        <p className="text-gray-600">
          Preços transparentes, sem taxas escondidas. Cancele quando quiser.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {pricingPlans.map((plan) => (
          <Card 
            key={plan.id}
            className={`relative overflow-hidden transition-all hover:shadow-xl ${
              plan.popular ? 'border-indigo-200 scale-105' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-0 right-0">
                <div className="bg-indigo-600 text-white text-center py-2 text-sm font-medium">
                  Mais Popular
                </div>
              </div>
            )}
            <CardContent className={`p-6 ${plan.popular ? 'pt-14' : ''}`}>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.nome}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">R${plan.preco}</span>
                  <span className="text-gray-600">/{plan.periodo}</span>
                </div>
                <Button 
                  className={`w-full mb-6 ${
                    plan.popular 
                      ? 'bg-indigo-600 hover:bg-indigo-700' 
                      : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                >
                  Começar Agora
                </Button>
                <ul className="space-y-3 text-left">
                  {plan.recursos.map((recurso, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <LucideIcons.Check className="w-4 h-4 text-green-600" />
                      {recurso}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-600 mb-4">
          💳 Aceitamos todos os cartões • 🔒 Pagamento seguro • 📞 Suporte 24/7
        </p>
        <Button variant="outline">
          <LucideIcons.Calculator className="w-4 h-4 mr-2" />
          Calcular ROI
        </Button>
      </div>
    </div>
  )

  const renderTestimonialsSection = () => (
    <div className="p-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          O que nossos clientes dizem
        </h2>
        <p className="text-gray-600">
          Resultados reais de empresas que transformaram suas conversões
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <LucideIcons.Star 
                    key={index} 
                    className="w-4 h-4 fill-yellow-400 text-yellow-400" 
                  />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-4">
                "{testimonial.depoimento}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-medium">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{testimonial.nome}</div>
                  <div className="text-sm text-gray-600">
                    {testimonial.cargo} • {testimonial.empresa}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button variant="outline">
          <LucideIcons.Users className="w-4 h-4 mr-2" />
          Ver Mais Depoimentos
        </Button>
      </div>
    </div>
  )

  const renderCTASection = () => (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-8 rounded-lg text-white text-center">
      <h2 className="text-3xl font-bold mb-4">
        Pronto para aumentar suas conversões?
      </h2>
      <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
        Junte-se a mais de 1.200 empresas que já aumentaram suas vendas com nossas landing pages.
        Comece seu teste gratuito hoje mesmo!
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
        <Button 
          size="lg" 
          variant="secondary"
          className="bg-white text-indigo-600 hover:bg-gray-50"
        >
          <LucideIcons.Zap className="w-5 h-5 mr-2" />
          Começar Teste Grátis
        </Button>
        <Button 
          size="lg" 
          variant="outline"
          className="border-white text-white hover:bg-white/10"
        >
          <LucideIcons.Calendar className="w-5 h-5 mr-2" />
          Agendar Demo
        </Button>
      </div>

      <div className="text-sm text-indigo-100">
        ✅ 14 dias grátis • ✅ Sem cartão de crédito • ✅ Suporte incluso
      </div>
    </div>
  )

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg overflow-hidden">
      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="flex flex-wrap gap-1 p-2">
          {[
            { id: 'hero', label: 'Hero', icon: 'Home' },
            { id: 'features', label: 'Features', icon: 'Star' },
            { id: 'pricing', label: 'Pricing', icon: 'DollarSign' },
            { id: 'testimonials', label: 'Testimonials', icon: 'MessageCircle' },
            { id: 'cta', label: 'CTA', icon: 'Zap' }
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as any)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <IconComponent name={section.icon} />
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="min-h-[600px]">
        {activeSection === 'hero' && renderHeroSection()}
        {activeSection === 'features' && renderFeaturesSection()}
        {activeSection === 'pricing' && renderPricingSection()}
        {activeSection === 'testimonials' && renderTestimonialsSection()}
        {activeSection === 'cta' && renderCTASection()}
      </div>

      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Demo da Landing Page</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowDemo(false)}
                >
                  <LucideIcons.X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LucideIcons.Play className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Demo Interativo</h3>
                <p className="text-gray-600 mb-6">
                  Explore todas as funcionalidades navegando pelas abas acima. 
                  Esta é uma demonstração completa da landing page.
                </p>
                <Button onClick={() => setShowDemo(false)}>
                  Continuar Explorando
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-gray-200 bg-gray-50 p-4 text-center text-sm text-gray-600">
        <div className="flex items-center justify-center gap-4">
          <span>📊 Métricas simuladas em tempo real</span>
          <span>•</span>
          <span>🎨 Design responsivo</span>
          <span>•</span>
          <span>⚡ Performance otimizada</span>
        </div>
      </div>
    </div>
  )
}

export default LandingPageSaasPreview 