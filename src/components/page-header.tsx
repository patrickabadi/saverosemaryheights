'use client'

import { motion } from 'framer-motion'
import { TreePine } from 'lucide-react'

interface PageHeaderProps {
  title: string
  description: string
  badge?: string
}

export function PageHeader({ title, description, badge }: PageHeaderProps) {
  return (
    <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {badge && (
            <div className="inline-flex items-center space-x-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <TreePine className="w-4 h-4" />
              <span>{badge}</span>
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-white mb-6">
            {title}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
