// components/common/Navigation.tsx
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import * as LucideIcons from 'lucide-react'

const Navigation = () => {
  const [menuAberto, setMenuAberto] = useState(false)
  const pathname = usePathname()

  const menuItens = [
    { href: '/', label: 'Início' },
    { href: '/cases', label: 'Cases' },
    { href: '/metodologia', label: 'Metodologia' },
    { href: '/sobre', label: 'Sobre' }
  ]

  const isAtivo = (href: string) => pathname === href

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MB</span>
            </div>
            <span className="font-semibold text-gray-900">Marcos Bricches</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItens.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-purple-600 ${
                  isAtivo(item.href) 
                    ? 'text-purple-600 border-b-2 border-purple-600 pb-1' 
                    : 'text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button 
              asChild 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Link href="/contato">Contato</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-gray-100"
          >
            {menuAberto ? (
              <LucideIcons.X className="h-6 w-6" />
            ) : (
              <LucideIcons.Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuAberto && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {menuItens.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuAberto(false)}
                className={`block py-2 text-sm font-medium transition-colors hover:text-purple-600 ${
                  isAtivo(item.href) ? 'text-purple-600' : 'text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button 
              asChild 
              className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600"
            >
              <Link href="/contato">Contato</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation