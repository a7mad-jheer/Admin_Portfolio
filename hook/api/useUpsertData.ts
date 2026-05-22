import { supabase } from "@/lib/supabase"

type upsertDataType = {
    [k:string] : string
}

export const useUpsertData = () => {
    const upsertData = async (tableName : string ,upsertData : upsertDataType , user_id : string | null ) => {


        /* {onConflict : "user_id"} when insert the same user_id dont insert it just update it */
        const {data , error} = await supabase.from(tableName).upsert({...upsertData , user_id : user_id}, {onConflict : "user_id"}).select().maybeSingle();

        return {data , error}
    }

    return {upsertData};
}