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
      <div className="fixed">
        <div
          className="w-[120vh] h-[120vh] bg-gradient-45 from-purple-500 to-indigo-500 
        rotate-45 translate-x-[-70vh]
        translate-y-[-20rem] z-[-1] rounded-[30%]"
        />
      </div>
      <div className="fixed right-0 top-0 ">
        <div
          className="w-[120vh] h-[120vh] bg-gradient-45 from-purple-500 to-indigo-500 
        rotate-45 translate-x-[70vh] translate-y-[30rem] z-[-1] rounded-[40%]"
        />
      </div>
 
      <header className="w-full flex justify-between p-10 z-10">
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
        className="flex flex-col p-10 gap-5 m-auto shadow bg-white
      w-full max-w-[28rem] rounded-2xl z-10"
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
              className="rounded-lg p-2
              bg-white outline-indigo-400 border"
              placeholder="example@gmail.com"
              {...register("email")}
            />
          </label>
          <label htmlFor="password" className="flex flex-col gap-1">
            <span className="font-semibold text-sm text-gray-600">Senha</span>
            <input
              type="text"
              id="password"
              className="rounded-lg p-2
              bg-white outline-indigo-400 border"
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
            className="p-3 w-full bg-indigo-600 hover:text-white hover:shadow-xl
            font-semibold hover:opacity-100 rounded-xl opacity-90 text-gray-100"
          >
            Entrar
          </button>
        </footer>
      </form>
    </>
  );
};

export default Auth;
