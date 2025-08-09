'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, TreePine, Users } from 'lucide-react'

export function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <TreePine className="w-4 h-4" />
            <span>Join Our Community</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-white mb-6 leading-tight">
            Help Us Preserve
            <span className="block">Rosemary Heights</span>
          </h2>

          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Your voice matters. Join hundreds of community members who are actively working 
            to protect and preserve our neighborhood for future generations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              asChild 
              className="group bg-white text-primary-600 hover:bg-gray-100"
            >
              <Link href="/blog">
                Read Our Latest Posts
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              asChild
              className="border-white text-white hover:bg-white hover:text-primary-600"
            >
              <Link href="/contact">
                Get Involved
                <Users className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-white/20"
          >
            <div className="flex flex-wrap justify-center items-center gap-8 text-primary-100">
              <div className="flex items-center space-x-2">
                <TreePine className="w-5 h-5" />
                <span className="text-sm">100% Community Driven</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span className="text-sm">500+ Active Members</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                </span>
                <span className="text-sm">Actively Making Change</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
