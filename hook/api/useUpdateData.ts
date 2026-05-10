import { supabase } from "@/lib/supabase"
type filter = {
    column : string ,
    value : string | number | null
}

export const useUpdateData = () => {
    const updateData = async (tableName : string , newData : Record<string , string> , filters : filter[] , single : boolean = false) => {
        let query = supabase.from(tableName).update(newData)
        filters.forEach((filter) => {
            if(filter.value === null) {
                console.log("filter.value is null");
                return;
            }

            query = query.eq(filter.column , filter.value)
        })

                    if(single) {
                const {data , error} = await query.select().maybeSingle()
                return {data , error}
            }


        const {data, error} = await query.select()
        return {data, error};
    }
    return {updateData};
}
