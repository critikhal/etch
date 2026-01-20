import { Apple, Play } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center section-padding pt-32 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-8">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          <span className="text-sm font-medium">Now available in Saudi Arabia</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium text-text-primary leading-tight mb-6">
          Turn posts into
          <span className="text-primary"> real places</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
          Save places from Instagram, TikTok, and Google Maps. Create curated lists and discover where to go next.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#"
            className="flex items-center gap-3 bg-text-primary text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:opacity-90 hover:scale-105 w-full sm:w-auto justify-center"
          >
            <Apple className="w-6 h-6" />
            <div className="text-left">
              <div className="text-xs opacity-80">Download on the</div>
              <div className="text-lg font-semibold -mt-1">App Store</div>
            </div>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 bg-text-primary text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:opacity-90 hover:scale-105 w-full sm:w-auto justify-center"
          >
            <Play className="w-6 h-6" fill="currentColor" />
            <div className="text-left">
              <div className="text-xs opacity-80">Get it on</div>
              <div className="text-lg font-semibold -mt-1">Google Play</div>
            </div>
          </a>
        </div>

        {/* Phone Mockup */}
        <div className="relative mx-auto max-w-xs">
          {/* Phone Frame */}
          <div className="relative bg-text-primary rounded-[3rem] p-3 shadow-2xl">
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
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-primary/20 rounded-[4rem] blur-3xl -z-10"></div>
        </div>
      </div>
    </section>
  )
}
