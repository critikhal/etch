'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="min-h-screen flex flex-col items-center justify-center section-padding pt-32 text-center overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-8 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          <span className="text-sm font-medium">Now available in Saudi Arabia</span>
        </div>

        {/* Headline */}
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-medium text-text-primary leading-tight mb-6 transition-all duration-700 delay-100 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Turn posts into
          <span className="text-primary"> real places</span>
        </h1>

        {/* Subheadline */}
        <p
          className={`text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-700 delay-200 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Save places from Instagram, TikTok, and Google Maps. Create curated lists and discover where to go next.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 delay-300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <a
            href="#"
            className="flex items-center gap-3 bg-text-primary text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:opacity-90 hover:scale-105 w-full sm:w-auto justify-center"
          >
            {/* Apple Logo SVG */}
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <div className="text-left">
              <div className="text-xs opacity-80">Download on the</div>
              <div className="text-lg font-semibold -mt-1">App Store</div>
            </div>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 bg-text-primary text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:opacity-90 hover:scale-105 w-full sm:w-auto justify-center"
          >
            {/* Google Play Logo SVG */}
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
            </svg>
            <div className="text-left">
              <div className="text-xs opacity-80">Get it on</div>
              <div className="text-lg font-semibold -mt-1">Google Play</div>
            </div>
          </a>
        </div>

        {/* Phone Mockup with Floating Animation */}
        <div
          className={`relative mx-auto max-w-xs transition-all duration-1000 delay-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Phone Frame with Float Animation */}
          <div className="relative bg-text-primary rounded-[3rem] p-3 shadow-2xl animate-float">
            <div className="bg-background rounded-[2.5rem] overflow-hidden aspect-[9/19]">
              <Image
                src="/app-home.png"
                alt="Etch app home screen"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
            {/* Notch */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-6 bg-text-primary rounded-full"></div>
          </div>

          {/* Animated Glow Effect */}
          <div className="absolute -inset-4 bg-primary/20 rounded-[4rem] blur-3xl -z-10 animate-glow"></div>

          {/* Secondary Glow */}
          <div className="absolute -inset-8 bg-primary/10 rounded-[5rem] blur-3xl -z-20 animate-glow-slow"></div>
        </div>
      </div>

      {/* Custom Animation Styles */}
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
    </section>
  )
}
