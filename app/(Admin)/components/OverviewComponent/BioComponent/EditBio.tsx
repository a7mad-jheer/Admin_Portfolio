"use client";

import ErrorSchema from "@/app/(Admin)/components/Error/ErrorSchema";
import { AddImage } from "@/app/(Admin)/components/Global/AddImage";
import { useGetImageUrl } from "@/hook/api/useGetImageUrl";
import { useUpload } from "@/hook/api/useUpload";
import { useLockScroll } from "@/hook/ui/useLockScroll";
import { useReqStatus } from "@/hook/ui/useReqStatus";
import { useToast } from "@/hook/ui/useToast";
import { editBio } from "@/Schema/authSchema";
import React, { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import z from "zod";
import FormAction from "../../Global/FormAction";
import ToastError from "../../Error/ToastError";
import { useUpsertData } from "@/hook/api/useUpsertData";

type props = {
  showEdit: boolean;
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  data: BioDataType;
  onAddEdit: (data: BioDataType) => void;
  user_id:string
};

type BioDataType = {
  full_name: string;
  job_title: string;
  description: string;
  image: string;
  user_id: string;
};

type keyOfInputEdit = "Full_Name" | "Job_Title" | "Description";
type inputObjType = { id: number; name: keyOfInputEdit };

const inputEditList: inputObjType[] = [
  { id: 0, name: "Full_Name" },
  { id: 1, name: "Job_Title" },
  { id: 2, name: "Description" },
];

type bioEditType = {
  Full_Name: string;
  Job_Title: string;
  Description: string;
};


type bioInfer = z.infer<typeof editBio>;
export const EditBio = ({ showEdit, setShowEdit, data, onAddEdit ,user_id}: props) => {


  const [bioEdit, setBioEdit] = useState<bioEditType>({
    Full_Name: data.full_name,
    Job_Title: data.job_title,
    Description: data.description,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(data.image);
  const [errorSchema, setErrorSchema] = useState<
    Partial<Record<keyof bioInfer, string>>
  >({});


  useEffect(() => {
    console.log("bio edit data from edit bio" , bioEdit);
  }, [bioEdit])


  /* api operation */
  const {upsertData} = useUpsertData()
  const {uploadImage} = useUpload();
  const {getImageUrl} = useGetImageUrl();
  const {success , fail , loading , status} = useReqStatus();
  const {show , message} = useToast();
  /* api operation */



  const handleEditedData = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status.loading) return;

    const result = editBio.safeParse(bioEdit);
    if (!result.success) {
      const fieldError: typeof errorSchema = {};
      result.error.issues.forEach((err) => {
        fieldError[err.path[0] as keyof bioInfer] = err.message;
      });
      console.log(fieldError)
      setErrorSchema(fieldError);
      return;
    }

    setErrorSchema({});
    loading();


    let finalImageUrl = imageUrl;

    if (imageFile) {
      const imageName= `${Date.now()}-${imageFile.name}`;
      const {error : imageError} = await uploadImage("image" , imageName , imageFile);

      if (imageError) {
        console.log("there is problem when upload image" , imageError);
        show("Somthing went wrong while update image!, please try again")
        fail();
        return;
      }

      const {data} = await getImageUrl("image" , imageName)

      finalImageUrl  = data.publicUrl;
      console.log("image file is convert to url here" , finalImageUrl);
      setImageUrl(finalImageUrl);
    }

    console.log("here is image url before add image" , imageUrl);
    if(!finalImageUrl) {
      console.log("something went wrong in imageUrl" , imageUrl)
      show("Somthing went wrong!, please try again.")
      return;
    }


    const {data , error} = await upsertData("bio" , {
      full_name : bioEdit.Full_Name,
      description : bioEdit.Description,
      job_title : bioEdit.Job_Title,
      image : finalImageUrl
    }, user_id)
      
    if (error) {
      console.log("there is problem when insert Edited data", error);
      fail();
      show("Somthing went wrong when update your informations.")
      return;
      }
      
      console.log("The updated data is: " ,data );
      console.log("Added data from form" , bioEdit);
    
    
    success();
    show("Edit successfully");
    onAddEdit({
      full_name: data.full_name,
      job_title: data.job_title,
      description: data.description,
      image: finalImageUrl,
      user_id: data.user_id,
    });


    setBioEdit({
      Full_Name: "",
      Job_Title: "",
      Description: "",
    });
    setImageUrl("");
    setImageFile(null);
    setShowEdit(false);
  };



  /* hidden Scroll When ShowEdit is true */
  useLockScroll(showEdit);
  /* hidden Scroll When ShowEdit is true */

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBioEdit((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddImageFile = (data: File | null) => {
    setImageFile(data);
  };

  /*start jsx */
  return (
    <div>
      {message && <ToastError message = {message}/>}
      <div
        className={`transform  transition-transform duration-700 ease-in-out fixed  scroll-auto z-50 top-0 right-0 w-full md:w-[40%]  h-screen ${showEdit ? "translate-x-0 " : "translate-x-full"} bg-zinc-900 text-white `}
      >
        {showEdit && (
          <div className="w-full h-full overflow-y-auto">
            <div className="p-3 border-b border-gray-800 flex items-center justify-between font-semibold">
              <h1>Update Your Bio </h1>
              <span
                onClick={() => setShowEdit(false)}
                className="text-xl cursor-pointer"
              >
                <MdOutlineCancel />
              </span>
            </div>

            <div className="p-4 font-semibold">
              <h1 className="my-5">General</h1>

              <AddImage
                imageUrl={imageUrl}
                onAddImageFile={handleAddImageFile}
                errorSchema={{ "": "" }}
              />

              <form onSubmit={handleEditedData} className="flex flex-col gap-5">
                {inputEditList.map((inp) => {
                  return (
                    <label key={inp.id} className="flex flex-col gap-2">
                      <span
                        className={`${errorSchema[inp.name] ? "text-red-600 " : "text-white "}`}
                      >
                        {inp.name}
                      </span>
                      {errorSchema[inp.name] && (
                        <ErrorSchema errorSchema={errorSchema[inp.name]!} />
                      )}
                      <input
                        value={bioEdit[inp.name as  keyOfInputEdit]}
                        onChange={(e) => handleChangeValue(e)}
                        name={inp.name}
                        type="text"
                        placeholder={`${inp.name}...`}
                        className="w-full bg-[hsl(0_0%_10.98%)] p-2 border-gray-800 border rounded-md text-sm outline-none"
                      />
                    </label>
                  );
                })}

                <FormAction
                  onCancel = {() => setShowEdit(false)}
                  status = {status}
                  row = {true}
                />
              </form>
            </div>
          </div>
        )}
      </div>

      {showEdit && (
        <div className="fixed z-40 top-0 left-0 bg-black/50 w-full h-screen backdrop-blur-md"></div>
      )}
    </div>
  );
};

export default EditBio;
