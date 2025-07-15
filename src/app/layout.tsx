// app/layout.tsx
import React from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import Navigation from '@/components/common/Navigation'
import Footer from '@/components/common/Footer'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Marcos Bricches - Product Designer AI-Enhanced',
    template: '%s | Marcos Bricches'
  },
  description: 'Product Designer especializado em metodologia AI-Enhanced. Acelero entregas, melhoro qualidade e inovo processos através da combinação de design centrado no usuário com inteligência artificial.',
  keywords: ['Product Design', 'UX/UI', 'Inteligência Artificial', 'AI-Enhanced', 'Design Thinking', 'Next.js', 'TypeScript'],
  authors: [{ name: 'Marcos Bricches' }],
  creator: 'Marcos Bricches',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://marcosbricches.com',
    siteName: 'Marcos Bricches Portfolio',
    title: 'Marcos Bricches - Product Designer AI-Enhanced',
    description: 'Product Designer especializado em metodologia AI-Enhanced. Acelero entregas, melhoro qualidade e inovo processos através da combinação de design centrado no usuário com inteligência artificial.',
    images: [
      {
        url: '/marcos-bricches.png',
        width: 1200,
        height: 630,
        alt: 'Marcos Bricches - Product Designer AI-Enhanced',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marcos Bricches - Product Designer AI-Enhanced',
    description: 'Product Designer especializado em metodologia AI-Enhanced. Acelero entregas, melhoro qualidade e inovo processos.',
    images: ['/marcos-bricches.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
}

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