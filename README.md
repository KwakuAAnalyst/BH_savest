<div align="center">
  <img src="https://github.com/eben619/Celo_Africa_Dao-Ghana_University_Tour/blob/main/celo_isotype.svg" alt="BlockHolder" width="150px">
</div>

# BlockHolder Save

BlockHolder Save is a savings and investment tracking application that leverages blockchain technology to offer users secure and optimized investment strategies. The project integrates both Web2 and Web3 technologies, providing seamless user experiences through wallets, transactions, and real-time data updates.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Investment Tracking**: Track your savings, investment and staking portfolios easily.
- **Automated Recommendations**: Receive recommendations on how to optimize your savings.
- **Secure**: Ensures your financial data is secure through modern encryption standards.
- **Real-Time Data**: Provides real-time updates on investments and savings performance which are stored on-chain.

## Technologies

This project was built using the following technologies:
- **Next.js** - Frontend framework for building user interfaces.
- **OnchainKit** - Components for connecting and managing smart wallets or external wallets, including address, balance, and user identity handling.
- **Ethers.js** - Ethereum wallet and blockchain interaction library.
- **Tailwind CSS** - Utility-first CSS framework for styling.
- **Clerk** - For authentication and real-time database functionalities.
  
**Contract Addresses** 
- BlockHolderCoin contract address= 0x672aac1fee4241d2e186cbc3c740c3634214d833
- Staking Contract address= 0x42a0bd840bc220e64bb4a1710bafb4e1340e3829
- Investment Contract Address= 0xcfa367406ad0abb67411f7b72b86863f4949dc15
- Saving Contract Address= 0x035d1c84106b51c8094697e8d3b26c5df9937ad2

## Setup Instructions

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/KwakuAAnalyst/BH_savest.git
   cd BH_savest
   ```

2. **Install dependencies:**
   Ensure you have `node.js` and `yarn` installed.
   ```bash
   yarn install
   ```

3. **Create environment variables:**
   Create a `.env.local` file in the root directory with the following variables:
   
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= ""
CLERK_SECRET_KEY=""
NEXT_PUBLIC_BASE_SCAN_API_KEY=""
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=""
```

4. **Run the application:**

   ```
   yarn run dev
   ```
or
   ```
   yarn start
   ```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

Once you have the project running locally, you can:

- **Sign up** Connect your wallet or using your email.
- **Track savings**: Add and monitor your savings over time.
- **Invest**: Use the app to make investment decisions based on the recommendations provided.
- **Real-Time Data**: View real-time updates on your savings and investments performance.

## Folder Structure

```plaintext
BH_savest/
│
├── src/
│   ├── app/                 # Main application logic
│   ├── components/          # Reusable components
│   ├── pages/               # Pages and routing
│   ├── services/            # External service integrations
│   └── utils/               # Utility functions
├── public/                  # Static assets
├── .env.local                     # Environment variables file
├── package.json             # Node.js package file
├── yarn.lock                # Yarn lock file
└── README.md                # Project documentation

```

- **src/app**: Main application logic.
- **src/config**: Contains wagmi.tsx file for the connection config.
- **src/lib**: Contains utils.ts.
- **src/providers**: Contains OnchainProviders connection.
- **src/utils**: Utility functions for various tasks.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
