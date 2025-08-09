'use client'

import type { BlogPost } from '@/lib/blog'
import { formatDate } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Calendar, Clock, Tag, User } from 'lucide-react'

interface PostHeaderProps {
  post: BlogPost
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Category & Featured Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {post.category && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">
                <Tag className="w-4 h-4 mr-1" />
                {post.category}
              </span>
            )}
            {post.featured && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary-100 dark:bg-secondary-900 text-secondary-800 dark:text-secondary-200">
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-gray-900 dark:text-white leading-tight mb-6">
            {post.title}
          </h1>

          {/* Description */}
          {post.description && (
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {post.description}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-300">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span className="font-medium">{post.author}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            
            {post.readingTime && (
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{post.readingTime} min read</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Cover Image */}
      {post.coverImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      )}
    </header>
  )
}
