import { signIn, signOut } from "next-auth/react";
import { useAccount, useDisconnect } from "wagmi";

import Head from "next/head";
import { Layout } from "../components/Layout";
import type { NextPage } from "next";
import { loadavg } from "os";
import { useEffect } from "react";
import { useIsMounted } from "../hooks/useIsMounted";
import { useSession } from "next-auth/react";

const Account: NextPage = () => {
  const mounted = useIsMounted();
  const { data: session } = useSession();
  const { address } = useAccount();
  const { disconnectAsync } = useDisconnect();

  const logOut = async () => {
    await disconnectAsync();
  };

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold pb-12">My Account</h1>
          <p>
            Signed in as <b>{session?.user?.name}</b> <br />
            Wallet account <b>{address}</b>
          </p>

          <button
            onClick={logOut}
            type="button"
            className="inline-flex items-center rounded border border-transparent bg-red-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Log out
          </button>
        </div>
      </Layout>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center"></main>
    </div>
  );
};

export default Account;
