import { supabase } from "@/lib/supabase";



export const useAddSkills = ({ supabaseTitle }: {supabaseTitle: string;}) => {
  const addSkills = async (newValue : string , user_id : string | null) => {
   return  await supabase
      .from(supabaseTitle)
      .insert([
        {
          name: newValue,
          user_id: user_id,
        },
      ])
      .select()
      .single();
  };

  return {addSkills}
};
