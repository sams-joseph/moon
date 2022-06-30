import Head from "next/head";
import Input from "@moon/common/Input";
import Layout from "@moon/common/Layout";

const Coins = () => {
  return (
    <div className="p-4 w-full sm:w-[600px] border-x border-slate-300 dark:border-slate-700 min-h-full">
      <Head>
        <title>Coins</title>
        <meta name="description" content="Crypto Coins" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-[30px] capitalize mb-8">Coins</h1>
      <Input name="search" placeholder="search" autoComplete="off" />
    </div>
  );
};

Coins.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Coins;
