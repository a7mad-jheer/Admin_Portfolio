import { GrProjects } from "react-icons/gr";
import { GiTechnoHeart } from "react-icons/gi";
import { GiSkills } from "react-icons/gi";
import { FaLink } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";

type props = {
  projects: number;
  technologies: number;
  tools: number;
  categories: number;
  social: number;
};

export const OverviewCard = async ({
  projects,
  technologies,
  tools,
  categories,
  social,
}: props) => {
  const cardInfo = [
    { id: 0, name: "Projects", count: projects, icon: GrProjects , emptyMessage : "Start adding projects"},
    { id: 1, name: "Technologies", count: technologies, icon: GiTechnoHeart ,emptyMessage: "Add your technologies" },
    { id: 2, name: "Tools", count: tools, icon: GiSkills, emptyMessage: "Add your favorite tools" },
    { id: 3, name: "Social Media Link", count: social, icon: FaLink, emptyMessage: "Add social links" },
    { id: 4, name: "Categories", count: categories, icon: MdCategory, emptyMessage: "Create categories" },
  ];

  return (
    <div className="">
      <h1 className="text-xl my-5 font-semibold">Status Cards</h1>

      <div className="grid grid-cols-12 gap-5">
        {cardInfo.map((info) => {
          const isEmpty = info.count === 0;
          return (
            <div
              key={info.id}
              className="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3"
            >
              <div className={`flex gap-5 items-center border py-5 px-7 transition-all duration-300 rounded-xl ${
                    isEmpty
                      ? "border-dashed border-gray-700 bg-zinc-900/40"
                      : "border-gray-800 bg-[hsl(0_0%_10.98%)] hover:border-gray-600"
                  }`}>
                <span className={`text-5xl ${
                    isEmpty ? "text-gray-500" : "text-white"
                  }`}>
                  <info.icon />
                </span>
                <div className="flex flex-col text-sm font-semibold">
                  <span>{info.count}</span>
                  <span>{info.name}</span>

                  {isEmpty && (
                    <span className="text-xs text-gray-400 mt-1">
                      {info.emptyMessage}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OverviewCard;
