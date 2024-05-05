"use client";

import { socket } from "@/socket";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1),
  password: z.string().min(1),
  repeatPassword: z.string().min(1),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const useFormSignup = () => {
  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const send = async () => {
    console.log('send')
    socket.emit("message", "uma nova mensagem!");
  };

  useEffect(() => {
    socket.on("receive-message", (data: any) => {
      console.log(`mensagem do server: ${data}`);
    });

    /*  
    return () => {
      socket.disconnect();
    }; 
    */
  }, []);

  return {
    send,
  };
};

const FormSignup = () => {
  const { send } = useFormSignup();

  return (
    <form className="flex flex-col gap-5">
      <section className="flex flex-col gap-4">
        <label htmlFor="name" className="flex flex-col gap-1">
          <span className="font-semibold text-sm text-gray-600">Nome</span>
          <input
            type="text"
            id="name"
            className="border rounded-lg p-2
          bg-zinc-50 outline-indigo-400"
            placeholder="example@gmail.com"
          />
        </label>
        <label htmlFor="email" className="flex flex-col gap-1">
          <span className="font-semibold text-sm text-gray-600">Email</span>
          <input
            type="text"
            id="email"
            className="border rounded-lg p-2
          bg-zinc-50 outline-indigo-400"
            placeholder="••••••••••"
          />
        </label>
        <label htmlFor="password" className="flex flex-col gap-1">
          <span className="font-semibold text-sm text-gray-600">Senha</span>
          <input
            type="text"
            id="password"
            className="border rounded-lg p-2
          bg-zinc-50 outline-indigo-400"
            placeholder="••••••••••"
          />
        </label>
        <label htmlFor="confirm-password" className="flex flex-col gap-1">
          <span className="font-semibold text-sm text-gray-600">
            Confirmar senha
          </span>
          <input
            type="text"
            id="confirm-password"
            className="border rounded-lg p-2
          bg-zinc-50 outline-indigo-400"
            placeholder="••••••••••"
          />
        </label>
      </section>
      <footer className="w-full flex">
        <button
          type="button"
          onClick={send}
          className="p-3 w-full shadow-xl bg-indigo-600
            hover:opacity-100 text-white rounded-xl opacity-90"
        >
          Entrar
        </button>
      </footer>
    </form>
  );
};

export { FormSignup };
