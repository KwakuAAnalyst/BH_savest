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
import { PieChart, Wallet, Target, Zap, ArrowUpRight, ArrowDownLeft, ChevronDown, ChevronUp, History, RefreshCw, Check, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Progress } from "@/app/components/ui/progress";
import SavingContract from "@/app/abi/SavingContract.json";
import { MagicCard } from "@/app/components/ui/magic-card";
import { cn } from "@/lib/utils";
import ShineBorder from "@/app/components/ui/shine-border";
import WordPullUp from "@/app/components/ui/word-pull-up";
import { NeonGradientCard } from "@/app/components/ui/neon-gradient-card";
import { RainbowButton } from "@/app/components/ui/rainbow-button";

const contractAddress = "0x035d1c84106b51c8094697e8d3b26c5df9937ad2"; // Your contract address

export default function SavePage() {
  const { isSignedIn, user } = useUser();
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({ name: '', target: '' });
  const [depositAmount, setDepositAmount] = useState('');
  const [isTransactionHistoryExpanded, setIsTransactionHistoryExpanded] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [balance, setBalance] = useState('0.000000');
  const [depositSuccess, setDepositSuccess] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [depositError, setDepositError] = useState('');
  const [withdrawError, setWithdrawError] = useState('');
  const [isDepositErrorOpen, setIsDepositErrorOpen] = useState(false);
  const [isWithdrawErrorOpen, setIsWithdrawErrorOpen] = useState(false);

  const [savingsData, setSavingsData] = useState({
    interestAccrued: '--',
    goals: [
      { name: "Emergency Fund", target: 5000, current: 3000 },
      { name: "Vacation", target: 2000, current: 1500 },
    ],
    transactions: [
      { type: "Deposit", amount: 1000, date: "2023-05-15", from: "1234...5678", to: "9876...5432" },
      { type: "Interest", amount: 50, date: "2023-05-14", from: "System", to: "9876...5432" },
      { type: "Withdrawal", amount: 200, date: "2023-05-10", from: "9876...5432", to: "5678...1234" },
      { type: "Deposit", amount: 500, date: "2023-05-01", from: "1234...5678", to: "9876...5432" },
    ],
  });

  useEffect(() => {
    if (isSignedIn) {
      fetchBalance();
    }
  }, [isSignedIn]);

  const fetchBalance = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum as any);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, SavingContract, signer);

        const userAddress = await signer.getAddress();
        const balanceInWei = await contract.balances(userAddress);
        const balanceInEther = ethers.formatEther(balanceInWei);
        setBalance(parseFloat(balanceInEther).toFixed(6));
      } else {
        console.error("MetaMask is not installed");
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const handleDeposit = async () => {
    try {
      setIsDepositOpen(false);
      const amount = parseFloat(depositAmount);
      if (isNaN(amount) || amount <= 0) {
        setDepositError('Please enter a valid deposit amount.');
        setIsDepositErrorOpen(true);
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum as any);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, SavingContract, signer);

      const amountInWei = ethers.parseEther(depositAmount);
      const tx = await contract.deposit({ value: amountInWei });
      await tx.wait();

      setDepositAmount('');
      setDepositSuccess(true);
      setTimeout(() => setDepositSuccess(false), 3000);
      fetchBalance();
    } catch (error) {
      console.error("Deposit failed:", error);
      setDepositError('An error occurred while depositing. Please try again.');
      setIsDepositErrorOpen(true);
    }
  };

  const handleWithdraw = async () => {
    try {
      setIsWithdrawOpen(false);
      const amount = parseFloat(withdrawAmount);
      if (isNaN(amount) || amount <= 0) {
        setWithdrawError('Please enter a valid withdrawal amount.');
        setIsWithdrawErrorOpen(true);
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum as any);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, SavingContract, signer);

      const amountInWei = ethers.parseEther(withdrawAmount);
      const tx = await contract.withdraw(amountInWei);
      await tx.wait();

      setWithdrawAmount('');
      setWithdrawSuccess(true);
      setTimeout(() => setWithdrawSuccess(false), 3000);
      fetchBalance();
    } catch (error) {
      console.error("Withdrawal failed:", error);
      setWithdrawError('An error occurred while withdrawing. Please try again.');
      setIsWithdrawErrorOpen(true);
    }
  };

  const handleAddGoal = () => {
    if (newGoal.name && newGoal.target) {
      setSavingsData(prevData => ({
        ...prevData,
        goals: [...prevData.goals, { name: newGoal.name, target: parseFloat(newGoal.target), current: 0 }]
      }));
      setNewGoal({ name: '', target: '' });
      setIsAddGoalOpen(false);
    }
  };

  const toggleTransactionHistory = () => {
    setIsTransactionHistoryExpanded(!isTransactionHistoryExpanded);
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wallet className="mr-2" /> Current Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{balance} ETH</p>
                  <p className="text-lg text-muted-foreground">Interest Accrued: {savingsData.interestAccrued}</p>
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
                          Enter the amount you want to deposit and connect your web3 wallet to confirm the transaction.
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

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="mr-2" /> Savings Goals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {savingsData.goals.map((goal, index) => (
                    <div key={index} className="mb-4">
                      <p className="font-semibold">{goal.name}</p>
                      <Progress value={(goal.current / goal.target) * 100} className="mb-2" />
                      <p className="text-sm text-muted-foreground">
                        ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">Add New Goal</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add New Savings Goal</DialogTitle>
                        <DialogDescription>
                          Set a new savings goal to track your progress.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="goal-name" className="text-right">
                            Goal Name
                          </Label>
                          <Input
                            id="goal-name"
                            value={newGoal.name}
                            onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="goal-amount" className="text-right">
                            Target Amount
                          </Label>
                          <Input
                            id="goal-amount"
                            type="number"
                            value={newGoal.target}
                            onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleAddGoal}>Add Goal</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
                          <th className="py-2 px-4 text-center">Amount</th>
                          <th className="py-2 px-4 text-right">Date</th>
                          {isTransactionHistoryExpanded && (
                            <>
                              <th className="py-2 px-4 text-right">From</th>
                              <th className="py-2 px-4 text-right">To</th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {savingsData.transactions.slice(0, isTransactionHistoryExpanded ? undefined : 4).map((transaction, index) => (
                          <tr key={index} className="border-b last:border-b-0">
                            <td className="py-2 px-4">
                              <span className={`flex items-center ${
                                transaction.type === 'Withdrawal' ? 'text-red-500' : 
                                transaction.type === 'Interest' ? 'text-yellow-500' : 
                                'text-green-500'
                              }`}>
                                {transaction.type === 'Withdrawal' ? <ArrowDownLeft className="mr-2" /> : 
                                 transaction.type === 'Interest' ? <Zap className="mr-2" /> :
                                 <ArrowUpRight className="mr-2" />}
                                {transaction.type}
                              </span>
                            </td>
                            <td className="py-2 px-4 text-center">${transaction.amount}</td>
                            <td className="py-2 px-4 text-right">{transaction.date}</td>
                            {isTransactionHistoryExpanded && (
                              <>
                                <td className="py-2 px-4 text-right">{transaction.from}</td>
                                <td className="py-2 px-4 text-right">{transaction.to}</td>
                              </>
                            )}
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

            {/* Error Dialogs */}
            <Dialog open={isDepositErrorOpen} onOpenChange={setIsDepositErrorOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Error</DialogTitle>
                  <DialogDescription>{depositError}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button onClick={() => setIsDepositErrorOpen(false)}>Close</Button>
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
                words="Smart Savings for Your Future"
                className="text-5xl font-bold mb-6"
              />
              <p className="text-xl mb-8 text-muted-foreground">Maximize your savings with our innovative tools and high-yield accounts.</p>
              <SignInButton mode="modal">
                <Button size="lg">Sign In to Save</Button>
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
                      <CardTitle className="text-2xl font-bold text-center">Why Save with Us?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-none space-y-2 text-muted-foreground">
                        <li className="flex items-center"><Check className="h-5 w-5 text-primary mr-2" /> High-yield savings accounts</li>
                        <li className="flex items-center"><Check className="h-5 w-5 text-primary mr-2" /> Smart goal-based savings</li>
                        <li className="flex items-center"><Check className="h-5 w-5 text-primary mr-2" /> Automated savings plans</li>
                        <li className="flex items-center"><Check className="h-5 w-5 text-primary mr-2" /> Real-time tracking and insights</li>
                        <li className="flex items-center"><Check className="h-5 w-5 text-primary mr-2" /> Secure and transparent transactions</li>
                      </ul>
                    </CardContent>
                  </Card>
                </ShineBorder>
                <div className="w-full md:w-1/2">
                  <Image
                    src="/hsssjj.jpg"
                    alt="Save with BlockHolder"
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
                    Sign in now to access our full range of savings tools and start building your financial future with smart, goal-oriented savings strategies.
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