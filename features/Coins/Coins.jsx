import CoinPrice from "@moon/common/CoinPrice";
import Input from "@moon/common/Input";
import Select from "@moon/common/Select";
import Spinner from "@moon/common/Spinner";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { coinsSelectors, fetchCoins } from "./coinsSlice";

const Coins = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.coins.loading);
  const error = useSelector((state) => state.coins.error);
  const coinSymbols = useSelector(coinsSelectors.selectAll);
  const [filters, setFilters] = useState({
    cryptocurrency_type: "all",
    sort: "market_cap",
  });

  useEffect(() => {
    const promise = dispatch(fetchCoins(filters));

    return () => {
      promise.abort();
    };
  }, [dispatch, filters]);

  const handleChange = (e) => {
    setFilters((filters) => ({ ...filters, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <header className="p-4">
        <h1 className="text-[30px] capitalize mt-4 mb-8">Coins</h1>
        <div className="flex">
          <div className="mr-2">
            <Select
              name="cryptocurrency_type"
              placeholder="Type"
              onChange={handleChange}
              value={filters.cryptocurrency_type}
              label="Type"
            >
              <option value="all">All</option>
              <option value="coins">Coins</option>
              <option value="tokens">Tokens</option>
            </Select>
          </div>
          <div className="mr-2">
            <Select
              name="sort"
              placeholder="Sort"
              onChange={handleChange}
              value={filters.sort}
              label="Sort"
            >
              <option value="name">Name</option>
              <option value="symbol">Symbol</option>
              <option value="date_added">Date Added</option>
              <option value="market_cap">Market Cap</option>
              <option value="price">Price</option>
              <option value="circulating_supply">Circulating Supply</option>
              <option value="total_supply">Total Supply</option>
              <option value="max_supply">Max Supply</option>
            </Select>
          </div>
        </div>
      </header>
      {loading ? (
        <div className="flex items-center justify-center p-10">
          <Spinner className="h-10 w-10" />
        </div>
      ) : (
        coinSymbols.map((coin) => (
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
