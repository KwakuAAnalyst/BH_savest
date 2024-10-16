'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { ChevronDown, ChevronUp, History, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { formatEther } from 'ethers';

// Define the Transaction type, including the new transactionType field
type Transaction = {
  hash: string;
  to: string; // The contract address the transaction interacted with
  input: string; // Input data, needed to detect function interactions
  timeStamp: string;
  value: string; // Value is in wei (string type)
  network: 'mainnet' | 'sepolia'; // Field to track the network
  transactionType: string; // Add this new field for transaction type
};

// Define contract addresses for the interactions
const CONTRACTS = {
  save: '0x035d1c84106b51c8094697e8d3b26c5df9937ad2',
  invest: '0xcfa367406ad0abb67411f7b72b86863f4949dc15',
  stake: '0x42a0bd840bc220e64bb4a1710bafb4e1340e3829'
};

// Define method signatures for deposit and withdraw functions
const METHOD_SIGNATURES = {
  deposit: '0xd0e30db0', // deposit method signature
  withdraw: '0x2e1a7d4d'  // withdraw method signature
};

// Define the TransactionHistory component props
type TransactionHistoryProps = {
  account: string; // Wallet address passed as prop
};

export default function TransactionHistory({ account }: TransactionHistoryProps) {
  const [isTransactionHistoryExpanded, setIsTransactionHistoryExpanded] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  // Function to determine the transaction type based on the contract address and method signature
  const getTransactionType = (to: string, input: string): string => {
    const methodSignature = input.slice(0, 10); // The first 4 bytes (8 chars) represent the method signature

    if (to.toLowerCase() === CONTRACTS.save) {
      if (methodSignature === METHOD_SIGNATURES.deposit) return 'Save (Deposit)';
      if (methodSignature === METHOD_SIGNATURES.withdraw) return 'Save (Withdraw)';
    }
    if (to.toLowerCase() === CONTRACTS.invest) {
      if (methodSignature === METHOD_SIGNATURES.deposit) return 'Invest (Deposit)';
      if (methodSignature === METHOD_SIGNATURES.withdraw) return 'Invest (Withdraw)';
    }
    if (to.toLowerCase() === CONTRACTS.stake) {
      if (methodSignature === METHOD_SIGNATURES.deposit) return 'Stake (Deposit)';
      if (methodSignature === METHOD_SIGNATURES.withdraw) return 'Stake (Withdraw)';
    }

    return 'Other';
  };

  // Function to fetch transactions from both Base Mainnet and Base Sepolia
  const fetchTransactions = async () => {
    if (!account) return;

    setLoading(true);
    try {
      // Query Base Mainnet and Base Sepolia APIs in parallel
      const [baseMainnetResponse, baseSepoliaResponse] = await Promise.all([
        axios.get(
          `https://api.basescan.org/api?module=account&action=txlist&address=${account}&startblock=0&endblock=99999999&sort=desc&apikey=${process.env.NEXT_PUBLIC_BASE_SCAN_API_KEY}`
        ),
        axios.get(
          `https://api-sepolia.basescan.org/api?module=account&action=txlist&address=${account}&startblock=0&endblock=99999999&sort=desc&apikey=${process.env.NEXT_PUBLIC_BASE_SCAN_API_KEY}`
        )
      ]);

      // Mark transactions with their respective networks and format amount from wei to ETH
      const mainnetTransactions = (baseMainnetResponse.data.result || []).map((tx: Transaction) => ({
        ...tx,
        network: 'mainnet',
        value: formatEther(tx.value), // Convert from wei to ETH
        transactionType: getTransactionType(tx.to, tx.input) // Get the transaction type
      }));
      const sepoliaTransactions = (baseSepoliaResponse.data.result || []).map((tx: Transaction) => ({
        ...tx,
        network: 'sepolia',
        value: formatEther(tx.value), // Convert from wei to ETH
        transactionType: getTransactionType(tx.to, tx.input) // Get the transaction type
      }));

      // Merge and sort transactions by timestamp (desc)
      const allTransactions = [...mainnetTransactions, ...sepoliaTransactions]
        .filter(tx => tx.transactionType !== 'Other') // Filter out "Other" transactions
        .sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp));

      setTransactions(allTransactions); // Store all transactions
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (account) {
      fetchTransactions();
    }
  }, [account]);

  const toggleTransactionHistory = () => {
    setIsTransactionHistoryExpanded(!isTransactionHistoryExpanded);
  };

  // Limit transactions to 5 initially and show 20 when expanded
  const displayedTransactions = isTransactionHistoryExpanded
    ? transactions.slice(0, 20) // Display only the last 20 transactions if expanded
    : transactions.slice(0, 5); // Display only the first 5 transactions if not expanded

  // Helper function to format the timestamp into separate date and time
  const formatDateTime = (timestamp: string) => {
    const dateObj = new Date(Number(timestamp) * 1000); // Convert timestamp from seconds to milliseconds
    const date = dateObj.toLocaleDateString(); // Extract date
    const time = dateObj.toLocaleTimeString(); // Extract time
    return { date, time };
  };

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center">
          <History className="mr-2" /> Transaction History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {loading ? (
            <p>Loading transactions...</p>
          ) : transactions.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">Transaction Type</th>
                  <th className="py-2 px-4 text-center">Amount (ETH)</th>
                  <th className="py-2 px-4 text-right">Date</th>
                  <th className="py-2 px-4 text-right">Time</th>
                </tr>
              </thead>
              <tbody>
                {displayedTransactions.map((tx, index) => {
                  const { date, time } = formatDateTime(tx.timeStamp); // Extract date and time
                  return (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-2 px-4 flex items-center">
                        {tx.transactionType.includes('Deposit') ? (
                          <ArrowUpRight className="text-green-500 mr-2" />
                        ) : tx.transactionType.includes('Withdraw') ? (
                          <ArrowDownLeft className="text-red-500 mr-2" />
                        ) : null}
                        {tx.transactionType}
                      </td>
                      <td className="py-2 px-4 text-center">{parseFloat(tx.value).toFixed(4)} ETH</td> {/* Display formatted ETH value */}
                      <td className="py-2 px-4 text-right">{date}</td> {/* Display the date */}
                      <td className="py-2 px-4 text-right">{time}</td> {/* Display the time */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>No transactions found</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {transactions.length > 5 && ( // Only show button if there are more than 5 transactions
          <Button variant="outline" className="w-full" onClick={toggleTransactionHistory}>
            {isTransactionHistoryExpanded ? (
              <>
                <ChevronUp className="mr-2 h-4 w-4" /> Show Less
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" /> View Full 20 Transactions
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
