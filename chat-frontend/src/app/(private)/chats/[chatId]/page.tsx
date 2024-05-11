"use client";

import { api } from "@/api";
import { useProfile } from "@/app/hooks/use-profile";
import { queryClient } from "@/components/query-provider";
import { Conversation } from "@/entities/conversation";
import { Message } from "@/entities/message";
import { fontInter } from "@/fonts";
import { socket } from "@/socket";
import { useQuery } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import Link from "next/link";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoArrowBack, IoSend } from "react-icons/io5";
import { number } from "zod";

interface Params {
  params: {
    chatId: string;
  };
}

const organizeMessages = (
  messages: Message[]
): { date: string; messages: Message[] }[] => {
  const messagesByDate: { [date: string]: Message[] } = {};

  messages?.forEach((message) => {
    const messageDate = dayjs(message?.createdAt).format("YYYY-MM-DD");

    if (!messagesByDate[messageDate]) {
      messagesByDate[messageDate] = [];
    }

    messagesByDate[messageDate].push(message);
  });

  const organizedMessages: { date: string; messages: Message[] }[] =
    Object.keys(messagesByDate).map((date) => ({
      date,
      messages: messagesByDate[date],
    }));

  return organizedMessages;
};

const useChat = (chatId: string) => {
  const refInput = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { useInformations } = useProfile();

  const setMessageReloadQueryData = useCallback((message: any) => {
    queryClient.setQueryData(["conversation", chatId], (data: any) => {
      const prevMessages = data.messages || [];
      const updatedMessages = [...prevMessages, message];
      return { ...data, messages: [...updatedMessages] };
    });
  }, []);

  const scrollToBottom = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollTo({
        top: sectionRef.current.scrollHeight,
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [sectionRef?.current]);

  useEffect(() => {
    socket.emit("joinRoom", chatId);

    socket.on("message", (message: Message) => {
      setMessageReloadQueryData(message);
    });

    return () => {
      socket.off("message");
      socket.off("joinRoom");
    };
  }, []);

  const { data: conversation } = useQuery<Conversation>({
    queryKey: ["conversation", chatId],
    queryFn: async () => {
      return (await api.get(`/conversations/${chatId}`))?.data;
    },
  });

  const { profile } = useInformations();
  const chatName =
    !conversation?.isGroup && profile
      ? conversation?.users?.filter(
          (user) => user?.profileId !== profile?.id
        )?.[0]?.nickname
      : conversation?.name;

  const send = async () => {
    if (!refInput?.current?.value) return;

    const message = refInput.current.value;

    await api.post("/messages", {
      chatId: chatId,
      message,
    });
  };

  return {
    refInput,
    scrollToBottom,
    chatName,
    conversation,
    sectionRef,
    send,
  };
};

function Chat({ params }: Params) {
  const { conversation, chatName, scrollToBottom, sectionRef, refInput, send } =
    useChat(params.chatId);

  return (
    <section
      className="bg-gradient-45 bg-white flex-1 flex 
      flex-col z-10 w-full mx-auto"
    >
      <header
        className="w-full flex justify-between border-b p-2 items-center
      pr-4"
      >
        <div className="text-gray-600 text-xs flex gap-2 items-center">
          <div
            className="w-6 h-6 bg-indigo-500 rounded-[100%] grid place-items-center
          text-white"
          >
            {chatName && chatName[0]}
          </div>
          <span className="text-lg">

          {chatName && chatName}
          </span>
        </div>
      </header>
      
      <div
        ref={sectionRef}
        className="flex-1 flex w-full h-auto overflow-auto
        flex-col p-1"
      >
        {conversation?.messages &&
          organizeMessages(conversation?.messages)?.map(
            (day, index: number) => (
              <>
                <div className="flex w-full gap-3 items-center">
                  <span className="flex-1 w-full h-[1px] bg-zinc-200" />
                  <span className="text-gray-400">{day?.date}</span>
                  <span className="flex-1 w-full h-[1px] bg-zinc-200" />
                </div>
                {day?.messages?.map((message: Message, index: number) => {
                  const continueMessage =
                    day?.messages?.[index - 1]?.senderId === message?.senderId;

                  const className = !continueMessage ? "mt-4" : "m-0";
                  return (
                    <div
                      className={`flex flex-col gap-2 hover:bg-zinc-50 px-2 ${className}`}
                      key={index}
                    >
                      <div className={`p-0 rounded-lg px-3 flex gap-3`}>
                        {!continueMessage ? (
                          <div
                            className="w-9 h-9 bg-indigo-500 rounded-[100%]
                      grid place-items-center text-white"
                          >
                            <span>{message?.sender?.nickname?.[0]}</span>
                          </div>
                        ) : (
                          <div className="w-9" />
                        )}

                        <div className="flex flex-col justify-between">
                          {!continueMessage && (
                            <div className={`flex gap-2 items-center`}>
                              <span
                                className="text-sm font-semibold 
                          capitalize text-zinc-600"
                              >
                                {message?.sender?.nickname}
                              </span>
                              <span className="text-xs text-gray-400">
                                {dayjs(message?.createdAt).format(
                                  "YYYY/MM/DD [at] HH:mm"
                                )}
                              </span>
                            </div>
                          )}

                          <span className="text-gray-500 text-md">
                            {message.text}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )
          )}
      </div>
      <footer className="flex w-full gap-4 items-center px-2 pb-2 relative">
        <button
          className="bg-white absolute w-12 h-12 bottom-[4rem] right-4
        rounded-[100%] text-gray-600 grid place-items-center border"
          type="button"
          onClick={scrollToBottom}
        >
          <IoIosArrowDown size={25} />
        </button>
        <input
          type="text"
          ref={refInput}
          className="flex-1 flex p-3 px-4 rounded-xl 
          bg-white border outline-indigo-500"
          placeholder="Digite algo aqui..."
        />
        <button
          type="button"
          onClick={send}
          className="w-12 h-12 rounded-xl text-white
          bg-indigo-500 grid place-items-center"
        >
          <IoSend />
        </button>
      </footer>
    </section>
  );
}

export default Chat;
