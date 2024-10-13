'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Progress } from "@/app/components/ui/progress";
import { Dialog, DialogDescription, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useUser, SignInButton } from '@clerk/nextjs';
import { Zap, ArrowUpRight, ArrowDownLeft, Wallet, Target, History, ChevronDown, ChevronUp } from 'lucide-react';
import { ethers } from 'ethers';
import SavingContract from "@/app/abi/SavingContract.json";

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
  const [balance, setBalance] = useState('0.000000'); // Initialize with 6 decimal places
  const [depositSuccess, setDepositSuccess] = useState(false); // Deposit success flag
  const [withdrawSuccess, setWithdrawSuccess] = useState(false); // Withdraw success flag
  const [savingsData, setSavingsData] = useState({
    interestAccrued: '--', // Set interest accrued to --
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

  // Fetch balance from the contract for the signed-in user
  const fetchBalance = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum as any);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, SavingContract, signer);

        const userAddress = await signer.getAddress(); // Get the user address
        const balanceInWei = await contract.balances(userAddress); // Fetch balance from the mapping
        const balanceInEther = ethers.formatEther(balanceInWei); // Convert from Wei to Ether
        setBalance(parseFloat(balanceInEther).toFixed(6)); // Display balance with 6 decimal places
      } else {
        console.error("MetaMask is not installed");
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchBalance(); // Fetch the balance when the user is signed in
    }
  }, [isSignedIn]);

  const handleDeposit = async () => {
    const amount = parseFloat(depositAmount);
    if (!isNaN(amount) && amount > 0) {
      try {
        setIsDepositOpen(false); // Close the deposit modal immediately
        const provider = new ethers.BrowserProvider(window.ethereum as any);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, SavingContract, signer);

        const amountInWei = ethers.parseEther(depositAmount); // Convert to Wei
        const tx = await contract.deposit({ value: amountInWei });
        await tx.wait(); // Wait for the transaction to be mined

        setDepositAmount('');
        setDepositSuccess(true); // Set deposit success flag
        setTimeout(() => setDepositSuccess(false), 3000); // Clear success message after 3 seconds
        fetchBalance(); // Update balance after deposit
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
        setIsWithdrawOpen(false); // Close the withdraw modal immediately
        const provider = new ethers.BrowserProvider(window.ethereum as any);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, SavingContract, signer);

        const amountInWei = ethers.parseEther(withdrawAmount); // Convert to Wei
        const tx = await contract.withdraw(amountInWei);
        await tx.wait(); // Wait for the transaction to be mined

        setWithdrawAmount('');
        setWithdrawSuccess(true); // Set withdraw success flag
        setTimeout(() => setWithdrawSuccess(false), 3000); // Clear success message after 3 seconds
        fetchBalance(); // Update balance after withdrawal
      } catch (error) {
        console.error("Withdrawal failed:", error);
      }
    } else {
      alert("Please enter a valid withdrawal amount.");
    }
  };

  const handleAddGoal = () => {
    if (newGoal.name && newGoal.target) {
      setSavingsData(prevData => ({
        ...prevData,
        goals: [...prevData.goals, { name: newGoal.name, target: parseFloat(newGoal.target), current: 0 }]
      }));
      setNewGoal({ name: '', target: '' });
      setIsAddGoalOpen(false); // Close the "Add New Goal" modal
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

              {/* Savings Goals Section */}
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

              {/* Transaction History Section */}
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
          <div>
            <motion.section 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl font-bold mb-6">Smart Savings for Your Future</h1>
              <p className="text-xl mb-8 text-muted-foreground">Maximize your savings with our innovative tools and high-yield accounts.</p>
              <SignInButton mode="modal">
                <Button size="lg">Sign In to Save</Button>
              </SignInButton>
            </motion.section>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
