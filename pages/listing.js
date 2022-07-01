import Head from "next/head";
import Input from "@moon/common/Input";
import Layout from "@moon/common/Layout";
import Coins from "@moon/features/Coins";

const Listing = () => {
  return (
    <div className="w-full sm:w-[600px] border-x border-slate-300 dark:border-slate-700 min-h-full">
      <Head>
        <title>Coins</title>
        <meta name="description" content="Crypto Coins" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Coins />
    </div>
  );
};

Listing.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Listing;
