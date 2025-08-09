'use client'

import { Button } from '@/components/ui/button'
import type { BlogPost } from '@/lib/blog'
import { Check, Copy, Facebook, Linkedin, Share2, Twitter } from 'lucide-react'
import { useState } from 'react'

interface ShareButtonsProps {
  post: BlogPost
}

export function ShareButtons({ post }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${post.url}`
    : `https://saverosemaryheights.com${post.url}`

  const shareText = `${post.title} - Save Rosemary Heights`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'hover:text-blue-600',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:text-sky-600',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:text-blue-700',
    },
  ]

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
        <Share2 className="w-5 h-5" />
        <span className="font-medium">Share this post</span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 ${link.color} transition-colors`}
            aria-label={`Share on ${link.name}`}
          >
            <link.icon className="w-5 h-5" />
          </a>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="ml-2"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Link
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
