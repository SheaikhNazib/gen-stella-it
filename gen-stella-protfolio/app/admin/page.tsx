"use client"

import Link from "next/link"

export default function AdminPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-xl w-full bg-card p-8 rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-2">Admin / Content</h1>
        <p className="text-muted-foreground mb-4">This is a placeholder admin page. You can use it to build a custom CMS or integrate a headless CMS.</p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>Option: Integrate a headless CMS (Sanity, Contentful, Strapi).</li>
          <li>Option: Git-backed CMS (Netlify CMS, TinaCMS, Forestry).</li>
          <li>Option: Custom admin with NextAuth + Prisma + Postgres.</li>
        </ul>
        <div className="flex gap-2">
          <Link href="/" className="btn">Return home</Link>
          <a href="https://nextjs.org/docs/app/building-your-application/routing" target="_blank" rel="noreferrer" className="btn btn-secondary">App router docs</a>
        </div>
      </div>
    </main>
  )
}
