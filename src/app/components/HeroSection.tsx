import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-primary to-primary-foreground">
      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
          <h1 className="text-4xl font-extrabold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl">
            Save. Invest. Prosper.
          </h1>
          <p className="mt-4 max-w-xl text-xl text-primary-foreground/80">
            Discover the power of our innovative solutions. Streamline your workflow and boost productivity like never before.
          </p>
          <div className="mt-8">
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-primary-foreground hover:bg-primary-foreground/90 transition-colors duration-150"
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