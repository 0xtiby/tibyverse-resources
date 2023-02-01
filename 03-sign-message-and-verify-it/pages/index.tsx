import { ConnectButton } from "@rainbow-me/rainbowkit";
import ConnectWallet from "../components/Authentication";
import Head from "next/head";
import Image from "next/image";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { useIsMounted } from "../hooks/useIsMounted";

const Home: NextPage = () => {
  const mounted = useIsMounted();
  const { isConnected } = useAccount();
  if (!mounted) return null;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center space-y-2">
        <ConnectButton />
        {isConnected && <ConnectWallet />}
      </main>
    </div>
  );
};

export default Home;
