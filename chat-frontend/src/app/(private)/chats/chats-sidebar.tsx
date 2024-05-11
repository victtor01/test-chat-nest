"use client";

import { api } from "@/api";
import { Conversation } from "@/entities/conversation";
import { fontOpenSans } from "@/fonts";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoPerson } from "react-icons/io5";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import Cookies from "js-cookie";
import { useProfile } from "@/app/hooks/use-profile";

const useSidebar = () => {
  const { data: conversations } = useQuery<Conversation[]>({
    queryKey: ["conversations"],
    queryFn: async () => {
      return (await api.get("/conversations"))?.data;
    },
  });

  const { useInformations } = useProfile();
  const { profile } = useInformations();

  conversations?.forEach((conversation) => {
    if (!conversation?.isGroup) {
      const user = conversation?.users?.filter(
        (user) => user?.profileId !== profile?.id
      );

      conversation.name = user?.[0]?.nickname;
    }
  });

  return {
    nickname: profile?.nickname,
    conversations,
  };
};

const Sidebar = () => {
  const { conversations, nickname } = useSidebar();
  const pathname = usePathname();

  return (
    <div className="w-full flex flex-1 h-full bg-zinc-100">
      <header
        className="p-3 flex flex-col gap-4
        items-center h-full bg-gray-100"
      >
        <div>
          <div
            className="rounded-full w-12 h-12 flex justify-center
          items-center bg-white text-gray-700 text-lg font-semibold"
          >
            {nickname?.[0]}
          </div>
        </div>
        <div>
          <Link
            href="/chats/friends/"
            className="px-2 w-12 h-12 flex justify-center hover:text-white
            items-center font-semibold text-gray-700 rounded-[100%] hover:bg-indigo-600
            text-sm gap-2 bg-white hover:rounded-2xl transition-all"
          >
            <IoPerson size={20} />
          </Link>
        </div>
      </header>
      <section
        className="flex flex-1 w-full h-full flex-col rounded-xl bg-gray-50 p-3
      gap-2"
      >
        <div className="w-full flex">
          <input
            type="text"
            className="border bg-white rounded-md p-2 w-full
            text-sm"
            placeholder="Search for friend..."
          />
        </div>
        <div className="w-full flex">
          <Link
            href={"/chats"}
            className="bg-white p-2 rounded-lg text-gray-700 flex items-center gap-3
            w-full text-md opacity-95 hover:opacity-100 border
            hover:border-transparent hover:shadow-xl"
          >
            <MdOutlineLocalGroceryStore size={22} />
            Store
          </Link>
        </div>
        {conversations?.map((conversation, index: number) => {
          const selected = pathname.includes(conversation.id);
          const selectedClass = selected ? "bg-gray-200" : "bg-transparent";

          return (
            <Link
              key={index}
              href={`/chats/${conversation.id}`}
              className={`p-2 rounded-md flex gap-2 w-full items-center
              ${selectedClass}`}
            >
              <div
                className="w-9 h-9 bg-indigo-500 rounded-[100%]
              grid place-items-center capitalize text-white font-semibold"
              >
                <span className={fontOpenSans}>{conversation?.name?.[0]}</span>
              </div>
              <div className="flex flex-col text-gray-700 text-md font-semibold">
                <span className={fontOpenSans}>{conversation?.name}</span>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export { Sidebar };
