import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { GlobalContext } from "../../constants/imports.jsx";
import * as z from "zod";
import { toast } from "react-toastify";
import {
  RoomDetailsSection,
  RoomTypeprice,
  RoomTerm,
  Button,
  Extras,
  Images,
  ImageUrl,
} from "../../constants/imports.jsx";

const roomSchema = z.object({
  type: z.string().min(1, { message: "Field is required" }),
  price: z.number().positive({ message: "Price must be positive" }),
});

const globalSchema = z.object({
  title: z.string().min(1, { message: "Field is required" }),
  description: z.string().min(1, { message: "Field is required" }),
  rooms: z.array(roomSchema).min(1, { message: "At least 1 room required" }),
  availableDate: z
    .string("Date is required")
    .refine((value) => !isNaN(Date.parse(value)), {
      message: "Invalid date format",
    })
    .refine(
      (value) => {
        const inputDate = new Date(value);
        const currentDate = new Date();
        return currentDate <= inputDate;
      },
      { message: "Date cannot be less than the current date" }
    ),
  minimumTerm: z.coerce
    .number()
    .positive({ message: "Price must be positive" }),
  maximumTerm: z.coerce
    .number()
    .positive({ message: "Price must be positive" }),
  billsIncluded: z.coerce.boolean(),
  amenities: z.array(z.string()),

  imageUrl: z.array(z.object({ url: z.string() })),

  // imageFiles: z
  //   .array(
  //     z.object({
  //       file: z.instanceof(FileList),
  //       // .refine((file) => file.size <= 5 * 1024 * 1024, {
  //       //   message: "File size should be less than 5MB",
  //       // }),
  //     })
  //   )
  //   .max(3, { message: "Max number of 3 Images allowed" }),
});

const ManageRoomForm = ({ isLoading, mutation, specificRoom }) => {
  const formMethods = useForm(
    { resolver: zodResolver(globalSchema) },
    {
      defaultValues: {
        rooms: [{ type: "", price: "" }],
        minimumTerm: 0,
        maximumTerm: 0,
      },
    }
  );

  const { currentUser } = useContext(GlobalContext);
  const { handleSubmit, watch, reset } = formMethods;

  const onSubmit = (data) => {
    console.log("hello");
    console.log(data);
    // const formData = new FormData();
    // for (const key in data) {
    //   if (data[key]) {
    //     if (Array.isArray(data[key])) {
    //       // If the value is an array, loop through each item
    //       data[key].forEach((item, index) => {
    //         formData.append(`${key}[${index}]`, item);
    //       });
    //     } else {
    //       formData.append(key, data[key]);
    //     }
    //   }
    // }

    if (!currentUser.isAuthenticated) {
      return toast.error("Please login to continue", {
        position: "top-center",
      });
    }

    mutation.mutate(data);
  };

  useEffect(() => {
    // reset(specificRoom);
  }, [specificRoom, reset]);

  return (
    <FormProvider {...formMethods}>
      <form
        className={"border-[1px] max-w-[1010px] mx-auto rounded-xl"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="border-b-[1px] p-3">Please the form below</div>
        <section className="p-5 flxColStart gap-10">
          <RoomDetailsSection />
          <RoomTypeprice />
          <RoomTerm />
          <Extras />
          {/* <Images /> */}
          <ImageUrl />
          <Button
            styles={"mt-6 disabled:opacity-50"}
            // disabled={isLoading}
            type="submit"
            name={isLoading ? "submitting..." : "Submit"}
          />
        </section>
      </form>
    </FormProvider>
  );
};

export default ManageRoomForm;
