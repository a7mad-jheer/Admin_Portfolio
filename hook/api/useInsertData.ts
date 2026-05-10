import { supabase } from "@/lib/supabase"


export const useInsertData = () => {
    const insertData = async (tableName : string , data : Record<string , unknown> , single :boolean = false) => {
        if(single) {
            return await supabase.from(tableName).insert([data]).select().single()
        }
        
        return await supabase.from(tableName).insert([data]).select()
        
    }

    return {insertData};
}