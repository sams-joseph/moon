import React from "react";
import CreateModal from "./components/CreateModal";
import { formatMoney } from "@moon/utils/formatMoney";
import Image from "next/image";

const Transactions = ({ coin, meta }) => {
  return (
    <div>
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-[30px] capitalize">{coin.name}</h1>
        <CreateModal coin={coin} />
      </header>
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
            <h2 className="text-lg uppercase text-white dark:text-black">
              {coin.symbol}
            </h2>
          </div>
          <h2 className="text-lg uppercase text-white dark:text-black">
            {formatMoney(coin.quote.USD.price)}
          </h2>
        </div>
        <div className="bg-slate-100 dark:bg-slate-900 rounded-2xl p-4">
          <p>{meta.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
