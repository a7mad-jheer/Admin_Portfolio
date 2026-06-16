import Card from "../global/Card";
import Title from "../global/Title";
import Description from "../global/Description";
import { skills_Type } from "@/types/types";

type props = {
  tecnologyiesData: skills_Type[];
  toolsData: skills_Type[];
};

const defaultTechnology: skills_Type[] = [
  { id: 0, name: "HTML 5", user_id: "default" },
  { id: 1, name: "CSS 3", user_id: "default" },
  { id: 2, name: "BOOTSTRAP", user_id: "default" },
  { id: 3, name: "JAVASCRIPT", user_id: "default" },
  // { id: 4, name: "REACT JS", user_id: "default" },
  // { id: 5, name: "NEXT JS", user_id: "default" },
  // { id: 6, name: "TAILWIND CSS", user_id: "default" },
  // { id: 7, name: "TYPESCRIPT", user_id: "default" },
];

const defaultTools: skills_Type[] = [
  { id: 0, name: "VS code", user_id: "default" },
  { id: 1, name: "npm", user_id: "default" },
  { id: 2, name: "Postman", user_id: "default" },
  { id: 3, name: "Figma", user_id: "default" },
  // { id: 4, name: "Chrome DevTools", user_id: "default" },
  // { id: 5, name: "ESLint", user_id: "default" },
  // // {id:6 , name : "Prettier" , color : "bg-pink-400/40 text-pink-100 hover:bg-pink-500"},
  // { id: 7, name: "Git", user_id: "default" },
  // { id: 8, name: "GitHub", user_id: "default" },
];

export const Skills = ({ tecnologyiesData, toolsData }: props) => {
  const tecnologies =
    tecnologyiesData?.length > 0 ? tecnologyiesData : defaultTechnology;
  const tools = toolsData?.length > 0 ? toolsData : defaultTools;
  return (
    <div className="p-5">
      <Title text="Tools & Technologies" />
      <div className="mt-10 md:mt-20 md:px-20 ">
        <div className="border-2 shadow-2xl border-blue-950/70 rounded-md  md:p-10 p-5 z-50">
                  <Description text="Technologies I have worked with" />
          <Card data={tecnologies} />
        </div>
      </div>

      <div className="mt-10 md:mt-20 md:px-20">
        <div className="border-2 shadow-2xl border-blue-950/70 rounded-md  md:p-10 p-5 z-50">
          <Description text="Tools I have worked with" />
          <Card data={tools} />
        </div>
      </div>
    </div>
  );
};

export default Skills;
