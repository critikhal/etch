import { Link2, LayoutList, Compass, Share2 } from 'lucide-react'

const features = [
  {
    icon: Link2,
    title: 'Import from anywhere',
    description: 'Paste links from Instagram, TikTok, Google Maps, or any social app. We extract the place automatically.',
  },
  {
    icon: LayoutList,
    title: 'Create curated lists',
    description: 'Organize your favorite spots into themed collections. Coffee shops, date nights, hidden gems.',
  },
  {
    icon: Compass,
    title: 'Discover where to go',
    description: 'Browse lists from friends and the community. Find your next adventure effortlessly.',
  },
  {
    icon: Share2,
    title: 'Share with friends',
    description: 'Share your lists with a single link. Collaborate on group trips and recommendations.',
  },
]

export default function Features() {
  return (
    <section id="features" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-text-primary mb-6">
            Everything you need
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Simple tools to save, organize, and discover places worth visiting.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl border border-gray-100 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-medium text-text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-text-secondary text-lg leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
