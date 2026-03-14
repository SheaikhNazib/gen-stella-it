'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import AppShell from '@/components/layout/AppShell'

import { teamMembers } from '@/data/team'

export default function TeamPage() {
  return (
    <AppShell>
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
                pixels & code
              </span>
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Swap out names, roles, and avatars here. The layout stays responsive and animated while you customize the
              actual team details.
            </p>
          </motion.div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="rounded-3xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm p-5 flex flex-col items-center text-center"
              >
                <div className="relative mb-4">
                  <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-blue-500/30 to-purple-500/30 blur-xl" />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="relative w-24 h-24 rounded-2xl object-cover border border-white/70 dark:border-slate-800 shadow-md"
                  />
                </div>
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">{member.name}</h2>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{member.role}</p>
                <div className="mt-4 flex items-center gap-3 text-gray-500 dark:text-gray-400">
                  <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                    <Linkedin size={16} />
                  </button>
                  <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                    <Github size={16} />
                  </button>
                  <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                    <Mail size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  )
}

