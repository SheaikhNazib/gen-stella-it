'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Clock } from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import RichTextEditor from '@/components/ui/rich-text'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')

    try {
      // ensure we capture the latest editor content (in case state hasn't flushed yet)
      const editorEl = document.querySelector('[data-rich-text-editor]') as HTMLElement | null
      const messageToSend = message || editorEl?.innerHTML || ''

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message: messageToSend }),
      })

      if (res.ok) {
        setStatus('success')
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
      } else {
        setStatus('error')
      }
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <AppShell>
      <section className="py-24 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white"
            >
              Let's build something beautiful together
            </motion.h1>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Briefly describe your project and we'll get back within 1–2 business days. Send as much context as you like —
              attachments and links welcome in follow-up.
            </p>
          </div>

          <div className="grid lg:grid-cols-[3fr,1.4fr] gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-slate-800">
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        name="name"
                        type="text"
                        placeholder="Jane Doe"
                        className="w-full rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/70"
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-400">
                          <Mail size={16} />
                        </span>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          className="w-full rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-10 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/70"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Project</label>
                    <input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      name="subject"
                      type="text"
                      placeholder="Marketing site, internal dashboard, AI assistant"
                      className="w-full rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/70"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Project details</label>
                    <RichTextEditor
                      value={message}
                      onChange={(html) => setMessage(html)}
                      placeholder="Timeline, budget, tech preferences — use formatting as needed"
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[12px] text-gray-500 dark:text-gray-400 max-w-sm">Submissions are sent to the configured mailbox.</p>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg"
                      disabled={status === 'sending'}
                    >
                      {status === 'sending' ? 'Sending…' : 'Send message'}
                    </motion.button>
                  </div>

                  {status === 'success' && <p className="text-sm text-green-600 mt-2">Message sent — thank you!</p>}
                  {status === 'error' && <p className="text-sm text-red-600 mt-2">Failed to send message. Try again later.</p>}
                </form>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-gray-200 dark:border-slate-800 bg-gradient-to-b from-gray-50/60 to-white/40 dark:from-slate-900/60 dark:to-slate-950/60 backdrop-blur-sm p-6 space-y-6"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                  <Mail className="text-blue-600" size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Email</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">genstellait@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/30">
                  <MapPin className="text-purple-600" size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Location</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Dhaka, Bangladesh</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-900/30">
                  <Clock className="text-teal-600" size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Response time</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Within 24 hours</p>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </AppShell>
  )
}

