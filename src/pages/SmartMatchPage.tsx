'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { GlassCard } from '@/components/ui/glass-card'
import { GradientButton } from '@/components/ui/gradient-button'
import { AuthGuard } from '@/components/auth/auth-guard'
import { Brain, ArrowLeft, Users, BookOpen, Coffee, Gamepad2, Heart, Star, MapPin, GraduationCap, MessageCircle, X } from 'lucide-react'
import { useAuthStore } from '@/lib/store'
import { useRecommendations } from '@/lib/recommendation-api'
import type { RecommendationItem } from '@/lib/recommendation-api'

interface SmartMatch extends RecommendationItem {
  display_name: string
  bio: string
  campus: string
  year: number
  branch: string
  match_type: 'study_buddy' | 'activity_partner' | 'friend' | 'potential_date'
  suggested_activity: string
}

export default function SmartMatchPage() {
  const { user, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const { getRecommendations, submitFeedback } = useRecommendations()
  const [loading, setLoading] = useState(true)
  const [matches, setMatches] = useState<SmartMatch[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null)
  const [showMatch, setShowMatch] = useState(false)
  const [matchedUser, setMatchedUser] = useState<SmartMatch | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth')
      return
    }
    loadSmartMatches()
  }, [isAuthenticated, navigate])

  const loadSmartMatches = async () => {
    try {
      setLoading(true)
      
      if (!user?.id) return

      // Get AI recommendations
      const recommendations = await getRecommendations(user.id, 'friends', 20)
      
      // Transform recommendations into smart matches with additional data
      const smartMatches: SmartMatch[] = recommendations.map(rec => ({
        ...rec,
        display_name: `Student ${rec.user_id.slice(0, 8)}`,
        bio: generateBio(rec),
        campus: user.campus || 'Main Campus',
        year: Math.floor(Math.random() * 4) + 1,
        branch: generateBranch(),
        match_type: determineMatchType(rec),
        suggested_activity: generateActivity(rec)
      }))

      setMatches(smartMatches)
    } catch (error) {
      console.error('Error loading smart matches:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateBio = (rec: RecommendationItem): string => {
    const bios = [
      'Love exploring new technologies and building cool projects! Always up for study sessions and tech discussions.',
      'Passionate about sustainable engineering and environmental solutions. Looking for like-minded collaborators.',
      'Music enthusiast and part-time photographer. Enjoy campus events and creative projects.',
      'Fitness enthusiast and academic achiever. Balancing sports and studies with great friends.',
      'Bookworm and debate lover. Enjoy deep conversations and intellectual challenges.',
      'Gaming enthusiast and coding wizard. Building the next big app in my free time.'
    ]
    return bios[Math.floor(Math.random() * bios.length)]
  }

  const generateBranch = (): string => {
    const branches = [
      'Computer Science', 'Electronics & Communication', 'Mechanical Engineering',
      'Civil Engineering', 'Chemical Engineering', 'Biotechnology', 'Economics',
      'Mathematics', 'Physics', 'Information Systems'
    ]
    return branches[Math.floor(Math.random() * branches.length)]
  }

  const determineMatchType = (rec: RecommendationItem): SmartMatch['match_type'] => {
    if (rec.common_interests.some(i => ['study', 'academic', 'research'].some(keyword => i.toLowerCase().includes(keyword)))) {
      return 'study_buddy'
    }
    if (rec.common_interests.some(i => ['sports', 'music', 'gaming', 'art'].some(keyword => i.toLowerCase().includes(keyword)))) {
      return 'activity_partner'
    }
    if (rec.compatibility_score > 0.8) {
      return 'potential_date'
    }
    return 'friend'
  }

  const generateActivity = (rec: RecommendationItem): string => {
    const activities = {
      study_buddy: ['📚 Study session at library', '💻 Coding practice together', '🧪 Lab work collaboration'],
      activity_partner: ['🎵 Jam session', '⚽ Sports activity', '🎮 Gaming tournament'],
      friend: ['☕ Coffee chat', '🍕 Campus food tour', '🎬 Movie night'],
      potential_date: ['🌅 Campus walk', '📖 Book discussion', '🎨 Art gallery visit']
    }
    
    const matchType = determineMatchType(rec)
    const typeActivities = activities[matchType]
    return typeActivities[Math.floor(Math.random() * typeActivities.length)]
  }

  const handleSwipe = async (direction: 'left' | 'right') => {
    if (currentIndex >= matches.length || !user?.id) return

    const currentMatch = matches[currentIndex]
    setSwipeDirection(direction)

    try {
      // Submit feedback
      await submitFeedback(
        user.id,
        currentMatch.user_id,
        direction === 'right' ? 'like' : 'pass'
      )

      if (direction === 'right') {
        // Check for mutual match (simulate for demo)
        const isMatch = Math.random() > 0.7 // 30% chance of mutual match
        if (isMatch) {
          setMatchedUser(currentMatch)
          setShowMatch(true)
        }
      }

      // Move to next match
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1)
        setSwipeDirection(null)
      }, 300)
    } catch (error) {
      console.error('Error handling swipe:', error)
    }
  }

  const getMatchTypeIcon = (type: SmartMatch['match_type']) => {
    switch (type) {
      case 'study_buddy': return <BookOpen className="w-4 h-4" />
      case 'activity_partner': return <Gamepad2 className="w-4 h-4" />
      case 'potential_date': return <Heart className="w-4 h-4" />
      default: return <Users className="w-4 h-4" />
    }
  }

  const getMatchTypeColor = (type: SmartMatch['match_type']) => {
    switch (type) {
      case 'study_buddy': return 'from-blue-500 to-cyan-500'
      case 'activity_partner': return 'from-purple-500 to-pink-500'
      case 'potential_date': return 'from-pink-500 to-rose-500'
      default: return 'from-green-500 to-teal-500'
    }
  }

  const getMatchTypeLabel = (type: SmartMatch['match_type']) => {
    switch (type) {
      case 'study_buddy': return 'Study Buddy'
      case 'activity_partner': return 'Activity Partner'
      case 'potential_date': return 'Potential Date'
      default: return 'Friend'
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

  if (matches.length === 0 || currentIndex >= matches.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="container mx-auto px-6 py-8">
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
                  Smart Match
                </h1>
                <p className="text-white/70">
                  AI-powered study buddy and activity partner finder
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center py-16"
          >
            <GlassCard className="p-12 max-w-2xl mx-auto">
              <Brain className="w-24 h-24 text-purple-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                No More Matches Available
              </h2>
              <p className="text-white/70 mb-8">
                You've seen all available matches for today. Check back tomorrow for fresh AI-powered recommendations!
              </p>
              <GradientButton
                variant="romantic"
                onClick={() => navigate('/dashboard')}
              >
                Back to Dashboard
              </GradientButton>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    )
  }

  const currentMatch = matches[currentIndex]

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
                  Smart Match
                </h1>
                <p className="text-white/70">
                  AI-powered study buddy and activity partner finder
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <Brain className="w-5 h-5 text-purple-400" />
              <span>{currentIndex + 1} of {matches.length}</span>
            </div>
          </motion.div>

          {/* Match Card */}
          <div className="flex justify-center mb-8">
            <motion.div
              key={currentMatch.user_id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: swipeDirection === 'left' ? -300 : swipeDirection === 'right' ? 300 : 0,
                rotate: swipeDirection === 'left' ? -30 : swipeDirection === 'right' ? 30 : 0
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.8,
                x: swipeDirection === 'left' ? -300 : 300,
                rotate: swipeDirection === 'left' ? -30 : 30
              }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md"
            >
              <GlassCard className="p-0 overflow-hidden">
                {/* Profile Section */}
                <div className="relative h-64 bg-gradient-to-br from-purple-500 to-pink-500">
                  <div className="w-full h-full flex items-center justify-center">
                    <Users className="w-24 h-24 text-white/50" />
                  </div>
                  
                  {/* Match Type Badge */}
                  <div className={`absolute top-4 left-4 bg-gradient-to-r ${getMatchTypeColor(currentMatch.match_type)} rounded-full px-3 py-1 flex items-center gap-1`}>
                    {getMatchTypeIcon(currentMatch.match_type)}
                    <span className="text-white text-sm font-medium">{getMatchTypeLabel(currentMatch.match_type)}</span>
                  </div>

                  {/* Compatibility Score */}
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white text-sm font-medium">
                      {Math.round(currentMatch.compatibility_score * 100)}%
                    </span>
                  </div>

                  {/* User Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h2 className="text-xl font-bold text-white mb-1">
                      {currentMatch.display_name}
                    </h2>
                    <div className="flex items-center gap-3 text-white/80 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{currentMatch.campus}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GraduationCap className="w-3 h-3" />
                        <span>{currentMatch.year}th Year {currentMatch.branch}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="p-4 border-t border-white/10">
                  <p className="text-white/80 text-sm mb-3">
                    {currentMatch.bio}
                  </p>
                </div>

                {/* Match Explanation */}
                <div className="p-4 border-t border-white/10">
                  <h3 className="text-white/80 text-sm font-medium mb-2 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-purple-400" />
                    Why AI Matched You:
                  </h3>
                  <p className="text-white/90 text-sm mb-3">
                    {currentMatch.explanation}
                  </p>
                </div>

                {/* Common Interests */}
                {currentMatch.common_interests.length > 0 && (
                  <div className="p-4 border-t border-white/10">
                    <h3 className="text-white/80 text-sm font-medium mb-2">
                      Common Interests:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {currentMatch.common_interests.slice(0, 4).map(interest => (
                        <span
                          key={interest}
                          className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested Activity */}
                <div className="p-4 border-t border-white/10">
                  <h3 className="text-white/80 text-sm font-medium mb-2 flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-green-400" />
                    Suggested Activity:
                  </h3>
                  <p className="text-white/90 text-sm">
                    {currentMatch.suggested_activity}
                  </p>
                </div>
              </GlassCard>

              {/* Swipe Animation Overlay */}
              <AnimatePresence>
                {swipeDirection && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`absolute inset-0 flex items-center justify-center ${
                      swipeDirection === 'right' ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    <div className={`text-8xl ${
                      swipeDirection === 'right' ? 'bg-green-500/20' : 'bg-red-500/20'
                    } rounded-full p-8 border-4 ${
                      swipeDirection === 'right' ? 'border-green-400' : 'border-red-400'
                    }`}>
                      {swipeDirection === 'right' ? '👍' : '👎'}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-6 mb-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSwipe('left')}
              className="w-16 h-16 bg-red-500/20 hover:bg-red-500/30 border-2 border-red-400 rounded-full flex items-center justify-center text-red-400 transition-all duration-200"
            >
              <X className="w-8 h-8" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSwipe('right')}
              className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-200"
            >
              <Users className="w-10 h-10" />
            </motion.button>
          </div>

          {/* Match Success Modal */}
          <AnimatePresence>
            {showMatch && matchedUser && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
                onClick={() => setShowMatch(false)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-gradient-to-br from-green-600 to-teal-600 rounded-3xl p-8 max-w-md w-full text-center"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Users className="w-12 h-12 text-white" />
                  </motion.div>

                  <h2 className="text-3xl font-bold text-white mb-4">
                    Perfect Match! 🎉
                  </h2>
                  <p className="text-white/90 mb-6">
                    You and {matchedUser.display_name} are compatible! 
                    Start a conversation and explore {matchedUser.suggested_activity.toLowerCase()}.
                  </p>

                  <div className="flex gap-3">
                    <GradientButton
                      variant="secondary"
                      onClick={() => setShowMatch(false)}
                      className="flex-1"
                    >
                      Keep Exploring
                    </GradientButton>
                    <GradientButton
                      variant="romantic"
                      onClick={() => {
                        setShowMatch(false)
                        navigate('/messages')
                      }}
                      className="flex-1"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Start Chat
                    </GradientButton>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AuthGuard>
  )
}