import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Modal from "@moon/common/Modal";
import Input from "@moon/common/Input";
import { db } from "@moon/app/firebase";
import { useSelector } from "react-redux";
import Button from "@moon/common/Button";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import Alert from "@moon/common/Alert";
import { PlusIcon } from "@heroicons/react/outline";

const CreateModal = () => {
  const modalRef = useRef();
  const user = useSelector((state) => state.auth.user);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { reset, register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: "",
      description: "",
      coins: [],
    },
  });

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const today = Timestamp.now();
      await addDoc(collection(db, "watchlists"), {
        ...data,
        created_by: { name: user.displayName, uid: user.uid },
        created_at: today,
      });

      reset();
      modalRef?.current.close();
    } catch (err) {
      setError(err.message);
    }
    setSubmitting(false);
  };

  return (
    <Modal
      ref={modalRef}
      title="Watchlist"
      trigger={
        <Button
          color="primary"
          startIcon={<PlusIcon className="h-4 w-4 text-white/75" />}
        >
          New
        </Button>
      }
    >
      <>
        {error && <Alert message={error} />}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <Input
            name="name"
            label="Name"
            {...register("name", { required: "Required" })}
          />
          <Input
            name="description"
            label="Description"
            multiline
            {...register("description", { required: "Required" })}
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
