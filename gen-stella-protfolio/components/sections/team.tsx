'use client'

import React from 'react'
import ProfilePlaceholder from '@/components/ui/profile-placeholder'
import { teamMembers as defaultMembers, type TeamMember } from '@/data/team'

export function TeamSection({ members = defaultMembers }: { members?: TeamMember[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {members.map((m) => (
        <div key={m.id} className="rounded-2xl border border-gray-200/70 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm p-4 text-sm">
          <div className="flex items-center gap-3 mb-3">
            <ProfilePlaceholder name={m.name} src={m.image} size="md" className="w-12 h-12" />
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">{m.name}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{m.role}</div>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">{m.bio}</p>
        </div>
      ))}
    </div>
  )
}

