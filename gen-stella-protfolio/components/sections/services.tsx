/**
 * ServicesSection — data-driven services grid
 *
 * Renders `services` from `data/services.ts` using existing UI primitives
 * (Card, Badge, Button). Includes tech badges and optional case-study links.
 */

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { services } from '@/data/services'

export function ServicesSection() {
  const techLogoMap: Record<string, string> = {
    'React': 'react.svg',
    'Next.js': 'nextjs.svg',
    'TypeScript': 'typescript.svg',
    'Tailwind CSS': 'tailwindcss.svg',
    'React Native': 'react-native.svg',
    'Expo': 'expo.svg',
    'PWA': 'pwa.svg',
    'Node.js': 'nodejs.svg',
    'NestJS': 'nestjs.svg',
    'Express': 'express.svg',
    'PostgreSQL': 'postgresql.svg',
    'MongoDB': 'mongodb.svg',
    'Prisma': 'prisma.svg',
    'Vercel': 'vercel.svg',
    'DigitalOcean': 'digitalocean.svg',
    'AWS': 'aws.svg',
    'Docker': 'docker.svg',
    'Figma': 'figma.svg',
  }

  return (
    <div className="mt-16 grid md:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
          whileHover={{ y: -8 }}
          className="relative p-[1px] rounded-3xl overflow-hidden bg-gradient-to-br from-slate-200 via-blue-200 to-purple-200 dark:from-slate-800 dark:via-slate-900 dark:to-slate-900"
        >
          <Card className="h-full rounded-[22px] bg-white dark:bg-slate-950 px-6 py-8 flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-semibold">
              {index + 1}
            </div>

            <CardTitle className="text-xl">{service.title}</CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
              {service.description}
            </CardDescription>

            <CardContent className="pt-4 flex-1">
              <ul className="mt-2 space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-blue-500" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                {(service.technologies || []).map((t) => {
                  const logo = techLogoMap[t]
                  return (
                    <Badge key={t} variant="outline" className="flex items-center gap-2">
                      {logo ? (
                        <img
                          src={`/tech/${logo}`}
                          alt={`${t} logo`}
                          className="h-4 w-4 rounded-sm object-contain"
                        />
                      ) : null}
                      <span>{t}</span>
                    </Badge>
                  )
                })}
              </div>
            </CardContent>

            <CardFooter className="pt-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                {service.caseStudySlug && (
                  <Link
                    href={`/portfolio/${service.caseStudySlug}`}
                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  >
                    View case study
                  </Link>
                )}
              </div>

              <div>
                <Link href={service.ctaHref || '/contact'}>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800"
                  >
                    {service.ctaText || 'Get a quote'}
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

