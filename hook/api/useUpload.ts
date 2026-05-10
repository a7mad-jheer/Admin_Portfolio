import { supabase } from "@/lib/supabase"

export const useUpload = () => {
    const uploadImage = async (tableName : string , Filename : string , file : File) => {
        return await supabase.storage.from(tableName).upload(Filename , file)
    }

    return {uploadImage}
}