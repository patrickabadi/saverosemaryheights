import { getRecentBlogPosts } from '@/lib/blog'
import { RecentPostsClient } from './recent-posts-client'

export function RecentPosts() {
  // Get the latest 3 published posts dynamically
  const recentPosts = getRecentBlogPosts(3)
  
  return <RecentPostsClient posts={recentPosts} />
}
