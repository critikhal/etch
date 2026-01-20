import Image from 'next/image'

const screens = [
  {
    src: '/app-home.png',
    alt: 'Home screen',
    title: 'Discover Places',
    description: 'Browse places and lists near you',
  },
  {
    src: '/app-list.png',
    alt: 'List view',
    title: 'Curated Lists',
    description: 'Explore themed collections',
  },
  {
    src: '/app-map.png',
    alt: 'Map view',
    title: 'Map View',
    description: 'See all your saved places',
  },
  {
    src: '/app-profile.png',
    alt: 'Profile page',
    title: 'Your Profile',
    description: 'Track your places and lists',
  },
]

export default function AppPreview() {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-text-primary mb-6">
            See it in action
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            A beautiful, intuitive app designed to help you explore and organize places.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {screens.map((screen, index) => (
            <div key={index} className="group">
              <div className="relative mx-auto w-full max-w-[180px]">
                <div className="relative bg-text-primary rounded-[2rem] p-2 shadow-2xl transition-transform duration-300 group-hover:-translate-y-2">
                  <div className="bg-background rounded-[1.5rem] overflow-hidden aspect-[9/19] relative">
                    <Image
                      src={screen.src}
                      alt={screen.alt}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-4 bg-text-primary rounded-full"></div>
                </div>
              </div>
              <div className="text-center mt-6">
                <h3 className="font-medium text-text-primary">{screen.title}</h3>
                <p className="text-sm text-text-secondary mt-1">{screen.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
