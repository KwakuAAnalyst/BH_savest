import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { GridPattern } from '../components/ui/animated-grid-pattern';
import { MagicCard } from '../components/ui/magic-card';
import TypingAnimation from '../components/ui/typing-animation';
import { NeonGradientCard } from '../components/ui/neon-gradient-card';
import GetStartedContent from './GetStartedContent';

const GetStartedPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-background">
      <GridPattern
        width={40}
        height={40}
        className="absolute inset-0 z-0 opacity-20 dark:opacity-10"
        strokeDasharray={2}
        maxOpacity={0.3}
        duration={6}
      />
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <TypingAnimation
            text="Get Started: Welcome to BlockHolder"
            className="text-4xl font-bold mb-8 text-center"
            duration={50}
          />
          
          <section className="mb-8">
            <p className="text-lg">
              Welcome to the future of saving and investing! BlockHolder is designed to empower you with complete control over your finances. Whether you're new to decentralized finance (DeFi) or a seasoned investor, this guide will walk you through how to get started quickly and efficiently. Follow the steps below to embark on your journey toward financial freedom and growth.
            </p>
          </section>

          {[1, 2, 3, 4, 5].map((step) => (
            <MagicCard 
              key={step}
              className="mb-8 p-6 bg-gradient-to-br from-purple-900 to-indigo-900 text-white"
              gradientColor="rgba(255, 255, 255, 0.1)"
            >
              <h2 className="text-2xl font-semibold mb-4">Step {step}: {getStepTitle(step)}</h2>
              {getStepContent(step)}
            </MagicCard>
          ))}

          <NeonGradientCard 
            className="mb-8"
            neonColors={{
              firstColor: "#4F46E5",
              secondColor: "#9333EA"
            }}
            borderSize={3}
            borderRadius={16}
          >
            <div className="p-6 bg-transparent rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                Get Started Today!
              </h2>
              <p className="mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                BlockHolder is built to offer transparency, security, and the best DeFi opportunities—all at your fingertips. By using our app, you're participating in a global movement toward decentralized finance and building a brighter financial future for yourself.
              </p>
              <p className="mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Still have questions? Check out our FAQs section or reach out to our community on Discord.
              </p>
              <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 mb-6">
                Take the first step today. Start saving and investing smarter with BlockHolder!
              </p>
              <GetStartedContent />
            </div>
          </NeonGradientCard>
        </main>
        <Footer />
      </div>
    </div>
  );
};

function getStepTitle(step: number): string {
  switch (step) {
    case 1: return "Sign up or Connect Your Wallet";
    case 2: return "Deposit Funds";
    case 3: return "Choose a Saving or Investment Plan";
    case 4: return "Monitor and Manage Your Portfolio";
    case 5: return "Withdraw or Reinvest Your Earnings";
    default: return "";
  }
}

function getStepContent(step: number): React.ReactNode {
  switch (step) {
    case 1:
      return (
        <>
          <p className="mb-4">
            To transact using BlockHolder, you'll need a digital wallet. A wallet is your gateway to accessing decentralized applications and managing your funds securely. Choose one of the following options:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">New User? Create a Wallet: Choose from popular wallet providers like Coinbase Wallet, MetaMask, Trust Wallet, or any Web3-compatible wallet of your choice.</li>
            <li>Existing User? Connect Your Wallet: Click on "Connect Wallet" and select your preferred wallet. Ensure that it is funded with the base currency (e.g., ETH, BNB, etc.) to cover transaction fees.</li>
          </ul>
          <p className="text-sm italic">
            Tip: Always double-check that you're connecting to the official BlockHolder URL to avoid phishing scams.
          </p>
        </>
      );
    case 2:
      return (
        <>
          <p className="mb-4">
            Once your wallet is connected, deposit funds into the platform to start saving and investing. BlockHolder supports multiple cryptocurrencies and stablecoins to provide you with a flexible and diverse portfolio.
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Navigate to the Deposit section.</li>
            <li className="mb-2">Choose the asset you want to deposit (e.g., USDC, DAI, ETH).</li>
            <li className="mb-2">Specify the amount and confirm the transaction.</li>
          </ul>
          <p className="mb-4">
            Your funds will be stored securely in the BlockHolder's smart contract, where you can track, grow, or withdraw them at any time.
          </p>
        </>
      );
    case 3:
      return (
        <>
          <p className="mb-4">
            We offer a variety of saving and investment options tailored to your financial goals:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">High-Yield Savings: Earn competitive interest on your deposits with our DeFi savings accounts. Ideal for conservative investors who want steady returns.</li>
            <li className="mb-2">Auto-Rebalancing Portfolio: Automatically diversify your investments into a balanced mix of assets. Perfect for users seeking risk management with optimal growth.</li>
            <li className="mb-2">Staking and Yield Farming: Maximize your returns by participating in staking and yield farming opportunities. Best for experienced DeFi users.</li>
          </ul>
          <p className="text-sm italic">
            Note: Each plan has its own risk profile and expected return rate. Take your time to evaluate the options before proceeding.
          </p>
        </>
      );
    case 4:
      return (
        <>
          <p className="mb-4">
            Once you've chosen a plan, you can monitor the performance of your savings and investments through your dashboard. The platform provides real-time data and insights, such as:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Current Balance</li>
            <li className="mb-2">Accrued Interest</li>
            <li className="mb-2">Projected Returns</li>
            <li className="mb-2">Allocation Details</li>
          </ul>
          <p className="mb-4">
            Make adjustments anytime to align your investments with your changing financial goals.
          </p>
        </>
      );
    case 5:
      return (
        <>
          <p className="mb-4">
            You're always in control! When you're ready, you can choose to withdraw your funds or reinvest your earnings for compounding growth.
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Withdraw: Navigate to the Withdraw section, select the asset, and confirm the transaction.</li>
            <li className="mb-2">Reinvest: Reinvest your earnings with a single click to boost your returns through the power of compounding.</li>
          </ul>
          <p className="text-sm italic">
            Important: Depending on the selected plan, certain withdrawal restrictions or notice periods may apply.
          </p>
        </>
      );
    default:
      return null;
  }
}

export default GetStartedPage;
