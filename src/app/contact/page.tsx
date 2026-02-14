import { PageHeader } from '@/components/page-header'
import { Facebook, Mail, UserPlus } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Save Rosemary Heights',
  description: 'Get in touch with the Save Rosemary Heights community organization. Connect with us via Facebook, email, or join our community to help preserve Rosemary Heights neighborhood in Surrey, BC.',
  keywords: ['contact', 'Save Rosemary Heights', 'community organization', 'Surrey BC', 'get involved', 'volunteer'],
  openGraph: {
    title: 'Contact Save Rosemary Heights Community',
    description: 'Connect with our community organization dedicated to preserving Rosemary Heights. Join us in protecting our neighborhood and environment.',
    url: '/contact',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Save Rosemary Heights',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Save Rosemary Heights Community',
    description: 'Connect with our community organization dedicated to preserving Rosemary Heights.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Contact Us"
        description="Connect with our community organization and get involved in preserving Rosemary Heights."
        badge="Get In Touch"
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Connect With Us
          </h2>
          
          <div className="space-y-6">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/SaveRosemaryHeights/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Facebook className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Facebook</h3>
                <p className="text-gray-600 dark:text-gray-300">Follow us on Facebook for updates and community news</p>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:saverosemaryheights@gmail.com"
              className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Mail className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                <p className="text-gray-600 dark:text-gray-300">Send us an email at saverosemaryheights@gmail.com</p>
              </div>
            </a>

            {/* Signup */}
            <a
              href="https://mailchi.mp/18b87d6bba01/save-rosemary-heights"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <UserPlus className="w-8 h-8 text-purple-600" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Join Our Community</h3>
                <p className="text-gray-600 dark:text-gray-300">Sign up to get involved and stay informed</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
