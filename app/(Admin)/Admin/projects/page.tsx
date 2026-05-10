import ProjectsPage from "../../components/pagesComponent/ProjectsPage";
import ToastError from "../../components/Error/ToastError";
import NoProjects from "../../components/EmptyState/NoProjects";
import { createSupabaseServer } from "@/lib/supabase-server";


export default async function Project () {
  const supabase = await createSupabaseServer();

  /* get user id from supabase in server page */
  const {data : {user}} = await supabase.auth.getUser();

  if(!user) return <ToastError message="Somtings went wrong!, check your connection."/>

  const user_id = user.id;
  console.log(user_id + "from projectsPage");

  /* get all projects and categories from supabase in server component */
  const [projectsResult , categoriesResult] = await Promise.all([
    supabase.from("projects").select("*").eq("user_id" , user_id),
    supabase.from("categories").select("*").eq("user_id" , user_id)
  ])  

  const {data : projectsData , error : projectsError} = projectsResult; 
  const {data : categoriesData , error : categoriesError} = categoriesResult

  console.log(categoriesData)

  if(projectsError && categoriesError) {
    return <ToastError message="Somting Went Wrong! , please reload the page again. "/>
  }

  const serverCategories = categoriesData ?? []
  const serverProjects = projectsData ?? [];
  return (
    <div className="">
       {projectsData && categoriesData && projectsData.length > 0 ? (
        <ProjectsPage  serverProjects = {serverProjects} serverCategories = {serverCategories} user_id = {user_id} />
       ) : (
        <div>
          <NoProjects/>
        </div>
       )}
    </div>
  )
}