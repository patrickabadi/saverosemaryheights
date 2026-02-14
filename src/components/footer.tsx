import { Facebook, Heart, Mail, TreePine, UserPlus } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const navigation = {
    main: [
      { name: 'Home', href: '/' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
    ],
    social: [
      { name: 'Facebook', href: 'https://www.facebook.com/SaveRosemaryHeights/', icon: Facebook },
      { name: 'Email', href: 'mailto:saverosemaryheights@gmail.com', icon: Mail },
      { name: 'Signup', href: 'https://mailchi.mp/18b87d6bba01/save-rosemary-heights', icon: UserPlus },
    ],
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <TreePine className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Save Rosemary Heights</span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              A community blog dedicated to preserving and protecting our beloved Rosemary Heights neighborhood. 
              Together, we make a difference.
            </p>
            <div className="flex items-center space-x-2 text-gray-400">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm">Made with love by our community</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={item.name}
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Save Rosemary Heights. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
