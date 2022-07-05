import React, { useEffect } from "react";
import CreateModal from "./components/CreateModal";
import { formatMoney } from "@moon/utils/formatMoney";
import Image from "next/image";
import { IncreaseIcon } from "@moon/common/Icons";

import emoji from "@moon/assets/images/emoji--icon.png";
import increase from "@moon/assets/images/increase--icon.png";
import decrease from "@moon/assets/images/decrease--icon.png";
import { useDispatch, useSelector } from "react-redux";
import { collection, orderBy, query, where } from "firebase/firestore";
import { db } from "@moon/app/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import dayjs from "dayjs";
import Spinner from "@moon/common/Spinner";
import { clearFlash, showFlash } from "../Flash/flashSlice";

const Transactions = ({ coin, meta }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const transactionsRef = collection(db, "transactions");
  const q = query(
    transactionsRef,
    where("uid", "==", user?.uid),
    where("coin.id", "==", coin.id),
    orderBy("created_at", "desc")
  );
  const [transactions, loading, error] = useCollectionData(q);

  useEffect(() => {
    if (error) {
      dispatch(showFlash({ message: error.message, type: "error" }));
    }

    return () => {
      dispatch(clearFlash());
    };
  }, [error, dispatch]);

  if (!coin || !meta) return null;

  return (
    <div>
      <div className="p-4">
        <div className="flex items-center mt-8 mb-4">
          <div className="relative h-8 w-8 mr-4">
            <Image
              src={emoji}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt="profile"
            />
          </div>
          <h2 className="text-lg">Transactions</h2>
        </div>
      </div>
      <div className="grid grid-cols-3 p-4 border-b border-slate-300 dark:border-slate-600 text-sm items-center">
        <div className="flex items-center">
          <div className="relative h-8 w-8 mr-2 opacity-50">
            <Image
              src={increase}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt="profile"
            />
          </div>
          Date
        </div>
        <div>{`Coins`}</div>
        <div>{`Price`}</div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center p-10">
          <Spinner className="h-10 w-10" />
        </div>
      ) : transactions.length > 0 ? (
        transactions?.map((transaction) => (
          <div
            key={transaction.id}
            className="grid grid-cols-3 p-4 border-b border-slate-300 dark:border-slate-600"
          >
            <div className="flex items-center">
              <div className="relative h-8 w-8 mr-2">
                <Image
                  src={
                    transaction.transaction_type === "buy" ? increase : decrease
                  }
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  alt="profile"
                />
              </div>
              {dayjs(transaction.created_at.toDate().toString()).format(
                "MM/DD/YYYY"
              )}
            </div>
            <div>{transaction.amount}</div>
            <div>{formatMoney(transaction.price)}</div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-slate-500 dark:text-slate-400">
          <p className="text-3xl">😞</p>
          <p>No results found</p>
        </div>
      )}
    </div>
  );
};

export default Transactions;
