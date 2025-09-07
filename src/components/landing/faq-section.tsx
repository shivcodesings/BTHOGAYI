'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'

const faqs = [
  {
    question: "Who can join ORIGO?",
    answer: "Only verified college students from premier institutions like IITs, NITs, and BITS can join. You need a valid college email address and student ID for verification."
  },
  {
    question: "How does the AI matching work?",
    answer: "Our AI analyzes your interests, academic background, and campus activities to suggest compatible study buddies, activity partners, and communities. It focuses on building meaningful connections."
  },
  {
    question: "What is Rizz in 5?",
    answer: "Our quality conversation system gives you 5 meaningful messages to make a great first impression. After that, you can move to your preferred messaging platform for deeper conversations."
  },
  {
    question: "How do friend introductions work?",
    answer: "Friends can introduce you to other students they think you'd get along with. These introductions can be anonymous and include compatibility insights to break the ice naturally."
  },
  {
    question: "Is my data safe?",
    answer: "Absolutely! We use campus verification, secure data storage, and never share your personal information. Your privacy and safety are our top priorities."
  },
  {
    question: "Can I connect with students from other institutions?",
    answer: "Yes! ORIGO connects students across premier institutions. Premium users can network across IITs, NITs, BITS, and other partner colleges."
  },
  {
    question: "How do I get verified?",
    answer: "Upload your student ID and a clear profile photo. Our team manually verifies each account to ensure authenticity and safety."
  },
  {
    question: "Is ORIGO free?",
    answer: "Yes, ORIGO is free for all verified college students. Premium features (₹399/month) unlock cross-campus networking and advanced community tools."
  }
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Everything you need to know about BITSPARK
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard className="overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-white/70 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/70 flex-shrink-0" />
                  )}
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <p className="text-white/70 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}