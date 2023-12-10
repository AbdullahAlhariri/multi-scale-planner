import React from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { SpeedInsights } from "@vercel/speed-insights/next"
import './globals.css';

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: 'MSP | Multi scale planner',
    description: 'Multi scale planner tool',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    // TODO Add dark mode support

    const value = {
        cssTransition: false,
        ripple: true,
    };

  return (
    <PrimeReactProvider value={value}>
        <html lang="en">
        <body className="bg-background text-foreground">
            <main className="min-h-screen flex flex-col items-center">
                {children}
            </main>
            <SpeedInsights/>
          </body>
        </html>
    </PrimeReactProvider>
  )
}
