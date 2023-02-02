import { useAccount, useEnsName } from "wagmi";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";

import { Button } from "./Button";
import React from "react";
import { useIsMounted } from "@/hooks/isMounted";

const ConnectWallet = (): React.ReactElement | null => {
  const isMounted = useIsMounted();
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();

  if (!isMounted) {
    return null;
  }

  const formattedAdr = address
    ? `${address.substring(0, 4)}…${address.substring(
        address.length - 4,
        address.length
      )}`
    : "";

  if (isConnected) {
    return (
      <Button
        label={ensName ? `${ensName.substring(0, 16)}…` : `${formattedAdr}`}
        onClick={openAccountModal}
      />
    );
  }

  return <Button label="Connect Wallet" onClick={openConnectModal} />;
};

export default ConnectWallet;
