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

            {/* Download Buttons - Official Badges */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                className="transition-all duration-300 hover:scale-105"
              >
                {/* Official App Store Badge */}
                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="60" viewBox="0 0 200 60">
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
                className="transition-all duration-300 hover:scale-105"
              >
                {/* Official Google Play Badge */}
                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="60" viewBox="0 0 200 60">
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
