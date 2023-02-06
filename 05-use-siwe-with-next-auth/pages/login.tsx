import { getCsrfToken, getSession, signIn } from "next-auth/react";
import { useAccount, useDisconnect, useNetwork, useSignMessage } from "wagmi";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import { Layout } from "../components/Layout";
import type { NextPage } from "next";
import { SiweMessage } from "siwe";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { useState } from "react";

const Login: NextPage = () => {
  const { signMessageAsync } = useSignMessage();
  const { disconnectAsync } = useDisconnect();

  const { chain } = useNetwork();
  const { query, push } = useRouter();
  const [error, setError] = useState<string | undefined>(
    query.error as string | undefined
  );
  useAccount({
    onConnect({ address }) {
      setError(undefined);
      if (address) {
        login(address, chain?.id);
      }
    },
  });

  const login = async (
    address: string | undefined,
    chainId: number | undefined
  ) => {
    try {
      const csrf = await getCsrfToken();
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: chainId,
        nonce: csrf,
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      const res = await signIn("credentials", {
        message: JSON.stringify(message),
        redirect: false,
        signature,
        callbackUrl: window.location.origin,
      });

      if (res?.error) {
        console.log(res.error);
        setError("Unable to login. Please try again.");
        await disconnectAsync();
      }

      if (res?.url) {
        console.log(res.url);
        push(res.url);
      }
    } catch (error: any) {
      setError(error.toString());
      await disconnectAsync();
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <h1 className="text-4xl font-bold pb-12">Login page</h1>
        <ConnectButton />
        {error && <p className="text-red-500 mt-12">{error}</p>}
      </Layout>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center"></main>
    </div>
  );
};

export default Login;

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
