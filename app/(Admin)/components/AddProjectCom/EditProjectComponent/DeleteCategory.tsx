"use client"

import { useUser } from "@/Context/UserInfoContext";
import { useDeleteData } from "@/hook/api/useDeleteData";
import { useReqStatus } from "@/hook/ui/useReqStatus";
import { useToast } from "@/hook/ui/useToast";
import NProgress from "nprogress";
import ToastError from "../../Error/ToastError";


type deleteProps = {
  editSelectedValue : number | null,
  setDeleteClick : React.Dispatch<React.SetStateAction<boolean>>,
  setEditSelectedValue : React.Dispatch<React.SetStateAction<number | null>>,
  deleteCategory : (id : number) => void
}

export const DeleteCategory = ({editSelectedValue , setDeleteClick , setEditSelectedValue , deleteCategory} : deleteProps) => {
  const {userInfo} = useUser();
  /* api operations */  
  const {deleteData} = useDeleteData();
  const {status , loading , success , fail} = useReqStatus();
  const {show , message} = useToast();
  /* api operations */

  const handleDeleteSupabase = async () => {
    if(status.loading) return;

    if(!userInfo?.user_id) {
      console.log("there user id is null => ", userInfo?.user_id)
      return;
    }

    loading();    
    NProgress.start();

    const {data , error} = await deleteData("categories" , [{column: "id", value : editSelectedValue}] , true);
    
    if(error) {
      console.log("there is problem when delete category name");
      fail();
      show("Something went wrong while deleting the category.")
      NProgress.done();
      return;
    }

    success();
    show("Category deleted successfully.")
    deleteCategory(data.id);
    NProgress.done();
    setDeleteClick(prev => !prev);
    setEditSelectedValue(null);
  }

  //Start Jsx
  return (
    <div className="z-30 flex items-center justify-center w-full h-full">
      {message && <ToastError message={message}/>}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-white  px-10 p-3 rounded-md shadow-2xl">
        <h1 className="font-bold text-xl text-center mb-5">Delete Now</h1>
        <div className="flex gap-2">
          <button 
            onClick={handleDeleteSupabase}
            className="bg-red-500 hover:bg-red-600 text-white cursor-pointer py-2 px-3 rounded-md">
            {status.loading ? "wait..." : "Delete"}
          </button>
          <button 
            onClick={() => setDeleteClick(prev => !prev)}
            className="bg-gray-500 hover:bg-gray-600 text-white cursor-pointer py-2 px-3 rounded-md">
            Cancel
          </button>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-20"></div>
    </div>
  );
};

export default DeleteCategory;
