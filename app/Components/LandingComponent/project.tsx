
import Title from "../global/Title";
import Description from "../global/Description";
import CardProject from "../global/CardProject";
import { category_Type, projects_Type } from "@/types/types";



 type projectsProps = {
    user_id : string | null,
    isOwner : boolean | null,
    projectsData :projects_Type[]
    categoriesData : category_Type[]
  }


export const Project = ({projectsData , categoriesData} : projectsProps) => {



  return (
    <div className=" md:my-20 md:py-20 py-10  border-y-2 ">
      <Title text="My Projects" />

      {categoriesData.map((cat) => {
        return (
          <div key={cat.id}>
            <Description text={cat.name} />

            <div className="grid  justify-items-center grid-cols-12 ">
              {projectsData.filter((p) => p.categoryId && cat.id && Number(p.categoryId) === Number(cat.id))
              .map((project) => {
                return (
                  <div key={project.id} className="col-span-12 md:col-span-6">
                    <CardProject CardData={project} />
                  </div>
                )
              })
            }
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default Project;
