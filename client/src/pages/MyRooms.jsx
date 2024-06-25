import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { myRooms } from "../api/ApiCalls";
import { Link } from "react-router-dom";

const MyRooms = () => {
  const { data: rooms, error } = useQuery({
    queryFn: myRooms,
    queryKey: ["getmyrooms"],
  });

  return (
    <div>
      <header className="p-6 border-b-[1px]">
        <h1 className="text-2xl font-bold ">My Rooms</h1>
      </header>
      <main className="py-10 px-5">
        {rooms ? (
          <ul className="flxColStart max-w-[1010px] mx-auto">
            {rooms?.map((room) => (
              <li key={room._id}>
                <div className="flxRowStart gap-4">
                  <img
                    className="aspect-square max-h-[10rem]"
                    src={room.imageUrl[0].url}
                    alt="room-image"
                  />
                  <h1>{room.title}</h1>
                  <ul className="flxColStart">
                    {room.rooms.map((eachRoom) => (
                      <li key={eachRoom._id} className="flxRowStart">
                        <p>{eachRoom.type}</p>
                        <p>{eachRoom.price}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <aside>{room.description}</aside>
                <Link to={`my-rooms/${room._id}`} className="hover:underline">
                  view details
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div>No rooms found</div>
        )}
      </main>
    </div>
  );
};

export default MyRooms;
