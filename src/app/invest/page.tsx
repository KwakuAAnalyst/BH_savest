'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Progress } from "@/app/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useUser, SignInButton } from '@clerk/nextjs';
import { PieChart, Wallet, TrendingUp, Zap, BarChart2, ChevronDown, ChevronUp, ArrowUpRight, ArrowDownLeft, History, Check } from 'lucide-react';
import Image from 'next/image';

export default function InvestPage() {
  const { isSignedIn, user } = useUser();
  const [isInsightsExpanded, setIsInsightsExpanded] = useState(false);
  const [isInvestOpen, setIsInvestOpen] = useState(false);
  const [investAmount, setInvestAmount] = useState('');
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');

  // Mock data for the dashboard
  const [investmentData, setInvestmentData] = useState({
    totalInvested: 50000,
    currentValue: 62500,
    totalValue: 62500, // Add this line
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

  const toggleInsights = () => {
    setIsInsightsExpanded(!isInsightsExpanded);
  };

  const handleInvest = () => {
    const amount = parseFloat(investAmount);
    if (!isNaN(amount) && amount > 0) {
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
      setIsInvestOpen(false);
    }
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (!isNaN(amount) && amount > 0 && amount <= investmentData.totalValue) {
      setInvestmentData(prevData => ({
        ...prevData,
        totalValue: prevData.totalValue - amount,
        currentValue: prevData.currentValue - amount, // Update current value as well
        transactions: [
          { 
            type: "Withdrawal", 
            amount: amount, 
            date: new Date().toISOString().split('T')[0], 
            portfolio: "All" // Add a portfolio field to match the existing transaction structure
          },
          ...prevData.transactions
        ]
      }));
      setWithdrawAmount('');
      setIsWithdrawOpen(false); // Close the withdrawal modal
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        {isSignedIn ? (
          <div>
            <h1 className="text-4xl font-bold mb-6 text-center">Your Investment Dashboard</h1>
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
                          Enter the amount you want to invest and choose your portfolio allocation.
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
                        <Button onClick={handleInvest}>Invest</Button>
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
                          Enter the amount you want to withdraw from your investment account.
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
          </div>
        ) : (
          <>
            <motion.section 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl font-bold mb-6">Smart Investing for Your Future</h1>
              <p className="text-xl mb-8 text-muted-foreground">Grow your wealth with our innovative investment strategies and tools.</p>
              <SignInButton mode="modal">
                <Button size="lg">
                  Sign In to Invest
                </Button>
              </SignInButton>
            </motion.section>

            <motion.section 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <Card className="w-full md:w-1/2">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Why Invest with Us?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-none space-y-2 text-muted-foreground">
                      <li className="flex items-center"><Check className="h-5 w-5 text-primary mr-2" /> Diversified investment portfolios</li>
                      <li className="flex items-center"><Check className="h-5 w-5 text-primary mr-2" /> Automated rebalancing</li>
                      <li className="flex items-center"><Check className="h-5 w-5 text-primary mr-2" /> Low-cost index funds and ETFs</li>
                      <li className="flex items-center"><Check className="h-5 w-5 text-primary mr-2" /> Real-time performance tracking</li>
                      <li className="flex items-center"><Check className="h-5 w-5 text-primary mr-2" /> Expert financial advice</li>
                    </ul>
                  </CardContent>
                </Card>
                <div className="w-full md:w-1/2">
                  <Image
                    src="/stacks.jpg"
                    alt="Invest with BlockHolder"
                    width={600}
                    height={400}
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
              <h2 className="text-3xl font-bold mb-8 text-center">Investment Options</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Stocks',
                    description: 'Invest in individual companies or diversified stock portfolios for long-term growth potential.',
                    icon: <TrendingUp className="h-6 w-6" />
                  },
                  {
                    title: 'ETFs',
                    description: 'Access a wide range of assets through low-cost, diversified Exchange-Traded Funds.',
                    icon: <BarChart2 className="h-6 w-6" />
                  },
                  {
                    title: 'Cryptocurrencies',
                    description: 'Explore the world of digital assets with our curated selection of cryptocurrencies.',
                    icon: <Zap className="h-6 w-6" />
                  }
                ].map((option, index) => (
                  <Card key={option.title} className="flex flex-col">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {option.icon}
                        {option.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription>
                        {option.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="mt-auto">
                      <SignInButton mode="modal">
                        <Button className="w-full">Learn More</Button>
                      </SignInButton>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </motion.section>

            <motion.section 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Start Your Investing Journey</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Sign in now to access our full range of investment tools and start building your financial future.
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <SignInButton mode="modal">
                    <Button size="lg">
                      Sign In to Start Investing
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