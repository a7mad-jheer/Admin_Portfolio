import Link from "next/link";
import Image from "next/image";
import { projects_Type } from "@/types/types";

type cardProps = {
  CardData: projects_Type;
};

export const CardProject = ({ CardData }: cardProps) => {
  return (
    <div className="overflow-hidden bg-zinc-800 flex flex-col mb-10 rounded-md">
      {/*Image From Data */}
      <div className="relative w-full h-72">
        <Image src={CardData.image} alt="Your image not exist" fill className="object-cover "/>
      </div>

      {/* Card Info */}
      <div className="p-5 space-y-2" >
        <h1 className="text-white text-center font-semibold text-xl">{CardData.name}</h1>
        <p className="text-gray-500 text-center w-xs text-sm">{CardData.description}</p>
      </div>

      <Link href={CardData.url} className="bg-white w-fit m-auto my-5 py-1 px-3 rounded-md font-semibold hover:bg-white/50 ">
        visit 
      </Link>
    </div>
  );
};

export default CardProject;

