import { supabase } from "@/lib/supabase"

type filter = {
    column : string ,
    value : string | number | null
}


export const useSelectData =  () => {

    const applyFilter = (query : any , filters : filter[]) => {
        filters.forEach((filter) => {
            if(filter.value !== null) {
                query = query.eq(filter.column , filter.value);
            }
        })
        return query;
    }


    const selectWithoutSingle = async (tableName : string , filters : filter[]) => {
        let query = supabase.from(tableName).select("*")

        query = applyFilter(query , filters)

        const {data , error} = await query;
        return {data , error}
    }


    const selectWithSingle = async (tableName : string ,filters : filter[]) => {
        let query = supabase.from(tableName).select("*")

        query = applyFilter(query , filters)

        const {data , error} = await query.maybeSingle()
        return {data , error}
    }


    const selectCount = async (tableName : string , filters : filter[] , column : string) => {
        let  query = supabase.from(tableName).select(column , {count : "exact" , head : true});
        
        query = applyFilter(query , filters)

        const {count , error} = await query; 
        return {count , error};

    }

    const selectValues = async (tableName : string , filters : filter[] , values : string[] , single : boolean = false) => {
        let  query = supabase.from(tableName).select(values.join(", "))

        query = applyFilter(query , filters);

        if(single) {
            const {data , error} = await query.single()
            return {data , error}
        }
        const {data , error} = await query;

        return {data , error};
    } 

    return {selectWithoutSingle , selectWithSingle , selectCount , selectValues }
}