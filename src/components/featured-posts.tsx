import { getRecentBlogPosts } from '@/lib/blog'
import { FeaturedPostsClient } from './featured-posts-client'

export function FeaturedPosts() {
  // Get 3 most recent blog posts
  const recentPosts = getRecentBlogPosts(3)

  return <FeaturedPostsClient posts={recentPosts} />
}
