import { db } from "@moon/app/firebase";
import Alert from "@moon/common/Alert";
import { IncreaseIcon } from "@moon/common/Icons";
import Layout from "@moon/common/Layout";
import Spinner from "@moon/common/Spinner";
import { coinsSelectors } from "@moon/features/Coins/coinsSlice";
import Transactions from "@moon/features/Transactions";
import CreateModal from "@moon/features/Transactions/components/CreateModal";
import { formatMoney } from "@moon/utils/formatMoney";
import { doc } from "firebase/firestore";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useDispatch, useSelector } from "react-redux";

const Watchlist = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;

  return (
    <div>
      <Head>
        <title>{"test"}</title>
        <meta name="description" content={`${"test"}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      test {id}
    </div>
  );
};

Watchlist.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Watchlist;
