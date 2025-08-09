import { PostCard } from '@/components/post-card'
import type { BlogPost } from '@/lib/blog'
import { getPublishedBlogPosts } from '@/lib/blog'
import Link from 'next/link'

interface RelatedPostsProps {
  post: BlogPost
}

export function RelatedPosts({ post }: RelatedPostsProps) {
  // Find related posts based on category, tags, or related topics
  const allPosts = getPublishedBlogPosts()
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .filter((p) => {
      // Match by category
      if (p.category === post.category) return true
      
      // Match by tags
      if (post.tags && p.tags) {
        const hasCommonTag = post.tags.some(tag => p.tags!.includes(tag))
        if (hasCommonTag) return true
      }
      
      // Match by related topics
      if (post.relatedTopics && p.tags) {
        const hasRelatedTopic = post.relatedTopics.some(topic => 
          p.tags!.some(tag => tag.toLowerCase().includes(topic.toLowerCase()))
        )
        if (hasRelatedTopic) return true
      }
      
      return false
    })
    .slice(0, 3) // Limit to 3 related posts

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        Related Posts
      </h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedPosts.map((relatedPost) => (
          <PostCard key={relatedPost.slug} post={relatedPost} />
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
        >
          View All Posts →
        </Link>
      </div>
    </section>
  )
}
