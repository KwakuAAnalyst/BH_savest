
# BH Savest

BH Savest is a project focused on helping users save and invest money in a simplified and efficient way. This repository contains the source code for the application, along with instructions on how to set it up and use its features.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Investment Tracking**: Track your savings and investment portfolios easily.
- **Automated Recommendations**: Receive recommendations on how to optimize your savings.
- **Secure**: Ensures your financial data is secure through modern encryption standards.
- **Real-Time Data**: Provides real-time updates on investments and savings performance.

## Technologies

This project was built using the following technologies:
- **React.js** - Frontend framework for building user interfaces.
- **Node.js** - Backend environment for executing JavaScript code server-side.
- **Ethers.js** - Ethereum wallet and blockchain interaction library.
- **Tailwind CSS** - Utility-first CSS framework for styling.
- **Firebase** - For authentication and real-time database functionalities.

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
   Create a `.env` file in the root directory with the following variables:
   ```bash
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. **Run the application:**
   ```bash
   yarn start
   ```

## Usage

Once you have the project running locally, you can:

- **Sign up** using your email or other authentication methods (Firebase).
- **Track savings**: Add and monitor your savings over time.
- **Invest**: Use the app to make investment decisions based on the recommendations provided.
- **Real-Time Data**: View real-time updates on your savings and investments performance.

## Folder Structure

```plaintext
BH_savest/
│
├── src/
│   ├── app/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── utils/
├── public/
├── .env
├── package.json
├── yarn.lock
└── README.md
```

- **src/app**: Main application logic.
- **src/components**: Reusable components used throughout the application.
- **src/pages**: Pages or routes within the application.
- **src/services**: External services and API calls.
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

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
