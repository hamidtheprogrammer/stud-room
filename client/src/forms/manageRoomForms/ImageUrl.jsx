import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";

const ImageUrl = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext({
    defaultValues: {
      imageUrl: [{ url: "" }],
    },
  });
  const { append, remove, fields } = useFieldArray({
    control,
    name: "imageUrl",
  });
  return (
    <div className="w-full flxRowStart details-text">
      <label className="flex-1">ImageUrl</label>
      {errors.imageUrl && <p>{errors.imageUrl.message}</p>}
      <ul>
        {fields.map((field, index) => (
          <li key={index}>
            <div>
              <label>Url</label>
              <input
                type="text"
                className="border-[1px]"
                {...register(`imageUrl.${index}.url`)}
              />
              {errors?.imageUrl?.[index]?.url && (
                <p>{errors.imageUrl[index].message}</p>
              )}
            </div>
            <button
              className="text-red-600 font-bold"
              onClick={() => {
                remove(index);
              }}
              type="button"
            >
              X
            </button>
          </li>
        ))}
        <button
          className="mt-3 text-sm border-[1px] border-gray-900  py-[0.1rem] px-[0.4rem] bg-gray-200"
          type="button"
          onClick={() => {
            append({ url: "" });
          }}
        >
          add url
        </button>
      </ul>
    </div>
  );
};

export default ImageUrl;
