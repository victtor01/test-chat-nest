"use client";

import { api } from "@/api";
import Link from "next/link";
import { useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";

const useAddFriend = () => {
  const [userId, setUserId] = useState<string>("");
  const handleUserId = (e: ChangeEvent<HTMLInputElement>) =>
    setUserId(e.target.value);

  const addFriend = async () => {
    const data = { nickname: userId };
    const res = await api.post("/users/friends/add", data);
    console.log(res);
  };

  return {
    userId,
    addFriend,
    handleUserId,
  };
};

const AddFriend = () => {
  const { userId, addFriend, handleUserId } = useAddFriend();

  return (
    <div
      className="bg-white w-auto shadow-lg h-full flex border-b
    border-gray-400 border-opacity-50 z-20 relative m-5 rounded-3xl overflow-hidden"
    >
      <div className="overflow-hidden flex absolute right-0 bottom-0">
        <span
          className="w-[20rem] h-[20rem] bg-indigo-500 rounded-full
        flex translate-x-[50%] translate-y-[50%]"
        ></span>
      </div>

      <div className="overflow-hidden flex absolute left-0 top-0">
        <span
          className="w-[15rem] h-[15rem] bg-indigo-500 rounded-full
        flex translate-x-[-50%] translate-y-[-50%]"
        ></span>
      </div>

      <Link
        href="/chats/friends"
        className="w-12 h-12 bg-zinc-50 rounded-full justify-center
      items-center flex absolute right-4 top-4 text-gray-500"
      >
        <IoClose size={22} />
      </Link>

      <div className="flex m-auto p-12 w-full max-w-[30rem] flex-col gap-6 z-20 backdrop-blur-xl">
        <header className="text-2xl text-gray-700 font-semibold">
          Adicionar um <b className="text-indigo-500">novo amigo!</b>
        </header>
        <section className="flex flex-col gap-4">
          <label htmlFor="link" className="flex flex-col gap-1">
            <span className="text-gray-500 text-md font-semibold">
              Digite o nickname do perfil abaixo.
            </span>
            <input
              type="text"
              id="link"
              value={userId}
              onChange={handleUserId}
              className="w-full p-2 border outline-indigo-500 
              rounded-lg shadow-xl shadow-gray-50"
              placeholder="example-3g52"
            />
          </label>
          <button
            onClick={addFriend}
            type="button"
            className=" p-4 text-white text-center font-semibold
          rounded-xl bg-indigo-600 shadow-lg opacity-90 hover:opacity-100"
          >
            Enviar
          </button>
        </section>
      </div>
    </div>
  );
};

export default AddFriend;
