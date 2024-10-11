import { Check } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"

const tiers = [
  {
    name: 'Basic',
    price: 9,
    description: 'Perfect for beginners looking to start their financial journey.',
    features: [
      'Core Savings & Investment Tools',
      'Automated Savings',
      'Goal Tracking (up to 3 goals)',
      'Basic Analytics',
      'Basic Support (24-48h response)',
      'Mobile Access',
    ],
    cta: 'Start with Basic',
  },
  {
    name: 'Pro',
    price: 29,
    description: 'Ideal for experienced users looking to grow their wealth.',
    features: [
      'Advanced Investment Options',
      'Automated Portfolio Rebalancing',
      'Staking & Passive Income',
      'Unlimited Custom Savings Goals',
      'In-Depth Analytics & Reports',
      'Priority Support (12h response)',
      'Exclusive Webinars & Tutorials',
    ],
    cta: 'Upgrade to Pro',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For high-net-worth individuals and businesses.',
    features: [
      'Full Investment Suite',
      'Dedicated Financial Advisor',
      'Custom Portfolio Strategies',
      'Enhanced Staking & Yield Farming',
      'Team Management (Business Accounts)',
      'Enterprise-Level Analytics',
      'White-Glove 24/7 Support',
      'Custom Integrations & API Access',
    ],
    cta: 'Contact Sales',
  },
]

export default function PricingSection() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <h2 className="text-base font-semibold leading-7 text-primary">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Choose the right plan for your financial goals
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-muted-foreground">
          From beginners to advanced investors, we have a plan that fits your needs. Start your journey to financial freedom today.
        </p>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card key={tier.name} className={`flex flex-col ${tier.highlighted ? 'border-primary shadow-lg' : ''}`}>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                <CardDescription className="text-muted-foreground">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-4xl font-bold">
                  {typeof tier.price === 'number' ? `$${tier.price}` : tier.price}
                  <span className="text-base font-normal text-muted-foreground">/month</span>
                </p>
                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
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