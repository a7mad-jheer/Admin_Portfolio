import { supabase } from "@/lib/supabase"

type data = {
    [k:string] : string
}

export const useUpsertData = () => {
    const upsertData = async (tableName : string ,data : data , user_id : string | null, single :boolean = false ) => {
        /* {onConflict : "user_id"} when insert the same user_id dont insert it just update it */
        return await supabase.from(tableName).upsert({...data , user_id : user_id}, {onConflict : "user_id"}).select();
    }

    return {upsertData};
}