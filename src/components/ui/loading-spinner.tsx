'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  color?: 'white' | 'primary' | 'secondary'
}

export function LoadingSpinner({ size = 'md', className, color = 'white' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  const colorClasses = {
    white: 'border-white/20 border-t-white',
    primary: 'border-purple-200 border-t-purple-600',
    secondary: 'border-gray-200 border-t-gray-600'
  }

  return (
    <motion.div
      className={cn(
        'border-2 rounded-full',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  )
}