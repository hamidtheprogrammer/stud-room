import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { getRoomById } from "../api/ApiCalls";
import { useParams } from "react-router";
import { ManageRoomForm } from "../constants/imports";

const MyRoomDetails = () => {
  const { id } = useParams();
  const { data: room, error } = useQuery({
    queryFn: getRoomById(id),
    queryKey: ["getRoomById"],
  });

  useEffect(() => {
    console.log(room);
  }, [room]);
  return (
    <div className="mb-5 px-5">
      <h1 className="text-2xl font-[500] my-9 max-w-[1010px] mx-auto">
        Update your room
      </h1>
      {room && <ManageRoomForm specificRoom={room} />}
    </div>
  );
};

export default MyRoomDetails;
