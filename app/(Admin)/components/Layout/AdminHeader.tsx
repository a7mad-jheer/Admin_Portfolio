"use client";

import MenuIcon from "../Global/MenuIcon";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hook/ui/useToast";
import ToastError from "../Error/ToastError";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useReqStatus } from "@/hook/ui/useReqStatus";

type props = {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AdminHeader = ({ setShowSidebar }: props) => {
  const [logOut, setLogout] = useState<boolean>(false);
  const { loading, fail, success, status } = useReqStatus();
  const router = useRouter();

  const { show, message } = useToast();

  const handleLogout = async () => {
    setLogout(true);

    if (status.loading) return;

    loading();

    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("somthing went error when logout", error);
      fail();
      show("Something went wrong! , please try again later.");
      return;
    }

    success();
    router.push("/login");
    router.refresh();
  };

  return (
    <>
      {logOut && (
        <div className="fixed inset-0  z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-zinc-800 p-5 text-white rounded-md flex flex-col gap-4 min-w-[300px] text-center">
            <h1 className="text-xl font-semibold py-2 mb-3  text-center text-gray-300">
              Are you sure you want to log out?
            </h1>

            <div className="flex items-center gap-2 px-4">
              <button
                onClick={handleLogout}
                className="bg-red-800/50 py-2 px-3 rounded-md hover:bg-red-700 font-semibold cursor-pointer w-1/2"
              >
                {status.loading ? (
                  <div className="flex gap-2 items-center justify-center">
                    <div className="h-4 w-4 animate-spin rounded-full border-3  border-white/10 border-t-green-500" />
                    logging out...
                  </div>
                ) : (
                  "Log out Now"
                )}
              </button>

              <button
                onClick={() => setLogout(false)}
                className="bg-white/20 py-2 px-2 rounded-md hover:bg-gray-600 font-semibold cursor-pointer w-1/2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className="
      fixed
      flex items-center justify-between
      w-full 
      text-white
      px-4
      py-1
      h-16
      bg-[hsl(0,0%,9.02%)] backdrop-blur-md
      top-0 z-50
      border-b
      border-gray-600
      md:border-none
    "
      >
        {message && <ToastError message={message} />}

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <MenuIcon setShowSidebar={setShowSidebar} />

          <span className="text-lg font-semibold hidden sm:block">
            Dashboard
          </span>
        </div>

        {/*       
      <div className="hidden md:flex items-center w-1/3 relative">
        <input
          type="search"
          placeholder="Search..."
          className="
            w-full pl-10 pr-3 py-1
            rounded-full
            bg-white/10
            border border-white/10
            focus:outline-none focus:border-blue-500
            text-sm
          "
        />
        <IoSearchOutline className="absolute left-3 text-gray-400" />
      </div> */}

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          {/* <span className="p-2 rounded-full hover:bg-white/10 cursor-pointer transition">
          <IoIosNotificationsOutline size={22} />
        </span> */}

          <div>
            <button className="px-2 py-1 text-sm rounded-md  bg-[#005f3c] border border-gray-700 cursor-pointer hover:scale-105">
              Upgrade Now
            </button>
          </div>

          {/* Avatar */}
          <div
            onClick={() => setLogout(true)}
            className="rounded-md bg-red-500/60 px-2 py-1 flex items-center justify-center font-semibold cursor-pointer"
          >
            Log Out
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
