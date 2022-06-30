import Layout from "@moon/common/Layout";
import Head from "next/head";

const Home = () => {
  return (
    <div className="p-4 w-full sm:w-[600px] border-x border-slate-300 dark:border-slate-700 min-h-full">
      <Head>
        <title>Watchlists</title>
        <meta name="description" content="Crypto Watchlists" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="py-4">
        <h1 className="text-xl font-thin capitalize">Welcome Back &#128075;</h1>
      </header>
      <h1 className="text-[30px] capitalize mb-8">Watchlists</h1>
    </div>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
