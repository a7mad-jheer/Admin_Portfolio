"use client";

import { useLoading } from "@/hook/ui/useLoading";
import { useLockScroll } from "@/hook/ui/useLockScroll";

export const RouteLoading = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useLoading();
  
  useLockScroll(loading);


    return (
      <>
      {children}

      {loading && (
        <div className="relative w-full ">
        

        <div className="fixed  top-0 left-0 bottom-0  w-full h-scrren text-white/90 bg-black/30   backdrop-blur-3xl  z-50 ">
          <div className="flex items-center justify-center flex-col gap-1 w-full h-full">
            <div className="h-5 w-5 animate-spin rounded-full border-20  border-white/10 border-t-blue-300" />
          <p className="font-semibold text-2xl ">Loading...</p>
          </div>
        </div>
      </div>
      )}
      </>
    );

};

export default RouteLoading;
