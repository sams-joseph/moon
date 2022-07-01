import Image from "next/image";
import React from "react";
import CoinPrice from "../CoinPrice";
import flameIcon from "@moon/assets/images/flame--icon.png";

const Aside = (props) => {
  return (
    <div className="w-[290px] xl:w-[350px] hidden lg:flex flex-col h-screen sticky top-0 bottom-0">
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
        <h1 className="text-xl capitalize">Recent Coins</h1>
      </header>
      <div className="flex-1 p-4">
        <CoinPrice
          symbol="BTC"
          name="Bitcoin"
          logo="https://i.pravatar.cc/300"
          price={19000}
          percent={1.24}
        />
        <CoinPrice
          symbol="ETH"
          name="Ethereum"
          logo="https://i.pravatar.cc/300"
          price={1000}
          percent={-1.24}
        />
      </div>
      <footer className="px-4 py-8">
        <p className="text-sm">Attributions</p>
        <a
          className="block text-xs text-black/50 dark:text-white/50 underline"
          href="https://www.flaticon.com/free-icons/growth"
          title="growth icons"
        >
          Growth icons created by Freepik - Flaticon
        </a>
        <a
          className="block text-xs text-black/50 dark:text-white/50 underline"
          href="https://www.flaticon.com/free-icons/flames"
          title="flames icons"
        >
          Flames icons created by Flat Icons - Flaticon
        </a>
      </footer>
    </div>
  );
};

export default Aside;
