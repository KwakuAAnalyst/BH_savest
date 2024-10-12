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
import { ArrowUpRight, ArrowDownLeft, Wallet, Target, History, Zap, ChevronDown, ChevronUp, Check } from 'lucide-react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";


export default function SavePage() {
  const { isSignedIn, user } = useUser();
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({ name: '', target: '' });
  const [depositAmount, setDepositAmount] = useState('');
  const [isTransactionHistoryExpanded, setIsTransactionHistoryExpanded] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isHighYieldModalOpen, setIsHighYieldModalOpen] = useState(false);
  const [isRoundUpModalOpen, setIsRoundUpModalOpen] = useState(false);
  const [isGoalBasedModalOpen, setIsGoalBasedModalOpen] = useState(false);

  // Mock data for the dashboard
  const [savingsData, setSavingsData] = useState({
    balance: 10000,
    interestAccrued: 250,
    goals: [
      { name: "Emergency Fund", target: 5000, current: 3000 },
      { name: "Vacation", target: 2000, current: 1500 },
    ],
    transactions: [
      { type: "Deposit", amount: 1000, date: "2023-05-15", from: "1234...5678", to: "9876...5432" },
      { type: "Interest", amount: 50, date: "2023-05-14", from: "System", to: "9876...5432" },
      { type: "Withdrawal", amount: 200, date: "2023-05-10", from: "9876...5432", to: "5678...1234" },
      { type: "Deposit", amount: 500, date: "2023-05-01", from: "1234...5678", to: "9876...5432" },
      { type: "Deposit", amount: 750, date: "2023-04-20", from: "2345...6789", to: "9876...5432" },
      { type: "Withdrawal", amount: 100, date: "2023-04-15", from: "9876...5432", to: "3456...7890" },
      { type: "Interest", amount: 45, date: "2023-04-14", from: "System", to: "9876...5432" },
      { type: "Deposit", amount: 1200, date: "2023-04-01", from: "1234...5678", to: "9876...5432" },
    ],
  });

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

  const handleDeposit = () => {
    // This is where you would typically integrate with a web3 wallet
    // For now, we'll just update the balance and add a transaction
    const amount = parseFloat(depositAmount);
    if (!isNaN(amount) && amount > 0) {
      setSavingsData(prevData => ({
        ...prevData,
        balance: prevData.balance + amount,
        transactions: [
          { type: "Deposit", amount: amount, date: new Date().toISOString().split('T')[0], from: "Web3 Wallet", to: "9876...5432" },
          ...prevData.transactions
        ]
      }));
      setDepositAmount('');
      setIsDepositOpen(false);
    }
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (!isNaN(amount) && amount > 0 && amount <= savingsData.balance) {
      setSavingsData(prevData => ({
        ...prevData,
        balance: prevData.balance - amount,
        transactions: [
          { type: "Withdrawal", amount: amount, date: new Date().toISOString().split('T')[0], from: "9876...5432", to: "Web3 Wallet" },
          ...prevData.transactions
        ]
      }));
      setWithdrawAmount('');
      setIsWithdrawOpen(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        {isSignedIn ? (
          <div>
            <h1 className="text-4xl font-bold mb-6 text-center">Your Savings Dashboard</h1>
            <p className="text-xl mb-8 text-center">Welcome to your personalized savings dashboard, {user.firstName}.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wallet className="mr-2" /> Current Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">${savingsData.balance.toLocaleString()}</p>
                  <p className="text-lg text-muted-foreground">Interest Accrued: ${savingsData.interestAccrued}</p>
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
                        <Button onClick={handleDeposit}>Connect Wallet & Deposit</Button>
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
          </div>
        ) : (
          <>
            <motion.section 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl font-bold mb-6">Smart Savings for Your Future</h1>
              <p className="text-xl mb-8 text-muted-foreground">Maximize your savings with our innovative tools and high-yield accounts.</p>
              <SignInButton mode="modal">
                <Button size="lg">
                  Sign In to Save
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
                    <CardTitle className="text-2xl font-bold text-center">Why Save with Us?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-none space-y-2 text-muted-foreground">
                      <li className="flex items-center"><Check className="h-5 w-5 text-primary mr-2" /> High-yield savings accounts</li>
                      <li className="flex items-center"><Check className="h-5 w-5 text-primary mr-2" /> Automated savings tools</li>
                      <li className="flex items-center"><Check className="h-5 w-5 text-primary mr-2" /> Goal-based savings plans</li>
                      <li className="flex items-center"><Check className="h-5 w-5 text-primary mr-2" /> Real-time tracking and insights</li>
                      <li className="flex items-center"><Check className="h-5 w-5 text-primary mr-2" /> Secure and FDIC-insured</li>
                    </ul>
                  </CardContent>
                </Card>
                <div className="w-full md:w-1/2">
                  <Image
                    src="/piggy.jpg"
                    alt="Save with BlockHolder"
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
              <h2 className="text-3xl font-bold mb-8 text-center">Saving Options</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {['High-Yield Savings', 'Round-Up Savings', 'Goal-Based Savings'].map((option) => (
                  <Card key={option}>
                    <CardHeader>
                      <CardTitle>{option}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        Discover how our {option.toLowerCase()} can help you reach your financial goals faster and more efficiently.
                      </CardDescription>
                    </CardContent>
                    <CardFooter>
                      {option === 'High-Yield Savings' ? (
                        <Dialog open={isHighYieldModalOpen} onOpenChange={setIsHighYieldModalOpen}>
                          <DialogTrigger asChild>
                            <Button className="w-full">Learn More</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>High-Yield Savings</DialogTitle>
                              <DialogDescription>
                                Maximize your returns with our High-Yield Savings option, designed for those who want to grow their savings while minimizing risk. Our decentralized finance (DeFi) platform offers competitive interest rates that far surpass traditional banking options, allowing you to earn passive income effortlessly.
                                
                                <h3 className="font-semibold mt-4 mb-2">Key Benefits:</h3>
                                <ul className="list-disc pl-5">
                                  <li>Higher Interest Rates: Earn significantly more than traditional savings accounts.</li>
                                  <li>Decentralized & Secure: Your funds are safely stored in smart contracts, fully transparent and secured on the blockchain.</li>
                                  <li>Flexible Deposits & Withdrawals: No lock-in periods; deposit or withdraw your funds anytime.</li>
                                  <li>Stablecoins Supported: Save in trusted stablecoins like USDC, DAI, and more to avoid market volatility.</li>
                                </ul>
                                
                                <p className="mt-4">Start saving today and let your money work for you with our High-Yield Savings plan.</p>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      ) : option === 'Round-Up Savings' ? (
                        <Dialog open={isRoundUpModalOpen} onOpenChange={setIsRoundUpModalOpen}>
                          <DialogTrigger asChild>
                            <Button className="w-full">Learn More</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Round-Up Savings</DialogTitle>
                              <DialogDescription>
                                Turn everyday spending into effortless savings with our Round-Up Savings feature. Every time you make a purchase, we round up the transaction to the nearest dollar and automatically deposit the spare change into your savings account. It's an easy and automatic way to build your savings over time without any extra effort.
                                
                                <h3 className="font-semibold mt-4 mb-2">Key Benefits:</h3>
                                <ul className="list-disc pl-5">
                                  <li>Effortless Savings: Save a little every time you spend without even thinking about it.</li>
                                  <li>Automatic Deposits: Spare change from everyday purchases is rounded up and saved for you.</li>
                                  <li>Flexible & Customizable: Adjust your round-up settings to match your financial goals.</li>
                                  <li>Compounding Growth: Watch your small savings add up and grow over time through our high-yield options.</li>
                                </ul>
                                
                                <p className="mt-4">Start small, save big! With Round-Up Savings, your daily purchases can turn into long-term financial growth.</p>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <Dialog open={isGoalBasedModalOpen} onOpenChange={setIsGoalBasedModalOpen}>
                          <DialogTrigger asChild>
                            <Button className="w-full">Learn More</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Goal-Based Savings</DialogTitle>
                              <DialogDescription>
                                Achieve your financial dreams with Goal-Based Savings. This feature allows you to set specific savings goals—whether it's for a vacation, a new car, or an emergency fund—and track your progress effortlessly. Our platform helps you stay disciplined and motivated by providing clear milestones and automated savings plans tailored to your goals.

                                <h3 className="font-semibold mt-4 mb-2">Key Benefits:</h3>
                                <ul className="list-disc pl-5">
                                  <li>Personalized Goals: Set and customize savings goals for anything you want to achieve.</li>
                                  <li>Automated Savings Plans: Automatically allocate funds towards your goals based on your preferences.</li>
                                  <li>Progress Tracking: Stay on top of your savings with real-time tracking and milestone updates.</li>
                                  <li>Flexible Contributions: Adjust your savings amounts and timelines as your priorities change.</li>
                                </ul>

                                <p className="mt-4">Start reaching your financial goals faster with our Goal-Based Savings feature, and turn your aspirations into reality.</p>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      )}
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
                  <CardTitle className="text-center">Start Your Saving Journey</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Sign in now to access our full range of saving tools and start building your financial future.
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <SignInButton mode="modal">
                    <Button size="lg">
                      Sign In
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