'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Progress } from "@/app/components/ui/progress";
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useUser, SignInButton } from '@clerk/nextjs';
import { BookOpen, TrendingUp, Calculator, FileText, Users, Award, Play, ChevronDown, ChevronUp, Wallet, PieChart, Zap, HelpCircle, Vote, BarChart2, ShieldCheck, Bookmark, Video, Target } from 'lucide-react';

const DynamicLearningDashboard = dynamic(() => import('@/app/components/LearningDashboard'), {
  ssr: false,
});

export default function LearnPage() {
  const { isSignedIn, user } = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Existing code for non-signed-in users
  const educationalContent = [
    {
      title: "Savings Fundamentals",
      icon: <Wallet className="h-6 w-6" />,
      description: "Learn how to save effectively, understand interest rates, and discover the benefits of decentralized savings.",
      articles: [
        "Introduction to Effective Saving",
        "Understanding Interest Rates in DeFi",
        "Decentralized vs. Traditional Savings"
      ]
    },
    {
      title: "Investment Strategies",
      icon: <PieChart className="h-6 w-6" />,
      description: "Explore various investment strategies to help you achieve your financial goals.",
      articles: [
        "Diversification in Crypto Portfolios",
        "Risk Management in DeFi",
        "Introduction to Yield Farming",
        "Staking: Passive Income in Crypto"
      ]
    },
    {
      title: "Blockchain Basics",
      icon: <Zap className="h-6 w-6" />,
      description: "Get introduced to the Base blockchain, smart contracts, and the fundamentals of DeFi.",
      articles: [
        "What is the Base Blockchain?",
        "Smart Contracts Explained",
        "DeFi: Revolutionizing Financial Services"
      ]
    },
    {
      title: "Staking Opportunities",
      icon: <Award className="h-6 w-6" />,
      description: "Learn how to stake your assets to earn passive income and maximize your returns.",
      articles: [
        "Introduction to Staking",
        "Staking Different Cryptocurrencies",
        "Understanding Staking Rewards",
        "Benefits of Staking on Our Platform"
      ]
    },
    {
      title: "Governance Participation",
      icon: <Vote className="h-6 w-6" />,
      description: "Discover how to engage in platform governance and influence decisions.",
      articles: [
        "Introduction to DeFi Governance",
        "How to Vote on Proposals",
        "Earning Rewards Through Governance",
        "The Importance of Community Participation"
      ]
    },
    {
      title: "Earning Strategies",
      icon: <TrendingUp className="h-6 w-6" />,
      description: "Explore strategies to maximize your earnings through staking and governance participation.",
      articles: [
        "Compounding Rewards",
        "Selecting Optimal Staking Pools",
        "Diversifying Staked Assets",
        "Balancing Risk and Reward in Earning Strategies"
      ]
    },
    {
      title: "Risk Management",
      icon: <ShieldCheck className="h-6 w-6" />,
      description: "Learn how to understand and mitigate risks associated with staking and governance.",
      articles: [
        "Understanding Smart Contract Vulnerabilities",
        "Managing Market Volatility",
        "Potential Penalties in Staking",
        "Risk Assessment in DeFi"
      ]
    },
    {
      title: "How-To Guides",
      icon: <FileText className="h-6 w-6" />,
      description: "Step-by-step tutorials for using our platform's features.",
      articles: [
        "How to Stake Tokens",
        "Participating in Governance Proposals",
        "Delegating Voting Power",
        "Tracking Your Earning Progress"
      ]
    },
    {
      title: "Market Insights",
      icon: <BarChart2 className="h-6 w-6" />,
      description: "Stay informed with our analysis of major trends in staking and governance.",
      articles: [
        "This Week in Staking",
        "Upcoming Governance Proposals",
        "New Staking Opportunities",
        "Governance Trends in DeFi"
      ]
    },
    {
      title: "Interactive Calculators",
      icon: <Calculator className="h-6 w-6" />,
      description: "Use our tools to simulate different financial outcomes based on your decisions.",
      tools: [
        "Staking Reward Calculator",
        "Governance Influence Estimator",
        "Risk Assessment Simulator",
        "Compound Interest Calculator"
      ]
    },
  ];

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        {isSignedIn ? (
          <DynamicLearningDashboard user={user} />
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-6 text-center">Learn and Grow Your Financial Knowledge</h1>
            <p className="text-xl mb-8 text-center text-muted-foreground">Explore our educational resources to improve your financial literacy and make informed decisions.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {educationalContent.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={section.title === "Interactive Calculators" ? "lg:col-span-3" : ""}
                >
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {section.icon}
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription>{section.description}</CardDescription>
                      {section.title === "Interactive Calculators" ? (
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {section.tools && section.tools.map((tool, i) => (
                            <div key={i} className="flex flex-col h-full">
                              <CardDescription className="mb-2 text-center">{tool}</CardDescription>
                              <Button variant="outline" className="mt-auto">
                                Use Calculator
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <ul className="mt-4 space-y-2">
                          {section.articles && section.articles.map((article, i) => (
                            <li key={i}>
                              <Link href={`/learn/${article.toLowerCase().replace(/\s+/g, '-')}`} className="text-primary hover:underline">
                                {article}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                    {section.title !== "Interactive Calculators" && (
                      <CardFooter>
                        <Button className="w-full">
                          Explore More
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.section 
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Start Your Learning Journey</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Sign in to access your personalized learning dashboard, track your progress, earn badges, and get tailored learning recommendations.
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <SignInButton mode="modal">
                    <Button size="lg">
                      Sign In to Learn
                    </Button>
                  </SignInButton>
                </CardFooter>
              </Card>
            </motion.section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}