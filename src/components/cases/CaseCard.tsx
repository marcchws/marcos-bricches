// components/cases/CaseCard.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import * as LucideIcons from 'lucide-react'
import { Case } from '@/types'

interface CaseCardProps {
  caso: Case
}

const CaseCard: React.FC<CaseCardProps> = ({ caso }) => {
  const getComplexidadeCor = (complexidade: string) => {
    switch (complexidade) {
      case 'basico': return 'bg-green-100 text-green-800'
      case 'medio': return 'bg-yellow-100 text-yellow-800'
      case 'avançado': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTipoCor = (tipo: string) => {
    switch (tipo) {
      case 'gerado': return 'bg-blue-100 text-blue-800'
      case 'produto-completo': return 'bg-purple-100 text-purple-800'
      case 'meta-case': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTempoIcon = (tempo: string) => {
    switch (tempo) {
      case '<30min': return 'Zap'
      case '30min-2h': return 'Clock'
      case '2h-6h': return 'Clock3'
      case '>6h': return 'Clock9'
      default: return 'Clock'
    }
  }

  const formatarTempo = (tempo: string) => {
    switch (tempo) {
      case '<30min': return 'Menos de 30min'
      case '30min-2h': return '30min - 2h'
      case '2h-6h': return '2h - 6h'
      case '>6h': return 'Mais de 6h'
      default: return tempo
    }
  }

  const TempoIcon = LucideIcons[getTempoIcon(caso.tempoDesenvolvimento) as keyof typeof LucideIcons] as any

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <Badge className={getTipoCor(caso.tipo)} variant="outline">
              {caso.tipo === 'gerado' && 'Gerado'}
              {caso.tipo === 'produto-completo' && 'Produto Completo'}
              {caso.tipo === 'meta-case' && 'Meta Case'}
            </Badge>
            <Badge className={getComplexidadeCor(caso.complexidade)} variant="outline">
              {caso.complexidade}
            </Badge>
          </div>
          {caso.destaque && (
            <LucideIcons.Star className="h-4 w-4 text-yellow-500 fill-current" />
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
          {caso.titulo}
        </h3>
        
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <LucideIcons.Tag className="h-3 w-3" />
            {caso.categoria}
          </div>
          <div className="flex items-center gap-1">
            <TempoIcon className="h-3 w-3" />
            {formatarTempo(caso.tempoDesenvolvimento)}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">

        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {caso.descricao}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {caso.tecnologias.slice(0, 3).map((tech, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {caso.tecnologias.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{caso.tecnologias.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            {caso.github_url && (
              <Button variant="ghost" size="sm" asChild>
                <a href={caso.github_url} target="_blank" rel="noopener noreferrer">
                  <LucideIcons.Github className="h-4 w-4" />
                </a>
              </Button>
            )}
            {caso.notion_url && (
              <Button variant="ghost" size="sm" asChild>
                <a href={caso.notion_url} target="_blank" rel="noopener noreferrer">
                  <LucideIcons.ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
          
          <Button asChild size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <Link href={`/cases/${caso.id}`}>
              Ver Detalhes
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default CaseCard