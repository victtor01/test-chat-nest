import { fontValela } from "@/fonts";

import { FormSignup } from "./siginup-form";
import Link from "next/link";


const Signup = () => {
  return (
    <>
      <header className="w-full flex justify-between p-10">
        <div></div>
        <div
          className="flex gap-5 items-center font-semibold
        text-gray-500"
        >
          <span>já tem uma conta?</span>
          <Link
            href="/auth"
            className="p-3 px-5 bg-indigo-500 opacity-95 hover:opacity-100 shadow-xl 
            shadow-indigo-300 rounded-xl text-white "
          >
            Entrar
          </Link>
        </div>
      </header>
      <div
        className="flex flex-col p-10 gap-5 m-auto shadow-2xl shadow-blue-50 bg-white
      w-full max-w-[28rem] rounded-2xl"
      >
        <header className={`${fontValela}`}>
          <h1 className="font-semibold text-2xl text-gray-800 text-center">
            <span className="text-indigo-500">Olá!</span> É bom ter você
            conosco!
          </h1>
          <h2 className="font-semibold text-md text-gray-500 text-center">
            Preencha algumas informações para registrar-se
          </h2>
        </header>
        <FormSignup />
      </div>
    </>
  );
};

export default Signup;
