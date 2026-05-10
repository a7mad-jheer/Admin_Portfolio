import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabase-server";

export const OverviewBtn = async () => {
    const supabase = await createSupabaseServer();
    const {data : {user}} = await supabase.auth.getUser();

    const user_id = user?.id;

    return (
        <Link href={`/portfolio/${user_id}`} >
          <h1 className=" w-fit py-2 px-3 rounded text-white border border-gray-700 text-semibold bg-gradient-to-r from-blue-900 to-teal-800
        hover:from-emerald-800 hover:to-teal-900 ">View Portfolio</h1>
        </Link>
      
    )
}

export default OverviewBtn;
