'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { Button } from "@/app/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet"
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { useConnect, useAccount, useDisconnect } from 'wagmi'
import { coinbaseWallet } from 'wagmi/connectors'
import { WalletComponents } from './Wallet'
const navigation = [
  { name: 'Save', href: '/save' },
  { name: 'Invest', href: '/invest' },
  { name: 'Earn', href: '/earn' },
  { name: 'Learn', href: '/learn' },
  { name: 'Pricing', href: '/pricing' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { connect } = useConnect()
  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo (Left) */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="sr-only">Your Company</span>
              <svg className="h-8 w-auto text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M16 12l-4-4-4 4M12 16V9" />
              </svg>
            </Link>
          </div>

          {/* Navigation Links (Center) */}
          <nav className="hidden md:flex space-x-8" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium ${
                  pathname === item.href ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Login Area (Right) */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost">Sign in</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button variant="default">Sign up</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            {/*{address ? // omitted for brevity
 
 <WalletComponents /> 
   : <button onClick={() => connect({ connector: coinbaseWallet() })}>Sign In</button>}*/}
            
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary">
                  <span className="sr-only">Open main menu</span>
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-lg font-medium ${
                        pathname === item.href ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="flex flex-col gap-2 mt-4">
                    <SignedOut>
                      <SignInButton mode="modal">
                        <Button variant="ghost" className="w-full justify-start">Sign in</Button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <Button variant="default" className="w-full justify-start">Sign up</Button>
                      </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                      <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
