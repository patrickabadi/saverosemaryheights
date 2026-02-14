'use client'

import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="relative">
      {/* Banner Image Section */}
      <div className="relative h-96 w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/school.webp"
          alt="Rosemary Heights School"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Title Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold font-display text-white text-center leading-tight"
          >
            Save Rosemary
            <span className="block text-primary-300">Heights</span>
          </motion.h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <div className="prose prose-lg mx-auto dark:prose-invert">
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Nestled in the heart of South Surrey, BC, Canada, Rosemary Heights is a cherished small community 
                neighborhood that embodies the perfect blend of suburban tranquility and natural beauty. Our tree-lined 
                streets, family-friendly atmosphere, and close-knit community spirit make this area a truly special 
                place to call home.
              </p>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                The Rosemary Heights Community Association (RHCA) was established with a clear mission: to protect 
                and preserve the unique character of our neighborhood while advocating for thoughtful, responsible 
                development that respects our community&apos;s values and heritage. We believe that maintaining the 
                balance between growth and preservation is essential for future generations.
              </p>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Through this platform, we invite you to stay informed about local issues that affect our daily lives, 
                discover upcoming community events that bring us together, and learn about important initiatives that 
                shape our neighborhood&apos;s future. Together, we can ensure that Rosemary Heights remains the 
                wonderful community we all treasure.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
