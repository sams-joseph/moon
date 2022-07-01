import Layout from "@moon/common/Layout";
import { coinsSelectors } from "@moon/features/Coins/coinsSlice";
import { formatMoney } from "@moon/utils/formatMoney";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Coin = () => {
  const router = useRouter();
  const { symbol } = router.query;
  const coin = useSelector((state) => coinsSelectors.selectById(state, symbol));

  return (
    <div className="px-4 py-8 w-full sm:w-[600px] border-x border-slate-300 dark:border-slate-700 min-h-full">
      <Head>
        <title>{symbol}</title>
        <meta name="description" content={`${symbol}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-[30px] capitalize mb-8">{coin.name}</h1>
      <div className="bg-slate-800 dark:bg-slate-200 rounded-2xl p-2">
        <div className="p-4 flex justify-between">
          <h2 className="text-lg uppercase text-white dark:text-black">
            {symbol}
          </h2>
          <h2 className="text-lg uppercase text-white dark:text-black">
            {formatMoney(coin.quote.USD.price)}
          </h2>
        </div>
        <div className="bg-slate-100 dark:bg-slate-900 rounded-2xl p-4"></div>
      </div>
    </div>
  );
};

Coin.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Coin;
