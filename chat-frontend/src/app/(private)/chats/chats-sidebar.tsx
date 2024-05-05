import Link from "next/link";
import { IoPerson } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className="w-full flex flex-col gap-1 bg-transparent">
      <header
        className="p-3 flex gap-2 justify-between
        items-center"
      >
        <div>
          <div
            className="rounded-full w-10 h-10 flex justify-center
          items-center bg-indigo-500 text-white font-semibold"
          >
            J
          </div>
        </div>
        <div>
          <Link
            href="/chats/friends/"
            className="px-2 w-10 h-10 flex justify-center
            items-center font-semibold text-gray-300 rounded-full
            text-sm gap-2 shadow-xl bg-zinc-800"
          >
            <IoPerson size={20} />
          </Link>
        </div>
      </header>
    </div>
  );
};

export { Sidebar };
