import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { ThemeProvider } from '@/components/theme-provider'
import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Save Rosemary Heights - Community Blog',
    template: '%s | Save Rosemary Heights'
  },
  description: 'A community blog dedicated to preserving and protecting the Rosemary Heights neighborhood. Stay informed about local issues, community events, and initiatives.',
  keywords: ['Rosemary Heights', 'community', 'neighborhood', 'Surrey', 'preservation', 'local issues', 'British Columbia', 'Canada', 'environmental protection', 'urban planning'],
  authors: [{ name: 'Save Rosemary Heights Community', url: 'https://saverosemaryheights.com' }],
  creator: 'Save Rosemary Heights',
  publisher: 'Save Rosemary Heights',
  category: 'Community Organization',
  classification: 'Community',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://saverosemaryheights.com'),
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: '/',
    title: 'Save Rosemary Heights - Community Blog',
    description: 'A community blog dedicated to preserving and protecting the Rosemary Heights neighborhood. Join our community organization fighting for environmental protection and responsible urban planning in Surrey, BC.',
    siteName: 'Save Rosemary Heights',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Save Rosemary Heights - Community Organization',
        type: 'image/jpeg',
      },
    ],
    emails: ['saverosemaryheights@gmail.com'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Save Rosemary Heights - Community Blog',
    description: 'A community blog dedicated to preserving and protecting the Rosemary Heights neighborhood.',
    images: ['/og-image.jpg'],
    creator: '@SaveRosemaryHeights',
    site: '@SaveRosemaryHeights',
  },
  facebook: {
    admins: ['SaveRosemaryHeights'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
    other: {
      'msvalidate.01': [process.env.BING_SITE_VERIFICATION || ''],
    },
  },
  applicationName: 'Save Rosemary Heights',
  referrer: 'origin-when-cross-origin',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Save Rosemary Heights',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#22c55e',
    'msapplication-config': '/browserconfig.xml',
    'format-detection': 'telephone=no',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#22c55e' },
    { media: '(prefers-color-scheme: dark)', color: '#16a34a' }
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Save Rosemary Heights',
    description: 'A community organization dedicated to preserving and protecting the Rosemary Heights neighborhood',
    url: 'https://saverosemaryheights.com',
    logo: 'https://saverosemaryheights.com/logos/logo-512.png',
    email: 'saverosemaryheights@gmail.com',
    sameAs: [
      'https://www.facebook.com/SaveRosemaryHeights/',
      'https://signup.saverosemaryheights.com/'
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Surrey',
      addressRegion: 'BC',
      addressCountry: 'CA'
    },
    areaServed: {
      '@type': 'Place',
      name: 'Rosemary Heights, Surrey, BC, Canada'
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false}>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
