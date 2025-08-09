import fs from 'fs'
import matter from 'gray-matter'
import { marked } from 'marked'
import path from 'path'

// Configure marked for better HTML output
marked.setOptions({
  gfm: true,
  breaks: false,
  pedantic: false
})

export interface BlogPost {
  title: string
  description: string
  date: string
  excerpt?: string
  keywords?: string[]
  coverImage?: string
  author: string
  category: string
  tags?: string[]
  readingTime: number
  featured: boolean
  priority?: string
  relatedTopics?: string[]
  published: boolean
  url: string
  slug: string
  content?: string
  body?: {
    html: string
    raw: string
  }
}

const contentDirectory = path.join(process.cwd(), 'content', 'blog')

export function getAllBlogPosts(): BlogPost[] {
  try {
    // Check if content directory exists
    if (!fs.existsSync(contentDirectory)) {
      console.warn('Blog content directory not found')
      return []
    }

    const fileNames = fs.readdirSync(contentDirectory)
    const allPostsData = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const slug = fileName.replace(/\.md$/, '')
        return getBlogPost(slug)
      })
      .filter(post => post !== null) as BlogPost[]

    return allPostsData.sort((a: BlogPost, b: BlogPost) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  } catch (error) {
    console.error('Error getting all blog posts:', error)
    return []
  }
}

export function getBlogPost(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const htmlContent = marked(content) as string
    
    // Calculate reading time (words per minute)
    const words = content.trim().split(/\s+/).length
    const readingTime = Math.ceil(words / 200)

    return {
      title: data.title || 'Untitled',
      description: data.description || data.excerpt || '',
      date: data.date ? (data.date instanceof Date ? data.date.toISOString() : String(data.date)) : new Date().toISOString(),
      excerpt: data.excerpt || data.description || '',
      keywords: data.keywords || [],
      coverImage: data.coverImage || '',
      author: data.author || 'Save Rosemary Heights',
      category: data.category || 'Community',
      tags: data.tags || [],
      readingTime: data.readingTime || readingTime,
      featured: data.featured === true || data.featured === 'true',
      priority: data.priority || 'medium',
      relatedTopics: data.relatedTopics || [],
      published: data.published !== false && data.published !== 'false',
      url: `/blog/${slug}`,
      slug,
      content,
      body: {
        html: htmlContent,
        raw: content
      }
    }
  } catch (error) {
    console.error(`Error getting blog post ${slug}:`, error)
    return null
  }
}

export function getPublishedBlogPosts(): BlogPost[] {
  const allPosts = getAllBlogPosts()
  return allPosts.filter(post => post.published)
}

export function getFeaturedBlogPosts(limit: number = 3): BlogPost[] {
  const publishedPosts = getPublishedBlogPosts()
  return publishedPosts.filter(post => post.featured).slice(0, limit)
}

export function getRecentBlogPosts(limit: number = 3): BlogPost[] {
  const publishedPosts = getPublishedBlogPosts()
  return publishedPosts.slice(0, limit)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  const publishedPosts = getPublishedBlogPosts()
  return publishedPosts.filter(post => 
    post.category?.toLowerCase() === category.toLowerCase()
  )
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  const publishedPosts = getPublishedBlogPosts()
  return publishedPosts.filter(post => 
    post.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}
