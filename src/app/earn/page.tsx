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
import { PieChart, Wallet, Vote, Zap, BarChart2, RefreshCw, TrendingUp, ArrowUpRight, ArrowDownLeft, History, ChevronDown, ChevronUp, Check } from 'lucide-react';
import Image from 'next/image';
import { ScrollArea } from "@/app/components/ui/scroll-area";

export default function EarnPage() {
  const { isSignedIn, user } = useUser();
  const [isStakeOpen, setIsStakeOpen] = useState(false);
  const [stakeAmount, setStakeAmount] = useState('');
  const [isTransactionHistoryExpanded, setIsTransactionHistoryExpanded] = useState(false);
  const [isUnstakeOpen, setIsUnstakeOpen] = useState(false);
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [isClaimRewardsOpen, setIsClaimRewardsOpen] = useState(false);
  const [claimAmount, setClaimAmount] = useState('');
  const [isProposalsOpen, setIsProposalsOpen] = useState(false);

  // Mock data for the dashboard
  const [earningData, setEarningData] = useState({
    totalStaked: 50000,
    tvl: 1000000,
    currentApy: 12.5,
    accumulatedRewards: 1250,
    nextPayout: "2d 14h 32m",
    stakingPools: [
      { name: "30-day lock", apy: 10, staked: 20000 },
      { name: "90-day lock", apy: 15, staked: 30000 },
    ],
    governanceTokens: 5000,
    votingPower: 5000,
    activeProposals: 3,
    tierProgress: 75,
    currentTier: "Silver",
    nextTier: "Gold",
    portfolioGrowth: 18.5,
    transactions: [
      { type: "Stake", amount: 1000, date: "2023-05-15", pool: "30-day lock" },
      { type: "Reward", amount: 50, date: "2023-05-14", pool: "90-day lock" },
      { type: "Unstake", amount: 500, date: "2023-05-10", pool: "30-day lock" },
      { type: "Stake", amount: 2000, date: "2023-05-01", pool: "90-day lock" },
    ],
  });

  const [proposals, setProposals] = useState([
    { id: 1, title: "Increase staking rewards by 2%", votes: 1500, hasVoted: false },
    { id: 2, title: "Add new 60-day lock staking option", votes: 1200, hasVoted: false },
    { id: 3, title: "Implement cross-chain staking", votes: 980, hasVoted: false },
    { id: 4, title: "Reduce unstaking period to 24 hours", votes: 2100, hasVoted: false },
  ]);

  const handleStake = () => {
    const amount = parseFloat(stakeAmount);
    if (!isNaN(amount) && amount > 0) {
      setEarningData(prevData => ({
        ...prevData,
        totalStaked: prevData.totalStaked + amount,
        transactions: [
          { type: "Stake", amount: amount, date: new Date().toISOString().split('T')[0], pool: "30-day lock" },
          ...prevData.transactions
        ]
      }));
      setStakeAmount('');
      setIsStakeOpen(false);
    }
  };

  const handleUnstake = () => {
    const amount = parseFloat(unstakeAmount);
    if (!isNaN(amount) && amount > 0 && amount <= earningData.totalStaked) {
      setEarningData(prevData => ({
        ...prevData,
        totalStaked: prevData.totalStaked - amount,
        transactions: [
          { type: "Unstake", amount: amount, date: new Date().toISOString().split('T')[0], asset: "Selected Asset" },
          ...prevData.transactions
        ]
      }));
      setUnstakeAmount('');
      setIsUnstakeOpen(false);
    }
  };

  const handleClaimRewards = () => {
    const amount = parseFloat(claimAmount);
    if (!isNaN(amount) && amount > 0 && amount <= earningData.accumulatedRewards) {
      setEarningData(prevData => ({
        ...prevData,
        accumulatedRewards: prevData.accumulatedRewards - amount,
        transactions: [
          { type: "Reward Claim", amount: amount, date: new Date().toISOString().split('T')[0], pool: "All Pools" },
          ...prevData.transactions
        ]
      }));
      setClaimAmount('');
      setIsClaimRewardsOpen(false);
    }
  };

  const toggleTransactionHistory = () => {
    setIsTransactionHistoryExpanded(!isTransactionHistoryExpanded);
  };

  const handleVote = (proposalId: number) => {
    setProposals(prevProposals =>
      prevProposals.map(proposal =>
        proposal.id === proposalId
          ? { ...proposal, votes: proposal.votes + 1, hasVoted: true }
          : proposal
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        {isSignedIn ? (
          <div>
            <h1 className="text-4xl font-bold mb-6 text-center">Your Earning Dashboard</h1>
            <p className="text-xl mb-8 text-center">Welcome to your personalized earning dashboard, {user.firstName}.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="mr-2" /> Total Staked Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">Total Staked: ${earningData.totalStaked.toLocaleString()}</p>
                  <p className="text-xl">TVL: ${earningData.tvl.toLocaleString()}</p>
                  <p className="text-lg text-green-500">Current APY: {earningData.currentApy}%</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Dialog open={isStakeOpen} onOpenChange={setIsStakeOpen}>
                    <DialogTrigger asChild>
                      <Button><ArrowUpRight className="mr-2" /> Stake</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Stake Funds</DialogTitle>
                        <DialogDescription>
                          Enter the amount you want to stake and choose a staking pool.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="stake-amount" className="text-right">
                            Amount
                          </Label>
                          <Input
                            id="stake-amount"
                            type="number"
                            value={stakeAmount}
                            onChange={(e) => setStakeAmount(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleStake}>Stake</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Dialog open={isUnstakeOpen} onOpenChange={setIsUnstakeOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline"><ArrowDownLeft className="mr-2" /> Unstake</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Unstake Assets</DialogTitle>
                        <DialogDescription>
                          Enter the amount you want to unstake from your earning account.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="unstake-amount" className="text-right">
                            Amount
                          </Label>
                          <Input
                            id="unstake-amount"
                            type="number"
                            value={unstakeAmount}
                            onChange={(e) => setUnstakeAmount(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleUnstake}>Confirm Unstake</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wallet className="mr-2" /> Real-Time Earnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">Accumulated Rewards: ${earningData.accumulatedRewards.toLocaleString()}</p>
                  <p className="text-lg">Next Payout: {earningData.nextPayout}</p>
                </CardContent>
                <CardFooter>
                  <Dialog open={isClaimRewardsOpen} onOpenChange={setIsClaimRewardsOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full"><Zap className="mr-2" /> Claim Rewards</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Claim Rewards</DialogTitle>
                        <DialogDescription>
                          Enter the amount of rewards you want to claim.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="claim-amount" className="text-right">
                            Amount
                          </Label>
                          <Input
                            id="claim-amount"
                            type="number"
                            value={claimAmount}
                            onChange={(e) => setClaimAmount(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleClaimRewards}>Confirm Claim</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Vote className="mr-2" /> Governance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">Governance Tokens: {earningData.governanceTokens}</p>
                  <p>Voting Power: {earningData.votingPower}</p>
                  <p>Active Proposals: {proposals.length}</p>
                </CardContent>
                <CardFooter>
                  <Dialog open={isProposalsOpen} onOpenChange={setIsProposalsOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">View Proposals</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Active Proposals</DialogTitle>
                        <DialogDescription>
                          Review and vote on active governance proposals.
                        </DialogDescription>
                      </DialogHeader>
                      <ScrollArea className="h-[300px] w-full pr-4">
                        {proposals.map((proposal) => (
                          <div key={proposal.id} className="mb-4 p-4 border rounded-lg">
                            <h3 className="font-semibold mb-2">{proposal.title}</h3>
                            <div className="flex justify-between items-center">
                              <span>Votes: {proposal.votes}</span>
                              <Button 
                                onClick={() => handleVote(proposal.id)} 
                                disabled={proposal.hasVoted}
                              >
                                {proposal.hasVoted ? 'Voted' : 'Vote'}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </ScrollArea>
                      <DialogFooter>
                        <Button onClick={() => setIsProposalsOpen(false)}>Close</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <RefreshCw className="mr-2" /> Auto-Compounding
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Auto-compounding is currently active.</p>
                  <p className="text-sm text-muted-foreground mt-2">Frequency: Daily</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Adjust Settings</Button>
                </CardFooter>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <History className="mr-2" /> Transaction History
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
                          <th className="py-2 px-4 text-right">Pool</th>
                        </tr>
                      </thead>
                      <tbody>
                        {earningData.transactions.slice(0, isTransactionHistoryExpanded ? undefined : 4).map((transaction, index) => (
                          <tr key={index} className="border-b last:border-b-0">
                            <td className="py-2 px-4">{transaction.type}</td>
                            <td className="py-2 px-4 text-right">${transaction.amount}</td>
                            <td className="py-2 px-4 text-right">{transaction.date}</td>
                            <td className="py-2 px-4 text-right">{transaction.pool}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={toggleTransactionHistory}
                  >
                    {isTransactionHistoryExpanded ? (
                      <>
                        <ChevronUp className="mr-2 h-4 w-4" /> Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="mr-2 h-4 w-4" /> View All Transactions
                      </>
                    )}
                  </Button>
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
              <h1 className="text-5xl font-bold mb-6">Earn More with Staking and Governance</h1>
              <p className="text-xl mb-8 text-muted-foreground">Maximize your crypto holdings through staking rewards and participate in platform governance.</p>
              <SignInButton mode="modal">
                <Button size="lg">
                  Sign In to Earn
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
                    <CardTitle className="text-2xl font-bold text-center">Why Earn with Us?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-none space-y-2 text-muted-foreground">
                      <li className="flex items-center"><Check className="h-5 w-5 text-primary mr-2" /> High-yield staking opportunities</li>
                      <li className="flex items-center"><Check className="h-5 w-5 text-primary mr-2" /> Participate in platform governance</li>
                      <li className="flex items-center"><Check className="h-5 w-5 text-primary mr-2" /> Automated compounding</li>
                      <li className="flex items-center"><Check className="h-5 w-5 text-primary mr-2" /> Flexible lock-up periods</li>
                      <li className="flex items-center"><Check className="h-5 w-5 text-primary mr-2" /> Real-time reward tracking</li>
                    </ul>
                  </CardContent>
                </Card>
                <div className="w-full md:w-1/2">
                  <Image
                    src="/stake.jpg"
                    alt="Earn with BlockHolder"
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
              <h2 className="text-3xl font-bold mb-8 text-center">Earning Options</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {['Staking', 'Governance', 'Yield Farming'].map((option, index) => (
                  <Card key={option}>
                    <CardHeader>
                      <CardTitle>{option}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        Learn how {option.toLowerCase()} can help you maximize your returns and participate in the platform's growth.
                      </CardDescription>
                    </CardContent>
                    <CardFooter>
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
                  <CardTitle className="text-center">Start Your Earning Journey</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Sign in now to access our full range of earning tools and start maximizing your crypto returns through staking, governance, and yield farming.
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <SignInButton mode="modal">
                    <Button size="lg">
                      Sign In to Start Earning
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