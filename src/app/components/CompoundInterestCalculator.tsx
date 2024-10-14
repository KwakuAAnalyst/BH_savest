import React, { useState, useEffect } from 'react';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/app/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { MagicCard } from "@/app/components/ui/magic-card";

const contributionFrequencies = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'annually', label: 'Annually' },
];

const compoundFrequencies = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'annually', label: 'Annually' },
];

export function CompoundInterestCalculator() {
  const [initialDeposit, setInitialDeposit] = useState('5000');
  const [contributionAmount, setContributionAmount] = useState('100');
  const [contributionFrequency, setContributionFrequency] = useState('monthly');
  const [yearsOfGrowth, setYearsOfGrowth] = useState('5');
  const [estimatedReturn, setEstimatedReturn] = useState('0');
  const [compoundFrequency, setCompoundFrequency] = useState('monthly');
  const [totalBalance, setTotalBalance] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    calculateCompoundInterest();
  }, [initialDeposit, contributionAmount, contributionFrequency, yearsOfGrowth, estimatedReturn, compoundFrequency]);

  const calculateCompoundInterest = () => {
    const principal = parseFloat(initialDeposit);
    const monthlyContribution = parseFloat(contributionAmount) * (contributionFrequency === 'monthly' ? 1 : 1/12);
    const years = parseFloat(yearsOfGrowth);
    const rate = parseFloat(estimatedReturn) / 100;
    const compoundsPerYear = compoundFrequency === 'monthly' ? 12 : compoundFrequency === 'quarterly' ? 4 : 1;

    let balance = principal;
    const newChartData = [];

    for (let year = 0; year <= years; year++) {
      for (let month = 0; month < 12; month++) {
        balance *= (1 + rate / compoundsPerYear);
        if (month % (12 / compoundsPerYear) === 0) {
          balance += monthlyContribution * (12 / compoundsPerYear);
        }
      }
      newChartData.push({
        year,
        balance: balance,
        principal: principal + monthlyContribution * 12 * year
      });
    }

    setTotalBalance(balance);
    setChartData(newChartData);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-lg shadow-lg">
          <p className="text-white font-semibold">Year {label}</p>
          <p className="text-green-300">Total Balance: {formatCurrency(payload[0].value)}</p>
          <p className="text-purple-300">Principal: {formatCurrency(payload[1].value)}</p>
          <p className="text-blue-300">Interest: {formatCurrency(payload[0].value - payload[1].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <MagicCard 
      className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-8 overflow-y-auto max-h-[70vh]"
      gradientColor="rgba(255, 255, 255, 0.1)"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Investment details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-300">Initial deposit</label>
                  <Input
                    type="text"
                    value={initialDeposit}
                    onChange={(e) => setInitialDeposit(e.target.value)}
                    className="text-white bg-white/20 border-white/30"
                    prefix="$"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Contribution amount</label>
                  <Input
                    type="text"
                    value={contributionAmount}
                    onChange={(e) => setContributionAmount(e.target.value)}
                    className="text-white bg-white/20 border-white/30"
                    prefix="$"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-300">Contribution frequency</label>
                  <Select value={contributionFrequency} onValueChange={setContributionFrequency}>
                    <SelectTrigger className="w-full bg-white/20 border-white/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {contributionFrequencies.map((freq) => (
                        <SelectItem key={freq.value} value={freq.value}>
                          {freq.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-gray-300">Years of growth</label>
                  <Input
                    type="text"
                    value={yearsOfGrowth}
                    onChange={(e) => setYearsOfGrowth(e.target.value)}
                    className="text-white bg-white/20 border-white/30"
                    suffix="Years"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-300">Estimated rate of return</label>
                  <Input
                    type="text"
                    value={estimatedReturn}
                    onChange={(e) => setEstimatedReturn(e.target.value)}
                    className="text-white bg-white/20 border-white/30"
                    suffix="%"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Compound frequency</label>
                  <Select value={compoundFrequency} onValueChange={setCompoundFrequency}>
                    <SelectTrigger className="w-full bg-white/20 border-white/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {compoundFrequencies.map((freq) => (
                        <SelectItem key={freq.value} value={freq.value}>
                          {freq.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-6 bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white">Total Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-green-400">
                {formatCurrency(totalBalance)}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Growth Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={chartData} 
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="year" 
                      stroke="white"
                      label={{ value: 'Years', position: 'insideBottomRight', offset: -10, fill: 'white' }}
                    />
                    <YAxis 
                      stroke="white"
                      label={{ value: 'Balance ($)', angle: -90, position: 'insideLeft', fill: 'white' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="balance" 
                      name="Total Balance" 
                      stroke="#8B5CF6" 
                      strokeWidth={2} 
                      dot={false} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="principal" 
                      name="Principal" 
                      stroke="#34D399" 
                      strokeWidth={2} 
                      dot={false} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MagicCard>
  );
}
