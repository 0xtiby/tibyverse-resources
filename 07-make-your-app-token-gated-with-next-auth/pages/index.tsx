import Head from "next/head";
import { Layout } from "../components/Layout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <h1 className="text-4xl font-bold pb-12">Welcome on the home</h1>
        <p>This page is not protected you can it when logged in or out</p>
      </Layout>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center"></main>
    </div>
  );
};

export default Home;
