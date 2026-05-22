"use client"
import Image from "next/image";

type BioDataType = {
  full_name: string;
  job_title: string;
  description: string;
  image: string;
  user_id: string;
};

type props = {
data :BioDataType,
}


export const BioCard = ({data} : props) => {
    return (
        <div className="relative w-full  bg-[hsl(0_0%_10.98%)] border border-gray-800 p-4 rounded-md mt-5 flex flex-col items-center justify-center gap-4">
                <div className="w-56 h-56 relative rounded-full overflow-hidden">
                  <Image alt="$" src={data.image} fill className="object-cover" />
                </div>
        
                <div className="text-center">
                  <h1 className="text-2xl font-semibold ">{data.full_name}</h1>
                  <p className="text-xl text-gray-300">{data.job_title}</p>
                  <p className="text-sm text-gray-300 max-w-xs">
                    {data.description}
                  </p>
                </div>
              </div>
    )
}

export default BioCard;