"use client";

import { api } from "@/api";
import { queryClient } from "@/components/query-provider";
import { FriendsRequests } from "@/entities/friendsRequests";
import { User } from "@/entities/user";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { IoChatbox, IoClose } from "react-icons/io5";
import { TbPointFilled } from "react-icons/tb";

const useFriends = () => {
  const { data: friends } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      return (await api.get("/users/friends"))?.data?.friends;
    },
  });

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
    console.log(response);
    queryClient.refetchQueries({
      queryKey: ["requests", "friends"],
    });
  };

  return {
    friends,
    requets,
    accept,
    decline,
  };
};

export default function Friends() {
  const { friends, accept, requets, decline } = useFriends();
  return (
    <div className="flex flex-col gap-2 p-4">
      <div
        className="bg-white w-full shadow-md flex border-b h-auto
        border-gray-300 border-opacity-50 z-20 flex-col p-4 gap-4 rounded-2xl"
      >
        <header className="text-lg flex justify-between items-center">
          <div className="text-gray-700 text-xl font-semibold">My friends</div>
          <Link
            href="/chats"
            className="opacity-80 hover:opacity-100 p-3 rounded-full bg-zinc-50"
          >
            <IoClose size={22} />
          </Link>
        </header>
        <section className="flex flex-col gap-5">
          {!friends?.[0] && (
            <div
              className="w-full text-gray-600 
            rounded-xl font-semibold"
            >
              Friends not found!
            </div>
          )}

          {friends?.map((friend: any) => {
            return (
              <section
                className="flex gap-4 p-3 rounded-2xl hover:bg-gray-50
              items-center justify-between hover:shadow-md relative"
              >
                <div className="flex gap-4 items-center">
                  <div className="flex justify-center items-center relative">
                    <div
                      className="z-20 grid place-items-center bg-indigo-500 w-10 h-10 
                    text-white offon before:bg-emerald-500 rounded-full border-2 border-white"
                    >
                      <span className="">{friend?.name[0]}</span>
                    </div>
                    <span
                      className="bg-indigo-500 absolute w-9 h-9
                    rounded-full flex left-[-0.2rem]"
                    />
                  </div>

                  <div className="flex flex-col leading-5 capitalize">
                    <span
                      className=" px-2 text-sm p-1 font-semibold
                    bg-indigo-50 rounded-lg text-gray-500"
                    >
                      nickname
                    </span>
                    <div className="text-gray-600 font-semibold text-md">
                      {friend?.profile?.nickname}
                    </div>
                  </div>

                  <TbPointFilled size="18" className="text-gray-400" />

                  <div className="flex flex-col leading-5 capitalize">
                    <span
                      className=" px-2 text-sm p-1 font-semibold
                    bg-indigo-50 rounded-lg text-gray-500"
                    >
                      nickname
                    </span>
                    <div className="text-gray-600 font-semibold text-md">
                      {friend?.name}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/chats/${friend.id}`}
                    className="text-zinc-500 drop-shadow-sm hover:text-indigo-600 
                    rounded-xl w-9 h-9 opacity-95 hover:opacity-100 grid 
                    place-items-center"
                  >
                    <IoChatbox size={22} />
                  </Link>
                </div>
              </section>
            );
          })}
          <div className="flex">
            <Link
              href={"/chats/friends/add"}
              className="p-3 px-5 shadow-xl rounded-xl text-white 
                bg-indigo-600 shadow-gray-200 opacity-95
                hover:opacity-100"
            >
              Add new friend
            </Link>
          </div>
        </section>
      </div>

      <div className="overflow-hidden flex absolute top-0 left-0">
        <span
          className="w-[15rem] h-[15rem] bg-indigo-500 rounded-full
        flex translate-x-[-50%] translate-y-[-50%]"
        ></span>
      </div>

      <div className="overflow-hidden flex absolute bottom-0 right-0">
        <span
          className="w-[15rem] h-[15rem] bg-indigo-500 rounded-full
        flex translate-x-[50%] translate-y-[50%]"
        ></span>
      </div>

      <div
        className="bg-white w-full shadow-md flex border-b
         border-gray-300 border-opacity-50 z-20 flex-col p-4 gap-4 rounded-2xl"
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

          {requets?.map((request: FriendsRequests) => {
            return (
              <section
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
              className="p-3 px-5 shadow-xl rounded-xl text-white 
            bg-indigo-600 shadow-gray-200 opacity-95
            hover:opacity-100"
            >
              accept all
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
