import React, { useState, useEffect } from 'react';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/app/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { MagicCard } from "@/app/components/ui/magic-card";

const topTokens = [
  { value: 'BTC', label: 'Bitcoin (BTC)' },
  { value: 'ETH', label: 'Ethereum (ETH)' },
  { value: 'SOL', label: 'Solana (SOL)' },
  { value: 'BASE', label: 'Base (BASE)' },
  { value: 'BNB', label: 'Binance Coin (BNB)' },
  { value: 'ADA', label: 'Cardano (ADA)' },
  { value: 'XRP', label: 'XRP (XRP)' },
  { value: 'DOT', label: 'Polkadot (DOT)' },
  { value: 'AVAX', label: 'Avalanche (AVAX)' },
  { value: 'MATIC', label: 'Polygon (MATIC)' },
];

const stakingDurations = [
  { value: 4, label: '4 weeks' },
  { value: 8, label: '8 weeks' },
  { value: 13, label: '13 weeks' },
  { value: 26, label: '26 weeks' },
  { value: 52, label: '52 weeks' },
];

export function StakingRewardCalculator() {
  const [protocol, setProtocol] = useState('ETH');
  const [amount, setAmount] = useState('3200');
  const [duration, setDuration] = useState(26);
  const [price, setPrice] = useState('2627.97');
  const [rewardRate, setRewardRate] = useState('3.56');
  const [rewardsEarned, setRewardsEarned] = useState({ usd: 0, tokens: 0 });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    calculateRewards();
  }, [protocol, amount, duration, price, rewardRate]);

  const calculateRewards = () => {
    const amountNum = parseFloat(amount);
    const priceNum = parseFloat(price);
    const rewardRateNum = parseFloat(rewardRate);
    const weeklyReward = (amountNum * rewardRateNum / 100) / 52;
    const totalRewardTokens = weeklyReward * duration;
    const totalRewardUSD = totalRewardTokens * priceNum;

    setRewardsEarned({
      usd: totalRewardUSD,
      tokens: totalRewardTokens
    });

    const newChartData = [];
    for (let i = 0; i <= duration; i++) {
      newChartData.push({
        week: i,
        balance: amountNum * priceNum + (weeklyReward * i * priceNum),
        reward: weeklyReward * i * priceNum
      });
    }
    setChartData(newChartData);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-lg shadow-lg">
          <p className="text-white font-semibold">Week {label}</p>
          <p className="text-green-300">Total Balance: ${payload[0].value.toFixed(2)}</p>
          <p className="text-purple-300">Rewards: ${payload[1].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  const formatYAxis = (value) => {
    return `${(value / 1000).toFixed(0)}K`;
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
              <CardTitle className="text-white">Enter Protocol</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={protocol} onValueChange={setProtocol}>
                <SelectTrigger className="w-full bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="Select a protocol" />
                </SelectTrigger>
                <SelectContent>
                  {topTokens.map((token) => (
                    <SelectItem key={token.value} value={token.value}>
                      {token.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="mt-4 bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Amount of Tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-white bg-white/20 border-white/30 pr-16"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white">
                  {protocol}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4 bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Staking Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={duration.toString()} onValueChange={(value) => setDuration(Number(value))}>
                <SelectTrigger className="w-full bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {stakingDurations.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="mt-4 bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="text-white bg-white/20 border-white/30 pr-16"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white">
                  USD
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4 bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Staking Rewards Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Input
                  type="text"
                  value={rewardRate}
                  onChange={(e) => setRewardRate(e.target.value)}
                  className="text-white bg-white/20 border-white/30 pr-8"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white">
                  %
                </span>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white">
            SAVE AND ADD ANOTHER PROTOCOL
          </Button>
        </div>

        <div>
          <Card className="mb-6 bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white">Rewards Earned</CardTitle>
              <p className="text-sm text-gray-300">Estimated earnings over {duration} weeks</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-300">In USD</p>
                  <p className="text-3xl font-bold text-green-400">
                    ${rewardsEarned.usd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-300">In {protocol}</p>
                  <p className="text-2xl font-semibold text-purple-300">
                    {rewardsEarned.tokens.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })} {protocol}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Rewards Over Time</CardTitle>
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
                      dataKey="week" 
                      stroke="white"
                      label={{ value: 'Weeks', position: 'insideBottomRight', offset: -10, fill: 'white' }}
                    />
                    <YAxis 
                      stroke="white"
                      label={{ value: 'USD', angle: -90, position: 'insideLeft', fill: 'white' }}
                      tickFormatter={formatYAxis}
                      domain={[0, 'dataMax + 100000']}
                      ticks={[0, 100000, 200000, 300000, 400000, 500000]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine 
                      y={parseFloat(amount) * parseFloat(price)} 
                      stroke="red" 
                      strokeDasharray="3 3" 
                      label={{ value: 'Initial Investment', fill: 'white', position: 'insideTopLeft' }} 
                    />
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
                      dataKey="reward" 
                      name="Rewards" 
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
