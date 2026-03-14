'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Sparkles, User, Mail, MessageSquare } from 'lucide-react'
import RichTextEditor from '@/components/ui/rich-text'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import AppShell from '@/components/layout/AppShell'

const plans = [
  {
    name: 'Starter',
    bdPrice: '৳29,000',
    usdPrice: '$250',
    cadence: 'One-time',
    strategy: 'Competitive entry',
    highlight: 'For landing pages & small sites.',
    features: ['Single-page or simple site', 'Basic animations & theming', '1 week of post-launch support'],
  },
  {
    name: 'Growth',
    bdPrice: '৳1,15,000',
    usdPrice: '$950',
    cadence: 'Monthly',
    strategy: 'High-value retainer',
    highlight: 'For product teams shipping every week.',
    featured: true, // This triggers the glowing border
    features: ['Ongoing feature work', 'Priority bug fixes', 'Design & implementation reviews', 'Dedicated Slack channel'],
  },
  {
    name: 'Dedicated',
    cadence: 'Monthly',
    strategy: 'Enterprise squad',
    highlight: 'For companies who want a long-term partner.',
    features: ['Embedded squad', 'Custom SLAs & coverage', 'Architecture & roadmap guidance', 'Unlimited revisions'],
  },
]

export default function SubscriptionsPage() {
  const [open, setOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle')

  function openForPlan(planName: string) {
    setSelectedPlan(planName)
    setOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedPlan) return
    setStatus('sending')
    try {
      // include the selected plan as a bolded heading in the HTML message
      // if `message` state is empty (due to contentEditable timing), read DOM fallback
      const editorEl = document.querySelector('[data-rich-text-editor]') as HTMLElement | null
      const editorContent = editorEl?.innerHTML || ''
      const contentHtml = editorContent || message
      const messageHtml = `<div><strong>Plan: ${selectedPlan}</strong><br/><br/>${contentHtml}</div>`

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject: `${selectedPlan} plan inquiry`, message: messageHtml }),
      })
      if (res.ok) {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
        setTimeout(() => setOpen(false), 1200)
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
      <section className="relative py-24 bg-white dark:bg-slate-950 overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6"
            >
              Ready to <span className="text-blue-600">scale?</span>
            </motion.h1>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                {/* --- THE GLOWING BORDER LOGIC --- */}
                {plan.featured && (
                  <>
                    {/* Animated Gradient Layer */}
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute -inset-[2px] rounded-[2.6rem] z-0 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_150deg,#3b82f6_180deg,#8b5cf6_210deg,transparent_240deg)] opacity-100"
                    />
                    {/* Outer Glow Blur */}
                    <div className="absolute -inset-[2px] rounded-[2.6rem] z-0 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_150deg,#3b82f6_180deg,#8b5cf6_210deg,transparent_240deg)] blur-xl opacity-50" />
                  </>
                )}
                {/* -------------------------------- */}

                <div className={`relative z-10 h-full rounded-[2.5rem] p-8 flex flex-col transition-all duration-300 ${
                  plan.featured
                    ? 'bg-slate-900 text-white'
                    : 'bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800'
                }`}>
                  {plan.featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                      <Sparkles size={12} />
                      MOST POPULAR
                    </div>
                  )}

                  <div className="mb-6">
                    <h2 className="text-xl font-bold">{plan.name}</h2>
                    <p className={`text-sm mt-2 ${plan.featured ? 'text-slate-400' : 'text-gray-500'}`}>
                      {plan.highlight}
                    </p>
                  </div>

                  { (plan.bdPrice || plan.usdPrice) ? (
                    <div className="mb-6">
                      <div className="flex items-baseline gap-3">
                        {plan.bdPrice && <span className="text-3xl font-extrabold">{plan.bdPrice}</span>}
                        {plan.bdPrice && <span className="text-sm opacity-60">BDT</span>}
                      </div>
                      <div className="flex items-baseline gap-3 mt-1">
                        {plan.usdPrice && <span className="text-2xl font-semibold">{plan.usdPrice}</span>}
                        {plan.usdPrice && <span className="text-sm opacity-60">USD</span>}
                        <span className="text-sm opacity-60 ml-3">{plan.cadence}</span>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-slate-400 mt-3">{plan.strategy}</div>
                    </div>
                  ) : (
                    <div className="mb-6">
                      <div className="text-sm text-gray-500 dark:text-slate-400">{plan.cadence}</div>
                      <div className="text-sm text-gray-500 dark:text-slate-400 mt-2">{plan.strategy}</div>
                    </div>
                  )}

                  <ul className="space-y-4 mb-10 flex-grow">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.featured ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <span className={plan.featured ? 'text-slate-300' : 'text-gray-600 dark:text-gray-300'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => openForPlan(plan.name)}
                    className={`w-full py-4 rounded-2xl text-sm font-bold transition-all ${
                      plan.featured
                        ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20'
                        : 'bg-gray-900 dark:bg-white text-white dark:text-slate-900'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          {/* --- Modal --- */}
          <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogTitle className="sr-only">{selectedPlan ? `Get started — ${selectedPlan}` : 'Get started'}</DialogTitle>
                <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900">
                      <span className="text-xs text-blue-600 font-semibold">{selectedPlan}</span>
                      <span className="text-xs text-gray-500">inquiry</span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white">Tell us a bit about your project</h3>
                    <p className="mt-1 text-sm text-gray-500">We’ll reply to the email you provide. Your selected plan is included automatically.</p>
                  </div>
                  <div className="hidden sm:flex items-center rounded-lg bg-gray-50 dark:bg-slate-900 px-3 py-2">
                    <div className="text-sm text-gray-600">Plan</div>
                    <div className="ml-3 text-sm font-bold text-gray-900 dark:text-white">{selectedPlan}</div>
                  </div>
                </div>

                <form className="space-y-4 mt-1" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <label className="relative block">
                      <div className="flex items-center gap-2 text-xs text-gray-600 mb-1"><User size={14} /> Name</div>
                      <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your full name" className="w-full rounded-xl border border-gray-200 dark:border-slate-800 px-3 py-2 text-sm bg-white dark:bg-slate-950" />
                    </label>

                    <label className="relative block">
                      <div className="flex items-center gap-2 text-xs text-gray-600 mb-1"><Mail size={14} /> Email</div>
                      <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="you@example.com" className="w-full rounded-xl border border-gray-200 dark:border-slate-800 px-3 py-2 text-sm bg-white dark:bg-slate-950" />
                    </label>
                  </div>

                  <label className="block">
                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-1"><MessageSquare size={14} /> Message</div>
                    <RichTextEditor value={message} onChange={(html) => setMessage(html)} placeholder={`Hi, I'm interested in the ${selectedPlan} plan. My requirements are...`} className="w-full" />
                  </label>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <DialogClose asChild>
                      <button type="button" className="px-4 py-2 rounded-md border">Cancel</button>
                    </DialogClose>
                    <button type="submit" className="px-5 py-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-500 text-white shadow-md" disabled={status === 'sending'}>
                      {status === 'sending' ? 'Sending…' : 'Send inquiry'}
                    </button>
                  </div>

                  {status === 'success' && (
                    <div className="mt-2 inline-flex items-center gap-2 text-sm text-green-600">
                      <Check size={16} />
                      Sent — we’ll be in touch shortly.
                    </div>
                  )}
                  {status === 'error' && <p className="text-sm text-red-600">Failed to send — try again later.</p>}
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </AppShell>
  )
}