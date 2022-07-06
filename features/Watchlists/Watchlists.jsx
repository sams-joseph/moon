import React from "react";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@moon/app/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import dayjs from "dayjs";
import AvatarGroup from "@moon/common/AvatarGroup";
import Link from "next/link";

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
  const watchlistsRef = collection(db, "watchlists");
  const q = query(watchlistsRef, orderBy("created_at", "desc"));
  const [watchlists, loading, error] = useCollection(q);

  return (
    <div>
      {watchlists?.docs.map((watchlist) => (
        <WatchlistItem
          key={watchlist.id}
          id={watchlist.id}
          data={watchlist.data()}
        />
      ))}
    </div>
  );
};

export default Watchlists;
