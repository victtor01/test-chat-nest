export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen overflow-auto flex ">
     {/*  <div className="overflow-hidden flex absolute right-0 bottom-0">
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
      </div> */}
      {children}
    </div>
  );
}
