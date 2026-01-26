const useCases = [
  {
    emoji: '☕',
    title: 'Best Cafes in Riyadh',
    places: 12,
    author: 'Sarah',
    bgColor: '#FEE2E8', // primary light
  },
  {
    emoji: '💕',
    title: 'Date Night Ideas',
    places: 8,
    author: 'Ahmed',
    bgColor: '#FEE2E8', // primary light
  },
  {
    emoji: '🚗',
    title: 'Weekend Road Trip',
    places: 15,
    author: 'Mohammed',
    bgColor: '#D1FAE9', // mint light (accent)
  },
  {
    emoji: '🍜',
    title: 'Hidden Food Gems',
    places: 23,
    author: 'Nora',
    bgColor: '#FEE2E8', // primary light
  },
  {
    emoji: '📸',
    title: 'Instagram Spots',
    places: 10,
    author: 'Lina',
    bgColor: '#FEE2E8', // primary light
  },
  {
    emoji: '🏃',
    title: 'Morning Run Routes',
    places: 6,
    author: 'Khalid',
    bgColor: '#CEFAFF', // cyan light (accent)
  },
]

export default function UseCases() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-text-primary mb-6">
            Lists for everything
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            From coffee runs to road trips, organize every type of place.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
              style={{ backgroundColor: useCase.bgColor }}
            >
              <div className="text-4xl mb-4">{useCase.emoji}</div>
              <h3 className="text-xl font-medium text-text-primary mb-2">
                {useCase.title}
              </h3>
              <div className="flex items-center justify-between text-text-secondary text-sm">
                <span>{useCase.places} places</span>
                <span>by {useCase.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
