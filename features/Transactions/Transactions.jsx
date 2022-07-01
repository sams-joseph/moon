import React from "react";
import CreateModal from "./components/CreateModal";
import { formatMoney } from "@moon/utils/formatMoney";

const Transactions = ({ coin }) => {
  return (
    <div>
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-[30px] capitalize">{coin.name}</h1>
        <CreateModal currentPrice={coin.quote.USD.price} />
      </header>
      <div className="bg-slate-800 dark:bg-slate-200 rounded-2xl p-2">
        <div className="p-4 flex justify-between">
          <h2 className="text-lg uppercase text-white dark:text-black">
            {coin.symbol}
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

export default Transactions;
