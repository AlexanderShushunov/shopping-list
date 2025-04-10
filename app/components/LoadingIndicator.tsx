'use client'

import { FC, useEffect, useState } from 'react'

type LoadingIndicatorProps = {
  isLoading: boolean
}

export const LoadingIndicator: FC<LoadingIndicatorProps> = ({ isLoading }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [startTime, setStartTime] = useState<number | null>(null)

  useEffect(() => {
    if (isLoading) {
      setIsVisible(true)
      setStartTime(Date.now())
    } else if (startTime) {
      const elapsedTime = Date.now() - startTime
      const remainingTime = Math.max(0, 1000 - elapsedTime)

      if (remainingTime > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false)
          setStartTime(null)
        }, remainingTime)

        return () => clearTimeout(timer)
      } else {
        setIsVisible(false)
        setStartTime(null)
      }
    }
  }, [isLoading, startTime])

  return (
    <div className="h-1 w-full">
      {isVisible && (
        <div className="h-full w-full animate-gradient-x bg-gradient-to-r from-green-500 via-blue-500 to-green-500 bg-[length:200%_100%]" />
      )}
    </div>
  )
}
