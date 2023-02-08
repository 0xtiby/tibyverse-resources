import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import { Layout } from "../components/Layout";
import type { NextPage } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Login: NextPage = () => {
  const { push } = useRouter();
  const { data } = useSession();

  useEffect(() => {
    if (data) {
      push("/");
    }
  }, [data]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <h1 className="text-4xl font-bold pb-12">Login page</h1>
        <ConnectButton />
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
