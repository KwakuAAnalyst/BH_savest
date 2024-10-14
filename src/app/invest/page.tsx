'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/app/components/ui/button";
import { CardDescription, Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useUser, SignInButton } from '@clerk/nextjs';
import { PieChart, Wallet, BarChart2, ChevronDown, ChevronUp, ArrowUpRight, ArrowDownLeft, History, Target, Zap, RefreshCw, Check, ArrowRight } from 'lucide-react';
import { ethers } from 'ethers';
import Image from 'next/image';
import { Progress } from "@/app/components/ui/progress";
import EthInvestment from "@/app/abi/EthInvestment.json";
import { MagicCard } from "@/app/components/ui/magic-card";
import { cn } from "@/lib/utils";
import ShineBorder from "@/app/components/ui/shine-border";
import WordPullUp from "@/app/components/ui/word-pull-up";
import { NeonGradientCard } from "@/app/components/ui/neon-gradient-card";
import { RainbowButton } from "@/app/components/ui/rainbow-button";

const contractAddress = "0xcfa367406ad0abb67411f7b72b86863f4949dc15"; // Your contract address
const contractABI = EthInvestment;

export default function InvestPage() {
  const { isSignedIn, user } = useUser();
  const [isInsightsExpanded, setIsInsightsExpanded] = useState(false);
  const [isInvestOpen, setIsInvestOpen] = useState(false);
  const [investAmount, setInvestAmount] = useState('');
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [investSuccess, setInvestSuccess] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [investError, setInvestError] = useState('');
  const [withdrawError, setWithdrawError] = useState('');
  const [isInvestErrorOpen, setIsInvestErrorOpen] = useState(false);
  const [isWithdrawErrorOpen, setIsWithdrawErrorOpen] = useState(false);

  const [investmentData, setInvestmentData] = useState({
    totalInvested: 50000,
    currentValue: 62500,
    totalValue: 62500,
    roi: 25,
    portfolios: [
      { name: "Conservative", risk: "Low", return: "5-8%", allocation: 30 },
      { name: "Balanced", risk: "Medium", return: "8-12%", allocation: 50 },
      { name: "Aggressive", risk: "High", return: "12-20%", allocation: 20 },
    ],
    transactions: [
      { type: "Investment", amount: 1000, date: "2023-05-15", portfolio: "Balanced" },
      { type: "Dividend", amount: 50, date: "2023-05-14", portfolio: "Conservative" },
      { type: "Withdrawal", amount: 200, date: "2023-05-10", portfolio: "Aggressive" },
      { type: "Investment", amount: 500, date: "2023-05-01", portfolio: "Balanced" },
    ],
    detailedAnalytics: {
      marketOutperformance: 3.5,
      diversificationScore: 8.5,
      riskAssessment: "Moderate",
      sectorAllocation: [
        { sector: "Technology", percentage: 30 },
        { sector: "Finance", percentage: 25 },
        { sector: "Healthcare", percentage: 20 },
        { sector: "Consumer Goods", percentage: 15 },
        { sector: "Energy", percentage: 10 },
      ],
      monthlyReturns: [
        { month: "Jan", return: 2.1 },
        { month: "Feb", return: 1.8 },
        { month: "Mar", return: -0.5 },
        { month: "Apr", return: 3.2 },
        { month: "May", return: 1.5 },
      ],
      topPerformers: [
        { asset: "AAPL", return: 15.2 },
        { asset: "MSFT", return: 12.8 },
        { asset: "AMZN", return: 10.5 },
      ],
      underperformers: [
        { asset: "GE", return: -5.2 },
        { asset: "XOM", return: -3.8 },
        { asset: "T", return: -2.5 },
      ],
    },
  });

  const handleInvest = async () => {
    const amount = parseFloat(investAmount);
    if (!isNaN(amount) && amount > 0) {
      try {
        // Close modal immediately after button click
        setIsInvestOpen(false);

        const provider = new ethers.BrowserProvider(window.ethereum as any);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const amountInWei = ethers.parseEther(investAmount); // Convert to Wei
        const tx = await contract.deposit({ value: amountInWei });
        await tx.wait(); // Wait for the transaction to be mined

        // Only after the transaction is confirmed, display success
        setInvestmentData(prevData => ({
          ...prevData,
          totalInvested: prevData.totalInvested + amount,
          currentValue: prevData.currentValue + amount,
          transactions: [
            { type: "Investment", amount: amount, date: new Date().toISOString().split('T')[0], portfolio: "Balanced" },
            ...prevData.transactions
          ]
        }));
        setInvestAmount('');
        setInvestSuccess(true); // Set invest success flag
        setTimeout(() => setInvestSuccess(false), 3000); // Clear success message after 3 seconds
      } catch (error) {
        console.error("Investment failed:", error);
      }
    } else {
      alert("Please enter a valid investment amount.");
    }
  };

  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);
    if (!isNaN(amount) && amount > 0 && amount <= investmentData.totalValue) {
      try {
        // Close modal immediately after button click
        setIsWithdrawOpen(false);

        const provider = new ethers.BrowserProvider(window.ethereum as any);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const amountInWei = ethers.parseEther(withdrawAmount); // Convert to Wei
        const tx = await contract.withdraw(amountInWei);
        await tx.wait(); // Wait for the transaction to be mined

        // Only after the transaction is confirmed, display success
        setInvestmentData(prevData => ({
          ...prevData,
          totalValue: prevData.totalValue - amount,
          currentValue: prevData.currentValue - amount,
          transactions: [
            {
              type: "Withdrawal",
              amount: amount,
              date: new Date().toISOString().split('T')[0],
              portfolio: "All"
            },
            ...prevData.transactions
          ]
        }));
        setWithdrawAmount('');
        setWithdrawSuccess(true); // Set withdraw success flag
        setTimeout(() => setWithdrawSuccess(false), 3000); // Clear success message after 3 seconds
      } catch (error) {
        console.error("Withdrawal failed:", error);
      }
    } else {
      alert("Please enter a valid withdrawal amount.");
    }
  };

  const toggleInsights = () => {
    setIsInsightsExpanded(!isInsightsExpanded);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        {isSignedIn ? (
          <div>
            <WordPullUp 
              words="Your Investment Dashboard"
              className="text-4xl font-bold mb-6 text-center"
            />
            <p className="text-xl mb-8 text-center">Welcome to your personalized investment dashboard, {user.firstName}.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="mr-2" /> Portfolio Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">Total Invested: ${investmentData.totalInvested.toLocaleString()}</p>
                  <p className="text-xl">Current Value: ${investmentData.currentValue.toLocaleString()}</p>
                  <p className="text-lg text-green-500">ROI: {investmentData.roi}%</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Dialog open={isInvestOpen} onOpenChange={setIsInvestOpen}>
                    <DialogTrigger asChild>
                      <Button><ArrowUpRight className="mr-2" /> Invest</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Invest Funds</DialogTitle>
                        <DialogDescription>
                          Enter the amount you want to invest and confirm the transaction.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="invest-amount" className="text-right">
                            Amount
                          </Label>
                          <Input
                            id="invest-amount"
                            type="number"
                            value={investAmount}
                            onChange={(e) => setInvestAmount(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleInvest}>Confirm Investment</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline"><ArrowDownLeft className="mr-2" /> Withdraw</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Withdraw Funds</DialogTitle>
                        <DialogDescription>
                          Enter the amount you want to withdraw and confirm the transaction.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="withdraw-amount" className="text-right">
                            Amount
                          </Label>
                          <Input
                            id="withdraw-amount"
                            type="number"
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleWithdraw}>Confirm Withdrawal</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
                {investSuccess && <p className="text-green-500 text-center mt-4">Investment successful!</p>}
                {withdrawSuccess && <p className="text-green-500 text-center mt-4">Withdrawal successful!</p>}
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wallet className="mr-2" /> Investment Options
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {investmentData.portfolios.map((portfolio, index) => (
                    <div key={index} className="mb-4">
                      <p className="font-semibold">{portfolio.name}</p>
                      <p className="text-sm text-muted-foreground">Risk: {portfolio.risk} | Expected Return: {portfolio.return}</p>
                      <Progress value={portfolio.allocation} className="mt-2" />
                      <p className="text-sm text-right">{portfolio.allocation}% Allocated</p>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Adjust Allocations</Button>
                </CardFooter>
              </Card>

              <Card className={`md:col-span-2 ${isInsightsExpanded ? 'row-span-2' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart2 className="mr-2" /> Investment Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Your portfolio is outperforming the market by {investmentData.detailedAnalytics.marketOutperformance}%</p>
                  <p>Diversification Score: {investmentData.detailedAnalytics.diversificationScore}/10</p>
                  <p>Risk Assessment: {investmentData.detailedAnalytics.riskAssessment}</p>

                  {isInsightsExpanded && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Sector Allocation</h3>
                        {investmentData.detailedAnalytics.sectorAllocation.map((sector, index) => (
                          <div key={index} className="flex justify-between items-center mb-1">
                            <span>{sector.sector}</span>
                            <span>{sector.percentage}%</span>
                          </div>
                        ))}
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Monthly Returns</h3>
                        <div className="flex justify-between">
                          {investmentData.detailedAnalytics.monthlyReturns.map((month, index) => (
                            <div key={index} className="text-center">
                              <div className={`h-20 w-8 bg-primary-foreground relative`}>
                                <div
                                  className={`absolute bottom-0 left-0 right-0 bg-primary`}
                                  style={{ height: `${Math.abs(month.return) * 5}%` }}
                                ></div>
                              </div>
                              <div className="text-xs mt-1">{month.month}</div>
                              <div className={`text-xs ${month.return >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {month.return}%
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold mb-2">Top Performers</h3>
                          {investmentData.detailedAnalytics.topPerformers.map((asset, index) => (
                            <div key={index} className="flex justify-between">
                              <span>{asset.asset}</span>
                              <span className="text-green-500">+{asset.return}%</span>
                            </div>
                          ))}
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Underperformers</h3>
                          {investmentData.detailedAnalytics.underperformers.map((asset, index) => (
                            <div key={index} className="flex justify-between">
                              <span>{asset.asset}</span>
                              <span className="text-red-500">{asset.return}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={toggleInsights}
                  >
                    {isInsightsExpanded ? (
                      <>
                        <ChevronUp className="mr-2 h-4 w-4" /> Hide Detailed Analytics
                      </>
                    ) : (
                      <>
                        <ChevronDown className="mr-2 h-4 w-4" /> View Detailed Analytics
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <History className="mr-2" /> Recent Transactions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left">Type</th>
                          <th className="py-2 px-4 text-right">Amount</th>
                          <th className="py-2 px-4 text-right">Date</th>
                          <th className="py-2 px-4 text-right">Portfolio</th>
                        </tr>
                      </thead>
                      <tbody>
                        {investmentData.transactions.map((transaction, index) => (
                          <tr key={index} className="border-b last:border-b-0">
                            <td className="py-2 px-4">{transaction.type}</td>
                            <td className="py-2 px-4 text-right">${transaction.amount}</td>
                            <td className="py-2 px-4 text-right">{transaction.date}</td>
                            <td className="py-2 px-4 text-right">{transaction.portfolio}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Transactions</Button>
                </CardFooter>
              </Card>
            </div>

            {/* Error Dialogs */}
            <Dialog open={isInvestErrorOpen} onOpenChange={setIsInvestErrorOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Error</DialogTitle>
                  <DialogDescription>{investError}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button onClick={() => setIsInvestErrorOpen(false)}>Close</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isWithdrawErrorOpen} onOpenChange={setIsWithdrawErrorOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Error</DialogTitle>
                  <DialogDescription>{withdrawError}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button onClick={() => setIsWithdrawErrorOpen(false)}>Close</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

          </div>
        ) : (
          <>
            <motion.section 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <WordPullUp 
                words="Smart Investing for Your Future"
                className="text-5xl font-bold mb-6"
              />
              <p className="text-xl mb-8 text-muted-foreground">Grow your wealth with our innovative investment strategies and tools.</p>
              <SignInButton mode="modal">
                <Button size="lg">Sign In to Invest</Button>
              </SignInButton>
            </motion.section>

            <motion.section 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <ShineBorder 
                  borderRadius={8}
                  borderWidth={1}
                  duration={10}
                  color={["#8B5CF6", "#6366F1", "#4F46E5"]}
                  className="w-full md:w-1/2"
                >
                  <Card className="w-full bg-transparent border-none shadow-none">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-center">Why Invest with Us?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-none space-y-2 text-muted-foreground">
                        <li className="flex items-center"><Check className="h-5 w-5 text-primary mr-2" /> Diversified investment portfolios</li>
                        <li className="flex items-center"><Check className="h-5 w-5 text-primary mr-2" /> AI-driven investment strategies</li>
                        <li className="flex items-center"><Check className="h-5 w-5 text-primary mr-2" /> Real-time market insights</li>
                        <li className="flex items-center"><Check className="h-5 w-5 text-primary mr-2" /> Low fees and transparent pricing</li>
                        <li className="flex items-center"><Check className="h-5 w-5 text-primary mr-2" /> Secure and regulated platform</li>
                      </ul>
                    </CardContent>
                  </Card>
                </ShineBorder>
                <div className="w-full md:w-1/2">
                  <Image
                    src="/8596353.jpg"
                    alt="Invest with BlockHolder"
                    width={800}
                    height={600}
                    className="rounded-lg shadow-xl object-cover"
                  />
                </div>
              </div>
            </motion.section>

            <motion.section 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Investment Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "AI-Powered Portfolios",
                    description: "Leverage advanced algorithms for optimal asset allocation.",
                    icon: Zap,
                  },
                  {
                    title: "Real-Time Analytics",
                    description: "Track your investments with up-to-the-minute market data.",
                    icon: BarChart2,
                  },
                  {
                    title: "Risk Management",
                    description: "Tailor your portfolio to match your risk tolerance.",
                    icon: Target,
                  },
                ].map((feature) => (
                  <MagicCard 
                    key={feature.title} 
                    className="p-6 bg-gradient-to-br from-purple-900 to-indigo-900 text-white"
                    gradientColor="rgba(255, 255, 255, 0.1)"
                  >
                    <div className="flex flex-col h-full">
                      <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                        <feature.icon className="h-5 w-5 flex-none text-purple-300" aria-hidden="true" />
                        {feature.title}
                      </dt>
                      <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-purple-100">
                        <p className="flex-auto">{feature.description}</p>
                      </dd>
                      <div className="mt-6">
                        <SignInButton mode="modal">
                          <Button className="w-full bg-white text-purple-900 hover:bg-purple-100">
                            Learn More <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </SignInButton>
                      </div>
                    </div>
                  </MagicCard>
                ))}
              </div>
            </motion.section>

            <motion.section 
              className="mb-12"
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
                    Start Your Investment Journey
                  </h3>
                  <p className="text-center mb-6">
                    Sign in now to access our full range of investment tools and start building your wealth with smart, data-driven strategies.
                  </p>
                  <div className="flex justify-center">
                    <SignInButton mode="modal">
                      <RainbowButton>
                        Sign In to Start Investing
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