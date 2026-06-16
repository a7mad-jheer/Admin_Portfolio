import { bio_Type } from "@/types/types";
import Image from "next/image";

type props = {
  data : bio_Type
}

/*  contain : Image and my name , job and Contanct With Me */
export const 
Hero = ({data} : props) => {
  return (
<div className="flex flex-col md:flex-row-reverse md:gap-8 items-center justify-center md:justify-around  text-center px-4 pt-30">

  {/* Hero Image */}
  <div className="relative md:h-96 md:w-72 h-52 w-52 rounded-full md:rounded-4xl overflow-hidden shadow-2xl shadow-black   " >
    <Image
      fill
      src={`${data?.image ?? "/personCoding.jpg"}`}
      alt=""
      className="object-cover"
    />
  </div>

  {/* Info Card */}
  <div className="space-y-4 text-start mt-10 flex flex-col justify-center items-center  md:justify-start md:items-start ">

    <div className="relative bg-zinc-800 py-1 px-4 text-white text-xs font-semibold rounded-full w-fit hidden md:block"> 
      <span className="absolute top-1/2 left-1 -translate-y-1/2 w-2 h-2 rounded-full bg-green-500 "></span>
      <span>Avilable for a new projects</span>
    </div>

    <span className="text-white/80 text-4xl md:text-5xl font-medium">
      Hi, I{"'"}m
    </span>

    <span className="block bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 bg-clip-text text-transparent text-4xl md:text-5xl font-bold">
      {data?.full_name ?? "John Doe"}
    </span>

    <h2 className="text-lg md:text-2xl font-semibold text-white/90">
      {data?.job_title ?? "Software Engineer"}
    </h2>

    <p className="text-sm md:text-base md:max-w-md max-w-xl  text-white/60 leading-relaxed text-center">
      {data?.description ?? "I build fast, scalable, and accessible web applications with a focus on clean design and seamless user experience. Always exploring new technologies to improve my craft."}
    </p>

    <div className="space-x-3 flex flex-row  items-center text-center gap-3 ">
        <a
          href="https://wa.me/972597752547?text=Hi, I'm contacting you from your portfolio website!"
          className="w-fit bg-white/80 text-black font-semibold px-6 py-3 rounded-full hover:bg-white transition m-0 text-sm"
          target="_blank" rel="noopener noreferrer"
        >
          Contact Me 
        </a>

        <button className="w-fit bg-white/10 text-white px-6 py-3  text-sm rounded-full hover:bg-white/20 transition ">
          <a href="/Portfolio/portfolio_ahmedJh.zip" download>
            DownLoad Portfolio
          </a>
        </button>
      </div>

  </div>
</div>
  );
};

export default Hero;


/* */