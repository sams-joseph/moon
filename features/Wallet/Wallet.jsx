import React, { useEffect, useMemo } from "react";
import { db } from "@moon/app/firebase";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useDispatch, useSelector } from "react-redux";
import { clearFlash, showFlash } from "@moon/features/Flash/flashSlice";
import Spinner from "@moon/common/Spinner";
import { formatMoney } from "@moon/utils/formatMoney";
import { coinsSelectors } from "../Coins/coinsSlice";
import Image from "next/image";
import flameIcon from "@moon/assets/images/flame--icon.png";

const ListItem = ({ item }) => {
  const meta = useSelector((state) =>
    coinsSelectors.selectById(state, item.name)
  );

  return (
    <div className="flex flex-col justify-center pb-4 last:pb-0 border-b border-slate-300 dark:border-slate-600 last:border-none mb-4">
      <div className="flex-1 mb-2 flex items-center">
        <div className="relative h-6 w-6 rounded-full overflow-hidden mr-4">
          <Image
            src={meta.logo}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt={item.name}
          />
        </div>
        <h2 className="text-lg capitalize">{item.name}</h2>
      </div>
      <div className="flex-1 flex items-center justify-between">
        <p className="text-sm">Coins</p>
        <p className="text-sm">{item.total}</p>
      </div>
      <div className="flex-1 flex items-center justify-between">
        <p className="text-sm">Average Price</p>
        <p className="text-sm">{formatMoney(item.balance / item.total)}</p>
      </div>
      <div className="flex-1 flex items-center justify-between">
        <p className="text-sm">Total</p>
        <p className="text-sm">{formatMoney(item.balance)}</p>
      </div>
    </div>
  );
};

const Wallet = ({ user }) => {
  const dispatch = useDispatch();
  const walletRef = doc(db, "wallets", user.uid);
  const [wallet, loading, error] = useDocumentData(walletRef, {});

  useEffect(() => {
    if (error) {
      dispatch(showFlash({ message: error.message, type: "error" }));
    }

    return () => {
      dispatch(clearFlash());
    };
  }, [error, dispatch]);

  const summary = useMemo(() => {
    if (!wallet) return [];
    return Object.keys(wallet).map((key) => {
      const item = wallet[key];
      return { ...item, name: key };
    });
  }, [wallet]);

  return (
    <>
      <header className="pt-8 pb-4 px-4 flex items-center">
        <div className="relative h-8 w-8 rounded-full overflow-hidden mr-4">
          <Image
            src={flameIcon}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt="trending"
          />
        </div>
        <h1 className="text-xl capitalize">Summary</h1>
      </header>
      <div className="flex-1 p-4">
        {loading ? (
          <div className="flex items-center justify-center p-10">
            <Spinner className="h-10 w-10" />
          </div>
        ) : (
          <div className="p-4 rounded-lg bg-slate-200 dark:bg-slate-800">
            {summary.map((item) => (
              <ListItem key={item.name} item={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

Wallet.propTypes = {};

export default Wallet;
