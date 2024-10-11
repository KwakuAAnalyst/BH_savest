import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const navigation = [
  
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
]

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com', icon: Facebook },
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
]

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-8">
          {/* Logo (Left) */}
          <div className="flex-shrink-0 mb-4 md:mb-0">
            <Link href="/" className="flex items-center">
              <span className="sr-only">BlockHolder</span>
              <svg className="h-8 w-auto text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M16 12l-4-4-4 4M12 16V9" />
              </svg>
            </Link>
          </div>

          {/* Navigation Links (Center) */}
          <nav className="flex flex-wrap justify-center space-x-6" aria-label="Footer navigation">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Social Icons (Right) */}
          <div className="flex space-x-6 mt-4 md:mt-0">
            {socialLinks.map((item) => (
              <Link key={item.name} href={item.href} className="text-muted-foreground hover:text-primary">
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border/40 py-4 flex justify-center items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} BlockHolder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}