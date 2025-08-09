'use client'

import { Button } from '@/components/ui/button'
import { type BlogPost } from '@/lib/blog'
import { formatDate } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Star, User } from 'lucide-react'
import Link from 'next/link'

interface FeaturedPostsClientProps {
  posts: BlogPost[]
}

export function FeaturedPostsClient({ posts }: FeaturedPostsClientProps) {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            <span>Featured Stories</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">
            Community Highlights
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the latest stories, initiatives, and achievements from our Rosemary Heights community
          </p>
        </motion.div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No featured posts</h3>
            <p className="text-gray-600 dark:text-gray-300">Check back soon for featured community stories.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  {/* Image placeholder */}
                  <div className="h-48 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 relative overflow-hidden">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-secondary-600/20"></div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readingTime} min read</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {post.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <time className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(post.date)}
                      </time>
                      
                      <span className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium group">
                        Read More
                        <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

        {/* View All Posts Button - Always visible */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" variant="outline">
            <Link href="/blog">
              View All Posts
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
