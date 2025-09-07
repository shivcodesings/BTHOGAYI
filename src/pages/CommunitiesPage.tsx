'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { GlassCard } from '@/components/ui/glass-card'
import { GradientButton } from '@/components/ui/gradient-button'
import { AuthGuard } from '@/components/auth/auth-guard'
import { Users, ArrowLeft, Search, Plus, BookOpen, Gamepad2, Music, Camera, Coffee, Code, Heart, Star, MapPin, Calendar, Crown } from 'lucide-react'
import { useAuthStore } from '@/lib/store'

const communityCategories = [
  {
    icon: BookOpen,
    title: "Study Groups",
    description: "Academic collaboration and exam prep",
    color: "from-blue-500 to-cyan-500",
    count: "45 groups",
    communities: [
      { name: "Data Structures & Algorithms", members: 234, activity: "Very Active" },
      { name: "Physics Problem Solving", members: 156, activity: "Active" },
      { name: "Economics Study Circle", members: 89, activity: "Moderate" }
    ]
  },
  {
    icon: Gamepad2,
    title: "Gaming & Esports",
    description: "Gaming communities and tournaments",
    color: "from-purple-500 to-pink-500",
    count: "28 groups",
    communities: [
      { name: "Valorant Campus League", members: 312, activity: "Very Active" },
      { name: "Chess Club", members: 145, activity: "Active" },
      { name: "Mobile Gaming Squad", members: 203, activity: "Active" }
    ]
  },
  {
    icon: Music,
    title: "Arts & Culture",
    description: "Creative expression and cultural events",
    color: "from-pink-500 to-rose-500",
    count: "32 groups",
    communities: [
      { name: "Campus Band Collective", members: 178, activity: "Very Active" },
      { name: "Photography Club", members: 267, activity: "Active" },
      { name: "Dance Society", members: 189, activity: "Active" }
    ]
  },
  {
    icon: Code,
    title: "Tech & Innovation",
    description: "Coding, hackathons, and tech discussions",
    color: "from-indigo-500 to-purple-500",
    count: "38 groups",
    communities: [
      { name: "Web Dev Bootcamp", members: 445, activity: "Very Active" },
      { name: "AI/ML Research Group", members: 234, activity: "Active" },
      { name: "Open Source Contributors", members: 167, activity: "Moderate" }
    ]
  },
  {
    icon: Coffee,
    title: "Social & Events",
    description: "Campus events and social gatherings",
    color: "from-orange-500 to-red-500",
    count: "25 groups",
    communities: [
      { name: "Weekend Explorers", members: 356, activity: "Very Active" },
      { name: "Coffee Chat Regulars", members: 123, activity: "Active" },
      { name: "Fest Planning Committee", members: 89, activity: "Very Active" }
    ]
  },
  {
    icon: Heart,
    title: "Support & Wellness",
    description: "Mental health and peer support",
    color: "from-green-500 to-teal-500",
    count: "15 groups",
    communities: [
      { name: "Mental Health Support", members: 234, activity: "Active" },
      { name: "Fitness Buddies", members: 178, activity: "Very Active" },
      { name: "Meditation & Mindfulness", members: 145, activity: "Moderate" }
    ]
  }
]

export default function CommunitiesPage() {
  const { user, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<typeof communityCategories[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth')
      return
    }
    setLoading(false)
  }, [isAuthenticated, navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full"
        />
      </div>
    )
  }

  return (
    <AuthGuard requireAuth={true} requireCompleteProfile={true}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center gap-4">
              <GradientButton
                variant="secondary"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="w-5 h-5" />
              </GradientButton>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Campus Communities
                </h1>
                <p className="text-white/70">
                  Discover and join interest-based groups on your campus
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <GradientButton
                variant="romantic"
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Community
              </GradientButton>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search communities..."
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </motion.div>

          {/* Community Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard 
                  className="p-6 h-full cursor-pointer group relative overflow-hidden"
                  hover={true}
                  onClick={() => setSelectedCategory(category)}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div 
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <category.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-bold text-white mb-2">
                      {category.title}
                    </h3>
                    <p className="text-white/70 mb-4 text-sm leading-relaxed">
                      {category.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">{category.count}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-white/60 text-sm">Popular</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Featured Communities */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12"
          >
            <GlassCard className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Crown className="w-6 h-6 text-yellow-400" />
                  Trending Communities
                </h2>
                <span className="text-white/60 text-sm">Most active this week</span>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {communityCategories.slice(0, 3).map((category) => 
                  category.communities.slice(0, 1).map((community, idx) => (
                    <motion.div
                      key={`${category.title}-${idx}`}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                          <category.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium text-sm">{community.name}</h3>
                          <p className="text-white/60 text-xs">{community.members} members</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          community.activity === 'Very Active' ? 'bg-green-500/20 text-green-400' :
                          community.activity === 'Active' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {community.activity}
                        </span>
                        <GradientButton variant="secondary" size="sm">
                          Join
                        </GradientButton>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </GlassCard>
          </motion.div>

          {/* Category Detail Modal */}
          <AnimatePresence>
            {selectedCategory && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedCategory(null)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-2xl max-h-[80vh] overflow-y-auto"
                >
                  <GlassCard className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${selectedCategory.color} flex items-center justify-center`}>
                          <selectedCategory.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-white">{selectedCategory.title}</h2>
                          <p className="text-white/70 text-sm">{selectedCategory.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5 text-white/70" />
                      </button>
                    </div>

                    {/* Communities List */}
                    <div className="space-y-3">
                      {selectedCategory.communities.map((community, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-white font-medium mb-1">{community.name}</h3>
                              <div className="flex items-center gap-4 text-white/60 text-sm">
                                <div className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  <span>{community.members} members</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{user?.campus} Campus</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`text-xs px-2 py-1 rounded-full mb-2 ${
                                community.activity === 'Very Active' ? 'bg-green-500/20 text-green-400' :
                                community.activity === 'Active' ? 'bg-blue-500/20 text-blue-400' :
                                'bg-yellow-500/20 text-yellow-400'
                              }`}>
                                {community.activity}
                              </div>
                              <GradientButton variant="secondary" size="sm">
                                Join
                              </GradientButton>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Create Community Modal */}
          <AnimatePresence>
            {showCreateModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setShowCreateModal(false)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-md"
                >
                  <GlassCard className="p-6">
                    <h2 className="text-xl font-bold text-white mb-6 text-center">
                      Create New Community
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Community Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Machine Learning Study Group"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Description
                        </label>
                        <textarea
                          placeholder="What's your community about?"
                          className="w-full h-24 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Category
                        </label>
                        <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                          <option value="">Select category</option>
                          {communityCategories.map((cat) => (
                            <option key={cat.title} value={cat.title}>{cat.title}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex gap-3">
                        <GradientButton
                          variant="secondary"
                          onClick={() => setShowCreateModal(false)}
                          className="flex-1"
                        >
                          Cancel
                        </GradientButton>
                        <GradientButton
                          variant="romantic"
                          onClick={() => setShowCreateModal(false)}
                          className="flex-1"
                        >
                          Create Community
                        </GradientButton>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AuthGuard>
  )
}