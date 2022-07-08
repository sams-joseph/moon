import React, { useMemo } from "react";
import { formatMoney } from "@moon/utils/formatMoney";
import Image from "next/image";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import emoji from "@moon/assets/images/emoji--icon.png";
import increase from "@moon/assets/images/increase--icon.png";
import decrease from "@moon/assets/images/decrease--icon.png";
import { useSelector } from "react-redux";
import { collection, orderBy, query, where } from "firebase/firestore";
import { db } from "@moon/app/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import dayjs from "dayjs";
import Spinner from "@moon/common/Spinner";
import useFlashMessage from "@moon/hooks/useFlashMessage";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Transactions Chart",
    },
  },
};

const Transactions = ({ coin, meta }) => {
  const user = useSelector((state) => state.auth.user);
  const transactionsRef = collection(db, "transactions");
  const q = query(
    transactionsRef,
    where("uid", "==", user?.uid),
    where("coin.id", "==", coin.id),
    orderBy("created_at", "desc")
  );
  const [transactions, loading, error] = useCollectionData(q);

  useFlashMessage(error);

  const labels = useMemo(() => {
    const data = new Set();
    if (transactions) {
      transactions.forEach((t) => {
        data.add(dayjs(t.created_at.toDate().toString()).format("MM/DD/YYYY"));
      });
    }

    return Array.from(data);
  }, [transactions]);

  const data = useMemo(() => {
    if (labels && transactions) {
      return {
        labels,
        datasets: [
          {
            label: "Transactions",
            data: transactions.map((t) => t.amount),
            borderColor: "#9333ea",
            backgroundColor: "#9333ea",
          },
        ],
      };
    } else {
      return {
        labels: [],
        datasets: [],
      };
    }
  }, [labels, transactions]);

  if (!coin || !meta) return null;

  return (
    <div>
      <div className="p-4">
        <div className="flex items-center mt-8 mb-4">
          <div className="relative h-8 w-8 mr-4">
            <Image
              src={emoji}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt="profile"
            />
          </div>
          <h2 className="text-lg">Transactions</h2>
        </div>
      </div>
      <div className="p-4 bg-slate-200 dark:bg-slate-800">
        <Line options={options} data={data} />
      </div>
      <div className="grid grid-cols-3 p-4 border-b border-slate-300 dark:border-slate-700 text-sm items-center">
        <div className="flex items-center">
          <div className="relative h-8 w-8 mr-2 opacity-50">
            <Image
              src={increase}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt="profile"
            />
          </div>
          Date
        </div>
        <div>{`Coins`}</div>
        <div>{`Price`}</div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center p-10">
          <Spinner className="h-10 w-10" />
        </div>
      ) : transactions.length > 0 ? (
        transactions?.map((transaction, i) => (
          <div
            key={i}
            className="grid grid-cols-3 p-4 border-b border-slate-300 dark:border-slate-600"
          >
            <div className="flex items-center">
              <div className="relative h-8 w-8 mr-2">
                <Image
                  src={
                    transaction.transaction_type === "buy" ? increase : decrease
                  }
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  alt="profile"
                />
              </div>
              {dayjs(transaction.created_at.toDate().toString()).format(
                "MM/DD/YYYY"
              )}
            </div>
            <div>{transaction.amount}</div>
            <div>{formatMoney(transaction.price)}</div>
          </div>
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

export default Transactions;
