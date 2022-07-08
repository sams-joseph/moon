import { db } from "@moon/app/firebase";
import CoinPrice from "@moon/common/CoinPrice";
import Layout from "@moon/common/Layout";
import Spinner from "@moon/common/Spinner";
import AddCoinsModal from "@moon/features/Watchlists/components/AddCoinsModal";
import useFlashMessage from "@moon/hooks/useFlashMessage";
import { doc } from "firebase/firestore";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import coin from "@moon/assets/images/coin--icon.png";
import dayjs from "dayjs";

const Watchlist = () => {
  const router = useRouter();
  const { id } = router.query;
  const watchlistRef = doc(db, "watchlists", id);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [watchlist, loading, error] = useDocumentData(watchlistRef, {});

  useFlashMessage(error);

  return (
    <div>
      <Head>
        <title>{watchlist?.name}</title>
        <meta name="description" content={watchlist?.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? (
        <div className="flex items-center justify-center p-10">
          <Spinner className="h-10 w-10" />
        </div>
      ) : (
        <div className="py-8">
          <header className="p-4">
            <h1 className="text-[30px] capitalize">{watchlist.name}</h1>
            <p className="mb-6 text-slate-500">{`${
              watchlist.created_by.name
            } | ${dayjs(watchlist.created_at.toDate().toString()).format(
              "MMM DD YYYY"
            )}`}</p>
            <p>{watchlist.description}</p>
          </header>
          <div className="flex p-4 border-b border-slate-300 dark:border-slate-700 text-sm items-center justify-between">
            <div className="flex items-center">
              <div className="relative h-8 w-8 mr-4">
                <Image
                  src={coin}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  alt="profile"
                />
              </div>
              <h2 className="text-lg">Coins</h2>
            </div>
            <div className="flex items-center">
              {isAuthenticated && user.uid === watchlist.created_by.uid && (
                <AddCoinsModal currentCoins={watchlist.coins} id={id} />
              )}
            </div>
          </div>
          <ul>
            {watchlist.coins.map((coin) => (
              <CoinPrice
                key={coin.symbol}
                symbol={coin.symbol}
                name={coin.name}
                logo={null}
                price={coin.quote.USD.price}
                percent={coin.quote.USD.percent_change_24h}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

Watchlist.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Watchlist;
