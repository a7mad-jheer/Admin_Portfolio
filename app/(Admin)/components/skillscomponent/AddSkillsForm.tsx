"use client"

import { useState } from "react";
import ToastError from "../Error/ToastError";
import { useInsertData } from "@/hook/api/useInsertData";
import { useReqStatus } from "@/hook/ui/useReqStatus";
import { useToast } from "@/hook/ui/useToast";



type skills_type = {
    id : number,
    name: string,
    user_id : string,
}

type props = {
    onAdd : (data : skills_type) => void;
    supabaseTableTitle : string,
    user_id : string
}

export const AddSkillsForm = ({onAdd , supabaseTableTitle , user_id} : props) => {
      const [inputValue, setInputValue] = useState<string>("");


      /*api operation */
      const {insertData} = useInsertData();
      const {loading , success ,fail , status} = useReqStatus();
      const {show , message} = useToast();
      /*api operation */



       const handleAddTechnology = async (e: React.FormEvent) => {
          e.preventDefault();
      
          if (status.loading) return;


          loading();
          const { data, error} = await insertData(supabaseTableTitle ,  { "name" : inputValue , "user_id" : user_id} ,  true)
      
          if (error) {
            if (error.code === "23505") {
              console.log("the name is duplicate in supabase");
              fail()
              show("The name is already taken. Please choose another one.")
            } else {
              console.log("there is another problem in insert");
              fail()
              show("Failed to add item. Please try again.");
            }
            return;
          }
          
          console.log(data);
          
          onAdd(data)
          success();
          show("Added successfully.")
          setInputValue("");
        };

    return (

        <div>
          {message && (
            <ToastError message={message} />
          )}
          
          <form onSubmit={handleAddTechnology} className=" flex gap-2">
            <input
              required
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              placeholder="Input New Value..."
              className="w-full bg-[hsl(0_0%_10.98%)] p-2 border-gray-800 border rounded-md text-sm outline-none "
            />
            <button
          type="submit"
          className="transfom duration-200 bg-[hsl(154.9_100%_19.22%)] hover:bg-[hsl(154.9_100%_23.22%)] border border-gray-700  p-2  rounded-md cursor-pointer"
        >
          {status.loading ? "saving..." : "Save"}
        </button>
          </form>
          </div>
    )
}

export default AddSkillsForm;