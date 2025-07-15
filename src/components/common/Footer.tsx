// components/common/Footer.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import * as LucideIcons from 'lucide-react'
import { perfilPessoal } from '@/data/perfil'

const Footer = () => {
  const anoAtual = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sobre */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/logo.svg"
                alt="Marcos Bricches Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-semibold">Marcos Bricches</span>
            </div>
            <p className="text-gray-400 max-w-md">
              Product Designer especializado em metodologias AI-Enhanced. 
              Transformando ideias em interfaces funcionais com alta performance.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">Início</Link></li>
              <li><Link href="/cases" className="hover:text-white transition-colors">Cases</Link></li>
              <li><Link href="/metodologia" className="hover:text-white transition-colors">Metodologia</Link></li>
              <li><Link href="/sobre" className="hover:text-white transition-colors">Sobre</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <div className="space-y-3">
              <a 
                href={perfilPessoal.contato.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <LucideIcons.Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
              <a 
                href={perfilPessoal.contato.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <LucideIcons.Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
              <a 
                href={`mailto:${perfilPessoal.contato.email}`}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <LucideIcons.Mail className="h-4 w-4" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {anoAtual} Marcos Bricches. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer