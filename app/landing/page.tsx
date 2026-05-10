import { about_Type, bio_Type, category_Type, projects_Type, skills_Type, social_Type } from "@/types/types";
import Section from "../Components/LandingComponent/Section"; // Client wrapper

  type sectionProps = {
    user_id : string ,
    projectsData : projects_Type[],
    categoriesData :category_Type[],
    toolsData : skills_Type[],
    tecnologyiesData : skills_Type[],
    socialData : social_Type,
    bioData :bio_Type ,
    aboutData : about_Type
  }

export default function Landing( {user_id , projectsData , categoriesData , toolsData , tecnologyiesData , socialData , bioData , aboutData} : sectionProps ) {

  return (
    <section id="landing-page" className="relative">
      <Section user_id={user_id} projectsData = {projectsData} categoriesData ={categoriesData} toolsData = {toolsData} tecnologyiesData ={tecnologyiesData} socialData ={socialData} bioData={bioData} aboutData={aboutData}/>
    </section>
  );
}
