import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";

import Modal from "@moon/common/Modal";
import Input from "@moon/common/Input";
import { db } from "@moon/app/firebase";
import { useSelector } from "react-redux";
import Button from "@moon/common/Button";
import { CurrencyDollarIcon } from "@heroicons/react/solid";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import Alert from "@moon/common/Alert";

const CreateModal = ({ coin }) => {
  const modalRef = useRef();
  const transactionType = useRef("buy");
  const user = useSelector((state) => state.auth.user);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { reset, register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      uid: user.uid,
      price: coin.quote.USD.price,
      amount: 0,
      transaction_id: "",
      transaction_type: "buy",
    },
  });

  transactionType.current = watch("transaction_type", "buy");

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const today = Timestamp.now();
      await addDoc(collection(db, "transactions"), {
        ...data,
        coin,
        created_at: today,
      });

      reset();
      modalRef?.current.close();
    } catch (err) {
      setError(err.message);
    }
    setSubmitting(false);
  };

  const handleChangeType = (value) => {
    setValue("transaction_type", value);
  };

  return (
    <Modal
      ref={modalRef}
      title="Transaction"
      trigger={
        <Button
          color="primary"
          startIcon={<CurrencyDollarIcon className="h-6 w-6 text-white/75" />}
        >
          Buy/Sell
        </Button>
      }
    >
      <>
        <div className="flex bg-slate-300 dark:bg-slate-900 border border-slate-400 dark:border-slate-800 p-2 rounded-lg my-4">
          {error && <Alert message={error} />}
          <Button
            color={transactionType.current === "buy" ? "primary" : "default"}
            className="w-full mr-1"
            onClick={() => handleChangeType("buy")}
          >
            Buy
          </Button>
          <Button
            color={transactionType.current === "sell" ? "primary" : "default"}
            className="w-full ml-1"
            onClick={() => handleChangeType("sell")}
          >
            Sell
          </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <Input
            name="price"
            label="Price"
            {...register("price", { required: "Required" })}
          />
          <Input
            name="amount"
            label="Amount"
            {...register("amount", { required: "Required" })}
          />
          <Input
            name="transaction_id"
            label="Transaction ID"
            {...register("transaction_id", { required: "Required" })}
          />
          <div className="mt-4 flex justify-end">
            <Button color="primary" disabled={submitting}>
              Submit
            </Button>
          </div>
        </form>
      </>
    </Modal>
  );
};

export default CreateModal;
