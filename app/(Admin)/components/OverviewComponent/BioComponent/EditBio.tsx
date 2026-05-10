"use client";

import ErrorSchema from "@/app/(Admin)/components/Error/ErrorSchema";
import { AddImage } from "@/app/(Admin)/components/Global/AddImage";
import { useGetImageUrl } from "@/hook/api/useGetImageUrl";
import { useUpdateData } from "@/hook/api/useUpdateData";
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
import { redirect } from "next/navigation";
import { useUpsertData } from "@/hook/api/useUpsertData";
import { supabase } from "@/lib/supabase";

type props = {
  showEdit: boolean;
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  data: BioDataType;
  onAddEdit: (data: BioDataType) => void;
  user_id:string
};

type BioDataType = {
  id: number | null;
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
  id: number | null;
  Full_Name: string;
  Job_Title: string;
  Description: string;
};

type bioInfer = z.infer<typeof editBio>;
export const EditBio = ({ showEdit, setShowEdit, data, onAddEdit ,user_id}: props) => {


  const [bioEdit, setBioEdit] = useState<bioEditType>({
    id: data.id,
    Full_Name: data.full_name,
    Job_Title: data.job_title,
    Description: data.description,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(data.image);
  const [errorSchema, setErrorSchema] = useState<
    Partial<Record<keyof bioInfer, string>>
  >({});


  /* api operation */
  const {uploadImage} = useUpload();
  const {getImageUrl} = useGetImageUrl();
  const {updateData} = useUpdateData();
  const {upsertData} = useUpsertData()
  const {success , fail , loading , status} = useReqStatus();
  const {show , message} = useToast();
  /* api operation */

  useEffect(() => {
    if(user_id) {
      console.log("user id from edit bio" + user_id)
    }
  }, [user_id])

  const handleEditedData = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status.loading) return;

    const result = editBio.safeParse(bioEdit);
    if (!result.success) {
      const fieldError: typeof errorSchema = {};
      result.error.issues.forEach((err) => {
        fieldError[err.path[0] as keyof bioInfer] = err.message;
      });

      setErrorSchema(fieldError);
      return;
    }

    setErrorSchema({});
    loading();

    let finalImageUrl = imageUrl;

    if(!bioEdit.id) {
      console.log("the id is null" + bioEdit.id);
      fail();
      return;
    }

    if (imageFile) {
      const imageName= `${Date.now()}-${imageFile.name}`;
      const {error : imageError} = await uploadImage("image" , imageName , imageFile);

      if (imageError) {
        console.log("there is problem when upload image" + imageError);
        show("Somthing went wrong while update image!, please try again")
        fail();
        return;
      }

      const {data} = await getImageUrl("image" , imageName)

      finalImageUrl = data.publicUrl;
      setImageUrl(finalImageUrl);
    }

    if(!finalImageUrl) {
      console.log("there final Image url is null" , finalImageUrl);
      fail();
      return;
    }

    const {data : {user} } = await  supabase.auth.getUser();

    if(!user?.id) {
      console.log("user id is null there is error" + user?.id)
      fail()
      return;

    }

    console.log("user id from supabase =>" + user.id)
    console.log("user id from server =>" + user_id) 

    const {data:EditData , error:EditError} = await supabase.from("bio").upsert({
        full_name: bioEdit.Full_Name,
        job_title: bioEdit.Job_Title,
        description: bioEdit.Description,
        image: finalImageUrl,
        user_id : user_id
      } , {onConflict : "user_id"}).select().single()

    if (EditError) {
      console.log("there is problem when insert Edited data", EditError);
      fail();
      show("Somthing went wrong when update your informations.")
      return;
      }
      
    
    
    success();
    show("Edit successfully");
    onAddEdit({
      id: EditData.id,
      full_name: EditData.full_name,
      job_title: EditData.job_title,
      description: EditData.description,
      image: EditData.image,
      user_id: EditData.user_id,
    });
    setBioEdit({
      id: null,
      Full_Name: "",
      Job_Title: "",
      Description: "",
    });
    setImageUrl("");
    setImageFile(null);
    setShowEdit(false);
  };

  useEffect(() => {
    const updateFunction = () => {
      setBioEdit((prev) => ({
      ...prev,
      id: data.id,
      Full_Name: data.full_name,
      Job_Title: data.job_title,
      Description: data.description,
    }));
    setImageUrl(data.image);
    setErrorSchema({});
    }

    updateFunction();
  }, [showEdit]);

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
