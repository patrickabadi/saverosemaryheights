'use client'

import { type BlogPost } from '@/lib/blog'
import { formatDate } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Clock, User } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface RecentPostsClientProps {
  posts: BlogPost[]
}

export function RecentPostsClient({ posts }: RecentPostsClientProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Calendar className="w-4 h-4" />
              <span>Latest Updates</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">
              Recent Community News
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Stay up to date with the latest happenings, initiatives, and news from our community
            </p>
          </div>
          <div className="text-center py-12">
            <div className="animate-pulse">Loading recent posts...</div>
          </div>
        </div>
      </section>
    )
  }
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Calendar className="w-4 h-4" />
            <span>Latest Updates</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">
            Recent Community News
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Stay up to date with the latest happenings, initiatives, and news from our community
          </p>
        </motion.div>

        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No recent posts</h3>
              <p className="text-gray-600 dark:text-gray-300">Check back soon for community updates and stories.</p>
            </div>
          ) : (
            posts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:shadow-lg">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">
                            {post.category}
                          </span>
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{post.readingTime} min read</span>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {post.title}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                          {post.description}
                        </p>
                      </div>

                      <div className="flex items-center space-x-4 lg:flex-col lg:items-end lg:space-x-0 lg:space-y-2">
                        <time className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {formatDate(post.date)}
                        </time>
                        
                        <div className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium group">
                          <span className="hidden lg:inline">Read More</span>
                          <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link 
            href="/blog"
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium group"
          >
            View All Blog Posts
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
