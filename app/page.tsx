'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import AnimatedLogo from '@/components/AnimatedLogo'
import { Smartphone, FileText, Map, Link2, Coffee, Heart, Car, Utensils, Camera, PersonStanding, Users, MapPin, Star } from 'lucide-react'

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

// Phone mockup component
function PhoneMockup({
  imageSrc,
  alt,
  className = '',
  priority = false
}: {
  imageSrc: string
  alt: string
  className?: string
  priority?: boolean
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="bg-gradient-to-b from-gray-700 to-gray-800 rounded-[2.5rem] p-2 shadow-2xl">
        <div className="bg-black rounded-[2rem] overflow-hidden aspect-[9/19] relative">
          <Image
            src={imageSrc}
            alt={alt}
            fill
            className="object-cover object-top"
            priority={priority}
          />
        </div>
        {/* Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full" />
      </div>
    </div>
  )
}

// Hot air balloon easter egg
function HotAirBalloon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="60"
      height="78"
      viewBox="0 0 60 78"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="30" cy="28" rx="26" ry="28" fill="#4A90D9" opacity="0.9"/>
      <ellipse cx="22" cy="28" rx="18" ry="24" fill="#F7C94B" opacity="0.85"/>
      <ellipse cx="30" cy="30" rx="14" ry="20" fill="#FE3058" opacity="0.9"/>
      <path d="M20 52 L40 52 L36 60 L24 60 Z" fill="#4CAF50"/>
      <rect x="24" y="60" width="12" height="10" fill="#8B5A2B" rx="2"/>
    </svg>
  )
}

export default function EtchLandingV3() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="font-sans antialiased overflow-x-hidden">
      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2" aria-label="Etch home">
            <AnimatedLogo size={32} />
            <span className="font-bold text-xl text-gray-900">etch</span>
          </a>
          <a
            href="#download"
            className="bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Download
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 pt-20 relative overflow-hidden"
        aria-labelledby="hero-heading"
      >
        {/* Decorative balloon */}
        <div className="absolute top-32 right-[15%] opacity-15">
          <HotAirBalloon />
        </div>

        <div className="max-w-5xl mx-auto px-6 py-20 text-center relative z-10">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-8 transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-gray-300 text-sm">Now available in Saudi Arabia</span>
          </div>

          {/* Headline */}
          <h1
            id="hero-heading"
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight transition-all duration-700 delay-100 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            You&apos;ve saved a hundred places
            <br />
            <span className="text-gray-500">on Instagram.</span>
          </h1>

          {/* Subheadline */}
          <p
            className={`text-xl sm:text-2xl md:text-3xl text-white/90 mb-4 transition-all duration-700 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            How many have you actually visited?
          </p>

          <p
            className={`text-base text-gray-400 max-w-2xl mx-auto mb-12 transition-all duration-700 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Stop losing places in your saved posts. Etch turns links into a personal map
            so you can finally go to those cafés, restaurants, and hidden gems.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 delay-400 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <a
              href="#download"
              className="bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-primary/30"
            >
              Start Building Your Map
            </a>
            <a
              href="#how-it-works"
              className="bg-white/10 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all"
            >
              See How It Works
            </a>
          </div>

          {/* Phone Mockups */}
          <div
            className={`relative max-w-4xl mx-auto transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center justify-center gap-4 md:gap-8">
              {/* Left phone - smaller */}
              <div className="hidden sm:block w-40 md:w-48 opacity-60 -translate-y-8">
                <PhoneMockup
                  imageSrc="/app-list.png"
                  alt="Etch app list view showing saved places"
                />
              </div>

              {/* Center phone - main, with floating animation */}
              <div className="w-56 md:w-64 animate-float relative">
                <PhoneMockup
                  imageSrc="/app-home.png"
                  alt="Etch app home screen"
                  priority
                />
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-primary/20 rounded-[4rem] blur-3xl -z-10 animate-glow" />
                <div className="absolute -inset-8 bg-primary/10 rounded-[5rem] blur-3xl -z-20 animate-glow-slow" />
              </div>

              {/* Right phone - smaller */}
              <div className="hidden sm:block w-40 md:w-48 opacity-60 -translate-y-8">
                <PhoneMockup
                  imageSrc="/app-map.png"
                  alt="Etch app map view with saved locations"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-gray-950 py-12 border-t border-gray-800">
        <AnimatedSection className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 text-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-white">10K+</p>
                <p className="text-sm text-gray-400">Active explorers</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-white">250K+</p>
                <p className="text-sm text-gray-400">Places saved</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-white">4.9</p>
                <p className="text-sm text-gray-400">App Store rating</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Problem/Solution Section */}
      <section
        className="bg-primary py-24 px-6 relative"
        aria-labelledby="problem-heading"
      >
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <p className="text-white/70 text-xs font-medium uppercase tracking-widest mb-4">
              The Problem
            </p>
            <h2
              id="problem-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
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
              <div className="bg-white rounded-2xl p-8 shadow-xl h-full">
                <p className="text-primary text-xs font-medium uppercase tracking-wider mb-6">
                  With Etch
                </p>
                <ul className="space-y-4" role="list">
                  {[
                    'All places in one searchable map',
                    'Paste any link, we find the place',
                    'Add notes like "get the matcha"',
                    'Lists that actually get used'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <span className="text-green-500" aria-hidden="true">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="bg-gradient-to-b from-blue-500 to-blue-600 py-24 px-6"
        aria-labelledby="features-heading"
      >
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <p className="text-white/70 text-xs font-medium uppercase tracking-widest mb-4">
              Features
            </p>
            <h2
              id="features-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
            >
              Everything you need to explore
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                Icon: Smartphone,
                title: 'Import from Anywhere',
                desc: 'Paste links from Instagram, TikTok, Google Maps. We extract the place automatically.'
              },
              {
                Icon: FileText,
                title: 'Add Personal Notes',
                desc: 'Remember what to order, best time to visit, or who recommended it.'
              },
              {
                Icon: Map,
                title: 'See Your Map',
                desc: 'All your saved places visualized. Filter by list, category, or neighborhood.'
              },
              {
                Icon: Link2,
                title: 'Share with Friends',
                desc: 'Send lists with a link. Plan trips together or share your favorites.'
              }
            ].map((feature, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20 h-full hover:bg-white/15 transition-colors">
                  <feature.Icon
                    size={36}
                    className="text-white mb-4"
                    aria-hidden="true"
                  />
                  <h3 className="text-lg font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="bg-yellow-400 py-24 px-6"
        aria-labelledby="how-it-works-heading"
      >
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <p className="text-black/50 text-xs font-medium uppercase tracking-widest mb-4">
              How It Works
            </p>
            <h2
              id="how-it-works-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900"
            >
              Three taps to organized
            </h2>
          </AnimatedSection>

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
              <AnimatedSection key={i} delay={i * 150} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-900 text-white text-xl font-bold mb-5">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {item.desc}
                </p>
              </AnimatedSection>
            ))}
          </div>

          {/* Phone demo */}
          <AnimatedSection delay={300} className="mt-16 flex justify-center">
            <div className="w-64">
              <PhoneMockup
                imageSrc="/app-profile.png"
                alt="Etch app profile showing saved lists"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Community Lists Section */}
      <section
        className="bg-green-500 py-24 px-6"
        aria-labelledby="discover-heading"
      >
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <p className="text-white/70 text-xs font-medium uppercase tracking-widest mb-4">
              Discover
            </p>
            <h2
              id="discover-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Lists for everything
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
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
                  className="w-full bg-white rounded-xl p-4 flex items-center gap-4 hover:shadow-lg transition-shadow text-left"
                  aria-label={`View ${list.title} by ${list.author}`}
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <list.Icon size={24} className="text-gray-600" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">
                      {list.title}
                    </h4>
                    <p className="text-sm text-gray-500">
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
        className="bg-gray-950 py-24 px-6 relative overflow-hidden"
        aria-labelledby="cta-heading"
      >
        {/* Decorative balloon */}
        <div className="absolute bottom-10 left-[10%] opacity-15">
          <HotAirBalloon />
        </div>

        <AnimatedSection className="max-w-3xl mx-auto text-center relative z-10">
          <AnimatedLogo size={80} className="mx-auto" />

          <h2
            id="cta-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-8 mb-4"
          >
            Start discovering
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Join thousands of explorers saving and sharing their favorite places.
          </p>

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
        className="bg-gray-900 border-t border-gray-800 py-12 px-6"
        role="contentinfo"
      >
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <AnimatedLogo size={24} />
            <span className="font-bold text-white">etch</span>
          </div>

          <nav className="flex justify-center gap-6 mb-4" aria-label="Footer navigation">
            <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">
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

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 4s ease-in-out infinite;
        }

        .animate-glow-slow {
          animation: glow-slow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
