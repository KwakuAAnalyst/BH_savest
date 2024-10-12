import { 
  PiggyBank, 
  TrendingUp, 
  Vote, 
  BookOpen,
  ShieldCheck,
  Zap,
  Users
} from 'lucide-react'

const features = [
  {
    name: 'Smart Savings',
    description: 'Supercharge your savings with AI-driven strategies and high-yield accounts that make your money work harder for you.',
    icon: PiggyBank,
  },
  {
    name: 'Diversified Investments',
    description: 'Access a world of investment opportunities tailored to your goals, risk tolerance, and values.',
    icon: TrendingUp,
  },
  {
    name: 'Earn Through Staking',
    description: 'Participate in blockchain governance, secure networks, and earn rewards - all while holding your assets.',
    icon: Vote,
  },
  {
    name: 'Financial Education',
    description: 'Empower yourself with our comprehensive library of resources, from beginner basics to advanced strategies.',
    icon: BookOpen,
  },
  {
    name: 'Bank-Grade Security',
    description: 'Rest easy knowing your assets are protected by state-of-the-art security measures and insurance.',
    icon: ShieldCheck,
  },
  {
    name: 'Lightning-Fast Transactions',
    description: 'Experience near-instant deposits, withdrawals, and trades with our optimized blockchain infrastructure.',
    icon: Zap,
  },
  {
    name: 'Community-Driven',
    description: 'Join a vibrant community of like-minded individuals and learn from experienced investors and mentors.',
    icon: Users,
  },
]

export default function FeaturesSection() {
  return (
    <section className="bg-gray-100 dark:bg-gray-800 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Revolutionize Your Finances</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Unlock Your Financial Potential
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            BlockHolder empowers you to take control of your financial future with cutting-edge tools, education, and opportunities.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <feature.icon className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
