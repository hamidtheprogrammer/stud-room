import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../UI/Button";
import { GlobalContext, useContext } from "../../constants/imports.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi } from "../../api/ApiCalls.jsx";

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const Login = () => {
  const { setLoginOpen } = useContext(GlobalContext);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateCredentials["loginApi"];
    },
    onError: (error) => {
      console.log("ERROR:", {
        message: error.message,
        status: error.status,
        response: error.response,
      });
    },
  });
  const onSubmit = (data) => {
    mutation.mutate(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative -translate-y-1/3 bg-white rounded-lg w-5/6 py-3 max-w-[30rem]"
      action=""
    >
      <div className="flxBtw border-b-[1px] w-full border-black/60 px-5 pb-2">
        <h1 className="font-bold">Login</h1>
        <p
          onClick={() => {
            setLoginOpen(false);
          }}
          className="details-text hover:underline cursor-pointer"
        >
          close
        </p>
      </div>
      <div className="form-field-wrapper">
        <div className="form-fields">
          <label className="details-text" htmlFor="">
            Email
          </label>
          <input className="form-input" type="text" {...register("email")} />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>
        <div className="form-fields">
          <label className="details-text" htmlFor="">
            Password
          </label>
          <input
            className="form-input"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="form-error">{errors.password.message}</p>
          )}
        </div>

        <Button disabled={isSubmitting} type={"submit"} name={"Submit"} />
      </div>
    </form>
  );
};

export default Login;
