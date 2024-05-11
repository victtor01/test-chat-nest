"use client";

import { api } from "@/api";
import { queryClient } from "@/components/query-provider";
import { FriendsRequests } from "@/entities/friendsRequests";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { TbPointFilled } from "react-icons/tb";

const usePending = () => {
  const { data: requets } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      return (await api.get("/friendsRequests")).data;
    },
  });

  const decline = async (id: string) => {
    const response = await api.delete(`/friendsRequests/decline/${id}`);
    console.log(response);
    queryClient.refetchQueries({
      queryKey: ["requests"],
    });
  };

  const accept = async (id: string) => {
    const response = await api.put(`/friendsRequests/accept/${id}`);
    queryClient.refetchQueries({
      queryKey: ["requests", "friends"],
    });
  };

  return {
    accept,
    requets,
    decline,
  };
};

function Pending() {
  const { accept, requets, decline } = usePending();

  return (
    <div
      className="bg-white w-full flex border-b
         border-gray-300 border-opacity-50 z-20 flex-col p-4 gap-4"
    >
      <header className="text-lg flex justify-between items-center">
        <div className="text-gray-700 text-xl font-semibold">Requests</div>
      </header>
      <section className="flex flex-col gap-5">
        {!requets?.[0] && (
          <div
            className="w-full text-gray-600 
                rounded-xl font-semibold"
          >
            Requests not found!
          </div>
        )}

        {requets?.map((request: FriendsRequests, index: number) => {
          return (
            <section
              key={index}
              className="flex gap-4 p-3 rounded-2xl hover:bg-gray-50
              items-center justify-between hover:shadow-md"
            >
              <div className="flex gap-4 items-center">
                <div
                  className="flex justify-center items-center rounded-full bg-indigo-500 
                    w-10 h-10 text-white offon before:bg-emerald-500"
                >
                  {request?.sender?.name[0]}
                </div>
                <div className="text-gray-600 font-semibold">
                  {request?.sender?.name}
                </div>
                <TbPointFilled size="18" className="text-gray-400" />
                <div className="text-gray-600 font-semibold">
                  {request?.sender?.email}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => accept(request?.id)}
                  className="bg-indigo-500 text-white rounded-xl p-2 px-4
                    opacity-95 hover:opacity-100 hover:shadow-xl"
                >
                  Accept
                </button>
                <button
                  type="button"
                  onClick={() => decline(request?.id)}
                  className="bg-rose-600 text-white rounded-xl p-2 px-4
                    opacity-95 hover:opacity-100 hover:shadow-xl"
                >
                  Decline
                </button>
              </div>
            </section>
          );
        })}
        <div className="flex">
          <Link
            href={"/chats/friends/add"}
            className="p-2 px-4 hover:shadow-xl rounded-xl hover:text-white 
                hover:bg-indigo-600  hover:border-transparent
                text-gray-900 border shadow-gray-200 opacity-95
                hover:opacity-100"
          >
            Accept all
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Pending;
