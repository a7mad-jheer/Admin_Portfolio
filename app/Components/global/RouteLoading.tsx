"use client";

import { useLoading } from "@/hook/ui/useLoading";

export const RouteLoading = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useLoading();

    return (
      <>
      {children}

      {loading && (
        <div className="relative w-full h-full">
        

        <div className="fixed bottom-5 right-5 text-white/90 bg-black border-2 border-gray-700 w-fit flex items-center px-2 py-0.5 rounded-full gap-2 font-semibold  z-50 ">
          <div className="h-4 w-4 animate-spin rounded-full border-3  border-white/10 border-t-green-500" />
          <p>Loading...</p>
        </div>
      </div>
      )}
      </>
    );

};

export default RouteLoading;
