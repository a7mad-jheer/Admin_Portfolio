"use client";
import { useState } from "react";
import ToastError from "../Error/ToastError";
import { useInsertData } from "@/hook/api/useInsertData";
import { useReqStatus } from "@/hook/ui/useReqStatus";
import { useToast } from "@/hook/ui/useToast";
import { category_Type } from "@/types/types";
import { supabase } from "@/lib/supabase";



type OnAdd_Type = {
  onAddCategory : (data: category_Type) => void;
  user_id : string
};

export const AddCategory = ({ onAddCategory ,user_id}: OnAdd_Type) => {
  const [inputCategory, setInputCategory] = useState<string>("");

  /* api operations */
  const {insertData} = useInsertData();
  const {status , loading , success , fail} = useReqStatus();
  const {show , message} = useToast();
  /* api operations */

  //function add category :
  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status.loading) return;

    loading();

    const cleanName = inputCategory.trim().toLowerCase();

    const {count , error } = await supabase.from("categories").select("*" ,{count :"exact" , head : true} ).eq("user_id" , user_id);

    if(error) {
      show("Something went wrong while checking existing categories.");
      fail();
      console.log("there is problem when select all categories to check the name of category", error);
      return; 
    }

    if((count ?? 0) < 2) {
      
    //insert the category name , user_id
      const { data: insertInfo, error: insertError } = await insertData("categories" , {
          name: cleanName,
          user_id: user_id,
        } , true );

        console.log(user_id)

    if (insertError) {
      if (insertError?.code === "23505") {
        console.log("the name is duplicate");
        fail();
        show("This category already exists.")
      } else {
        console.log("there is another problem in insert", insertError);
        fail();
        show("Something went wrong while adding the category.");
      }
      return;
    }

    console.log( "Inserted Category from add categories:",insertInfo)
    success();
    show("Added successfully.")
    setInputCategory("");
    const newCategory: category_Type = {
      id: insertInfo.id ,
      name: insertInfo.name ,
      user_id: insertInfo.user_id ,
    }
    onAddCategory(newCategory)
    return;
    }

    
      fail();
      show("You have reached the maximum number of categories allowed. Please delete an existing category before adding a new one.");
      return;
    
  };

  //start jsx :
  return (
    <div className="">
      {message && <ToastError message={message}/>}

      <form onSubmit={handelSubmit} className="flex gap-2">
        <input
          required
          value={inputCategory}
          onChange={(e) => setInputCategory(e.target.value)}
          type="text"
          placeholder="Enter Category Title"
          className="w-full bg-[hsl(0_0%_10.98%)] p-2 border-gray-800 border rounded-md text-sm outline-none"
        />
        <button
          type="submit"
          className="transfom duration-200 bg-[hsl(154.9_100%_19.22%)] hover:bg-[hsl(154.9_100%_23.22%)] border border-gray-700 px-2  rounded-md"
        >
          {status.loading ? "saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};
