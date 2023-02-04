import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

const Layout = ({
  children,
}: {
  children?: React.ReactNode;
}): React.ReactElement => (
  <>
    <nav className="bg-blue-400 text-white flex justify-between items-center py-4 px-12">
      <p className="text-2xl font-bold">MyArbApp</p>
      <ConnectButton />
    </nav>
    <main className="flex flex-col items-center justify-center flex-1 px-12 text-center space-y-2 pt-12">
      {children}
    </main>
  </>
);

export default Layout;
