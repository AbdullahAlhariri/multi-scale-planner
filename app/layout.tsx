import React from 'react';
import './globals.css';
import "primereact/resources/themes/lara-light-teal/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import { SpeedInsights } from "@vercel/speed-insights/next"
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
