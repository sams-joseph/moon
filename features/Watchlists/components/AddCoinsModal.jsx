import React, { useState, useRef } from "react";
import Modal from "@moon/common/Modal";
import Input from "@moon/common/Input";
import { db } from "@moon/app/firebase";
import Button from "@moon/common/Button";
import { PlusIcon } from "@heroicons/react/solid";
import { collection, doc, updateDoc } from "firebase/firestore";
import Alert from "@moon/common/Alert";
import useDebounce from "@moon/hooks/useDebounce";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Spinner from "@moon/common/Spinner";
import Avatar from "@moon/common/Avatar";
import useFlashMessage from "@moon/hooks/useFlashMessage";

const addOrRemoveObjectFromArray = (array, object, key) => {
  const index = array.findIndex((item) => item[key] === object[key]);
  if (index === -1) {
    array.push(object);
  } else {
    array.splice(index, 1);
  }
  return array;
};

const AddCoinsModal = ({ currentCoins, id }) => {
  const modalRef = useRef();
  const coinsRef = collection(db, "coins");
  const [keywords, setQuery] = useState("");
  const searchQuery = useDebounce(keywords, 500);
  const [coins, loading, coinsError] = useCollectionData(coinsRef, {});
  const docRef = doc(db, "watchlists", id);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [stagedCoins, setStagedCoins] = useState(
    currentCoins ? currentCoins : []
  );

  useFlashMessage(coinsError);

  const handleClickCoin = (coin) => {
    const temp = [...stagedCoins];
    const newCoins = addOrRemoveObjectFromArray(temp, coin, "symbol");
    setStagedCoins(newCoins);
  };

  const onSubmit = async () => {
    try {
      setSubmitting(true);
      await updateDoc(docRef, {
        coins: stagedCoins,
      });
      modalRef?.current.close();
    } catch (err) {
      setError(err.message);
    }
    setSubmitting(false);
  };

  return (
    <Modal ref={modalRef} title="Coins" trigger={<Button>Edit</Button>}>
      <>
        {error && <Alert message={error} />}
        <div className="my-4">
          <Input
            name="search"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
          />
        </div>
        <div className="my-4 flex items-center flex-wrap">
          {stagedCoins.map((c, i) => (
            <div
              onClick={() => handleClickCoin(c)}
              key={`${c.symbol}-${i}`}
              className="p-1 cursor-pointer"
            >
              <span className="text-xs bg-slate-300 dark:bg-slate-700 rounded inline-block px-2 py-1 mb-1 text-black dark:text-white">
                {c.symbol}
              </span>
            </div>
          ))}
        </div>
        <ul className="max-h-80 overflow-auto rounded-lg">
          {loading ? (
            <li className="flex items-center justify-center p-10">
              <Spinner className="h-10 w-10" />
            </li>
          ) : coins?.length > 0 ? (
            coins
              ?.filter((c) =>
                c.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((coin) => (
                <li
                  onClick={() => handleClickCoin(coin)}
                  key={coin.symbol}
                  className="cursor-pointer rounded-lg flex justify-between border-b border-slate-300 dark:border-slate-800 p-2 hover:bg-slate-200 hover:dark:bg-slate-900 transition-colors"
                >
                  <div className="flex items-center">
                    <Avatar
                      symbol={coin.symbol}
                      gutterRight
                      height="12"
                      width="12"
                    />
                    <div className="flex items-center">
                      <div className="mr-8 text-black dark:text-white">
                        <h4 className="text-xs bg-slate-300 dark:bg-slate-700 rounded inline-block px-2 py-1 mb-1">
                          {coin.symbol}
                        </h4>
                        <h2>{coin.name}</h2>
                      </div>
                    </div>
                  </div>
                </li>
              ))
          ) : (
            <li className="flex flex-col items-center justify-center p-8 text-slate-500 dark:text-slate-400">
              <p className="text-3xl">😞</p>
              <p>No results found</p>
            </li>
          )}
        </ul>
        <div className="mt-4 flex justify-end">
          <Button color="primary" disabled={submitting} onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default AddCoinsModal;
