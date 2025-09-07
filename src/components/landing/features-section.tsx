'use client'

import { motion } from 'framer-motion'
import { Heart, Users, Ship, MessageCircle, Dice6, Coffee, ArrowRight } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { GradientButton } from '@/components/ui/gradient-button'

const features = [
  {
    icon: Users,
    title: "COMMUNITIES",
    subtitle: "Join Your Tribe",
    description: "Discover and join interest-based communities. From study groups to hobby circles, find your people and build lasting connections! 👥",
    gradient: "from-blue-500 to-cyan-500",
    stats: "500+ active communities"
  },
  {
    icon: Heart,
    title: "SMART MATCHING",
    subtitle: "AI-Powered Connections",
    description: "Our AI finds compatible study buddies, activity partners, and potential dates based on your interests and campus life. Quality over quantity! 💕",
    gradient: "from-pink-500 to-rose-500",
    stats: "2000+ successful matches"
  },
  {
    icon: Ship,
    title: "FRIEND INTRODUCTIONS",
    subtitle: "Social Wingman",
    description: "Help friends connect! Introduce people you think would get along great. Anonymous introductions make networking natural and fun! 🚢",
    gradient: "from-purple-500 to-pink-500",
    stats: "1000+ introductions made"
  },
  {
    icon: MessageCircle,
    title: "RIZZ IN 5",
    subtitle: "Quality Conversations",
    description: "Start with 5 meaningful messages, then move to your preferred platform. No endless scrolling, just genuine connections that matter. 💬",
    gradient: "from-indigo-500 to-purple-500",
    stats: "95% response rate"
  },
  {
    icon: Dice6,
    title: "DAILY DISCOVER",
    subtitle: "Campus Serendipity",
    description: "Discover someone new every day! AI-curated connections, campus events, and community highlights. Never miss out on campus life! ✨",
    gradient: "from-cyan-500 to-blue-500",
    stats: "Fresh discoveries daily"
  },
  {
    icon: Coffee,
    title: "CAMPUS EVENTS",
    subtitle: "Real-World Meetups",
    description: "Organize and join campus events, study sessions, and social gatherings. From coffee chats to fest planning - make it happen! 🎉",
    gradient: "from-orange-500 to-red-500",
    stats: "300+ events monthly"
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
            <span className="text-white/90 text-sm font-medium">✨ Core Features</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Build Campus Connections
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Join communities, discover study buddies, and create lasting friendships. 
            Smart socialising designed for campus life! 🎓✨
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-8 h-full group" hover={true}>
                {/* Icon */}
                <motion.div 
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-purple-300 font-medium mb-3">
                    {feature.subtitle}
                  </p>
                  <p className="text-white/70 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <div className="text-sm text-white/50">
                    {feature.stats}
                  </div>
                </div>

                {/* CTA */}
                <motion.div
                  className="flex items-center text-purple-400 font-medium group-hover:text-purple-300 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <span>Explore Feature</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <GradientButton size="lg" variant="primary">
            Join Your Campus Community! 🎓
            <ArrowRight className="w-5 h-5" />
          </GradientButton>
        </motion.div>
      </div>
    </section>
  )
}