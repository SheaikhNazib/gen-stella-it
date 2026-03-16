'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import { DarkModeToggle } from '@/components/common/dark-mode-toggle'

interface MobileNavProps {
  open: boolean
  onClose: () => void
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname()

  // Close on route change
  useEffect(() => {
    onClose()
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md md:hidden"
        >
          {/* Close button */}
          <div className="flex justify-end p-4">
            <button
              onClick={onClose}
              className="h-10 w-10 rounded-lg flex items-center justify-center text-foreground hover:bg-accent transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="flex flex-col items-center gap-2 px-6 pt-8">
            {siteConfig.navItems.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                  className="w-full"
                >
                  <Link
                    href={item.href}
                    className={`block w-full text-center py-3 text-lg font-medium rounded-xl transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:bg-accent'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              )
            })}

            {/* Get a Quote CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: siteConfig.navItems.length * 0.05, duration: 0.2 }}
              className="w-full mt-4"
            >
              <Link
                href="/services/pricing"
                className="block w-full text-center py-3 text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-purple-500 text-white"
              >
                Get a Quote
              </Link>
            </motion.div>

            {/* Theme toggle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6"
            >
              <DarkModeToggle />
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
