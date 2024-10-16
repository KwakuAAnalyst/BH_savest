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
import { ethers } from 'ethers';
import { PieChart, Wallet, Vote, Zap, ArrowUpRight, ArrowDownLeft, ChevronDown, ChevronUp, History, RefreshCw, Check, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Progress } from "@/app/components/ui/progress";
import EthStaking from "@/app/abi/EthStaking.json";
import { MagicCard } from "@/app/components/ui/magic-card";
import { cn } from "@/lib/utils";
import ShineBorder from "@/app/components/ui/shine-border";
import WordPullUp from "@/app/components/ui/word-pull-up";
import { NeonGradientCard } from "@/app/components/ui/neon-gradient-card";
import { RainbowButton } from "@/app/components/ui/rainbow-button";
import TransactionHistory from '@/app/components/TransactionHistory'; // Importing TransactionHistory component

const contractAddress = "0x42a0bd840bc220e64bb4a1710bafb4e1340e3829"; // Your contract address
const contractABI = EthStaking;

export default function EarnPage() {
  const { isSignedIn, user } = useUser();
  const [isStakeOpen, setIsStakeOpen] = useState(false);
  const [stakeAmount, setStakeAmount] = useState('');
  const [isUnstakeOpen, setIsUnstakeOpen] = useState(false);
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [isClaimRewardsOpen, setIsClaimRewardsOpen] = useState(false);
  const [claimAmount, setClaimAmount] = useState('');
  const [isProposalsOpen, setIsProposalsOpen] = useState(false);
  const [stakedBalance, setStakedBalance] = useState("0.000000");
  const [stakeError, setStakeError] = useState('');
  const [unstakeError, setUnstakeError] = useState('');
  const [isStakeErrorOpen, setIsStakeErrorOpen] = useState(false);
  const [isUnstakeErrorOpen, setIsUnstakeErrorOpen] = useState(false);
  const [stakeSuccess, setStakeSuccess] = useState('');
  const [unstakeSuccess, setUnstakeSuccess] = useState('');
  const [account, setAccount] = useState<string | null>(null); // Store wallet address

  const [earningData, setEarningData] = useState({
    tvl: 1000000,
    currentApy: 90,
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
  });

  const [proposals, setProposals] = useState([
    { id: 1, title: "Increase staking rewards by 2%", votes: 1500, hasVoted: false },
    { id: 2, title: "Add new 60-day lock staking option", votes: 1200, hasVoted: false },
    { id: 3, title: "Implement cross-chain staking", votes: 980, hasVoted: false },
    { id: 4, title: "Reduce unstaking period to 24 hours", votes: 2100, hasVoted: false },
  ]);

  useEffect(() => {
    if (isSignedIn && user && user.primaryEmailAddress) {
      fetchStakedBalance();
    }
  }, [isSignedIn, user]);

  const fetchStakedBalance = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed. Please install MetaMask and try again.');
      }
  
      const provider = new ethers.BrowserProvider(window.ethereum as any);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
      const walletAddress = await signer.getAddress();
      setAccount(walletAddress); // Store wallet address
      const totalBalance = await contract.getTotalBalance(walletAddress); 
      const formattedStakedBalance = ethers.formatEther(totalBalance).toString();
  
      setStakedBalance(parseFloat(formattedStakedBalance).toFixed(6));
    } catch (error) {
      console.error("Failed to fetch staked balance:", error);
    }
  };

  const handleStake = async () => {
    try {
      setIsStakeOpen(false); 
  
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed. Please install MetaMask and try again.');
      }
  
      const provider = new ethers.BrowserProvider(window.ethereum as any);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
      const walletAddress = await signer.getAddress();
      const totalBalance = await contract.getTotalBalance(walletAddress); 
      const formattedStakedBalance = ethers.formatEther(totalBalance).toString();
  
      if (parseFloat(formattedStakedBalance) > 0) {  
        setStakeError('Please unstake your currently staked assets to stake again.');
        setIsStakeErrorOpen(true);
        return;
      }
  
      const amount = parseFloat(stakeAmount);
      if (isNaN(amount) || amount <= 0) {
        setStakeError('Please enter a valid amount to stake.');
        setIsStakeErrorOpen(true);
        return;
      }
  
      const tx = await contract.stake({
        value: ethers.parseEther(stakeAmount)
      });
      
      await tx.wait(); 
      console.log('Staked successfully:', tx);
      fetchStakedBalance(); 
  
      setStakeAmount('');
      setStakeSuccess('Stake successful!');
      setTimeout(() => {
        setStakeSuccess('');
      }, 3000);
    } catch (error) {
      console.error("Failed to stake:", error);
    }
  };

  const handleUnstake = async () => {
    setIsUnstakeOpen(false); 
    try {
      setUnstakeError(''); 
  
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed. Please install MetaMask and try again.');
      }
  
      const provider = new ethers.BrowserProvider(window.ethereum as any);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
      const tx = await contract.unstake(); 
      await tx.wait(); 
      console.log('Unstaked successfully:', tx);
  
      fetchStakedBalance(); 
  
      setUnstakeSuccess('Unstake successful!');
      setTimeout(() => {
        setUnstakeSuccess('');
      }, 3000); 
    } catch (error: any) {
      const errorMessage = error.message || "An unknown error occurred";
  
      if (errorMessage.includes('Staking period not complete')) {
        setUnstakeError('You cannot unstake yet. The staking period is not complete.');
        setIsUnstakeErrorOpen(true);
      } else {
        console.error("Failed to unstake:", errorMessage);
        setUnstakeError('An error occurred while trying to unstake. Please try again.');
        setIsUnstakeErrorOpen(true);
      }
    }
  };

  const handleClaimRewards = async () => {
    const amount = parseFloat(claimAmount);
    if (!isNaN(amount) && amount > 0 && amount <= earningData.accumulatedRewards) {
      setClaimAmount('');
      setIsClaimRewardsOpen(false); 
    }
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
            <WordPullUp 
              words="Your Earning Dashboard"
              className="text-4xl font-bold mb-6 text-center"
            />
            <p className="text-xl mb-8 text-center">Welcome to your personalized earning dashboard, {user.firstName}.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="mr-2" /> Total Staked Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">Total Staked: {stakedBalance} ETH</p>
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
                          Enter the amount you want to stake and confirm.
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
                        <Button onClick={handleStake}>Confirm Stake</Button>
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
                          Are you sure you want to unstake your assets? Click confirm to proceed.
                        </DialogDescription>
                      </DialogHeader>
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
                      <div className="h-[300px] overflow-y-auto pr-4">
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
                      </div>
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

              {/* Transaction History integrated from page 1 */}
              {account && <TransactionHistory account={account} />} {/* Use account from state */}

            </div>

            {/* Success messages */}
            {stakeSuccess && <p className="text-green-500 text-center mt-4">{stakeSuccess}</p>}
            {unstakeSuccess && <p className="text-green-500 text-center mt-4">{unstakeSuccess}</p>}

            {/* Error Dialogs */}
            <Dialog open={isStakeErrorOpen} onOpenChange={setIsStakeErrorOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Error</DialogTitle>
                  <DialogDescription>{stakeError}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button onClick={() => setIsStakeErrorOpen(false)}>Close</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isUnstakeErrorOpen} onOpenChange={setIsUnstakeErrorOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Error</DialogTitle>
                  <DialogDescription>{unstakeError}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button onClick={() => setIsUnstakeErrorOpen(false)}>Close</Button>
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
                words="Earn More with Staking and Governance"
                className="text-5xl font-bold mb-6"
              />
              <p className="text-xl mb-8 text-muted-foreground">Maximize your crypto holdings through staking rewards and participate in platform governance.</p>
              <SignInButton mode="modal">
                <Button size="lg">Sign In to Earn</Button>
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
                </ShineBorder>
                <div className="w-full md:w-1/2">
                  <Image
                    src="/7532619.jpg"
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
                {[
                  {
                    title: "Staking",
                    description: "Earn passive income by locking your assets and securing the network.",
                    icon: Wallet,
                  },
                  {
                    title: "Governance",
                    description: "Participate in decision-making and shape the future of the platform.",
                    icon: Vote,
                  },
                  {
                    title: "Yield Farming",
                    description: "Maximize returns by providing liquidity to various pools.",
                    icon: Zap,
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
                    Start Your Earning Journey
                  </h3>
                  <p className="text-center mb-6">
                    Sign in now to access our full range of earning tools and start maximizing your crypto returns through staking, governance, and yield farming.
                  </p>
                  <div className="flex justify-center">
                    <SignInButton mode="modal">
                      <RainbowButton>
                        Sign In to Start Earning
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
