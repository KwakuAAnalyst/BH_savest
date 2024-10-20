'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import WordPullUp from "@/app/components/ui/word-pull-up";
import { StakingRewardCalculator } from '@/app/components/StakingRewardCalculator';
import { MagicCard } from "@/app/components/ui/magic-card";
import { DotPattern } from "@/app/components/ui/dot-pattern";
// ... (other imports)

export default function PricingPage() {
  const { isSignedIn, user } = useUser();
  // ... (other state and functions)

  return (
    <div className="relative flex flex-col min-h-screen bg-white">
      <DotPattern
        width={40}
        height={40}
        cx={1}
        cy={1}
        cr={1}
        className="absolute inset-0 z-0 opacity-10"
      />
      <div className="relative z-10">
        <Header />

        <main className="flex-grow container mx-auto px-4 py-12">
          {isSignedIn ? (
            <motion.div 
              className="max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <WordPullUp 
                words="Your Billing Dashboard"
                className="text-5xl font-bold mb-6 text-center text-gray-800"
              />
              <p className="text-xl mb-12 text-center text-gray-600">
                Manage your subscription and billing information, {user.firstName}.
              </p>
              
              {/* Billing dashboard content */}
              <MagicCard>
                {/* Add your billing dashboard content here */}
                <p>Your billing information goes here.</p>
              </MagicCard>

              {/* Include StakingRewardCalculator if needed */}
              <StakingRewardCalculator />

            </motion.div>
          ) : (
            <motion.div
              className="max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <WordPullUp 
                words="Pricing Plans"
                className="text-5xl font-bold mb-6 text-center text-gray-800"
              />
              <p className="text-xl mb-12 text-center text-gray-600">
                Choose the perfect plan for your needs.
              </p>
              
              {/* Add your pricing plans here */}
              <MagicCard>
                <p>Your pricing plans go here.</p>
              </MagicCard>
            </motion.div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
