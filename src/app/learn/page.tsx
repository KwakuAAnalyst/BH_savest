'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Button } from "@/app/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useUser, SignInButton } from '@clerk/nextjs';
import { BookOpen, TrendingUp, Calculator, FileText, Users, Award, Play, ChevronDown, ChevronUp, Wallet, PieChart, Zap, HelpCircle, Vote, BarChart2, ShieldCheck, Bookmark, Video, Target, X } from 'lucide-react';
import { MagicCard } from "@/app/components/ui/magic-card";
import { NeonGradientCard } from "@/app/components/ui/neon-gradient-card";
import { RainbowButton } from "@/app/components/ui/rainbow-button";
import WordPullUp from "@/app/components/ui/word-pull-up";
import { StakingRewardCalculator } from '@/app/components/StakingRewardCalculator';
import { CompoundInterestCalculator } from '@/app/components/CompoundInterestCalculator';

const DynamicLearningDashboard = dynamic(() => import('@/app/components/LearningDashboard'), {
  ssr: false,
});

export default function LearnPage() {
  const { isSignedIn, user } = useUser();
  const [isClient, setIsClient] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isCompoundCalculatorOpen, setIsCompoundCalculatorOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getArticleContent = (title) => {
    switch (title) {
      case "Introduction to Effective Saving":
        return (
          <div className="space-y-6 text-gray-700">
            <p className="text-lg leading-relaxed">
              Imagine a future where financial stress is a thing of the past. Where your dreams are within reach, and unexpected expenses don't keep you up at night. This isn't just a fantasy—it's the power of effective saving.
            </p>
            
            <div className="bg-purple-100 p-6 rounded-lg border border-purple-300">
              <h4 className="text-2xl font-bold mb-3 text-purple-700">The Saving Journey</h4>
              <p className="text-purple-600">
                Effective saving isn't about hoarding every penny. It's about making intentional choices today that open doors tomorrow. It's the art of balancing present needs with future aspirations.
              </p>
            </div>
            
            <h4 className="text-2xl font-bold mt-8 mb-4 text-purple-700">Why Your Future Self Will Thank You</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-indigo-100 p-4 rounded-lg">
                <h5 className="font-semibold text-indigo-700 mb-2">Financial Security</h5>
                <p>Build a safety net that catches you when life throws curveballs.</p>
              </div>
              <div className="bg-indigo-100 p-4 rounded-lg">
                <h5 className="font-semibold text-indigo-700 mb-2">Goal Achievement</h5>
                <p>Turn dreams into plans, and plans into reality with targeted savings.</p>
              </div>
              <div className="bg-indigo-100 p-4 rounded-lg">
                <h5 className="font-semibold text-indigo-700 mb-2">Peace of Mind</h5>
                <p>Sleep easier knowing you're prepared for whatever comes your way.</p>
              </div>
            </div>
            
            <h4 className="text-2xl font-bold mt-8 mb-4 text-purple-700">Your Saving Toolkit</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-purple-600 mr-3 text-2xl">1.</span>
                <div>
                  <h5 className="font-semibold text-purple-700">Set Clear Goals</h5>
                  <p>Give your savings purpose. Whether it's a dream vacation or a down payment, having a clear target energizes your efforts.</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-purple-600 mr-3 text-2xl">2.</span>
                <div>
                  <h5 className="font-semibold text-purple-700">Create a Budget</h5>
                  <p>Think of it as a roadmap for your money. Know where every dollar goes, and redirect them to what truly matters.</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-purple-600 mr-3 text-2xl">3.</span>
                <div>
                  <h5 className="font-semibold text-purple-700">Automate Your Savings</h5>
                  <p>Make saving effortless. Set up automatic transfers and watch your nest egg grow without lifting a finger.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-200 to-indigo-200 p-6 rounded-lg mt-8">
              <h4 className="text-xl font-bold mb-3 text-purple-700">Your Journey Begins Now</h4>
              <p className="text-purple-600">
                Every great adventure starts with a single step. Your path to financial freedom begins with your first intentional save. Embrace the journey, celebrate the milestones, and watch as your future unfolds with endless possibilities.
              </p>
            </div>
          </div>
        );
      case "Understanding Interest Rates in DeFi":
        return (
          <div className="space-y-6 text-gray-700">
            <p className="text-lg leading-relaxed">
              Imagine a world where your money works tirelessly for you, growing and multiplying without the constraints of traditional banking. Welcome to the realm of Decentralized Finance (DeFi), where interest rates are not just numbers, but gateways to financial empowerment.
            </p>
            
            <div className="bg-purple-100 p-6 rounded-lg border border-purple-300">
              <h4 className="text-2xl font-bold mb-3 text-purple-700">The DeFi Revolution</h4>
              <p className="text-purple-600">
                In the world of DeFi, interest rates are living, breathing entities. They respond to market forces in real-time, creating a dynamic ecosystem where your financial decisions can have immediate and powerful impacts.
              </p>
            </div>
            
            <h4 className="text-2xl font-bold mt-8 mb-4 text-purple-700">The Pulse of DeFi Interest Rates</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-100 p-4 rounded-lg">
                <h5 className="font-semibold text-indigo-700 mb-2">Supply and Demand Dance</h5>
                <p>Watch as rates rise when borrowing demand surges, and fall when lenders flood the market. It's economics in its purest, most responsive form.</p>
              </div>
              <div className="bg-indigo-100 p-4 rounded-lg">
                <h5 className="font-semibold text-indigo-700 mb-2">Algorithmic Harmony</h5>
                <p>Smart contracts conduct this financial symphony, ensuring perfect balance between lenders and borrowers at all times.</p>
              </div>
            </div>
            
            <h4 className="text-2xl font-bold mt-8 mb-4 text-purple-700">Your DeFi Interest Toolkit</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-purple-600 mr-3 text-2xl">1.</span>
                <div>
                  <h5 className="font-semibold text-purple-700">Variable Rates: Ride the Wave</h5>
                  <p>Embrace the ebb and flow of the market. Variable rates offer the thrill of potential high returns for those comfortable with some uncertainty.</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-purple-600 mr-3 text-2xl">2.</span>
                <div>
                  <h5 className="font-semibold text-purple-700">Stable Rates: Your Financial Anchor</h5>
                  <p>Prefer predictability? Stable rates provide a steady course, allowing you to plan your financial journey with confidence.</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-purple-600 mr-3 text-2xl">3.</span>
                <div>
                  <h5 className="font-semibold text-purple-700">Lending: Be the Bank</h5>
                  <p>Lend your assets and watch as interest flows into your wallet. In DeFi, everyone can be a banker.</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-purple-600 mr-3 text-2xl">4.</span>
                <div>
                  <h5 className="font-semibold text-purple-700">Staking: Earn While You Sleep</h5>
                  <p>Stake your tokens and earn rewards for supporting the network. It's passive income for the digital age.</p>
                </div>
              </div>
            </div>
            
            <h4 className="text-2xl font-bold mt-8 mb-4 text-purple-700">The DeFi Advantage</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-indigo-100 p-4 rounded-lg">
                <h5 className="font-semibold text-indigo-700 mb-2">Higher Returns</h5>
                <p>Wave goodbye to meager bank interest. DeFi opens the door to potentially higher yields.</p>
              </div>
              <div className="bg-indigo-100 p-4 rounded-lg">
                <h5 className="font-semibold text-indigo-700 mb-2">Crystal Clear</h5>
                <p>Every transaction is on the blockchain. Your financial dealings have never been more transparent.</p>
              </div>
              <div className="bg-indigo-100 p-4 rounded-lg">
                <h5 className="font-semibold text-indigo-700 mb-2">Open to All</h5>
                <p>No credit checks, no minimum balances. Just you and your crypto, ready to participate.</p>
              </div>
            </div>
            
            <div className="bg-yellow-100 p-6 rounded-lg border border-yellow-300 mt-8">
              <h4 className="text-xl font-bold mb-3 text-yellow-700">Navigate with Care</h4>
              <p className="text-yellow-600">
                Remember, with great power comes great responsibility. Be aware of market volatility, smart contract risks, and the evolving regulatory landscape. In DeFi, knowledge is not just power—it's profit.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-200 to-indigo-200 p-6 rounded-lg mt-8">
              <h4 className="text-xl font-bold mb-3 text-purple-700">Your DeFi Journey Begins Now</h4>
              <p className="text-purple-600">
                Understanding DeFi interest rates is your first step into a larger world of financial possibilities. Armed with this knowledge, you're ready to navigate the exciting waters of decentralized finance. Remember, in DeFi, you're not just a participant—you're a pioneer.
              </p>
            </div>
          </div>
        );
      case "Decentralized vs. Traditional Savings":
        return (
          <div className="space-y-6 text-gray-700">
            <p className="text-lg leading-relaxed">
              Imagine standing at a financial crossroads, two paths stretching before you. One, a well-trodden route lined with familiar bank buildings; the other, a digital highway pulsing with the energy of blockchain technology. Welcome to the fascinating world of savings, where tradition meets innovation.
            </p>
            
            <div className="bg-purple-100 p-6 rounded-lg border border-purple-300">
              <h4 className="text-2xl font-bold mb-3 text-purple-700">The Savings Revolution</h4>
              <p className="text-purple-600">
                In today's rapidly evolving financial landscape, the choice between traditional and decentralized savings isn't just about where you store your money—it's about how you envision your financial future.
              </p>
            </div>
            
            <h4 className="text-2xl font-bold mt-8 mb-4 text-purple-700">The Tale of Two Savings</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-100 p-4 rounded-lg">
                <h5 className="font-semibold text-blue-700 mb-2">Traditional Savings: The Familiar Guardian</h5>
                <p>Like a trusted old friend, traditional banks offer stability, insurance, and a sense of security. They're the guardians of the financial status quo.</p>
              </div>
              <div className="bg-indigo-100 p-4 rounded-lg">
                <h5 className="font-semibold text-indigo-700 mb-2">Decentralized Savings: The Digital Pioneer</h5>
                <p>Enter the world of DeFi, where your savings aren't just stored—they're empowered. Here, technology and finance dance in perfect harmony.</p>
              </div>
            </div>
            
            <h4 className="text-2xl font-bold mt-8 mb-4 text-purple-700">Your Savings Compass</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-purple-600 mr-3 text-2xl">1.</span>
                <div>
                  <h5 className="font-semibold text-purple-700">Control: Who Holds the Reins?</h5>
                  <p>Traditional banks act as custodians, while DeFi puts you in the driver's seat. Choose between guided financial journeys or charting your own course.</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-purple-600 mr-3 text-2xl">2.</span>
                <div>
                  <h5 className="font-semibold text-purple-700">Returns: Growth Potential</h5>
                  <p>Traditional savings offer modest, steady growth. DeFi presents opportunities for higher yields, but remember—higher rewards often come with higher risks.</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-purple-600 mr-3 text-2xl">3.</span>
                <div>
                  <h5 className="font-semibold text-purple-700">Accessibility: Barriers vs. Open Doors</h5>
                  <p>Traditional banks have their gatekeepers. DeFi welcomes all with open arms, requiring only an internet connection and a willingness to learn.</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-purple-600 mr-3 text-2xl">4.</span>
                <div>
                  <h5 className="font-semibold text-purple-700">Security: Different Shields</h5>
                  <p>Banks offer government-backed insurance. DeFi relies on cryptography and smart contracts. Both have strengths, both have vulnerabilities.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-100 p-6 rounded-lg border border-yellow-300 mt-8">
              <h4 className="text-xl font-bold mb-3 text-yellow-700">Navigate with Wisdom</h4>
              <p className="text-yellow-600">
                Remember, the best financial decisions are informed ones. Whether you choose the familiar path of traditional savings or venture into the exciting realm of DeFi, let your choice reflect your goals, risk tolerance, and values.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-200 to-purple-200 p-6 rounded-lg mt-8">
              <h4 className="text-xl font-bold mb-3 text-purple-700">Your Financial Odyssey Awaits</h4>
              <p className="text-purple-600">
                Traditional or decentralized, each path offers unique opportunities and challenges. As you stand at this crossroads, remember that your financial journey is uniquely yours. Embrace the power of choice, arm yourself with knowledge, and step confidently towards your financial future.
              </p>
            </div>
          </div>
        );
      // ... (add cases for other articles)
      default:
        return <p className="text-gray-700">Content for {title} is not available yet.</p>;
    }
  };

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
            <WordPullUp 
              words="Learn and Grow Your Financial Knowledge"
              className="text-4xl font-bold mb-6 text-center"
            />
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
                  <MagicCard 
                    className="h-full bg-gradient-to-br from-purple-900 to-indigo-900 text-white flex flex-col"
                    gradientColor="rgba(255, 255, 255, 0.1)"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {section.icon}
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col">
                      {section.title === "Interactive Calculators" ? (
                        <>
                          <CardTitle className="text-center mb-2">{section.title}</CardTitle>
                          <CardDescription className="text-purple-100 mb-4 text-center">{section.description}</CardDescription>
                          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {section.tools && section.tools.map((tool, i) => (
                              <div key={i} className="flex flex-col h-full items-center text-center">
                                <CardDescription className="mb-2 text-purple-100">{tool}</CardDescription>
                                <div className="mt-auto">
                                  <Button 
                                    variant="outline" 
                                    className="w-full bg-white text-purple-900 hover:bg-purple-100"
                                    onClick={() => {
                                      if (tool === "Staking Reward Calculator") {
                                        setIsCalculatorOpen(true);
                                      } else if (tool === "Compound Interest Calculator") {
                                        setIsCompoundCalculatorOpen(true);
                                      }
                                    }}
                                  >
                                    Use Calculator
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <>
                          <CardDescription className="text-purple-100 mb-4">{section.description}</CardDescription>
                          <ul className="mt-4 space-y-2 flex-grow">
                            {section.articles && section.articles.map((article, i) => (
                              <li key={i}>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="link"
                                      className="text-purple-200 hover:text-white hover:underline p-0 h-auto"
                                      onClick={() => setSelectedArticle(article)}
                                    >
                                      {article}
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[800px] bg-white">
                                    <DialogHeader>
                                      <DialogTitle className="text-3xl font-bold text-purple-700 mb-2">{selectedArticle}</DialogTitle>
                                    </DialogHeader>
                                    <MagicCard 
                                      className="bg-white text-gray-700 p-8 overflow-y-auto max-h-[70vh]"
                                      gradientColor="rgba(128, 90, 213, 0.2)"
                                    >
                                      {getArticleContent(selectedArticle)}
                                    </MagicCard>
                                  </DialogContent>
                                </Dialog>
                              </li>
                            ))}
                          </ul>
                          <CardFooter className="mt-auto p-0 pt-4">
                            <Button className="w-full bg-white text-purple-900 hover:bg-purple-100">
                              Explore More
                            </Button>
                          </CardFooter>
                        </>
                      )}
                    </CardContent>
                  </MagicCard>
                </motion.div>
              ))}
            </div>

            {/* Staking Reward Calculator Modal */}
            <Dialog open={isCalculatorOpen} onOpenChange={setIsCalculatorOpen}>
              <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto bg-transparent border-none">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold text-white mb-2">Staking Reward Calculator</DialogTitle>
                </DialogHeader>
                <StakingRewardCalculator />
              </DialogContent>
            </Dialog>

            {/* Compound Interest Calculator Modal */}
            <Dialog open={isCompoundCalculatorOpen} onOpenChange={setIsCompoundCalculatorOpen}>
              <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto bg-transparent border-none">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold text-white mb-2">Compound Interest Calculator</DialogTitle>
                </DialogHeader>
                <CompoundInterestCalculator />
              </DialogContent>
            </Dialog>

            <motion.section 
              className="mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <NeonGradientCard
                className="w-full"
                borderSize={3}
                borderRadius={16}
                neonColors={{ firstColor: "#8B5CF6", secondColor: "#6366F1" }}
              >
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-pulse">
                    Start Your Learning Journey
                  </h3>
                  <p className="text-center mb-6 text-gray-700 dark:text-gray-300">
                    Sign in to access your personalized learning dashboard, track your progress, earn badges, and get tailored learning recommendations.
                  </p>
                  <div className="flex justify-center">
                    <SignInButton mode="modal">
                      <RainbowButton>
                        Sign In to Learn
                      </RainbowButton>
                    </SignInButton>
                  </div>
                </div>
              </NeonGradientCard>
            </motion.section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}