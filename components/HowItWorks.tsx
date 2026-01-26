import { Link, Plus, MapPin } from 'lucide-react'
import Image from 'next/image'

const PhoneMockup = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative mx-auto w-48">
    <div className="relative bg-text-primary rounded-[2rem] p-2 shadow-2xl">
      <div className="bg-background rounded-[1.5rem] overflow-hidden aspect-[9/19] relative">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
        />
      </div>
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-text-primary rounded-full"></div>
    </div>
  </div>
)

const steps = [
  {
    number: '01',
    icon: Link,
    title: 'Paste a link',
    description: 'Copy any place link from your social apps and paste it in Etch.',
    visual: <PhoneMockup src="/app-home.png" alt="Etch app home screen" />,
  },
  {
    number: '02',
    icon: Plus,
    title: 'Add to your list',
    description: 'Save the place to an existing list or create a new collection.',
    visual: <PhoneMockup src="/app-list.png" alt="Etch app list view" />,
  },
  {
    number: '03',
    icon: MapPin,
    title: 'Discover & share',
    description: 'Explore your saved places on a map and share lists with friends.',
    visual: <PhoneMockup src="/app-map.png" alt="Etch app map view" />,
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-text-primary mb-6">
            How it works
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Three simple steps to start building your personal place library.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-24">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-12 lg:gap-20`}
            >
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <span className="text-6xl font-bold text-primary opacity-30">
                  {step.number}
                </span>
                <h3 className="text-3xl md:text-4xl font-medium text-text-primary mb-4 -mt-4">
                  {step.title}
                </h3>
                <p className="text-xl text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Visual */}
              <div className="flex-1 flex justify-center">
                {step.visual}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
