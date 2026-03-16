'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Clock, SendHorizontal } from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import { servicePackages, TIMELINE_MULTIPLIERS } from '@/data/pricing'
import type { ServicePackage, TimelineOption } from '@/types/pricing'

type TierKey = 'starter' | 'standard' | 'premium'

const TIER_INFO: Record<TierKey, { label: string; badge: string; color: string }> = {
  starter:  { label: 'Starter',  badge: 'Great start',    color: 'border-blue-400'   },
  standard: { label: 'Standard', badge: 'Most popular',   color: 'border-purple-500' },
  premium:  { label: 'Premium',  badge: 'Full power',     color: 'border-amber-400'  },
}

const TIMELINE_INFO: Record<TimelineOption, { label: string; detail: string; multiplier: number }> = {
  rush:     { label: 'Rush',     detail: '+40% — deliver ASAP',     multiplier: 1.4 },
  standard: { label: 'Standard', detail: 'Normal delivery timeline', multiplier: 1.0 },
  flexible: { label: 'Flexible', detail: '-10% — no rush',          multiplier: 0.9 },
}

function calcPrice(pkg: ServicePackage, tier: TierKey, timeline: TimelineOption) {
  const base = pkg.tiers[tier]
  const m = TIMELINE_MULTIPLIERS[timeline]
  return {
    bdt: Math.round(base.priceBDT * m),
    usd: Math.round(base.priceUSD * m),
    isMonthly: base.isMonthly,
  }
}

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit:  (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
}

export default function PricingPage() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)

  // Step 1 selections
  const [selectedPkg, setSelectedPkg] = useState<ServicePackage | null>(null)
  // Step 2 selections
  const [tier, setTier] = useState<TierKey>('standard')
  const [timeline, setTimeline] = useState<TimelineOption>('standard')
  // Step 3 form
  const [form, setForm] = useState({ name: '', email: '', phone: '', description: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  function go(next: number) {
    setDirection(next > step ? 1 : -1)
    setStep(next)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedPkg) return
    setStatus('sending')
    const price = calcPrice(selectedPkg, tier, timeline)
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          serviceType: selectedPkg.id,
          serviceTitle: selectedPkg.title,
          tier,
          timeline,
          priceBDT: price.bdt,
          priceUSD: price.usd,
          description: form.description || undefined,
        }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const price = selectedPkg ? calcPrice(selectedPkg, tier, timeline) : null

  return (
    <AppShell>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-widest uppercase text-blue-600 dark:text-blue-400 mb-3">
            Service Builder
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get a{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
              Transparent Quote
            </span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Pick your service, choose a tier and timeline, and we'll send a personalised proposal to your inbox.
          </p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {['Service', 'Package', 'Your Details'].map((label, idx) => (
            <div key={label} className="flex items-center gap-2">
              <button
                onClick={() => idx < step && go(idx)}
                disabled={idx > step}
                className={`flex items-center justify-center h-8 w-8 rounded-full text-sm font-semibold border-2 transition-all
                  ${step === idx ? 'bg-gradient-to-r from-blue-600 to-purple-500 border-transparent text-white' :
                    idx < step ? 'border-blue-500 text-blue-600 dark:text-blue-400 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20' :
                    'border-border text-muted-foreground cursor-not-allowed'}`}
              >
                {idx < step ? <Check size={14} /> : idx + 1}
              </button>
              <span className={`text-sm hidden sm:inline ${step === idx ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                {label}
              </span>
              {idx < 2 && <div className="w-8 h-px bg-border mx-1 hidden sm:block" />}
            </div>
          ))}
        </div>

        {/* Animated step panels */}
        <div className="relative overflow-hidden min-h-[360px]">
          <AnimatePresence custom={direction} mode="wait">
            {step === 0 && (
              <motion.div key="step0" custom={direction} variants={variants}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.28, ease: 'easeInOut' }}>
                <Step1
                  selectedPkg={selectedPkg}
                  onSelect={(pkg) => { setSelectedPkg(pkg); go(1) }}
                />
              </motion.div>
            )}
            {step === 1 && selectedPkg && (
              <motion.div key="step1" custom={direction} variants={variants}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.28, ease: 'easeInOut' }}>
                <Step2
                  pkg={selectedPkg}
                  tier={tier}
                  timeline={timeline}
                  onTier={setTier}
                  onTimeline={setTimeline}
                  onBack={() => go(0)}
                  onNext={() => go(2)}
                />
              </motion.div>
            )}
            {step === 2 && selectedPkg && price && (
              <motion.div key="step2" custom={direction} variants={variants}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.28, ease: 'easeInOut' }}>
                <Step3
                  pkg={selectedPkg}
                  tier={tier}
                  timeline={timeline}
                  price={price}
                  form={form}
                  onChange={setForm}
                  onBack={() => go(1)}
                  onSubmit={handleSubmit}
                  status={status}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </AppShell>
  )
}

/* ─── Step 1: Service selector ─────────────────────────────────────── */
function Step1({ selectedPkg, onSelect }: {
  selectedPkg: ServicePackage | null
  onSelect: (p: ServicePackage) => void
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-6">What do you need built?</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {servicePackages.map((pkg) => {
          const isSelected = selectedPkg?.id === pkg.id
          const basePrice = pkg.tiers.starter.priceBDT
          return (
            <button
              key={pkg.id}
              onClick={() => onSelect(pkg)}
              className={`text-left rounded-2xl border-2 p-5 transition-all hover:shadow-md group
                ${isSelected
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md'
                  : 'border-border bg-card hover:border-blue-400/50'}`}
            >
              <div className="text-3xl mb-3">{pkg.icon}</div>
              <h3 className="font-semibold text-foreground mb-1">{pkg.title}</h3>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{pkg.description}</p>
              <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                From ৳{basePrice.toLocaleString()}
                {pkg.tiers.starter.isMonthly ? '/mo' : ''}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Step 2: Tier + timeline ───────────────────────────────────────── */
function Step2({ pkg, tier, timeline, onTier, onTimeline, onBack, onNext }: {
  pkg: ServicePackage
  tier: TierKey
  timeline: TimelineOption
  onTier: (t: TierKey) => void
  onTimeline: (t: TimelineOption) => void
  onBack: () => void
  onNext: () => void
}) {
  const tierKeys = ['starter', 'standard', 'premium'] as TierKey[]
  const timelineKeys = ['rush', 'standard', 'flexible'] as TimelineOption[]

  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-6">
        {pkg.icon}  {pkg.title} — Choose a package
      </h2>

      {/* Tier cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {tierKeys.map((t) => {
          const info = TIER_INFO[t]
          const tierData = pkg.tiers[t]
          const price = calcPrice(pkg, t, timeline)
          const isSelected = tier === t
          return (
            <button
              key={t}
              onClick={() => onTier(t)}
              className={`rounded-2xl border-2 p-5 text-left transition-all hover:shadow-md
                ${isSelected ? `${info.color} shadow-md bg-card` : 'border-border bg-card hover:border-muted-foreground/40'}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-foreground">{info.label}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full
                  ${t === 'standard' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' :
                    t === 'premium'  ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' :
                    'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'}`}>
                  {info.badge}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground mb-0.5">
                ৳{price.bdt.toLocaleString()}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  {tierData.isMonthly ? '/mo' : 'one-time'}
                </span>
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                ≈ ${price.usd.toLocaleString()} USD
              </p>
              <ul className="space-y-1.5">
                {pkg.features
                  .filter((f) => {
                    if (t === 'starter') return f.tier === '$'
                    if (t === 'standard') return f.tier === '$' || f.tier === '$$'
                    return true
                  })
                  .slice(0, 5)
                  .map((f) => (
                    <li key={f.id} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Check size={12} className="mt-0.5 shrink-0 text-green-500" />
                      {f.label}
                    </li>
                  ))}
              </ul>
            </button>
          )
        })}
      </div>

      {/* Timeline */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Clock size={15} /> Timeline
        </h3>
        <div className="flex flex-wrap gap-3">
          {timelineKeys.map((t) => {
            const info = TIMELINE_INFO[t]
            return (
              <button
                key={t}
                onClick={() => onTimeline(t)}
                className={`px-4 py-2 rounded-xl border text-sm transition-all
                  ${timeline === t
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium'
                    : 'border-border text-muted-foreground hover:border-muted-foreground/60'}`}
              >
                <span className="font-semibold">{info.label}</span>{' — '}{info.detail}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={15} /> Back
        </button>
        <button onClick={onNext} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          Continue <ArrowRight size={15} />
        </button>
      </div>
    </div>
  )
}

/* ─── Step 3: Contact form + price summary ──────────────────────────── */
function Step3({ pkg, tier, timeline, price, form, onChange, onBack, onSubmit, status }: {
  pkg: ServicePackage
  tier: TierKey
  timeline: TimelineOption
  price: { bdt: number; usd: number; isMonthly?: boolean }
  form: { name: string; email: string; phone: string; description: string }
  onChange: (f: typeof form) => void
  onBack: () => void
  onSubmit: (e: React.FormEvent) => void
  status: 'idle' | 'sending' | 'success' | 'error'
}) {
  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 text-3xl">
          ✓
        </div>
        <h2 className="text-2xl font-bold text-foreground">Inquiry sent!</h2>
        <p className="text-muted-foreground max-w-sm">
          We'll review your request and get back to you within 24 hours with a detailed proposal.
        </p>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* Form */}
      <form onSubmit={onSubmit} className="lg:col-span-3 space-y-4">
        <h2 className="text-xl font-semibold text-foreground mb-2">Your contact details</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1" htmlFor="price-name">Name *</label>
            <input
              id="price-name"
              required
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => onChange({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1" htmlFor="price-email">Email *</label>
            <input
              id="price-email"
              required
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => onChange({ ...form, email: e.target.value })}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1" htmlFor="price-phone">Phone (optional)</label>
          <input
            id="price-phone"
            type="tel"
            placeholder="+880 1XXX-XXXXXX"
            value={form.phone}
            onChange={(e) => onChange({ ...form, phone: e.target.value })}
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1" htmlFor="price-desc">Project description</label>
          <textarea
            id="price-desc"
            rows={4}
            placeholder="Tell us about your project goals, features you need, any references..."
            value={form.description}
            onChange={(e) => onChange({ ...form, description: e.target.value })}
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/40 resize-none"
          />
        </div>

        {status === 'error' && (
          <p className="text-sm text-red-500">Something went wrong. Please try again or email us directly.</p>
        )}

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={15} /> Back
          </button>
          <button type="submit" disabled={status === 'sending'}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60">
            {status === 'sending' ? 'Sending…' : <><SendHorizontal size={15} /> Send Inquiry</>}
          </button>
        </div>
      </form>

      {/* Price summary */}
      <div className="lg:col-span-2">
        <div className="rounded-2xl border border-border bg-card p-6 sticky top-24">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Order Summary
          </h3>
          <div className="space-y-3 text-sm mb-5">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service</span>
              <span className="font-medium text-foreground">{pkg.icon} {pkg.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Package</span>
              <span className="font-medium text-foreground capitalize">{tier}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Timeline</span>
              <span className="font-medium text-foreground capitalize">{TIMELINE_INFO[timeline].label}</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between items-end">
              <span className="text-muted-foreground">Estimate</span>
              <div className="text-right">
                <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  ৳{price.bdt.toLocaleString()}
                  {price.isMonthly ? <span className="text-sm font-normal">/mo</span> : ''}
                </p>
                <p className="text-xs text-muted-foreground">≈ ${price.usd.toLocaleString()} USD</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            This is an estimate. Final price is confirmed in the proposal we send after your inquiry.
          </p>
        </div>
      </div>
    </div>
  )
}
