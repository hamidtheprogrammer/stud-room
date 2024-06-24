import React from "react";
import { useFormContext } from "react-hook-form";

const RoomTerm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="w-full flxColStart gap-4">
      <div className="relative flxRowStart w-full">
        <label className="details-text flex-1" htmlFor="">
          Available Date <span className="text-red-600">*</span>
        </label>
        <div className="flex-1 details-text">
          <input
            className="border-[1px]"
            {...register("availableDate")}
            type="date"
          />

          {errors.availableDate && (
            <p className="form-error">{errors.availableDate.message}</p>
          )}
        </div>
      </div>
      <div className="relative flxRowStart w-full">
        <label className="details-text flex-1">Minimum Term</label>
        <div className="flex-1 details-text">
          <input
            className="border-[1px]"
            {...register("minimumTerm")}
            type="number"
          />{" "}
          month(s)
          {errors.minimumTerm && (
            <p className="form-error">{errors.minimumTerm.message}</p>
          )}
        </div>
      </div>
      <div className="relative flxRowStart w-full">
        <label className="details-text flex-1" htmlFor="">
          Maximum Term
        </label>
        <div className="flex-1 details-text">
          <input
            className="border-[1px]"
            {...register("maximumTerm")}
            type="number"
          />{" "}
          month(s)
          {errors.maximumTerm && (
            <p className="form-error">{errors.maximumTerm.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomTerm;
