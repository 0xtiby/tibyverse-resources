import React from "react";
import { useSession } from "next-auth/react";

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps): React.ReactElement => {
  const { data: session } = useSession();

  return (
    <>
      <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
        <div className="mb-2 sm:mb-0">
          <a
            href="/"
            className="text-2xl no-underline text-grey-darkest hover:text-blue-dark"
          >
            Siwe/Next-Auth
          </a>
        </div>
        <div className="space-x-4">
          {session ? (
            <a
              href="/account"
              className="text-lg no-underline text-grey-darkest hover:text-blue-dark"
            >
              My Account
            </a>
          ) : (
            <a
              href="/login"
              className="text-lg no-underline text-grey-darkest hover:text-blue-dark"
            >
              Login
            </a>
          )}

          <a
            href="/protected"
            className="text-lg no-underline text-grey-darkest hover:text-blue-dark"
          >
            Protected
          </a>
        </div>
      </nav>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        {children}
      </main>
    </>
  );
};
