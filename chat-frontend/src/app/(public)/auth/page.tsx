"use client";

import { api } from "@/api";
import { fontValela } from "@/fonts";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

type AuthData = z.infer<typeof authSchema>;

const useAuth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthData>({
    resolver: zodResolver(authSchema),
  });

  const router = useRouter();

  const auth = async (body: AuthData) => {
    const response = await api.post("/auth", {
      email: body.email,
      password: body.password,
    });

    if (response?.data?.access_token) {
      router.push("/chats");
    }

    console.log(response);
  };

  return {
    auth,
    form: {
      register,
      handleSubmit,
    },
  };
};

const Auth = () => {
  const {
    auth,
    form: { register, handleSubmit },
  } = useAuth();
  return (
    <>
      <header className="w-full flex justify-between p-10">
        <div></div>
        <div
          className="flex gap-3 items-center font-semibold
        text-gray-500"
        >
          <span>não tem uma conta?</span>
          <Link
            href="/signup"
            className="p-3 px-5 bg-indigo-600 opacity-95 hover:opacity-100 shadow-xl 
            shadow-indigo-300 rounded-xl text-white "
          >
            Cadastrar-se
          </Link>
        </div>
      </header>
      <form
        onSubmit={handleSubmit(auth)}
        className="flex flex-col p-10 gap-5 m-auto shadow-2xl shadow-blue-50 bg-white
      w-full max-w-[28rem] rounded-2xl"
      >
        <header className={`${fontValela}`}>
          <h1 className="font-semibold text-2xl text-gray-800">
            Bem vindo de volta!
          </h1>
        </header>
        <section className="flex flex-col gap-4">
          <label htmlFor="email" className="flex flex-col gap-1">
            <span className="font-semibold text-sm text-gray-600">Email</span>
            <input
              type="text"
              id="email"
              className="border rounded-lg p-2
            bg-zinc-50 outline-indigo-400"
              placeholder="example@gmail.com"
              {...register("email")}
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
              {...register("password")}
            />
          </label>
          <label htmlFor="logged" className="flex gap-2 px-1">
            <input
              type="checkbox"
              id="logged"
              className="border rounded-lg p-2
            bg-zinc-50 outline-indigo-400"
            />
            <span className="text-gray-500">Continuar logado.</span>
          </label>
        </section>
        <footer className="w-full flex">
          <button
            className="p-3 w-full shadow-xl bg-indigo-600
            hover:opacity-100 text-white rounded-xl opacity-90"
          >
            Entrar
          </button>
        </footer>
      </form>
    </>
  );
};

export default Auth;
