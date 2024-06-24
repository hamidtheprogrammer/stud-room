import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { logOutUser } from "../../api/ApiCalls";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

const Logout = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: logOutUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries("authenticate");
      toast.success("Sign out successful");
    },
  });

  return (
    <div
      className={` hover:text-blue-600 cursor-pointer`}
      onClick={() => {
        mutation.mutate();
      }}
    >
      Logout
    </div>
  );
};

export default Logout;
