'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ProfilePlaceholder from '@/components/ui/profile-placeholder'
import { Card, CardContent } from '@/components/ui/card'
import { type TeamMember } from '@/data/team'
import { ChevronLeft, ChevronRight, Github, Linkedin, Twitter } from 'lucide-react'

export function TeamGrid({ members = [] }: { members?: TeamMember[] }) {
  return (
    <section className="py-24 bg-gray-50 dark:bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-blue-600 dark:text-blue-400 mb-4">
            Team
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            People behind the{' '}
            <span className="bg-gradient-to-r from-blue-500 to-slate-500 text-transparent bg-clip-text">
              pixels &amp; code
            </span>
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Meet the team that builds products at Gen Stella IT.
          </p>
        </motion.div>

        <div className="mt-16">
          <TeamSection members={members} />
        </div>
      </div>
    </section>
  )
}

export function TeamSection({ members = [] }: { members?: TeamMember[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScroll = () => {
    const container = scrollContainerRef.current
    if (!container) return

    setCanScrollLeft(container.scrollLeft > 0)
    setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 8)
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [members])

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current
    if (!container) return

    container.scrollBy({
      left: direction === 'left' ? -380 : 380,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleNativeWheel = (e: WheelEvent) => {
      // If we're scrolling more vertically than horizontally
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        // Prevent default vertical scroll to map it to horizontal
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    // Add with { passive: false } to allow e.preventDefault()
    container.addEventListener("wheel", handleNativeWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleNativeWheel);
    };
  }, [members]);

  if (!members || members.length === 0) {
    return (
      <div className="py-12 text-center text-slate-400 font-medium">
        No team members currently active.
      </div>
    )
  }

  return (
    <div className="relative group">
      {canScrollLeft && (
        <motion.button
          type="button"
          onClick={() => scroll('left')}
          aria-label="Scroll team members left"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-lg transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900"
        >
          <ChevronLeft className="h-5 w-5" />
        </motion.button>
      )}

      {canScrollRight && (
        <motion.button
          type="button"
          onClick={() => scroll('right')}
          aria-label="Scroll team members right"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-lg transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900"
        >
          <ChevronRight className="h-5 w-5" />
        </motion.button>
      )}

      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex gap-6 overflow-x-auto overflow-y-hidden pb-3 pr-8 scrollbar-hide"
        style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
      >
        {members.map((m, index) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06, duration: 0.45, ease: 'easeOut' }}
            className="group relative flex-shrink-0 w-[24rem] sm:w-[28rem]"
          >
            
            <div className="relative h-full p-[1px] rounded-3xl overflow-hidden bg-slate-200 dark:bg-slate-800 transition-all duration-500 group-hover:bg-gradient-to-r group-hover:from-blue-500/40 group-hover:to-slate-400/40 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)]">
              <Card className="h-full border-none bg-white dark:bg-slate-950 rounded-[23px] overflow-hidden flex flex-row transition-all duration-500">
                <div className="w-[38%] min-w-[9.5rem] p-6 flex items-center justify-center bg-slate-50/70 dark:bg-slate-900/30 border-r border-slate-100 dark:border-slate-800/50">
                  <div className="relative">
                    <div className="absolute inset-[-4px] rounded-full border border-slate-100 dark:border-slate-800 group-hover:border-blue-500/20 transition-colors duration-500" />

                    <ProfilePlaceholder
                      name={m.name}
                      src={m.image}
                      imagePositionX={m.imagePositionX ?? 50}
                      imagePositionY={m.imagePositionY ?? 50}
                      imageScale={m.imageScale ?? 1}
                      size="lg"
                      className="w-28 h-28 sm:w-32 sm:h-32 grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 object-cover rounded-full ring-4 ring-white dark:ring-slate-950 shadow-[0_12px_30px_-18px_rgba(15,23,42,0.35)]"
                    />

                    <div
                      className="absolute top-1 right-1 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950 shadow-sm"
                      title="Available for projects"
                    />
                  </div>
                </div>

                <CardContent className="w-[62%] p-6 flex flex-1 flex-col justify-between space-y-4 relative overflow-hidden">
                  <div className="absolute -top-8 -right-8 text-[80px] font-black text-slate-50 dark:text-slate-900/35 select-none pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    {m.name.charAt(0)}
                  </div>

                  <div className="relative z-10 space-y-3">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {m.name}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {m.role.split(',').map((roleItem) => (
                          <span key={`${m.id}-${roleItem}`} className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                            {roleItem.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    {m.expertise && m.expertise.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {m.expertise.map((item) => (
                          <span key={`${m.id}-expertise-${item}`} className="rounded-full border border-slate-200 px-2.5 py-1 text-[10px] font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300">
                            {item}
                          </span>
                        ))}
                      </div>
                    )}

                    {m.bio && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                        {m.bio}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-50 dark:border-slate-900 flex items-center justify-center gap-2 relative z-10">
                    {m.twitter && (
                      <SocialLink
                        href={m.twitter.startsWith('http') ? m.twitter : `https://twitter.com/${m.twitter}`}
                        icon={<Twitter className="h-3.5 w-3.5" />}
                        label="Twitter"
                        color="hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-[#1DA1F2]"
                      />
                    )}
                    {m.linkedin && (
                      <SocialLink
                        href={m.linkedin.startsWith('http') ? m.linkedin : `https://linkedin.com/in/${m.linkedin}`}
                        icon={<Linkedin className="h-3.5 w-3.5" />}
                        label="LinkedIn"
                        color="hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-[#0A66C2]"
                      />
                    )}
                    {m.github && (
                      <SocialLink
                        href={m.github.startsWith('http') ? m.github : `https://github.com/${m.github}`}
                        icon={<Github className="h-3.5 w-3.5" />}
                        label="GitHub"
                        color="hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

function SocialLink({
  href,
  icon,
  label,
  color,
}: {
  href: string
  icon: React.ReactNode
  label: string
  color: string
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`rounded-lg border border-slate-100 px-2.5 py-2 text-slate-400 transition-all duration-300 dark:border-slate-800/50 ${color}`}
    >
      {icon}
    </motion.a>
  )
}



