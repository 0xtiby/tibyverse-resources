import Link from "next/link";
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
          <Link
            href="/"
            className="text-2xl no-underline text-grey-darkest hover:text-blue-dark"
          >
            Siwe/Next-Auth
          </Link>
        </div>
        <div className="space-x-4">
          {session ? (
            <Link
              href="/account"
              className="text-lg no-underline text-grey-darkest hover:text-blue-dark"
            >
              My Account
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-lg no-underline text-grey-darkest hover:text-blue-dark"
            >
              Login
            </Link>
          )}

          <Link
            href="/protected"
            className="text-lg no-underline text-grey-darkest hover:text-blue-dark"
          >
            Protected
          </Link>
        </div>
      </nav>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        {children}
      </main>
    </>
  );
};
