import React from "react";
import { useAuthenticate } from "../hooks/useAuthenticate";

const AuthenticateButton = (): React.ReactElement => {
  const { authenticate, error, pending, success } = useAuthenticate();

  if (pending) {
    return <div>Authenticating...</div>;
  }
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (success) {
    return <div className="text-green-500">Authenticated!</div>;
  }

  return (
    <button className={classes.button} onClick={() => authenticate()}>
      Authenticate
    </button>
  );
};

export default AuthenticateButton;

const classes = /** class={ */ {
  button:
    "inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
}; /** } */
