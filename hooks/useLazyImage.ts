import { useState, useEffect, useRef } from 'react'

interface UseLazyImageOptions {
  rootMargin?: string
  threshold?: number
  fallbackDelay?: number
}

export function useLazyImage(
  src: string | undefined,
  options: UseLazyImageOptions = {}
) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [error, setError] = useState(false)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  
  const {
    rootMargin = '50px',
    threshold = 0.1,
    fallbackDelay = 2000
  } = options

  useEffect(() => {
    const currentImg = imgRef.current
    
    if (!currentImg || !src) return

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observerRef.current?.disconnect()
        }
      },
      { rootMargin, threshold }
    )

    observerRef.current.observe(currentImg)

    // Cleanup
    return () => {
      observerRef.current?.disconnect()
    }
  }, [src, rootMargin, threshold])

  useEffect(() => {
    if (!isInView || !src) return

    const img = new Image()
    
    img.onload = () => {
      setIsLoaded(true)
      setError(false)
    }
    
    img.onerror = () => {
      setError(true)
      setIsLoaded(false)
    }

    // Add a small delay to prevent loading too many images at once
    const timeoutId = setTimeout(() => {
      img.src = src
    }, fallbackDelay)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [isInView, src, fallbackDelay])

  return {
    ref: imgRef,
    isLoaded,
    error,
    shouldLoad: isInView
  }
}