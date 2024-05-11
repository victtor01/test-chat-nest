"use client";

import { socket } from "@/socket";
import { useEffect } from "react";
import { Slide, ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    socket.connect();
    /* socket.emit("connection"); */
    socket.on("notifications", (data) => {
      console.log(data);
      toast(data);
    });

    return () => {
      socket.off("notifications");
      socket.disconnect();
    };
  }, []);

  return (
    <main className="flex flex-col w-full h-screen overflow-auto bg-white">
      {children}
      <ToastContainer
        position="top-right"
        autoClose={1200}
        hideProgressBar={false}
        progressClassName={""}
        limit={3}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        transition={Slide}
        theme={"dark"}
      />
    </main>
  );
}
