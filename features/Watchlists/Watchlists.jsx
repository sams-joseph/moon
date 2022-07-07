import React, { useState } from "react";
import { collection, orderBy, query, where } from "firebase/firestore";
import { db } from "@moon/app/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import dayjs from "dayjs";
import AvatarGroup from "@moon/common/AvatarGroup";
import Link from "next/link";
import { Switch } from "@headlessui/react";
import { useSelector } from "react-redux";
import Spinner from "@moon/common/Spinner";
import useFlashMessage from "@moon/hooks/useFlashMessage";

const WatchlistItem = ({ data, id }) => {
  return (
    <Link href={`/watchlists/${id}`}>
      <a className="border-b border-slate-300 dark:border-slate-700 p-4 block hover:bg-slate-200 hover:dark:bg-slate-800 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <p>{data.name}</p>
          <AvatarGroup
            symbols={data.coins.map((coin) => coin.symbol)}
            max={3}
          />
        </div>
        <p className="text-slate-700 dark:text-slate-300">{data.description}</p>
        <div className="flex items-center justify-between mt-4">
          <p className="font-bold">{data.created_by.name}</p>
          <p className="text-slate-600 dark:text-slate-400">
            {dayjs(data.created_at.toDate().toString()).format("MM/DD/YYYY")}
          </p>
        </div>
      </a>
    </Link>
  );
};

const Watchlists = (props) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const watchlistsRef = collection(db, "watchlists");
  const [queries, setQueries] = useState([orderBy("created_at", "desc")]);
  const q = query(watchlistsRef, ...queries);
  const [watchlists, loading, error] = useCollection(q);
  const [own, setOwn] = useState(false);

  useFlashMessage(error);

  const handleOwnChange = (value) => {
    setOwn(value);

    if (value && user) {
      setQueries((qs) => [...qs, where("created_by.uid", "==", user.uid)]);
    } else {
      setQueries([orderBy("created_at", "desc")]);
    }
  };

  return (
    <div>
      {isAuthenticated && (
        <div className="p-1 xl:p-4 flex justify-center xl:justify-start items-center">
          <Switch
            checked={own}
            onChange={handleOwnChange}
            className={`${
              own
                ? "bg-purple-500 dark:bg-purple-500"
                : "bg-slate-200 dark:bg-slate-600"
            } relative inline-flex h-[24px] w-[52px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 mr-4`}
          >
            <span className="sr-only">Own Only</span>
            <span
              aria-hidden="true"
              className={`${
                own
                  ? "translate-x-7 bg-yellow-300"
                  : "translate-x-0 bg-yellow-600"
              }
      pointer-events-none h-[20px] w-[20px] transform rounded-full dark:bg-white shadow-lg ring-0 transition duration-200 ease-in-out inline-flex items-center justify-center`}
            />
          </Switch>
          <span className="text-sm opacity-75">Own only</span>
        </div>
      )}
      {loading ? (
        <div className="flex items-center justify-center p-10">
          <Spinner className="h-10 w-10" />
        </div>
      ) : watchlists?.docs.length > 0 ? (
        watchlists?.docs.map((watchlist) => (
          <WatchlistItem
            key={watchlist.id}
            id={watchlist.id}
            data={watchlist.data()}
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

export default Watchlists;
