import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../constants/imports";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerApi } from "../constants/imports";

const schema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      console.log("registration successful", data);
      queryClient.invalidateQueries(["registerApi"]);
    },
    onError: (error) => {
      console.log("Error:", {
        message: error.message,
        status: error.status,
        response: error.response,
      });
    },
  });
  const onSubmit = async (data) => {
    await mutation.mutateAsync(data);
  };

  return (
    <section>
      <form className="w-full" action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-field-wrapper w-full max-w-[40rem] mx-auto py-9">
          <div className="font-bold border-b-[1px] border-black/30 w-full pb-3">
            Register
          </div>
          <div className="flxRowCenter gap-1 w-full">
            <div className="form-fields flex-1">
              <label className="details-text">FirstName</label>
              <input className="form-input" {...register("firstName")} />
              {errors.firstName && (
                <p className="form-error">{errors.firstName.message}</p>
              )}
            </div>
            <div className="form-fields flex-1">
              <label className="details-text">LastName</label>
              <input className="form-input" {...register("lastName")} />
              {errors.lastName && (
                <p className="form-error">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          <div className="form-fields ">
            <label className="details-text">Email</label>
            <input className="form-input" {...register("email")} />
            {errors.email && (
              <p className="form-error">{errors.email.message}</p>
            )}
          </div>
          <div className="form-fields ">
            <label className="details-text">Password</label>
            <input
              className="form-input"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="form-error">{errors.password.message}</p>
            )}
          </div>
          <div className="form-fields ">
            <label className="details-text">Confirm Password</label>
            <input
              className="form-input"
              type="password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="form-error">{errors.confirmPassword.message}</p>
            )}
          </div>
          <Button type={"submit"} disabled={isSubmitting} name={"Submit"} />
        </div>
      </form>
    </section>
  );
};

export default Register;
