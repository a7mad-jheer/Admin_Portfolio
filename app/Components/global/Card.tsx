import { skills_Type } from "@/types/types";

type props = {
  data : skills_Type[]
} 

export const Card = ({data} : props) => {
  return (
 
    <div className="flex flex-col gap-3  md:flex-row md:flex-wrap justify-center items-center">
        {data && data.map((item) => {
            return (
      <div
      key={item.id}
        className={` bg-gradient-to-r from-white/30 to-purple-950 backdrop-blur-2xl text-purple-100 text-xl  rounded-4xl md:py-4 py-3 text-center duration-400  sm:w-80 w-full`}>
        <h2 className=" md:text-2xl text-xl  ">{item.name}</h2>
      </div>
            )
        }   )}
    </div>

  );
};

export default Card;
