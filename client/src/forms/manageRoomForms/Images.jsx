import React, { useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";

const Images = () => {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext({
    defaultValues: {
      imageFiles: [{ file: null }],
    },
  });

  const { remove, append, fields } = useFieldArray({
    control,
    name: "imageFiles",
  });
  useEffect(() => {
    // fields.length === 0 && append({ file: "" });
  }, []);

  return (
    <div className="flxRowStart w-full details-text">
      <label className="flex-1">Attach Image</label>
      {errors?.imageFiles && (
        <p className="form-error">{errors.imageFiles.message}</p>
      )}
      <ul className="flex-1 flxColStart gap-1 ">
        {fields.map((field, index) => (
          <li key={index} className="relative flxRowStart  ">
            <input
              className="flex max-w-[200px]"
              name="imageFiles"
              {...register(`imageFiles.${index}.file`)}
              accept="image/*"
              type="file"
            />
            <button
              type="button"
              onClick={() => {
                remove(index);
              }}
              className="text-red-600 hover:underline font-bold"
            >
              {" "}
              X
            </button>
          </li>
        ))}
        <button
          onClick={() => append({ file: null })}
          type="button"
          className="mt-3 text-sm border-[1px] border-gray-900  py-[0.1rem] px-[0.4rem] bg-gray-200"
        >
          add file
        </button>
      </ul>
    </div>
  );
};

export default Images;
