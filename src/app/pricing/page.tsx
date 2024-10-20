'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import WordPullUp from "@/app/components/ui/word-pull-up";
import { MagicCard } from "@/app/components/ui/magic-card";
import { DotPattern } from "@/app/components/ui/dot-pattern";
import PricingSection from '@/app/components/PricingSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/components/ui/accordion";
import { Button } from "@/app/components/ui/button";
import AnimatedCircularProgressBar from "@/app/components/ui/animated-circular-progress-bar";
import { Input } from "@/app/components/ui/input";
import { CreditCard, Plus, Clock, DollarSign, Zap, Gift, Users, ChevronRight, Copy, Twitter, Facebook, Linkedin, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/app/components/ui/dialog";
import { Label } from "@/app/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";

export default function PricingPage() {
  const { isSignedIn, user } = useUser();
  const [promoCode, setPromoCode] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [isChangePlanModalOpen, setIsChangePlanModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [isNewPaymentMethodModalOpen, setIsNewPaymentMethodModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for our premium plans."
    },
    {
      question: "Can I upgrade or downgrade my plan at any time?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. The changes will be reflected in your next billing cycle."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, all user get our basic offers for free and we offer a 14-day free trial for our Premium plan. No credit card is required to start the trial."
    },
    {
      question: "What happens if I exceed my plan's limits?",
      answer: "If you exceed your plan's limits, we'll notify you and provide options to upgrade. We won't automatically charge you or cut off your service without warning."
    },
  ];

  const generateReferralLink = () => {
    if (user?.id) {
      setReferralLink(`https://blockholder.com/refer/${user.id}`);
    } else {
      console.error('User ID is not available');
      // You might want to show an error message to the user here
    }
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    // You might want to add a toast notification here to confirm the copy action
  };

  const shareToSocial = (platform: string) => {
    const shareText = "Join me on Blockholder - the ultimate app for managing your crypto portfolio and maximizing your earnings!";
    const shareUrl = encodeURIComponent(referralLink);
    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${shareUrl}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${encodeURIComponent(shareText)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}&summary=${encodeURIComponent(shareText)}`;
        break;
    }
    window.open(url, '_blank');
  };

  const billingHistory = [
    { date: 'Jul 1, 2023', plan: 'Premium', amount: '$3.00', status: 'Paid' },
    { date: 'Jun 1, 2023', plan: 'Premium', amount: '$3.00', status: 'Paid' },
    { date: 'May 1, 2023', plan: 'Basic', amount: 'Free', status: 'N/A' },
  ];

  const plans = [
    { name: 'Basic', price: 'Free', description: 'For individual users' },
    { name: 'Premium', price: 3, description: 'For growing businesses' },
    { name: 'Enterprise', price: 7, description: 'For large organizations' },
  ];

  const handleChangePlan = () => {
    // Here you would implement the logic to change the plan
    console.log(`Changing to ${selectedPlan} plan`);
    setIsChangePlanModalOpen(false);
  };

  const handleCancelSubscription = () => {
    // Implement the logic to cancel the subscription
    console.log('Cancelling subscription...');
    // You might want to show a confirmation dialog before actually cancelling
  };

  const handleAddNewPaymentMethod = () => {
    console.log(`Adding new payment method: ${selectedPaymentMethod}`);
    setIsNewPaymentMethodModalOpen(false);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-50">
      <DotPattern
        width={40}
        height={40}
        cx={1}
        cy={1}
        cr={1}
        className="absolute inset-0 z-0 opacity-5"
      />
      <div className="relative z-10">
        <Header />

        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <WordPullUp
              words={isSignedIn ? "Billing Dashboard" : "Pricing Plans"}
              className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 text-center"
            />
            <motion.p
              className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {isSignedIn
                ? `Manage your subscription and billing information, ${user?.firstName}.`
                : "Choose the perfect plan to supercharge your financial journey"}
            </motion.p>

            {isSignedIn ? (
              <>
                <motion.div 
                  className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <MagicCard className="p-6 bg-white shadow-lg rounded-lg border border-gray-200" gradientColor="rgba(124, 58, 237, 0.1)">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                      <Zap className="mr-2 text-purple-600" /> Current Plan
                    </h3>
                    <div className="text-gray-700">
                      <p className="text-2xl font-bold text-purple-600">Premium Plan</p>
                      <p className="text-sm text-gray-500">Next billing: July 1, 2023</p>
                    </div>
                    <Button className="mt-6 w-full bg-purple-600 text-white hover:bg-purple-700" onClick={() => setIsChangePlanModalOpen(true)}>Change Plan</Button>
                  </MagicCard>

                  <MagicCard className="p-6 bg-white shadow-lg rounded-lg border border-gray-200" gradientColor="rgba(124, 58, 237, 0.1)">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                      <CreditCard className="mr-2 text-purple-600" /> Payment Method
                    </h3>
                    <div className="flex items-center justify-between text-gray-700 mb-4">
                      <div className="flex items-center">
                        <CreditCard className="mr-2 text-gray-400" />
                        <span>•••• •••• •••• 1234</span>
                      </div>
                      <Button variant="outline" size="sm" className="text-purple-600 border-purple-600 hover:bg-purple-50">Edit</Button>
                    </div>
                    <Button 
                      className="w-full bg-purple-600 text-white hover:bg-purple-700"
                      onClick={() => setIsNewPaymentMethodModalOpen(true)}
                    >
                      <Plus className="mr-2 h-4 w-4" /> New Payment Method
                    </Button>
                  </MagicCard>

                  <MagicCard className="p-6 bg-white shadow-lg rounded-lg border border-gray-200" gradientColor="rgba(124, 58, 237, 0.1)">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                      <Clock className="mr-2 text-purple-600" /> Usage Limits
                    </h3>
                    <div className="flex justify-around items-center mt-6">
                      <div className="text-center">
                        <AnimatedCircularProgressBar
                          max={100}
                          value={75}
                          min={0}
                          gaugePrimaryColor="#8B5CF6"
                          gaugeSecondaryColor="#E5E7EB"
                          className="mb-2 w-24 h-24"
                        />
                        <p className="text-gray-700 font-medium">API Calls</p>
                      </div>
                      <div className="text-center">
                        <AnimatedCircularProgressBar
                          max={100}
                          value={50}
                          min={0}
                          gaugePrimaryColor="#8B5CF6"
                          gaugeSecondaryColor="#E5E7EB"
                          className="mb-2 w-24 h-24"
                        />
                        <p className="text-gray-700 font-medium">Storage</p>
                      </div>
                    </div>
                    <Button 
                      className="mt-6 w-full bg-purple-600 text-white hover:bg-purple-700"
                      onClick={() => setIsChangePlanModalOpen(true)}
                    >
                      Get Higher Limits
                    </Button>
                  </MagicCard>

                  <MagicCard className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 col-span-full" gradientColor="rgba(124, 58, 237, 0.1)">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-semibold text-gray-900 flex items-center">
                        <DollarSign className="mr-2 text-purple-600" /> Billing History
                      </h3>
                      <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50">
                        View All <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-gray-700">
                        <thead>
                          <tr className="text-left border-b border-gray-200">
                            <th className="pb-3 font-semibold text-gray-600">Date</th>
                            <th className="pb-3 font-semibold text-gray-600">Plan</th>
                            <th className="pb-3 font-semibold text-gray-600">Amount</th>
                            <th className="pb-3 font-semibold text-gray-600">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {billingHistory.map((item, index) => (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                              <td className="py-4">{item.date}</td>
                              <td className="py-4">
                                <span className="font-medium">{item.plan}</span>
                              </td>
                              <td className="py-4">{item.amount}</td>
                              <td className="py-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  item.status === 'Paid' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {item.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </MagicCard>

                  <MagicCard className="p-6 bg-white shadow-lg rounded-lg border border-gray-200" gradientColor="rgba(124, 58, 237, 0.1)">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                      <Gift className="mr-2 text-purple-600" /> Promotional Code
                    </h3>
                    <Input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="mb-4 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                    <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">Apply Code</Button>
                  </MagicCard>

                  <MagicCard className="p-6 bg-white shadow-lg rounded-lg border border-gray-200" gradientColor="rgba(124, 58, 237, 0.1)">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                      <Users className="mr-2 text-purple-600" /> Referral Program
                    </h3>
                    {referralLink ? (
                      <div>
                        <p className="mb-2 text-gray-700">Share Blockholder with your friends:</p>
                        <div className="flex mb-4">
                          <Input 
                            type="text" 
                            value={referralLink} 
                            readOnly 
                            className="flex-grow bg-gray-50 border-gray-300 rounded-r-none" 
                          />
                          <Button 
                            onClick={copyReferralLink} 
                            className="bg-purple-600 text-white hover:bg-purple-700 rounded-l-none"
                            title="Copy to clipboard"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="mb-2 text-gray-700">Or share directly on social media:</p>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => shareToSocial('twitter')}
                            className="bg-blue-400 hover:bg-blue-500 text-white"
                            title="Share on Twitter"
                          >
                            <Twitter className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => shareToSocial('facebook')}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            title="Share on Facebook"
                          >
                            <Facebook className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => shareToSocial('linkedin')}
                            className="bg-blue-700 hover:bg-blue-800 text-white"
                            title="Share on LinkedIn"
                          >
                            <Linkedin className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button className="w-full bg-purple-600 text-white hover:bg-purple-700" onClick={generateReferralLink}>
                        Generate Referral Link
                      </Button>
                    )}
                  </MagicCard>
                </motion.div>

                {/* Add this new section for the cancel subscription button */}
                <div className="mt-12 text-center">
                  <Button
                    variant="outline"
                    className="bg-white text-red-600 border-red-600 hover:bg-red-50"
                    onClick={handleCancelSubscription}
                  >
                    Cancel Subscription
                  </Button>
                </div>
              </>
            ) : (
              <>
                <PricingSection />
                
                <motion.div
                  className="max-w-4xl mx-auto px-4 py-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-3xl font-bold mb-8 text-center text-purple-900">Frequently Asked Questions</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`} className="border-purple-300">
                        <AccordionTrigger className="text-purple-800">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-purple-700">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              </>
            )}
          </div>
        </main>

        <Footer />
      </div>

      {isSignedIn && (
        <>
          <Dialog open={isChangePlanModalOpen} onOpenChange={setIsChangePlanModalOpen}>
            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-transparent border-none">
              <MagicCard className="w-full" gradientColor="rgba(124, 58, 237, 0.1)">
                <DialogHeader className="p-6 bg-purple-600 text-white">
                  <DialogTitle className="text-2xl font-bold">Change Your Plan</DialogTitle>
                  <DialogDescription className="text-purple-200">
                    Choose a new plan from the options below.
                  </DialogDescription>
                </DialogHeader>
                <div className="p-6 grid gap-6 md:grid-cols-3">
                  {plans.map((plan) => (
                    <div 
                      key={plan.name} 
                      className={`p-4 rounded-lg border ${
                        selectedPlan === plan.name 
                          ? 'border-purple-500 bg-purple-50' 
                          : 'border-gray-200 bg-white'
                      } cursor-pointer transition-all duration-200 hover:shadow-md`}
                      onClick={() => setSelectedPlan(plan.name)}
                    >
                      <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
                      <p className="text-2xl font-bold mb-2">
                        {plan.price === 'Free' ? 'Free' : `$${plan.price}/month`}
                      </p>
                      <p className="text-sm text-gray-600">{plan.description}</p>
                    </div>
                  ))}
                </div>
                <DialogFooter className="p-6 bg-gray-50">
                  <Button 
                    onClick={handleChangePlan} 
                    disabled={!selectedPlan}
                    className="w-full bg-purple-600 text-white hover:bg-purple-700"
                  >
                    Confirm Change
                  </Button>
                </DialogFooter>
              </MagicCard>
            </DialogContent>
          </Dialog>

          <Dialog open={isNewPaymentMethodModalOpen} onOpenChange={setIsNewPaymentMethodModalOpen}>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white border-none rounded-lg">
              <DialogHeader className="p-6 bg-purple-600 text-white">
                <DialogTitle className="text-2xl font-bold">Add New Payment Method</DialogTitle>
                <DialogDescription className="text-purple-200">
                  Securely add a new payment method to your account.
                </DialogDescription>
              </DialogHeader>
              <div className="p-6 space-y-6">
                <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod} className="grid grid-cols-2 gap-4">
                  <div>
                    <RadioGroupItem value="credit_card" id="credit_card" className="peer sr-only" />
                    <Label
                      htmlFor="credit_card"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 [&:has([data-state=checked])]:border-purple-600 cursor-pointer"
                    >
                      <CreditCard className="mb-3 h-6 w-6 text-purple-600" />
                      <span className="text-sm font-medium">Credit Card</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
                    <Label
                      htmlFor="paypal"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 [&:has([data-state=checked])]:border-purple-600 cursor-pointer"
                    >
                      <img src="/pp.png" alt="PayPal" className="mb-3 h-6 w-auto" />
                      <span className="text-sm font-medium">PayPal</span>
                    </Label>
                  </div>
                </RadioGroup>

                {selectedPaymentMethod === 'credit_card' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="card-number" className="text-sm font-medium text-gray-700">Card Number</Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" className="mt-1 w-full" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry" className="text-sm font-medium text-gray-700">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" className="mt-1 w-full" />
                      </div>
                      <div>
                        <Label htmlFor="cvc" className="text-sm font-medium text-gray-700">CVC</Label>
                        <Input id="cvc" placeholder="123" className="mt-1 w-full" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700">Cardholder Name</Label>
                      <Input id="name" placeholder="John Doe" className="mt-1 w-full" />
                    </div>
                  </div>
                )}

                {selectedPaymentMethod === 'paypal' && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-4">Click the button below to connect your PayPal account.</p>
                    <Button 
                      className="w-full bg-blue-500 text-white hover:bg-blue-600"
                      onClick={() => {
                        // Implement PayPal connection logic here
                        console.log('Connecting to PayPal...');
                      }}
                    >
                      Connect PayPal
                    </Button>
                  </div>
                )}
              </div>
              <DialogFooter className="p-6 bg-gray-50">
                <Button 
                  onClick={handleAddNewPaymentMethod} 
                  disabled={!selectedPaymentMethod}
                  className="w-full bg-purple-600 text-white hover:bg-purple-700"
                >
                  {selectedPaymentMethod === 'paypal' ? 'Continue with PayPal' : 'Add Card'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
