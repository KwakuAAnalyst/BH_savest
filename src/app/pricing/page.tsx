'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Progress } from "@/app/components/ui/progress";
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useUser, SignInButton } from '@clerk/nextjs';
import { CreditCard, Calendar, AlertCircle, Download, Gift, Users, Check, Copy, Share2, Twitter, Facebook, Linkedin } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Label } from "@/app/components/ui/label";

const planData = [
  {
    name: 'Basic',
    description: 'Perfect for users looking to dip their toes into savings and investments with simple tools and automation.',
    features: [
      'Core Savings & Investment Tools',
      'Automated Savings',
      'Goal Tracking (up to 3 goals)',
      'Basic Analytics',
      'Basic Support (24-48 hour response time)',
      'Mobile Access'
    ]
  },
  {
    name: 'Pro',
    description: 'Ideal for users who are ready to make more informed financial decisions and actively grow their wealth through advanced tools and insights.',
    features: [
      'Advanced Investment Options',
      'Automated Portfolio Rebalancing',
      'Staking & Passive Income',
      'Custom Savings Goals',
      'In-Depth Analytics & Reports',
      'Priority Support',
      'Exclusive Webinars & Tutorials'
    ]
  },
  {
    name: 'Enterprise',
    description: 'Designed for high-net-worth individuals or businesses looking for comprehensive financial management solutions.',
    features: [
      'Full Investment Suite',
      'Dedicated Financial Advisor',
      'Custom Portfolio Strategies',
      'Enhanced Staking & Yield Farming',
      'Team Management (Business Accounts)',
      'Enterprise-Level Analytics',
      'White-Glove Support',
      'Custom Integrations & API Access'
    ]
  }
];

const faqData = [
  {
    question: "What's the difference between saving and investing?",
    answer: "Saving typically involves putting money aside in a low-risk account for short-term goals or emergencies. Investing means putting money into assets like stocks or bonds with the aim of growing wealth over a longer period, but it comes with more risk."
  },
  {
    question: "How much should I save each month?",
    answer: "A common rule of thumb is to save 20% of your income, but this can vary based on your financial goals and situation. Start with what you can afford and gradually increase your savings rate."
  },
  {
    question: "What's the best way to start investing with little money?",
    answer: "You can start with low-cost index funds or ETFs, which offer diversification at a low entry point. Many platforms also offer fractional shares, allowing you to invest in expensive stocks with small amounts."
  },
  {
    question: "How do I create a diversified investment portfolio?",
    answer: "A diversified portfolio typically includes a mix of stocks, bonds, and other assets across various sectors and geographical regions. The exact mix depends on your risk tolerance and investment goals."
  },
  {
    question: "What are the tax implications of saving and investing?",
    answer: "Interest from savings accounts is typically taxable as income. For investments, you may owe capital gains tax on profits. However, certain accounts like 401(k)s or IRAs offer tax advantages for retirement savings."
  },
  {
    question: "How often should I review my investments?",
    answer: "It's good to review your investments at least annually or when there are significant life changes. However, avoid making frequent changes based on short-term market fluctuations."
  },
  {
    question: "What's the difference between active and passive investing?",
    answer: "Active investing involves trying to beat the market through frequent trading and in-depth analysis. Passive investing aims to match market performance, typically through index funds, and usually involves less frequent trading and lower fees."
  }
];

export default function PricingPage() {
  const { isSignedIn, user } = useUser();
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState('credit_card');

  const referralLink = `https://blockholder.com/?ref=${user?.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    let shareUrl = '';
    const message = 'Check out BlockHolder - the ultimate platform for managing your crypto assets!';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(message)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(referralLink)}&title=${encodeURIComponent(message)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  // Mock data for the billing dashboard
  const billingData = {
    currentPlan: "Pro",
    billingCycle: "Monthly",
    nextBillingDate: "2023-06-15",
    cost: 29.99,
    status: "Active",
    features: [
      "Advanced Investment Options",
      "Automated Portfolio Rebalancing",
      "Staking & Passive Income",
      "Unlimited Custom Savings Goals",
      "In-Depth Analytics & Reports",
      "Priority Support",
    ],
    usageLimits: {
      transactions: { used: 150, limit: 500 },
      portfolios: { used: 3, limit: 10 },
    },
    paymentMethods: [
      { type: "Credit Card", last4: "1234", expiry: "12/24" },
    ],
    transactions: [
      { date: "2023-05-15", amount: 29.99, method: "Credit Card (*1234)" },
      { date: "2023-04-15", amount: 29.99, method: "Credit Card (*1234)" },
    ],
    referrals: { count: 3, earnings: 45 },
  };

  const handleAddPaymentMethod = () => {
    // Here you would typically integrate with a payment processor
    // For now, we'll just close the modal
    setIsAddPaymentOpen(false);
    // You might want to update the billingData state here to reflect the new payment method
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        {isSignedIn ? (
          <div>
            <h1 className="text-4xl font-bold mb-6 text-center">Your Billing Dashboard</h1>
            <p className="text-xl mb-8 text-center">Manage your subscription and billing information, {user.firstName}.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="mr-2" /> Current Plan Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{billingData.currentPlan} Plan</p>
                  <p>Billing Cycle: {billingData.billingCycle}</p>
                  <p>Next Billing Date: {billingData.nextBillingDate}</p>
                  <p>Cost: ${billingData.cost} per {billingData.billingCycle.toLowerCase()}</p>
                  <p className="text-green-500">Status: {billingData.status}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Upgrade Plan</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="mr-2" /> Usage Limits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {Object.entries(billingData.usageLimits).map(([key, value]) => (
                    <div key={key} className="mb-4">
                      <p className="font-semibold capitalize">{key}</p>
                      <Progress value={(value.used / value.limit) * 100} className="mt-2" />
                      <p className="text-sm text-right mt-1">
                        {value.used} / {value.limit} used
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2" /> Billing History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {billingData.transactions.map((transaction, index) => (
                    <div key={index} className="flex justify-between items-center mb-2">
                      <span>{transaction.date}</span>
                      <span>${transaction.amount}</span>
                      <span>{transaction.method}</span>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Transactions</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="mr-2" /> Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {billingData.paymentMethods.map((method, index) => (
                    <div key={index} className="flex justify-between items-center mb-2">
                      <span>{method.type} ending in {method.last4}</span>
                      <span>Expires {method.expiry}</span>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Dialog open={isAddPaymentOpen} onOpenChange={setIsAddPaymentOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full">Add Payment Method</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add New Payment Method</DialogTitle>
                        <DialogDescription>
                          Choose a new payment method to add to your account.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <RadioGroup value={newPaymentMethod} onValueChange={setNewPaymentMethod}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="credit_card" id="credit_card" />
                            <Label htmlFor="credit_card">Credit Card</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="paypal" id="paypal" />
                            <Label htmlFor="paypal">PayPal</Label>
                          </div>
                        </RadioGroup>
                        {newPaymentMethod === 'credit_card' && (
                          <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="Card Number" />
                            <Input placeholder="MM/YY" />
                            <Input placeholder="CVC" />
                            <Input placeholder="Cardholder Name" />
                          </div>
                        )}
                        {newPaymentMethod === 'paypal' && (
                          <Button onClick={() => window.open('https://www.paypal.com', '_blank')}>
                            Connect PayPal Account
                          </Button>
                        )}
                      </div>
                      <DialogFooter>
                        <Button onClick={handleAddPaymentMethod}>Add Payment Method</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Gift className="mr-2" /> Promotional Discounts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Enter a promo code to apply a discount to your next bill.</p>
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    className="w-full px-3 py-2 border rounded mt-2"
                  />
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Apply Promo Code</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2" /> Referral Program
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Users Referred: {billingData.referrals.count}</p>
                  <p>Earnings: ${billingData.referrals.earnings}</p>
                </CardContent>
                <CardFooter>
                  <Dialog open={isReferralModalOpen} onOpenChange={setIsReferralModalOpen}>
                    <DialogTrigger asChild>
                      <Button>Share Referral Link</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Share Your Referral Link</DialogTitle>
                        <DialogDescription>
                          Copy your unique referral link or share it directly on social media.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="flex items-center gap-2">
                          <Input value={referralLink} readOnly />
                          <Button onClick={handleCopyLink} size="icon">
                            {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                        <div className="flex justify-center gap-4">
                          <Button onClick={() => handleShare('twitter')} variant="outline" className="flex items-center gap-2">
                            <Twitter className="h-4 w-4" />
                            Twitter
                          </Button>
                          <Button onClick={() => handleShare('facebook')} variant="outline" className="flex items-center gap-2">
                            <Facebook className="h-4 w-4" />
                            Facebook
                          </Button>
                          <Button onClick={() => handleShare('linkedin')} variant="outline" className="flex items-center gap-2">
                            <Linkedin className="h-4 w-4" />
                            LinkedIn
                          </Button>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={() => setIsReferralModalOpen(false)}>Close</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" className="mr-4">Cancel Subscription</Button>
              <Button variant="outline">Pause Subscription</Button>
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
              <h1 className="text-5xl font-bold mb-6">Choose the Right Plan for You</h1>
              <p className="text-xl mb-8 text-muted-foreground">Unlock premium features and take control of your financial future.</p>
              <SignInButton mode="modal">
                <Button size="lg">
                  Sign In to View Plans
                </Button>
              </SignInButton>
            </motion.section>

            <motion.section 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {planData.map((plan, index) => (
                  <Card key={plan.name} className="flex flex-col">
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <Check className="h-5 w-5 text-primary mr-2" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Choose {plan.name}</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </motion.section>

            <motion.section 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-xl">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}