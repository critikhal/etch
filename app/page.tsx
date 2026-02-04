'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import AnimatedLogo from '@/components/AnimatedLogo'
import { Smartphone, ListPlus, Compass, Bookmark, Share2, Coffee, Heart, Car, Utensils, Camera, PersonStanding, Users, MapPin, Star } from 'lucide-react'

// Hook for scroll-triggered animations
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isInView }
}

// Animated section wrapper
function AnimatedSection({
  children,
  className = '',
  delay = 0
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const { ref, isInView } = useInView()

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  )
}

// Decorative dashed path SVG
function DashedPath({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 600"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 0 Q100 100 80 200 Q60 300 150 350 Q240 400 200 500 Q160 600 250 650"
        stroke="#FE3058"
        strokeWidth="3"
        strokeDasharray="12 8"
        strokeLinecap="round"
        opacity="0.4"
      />
      {/* Decorative dots along the path */}
      <circle cx="80" cy="200" r="6" fill="#FE3058" opacity="0.6" />
      <circle cx="150" cy="350" r="6" fill="#78E8EC" opacity="0.6" />
      <circle cx="200" cy="500" r="6" fill="#6CFBAB" opacity="0.6" />
    </svg>
  )
}

// Horizontal flowing path for section transitions
function FlowingPath({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1200 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
      preserveAspectRatio="none"
    >
      <path
        d="M0 60 Q200 20 400 60 Q600 100 800 60 Q1000 20 1200 60"
        stroke="#FE3058"
        strokeWidth="2"
        strokeDasharray="10 6"
        strokeLinecap="round"
        opacity="0.3"
      />
      <circle cx="400" cy="60" r="4" fill="#FE3058" opacity="0.5" />
      <circle cx="800" cy="60" r="4" fill="#78E8EC" opacity="0.5" />
    </svg>
  )
}

// Organic curved connector path for How It Works steps
function StepConnectorPath({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M0 50 Q50 20 100 50 Q150 80 200 50"
        stroke="#FE3058"
        strokeWidth="2"
        strokeDasharray="8 5"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  )
}

// Video phone mockup component
function VideoPhoneMockup({
  videoSrc,
  className = ''
}: {
  videoSrc: string
  className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="bg-gradient-to-b from-gray-700 to-gray-800 rounded-[2.5rem] p-2 shadow-2xl">
        <div className="bg-black rounded-[2rem] overflow-hidden aspect-[9/19] relative">
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full" />
      </div>
    </div>
  )
}

// Interactive Balloon Easter Egg
function EtchBalloon({
  className = '',
  size = 80
}: {
  className?: string
  size?: number
}) {
  const [isFloating, setIsFloating] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  const handleClick = () => {
    setClickCount(prev => prev + 1)
    setIsFloating(true)
    setTimeout(() => setIsFloating(false), 3000)
  }

  return (
    <button
      onClick={handleClick}
      className={`cursor-pointer transition-all duration-1000 hover:scale-110 ${className}`}
      style={{
        transform: isFloating
          ? `translateY(-${200 + clickCount * 50}px) rotate(${clickCount * 15}deg) scale(${1 + clickCount * 0.1})`
          : 'translateY(0) rotate(0deg) scale(1)',
        opacity: isFloating ? 0 : 1,
      }}
      aria-label="Click the balloon for a surprise!"
      title="Click me!"
    >
      <Image
        src="/balloon.png"
        alt="Etch balloon"
        width={size}
        height={size}
        className="drop-shadow-lg"
      />
    </button>
  )
}

// Hero carousel data
const heroSlides = [
  {
    id: 'discover',
    image: '/app-home.png',
    headline: 'Discover lists from people who love what you love',
    subheadline: 'Find curated lists from friends, locals, and creators who share your taste. Your next favorite place is already on someone\'s list.',
    badge: 'Discover'
  },
  {
    id: 'import',
    image: '/app-list.png',
    headline: 'Turn posts into real places',
    subheadline: 'Paste links from Instagram, TikTok, or Maps. Etch detects the place and adds it to your list.',
    badge: 'Import'
  },
  {
    id: 'map',
    image: '/app-map.png',
    headline: 'See everywhere you want to go',
    subheadline: 'All your saved places on one map. Filter by list, category, or neighborhood.',
    badge: 'Map'
  },
  {
    id: 'curate',
    image: '/app-profile.png',
    headline: 'Build lists for everything',
    subheadline: 'Date nights, weekend trips, favorite cafés. Create collections and add personal notes.',
    badge: 'Curate'
  }
]

// Hero Carousel Component
function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isHovered])

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  const getSlidePosition = (index: number) => {
    const diff = index - activeIndex
    const total = heroSlides.length

    // Handle wrapping
    let position = diff
    if (diff > total / 2) position = diff - total
    if (diff < -total / 2) position = diff + total

    return position
  }

  const currentSlide = heroSlides[activeIndex]

  return (
    <section
      className="min-h-screen bg-midnight-navy pt-20 relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-labelledby="hero-heading"
    >
      {/* Decorative dashed paths */}
      <div className="absolute left-0 top-20 w-48 h-96 opacity-30 pointer-events-none">
        <DashedPath className="w-full h-full" />
      </div>
      <div className="absolute right-0 top-40 w-48 h-96 opacity-30 pointer-events-none transform scale-x-[-1]">
        <DashedPath className="w-full h-full" />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 sm:py-16 text-center relative z-10">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="w-2 h-2 bg-mint-green rounded-full animate-pulse" />
          <span className="text-gray-300 text-sm">Now available in Saudi Arabia</span>
        </div>

        {/* Dynamic Headline */}
        <div className="min-h-[100px] sm:min-h-[120px] md:min-h-[80px] flex flex-col justify-center mb-4">
          <h1
            id="hero-heading"
            key={currentSlide.id + '-headline'}
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-snow-white leading-tight animate-fade-in`}
          >
            {currentSlide.headline}
          </h1>
        </div>

        {/* Dynamic Subheadline */}
        <div className="min-h-[60px] sm:min-h-[50px] flex items-center justify-center mb-8">
          <p
            key={currentSlide.id + '-subheadline'}
            className={`text-base sm:text-lg text-gray-400 max-w-2xl mx-auto animate-fade-in`}
          >
            {currentSlide.subheadline}
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 transition-all duration-700 delay-300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <a
            href="/signup"
            className="bg-coral-red text-snow-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-coral-red/30"
          >
            Get Early Access
          </a>
          <a
            href="#how-it-works"
            className="bg-white/10 text-snow-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all"
          >
            See How It Works
          </a>
        </div>

        {/* Phone Carousel */}
        <div
          className={`relative h-[420px] sm:h-[480px] md:h-[520px] transition-all duration-1000 delay-400 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {heroSlides.map((slide, index) => {
              const position = getSlidePosition(index)
              const isActive = index === activeIndex
              const isVisible = Math.abs(position) <= 1

              if (!isVisible) return null

              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={`absolute transition-all duration-700 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-red focus-visible:ring-offset-2 focus-visible:ring-offset-midnight-navy rounded-[3rem] ${
                    isActive ? 'cursor-default' : 'cursor-pointer hover:opacity-90'
                  }`}
                  style={{
                    transform: `translateX(${position * 160}px) scale(${isActive ? 1 : 0.7})`,
                    zIndex: isActive ? 10 : 5,
                    opacity: isActive ? 1 : 0.5,
                  }}
                  disabled={isActive}
                  aria-label={isActive ? `Current slide: ${slide.badge}` : `Go to ${slide.badge}`}
                >
                  <div className={`relative ${isActive ? 'animate-float' : ''}`}>
                    {/* Phone Frame */}
                    <div className="w-44 sm:w-52 md:w-60">
                      <div className="bg-gradient-to-b from-gray-700 to-gray-800 rounded-[2.5rem] p-2 shadow-2xl">
                        <div className="bg-black rounded-[2rem] overflow-hidden aspect-[9/19] relative">
                          <Image
                            src={slide.image}
                            alt={`Etch app ${slide.badge} screen`}
                            fill
                            className="object-cover object-top"
                            priority={index === 0}
                          />
                        </div>
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full" />
                      </div>
                    </div>

                    {/* Glow effect for active */}
                    {isActive && (
                      <>
                        <div className="absolute -inset-4 bg-coral-red/20 rounded-[4rem] blur-3xl -z-10 animate-glow" />
                        <div className="absolute -inset-8 bg-coral-red/10 rounded-[5rem] blur-3xl -z-20 animate-glow-slow" />
                      </>
                    )}

                    {/* Feature badge */}
                    <div
                      className={`absolute -bottom-10 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                        isActive
                          ? 'bg-coral-red text-snow-white'
                          : 'bg-white/10 text-gray-400'
                      }`}
                    >
                      {slide.badge}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Dot indicators */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id + '-dot'}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-coral-red w-6'
                    : 'bg-white/30 hover:bg-white/50 w-2'
                }`}
                aria-label={`Go to slide ${index + 1}: ${slide.badge}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function EtchLandingV4() {
  return (
    <div className="font-sans antialiased overflow-x-hidden">
      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-snow-white/95 backdrop-blur-md border-b border-gray-200"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2" aria-label="Etch home">
            <AnimatedLogo size={32} />
            <span className="font-logo font-bold text-xl text-midnight-navy">etch</span>
          </a>
          <a
            href="/signup"
            className="bg-coral-red text-snow-white px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-all"
          >
            Get Early Access
          </a>
        </div>
      </nav>

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Social Proof Section */}
      <section className="bg-midnight-navy py-12 border-t border-white/10">
        <AnimatedSection className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 text-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-coral-red/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-coral-red" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-snow-white">10K+</p>
                <p className="text-sm text-gray-400">Active explorers</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-coral-red/20 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-coral-red" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-snow-white">250K+</p>
                <p className="text-sm text-gray-400">Places saved</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-coral-red/20 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-coral-red" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-snow-white">4.9</p>
                <p className="text-sm text-gray-400">App Store rating</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Problem/Solution Section */}
      <section
        className="bg-coral-red py-24 px-6 relative overflow-hidden"
        aria-labelledby="problem-heading"
      >
        {/* Organic decorative paths */}
        <div className="absolute left-0 top-10 w-40 h-80 opacity-15 pointer-events-none hidden lg:block">
          <DashedPath className="w-full h-full" />
        </div>
        <div className="absolute right-0 bottom-10 w-40 h-80 opacity-15 pointer-events-none hidden lg:block transform scale-x-[-1]">
          <DashedPath className="w-full h-full" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <AnimatedSection className="text-center mb-12">
            <p className="text-white/70 text-xs font-medium uppercase tracking-widest mb-4">
              The Problem
            </p>
            <h2
              id="problem-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-snow-white"
            >
              Social media says go.
              <br />
              <span className="text-white/80">Etch shows you where.</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <AnimatedSection delay={100}>
              <div className="bg-white/10 rounded-2xl p-8 border border-white/20 h-full">
                <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-6">
                  Before Etch
                </p>
                <ul className="space-y-4" role="list">
                  {[
                    'Saved posts scattered across apps',
                    'Forget which reel had that café',
                    'Screenshots with no addresses',
                    'Lists you never look at again'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/80">
                      <span className="text-white/40" aria-hidden="true">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="bg-snow-white rounded-2xl p-8 shadow-xl h-full">
                <p className="text-coral-red text-xs font-medium uppercase tracking-wider mb-6">
                  With Etch
                </p>
                <ul className="space-y-4" role="list">
                  {[
                    'All places in one searchable map',
                    'Paste any link, we find the place',
                    'Add notes like "get the matcha"',
                    'Lists that actually get used'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-midnight-navy">
                      <span className="text-mint-green" aria-hidden="true">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Section - Updated with App Store copy */}
      <section
        className="bg-cyan py-24 px-6"
        aria-labelledby="features-heading"
      >
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <p className="text-midnight-navy/60 text-xs font-medium uppercase tracking-widest mb-4">
              Features
            </p>
            <h2
              id="features-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-midnight-navy"
            >
              Everything you need to explore
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                Icon: Smartphone,
                title: 'Turn Posts into Places',
                desc: 'Paste links from social apps or Maps and let Etch detect the places for you automatically.'
              },
              {
                Icon: ListPlus,
                title: 'Create & Curate Lists',
                desc: 'Build lists for cafés, date nights, or full trips. Add personal notes like what to order.'
              },
              {
                Icon: Compass,
                title: 'Discover Where to Go',
                desc: 'Explore lists from friends, locals, and creators. Search by city, category, or keyword.'
              },
              {
                Icon: Bookmark,
                title: 'Save What Matters',
                desc: 'Save places from any list into your own collections. Use lists as living guides.'
              },
              {
                Icon: Share2,
                title: 'Share with Everyone',
                desc: 'Share lists for trips or occasions. Links open directly in-app or as a web preview.'
              }
            ].map((feature, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="bg-midnight-navy/10 rounded-2xl p-6 border border-midnight-navy/20 h-full hover:bg-midnight-navy/15 transition-colors">
                  <feature.Icon
                    size={36}
                    className="text-midnight-navy mb-4"
                    aria-hidden="true"
                  />
                  <h3 className="text-lg font-bold text-midnight-navy mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-midnight-navy/70 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Flowing path transition from Features to How It Works */}
      <div className="bg-snow-white relative">
        <div className="absolute inset-x-0 top-0 h-24 pointer-events-none overflow-hidden">
          <FlowingPath className="w-full h-full" />
        </div>
      </div>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="bg-snow-white py-24 px-6 relative"
        aria-labelledby="how-it-works-heading"
      >
        {/* Organic decorative paths */}
        <div className="absolute left-8 top-20 w-32 h-64 opacity-20 pointer-events-none hidden md:block">
          <DashedPath className="w-full h-full" />
        </div>
        <div className="absolute right-8 bottom-32 w-32 h-64 opacity-20 pointer-events-none hidden md:block transform scale-x-[-1]">
          <DashedPath className="w-full h-full" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <AnimatedSection className="text-center mb-12">
            <p className="text-midnight-navy/50 text-xs font-medium uppercase tracking-widest mb-4">
              How It Works
            </p>
            <h2
              id="how-it-works-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-midnight-navy"
            >
              Three taps to organized
            </h2>
          </AnimatedSection>

          <div className="relative mb-16">
            {/* Curved connector paths between steps - visible on md+ */}
            <div className="hidden md:block absolute top-7 left-0 right-0 pointer-events-none">
              <div className="max-w-3xl mx-auto flex justify-center">
                <div className="flex-1 px-8">
                  <StepConnectorPath className="w-full h-8" />
                </div>
                <div className="flex-1 px-8">
                  <StepConnectorPath className="w-full h-8" />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Copy a link',
                  desc: 'From Instagram, TikTok, or any app where you found a place worth remembering.'
                },
                {
                  step: '02',
                  title: 'Paste in Etch',
                  desc: 'We automatically detect the place, pull photos, and show you on the map.'
                },
                {
                  step: '03',
                  title: 'Add to a list',
                  desc: 'Create collections like "Date Night" or "Coffee Spots" and add your notes.'
                }
              ].map((item, i) => (
                <AnimatedSection key={i} delay={i * 150} className="text-center relative z-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-midnight-navy text-snow-white text-xl font-bold mb-5 shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-midnight-navy mb-3">
                    {item.title}
                  </h3>
                  <p className="text-midnight-navy/70 leading-relaxed">
                    {item.desc}
                  </p>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Video Demo */}
          <AnimatedSection delay={300} className="flex justify-center">
            <div className="w-72 md:w-80">
              <VideoPhoneMockup videoSrc="/import-demo.mp4" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Flowing path transition to Community Lists */}
      <div className="bg-mint-green relative">
        <div className="absolute inset-x-0 top-0 h-20 pointer-events-none overflow-hidden">
          <FlowingPath className="w-full h-full" flip />
        </div>
      </div>

      {/* Community Lists Section */}
      <section
        className="bg-mint-green py-24 px-6 relative overflow-hidden"
        aria-labelledby="discover-heading"
      >
        {/* Organic decorative paths */}
        <div className="absolute right-4 top-16 w-28 h-56 opacity-20 pointer-events-none hidden lg:block">
          <DashedPath className="w-full h-full" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <AnimatedSection className="text-center mb-12">
            <p className="text-midnight-navy/50 text-xs font-medium uppercase tracking-widest mb-4">
              Discover
            </p>
            <h2
              id="discover-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-midnight-navy mb-4"
            >
              Lists for everything
            </h2>
            <p className="text-midnight-navy/70 text-lg max-w-2xl mx-auto">
              From coffee runs to road trips, explore curated lists from friends, locals, and creators.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {[
              { Icon: Coffee, title: 'Best Cafés in Riyadh', places: 12, author: 'Sarah' },
              { Icon: Heart, title: 'Date Night Ideas', places: 8, author: 'Ahmed' },
              { Icon: Car, title: 'Weekend Road Trip', places: 15, author: 'Mohammed' },
              { Icon: Utensils, title: 'Hidden Food Gems', places: 23, author: 'Nora' },
              { Icon: Camera, title: 'Instagram Spots', places: 10, author: 'Lina' },
              { Icon: PersonStanding, title: 'Morning Run Routes', places: 6, author: 'Khalid' }
            ].map((list, i) => (
              <AnimatedSection key={i} delay={i * 75}>
                <button
                  className="w-full bg-snow-white rounded-xl p-4 flex items-center gap-4 hover:shadow-lg transition-shadow text-left"
                  aria-label={`View ${list.title} by ${list.author}`}
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <list.Icon size={24} className="text-midnight-navy" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-midnight-navy truncate">
                      {list.title}
                    </h4>
                    <p className="text-sm text-midnight-navy/60">
                      {list.places} places · by {list.author}
                    </p>
                  </div>
                </button>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="download"
        className="bg-midnight-navy py-24 px-6 relative overflow-hidden"
        aria-labelledby="cta-heading"
      >
        {/* Decorative paths */}
        <div className="absolute left-0 bottom-0 w-32 h-64 opacity-20 pointer-events-none">
          <DashedPath className="w-full h-full" />
        </div>
        <div className="absolute right-0 top-0 w-32 h-64 opacity-20 pointer-events-none transform scale-x-[-1] rotate-180">
          <DashedPath className="w-full h-full" />
        </div>

        {/* Balloon easter eggs */}
        <div className="absolute bottom-16 left-[8%] z-20">
          <EtchBalloon size={120} className="opacity-40 hover:opacity-100" />
        </div>
        <div className="absolute top-20 right-[5%] z-20">
          <EtchBalloon size={60} className="opacity-30 hover:opacity-100" />
        </div>

        <AnimatedSection className="max-w-3xl mx-auto text-center relative z-10">
          <AnimatedLogo size={80} className="mx-auto" />

          <h2
            id="cta-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-snow-white mt-8 mb-4"
          >
            Start discovering
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Join thousands of explorers saving and sharing their favorite places.
          </p>

          {/* Early Access CTA */}
          <a
            href="/signup"
            className="inline-block bg-coral-red text-snow-white px-10 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-coral-red/30 mb-8"
          >
            Get Early Access
          </a>

          {/* Official App Store Badges */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a
              href="#"
              className="transition-transform hover:scale-105"
              aria-label="Download on the App Store"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="200" height="60" viewBox="0 0 200 60" role="img">
                <title>Download on the App Store</title>
                <rect width="200" height="60" rx="10" fill="white"/>
                <g transform="translate(15, 10)">
                  <path d="M25.5 20.5c0-4.5 3.7-6.7 3.9-6.8-2.1-3.1-5.4-3.5-6.6-3.6-2.8-.3-5.4 1.6-6.8 1.6-1.4 0-3.6-1.6-5.9-1.5-3 0-5.8 1.8-7.4 4.5-3.2 5.5-.8 13.6 2.3 18 1.5 2.2 3.3 4.6 5.7 4.5 2.3-.1 3.2-1.5 5.9-1.5 2.8 0 3.5 1.5 5.9 1.4 2.5 0 4-2.2 5.5-4.4 1.7-2.5 2.4-5 2.5-5.1-.1-.1-4.7-1.8-4.8-7.1h-.2zm-4.5-13c1.3-1.5 2.1-3.6 1.9-5.7-1.8.1-4 1.2-5.3 2.7-1.2 1.4-2.2 3.5-1.9 5.6 2 .1 4-1.1 5.3-2.6z" fill="#000"/>
                </g>
                <text x="60" y="24" fontFamily="system-ui, -apple-system, sans-serif" fontSize="10" fill="#000" opacity="0.6">Download on the</text>
                <text x="60" y="42" fontFamily="system-ui, -apple-system, sans-serif" fontSize="18" fontWeight="600" fill="#000">App Store</text>
              </svg>
            </a>
            <a
              href="#"
              className="transition-transform hover:scale-105"
              aria-label="Get it on Google Play"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="200" height="60" viewBox="0 0 200 60" role="img">
                <title>Get it on Google Play</title>
                <rect width="200" height="60" rx="10" fill="white"/>
                <g transform="translate(15, 12)">
                  <path d="M7.3 6.4L18.6 18 7.3 29.6c-.5-.5-.8-1.2-.8-2V8.4c0-.8.3-1.5.8-2z" fill="#4285F4"/>
                  <path d="M22.3 14.3L18.6 18l3.7 3.7 4.6-2.6c.8-.5.8-1.7 0-2.2l-4.6-2.6z" fill="#FBBC04"/>
                  <path d="M7.3 6.4l11.3 11.6 3.7-3.7L9.4 5.2c-.4-.2-.8-.3-1.2-.3-.3 0-.6.1-.9.2v1.3z" fill="#34A853"/>
                  <path d="M7.3 29.6l14.9-8.4-3.6-3.7L7.3 29.1v.5z" fill="#EA4335"/>
                </g>
                <text x="52" y="24" fontFamily="system-ui, -apple-system, sans-serif" fontSize="10" fill="#000" opacity="0.6">GET IT ON</text>
                <text x="52" y="42" fontFamily="system-ui, -apple-system, sans-serif" fontSize="18" fontWeight="600" fill="#000">Google Play</text>
              </svg>
            </a>
          </div>

          <p className="text-gray-500 text-sm">
            Currently available in Saudi Arabia. More regions coming soon.
          </p>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer
        className="bg-midnight-navy border-t border-white/10 py-12 px-6"
        role="contentinfo"
      >
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <AnimatedLogo size={24} />
            <span className="font-logo font-bold text-snow-white">etch</span>
          </div>

          <nav className="flex justify-center gap-6 mb-4" aria-label="Footer navigation">
            <a href="#" className="text-gray-400 text-sm hover:text-snow-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-400 text-sm hover:text-snow-white transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-400 text-sm hover:text-snow-white transition-colors">
              Contact
            </a>
          </nav>

          <p className="text-gray-500 text-sm mb-6">
            © 2026 Etch. All rights reserved.
          </p>

          <p className="text-gray-600 text-xs">
            Made with love in Saudi Arabia
          </p>
        </div>
      </footer>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes glow {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes glow-slow {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 4s ease-in-out infinite;
        }

        .animate-glow-slow {
          animation: glow-slow 6s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
