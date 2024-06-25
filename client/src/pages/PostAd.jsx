import React from "react";
import { ManageRoomForm } from "../constants/imports";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRoom } from "../api/ApiCalls";
import { toast } from "react-toastify";
const PostAd = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addRoom,
    onSuccess: (data) => {
      toast.success(data.message);
      window.location.reload();
    },
    onError: (error) => {
      toast.error(error.message);
      console.log({
        error: error.message,
        status: error.status,
        response: error.response,
      });
    },
  });

  // const handleSave = (data) => {
  //   console.log(data);
  //   // mutation.mutate(data);
  // };

  return (
    <div className="mb-5 px-5">
      <h1 className="text-2xl font-[500] my-9 max-w-[1010px] mx-auto">
        Advertise your room
      </h1>
      <ManageRoomForm isLoading={mutation.isLoading} mutation={mutation} />
    </div>
  );
};

export default PostAd;
