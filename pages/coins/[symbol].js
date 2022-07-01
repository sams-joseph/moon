import { db } from "@moon/app/firebase";
import Alert from "@moon/common/Alert";
import Layout from "@moon/common/Layout";
import Spinner from "@moon/common/Spinner";
import Transactions from "@moon/features/Transactions";
import { doc } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDocumentData } from "react-firebase-hooks/firestore";

const Coin = () => {
  const router = useRouter();
  const { symbol } = router.query;
  const coinRef = doc(db, "coins", symbol);
  const [coin, loading, error] = useDocumentData(coinRef, {});

  return (
    <div className="px-4 py-8 w-full sm:w-[600px] border-x border-slate-300 dark:border-slate-700 min-h-full">
      <Head>
        <title>{symbol}</title>
        <meta name="description" content={`${symbol}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {error && <Alert message={error?.message} />}
      {loading ? (
        <div className="flex items-center justify-center p-10">
          <Spinner className="h-10 w-10" />
        </div>
      ) : (
        <Transactions coin={coin} />
      )}
    </div>
  );
};

Coin.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Coin;
