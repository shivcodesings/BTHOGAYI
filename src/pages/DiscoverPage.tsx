'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { GlassCard } from '@/components/ui/glass-card'
import { GradientButton } from '@/components/ui/gradient-button'
import { AuthGuard } from '@/components/auth/auth-guard'
import { Sparkles, ArrowLeft, Calendar, Users, MapPin, Clock, Star, Coffee, BookOpen, Music, Camera, Trophy, Gift } from 'lucide-react'
import { useAuthStore } from '@/lib/store'

interface DailyHighlight {
  id: string
  type: 'student' | 'community' | 'event' | 'achievement'
  title: string
  description: string
  image?: string
  action_text: string
  action_url: string
  featured_at: string
}

interface CampusEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  attendees: number
  category: 'academic' | 'social' | 'cultural' | 'sports'
  organizer: string
}

export default function DiscoverPage() {
  const { user, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [dailyHighlight, setDailyHighlight] = useState<DailyHighlight | null>(null)
  const [upcomingEvents, setUpcomingEvents] = useState<CampusEvent[]>([])
  const [streakCount, setStreakCount] = useState(7)
  const [showStreakReward, setShowStreakReward] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth')
      return
    }
    loadDailyContent()
  }, [isAuthenticated, navigate])

  const loadDailyContent = async () => {
    try {
      setLoading(true)
      
      // Mock daily highlight
      const highlights: DailyHighlight[] = [
        {
          id: '1',
          type: 'student',
          title: 'Featured Student: Arjun Sharma',
          description: 'CS student building an AI-powered study assistant. Looking for collaborators and beta testers!',
          action_text: 'Connect with Arjun',
          action_url: '/profile/arjun',
          featured_at: new Date().toISOString()
        },
        {
          id: '2',
          type: 'community',
          title: 'Trending: Photography Club',
          description: 'Join 200+ students sharing campus photography and organizing photo walks every weekend.',
          action_text: 'Join Community',
          action_url: '/communities/photography',
          featured_at: new Date().toISOString()
        },
        {
          id: '3',
          type: 'event',
          title: 'Upcoming: Tech Talk by Alumni',
          description: 'Industry insights from recent graduates now working at top tech companies. Free pizza!',
          action_text: 'Register Now',
          action_url: '/events/tech-talk',
          featured_at: new Date().toISOString()
        }
      ]

      setDailyHighlight(highlights[Math.floor(Math.random() * highlights.length)])

      // Mock upcoming events
      const events: CampusEvent[] = [
        {
          id: '1',
          title: 'Study Group: Data Structures',
          description: 'Weekly problem-solving session for CS students',
          date: 'Tomorrow',
          time: '7:00 PM',
          location: 'Library Study Room 3',
          attendees: 12,
          category: 'academic',
          organizer: 'CS Study Circle'
        },
        {
          id: '2',
          title: 'Campus Photography Walk',
          description: 'Explore campus architecture and capture golden hour shots',
          date: 'This Saturday',
          time: '5:30 PM',
          location: 'Main Gate',
          attendees: 25,
          category: 'cultural',
          organizer: 'Photography Club'
        },
        {
          id: '3',
          title: 'Gaming Tournament: Valorant',
          description: 'Inter-batch Valorant tournament with cash prizes',
          date: 'Next Week',
          time: '6:00 PM',
          location: 'Computer Lab 2',
          attendees: 64,
          category: 'sports',
          organizer: 'Esports Society'
        }
      ]

      setUpcomingEvents(events)
    } catch (error) {
      console.error('Error loading daily content:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return <BookOpen className="w-4 h-4" />
      case 'social': return <Coffee className="w-4 h-4" />
      case 'cultural': return <Camera className="w-4 h-4" />
      case 'sports': return <Trophy className="w-4 h-4" />
      default: return <Calendar className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'from-blue-500 to-cyan-500'
      case 'social': return 'from-orange-500 to-red-500'
      case 'cultural': return 'from-purple-500 to-pink-500'
      case 'sports': return 'from-green-500 to-teal-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

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
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
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
                  Daily Discover
                </h1>
                <p className="text-white/70">
                  Campus highlights, events, and fresh connections
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 rounded-full">
                <Trophy className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-medium">{streakCount} Day Streak</span>
              </div>
            </div>
          </motion.div>

          {/* Daily Highlight */}
          {dailyHighlight && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <GlassCard className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Today's Highlight</h2>
                    <p className="text-white/60 text-sm">Curated just for you</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4 mb-4">
                  <h3 className="text-white font-medium mb-2">{dailyHighlight.title}</h3>
                  <p className="text-white/70 text-sm mb-3">{dailyHighlight.description}</p>
                  <GradientButton variant="romantic" size="sm">
                    {dailyHighlight.action_text}
                  </GradientButton>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  Upcoming Events
                </h2>
                <GradientButton variant="secondary" size="sm">
                  View All Events
                </GradientButton>
              </div>

              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${getCategoryColor(event.category)} flex items-center justify-center`}>
                          {getCategoryIcon(event.category)}
                        </div>
                        <div>
                          <h3 className="text-white font-medium mb-1">{event.title}</h3>
                          <p className="text-white/70 text-sm mb-2">{event.description}</p>
                          <div className="flex items-center gap-4 text-white/60 text-xs">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{event.date} at {event.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              <span>{event.attendees} attending</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <GradientButton variant="secondary" size="sm">
                        RSVP
                      </GradientButton>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard className="p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                Quick Actions
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => navigate('/communities')}
                  className="p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-left"
                >
                  <Users className="w-8 h-8 text-blue-400 mb-2" />
                  <h3 className="text-white font-medium text-sm">Browse Communities</h3>
                  <p className="text-white/60 text-xs">Find your tribe</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => navigate('/match')}
                  className="p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-left"
                >
                  <Sparkles className="w-8 h-8 text-purple-400 mb-2" />
                  <h3 className="text-white font-medium text-sm">Smart Match</h3>
                  <p className="text-white/60 text-xs">AI-powered connections</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => navigate('/introductions')}
                  className="p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-left"
                >
                  <Coffee className="w-8 h-8 text-green-400 mb-2" />
                  <h3 className="text-white font-medium text-sm">Make Introductions</h3>
                  <p className="text-white/60 text-xs">Help friends connect</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => navigate('/messages')}
                  className="p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-left"
                >
                  <Music className="w-8 h-8 text-pink-400 mb-2" />
                  <h3 className="text-white font-medium text-sm">Rizz in 5</h3>
                  <p className="text-white/60 text-xs">Quality conversations</p>
                </motion.button>
              </div>
            </GlassCard>
          </motion.div>

          {/* Streak Reward Modal */}
          <AnimatePresence>
            {showStreakReward && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
                onClick={() => setShowStreakReward(false)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 max-w-md w-full text-center"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Trophy className="w-12 h-12 text-white" />
                  </motion.div>

                  <h2 className="text-3xl font-bold text-white mb-4">
                    Streak Achievement! 🏆
                  </h2>
                  <p className="text-white/90 mb-6">
                    Amazing! You've maintained a {streakCount}-day discovery streak! 
                    Keep exploring campus life daily for more rewards.
                  </p>

                  <div className="bg-white/20 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-center gap-2 text-white">
                      <Gift className="w-5 h-5" />
                      <span className="font-medium">Reward: Priority community recommendations!</span>
                    </div>
                  </div>

                  <GradientButton
                    variant="romantic"
                    onClick={() => setShowStreakReward(false)}
                    className="w-full"
                  >
                    Claim Reward! 🎁
                  </GradientButton>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AuthGuard>
  )
}