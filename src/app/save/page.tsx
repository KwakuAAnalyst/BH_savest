'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/app/components/ui/button";
import { Check, Target, RefreshCw, Zap, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useUser, SignInButton } from '@clerk/nextjs';
import { PieChart, Wallet, ChevronDown, ChevronUp, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { ethers } from 'ethers';
import axios from 'axios'; // To fetch ETH price
import { Progress } from "@/app/components/ui/progress";
import EthSavings from "@/app/abi/SavingContract.json"; // Your contract ABI
import { RainbowButton } from "@/app/components/ui/rainbow-button";
import TransactionHistory from '@/app/components/TransactionHistory';
import ShineBorder from '@/app/components/ui/shine-border';
import WordPullUp from '@/app/components/ui/word-pull-up';
import { NeonGradientCard } from '@/app/components/ui/neon-gradient-card';
import { MagicCard } from "@/app/components/ui/magic-card";
import Image from 'next/image';

const contractAddress = "0x035d1c84106b51c8094697e8d3b26c5df9937ad2"; // Your contract address
const contractABI = EthSavings;

export default function SavePage() {
  const { isSignedIn, user } = useUser();
  const [isInsightsExpanded, setIsInsightsExpanded] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [depositSuccess, setDepositSuccess] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [totalSaved, setTotalSaved] = useState('0.00000'); // Total saved in ETH (5 decimals)
  const [currentValue, setCurrentValue] = useState('0.00'); // Current value in USD
  const [ethPrice, setEthPrice] = useState(0); // Current ETH price in USD
  const [account, setAccount] = useState<string | null>(null); // State for account (wallet address)
  const [quarterlyInterest, setQuarterlyInterest] = useState('0.00'); // 7% of the total current balance

  // Function to fetch the user's saved amount in the contract using the balances mapping
  const fetchUserSavings = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum as any);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const walletAddress = await signer.getAddress();
        setAccount(walletAddress);

        // Fetch saved amount using the `balances` mapping
        const savedInWei = await contract.balances(walletAddress);
        const savedInEth = ethers.formatEther(savedInWei);
        setTotalSaved(parseFloat(savedInEth).toFixed(5)); // Display up to 5 decimal places

        // Calculate current value based on ETH price
        if (ethPrice > 0) {
          const currentValueInUSD = (parseFloat(savedInEth) * ethPrice).toFixed(2);
          setCurrentValue(currentValueInUSD);

          // Calculate 7% quarterly interest based on the saved amount
          const interest = (parseFloat(savedInEth) * 0.07).toFixed(5);
          setQuarterlyInterest(interest);
        }
      } catch (error) {
        console.error("Error fetching user's saved amount:", error);
      }
    }
  };

  // Function to fetch the current price of ETH
  const fetchEthPrice = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const price = response.data.ethereum.usd;
      setEthPrice(price);
    } catch (error) {
      console.error("Error fetching ETH price:", error);
    }
  };

  useEffect(() => {
    fetchEthPrice(); // Fetch ETH price on component load
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      fetchUserSavings(); // Fetch user's savings once ETH price is available and user is signed in
    }
  }, [ethPrice, isSignedIn]);

  const handleDeposit = async () => {
    const amount = parseFloat(depositAmount);
    if (!isNaN(amount) && amount > 0) {
      try {
        setIsDepositOpen(false);
        const provider = new ethers.BrowserProvider(window.ethereum as any);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        const amountInWei = ethers.parseEther(depositAmount);
        const tx = await contract.deposit({ value: amountInWei });
        await tx.wait();
        setDepositAmount('');
        setDepositSuccess(true);
        setTimeout(() => setDepositSuccess(false), 3000);
        fetchUserSavings(); // Refresh total saved after saving
      } catch (error) {
        console.error("Deposit failed:", error);
      }
    } else {
      alert("Please enter a valid deposit amount.");
    }
  };

  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);
    if (!isNaN(amount) && amount > 0) {
      try {
        setIsWithdrawOpen(false);
        const provider = new ethers.BrowserProvider(window.ethereum as any);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        const amountInWei = ethers.parseEther(withdrawAmount);
        const tx = await contract.withdraw(amountInWei);
        await tx.wait();
        setWithdrawAmount('');
        setWithdrawSuccess(true);
        setTimeout(() => setWithdrawSuccess(false), 3000);
        fetchUserSavings(); // Refresh total saved after withdrawal
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
              words="Your Savings Dashboard"
              className="text-4xl font-bold mb-6 text-center"
            />
            <p className="text-xl mb-8 text-center">Welcome to your personalized savings dashboard, {user.firstName}.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Portfolio Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="mr-2" /> Savings Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">Total Saved: {totalSaved} ETH</p> {/* Displayed as "ETH" */}
                  <p className="text-xl">Current Value: ${currentValue} USD</p>
                  <p className="text-lg text-green-500">Quarterly Interest: {quarterlyInterest} ETH</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
                    <DialogTrigger asChild>
                      <Button><ArrowUpRight className="mr-2" /> Deposit</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Deposit Funds</DialogTitle>
                        <DialogDescription>
                          Enter the amount you want to deposit and confirm the transaction.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="deposit-amount" className="text-right">
                            Amount
                          </Label>
                          <Input
                            id="deposit-amount"
                            type="number"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleDeposit}>Confirm Deposit</Button>
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
                {depositSuccess && <p className="text-green-500 text-center mt-4">Deposit successful!</p>}
                {withdrawSuccess && <p className="text-green-500 text-center mt-4">Withdrawal successful!</p>}
              </Card>

              {/* Savings Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wallet className="mr-2" /> Savings Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {[
                    { name: "Goal-based Savings", description: "Set specific savings goals and track your progress.", allocation: 30 },
                    { name: "Auto-save", description: "Automatically save a portion of your income or balance.", allocation: 50 },
                    { name: "Interest Optimization", description: "Optimize your savings for the best interest rates.", allocation: 20 },
                  ].map((feature, index) => (
                    <div key={index} className="mb-4">
                      <p className="font-semibold">{feature.name}</p>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                      <Progress value={feature.allocation} className="mt-2" />
                      <p className="text-sm text-right">{feature.allocation}% Usage</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Transaction History */}
              <TransactionHistory account={account || ''} />
            </div>
          </div>
        ) : (
          <>
            {/* Section for users who are not signed in */}
            <motion.section 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <WordPullUp 
                words="Smart Savings for Your Future"
                className="text-5xl font-bold mb-6"
              />
              <p className="text-xl mb-8 text-muted-foreground">Grow your wealth with our innovative savings strategies and tools.</p>
              <SignInButton mode="modal">
                <Button size="lg">Sign In to Save</Button>
              </SignInButton>
            </motion.section>

            {/* Placeholder Section */}
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
                      <CardTitle className="text-2xl font-bold text-center">Why Save with Us?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-none space-y-2 text-muted-foreground">
                        <li className="flex items-center"><Check className="h-5 w-5 text-primary mr-2" /> Goal-based savings options</li>
                        <li className="flex items-center"><Check className="h-5 w-5 text-primary mr-2" /> Auto-save feature</li>
                        <li className="flex items-center"><Check className="h-5 w-5 text-primary mr-2" /> Optimized interest rates</li>
                      </ul>
                    </CardContent>
                  </Card>
                </ShineBorder>
                <div className="w-full md:w-1/2">
                  <Image
                    src="/8596353.jpg"
                    alt="Save with BlockHolder"
                    width={800}
                    height={600}
                    className="rounded-lg shadow-xl object-cover"
                  />
                </div>
              </div>
            </motion.section>

            {/* Savings Features Section */}
            <motion.section 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Savings Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Goal-based Savings",
                    description: "Set and track personalized savings goals for your future plans.",
                    icon: Target,
                  },
                  {
                    title: "Auto-save",
                    description: "Automate your savings with customizable recurring transfers.",
                    icon: RefreshCw,
                  },
                  {
                    title: "Interest Optimization",
                    description: "Maximize your returns with our intelligent interest allocation system.",
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

            {/* Call to action for signing in */}
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
                    Start Your Savings Journey
                  </h3>
                  <p className="text-center mb-6">
                    Sign in now to access our full range of savings tools and start building your wealth with smart, data-driven strategies.
                  </p>
                  <div className="flex justify-center">
                    <SignInButton mode="modal">
                      <RainbowButton>
                        Sign In to Start Saving
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
