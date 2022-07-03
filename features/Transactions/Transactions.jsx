import React from "react";
import CreateModal from "./components/CreateModal";
import { formatMoney } from "@moon/utils/formatMoney";
import Image from "next/image";
import { IncreaseIcon } from "@moon/common/Icons";

import emoji from "@moon/assets/images/emoji--icon.png";
import increase from "@moon/assets/images/increase--icon.png";
import decrease from "@moon/assets/images/decrease--icon.png";
import { useSelector } from "react-redux";
import { collection, orderBy, query, where } from "firebase/firestore";
import { db } from "@moon/app/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import dayjs from "dayjs";

const Transactions = ({ coin, meta }) => {
  const user = useSelector((state) => state.auth.user);
  const transactionsRef = collection(db, "transactions");
  const q = query(
    transactionsRef,
    where("uid", "==", user.uid),
    where("coin.id", "==", coin.id)
    // orderBy("created_at")
  );
  const [transactions, loading, error] = useCollectionData(q);

  console.log(transactions, error);

  if (!coin || !meta) return null;

  const percent = coin.quote.USD.percent_change_24h;
  const weekPercent = coin.quote.USD.percent_change_7d;
  const monthPercent = coin.quote.USD.percent_change_30d;

  return (
    <div>
      <header className="flex items-center justify-between mb-8 p-4">
        <h1 className="text-[30px] capitalize">{coin.name}</h1>
        <CreateModal coin={coin} />
      </header>
      <div className="p-4">
        <div className="bg-slate-800 dark:bg-slate-200 rounded-2xl p-2">
          <div className="p-4 flex justify-between">
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
      <div className="grid grid-cols-3 p-4 border-b border-slate-600 text-sm items-center">
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
      {transactions?.map((transaction) => (
        <div
          key={transaction.id}
          className="grid grid-cols-3 p-4 border-b border-slate-600"
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
            {dayjs(transaction.created_at).format("MM/DD/YYYY")}
          </div>
          <div>{transaction.amount}</div>
          <div>{formatMoney(transaction.price)}</div>
        </div>
      ))}
    </div>
  );
};

export default Transactions;
