import React, { useEffect, useState } from "react";
import CoinPrice from "@moon/common/CoinPrice";
import Select from "@moon/common/Select";
import Spinner from "@moon/common/Spinner";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "@moon/app/firebase";
import { collection, orderBy, query, where } from "firebase/firestore";
import Input from "@moon/common/Input";
import useDebounce from "@moon/hooks/useDebounce";
import useFlashMessage from "@moon/hooks/useFlashMessage";

const Coins = (props) => {
  const coinsRef = collection(db, "coins");
  const [filter, setFilter] = useState("all");
  const [keywords, setQuery] = useState("");
  const [clauses, setClauses] = useState([orderBy("cmc_rank")]);
  const searchQuery = useDebounce(keywords, 500);

  const q = query(coinsRef, ...clauses);
  const [coins, loading, error] = useCollectionData(q, {});

  useFlashMessage(error);

  useEffect(() => {
    const arr = [];
    if (filter !== "all") {
      arr.push(where("tags", "array-contains", filter));
      arr.push(orderBy("cmc_rank"));
    } else {
      arr.push(orderBy("cmc_rank"));
    }

    if (searchQuery.length > 0) {
      arr.push(where("name", "==", searchQuery));
    }

    setClauses(arr);
  }, [filter, searchQuery]);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
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
          <div className="mr-2 flex-1">
            <Input
              label="Search"
              name="search"
              placeholder="Bitcoin"
              value={keywords}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </header>
      {loading ? (
        <div className="flex items-center justify-center p-10">
          <Spinner className="h-10 w-10" />
        </div>
      ) : coins?.length > 0 ? (
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
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-slate-500 dark:text-slate-400">
          <p className="text-3xl">😞</p>
          <p>No results found</p>
        </div>
      )}
    </div>
  );
};

export default Coins;
