import { createSupabaseServer } from "@/lib/supabase-server";
import Techonoloies from "../../components/skillscomponent/Techonoloies";
import Tools from "../../components/skillscomponent/Tools";
import ToastError from "../../components/Error/ToastError";

export default async function Skills () {

  const supabase = await createSupabaseServer();

  const {data : {user}} = await supabase.auth.getUser();

  if(!user) {
    return <ToastError message="Something went wrong1, please check your connections."/>
  }

  const user_id = user.id;

  const [technologyResult , toolsResult] = await Promise.all([
    supabase.from("technologies").select("*").eq("user_id" , user_id),
    supabase.from("tools").select("*").eq("user_id" , user_id)
  ])

  const {data : technologiesData , error : technologiesError} = technologyResult;
  const {data : toolsData , error : toolsError} = toolsResult;

  if(technologiesError || toolsError) {
    console.log("Somthing went wrong when fetch data , please check your internet connections");
    return <ToastError message={"Somthing went wrong!, please check your internet connections."}/>
  }

  const serverTechnologies = technologiesData ?? [];
  const serverTools = toolsData ?? []


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Techonoloies serverTechnologies={serverTechnologies} user_id = {user_id}/>
        <Tools serverTools = {serverTools} user_id = {user_id}/>
    </div>
  )
}

