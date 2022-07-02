import React, { useEffect, useMemo } from "react";
import { db } from "@moon/app/firebase";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useDispatch } from "react-redux";
import { clearFlash, showFlash } from "@moon/features/Flash/flashSlice";
import Spinner from "@moon/common/Spinner";

const Wallet = ({ user }) => {
  const dispatch = useDispatch();
  const walletRef = doc(db, "wallets", user.uid);
  const [wallet, loading, error] = useDocumentData(walletRef, {});

  useEffect(() => {
    if (error) {
      dispatch(showFlash({ message: error.message, type: "error" }));
    }

    return () => {
      dispatch(clearFlash());
    };
  }, [error, dispatch]);

  const summary = useMemo(() => {
    if (!wallet) return [];
    return Object.keys(wallet).map((key) => {
      const item = wallet[key];
      return { ...item, name: key };
    });
  }, [wallet]);

  return (
    <div className="flex-1 p-4">
      {loading ? (
        <div className="flex items-center justify-center p-10">
          <Spinner className="h-10 w-10" />
        </div>
      ) : (
        <div className="p-4 rounded-lg bg-slate-200 dark:bg-slate-800">
          {summary.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between pb-4 last:pb-0"
            >
              <div className="flex-1">
                <h2 className="text-lg capitalize">{item.name}</h2>
              </div>
              <div className="flex-1 text-right">
                <p className="text-sm">{item.balance}</p>
                <p className="text-sm">{item.average_price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Wallet.propTypes = {};

export default Wallet;
