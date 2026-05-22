import { redirect } from "next/navigation";
import OverviewPage from "../../components/OverviewComponent/OverviewPage";
import { createSupabaseServer } from "@/lib/supabase-server";
import OverviewHeader from "../../components/OverviewComponent/OverviewHeader";
import { getUserServer } from "@/lib/getUserServer";

type userType = {
  id : string ,
  email ?: string ,
  name ?: string
} | null

export default async function Overview () {
  const supabase = await createSupabaseServer();

  const user: userType = await getUserServer();
  
    if (!user) {
      redirect("/login");
    }
  
    console.log(user);
  
    /* feth profile data from supabase to get user name */
    const { error: profileError, data: profileData } = await supabase
      .from("profile")
      .select("*")
      .eq("user_id", user.id)
      .single();

      let errorInProfile : boolean = false;

  
    if (profileError) {
      console.log("somthing went error when select profile data", profileError);
      return (
        
        <div className="text-red-500">Failed to load data. Please try again.</div>
      );
    }
  
    if (!profileData) {
      return (
        errorInProfile = true
      );
    }



  return (
    <div>
            <OverviewHeader data = {profileData} error = {errorInProfile} />
            <OverviewPage user = {user} profile = {profileData}/>
    </div>
    
  )
}