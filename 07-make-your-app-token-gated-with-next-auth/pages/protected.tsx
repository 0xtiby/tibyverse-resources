import Head from "next/head";
import Image from "next/image";
import { Layout } from "../components/Layout";
import type { NextPage } from "next";

const Protected: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <h1 className="text-4xl font-bold pb-12">Protected</h1>
        <p>This page is protected you can access it only when logged in</p>
      </Layout>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center"></main>
    </div>
  );
};

export default Protected;
