import type { Metadata } from 'next'
import Script from 'next/script'
import { Suspense, type ReactNode } from 'react'

import { Analytics } from '../components/analytics'
import { trackingId } from '../lib/google-analytics'
import { PageViewTracker } from './_components/page-view-tracker'

import 'highlight.js/styles/github-dark-dimmed.min.css'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Christoffer Artmann',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' }
    ],
    apple: '/apple-touch-icon.png'
  }
}

export default function RootLayout({
  children
}: {
  children: ReactNode
}): ReactNode {
  const isProduction = process.env.NODE_ENV === 'production'

  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&family=Special+Elite&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="text-gray-700 antialiased">
        {isProduction && trackingId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
              strategy="afterInteractive"
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${trackingId}', { page_path: window.location.pathname });
                `
              }}
            />
          </>
        )}

        <Analytics />
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>

        {children}
      </body>
    </html>
  )
}
