'use client'

import { useRouter } from 'next/navigation'
import HeroAnimation from '@/components/sections/heroanimation'
import { motion } from 'framer-motion'
import AppShell from '@/components/layout/AppShell'

export default function Home() {
  const router = useRouter()

  return (
    <AppShell>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[80vh] flex items-center">
        {/* THE ANIMATION BACKGROUND */}
        <HeroAnimation />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white/10 dark:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-6 rounded-2xl">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Build Amazing{' '}
                <span className="bg-gradient-to-r from-blue-500 to-purple-400 text-transparent bg-clip-text">
                  Digital Products
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                We create innovative software solutions that transform businesses and delight users.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105"
                  onClick={() => router.push('/portfolio')}
                >
                  Get Started
                </button>
                <button
                  className="border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-slate-800 transition-all"
                  onClick={() => router.push('/about')}
                >
                  Learn More
                </button>
              </div>
            </div>

            <div className="hidden md:flex justify-center items-center">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotateZ: [0, 1, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative w-80 h-96"
              >
                {/* Background Glows behind the card */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur-3xl animate-pulse" />

                {/* The Main "Glass" Card */}
                <div className="relative h-full w-full bg-white/5 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-3xl p-6 shadow-2xl overflow-hidden group">
                  {/* Decorative "Inner Orbit" */}
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/40 transition-colors duration-500" />

                  {/* Digital Content Mockup */}
                  <div className="space-y-4">
                    {/* Top Header Mockup */}
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400/60" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                      <div className="w-3 h-3 rounded-full bg-green-400/60" />
                    </div>

                    {/* Animated Skeleton Lines */}
                    <div className="h-4 w-3/4 bg-blue-500/20 rounded-md animate-pulse" />
                    <div className="h-4 w-1/2 bg-purple-500/20 rounded-md animate-pulse delay-75" />

                    {/* The "Stella" Core Element */}
                    <div className="py-8 flex justify-center">
                      <div className="relative">
                        {/* Spinning Rings */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                          className="w-32 h-32 border-2 border-dashed border-blue-400/30 rounded-full flex items-center justify-center"
                        />
                        <motion.div
                          animate={{ rotate: -360 }}
                          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                          className="absolute inset-0 border border-purple-500/20 rounded-full scale-110"
                        />
                        {/* Center "Star" */}
                        <div className="absolute inset-0 m-auto w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg rotate-45 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                          <div className="w-4 h-4 bg-white rounded-full blur-sm animate-ping" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Data Mockup */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="h-12 bg-white/5 rounded-xl border border-white/10 p-2">
                        <div className="h-1 w-full bg-blue-400/30 rounded mb-1" />
                        <div className="h-1 w-2/3 bg-blue-400/30 rounded" />
                      </div>
                      <div className="h-12 bg-white/5 rounded-xl border border-white/10 p-2">
                        <div className="h-1 w-full bg-purple-400/30 rounded mb-1" />
                        <div className="h-1 w-2/3 bg-purple-400/30 rounded" />
                      </div>
                    </div>
                  </div>

                  {/* Gloss Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gray-50 dark:bg-slate-900 py-24 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About Us</h3>
            <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Our Mission',
                desc: 'We empower businesses with cutting-edge technology solutions that drive growth and innovation.',
                icon: '🚀',
              },
              {
                title: 'Our Vision',
                desc: 'To be the leading software company that shapes the future of digital transformation.',
                icon: '✨',
              },
              {
                title: 'Our Values',
                desc: 'Innovation, integrity, and customer success drive everything we do.',
                icon: '💎',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-xl dark:shadow-none border border-transparent hover:border-blue-500/30 transition-all duration-300 group"
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-500 transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold text-gray-900 dark:text-white mb-16 text-center"
        >
          Our Services
        </motion.h3>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Web Development',
              desc: 'Custom web applications built with modern technologies like React, Next.js, and Node.',
            },
            {
              title: 'Mobile Apps',
              desc: 'Native-feel iOS and Android applications that provide seamless user experiences.',
            },
            {
              title: 'Cloud Solutions',
              desc: 'Scalable cloud infrastructure, DevOps automation, and secure hosting deployment.',
            },
          ].map((service, i) => (
            <motion.div
              key={service.title}
              whileHover={{ scale: 1.03 }}
              className="relative p-[1px] rounded-2xl overflow-hidden group bg-gray-200 dark:bg-slate-700 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-500 transition-all duration-500"
            >
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[15px] h-full transition-colors group-hover:bg-white/95 dark:group-hover:bg-slate-900/90">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                  <div className="font-bold text-xl">{i + 1}</div>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{service.title}</h4>
                <p className="text-gray-600 dark:text-gray-400">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="relative py-20 mt-20 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute inset-0 bg-blue-600 dark:bg-blue-950" />
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Start Your Project?</h3>
            <p className="text-xl text-blue-100 mb-10 opacity-90">
              Contact us today to discuss how we can help transform your business with Gen Stella technology.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] px-10 py-4 rounded-xl font-bold text-lg transition-all"
              onClick={() => router.push('/contact')}
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </div>
      </section>
    </AppShell>
  )
}

