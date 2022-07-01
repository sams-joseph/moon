import React, { useState, useRef } from "react";
import { LoginIcon } from "@heroicons/react/outline";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";

import Modal from "@moon/common/Modal";
import Input from "@moon/common/Input";
import { auth } from "@moon/app/firebase";
import { login } from "../authSlice";
import { useDispatch } from "react-redux";
import Button from "@moon/common/Button";

const LoginModal = (props) => {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const response = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      dispatch(login(JSON.parse(JSON.stringify(response.user))));
      modalRef?.current.close();
    } catch (err) {
      setError(err.message);
    }
    setSubmitting(false);
  };

  return (
    <Modal
      ref={modalRef}
      title="Login"
      trigger={
        <button className="w-full justify-center xl:justify-start text-left bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors py-2 px-4 rounded-full flex items-center text-slate-900 dark:text-white">
          <LoginIcon className="h-6 w-6 text-slate-900/75 dark:text-white/75" />
          <p className="ml-4 hidden xl:block">Login</p>
        </button>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="pt-8">
        <p className="mb-4 text-red-500">{error?.message}</p>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          label="Email"
          defaultValue=""
          disabled={submitting}
          error={isSubmitted && errors.email}
          {...register("email", { required: "Required" })}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          label="Password"
          defaultValue=""
          disabled={submitting}
          error={isSubmitted && errors.password}
          {...register("password", { required: "Required" })}
        />

        <Button
          color="primary"
          type="submit"
          className="w-full mt-8"
          disabled={submitting}
        >
          Login
        </Button>
      </form>
    </Modal>
  );
};

export default LoginModal;
