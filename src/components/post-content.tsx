'use client'

import { RelatedPosts } from '@/components/related-posts'
import { ShareButtons } from '@/components/share-buttons'
import type { BlogPost } from '@/lib/blog'
import { motion } from 'framer-motion'

interface PostContentProps {
  post: BlogPost
}

export function PostContent({ post }: PostContentProps) {

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="prose prose-lg dark:prose-dark max-w-none"
        dangerouslySetInnerHTML={{ __html: post.body?.html || '' }}
      />

      {/* Share Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
      >
        <ShareButtons post={post} />
      </motion.div>

      {/* Related Posts */}
      {post.relatedTopics && post.relatedTopics.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <RelatedPosts post={post} />
        </motion.div>
      )}
    </div>
  )
}
