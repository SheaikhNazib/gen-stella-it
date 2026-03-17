'use client'

import React from 'react'
import { motion } from 'framer-motion'
import ProfilePlaceholder from '@/components/ui/profile-placeholder'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { type TeamMember } from '@/data/team'
import { Github, Linkedin, Twitter } from 'lucide-react'

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
            <span className="bg-gradient-to-r from-blue-500 to-purple-400 text-transparent bg-clip-text">
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
  if (!members || members.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        No team members found.
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {members.map((m, index) => (
        <motion.div
          key={m.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
          className="group h-full"
        >
          <Card className="h-full relative overflow-hidden border-white/20 dark:border-white/10 bg-white/40 dark:bg-slate-950/40 backdrop-blur-md shadow-lg dark:shadow-slate-950/40 hover:shadow-xl dark:hover:shadow-purple-950/30 transition-all duration-300 group-hover:border-white/40 dark:group-hover:border-purple-400/20">
            <div className="absolute inset-0 -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <CardContent className="p-6 pb-4 flex flex-col h-full relative z-10">
              <div className="mb-5 flex justify-center">
                <div className="relative">
                  <ProfilePlaceholder 
                    name={m.name} 
                    src={m.image} 
                    size="lg" 
                    className="w-20 h-20 ring-2 ring-blue-500/30 dark:ring-purple-400/30 group-hover:ring-blue-500/60 dark:group-hover:ring-purple-400/60 transition-all duration-300 shadow-md group-hover:shadow-lg group-hover:shadow-blue-500/20"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300 -z-10" />
                </div>
              </div>

              <h3 className="font-bold text-gray-900 dark:text-white text-base text-center leading-tight mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-500 transition-all duration-300">
                {m.name}
              </h3>

              <div className="flex justify-center mb-4">
                <Badge 
                  variant="secondary"
                  className="bg-blue-100/80 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/60 transition-colors duration-300 font-semibold px-3 py-1 text-xs tracking-wider uppercase"
                >
                  {m.role}
                </Badge>
              </div>

              {m.bio && (
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-auto line-clamp-3 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  {m.bio}
                </p>
              )}

            </CardContent>

            <CardFooter className="px-6 pb-6 pt-2 flex items-center justify-center gap-2 relative z-10 border-t border-white/10 dark:border-white/5">
              {(m.twitter || m.linkedin || m.github) && (
                <div className="flex items-center gap-2">
                  {m.twitter && (
                    <motion.a 
                      href={m.twitter.startsWith('http') ? m.twitter : `https://twitter.com/${m.twitter}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-full bg-blue-100/60 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <Twitter className="w-4 h-4" />
                    </motion.a>
                  )}
                  {m.linkedin && (
                    <motion.a 
                      href={m.linkedin.startsWith('http') ? m.linkedin : `https://linkedin.com/in/${m.linkedin}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-full bg-blue-100/60 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <Linkedin className="w-4 h-4" />
                    </motion.a>
                  )}
                  {m.github && (
                    <motion.a 
                      href={m.github.startsWith('http') ? m.github : `https://github.com/${m.github}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-full bg-gray-100/60 dark:bg-slate-800/40 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <Github className="w-4 h-4" />
                    </motion.a>
                  )}
                </div>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

