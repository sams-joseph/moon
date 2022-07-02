import Layout from "@moon/common/Layout";
import Head from "next/head";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="p-4">
      <Head>
        <title>Watchlists</title>
        <meta name="description" content="Crypto Watchlists" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <header className="py-4">
          <h1 className="text-xl text-slate-500 dark:text-slate-400">
            Welcome, {user.displayName} &#128075;
          </h1>
        </header>
      )}
      <h1 className="text-[30px] capitalize mb-8">Watchlists</h1>
    </div>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
