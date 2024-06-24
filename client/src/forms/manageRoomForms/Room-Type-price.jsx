import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";

const RoomTypeprice = () => {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "rooms",
  });

  return (
    <section className="w-full flxRowStart items-center">
      <div className="relative details-text flex-1 flxRowStart flex-nowrap">
        Room <span className="text-red-600">*</span>
        {errors.rooms && <p className="form-error">{errors.rooms.message}</p>}
      </div>
      <div className="details-text flex-1 flxColStart gap-3">
        {fields.map((room, index) => (
          <div key={Math.random()} className="relative flxRowCenter flex-1">
            <div className="relative">
              <label
                className="details-text flex-1"
                htmlFor={`rooms.${index}.type`}
              >
                Type
              </label>
              <select
                className=""
                {...register(`rooms.${index}.type`)}
                type="text"
              >
                <option value="">Select a room type</option>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="suite">Suite</option>
              </select>
              {errors.rooms?.[index]?.type && (
                <p className="form-error">{errors.rooms[index].type.message}</p>
              )}
            </div>
            <div className="relative">
              <label
                className="details-text flex-1"
                htmlFor={`rooms.${index}.price`}
              >
                Price
              </label>
              $
              <input
                className="outline-none max-w-[3rem]"
                type="number"
                {...register(`rooms.${index}.price`, {
                  required: "Minimum term is required",
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: "Minimum term must be positive",
                  },
                })}
              />
              {errors.rooms?.[index]?.price && (
                <p className="form-error absolute">
                  {errors.rooms[index].price.message}
                </p>
              )}
            </div>
            <button
              className="relative self-end text-red-600 font-bold text-lg hover:underline"
              type="button"
              onClick={() => remove(index)}
            >
              X
            </button>
          </div>
        ))}
        <button
          className="details-text border-[1px] p-1"
          type="button"
          onClick={() => append({ type: "", price: "" })}
        >
          Add Room
        </button>
      </div>
    </section>
  );
};

export default RoomTypeprice;
