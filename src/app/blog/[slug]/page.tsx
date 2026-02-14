import { PageHeader } from '@/components/page-header'
import { Badge } from '@/components/ui/badge'
import { getAllBlogPosts, getBlogPost } from '@/lib/blog'
import { format, parseISO } from 'date-fns'
import { CalendarDays, Clock, Tag, User } from 'lucide-react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface BlogPostProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  const allPosts = getAllBlogPosts()
  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found - Save Rosemary Heights',
    }
  }

  return {
    title: `${post.title} - Save Rosemary Heights`,
    description: post.description || post.excerpt || '',
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description || post.excerpt || '',
      type: 'article',
      publishedTime: post.date,
      authors: post.author,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  }
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader 
        title={post.title}
        description={post.description || post.excerpt || ''}
      />
      
      <article className="max-w-4xl mx-auto mt-8">
        {/* Post metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8 border-b pb-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <time dateTime={post.date}>
              {format(parseISO(post.date), 'MMMM dd, yyyy')}
            </time>
          </div>
          
          {post.author && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
          )}
          
          {post.readingTime && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime} min read</span>
            </div>
          )}
          
          {post.category && (
            <Badge variant="secondary">{post.category}</Badge>
          )}
        </div>

        {/* Cover image */}
        {post.coverImage && (
          <div className="mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={post.coverImage} 
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Post content */}
        <div 
          className="prose prose-lg max-w-none prose-headings:text-green-800 prose-links:text-green-600 prose-strong:text-green-800"
          dangerouslySetInnerHTML={{ __html: post.body?.html || '' }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="h-4 w-4" />
              <span className="text-sm font-medium">Tags:</span>
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Related topics */}
        {post.relatedTopics && post.relatedTopics.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium">Related topics:</span>
              {post.relatedTopics.map((topic) => (
                <Badge key={topic} variant="outline" className="bg-green-50">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
