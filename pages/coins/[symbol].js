import { db } from "@moon/app/firebase";
import { IncreaseIcon } from "@moon/common/Icons";
import Layout from "@moon/common/Layout";
import Spinner from "@moon/common/Spinner";
import { coinsSelectors } from "@moon/features/Coins/coinsSlice";
import Transactions from "@moon/features/Transactions";
import CreateModal from "@moon/features/Transactions/components/CreateModal";
import useFlashMessage from "@moon/hooks/useFlashMessage";
import { formatMoney } from "@moon/utils/formatMoney";
import { doc } from "firebase/firestore";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";

const Coin = () => {
  const router = useRouter();
  const { symbol } = router.query;
  const coinRef = doc(db, "coins", symbol);
  const [coin, loading, error] = useDocumentData(coinRef, {});
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const meta = useSelector((state) => coinsSelectors.selectById(state, symbol));

  useFlashMessage(error);

  if (!coin) return null;

  const percent = coin.quote.USD.percent_change_24h;
  const weekPercent = coin.quote.USD.percent_change_7d;
  const monthPercent = coin.quote.USD.percent_change_30d;

  return (
    <div>
      <Head>
        <title>{symbol}</title>
        <meta name="description" content={`${symbol}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? (
        <div className="flex items-center justify-center p-10">
          <Spinner className="h-10 w-10" />
        </div>
      ) : (
        <div>
          <header className="flex items-center justify-between mb-8 p-4">
            <h1 className="text-[30px] capitalize">{coin.name}</h1>
            {isAuthenticated && <CreateModal coin={coin} />}
          </header>
          <div className="p-4">
            <div className="bg-slate-800 dark:bg-slate-200 rounded-2xl p-2">
              <div className="py-4 px-2 flex justify-between">
                <div className="flex items-center">
                  <div className="relative h-12 w-12 sm:h-14 sm:w-14 mr-4">
                    <Image
                      src={meta.logo}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      alt="profile"
                    />
                  </div>
                  <div className="flex items-center">
                    <div className="mr-8">
                      <h4 className="text-xs bg-slate-300 dark:bg-slate-700 rounded inline-block px-2 py-1 mb-1">
                        {coin.symbol}
                      </h4>
                      <h2 className="text-white dark:text-slate-900">
                        {coin.name}
                      </h2>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg uppercase text-white dark:text-black text-right">
                    {formatMoney(coin.quote.USD.price)}
                  </h2>
                  <div
                    className={`${
                      percent > 0
                        ? "text-green-500"
                        : percent === 0
                        ? "text-black dark:text-white"
                        : "text-red-600"
                    } flex items-center justify-end`}
                  >
                    <IncreaseIcon value={percent} />
                    {Math.round(percent * 100) / 100}%
                  </div>
                </div>
              </div>
              <div className="bg-slate-100 dark:bg-slate-900 rounded-2xl p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 mb-8">
                  <div>
                    <h2 className="text-sm">7d %</h2>
                    <div
                      className={`${
                        weekPercent > 0
                          ? "text-green-500"
                          : weekPercent === 0
                          ? "text-black dark:text-white"
                          : "text-red-600"
                      } flex items-center`}
                    >
                      <IncreaseIcon value={weekPercent} />
                      {Math.round(weekPercent * 100) / 100}%
                    </div>
                  </div>
                  <div>
                    <h2 className="text-sm">30d %</h2>
                    <div
                      className={`${
                        monthPercent > 0
                          ? "text-green-500"
                          : percent === 0
                          ? "text-black dark:text-white"
                          : "text-red-600"
                      } flex items-center`}
                    >
                      <IncreaseIcon value={monthPercent} />
                      {Math.round(monthPercent * 100) / 100}%
                    </div>
                  </div>
                  <div>
                    <h2 className="text-sm">Market Cap</h2>
                    <div className="text-black dark:text-white flex items-center">
                      {formatMoney(coin.quote.USD.market_cap)}
                    </div>
                  </div>
                </div>
                <p>{meta.description}</p>
              </div>
            </div>
          </div>
          {isAuthenticated && <Transactions coin={coin} meta={meta} />}
        </div>
      )}
    </div>
  );
};

Coin.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Coin;
