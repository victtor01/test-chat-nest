"use client";

import Link from "next/link";
import { SiWechat } from "react-icons/si";

export function Header() {
  return (
    <div
      className={`w-full flex bg-white text-md justify-between
        shadow text-gray-500 p-2 gap-2 items-center z-30`}
    >
      <div className="gap-2 flex">
        <Link href={"#"} className="px-2 border rounded-md">
          All
        </Link>
        <Link href={"#"} className="px-2 border rounded-md">
          Pending
        </Link>
        <Link
          href={"/chats/friends/add"}
          className="px-4 text-white bg-gradient-to-r from-indigo-500 to-blue-500
            rounded opacity-95 hover:opacity-100 items-center flex"
        >
          Add friend
        </Link>
      </div>
      <div className="gap-2 flex">
        <Link href={"#"} className="flex gap-2 text-gray-500
        items-center border px-2 rounded-md">
          <SiWechat />
          Group
        </Link>
      </div>
    </div>
  );
}
