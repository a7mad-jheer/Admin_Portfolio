import { category_Type, projects_Type } from "@/types/types"
import Image from "next/image";
import { Dispatch } from "react";


const defaultProjects : projects_Type[] = [
     {
    id: 1,
    name: "No Project Added",
    description: "No Descriptions Added",
    url: "https://portfolio-demo.com",
    image: "/BreackBreaker.png",
    user_id: "user_101",
    categoryId: 1,
  },
  
]

const categoriesNoData : category_Type[] = [
    {id: 1 , name : "No Categoties" , user_id : "user_101"},
] 

type project_Type = {
  categoryId: number | null;
  description: string | null;
  id: number | null;
  image: string | null;
  name: string | null;
  url: string | null;
};

type props = {
    projects : project_Type[],
    categories : category_Type[],
    setCategoryId : Dispatch<React.SetStateAction<number | null>>;
    setProjectId : Dispatch<React.SetStateAction<number | null>>;
    setShowEdit : Dispatch<React.SetStateAction<boolean>>;
    setShowDelete: Dispatch<React.SetStateAction<boolean>>
}

export const ProjectsTable = ({projects , categories ,setCategoryId ,setProjectId , setShowEdit ,setShowDelete} : props) => {
        const projectsArray = projects.length <= 0 ? defaultProjects : projects
    const categoriesArray = categories.length <= 0 ? categoriesNoData : categories

  return (
    <div className=" overflow-x-auto">
        <table className="text-white bg-[hsl(0_0%_10.98%)] border-gray-800 p-2 border-collapse w-full mt-5">
        <thead >
            <tr>
                <th className="border border-gray-800 p-2">#</th>
                <th className="border border-gray-800 p-2">Image</th>
                <th className="border border-gray-800 p-2">Project</th>
                <th className="border border-gray-800 p-2">Category</th>
                <th className="border border-gray-800 p-2">Description</th>
                <th className="border border-gray-800 p-2">Actions</th>
            </tr>
        </thead>
        
        <tbody>
            {projectsArray && projectsArray.map((project , index) => {
                return (
                    <tr key={project.id}>
                        <td className="border border-gray-800 p-4 text-center">{index + 1}</td>
                        <td className="relative w-10 h-10 border-gray-800 p-4">
                            <Image src={ project.image ?? ""} alt="" fill className="object-cover"/>
                        </td>
                        <td className="border border-gray-800 p-4 ">{project.name}</td>
                        <td className="border border-gray-800 p-4 ">
                            {categoriesArray.map((cat) => {
                                return (
                                    <p key={cat.id} className="">{cat.id === project.categoryId ? cat.name : "" }</p>
                                )
                                
                            })}
                        </td>
                        <td  className="border border-gray-800 p-4">{project.description && project.description.split(" ").length > 6 ? project.description.split(" ").slice(0 ,6).join(" ") + "..." : project.description}</td>
                        <td className="border border-gray-800 p-4">
                            {project.id === 1 ? ("No Actions") : (
                                <div className="flex justify-center gap-2 ">
                        <button
                          onClick={() => {setShowEdit(true); setCategoryId(project.categoryId); setProjectId(project.id)}}
                          className="transfom duration-200 bg-[hsl(154.9_100%_19.22%)] hover:bg-[hsl(154.9_100%_23.22%)] border border-gray-700  p-2  rounded-md cursor-pointer w-1/2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {setShowDelete(true); setProjectId(project.id)}}
                          className="bg-red-800/50 py-2 px-3 rounded-md hover:bg-red-700 font-semibold cursor-pointer w-1/2"
                        >
                          Delete
                        </button>
                      </div>
                            )}
                        </td>
                    </tr>
                )
            })}
        </tbody>
    </table>
    </div>
  )
}

export default ProjectsTable