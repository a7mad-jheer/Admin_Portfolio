import Image from "next/image";
export const Logo = () => {
  return (
    <div className="relative w-30 md:w-30 h-13 md:m-auto m-0">
      <Image fill src="/LOGO.png" alt="" className="object-cover " />
    </div>
  );
};

export default Logo;
