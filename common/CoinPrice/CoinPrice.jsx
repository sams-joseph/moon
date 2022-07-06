import React from "react";
import { IncreaseIcon } from "@moon/common/Icons";
import { formatMoney } from "@moon/utils/formatMoney";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { coinsSelectors } from "@moon/features/Coins/coinsSlice";

const CoinPrice = ({ symbol, name, price, percent }) => {
  const meta = useSelector((state) => coinsSelectors.selectById(state, symbol));

  return (
    <Link href={`/coins/${symbol}`}>
      <a className="flex justify-between border-b border-slate-300 dark:border-slate-800 px-4 p-2 hover:bg-slate-200 hover:dark:bg-slate-800 transition-colors">
        <div className="flex items-center">
          {meta?.logo && (
            <div className="relative h-10 w-10 rounded-full overflow-hidden mr-4">
              <Image
                src={meta.logo}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                alt={symbol}
              />
            </div>
          )}
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
                {Math.round(percent * 100) / 100}%
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default CoinPrice;
