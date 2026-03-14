import React from 'react'
import { testimonials as defaultTestimonials, type Testimonial } from '@/data/testimonials'

export function TestimonialsSection({ items = defaultTestimonials }: { items?: Testimonial[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {items.map((t) => (
        <blockquote key={t.id} className="rounded-2xl border border-gray-200/70 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 p-6">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">“{t.quote}”</p>
          <div className="text-xs text-gray-500">
            <div className="font-semibold text-gray-900 dark:text-white">{t.author}</div>
            <div>{t.title} · {t.company}</div>
          </div>
        </blockquote>
      ))}
    </div>
  )
}

