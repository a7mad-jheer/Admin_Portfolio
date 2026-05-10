import { supabase } from "@/lib/supabase"

export const useGetImageUrl = () => {
    const getImageUrl = async (tableName : string , imageName : string ) => {
       return await supabase.storage.from(tableName).getPublicUrl(imageName)
    }
    return {getImageUrl}
} 