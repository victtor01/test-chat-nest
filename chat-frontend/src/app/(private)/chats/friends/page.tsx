"use client"

import { api } from "@/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { IoChatbox, IoClose } from "react-icons/io5";

interface Conversation {
  id: string;
  isGroup: boolean;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Friend {
  name: string;
  nickname: string;
  profileId: string;
  conversations: Conversation[];
}

const useFriends = () => {
  const { data: friends } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      return (await api.get("/users/friends"))?.data?.friends;
    },
  });

  return {
    friends,
  };
};

export default function Friends() {
  const { friends } = useFriends();
  return (
    <div
      className="bg-white w-full flex border-b h-auto mt-0
        border-gray-300 border-opacity-50 z-20 flex-col p-2"
    >
      <header className="text-lg flex justify-between items-center gap-2">
        <input
          type="text"
          className="w-full bg-gray-200 rounded-md p-1 px-2 text-[1rem]
            placeholder:text-gray-500 text-gray-600 outline-indigo-500"
          placeholder="Search..."
        />
        <Link
          href="/chats"
          className="opacity-80 hover:opacity-100 p-3 rounded-full bg-zinc-50"
        >
          <IoClose size={22} />
        </Link>
      </header>

      <section className="flex flex-col mt-2">
        {!friends?.[0] && (
          <div
            className="w-full text-gray-600 
            rounded-xl font-semibold"
          >
            Friends not found!
          </div>
        )}

        {friends?.map((friend: Friend, index: number) => {
          return (
            <>
              <div className="w-auto h-[1px] bg-gray-200 mx-3" />
              <section
                className="flex gap-4 p-3
                  hover:border-gray-200 hover:bg-gray-50 border-gray-200
                  items-center justify-between relative rounded-xl"
                key={index}
              >
                <div className="flex gap-4 items-center">
                  <div className="flex justify-center items-center relative">
                    <div
                      className="z-20 grid place-items-center bg-indigo-500 w-9 h-9 
                        text-white rounded-full border-2 border-white"
                    >
                      <span className="">{friend?.name[0]}</span>
                    </div>
                    <span
                      className="bg-indigo-500 absolute w-8 h-8
                        rounded-full flex left-[-0.2rem]"
                    />
                  </div>

                  <div className="flex flex-col leading-5 capitalize">
                    <div className="text-gray-500 font-semibold text-md">
                      {friend?.nickname}
                    </div>
                    <div className="text-gray-400 text-sm">offline</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/chats/${friend?.conversations?.[0]?.id}`}
                    className="text-zinc-800 drop-shadow-sm
                      rounded-full w-10 h-10 opacity-95 hover:opacity-100 grid 
                      place-items-center bg-gray-200 hover:text-zinc-900"
                  >
                    <IoChatbox size={22} />
                  </Link>
                </div>
              </section>
            </>
          );
        })}
      </section>
    </div>
  );
}
