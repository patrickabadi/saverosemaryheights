import { PageHeader } from '@/components/page-header'
import { PostCard } from '@/components/post-card'
import { getPublishedBlogPosts } from '@/lib/blog'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Save Rosemary Heights',
  description: 'Read the latest news, updates, and stories from our Rosemary Heights community. Stay informed about local issues, events, and initiatives.',
  openGraph: {
    title: 'Community Blog - Save Rosemary Heights',
    description: 'Read the latest news, updates, and stories from our Rosemary Heights community.',
  },
}

export default function BlogPage() {
  // Get all published posts ordered by date
  const allPosts = getPublishedBlogPosts()

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Community Blog"
        description="Stay informed about local issues, community events, and initiatives that matter to our Rosemary Heights neighborhood."
        badge="Latest Updates"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* All Posts */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">All Posts</h2>
          
          {allPosts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No posts yet</h3>
              <p className="text-gray-600 dark:text-gray-300">Check back soon for community updates and stories.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
