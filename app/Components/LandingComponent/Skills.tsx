import Card from "../global/Card"
import Title from "../global/Title" 
import Description from "../global/Description";
import { skills_Type } from "@/types/types";

type props = {
    tecnologyiesData : skills_Type[],
    toolsData : skills_Type[]
}

// const technology : SkillsData[] = [
//     {id:0 , name : "HTML 5" , color : "bg-orange-500/40 text-orange-100 hover:bg-orange-500"},
//     {id:1 , name : "CSS 3" , color : "bg-blue-500/40 text-blue-100 hover:bg-blue-500"},
//     {id:2 , name : "BOOTSTRAP" , color : "bg-purple-400/40 text-purple-100 hover:bg-purple-500"},
//     {id:3 , name : "JAVASCRIPT" , color : "bg-yellow-400/40 text-yellow-100 hover:bg-yellow-500"},
//     {id:4 , name : "REACT JS" , color : "bg-sky-400/40 text-sky-100 hover:bg-sky-500"},
//     {id:5 , name : "NEXT JS" , color : "bg-white/40 text-black hover:bg-gray-200"},
//     {id:6 , name : "TAILWIND CSS" , color : "bg-teal-400/40 text-teal-100 hover:bg-teal-500"},
//     {id:7 , name : "TYPESCRIPT" , color : "bg-blue-600/40 text-blue-100 hover:bg-blue-700"},
// ]

// const tools : SkillsData[] = [
//     {id:0 , name : "VS code" , color : "bg-blue-600/40 text-blue-100 hover:bg-blue-500"},
//     {id:1 , name : "npm" , color : "bg-red-500/40 text-red-100 hover:bg-red-500"},
//     {id:2 , name : "Postman" , color : "bg-orange-400/40 text-orange-100 hover:bg-orange-500"},
//     {id:3 , name : "Figma" , color : "bg-pink-400/40 text-pink-100 hover:bg-pink-500"},
//     {id:4 , name : "Chrome DevTools" , color : "bg-yellow-400/40 text-yellow-100 hover:bg-yellow-500"},
//     {id:5 , name : "ESLint" , color : "bg-purple-400/40 text-purple-100 hover:bg-purple-500"},
//     // {id:6 , name : "Prettier" , color : "bg-pink-400/40 text-pink-100 hover:bg-pink-500"},
//     {id:7 , name : "Git" , color : "bg-orange-400/40 text-orange-100 hover:bg-orange-500"},
//     {id:8 , name : "GitHub" , color : "bg-gray-600/40 text-gray-100 hover:bg-gray-700"},
// ]

export const Skills = ({tecnologyiesData , toolsData} : props) => {
    return(
        <div className="p-5">
                <Title text="Tools & Technologies"/>
                <div className="md:mt-20 ">
                    <Description text="Technologies I have worked with"/>
                    <Card data={tecnologyiesData}/>
                </div>

                <div className="md:mt-20">
                    <Description text="Tools I have wored with"/>
                    <Card data={toolsData} />
                </div>
                
            </div>
    )
}

export default Skills;