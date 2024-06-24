import React from "react";
import { useFormContext } from "react-hook-form";

const RoomDetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <section className="relative w-full flex-1 flxColStart gap-5">
      <div className="relative w-full flxRowStart items-center">
        <label className="post-label">
          Title <span className="text-red-600">*</span>
        </label>
        <div className="flex-1">
          <input
            className="w-full border-[1px] h-[1rem] pl-2 py-1 text-sm outline-none"
            placeholder="3 bedrooms for rent"
            {...register("title")}
            type="text"
          />
          {errors.title && <p className="form-error">{errors.title.message}</p>}
        </div>
      </div>
      <div className="w-full relative flex">
        <label className="relative details-text flex-1">
          Description <span className="text-red-600">*</span>
        </label>
        <div className="flex-1">
          <textarea
            rows={"5"}
            className="border-[1px] w-full p-1 text-sm"
            {...register("description")}
            type="textarea"
          />
          {errors.description && (
            <p className="form-error">{errors.description.message}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default RoomDetailsSection;
