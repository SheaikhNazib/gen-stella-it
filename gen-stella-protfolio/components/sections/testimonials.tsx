import React from 'react'
import type { Testimonial } from '@/types'
import ProfilePlaceholder from '@/components/ui/profile-placeholder'

export function TestimonialsSection({ items }: { items?: Testimonial[] }) {
  if (!items || items.length === 0) return null

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {items.map((t) => (
        <blockquote key={t.id} className="rounded-2xl border border-gray-200/70 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 p-6">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">“{t.quote}”</p>
          <div className="flex items-center gap-3 mb-3">
            <ProfilePlaceholder name={t.author} src={t.image || ''} size="md" className="h-10 w-10 flex-shrink-0" />
            <div className="text-xs text-gray-500">
              <div className="font-semibold text-gray-900 dark:text-white">{t.author}</div>
              <div>{t.title} · {t.company}</div>
            </div>
          </div>
        </blockquote>
      ))}
    </div>
  )
}

export default TestimonialsSection

