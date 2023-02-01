import * as React from "react";

import { useAccount, useSignMessage } from "wagmi";

export function useAuthenticate() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [pending, setPending] = React.useState(false);

  const authenticate = async () => {
    try {
      setPending(true);
      setSuccess(null);
      setError(null);

      const signed = await signMessageAsync({
        message: `authenticate:${address}`,
      });

      const response = await fetch("/api/authenticate", {
        method: "POST",
        body: JSON.stringify({ signed, address }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      response.success
        ? setSuccess(`${address} authenticated`)
        : setError(`Invalid signature`);
      setPending(false);
    } catch (error: any) {
      setPending(false);
      setError(error.toString());
    }
  };

  return {
    success,
    pending,
    error,
    authenticate,
  };
}
