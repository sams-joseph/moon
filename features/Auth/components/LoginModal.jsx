import React, { useState, useRef, useEffect } from "react";
import { LoginIcon } from "@heroicons/react/outline";
import { useForm } from "react-hook-form";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

import Modal from "@moon/common/Modal";
import Input from "@moon/common/Input";
import { auth } from "@moon/app/firebase";
import { login } from "../authSlice";
import { useDispatch } from "react-redux";

const LoginModal = (props) => {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  useEffect(() => {
    if (user?.user) {
      dispatch(login(JSON.parse(JSON.stringify(user.user))));
      modalRef?.current.close();
    }
  }, [dispatch, user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await signInWithEmailAndPassword(data.email, data.password);
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
          disabled={loading}
          {...register("email")}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          label="Password"
          defaultValue=""
          disabled={loading}
          {...register("password")}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-700 hover:bg-purple-800 transition-colors py-2 px-4 rounded-lg mt-8 text-white text-center disabled:bg-slate-500 disabled:text-slate-800"
        >
          Login
        </button>
      </form>
    </Modal>
  );
};

export default LoginModal;
