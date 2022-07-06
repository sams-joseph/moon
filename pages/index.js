import Layout from "@moon/common/Layout";
import Watchlists from "@moon/features/Watchlists";
import Head from "next/head";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <Head>
        <title>Watchlists</title>
        <meta name="description" content="Crypto Watchlists" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <header className="p-4">
          <h1 className="text-xl text-slate-500 dark:text-slate-400">
            Welcome, {user.displayName} &#128075;
          </h1>
        </header>
      )}
      <h1 className="text-[30px] capitalize p-4 mb-8">Watchlists</h1>
      <Watchlists />
    </div>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
