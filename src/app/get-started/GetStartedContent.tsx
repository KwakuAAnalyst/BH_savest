'use client';

import React from 'react';
import { useUser, SignInButton } from "@clerk/nextjs";
import { RainbowButton } from '../components/ui/rainbow-button';

const GetStartedContent: React.FC = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="flex justify-center">
      {isSignedIn ? (
        <RainbowButton>
          Try for Free
        </RainbowButton>
      ) : (
        <SignInButton mode="modal">
          <RainbowButton>
            Try for Free
          </RainbowButton>
        </SignInButton>
      )}
    </div>
  );
};

export default GetStartedContent;
