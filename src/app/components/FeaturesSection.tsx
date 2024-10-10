import { 
    Zap, 
    Shield, 
    Smartphone, 
    Globe, 
    Users, 
    BarChart, 
    Cloud 
  } from 'lucide-react'
  
  const features = [
    {
      name: 'Lightning Fast',
      description: 'Experience blazing fast performance with our optimized platform.',
      icon: Zap,
    },
    {
      name: 'Secure by Design',
      description: 'Your data is protected with state-of-the-art security measures.',
      icon: Shield,
    },
    {
      name: 'Mobile Friendly',
      description: 'Access your work seamlessly across all your devices.',
      icon: Smartphone,
    },
    {
      name: 'Global Reach',
      description: 'Connect with users and customers from around the world.',
      icon: Globe,
    },
    {
      name: 'Collaborative Tools',
      description: 'Work together in real-time with powerful collaboration features.',
      icon: Users,
    },
    {
      name: 'Advanced Analytics',
      description: 'Gain valuable insights with our comprehensive analytics suite.',
      icon: BarChart,
    },
    {
      name: 'Cloud Integration',
      description: 'Seamlessly integrate with your favorite cloud services.',
      icon: Cloud,
    },
  ]
  
  export default function FeaturesSection() {
    return (
      <section className="bg-background py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Powerful Features</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything you need to succeed
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our platform is packed with features designed to help you work smarter, faster, and more efficiently.
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