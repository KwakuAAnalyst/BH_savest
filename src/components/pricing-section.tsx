'use client'

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const tiers = [
  {
    name: 'Starter',
    price: 29,
    description: 'Perfect for small teams or individuals just getting started.',
    features: [
      'Up to 5 users',
      '10GB of storage',
      'Basic support',
      'Access to core features',
    ],
    cta: 'Start with Starter',
  },
  {
    name: 'Pro',
    price: 99,
    description: 'Ideal for growing businesses with more demands.',
    features: [
      'Up to 20 users',
      '100GB of storage',
      'Priority support',
      'Access to all features',
      'Advanced analytics',
    ],
    cta: 'Upgrade to Pro',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 299,
    description: 'For large organizations with complex needs.',
    features: [
      'Unlimited users',
      'Unlimited storage',
      '24/7 dedicated support',
      'Custom integrations',
      'Advanced security features',
      'Tailored onboarding',
    ],
    cta: 'Contact Sales',
  },
]

export function PricingSectionComponent() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <h2 className="text-base font-semibold leading-7 text-primary">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Choose the right plan for your business
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-muted-foreground">
          Whether you're just starting out or scaling up, we have a plan that's right for you. All plans include a 14-day free trial.
        </p>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card key={tier.name} className={tier.highlighted ? 'border-primary shadow-lg' : ''}>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                <CardDescription className="text-muted-foreground">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">${tier.price}<span className="text-base font-normal text-muted-foreground">/month</span></p>
                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={tier.highlighted ? "default" : "outline"}>
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}