"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useThemeContext } from "@/context/theme-context"
import {
  Share2,
  Facebook,
  Linkedin,
  Link,
  Mail,
  MessageCircle,
  Copy,
  Check,
  MoreHorizontal,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { XIcon } from "@/components/icons/x-icon"

interface SocialShareProps {
  title: string
  url: string
  description?: string
  hashtags?: string[]
}

interface SharePlatform {
  name: string
  icon: React.ReactNode
  color: string
  hoverColor: string
  shareUrl: (params: { url: string; title: string; description?: string; hashtags?: string[] }) => string
}

export function SocialShare({ title, url, description, hashtags = [] }: SocialShareProps) {
  const { mode, color } = useThemeContext()
  const isDark = mode === "dark" || color === "black"
  const [copied, setCopied] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const platforms: SharePlatform[] = [
    {
      name: "X",
      icon: <XIcon className="w-4 h-4" />,
      color: "bg-black",
      hoverColor: "hover:bg-gray-800",
      shareUrl: ({ url, title, hashtags }) => {
        const hashtagString = hashtags?.length ? hashtags.map(tag => `#${tag.replace(/\s+/g, '')}`).join(' ') : ''
        return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`${title} ${hashtagString}`)}`
      }
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-4 h-4" />,
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      shareUrl: ({ url }) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-4 h-4" />,
      color: "bg-blue-700",
      hoverColor: "hover:bg-blue-800",
      shareUrl: ({ url, title, description }) =>
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description || '')}`
    },
    {
      name: "WhatsApp",
      icon: <MessageCircle className="w-4 h-4" />,
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      shareUrl: ({ url, title }) =>
        `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`
    },
    {
      name: "Email",
      icon: <Mail className="w-4 h-4" />,
      color: "bg-gray-600",
      hoverColor: "hover:bg-gray-700",
      shareUrl: ({ url, title, description }) =>
        `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description || ''}\n\nRead more: ${url}`)}`
    }
  ]

  const handleShare = (platform: SharePlatform) => {
    const shareUrl = platform.shareUrl({ url, title, description, hashtags })

    if (platform.name === "Email") {
      window.location.href = shareUrl
    } else {
      window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes')
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  // Get the current page URL if not provided
  const currentUrl = typeof window !== 'undefined'
    ? url || window.location.href
    : url || ''

  // Primary platforms to show by default
  const primaryPlatforms = platforms.slice(0, 3) // Facebook, X, LinkedIn
  const secondaryPlatforms = platforms.slice(3) // WhatsApp, Email

  return (
    <>
      {/* Compact Social Share - Entire card clickable */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        onClick={() => setShowDetails(true)}
        className={`${isDark ? "bg-gray-900/40" : "bg-white/40"
          } backdrop-blur-md rounded-lg p-4 shadow-lg border ${isDark ? "border-gray-700/50" : "border-gray-200/50"
          } theme-transition cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium theme-text theme-transition flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share this post:
          </h3>

          <div className="flex items-center gap-2">
            {/* Primary Social Buttons */}
            {primaryPlatforms.map((platform) => (
              <motion.button
                key={platform.name}
                onClick={(e) => {
                  e.stopPropagation()
                  handleShare(platform)
                }}
                className={`p-2 rounded-full text-white transition-all duration-200 hover:scale-110 ${platform.name === 'Facebook' ? 'bg-blue-600 hover:bg-blue-700' :
                  platform.name === 'X' ? 'bg-black hover:bg-gray-800' :
                    platform.name === 'LinkedIn' ? 'bg-blue-700 hover:bg-blue-800' : platform.color
                  }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Share on ${platform.name}`}
              >
                {platform.icon}
              </motion.button>
            ))}

            {/* More Options Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                setShowDetails(true)
              }}
              className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="More sharing options"
            >
              <MoreHorizontal className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Detailed Share Modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`${isDark ? "bg-gray-900" : "bg-white"
                } rounded-lg p-6 w-full max-w-md shadow-xl`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold theme-text theme-transition">
                  Share this Blog
                </h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5 theme-text" />
                </button>
              </div>

              <div className="space-y-4">
                {/* All Social Platform Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  {platforms.map((platform) => (
                    <motion.button
                      key={platform.name}
                      onClick={() => {
                        handleShare(platform)
                        setShowDetails(false)
                      }}
                      className={`${platform.color} ${platform.hoverColor} text-white p-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center gap-3">
                        {platform.icon}
                        <span className="text-sm font-medium">{platform.name}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Copy Link Section */}
                <div className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <Link className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <input
                    type="text"
                    value={currentUrl}
                    readOnly
                    className="flex-1 bg-transparent text-sm theme-text outline-none cursor-default"
                    onClick={(e) => e.currentTarget.select()}
                  />
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="sm"
                    className={`flex items-center gap-2 ${copied ? "text-green-600 border-green-600" : ""
                      } transition-colors`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span className="text-xs">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="text-xs">Copy</span>
                      </>
                    )}
                  </Button>
                </div>

                {/* Engagement Stats */}
                <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
                  Help others discover this content
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Utility function to get sharing data from meta tags
export function getPageSharingData(): SocialShareProps {
  if (typeof window === 'undefined') {
    return { title: '', url: '' }
  }

  const title = document.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
    document.title ||
    'Check out this article'

  const description = document.querySelector('meta[property="og:description"]')?.getAttribute('content') ||
    document.querySelector('meta[name="description"]')?.getAttribute('content') ||
    ''

  const url = document.querySelector('meta[property="og:url"]')?.getAttribute('content') ||
    window.location.href

  // Extract hashtags from keywords meta tag
  const keywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content')
  const hashtags = keywords ? keywords.split(',').map(tag => tag.trim()) : []

  return {
    title,
    url,
    description,
    hashtags
  }
}