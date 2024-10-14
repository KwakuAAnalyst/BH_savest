'use client'

import Image from 'next/image'
import Link from 'next/link'
import { BorderBeam } from './ui/border-beam'
import { RainbowButton } from './ui/rainbow-button'
import BlurIn from './ui/blur-in'
import { useRef, useEffect, useState } from 'react'

export default function HeroSection() {
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateContainerSize = () => {
      if (imageContainerRef.current) {
        setContainerSize({
          width: imageContainerRef.current.offsetWidth,
          height: imageContainerRef.current.offsetHeight,
        })
      }
    }

    updateContainerSize()
    window.addEventListener('resize', updateContainerSize)

    return () => window.removeEventListener('resize', updateContainerSize)
  }, [])

  return (
    <section className="bg-gradient-to-b from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
          <BlurIn
            word="Save. Invest. Prosper."
            className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl text-left"
            duration={1.5}
          />
          <p className="mt-4 max-w-xl text-xl text-gray-700 dark:text-gray-300">
            Invest spare change, invest while you save,<br></br> earn bonus investments, and more.
          </p>
          <div className="mt-8">
            <Link href="/get-started">
              <RainbowButton>
                Get Started
              </RainbowButton>
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 relative">
          <div 
            ref={imageContainerRef}
            className="relative rounded-lg overflow-hidden"
          >
            <Image
              src="/8596377.jpg"
              alt="Cryptocurrency investment concept"
              width={610}
              height={400}
              className="rounded-lg shadow-xl object-cover w-full h-auto"
            />
            <BorderBeam
              className="absolute inset-0"
              size={Math.max(containerSize.width, containerSize.height)}
              duration={20}
              colorFrom="#4F46E5"
              colorTo="#9333EA"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
