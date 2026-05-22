import Link from "next/link";
import Image from "next/image";
import { projects_Type } from "@/types/types";

type cardProps = {
  CardData: projects_Type;
};

export const CardProject = ({ CardData }: cardProps) => {
  return (
    <div className="w-full group [perspective:1000px] rounded-xl overflow-hidden">
      <div className=" md:h-150 h-120  transition-transform group-hover:[transform:rotateX(40deg)]   transform-style-preserve-3d duration-300">
        <div className="relative w-96 h-1/2 md:max-h-[70%] z-10  bg-zinc-900">
          <Image
            src={CardData.image}
            alt=""
            className="object-cover object-top"
            fill
          />
        </div>

        <div className="text-white/60 p-2 space-y-3 bg-black/20 w-sm text-center ">
          <h1 className=" text-3xl line-clamp-1">{CardData.name}</h1>
          <p className="mb-5 h-25">{CardData.description}</p>
          <Link
            href={CardData.url}
            className="md:hidden mt-auto inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-red-500/70 to-transparent px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30 active:scale-95"
          >
            {" "}
            Visit <span className="text-white/80">→</span>{" "}
          </Link>
        </div>
      </div>

      <div className="hidden md:block absolute top-10 left-1/2 -translate-x-1/2 z-0">
        <Link
          href={CardData.url}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 
    bg-white/5 px-5 py-2 text-sm font-medium text-white/70 
    backdrop-blur-md transition-all duration-300
    hover:scale-105 hover:bg-white/10 hover:text-white"
        >
          View Project
          <span className="text-white/50">↗</span>
        </Link>
      </div>
    </div>
  );
};

export default CardProject;
