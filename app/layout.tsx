import type { Metadata } from 'next'
import { Inter, Racing_Sans_One, Hedvig_Letters_Serif } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })
// const racing = Hedvig_Letters_Serif({weight: "400", subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark text-foreground bg-background`}>
        <Providers>
          {children}
        </Providers>  
      </body>
    </html>
  )
}
