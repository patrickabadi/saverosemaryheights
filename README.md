# Save Rosemary Heights - Community Blog

A professional, SEO-optimized blog site built with Next.js 15, TypeScript, and TailwindCSS, dedicated to the Rosemary Heights community.

## 🌟 Features

- **Full SSR (Server-Side Rendering)** - Optimal SEO and performance
- **Professional Design** - Nature-inspired color scheme with smooth animations
- **TypeScript** - Type-safe development
- **TailwindCSS** - Modern, responsive styling
- **SEO Optimized** - Meta tags, robots.txt, and sitemap.xml
- **Blog-ready** - Structured for markdown content with contentlayer2
- **Responsive** - Mobile-first design
- **Dark Mode** - Theme switching capability
- **Performance Optimized** - Optimized images and fonts

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Content**: Contentlayer2 (for markdown)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Font**: Inter & Poppins (Google Fonts)

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── blog/            # Blog pages
│   ├── about/           # About page
│   ├── contact/         # Contact page
│   ├── layout.tsx       # Root layout with SEO
│   ├── page.tsx         # Homepage
│   ├── robots.ts        # SEO robots.txt
│   └── sitemap.ts       # SEO sitemap
├── components/          # Reusable React components
│   ├── ui/             # Base UI components
│   ├── hero.tsx        # Homepage hero section
│   ├── navbar.tsx      # Navigation
│   ├── footer.tsx      # Footer
│   └── ...             # Other components
└── lib/                # Utility functions

content/
└── blog/               # Markdown blog posts
    ├── community-gardens-growing-together.md
    ├── preserving-heritage-trees.md
    └── upcoming-community-meeting.md
```

## 🎨 Design System

### Color Palette
- **Primary**: Professional forest green (#359a5a)
- **Secondary**: Warm earth tone (#dc7633)
- **Accent**: Professional blue (#0c8ce9)
- **Grays**: Modern neutral scale

### Typography
- **Display Font**: Poppins (headings)
- **Body Font**: Inter (content)

### Animations
- Smooth page transitions
- Hover effects
- Loading animations
- Scroll-triggered animations

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and navigate to the project**:
   ```bash
   cd c:\Dev\ironvision\saverosemaryheights-workspace\srh-site
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   ```
   http://localhost:3000
   ```

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking

## 📝 Content Management

### Adding Blog Posts

1. Create a new `.md` file in `content/blog/`
2. Add frontmatter with required fields:

```markdown
---
title: "Your Post Title"
date: 2024-08-07
description: "SEO description"
author: "Author Name"
category: "Category"
tags: ["tag1", "tag2"]
featured: false
published: true
---

# Your Content Here
```

### Required Frontmatter Fields
- `title` - Post title
- `date` - Publication date
- `description` - SEO description
- `published` - true/false

### Optional Fields
- `excerpt` - Short excerpt
- `keywords` - SEO keywords array
- `coverImage` - Featured image URL
- `author` - Author name (defaults to "Save Rosemary Heights")
- `category` - Post category
- `tags` - Tags array
- `readingTime` - Reading time in minutes
- `featured` - Featured post flag
- `relatedTopics` - Related topics array

## 🔧 Configuration

### Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=https://saverosemaryheights.com
SITE_URL=https://saverosemaryheights.com
```

### SEO Configuration

The site includes comprehensive SEO:
- **Meta tags** - Open Graph, Twitter Cards
- **Robots.txt** - Generated automatically
- **Sitemap.xml** - Auto-generated from content
- **Structured data** - JSON-LD for blog posts

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This will:
1. Build the Next.js application
2. Generate static pages
3. Create robots.txt and sitemap.xml
4. Optimize assets

### Deployment Platforms
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Any static hosting service**

## 📱 Responsive Design

The site is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Focus indicators

## 🎭 Customization

### Colors
Edit `tailwind.config.js` to customize the color palette.

### Fonts
Modify font imports in `src/app/layout.tsx`.

### Components
All components are modular and easily customizable.

## 🐛 Known Issues

- Contentlayer2 has some Windows compatibility issues (warnings during build)
- Currently using fallback content until contentlayer is fully configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for the Save Rosemary Heights community.

## 📞 Support

For questions or support:
- Email: info@saverosemaryheights.com
- Community meetings: First Saturday of every month

## 🙏 Acknowledgments

- Community members who provided input
- Open source libraries and tools
- Next.js and React teams
- TailwindCSS team

---

**Built with ❤️ for the Rosemary Heights community**
