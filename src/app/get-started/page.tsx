import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/GetStarted.module.css';

const GetStartedPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>Get Started:<br></br> Welcome to BlockHolder</h1>
        
        <section className={styles.introSection}>
          <p>
            Welcome to the future of saving and investing! BlockHolder is designed to empower you with complete control over your finances. Whether you're new to decentralized finance (DeFi) or a seasoned investor, this guide will walk you through how to get started quickly and efficiently. Follow the steps below to embark on your journey toward financial freedom and growth.
          </p>
        </section>

        <section className={styles.stepSection}>
          <h2>Step 1: Sign up or Connect Your Wallet</h2>
          <p>
            To transact using BlockHolder, you'll need a digital wallet. A wallet is your gateway to accessing decentralized applications and managing your funds securely. Choose one of the following options:
          </p><br></br>
          <ul>
            <li>New User? Create a Wallet: Choose from popular wallet providers like Coinbase Wallet, MetaMask, Trust Wallet, or any Web3-compatible wallet of your choice.</li> <br></br>
            <li>Existing User? Connect Your Wallet: Click on "Connect Wallet" and select your preferred wallet. Ensure that it is funded with the base currency (e.g., ETH, BNB, etc.) to cover transaction fees.</li>
          </ul>
          <p className={styles.tip}>
            Tip: Always double-check that you're connecting to the official BlockHolder URL to avoid phishing scams.
          </p>
        </section>

        <section className={styles.stepSection}>
          <h2>Step 2: Deposit Funds</h2>
          <p>
            Once your wallet is connected, deposit funds into the platform to start saving and investing. BlockHolder supports multiple cryptocurrencies and stablecoins to provide you with a flexible and diverse portfolio.
          </p><br></br>
          <ul>
            <li>- Navigate to the Deposit section.</li>
            <li>- Choose the asset you want to deposit (e.g., USDC, DAI, ETH).</li>
            <li>- Specify the amount and confirm the transaction.</li>
          </ul><br></br>
          <p>
            Your funds will be stored securely in the BlockHolder's smart contract, where you can track, grow, or withdraw them at any time.
          </p>
        </section>

        <section className={styles.stepSection}>
          <h2>Step 3: Choose a Saving or Investment Plan</h2>
          <p>
            We offer a variety of saving and investment options tailored to your financial goals:
          </p><br></br>
          <ul>
            <li>High-Yield Savings: Earn competitive interest on your deposits with our DeFi savings accounts. Ideal for conservative investors who want steady returns.</li><br></br>
            <li>Auto-Rebalancing Portfolio: Automatically diversify your investments into a balanced mix of assets. Perfect for users seeking risk management with optimal growth.</li><br></br>
            <li>Staking and Yield Farming: Maximize your returns by participating in staking and yield farming opportunities. Best for experienced DeFi users.</li>
          </ul>
          <p className={styles.note}>
            Note: Each plan has its own risk profile and expected return rate. Take your time to evaluate the options before proceeding.
          </p>
        </section>

        <section className={styles.stepSection}>
          <h2>Step 4: Monitor and Manage Your Portfolio</h2>
          <p>
            Once you've chosen a plan, you can monitor the performance of your savings and investments through your dashboard. The platform provides real-time data and insights, such as:
          </p><br></br>
          <ul>
            <li>- Current Balance</li>
            <li>- Accrued Interest</li>
            <li>- Projected Returns</li>
            <li>- Allocation Details</li>
          </ul><br></br>
          <p>
            Make adjustments anytime to align your investments with your changing financial goals.
          </p>
        </section>

        <section className={styles.stepSection}>
          <h2>Step 5: Withdraw or Reinvest Your Earnings</h2>
          <p>
            You're always in control! When you're ready, you can choose to withdraw your funds or reinvest your earnings for compounding growth.
          </p><br></br>
          <ul>
            <li>Withdraw: Navigate to the Withdraw section, select the asset, and confirm the transaction.</li><br></br>
            <li>Reinvest: Reinvest your earnings with a single click to boost your returns through the power of compounding.</li>
          </ul>
          <p className={styles.important}>
            Important: Depending on the selected plan, certain withdrawal restrictions or notice periods may apply.
          </p>
        </section>

        <section className={styles.ctaSection}>
          <h2>Get Started Today!</h2>
          <p>
            BlockHolder is built to offer transparency, security, and the best DeFi opportunities—all at your fingertips. By using our app, you're participating in a global movement toward decentralized finance and building a brighter financial future for yourself.
          </p>
          <p>
            Still have questions? Check out our FAQs section or reach out to our community on Discord.
          </p><br></br>
          <p>
            Take the first step today. Start saving and investing smarter with BlockHolder!
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GetStartedPage;
