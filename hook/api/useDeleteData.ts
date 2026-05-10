import { supabase } from "@/lib/supabase"

type filter = {
    column: string ,
    value : string | number | null
}

export const useDeleteData = () => {
    const deleteData = async (tableName : string , filters : filter[] , single : boolean = false) => {
        let query = supabase.from(tableName).delete()
        filters.forEach((filter) => {
            if(filter.value === null)return;
            query = query.eq(filter.column , filter.value);
        })

        if(single) {
            const {data , error} = await query.select().single();
            return {data , error}
        }
        
        const {data , error } = await query.select()
        return {data , error}
    }
    

    return{deleteData}
}