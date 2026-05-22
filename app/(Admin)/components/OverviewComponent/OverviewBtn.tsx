import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

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
        <Link href={`/portfolio/${data.user_name}`} >
          <h1 className=" w-fit py-2 px-3 rounded text-white border border-gray-700 text-semibold bg-gradient-to-r from-blue-900 to-teal-800
        hover:from-emerald-800 hover:to-teal-900 ">View Portfolio</h1>
        </Link>
      
    )
}

export default OverviewBtn;
