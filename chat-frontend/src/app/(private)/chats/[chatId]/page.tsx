"use client";

import { Message } from "@/entities/message";
import { socket } from "@/socket";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoArrowBack, IoSend } from "react-icons/io5";

interface Params {
  params: {
    chatId: string;
  };
}

const useChat = (chatId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);

  /* useEffect(() => {
    socket.on(chatId, (data: Message) => {
      setMessages((prev: Message[]) => [...prev, data]);
    });

    return () => {
      socket.off(chatId);
    };
  }, []); */

  const send = async () => {
    /* socket.emit("send_message", {
      message: "example",
      receiverId: chatId,
    }); */
  };

  return {
    messages,
    send,
  };
};

function Chat({ params }: Params) {
  const { messages, send } = useChat(params.chatId);
  console.log(messages);
  return (
    <section
      className="bg-blue-50 shadow-2xl shadow-zinc-800 m-7 rounded-2xl flex-1 flex 
      flex-col p-10 gap-3 z-10"
    >
      <header className="w-full flex justify-between">
        <Link
          href="/"
          className="w-11 h-11 grid place-items-center 
          rounded-full bg-white shadow"
        >
          <IoArrowBack />
        </Link>
        <div
          className="text-gray-500 
            font-semibold text-2xl"
        >
          jonh kley
        </div>
      </header>
      <section
        className="flex-1 flex w-full h-auto
        rounded-xl border bg-white flex-col"
      >
        {messages?.map((message: Message) => {
          const className =
            message.receiverId === params.chatId ? "flex-end" : "flex-start";

          return <div className={`${className}`}>{message.message}</div>;
        })}
      </section>
      <footer className="flex w-full gap-4 items-center">
        <input
          type="text"
          className="flex-1 flex p-3 px-4 rounded-full 
        bg-white shadow outline-indigo-500"
          placeholder="Digite algo aqui..."
        />
        <button
          type="button"
          onClick={send}
          className="w-12 h-12 rounded-full text-white
          bg-indigo-500 shadow grid place-items-center"
        >
          <IoSend />
        </button>
      </footer>
    </section>
  );
}

export default Chat;
