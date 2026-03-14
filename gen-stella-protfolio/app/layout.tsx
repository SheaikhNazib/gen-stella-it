import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gen Stella IT - Software Development Company',
  description: 'Professional software development and IT solutions | Gen Stella IT',
  generator: 'Gen Stella IT',
  icons: {
    icon: '/logo/GenStellaIT.jpeg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="font-sans antialiased bg-white dark:bg-slate-950">{children}</body>
    </html>
  )
}
