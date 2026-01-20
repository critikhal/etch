import { Apple, Play } from 'lucide-react'

export default function CTA() {
  return (
    <section id="download" className="section-padding">
      <div className="max-w-4xl mx-auto text-center">
        {/* Background Glow */}
        <div className="relative">
          <div className="absolute inset-0 bg-primary/10 rounded-[4rem] blur-3xl -z-10"></div>

          <div className="bg-gradient-to-br from-primary to-primary/90 rounded-3xl p-12 md:p-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6">
              Start discovering
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-xl mx-auto">
              Join thousands of explorers saving and sharing their favorite places.
            </p>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                className="flex items-center gap-3 bg-white text-text-primary px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 w-full sm:w-auto justify-center"
              >
                <Apple className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs opacity-60">Download on the</div>
                  <div className="text-lg font-semibold -mt-1">App Store</div>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 bg-white text-text-primary px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 w-full sm:w-auto justify-center"
              >
                <Play className="w-6 h-6" fill="currentColor" />
                <div className="text-left">
                  <div className="text-xs opacity-60">Get it on</div>
                  <div className="text-lg font-semibold -mt-1">Google Play</div>
                </div>
              </a>
            </div>

            {/* Tagline */}
            <p className="text-white/60 text-sm mt-8">
              Currently available in Saudi Arabia. More regions coming soon.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
