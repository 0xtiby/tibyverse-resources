import { useAccount, useBalance, useNetwork } from "wagmi";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import type { NextPage } from "next";
import { withChainControl } from "../hoc/withChainControl";

const Home: NextPage = () => {
  const { isConnected, address } = useAccount();
  const { data, isFetching } = useBalance({ address });
  const { chain } = useNetwork();

  if (!isConnected) {
    return <ConnectButton />;
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1>{`Welcome ${address}! `}</h1>
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2>{`You have ${data?.formatted} ${data?.symbol} on ${chain?.name}`}</h2>
            <p>{`${data?.value && data.value.toNumber() > 0 ? "😃" : "🥲"}`}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default withChainControl(Home);
