import React, { useState } from "react";
import CoinPrice from "@moon/common/CoinPrice";
import Select from "@moon/common/Select";
import Spinner from "@moon/common/Spinner";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "@moon/app/firebase";
import { collection, orderBy, query, where } from "firebase/firestore";
import Alert from "@moon/common/Alert";

const Coins = (props) => {
  const coinsRef = collection(db, "coins");
  const [filter, setFilter] = useState("all");
  const [clauses, setClauses] = useState([orderBy("cmc_rank")]);

  const q = query(coinsRef, ...clauses);
  const [coins, loading, error] = useCollectionData(q, {});

  const handleChange = (e) => {
    setFilter(e.target.value);
    if (e.target.value !== "all") {
      setClauses([
        where("tags", "array-contains", e.target.value),
        orderBy("cmc_rank"),
      ]);
    } else {
      setClauses([orderBy("cmc_rank")]);
    }
  };

  return (
    <div>
      {error && <Alert message={error?.message} />}
      <header className="p-4">
        <h1 className="text-[30px] capitalize mt-4 mb-8">Coins</h1>
        <div className="flex">
          <div className="mr-2">
            <Select
              name="tags"
              placeholder="Type"
              onChange={handleChange}
              value={filter}
              label="Type"
            >
              <option value="all">All</option>
              <option value="defi">Defi</option>
              <option value="filesharing">Filesharing</option>
            </Select>
          </div>
        </div>
      </header>
      {loading ? (
        <div className="flex items-center justify-center p-10">
          <Spinner className="h-10 w-10" />
        </div>
      ) : (
        coins?.map((coin) => (
          <CoinPrice
            key={coin.symbol}
            symbol={coin.symbol}
            name={coin.name}
            logo={null}
            price={coin.quote.USD.price}
            percent={coin.quote.USD.percent_change_24h}
          />
        ))
      )}
    </div>
  );
};

export default Coins;
