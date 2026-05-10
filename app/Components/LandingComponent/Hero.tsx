import { bio_Type } from "@/types/types";
import Image from "next/image";

type props = {
  data : bio_Type
}

/*  contain : Image and my name , job and Contanct With Me */
export const Hero = ({data} : props) => {
  return (
    <div className="flex flex-col items-center gap-2  p-10 rounded-sm pt-30 ">
      {/* Hero Image */}
      <div className="relative md:h-70 md:w-70 h-50 w-50  rounded-full overflow-hidden shadow-2xl shadow-amber-50/20 mb-10">

        <Image fill src={`${data.image}`} alt="" className="object-cover " />
      </div>

      {/* Info Card */}
      <div className=" rounded-3xl  space-y-3 text-center ">
        <h1 className="md:text-5xl text-2xl font-semibold text-white">{data.full_name}</h1>
        <h2 className="md:text-3xl text-xl font-semibold text-white/90">
          {data.job_title}
        </h2>
        <p className="md:text-md text-sm  max-w-100 text-white/60">
          {data.description}
        </p>
        
      </div>
      </div>
  );
};

export default Hero;
