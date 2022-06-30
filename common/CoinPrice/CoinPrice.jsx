import React from "react";
import { IncreaseIcon } from "@moon/common/Icons";
import { formatMoney } from "@moon/utils/formatMoney";
import Image from "next/image";

const CoinPrice = ({ symbol, name, logo, price, percent }) => {
  return (
    <div className="flex justify-between mb-4">
      <div className="flex">
        <div className="relative h-8 w-8 rounded-full overflow-hidden mr-4">
          <Image
            src={logo}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt={symbol}
          />
        </div>
        <div className="flex items-center">
          <div className="mr-8">
            <h4 className="text-xs bg-slate-300 dark:bg-slate-700 rounded inline-block px-2 py-1 mb-1">
              {symbol}
            </h4>
            <h2>{name}</h2>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="py-1">
          <div>
            <h2 className={`text-xl text-right text-black dark:text-white`}>
              {formatMoney(price)}
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
              {percent}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinPrice;
