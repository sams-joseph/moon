import { db } from "@moon/app/firebase";
import Alert from "@moon/common/Alert";
import Layout from "@moon/common/Layout";
import Spinner from "@moon/common/Spinner";
import { clearFlash, showFlash } from "@moon/features/Flash/flashSlice";
import Transactions from "@moon/features/Transactions";
import { doc } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useDispatch } from "react-redux";

const Coin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { symbol } = router.query;
  const coinRef = doc(db, "coins", symbol);
  const metaRef = doc(db, "coin_metas", symbol);
  const [coin, loading, error] = useDocumentData(coinRef, {});
  const [meta, loadingMeta, errorMeta] = useDocumentData(metaRef, {});

  useEffect(() => {
    if (error || errorMeta) {
      const mess = error.message ? error.message : errorMeta.message;
      dispatch(showFlash({ message: mess, type: "error" }));
    }

    return () => {
      dispatch(clearFlash());
    };
  }, [error, errorMeta, dispatch]);

  return (
    <div>
      <Head>
        <title>{symbol}</title>
        <meta name="description" content={`${symbol}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading || loadingMeta ? (
        <div className="flex items-center justify-center p-10">
          <Spinner className="h-10 w-10" />
        </div>
      ) : (
        <Transactions coin={coin} meta={meta} />
      )}
    </div>
  );
};

Coin.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Coin;
