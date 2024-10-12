import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
            Save. Invest. Prosper.
          </h1>
          <p className="mt-4 max-w-xl text-xl text-gray-700 dark:text-gray-300">
            Invest spare change, invest while you save,<br></br> earn bonus investments, and more.
          </p>
          <div className="mt-8">
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors duration-150"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2">
          <Image
            src="/coin.jpg"
            alt="Piggy bank with coins"
            width={600}
            height={400}
            className="rounded-lg shadow-xl object-cover"
          />
        </div>
      </div>
    </section>
  )
}
