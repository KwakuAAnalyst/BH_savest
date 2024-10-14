import { 
  TrendingUp, 
  Vote, 
  BookOpen,
  ShieldCheck,
  Zap,
  Users
} from 'lucide-react'
import { DotPattern } from './ui/dot-pattern'
import { MagicCard } from './ui/magic-card'

const features = [
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
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* DotPattern background */}
      <div className="absolute inset-0 z-0">
        <DotPattern width={32} height={32} cx={16} cy={16} cr={2} className="text-primary/20" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Revolutionize Your Finances</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Unlock Your Financial Potential
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-muted-foreground">
          BlockHolder empowers you to take control of your financial future with cutting-edge tools, education, and opportunities.
        </p>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {features.map((feature) => (
              <MagicCard 
                key={feature.name} 
                className="p-6 bg-gradient-to-br from-purple-900 to-indigo-900 text-white"
                gradientColor="rgba(255, 255, 255, 0.1)"
              >
                <div className="flex flex-col h-full">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                    <feature.icon className="h-5 w-5 flex-none text-purple-300" aria-hidden="true" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-purple-100">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              </MagicCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
