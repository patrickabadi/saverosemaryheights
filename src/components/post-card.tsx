'use client'

import type { BlogPost } from '@/lib/blog'
import { formatDate } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Star, User } from 'lucide-react'
import Link from 'next/link'

interface PostCardProps {
  post: BlogPost
  featured?: boolean
}

export function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <Link href={post.url} className="block">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        className={`group bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer ${
          featured ? 'ring-2 ring-primary-200 dark:ring-primary-800' : ''
        }`}
      >
      {/* Image */}
      <div className={`${featured ? 'h-56' : 'h-48'} bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 relative overflow-hidden`}>
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-secondary-600/20" />
        )}
        
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          {post.category && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800">
              {post.category}
            </span>
          )}
          {featured && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-600 text-white">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </span>
          )}
        </div>
      </div>

      <div className="p-6">
        {/* Meta */}
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
          {post.readingTime && (
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime} min read</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className={`${featured ? 'text-2xl' : 'text-xl'} font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors`}>
          {post.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.description || post.excerpt}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <time className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(post.date)}
          </time>
          
          <div className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium group">
            Read More
            <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.article>
    </Link>
  )
}
