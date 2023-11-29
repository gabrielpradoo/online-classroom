import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar'
import 'tailwindcss/tailwind.css'
import './globals.css'

import { Providers } from './Providers'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LinkHub',
  description: 'Agende sua aula particular online com facilidade!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
