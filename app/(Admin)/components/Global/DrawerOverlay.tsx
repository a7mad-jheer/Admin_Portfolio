import { SetStateAction } from "react";
import TitlePanel from "./TitlePanel";
import { IoClose } from "react-icons/io5";
import { useLockScroll } from "@/hook/ui/useLockScroll";

type props = {
  drawerShow: boolean;
  setDrawerShow: React.Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  title: string;
  description: string;
};

export const DrawerOverlay = ({
  drawerShow,
  children,
  setDrawerShow,
  title,
  description,
}: props) => {


  /* hidden Scroll When ShowEdit is true */
  useLockScroll(drawerShow)

  return (
    <>
      {drawerShow && (
        <div
      className={`transform  transition-transform duration-700 ease-in-out fixed  scroll-auto overflow-y-auto z-50 top-0 right-0 w-full md:w-[40%]  h-screen ${drawerShow ? "translate-x-0 " : "translate-x-full"} bg-zinc-900 text-white p-4`}
    >
        <div className="w-full h-full   p-2 ">
          <div className="flex items-center justify-between">
            <TitlePanel title={title} />
          <span
            onClick={() => setDrawerShow(false)}
            className="text-white text-2xl hover:bg-gray-800 hover:scale-105 w-8 h-8 cursor-pointer rounded-full flex items-center justify-center"
          >
            <IoClose />
          </span>
          </div>
          <div className="p-3 border-b border-gray-800 flex items-center justify-between font-semibold ">
            <h1>{description}</h1>
          </div>
          {children}
        </div>
      
    </div>
    )}
    </>
  );
};

export default DrawerOverlay;
