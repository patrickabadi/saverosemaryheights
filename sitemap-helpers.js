const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

function getAllBlogPosts() {
  try {
    const blogDir = path.join(process.cwd(), 'content', 'blog')
    
    if (!fs.existsSync(blogDir)) {
      console.warn('Blog directory does not exist:', blogDir)
      return []
    }
    
    const files = getAllMarkdownFiles(blogDir)
    
    const posts = files.map((file) => {
      const filePath = path.join(blogDir, file)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)
      
      // Generate URL from file path
      const slug = file.replace(/\.mdx?$/, '').replace(/\\/g, '/')
      const url = `/blog/${slug}`
      
      return {
        ...data,
        url,
        slug,
        date: data.date || new Date().toISOString(),
        featured: data.featured || false,
      }
    })
    
    return posts.filter(post => post.published !== false)
  } catch (error) {
    console.error('Error getting blog posts:', error)
    return []
  }
}

function getAllMarkdownFiles(dir) {
  let files = []
  
  const items = fs.readdirSync(dir)
  
  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)
    
    if (stat.isDirectory()) {
      const subFiles = getAllMarkdownFiles(fullPath)
      files = files.concat(subFiles.map(f => path.join(item, f)))
    } else if (item.match(/\.mdx?$/)) {
      files.push(item)
    }
  }
  
  return files
}

module.exports = {
  getAllBlogPosts,
}
