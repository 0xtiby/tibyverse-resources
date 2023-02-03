import React, { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";

const Balances = (): React.ReactElement => {
  const { isConnected, address } = useAccount();
  const [magicBalance, setMagicBalance] = useState<string | undefined>(
    undefined
  );
  const { data: ethData, isLoading: ethIsLoading } = useBalance({
    address: address,
    enabled: isConnected,
  });

  const { data: magicData, isLoading: magicIsLoading } = useBalance({
    address: address,
    token: "0x539bdE0d7Dbd336b79148AA742883198BBF60342",
    chainId: 42161,
    enabled: isConnected,
  });

  useEffect(() => {
    if (isConnected) {
      fetch(`/api/getBalance?address=${address}`)
        .then((response) => response.json())
        .then((data) => setMagicBalance(data.balance));
    }
  }, [isConnected, address]);

  return (
    <div style={{ marginTop: 12 }}>
      <p>{` ETH Balance: ${
        ethIsLoading ? "Loading..." : ethData?.formatted
      }`}</p>
      <p>{` Magic Balance: ${
        magicIsLoading ? "Loading..." : magicData?.formatted
      }`}</p>
      <p>{` Magic Balance from server: ${
        magicBalance ? magicBalance : "Loading..."
      }`}</p>
    </div>
  );
};

export default Balances;
