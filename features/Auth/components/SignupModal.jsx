//TODO: Handle errors better

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";

import Modal from "@moon/common/Modal";
import Input from "@moon/common/Input";
import { auth } from "@moon/app/firebase";
import { login } from "../authSlice";
import { useDispatch } from "react-redux";
import { CakeIcon } from "@heroicons/react/solid";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Button from "@moon/common/Button";

const SignupModal = (props) => {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const password = useRef({});
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    watch,
  } = useForm();
  password.current = watch("password", "");

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const response = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(auth.currentUser, {
        displayName: data.displayName,
      });

      dispatch(
        login(
          JSON.parse(
            JSON.stringify({ ...response.user, displayName: data.displayName })
          )
        )
      );
      modalRef?.current.close();
    } catch (err) {
      setError(err.message);
    }
    setSubmitting(false);
  };

  return (
    <Modal
      ref={modalRef}
      title="Sign Up"
      trigger={
        <button className="w-full justify-center xl:justify-start text-left bg-purple-700 hover:bg-purple-800 transition-colors py-2 px-4 rounded-full flex items-center text-white mb-4">
          <CakeIcon className="h-6 w-6 text-white/75" />
          <p className="ml-4 hidden xl:block">Sign Up</p>
        </button>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="pt-8">
        <p className="mb-4 text-red-500">{error}</p>
        <Input
          name="displayName"
          type="text"
          placeholder="Name"
          label="Name"
          defaultValue=""
          disabled={submitting}
          error={isSubmitted && errors.displayName}
          {...register("displayName", { required: "Required" })}
        />
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
        <Input
          name="confirm"
          type="password"
          placeholder="Password"
          label="Confirm Password"
          defaultValue=""
          disabled={submitting}
          error={isSubmitted && errors.confirm}
          {...register("confirm", {
            validate: (value) =>
              value === password.current || "The passwords do not match",
          })}
        />

        <Button
          color="primary"
          type="submit"
          className="w-full mt-8"
          disabled={submitting}
        >
          Sign Up
        </Button>
      </form>
    </Modal>
  );
};

export default SignupModal;
