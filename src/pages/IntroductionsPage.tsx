'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { GlassCard } from '@/components/ui/glass-card'
import { GradientButton } from '@/components/ui/gradient-button'
import { AuthGuard } from '@/components/auth/auth-guard'
import { UserPlus, ArrowLeft, Users, Heart, MessageCircle, Star, Crown, Send, Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '@/lib/store'

interface Introduction {
  id: string
  introducer_name: string
  target_user: {
    name: string
    bio: string
    campus: string
    year: number
    branch: string
    compatibility_score: number
  }
  message: string
  is_anonymous: boolean
  status: 'pending' | 'accepted' | 'declined'
  created_at: string
}

export default function IntroductionsPage() {
  const { user, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received')
  const [receivedIntros, setReceivedIntros] = useState<Introduction[]>([])
  const [sentIntros, setSentIntros] = useState<Introduction[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedFriend, setSelectedFriend] = useState('')
  const [selectedTarget, setSelectedTarget] = useState('')
  const [introMessage, setIntroMessage] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth')
      return
    }
    loadIntroductions()
  }, [isAuthenticated, navigate])

  const loadIntroductions = async () => {
    try {
      setLoading(true)
      
      // Mock data for demonstration
      const mockReceived: Introduction[] = [
        {
          id: '1',
          introducer_name: 'Priya Sharma',
          target_user: {
            name: 'Arjun Kumar',
            bio: 'CS student passionate about AI and machine learning',
            campus: user?.campus || 'Main Campus',
            year: 3,
            branch: 'Computer Science',
            compatibility_score: 0.87
          },
          message: 'You both love coding and have similar interests in AI! I think you\'d get along great.',
          is_anonymous: false,
          status: 'pending',
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          introducer_name: 'Anonymous Friend',
          target_user: {
            name: 'Sneha Patel',
            bio: 'Photography enthusiast and environmental activist',
            campus: user?.campus || 'Main Campus',
            year: 2,
            branch: 'Environmental Engineering',
            compatibility_score: 0.92
          },
          message: 'Both of you are passionate about photography and environmental causes. Perfect match!',
          is_anonymous: true,
          status: 'pending',
          created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
        }
      ]

      const mockSent: Introduction[] = [
        {
          id: '3',
          introducer_name: user?.display_name || 'You',
          target_user: {
            name: 'Rahul Gupta',
            bio: 'Music producer and tech enthusiast',
            campus: user?.campus || 'Main Campus',
            year: 4,
            branch: 'Electronics',
            compatibility_score: 0.78
          },
          message: 'You both love music production and tech. Should definitely connect!',
          is_anonymous: false,
          status: 'accepted',
          created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        }
      ]

      setReceivedIntros(mockReceived)
      setSentIntros(mockSent)
    } catch (error) {
      console.error('Error loading introductions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleIntroductionResponse = async (introId: string, response: 'accept' | 'decline') => {
    try {
      // Update the introduction status
      setReceivedIntros(prev => 
        prev.map(intro => 
          intro.id === introId 
            ? { ...intro, status: response === 'accept' ? 'accepted' : 'declined' }
            : intro
        )
      )
    } catch (error) {
      console.error('Error responding to introduction:', error)
    }
  }

  const submitIntroduction = async () => {
    if (!selectedFriend || !selectedTarget || !introMessage.trim()) return

    try {
      // Create new introduction
      const newIntro: Introduction = {
        id: Date.now().toString(),
        introducer_name: user?.display_name || 'You',
        target_user: {
          name: selectedTarget,
          bio: 'Fellow student looking to connect',
          campus: user?.campus || 'Main Campus',
          year: Math.floor(Math.random() * 4) + 1,
          branch: 'Various',
          compatibility_score: Math.random() * 0.3 + 0.7
        },
        message: introMessage,
        is_anonymous: isAnonymous,
        status: 'pending',
        created_at: new Date().toISOString()
      }

      setSentIntros(prev => [newIntro, ...prev])
      
      // Reset form
      setSelectedFriend('')
      setSelectedTarget('')
      setIntroMessage('')
      setIsAnonymous(false)
      setShowCreateModal(false)
    } catch (error) {
      console.error('Error creating introduction:', error)
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
                  Friend Introductions
                </h1>
                <p className="text-white/70">
                  Help friends connect and get introduced to new people
                </p>
              </div>
            </div>
            <GradientButton
              variant="romantic"
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Make Introduction
            </GradientButton>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-4 mb-8"
          >
            <button
              onClick={() => setActiveTab('received')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'received'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              Received ({receivedIntros.length})
            </button>
            <button
              onClick={() => setActiveTab('sent')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'sent'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              Sent ({sentIntros.length})
            </button>
          </motion.div>

          {/* Introductions List */}
          <div className="space-y-4">
            {activeTab === 'received' ? (
              receivedIntros.length > 0 ? (
                receivedIntros.map((intro, index) => (
                  <motion.div
                    key={intro.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <GlassCard className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            {intro.is_anonymous ? (
                              <EyeOff className="w-6 h-6 text-white" />
                            ) : (
                              <span className="text-white font-bold">
                                {intro.introducer_name.charAt(0)}
                              </span>
                            )}
                          </div>
                          <div>
                            <h3 className="text-white font-medium">
                              Introduction from {intro.introducer_name}
                            </h3>
                            <p className="text-white/60 text-sm">
                              {new Date(intro.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white text-sm">
                            {Math.round(intro.target_user.compatibility_score * 100)}%
                          </span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Target User Info */}
                        <div>
                          <h4 className="text-white/80 text-sm font-medium mb-2">Meet:</h4>
                          <div className="bg-white/5 rounded-xl p-4">
                            <h5 className="text-white font-medium mb-1">{intro.target_user.name}</h5>
                            <p className="text-white/70 text-sm mb-2">{intro.target_user.bio}</p>
                            <div className="text-white/60 text-xs">
                              {intro.target_user.year}th Year • {intro.target_user.branch}
                            </div>
                          </div>
                        </div>

                        {/* Introduction Message */}
                        <div>
                          <h4 className="text-white/80 text-sm font-medium mb-2">Why you should connect:</h4>
                          <div className="bg-white/5 rounded-xl p-4">
                            <p className="text-white/80 text-sm italic">
                              "{intro.message}"
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      {intro.status === 'pending' && (
                        <div className="flex gap-3 mt-6">
                          <GradientButton
                            variant="secondary"
                            onClick={() => handleIntroductionResponse(intro.id, 'decline')}
                            className="flex-1"
                          >
                            Maybe Later
                          </GradientButton>
                          <GradientButton
                            variant="romantic"
                            onClick={() => handleIntroductionResponse(intro.id, 'accept')}
                            className="flex-1"
                          >
                            <Heart className="w-4 h-4 mr-2" />
                            Connect
                          </GradientButton>
                        </div>
                      )}

                      {intro.status !== 'pending' && (
                        <div className="mt-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            intro.status === 'accepted' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {intro.status === 'accepted' ? 'Connected!' : 'Declined'}
                          </span>
                        </div>
                      )}
                    </GlassCard>
                  </motion.div>
                ))
              ) : (
                <GlassCard className="p-12 text-center">
                  <UserPlus className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <h3 className="text-white font-medium mb-2">No introductions yet</h3>
                  <p className="text-white/60 text-sm">
                    When friends introduce you to someone, you'll see it here
                  </p>
                </GlassCard>
              )
            ) : (
              sentIntros.length > 0 ? (
                sentIntros.map((intro, index) => (
                  <motion.div
                    key={intro.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <GlassCard className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-white font-medium">
                            Introduction to {intro.target_user.name}
                          </h3>
                          <p className="text-white/60 text-sm">
                            {new Date(intro.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm ${
                          intro.status === 'accepted' ? 'bg-green-500/20 text-green-400' :
                          intro.status === 'declined' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {intro.status}
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-xl p-4">
                        <p className="text-white/80 text-sm italic">
                          "{intro.message}"
                        </p>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))
              ) : (
                <GlassCard className="p-12 text-center">
                  <Send className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <h3 className="text-white font-medium mb-2">No introductions sent</h3>
                  <p className="text-white/60 text-sm">
                    Help your friends connect by making introductions
                  </p>
                </GlassCard>
              )
            )}
          </div>

          {/* Create Introduction Modal */}
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
                      Make an Introduction
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Select Friend to Introduce
                        </label>
                        <select 
                          value={selectedFriend}
                          onChange={(e) => setSelectedFriend(e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="">Choose a friend</option>
                          <option value="friend1">Priya Sharma</option>
                          <option value="friend2">Arjun Kumar</option>
                          <option value="friend3">Sneha Patel</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Introduce to
                        </label>
                        <select 
                          value={selectedTarget}
                          onChange={(e) => setSelectedTarget(e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="">Choose target person</option>
                          <option value="target1">Rahul Gupta</option>
                          <option value="target2">Maya Singh</option>
                          <option value="target3">Dev Agarwal</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Why should they connect?
                        </label>
                        <textarea
                          value={introMessage}
                          onChange={(e) => setIntroMessage(e.target.value)}
                          placeholder="Explain why they'd be great together..."
                          className="w-full h-24 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="anonymous"
                          checked={isAnonymous}
                          onChange={(e) => setIsAnonymous(e.target.checked)}
                          className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="anonymous" className="text-white/80 text-sm">
                          Make this introduction anonymous
                        </label>
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
                          onClick={submitIntroduction}
                          disabled={!selectedFriend || !selectedTarget || !introMessage.trim()}
                          className="flex-1"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Send Introduction
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