'use client';
import { OnchainKitProvider } from '@coinbase/onchainkit'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { base } from 'wagmi/chains'; 
import { type ReactNode, useState } from 'react';
import { type State, WagmiProvider } from 'wagmi';
 
import { getConfig } from '@/config/wagmi';
 
export function OnchainkitProviders(props: {
  children: ReactNode;
}) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());
 
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={base}
        >
          {props.children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}