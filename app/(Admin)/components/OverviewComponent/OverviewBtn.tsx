import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import PortfolioBtn from "./PortfolioBtn";

export const OverviewBtn = async () => {
    const supabase = await createSupabaseServer();
    const {data : {user}} = await supabase.auth.getUser();
    
    if(!user) {
        redirect("/login")
    }

    const {data , error} = await supabase.from("profile").select("user_name").eq("user_id" , user.id).single();

if (error || !data) {
    console.error("Error fetching profile data in OverviewBtn:", error);
    return <div className="text-red-500 text-sm">Something went wrong! Please try again.</div>;
  }

  console.log(data.user_name)

    return (
        <PortfolioBtn username = {data.user_name}/>
    )
}

export default OverviewBtn;
