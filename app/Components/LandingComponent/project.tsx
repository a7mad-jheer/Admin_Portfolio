import Title from "../global/Title";
import Description from "../global/Description";
import CardProject from "../global/CardProject";
import { category_Type, projects_Type } from "@/types/types";

type projectsProps = {
  user_id: string | null;
  isOwner: boolean | null;
  projectsData: projects_Type[];
  categoriesData: category_Type[];
};


const defaultCategories: category_Type[] = [
  { id: 1, name: "Uncategorized", user_id: "default" },
];

const defaultProject: projects_Type[] = [
  {
  id: 1,
  name: "Your First Project",
  description:
    "Add your amazing projects here! This is a sample project showcasing modern web development with clean UI, responsive design, and great user experience.",
  url: "#",
  image: "/PersonalProject1.png",
  user_id: "default",
  categoryId: 1,
},
{
  id: 2,
  name: "You Second Project",
  description:
    "Add your amazing projects here! This is a sample project showcasing modern web development with clean UI, responsive design, and great user experience.",
  url: "#",
  image: "/CodeSpaceInvades.png",
  user_id: "default",
  categoryId: 1,
}
];

export const Project = ({ projectsData, categoriesData }: projectsProps) => {

  const categories = categoriesData?.length > 0 ? categoriesData : defaultCategories;
  const projects = projectsData?.length > 0 ? projectsData : defaultProject;

  console.log("Projects Data:", projects);
  console.log("Categories Data:", categories);

  
  return (
    <div className=" md:my-20 md:py-20 p-10  ">
      <Title text="My Projects" />
          {categories.map((cat) => {
            return (
              <div key={cat.id} >
                <div className="w-full text-cetner">
                  <Description text={cat.name} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center  ">
                  {projects
                    .filter(
                      (p) =>
                        p.categoryId &&
                        cat.id &&
                        Number(p.categoryId) === Number(cat.id),
                    )
                    .map((project) => {
                      return (
                        <div
                          key={project.id}
                        >
                          <CardProject CardData={project} />
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        
    </div>
  );
};

export default Project;
