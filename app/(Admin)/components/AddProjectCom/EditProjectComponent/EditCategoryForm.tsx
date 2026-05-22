"use client";

import { useState } from "react";
import ToastError from "../../Error/ToastError";
import { useUpdateData } from "@/hook/api/useUpdateData";
import { useUser } from "@/Context/UserInfoContext";
import { useReqStatus } from "@/hook/ui/useReqStatus";
import { useToast } from "@/hook/ui/useToast";
import { category_Type } from "@/types/types";




type formProps = {
  editSelectedValue : number | null,
  setEditClicked : React.Dispatch<React.SetStateAction<boolean>>,
  onEditCategory : (data : category_Type) => void;
}


export const EditCategoryForm = ({setEditClicked  , editSelectedValue , onEditCategory} : formProps) => {

  const [inputValue , setInputValue] = useState<string>("")

  /* api operations */
  const {updateData} = useUpdateData();
  const {status , fail , loading , success} = useReqStatus();
  const {show , message} = useToast();
  /* api operations */

  const {userInfo} = useUser();

  const handleEditSupabase = async (e : React.FormEvent) => {
    e.preventDefault();

    if(status.loading)return;

    if(userInfo?.user_id) {
      console.log("there user id is null => " + userInfo.user_id)
      return;
    }


    loading();

    const {data , error} = await updateData("categories" , {name : inputValue} , [{column : "id" , value : editSelectedValue}] , true)
    
    if (error) {
      console.log("there is problem when upadate value from supabase");
      fail();
      show("Something went wrong while updating the category.")
      return;
    }

    success();
    show("Category updated successfully.")
    console.log(data);
    onEditCategory(data);
    setInputValue("");
    setEditClicked(prev => !prev);
    setEditClicked(false);
  }

  return (
    <div className="">
      {message && <ToastError message={message}/>}

      <form
        onSubmit={handleEditSupabase}
        className="flex gap-2 relative">


      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        placeholder="Edit the title..."
        className="relative w-full bg-[hsl(0_0%_10.98%)] p-2 border-gray-800 border text-sm outline-none text-gray-400"
      />

      <div className="text-white absolute right-0 top-1/2 -translate-y-1/2 space-x-2">
        <button
          type="submit"
          className=" bg-[hsl(154.9_100%_19.22%)] hover:bg-[hsl(154.9_100%_23.22%)] cursor-pointer px-2 rounded-md "
        >
          {status.loading ? "saving.." : "Save"}
        </button>
        <span
          onClick={() => setEditClicked(prev => !prev)}
          className="transfom duration-200 bg-[hsl(0_0%_15.98%)] hover:bg-[hsl(0_0%_20.98%)] border border-gray-700 px-2  rounded-md shadow-2xl ">
          cancel
        </span>
      </div>
    </form>
    </div>
   
  );
};

export default EditCategoryForm;
