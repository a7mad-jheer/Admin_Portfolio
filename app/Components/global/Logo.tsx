import Image from "next/image";
export const Logo = () => {
  return (

     <div className="relative h-10 w-20 cursor-pointer hover:opacity-80 transition flex gap-5  rounded-md  z-10 ">
              <Image alt="JheAr" src="/jhear.png" fill className="object-cover text-red-500 p-2 font-bold bg-transparent z-50 " />
            </div>
  );
};

export default Logo;
