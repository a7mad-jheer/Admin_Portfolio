import Link from "next/link";
import Logo from "../global/Logo";

export const MainHeader = () => {
  return (
    <div className="fixed flex items-center justify-between top-0 left-0 px-6 h-16 bg-black/40 backdrop-blur-md border-b border-white/10 w-full z-50 shadow-md shadow-white/10">
      <Logo/>

      <div className="text-white flex gap-2">
        <Link href="/login" className="bg-white/10 hover:bg-white/20 text-white  rounded-full py-1.5 px-5 cursor-pointer transition">Login</Link >
        <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-500/50 py-1.5 px-5 rounded-full cursor-pointer transition ">Get Start</Link>
      </div>
    </div>
  );
};
export default MainHeader;
