// app/layout.tsx
'use client'

import React from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import Navigation from '@/components/common/Navigation'
import Footer from '@/components/common/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Navigation />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}