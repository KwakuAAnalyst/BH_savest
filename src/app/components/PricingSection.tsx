"use client"

import { Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Switch } from "@/app/components/ui/switch"
import { useState } from "react"
import ShimmerButton from "@/app/components/ui/shimmer-button"

const tiers = [
  {
    name: 'Basic',
    price: 'Free',
    description: 'A basic plan for startups and individual users',
    features: [
      'AI-powered analytics',
      'Basic support',
      '5 projects limit',
      'Access to basic AI tools',
    ],
    cta: 'Try for Free',
  },
  {
    name: 'Premium',
    price: 20,
    description: 'A premium plan for growing businesses',
    features: [
      'Advanced AI insights',
      'Priority support',
      'Unlimited projects',
      'Access to all AI tools',
      'Custom integrations',
    ],
    cta: 'Subscribe',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 50,
    description: 'An enterprise plan with advanced features for large organizations',
    features: [
      'Custom AI solutions',
      '24/7 dedicated support',
      'Unlimited projects',
      'Access to all AI tools',
      'Custom integrations',
      'Data security and compliance',
    ],
    cta: 'Contact Sales',
  },
]

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <h2 className="text-base font-semibold leading-7 text-primary">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Simple pricing for everyone.
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-muted-foreground">
          Choose an affordable plan that's packed with the best features for engaging your audience, creating customer loyalty, and driving sales.
        </p>
        <div className="mt-16 flex justify-center items-center space-x-4">
          <span className={`text-sm ${!isAnnual ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>Monthly</span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
          />
          <span className={`text-sm ${isAnnual ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>Annual</span>
          {isAnnual && (
            <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              2 MONTHS FREE
            </span>
          )}
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card key={tier.name} className={`flex flex-col ${tier.highlighted ? 'border-primary shadow-lg' : ''}`}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{tier.name}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-3xl font-bold">
                  {tier.price === 'Free' ? 'Free' : (
                    <>
                      ${isAnnual ? (tier.price as number) * 10 : tier.price}
                      <span className="text-base font-normal text-muted-foreground">/{isAnnual ? 'year' : 'month'}</span>
                    </>
                  )}
                </p>
                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm">
                      <Check className="h-5 w-5 text-purple-300 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <ShimmerButton
                  className="w-full text-white"
                  background="linear-gradient(to bottom right, #4c1d95, #312e81)" // Dark purple to indigo gradient
                  shimmerColor="rgba(255, 255, 255, 0.2)"
                >
                  {tier.cta}
                </ShimmerButton>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
