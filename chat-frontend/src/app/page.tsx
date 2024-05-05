import { fontOpenSans } from "@/fonts";
import Link from "next/link";

export default function Home() {
  return (
    <main
      className="flex h-screen overflow-auto w-full bg-gray-50 
    text-gray-600 flex-col items-center justify-between"
    >
      <header className="w-full border-b min-h-[25rem] bg-white p-2 pb-10 flex flex-col 
      border-gray-200">
        <div
          className="w-full max-w-[60rem] flex flex-col justify-between 
        mx-auto flex-1"
        >
          <div className="flex justify-between w-full">
            <h1
              className="font-semibold text-gray-700 text-lg p-1
            border rounded-xl border-gray-200 px-4 shadow-lg 
            shadow-gray-100 items-center flex"
            >
              Mychat
            </h1>
            <div
              className="text-gray-500 text-md items-center
            border rounded-xl border-gray-200 px-1 shadow-md flex
            shadow-gray-100 gap-2 p-1"
            >
              <Link href="/auth" className="px-4">
                Login
              </Link>
              <Link
                href="/"
                className="text-white bg-gradient-45 from-purple-500 via-blue-600 
              to-indigo-500 rounded-lg p-2 px-3 opacity-95 hover:opacity-100"
              >
                Registrar-se
              </Link>
            </div>
          </div>

          <div className={`flex flex-col  w-[50%] justify-between gap-2 py-4`}>
            <h1
              className="text-[2.5rem] leading-[2.6rem] font-semibold 
            text-gray-700"
            >
              Bem vindo ao melhor{" "}
              <span
                className=" bg-clip-text bg-gradient-45 from-purple-600 
              to-blue-600 text-transparent"
              >
                Chat online
              </span>{" "}
              do BR
            </h1>
            <h2 className="text-[1.4rem] leading-[1.6rem] font-semibold">
              Converse com os seus amigos em tempo real!
            </h2>
            <div>
              <button
                className="bg-gradient-45 from-purple-600 to-cyan-500 
              p-2 px-4 rounded-lg text-white shadow-xl shadow-gray-300
              hover:translate-y-[-2px] transition-all"
              >
                Começe agora!
              </button>
            </div>
          </div>
        </div>
      </header>
    </main>
  );
}
