import Link from "next/link";
import Image from "next/image";

type projectsType = {
  id:string;
  name: string;
  description: string;
  url: string;
  image: string;
  user_id: string;
  categoryId : number
};

type cardProps = {
  CardData : projectsType
}

export const CardProject = (CardData : cardProps ) => {
  return (
            <div
              key={CardData.CardData.id}
              className="w-full group [perspective:1000px]"
            >
              <div
                className=" md:h-150 h-120  transition-transform group-hover:[transform:rotateX(40deg)]   transform-style-preserve-3d duration-300"
              >
                <div className="relative w-96 h-1/2 md:max-h-[70%] z-10 ">
                  <Image
                    src={CardData.CardData.image}
                    alt=""
                    className="object-cover object-top"
                    fill
                  />
                </div>

                <div className="text-white/60 p-2 space-y-3 bg-black/20 w-sm text-center ">
                  <h1 className=" text-3xl line-clamp-1">{CardData.CardData.name}</h1>
                  <p className="mb-5 h-25">{CardData.CardData.description}</p>
                  <Link
                  className="md:hidden text-red-600 text-md font-semibold "
                  href={CardData.CardData.url}
                >
                  Visit
                </Link>
                </div>

                
              </div>

              <div className="hidden md:block absolute  top-10 left-1/2 -translate-x-1/2 text-center  z-0 ">
                <Link
                  className=" text-white/70 text-xl font-semibold "
                  href={CardData.CardData.url}
                >
                  Go To site
                </Link>
              </div>
            </div>


  );
};

export default CardProject;
