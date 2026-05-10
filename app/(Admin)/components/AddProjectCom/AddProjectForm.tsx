"usclient";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import z from "zod";
import { AddProjectFormSchema } from "@/Schema/authSchema";
import { ToastError } from "../Error/ToastError";
import { MdImage, MdClose } from "react-icons/md";
import ErrorSchema from "../Error/ErrorSchema";
import NProgress from "nprogress";
import { useUser } from "@/Context/UserInfoContext";
import { useUpload } from "@/hook/api/useUpload";
import { useGetImageUrl } from "@/hook/api/useGetImageUrl";
import { useInsertData } from "@/hook/api/useInsertData";
import { useReqStatus } from "@/hook/ui/useReqStatus";
import { useToast } from "@/hook/ui/useToast";
import { useLockScroll } from "@/hook/ui/useLockScroll";

type PROJECT_STATE = {
  name: string;
  description: string;
  url: string;
  categoryId: string | null;
};
type project_Type = {
  categoryId: number | null;
  description: string | null;
  id: string | null;
  image: string | null;
  name: string | null;
  url: string | null;
  user_id: string | null;
};

type AddFormProps_Type = {
  categorySelected: {
    name: string | null;
    id: number | null;
    user_id: string | null;
  };
  onAddProject: (data: project_Type) => void;
  setAddProject: React.Dispatch<React.SetStateAction<boolean>>;
  addProject : boolean
};

type PROJECT_TYPE = z.infer<typeof AddProjectFormSchema>;

export const AddProjectForm = ({
  categorySelected,
  onAddProject,
  setAddProject,
  addProject,
}: AddFormProps_Type) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [project, setProject] = useState<PROJECT_STATE>({
    name: "",
    description: "",
    url: "",
    categoryId: "",
  });
  const [errorSchema, setErrorSchema] = useState<
    Partial<Record<keyof PROJECT_TYPE, string>>
  >({});

  const { userInfo } = useUser();

  /* api operations */
  const { uploadImage } = useUpload();
  const { getImageUrl } = useGetImageUrl();
  const { insertData } = useInsertData();
  const {status , success , fail , loading} = useReqStatus();
  const {show , message} = useToast();
  /* api operations */


  /* OnDrop ,  */
  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length <= 0) return;

    const file = files[0];
    setImageFile(file);

    const preview = URL.createObjectURL(file);
    setPreview(preview);
  };

  /*on Drage Over */
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  /* Delete Image */
  const deleteImage = () => {
    setImageFile(null);
    setPreview(null);
  };

  /*  GET IMAGE AND URL */
  const handelAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files?.[0];
    if (!files) return;

    console.log(files);
    setImageFile(files);

    const previewUrl = URL.createObjectURL(files);
    setPreview(previewUrl);
  };

  /* URL REVOKE TO CLEAR MEMORY */
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  /* UPLOAD IMAGE , INSERT NEW PROJECT WITH CATEGORY TITLE TO SUPABASE */
  const handelSubmitSupabase = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categorySelected.id) {
      console.log("the category selected is null");
      show("Please select category title");
      return;
    }

    /* SCHEMA SETTING */
    const Project_Schema = {
      ...project,
      image: imageFile,
      categoryId: categorySelected.id,
    };
    console.log(categorySelected);
    const result = AddProjectFormSchema.safeParse(Project_Schema);

    if (!result.success) {
      const fieldError: typeof errorSchema = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldError[err.path[0] as keyof PROJECT_TYPE] = err.message;
        }
      });
      setErrorSchema(fieldError);
      console.log(fieldError);
      return;
    }

    setErrorSchema({});

    if (status.loading) return;
    NProgress.start();

    loading()

      if (!imageFile) {
        setErrorSchema({ image: "Image is requierd" });
        NProgress.done();
        return;
      }

      const imageName = `${Date.now()}-${imageFile!.name}`;

      const { error: uploadError } = await uploadImage(
        "image",
        imageName,
        imageFile,
      );

      if (uploadError) throw uploadError;

      const { data } = await getImageUrl("image", imageName);

      const imageUrl = data.publicUrl;

      /* insert data to project supabase */
      const { data: inserData, error: insertError } = await insertData(
        "projects",
        {
          name: project.name,
          description: project.description,
          url: project.url,
          image: imageUrl,
          categoryId: categorySelected.id,
          user_id: userInfo?.user_id,
        },
        true,
      );

      if (insertError) {
        console.log("there is problem when insert data");
        fail();
        show("Something went wrong while adding the project.")
        return;
      };
      
      success();
      show("Project added successfully.")
      NProgress.done();
      onAddProject({
        id: inserData.id,
        name: project.name,
        description: project.description,
        url: project.url,
        image: imageUrl,
        categoryId: categorySelected.id,
        user_id: userInfo?.user_id || null,
      });
      console.log(categorySelected);

      setProject({
        name: "",
        description: "",
        url: "",
        categoryId: "",
      });

      setPreview(null);
      setImageFile(null);
      setAddProject(false);
  };

    /* hidden Scroll When ShowEdit is true */
  useLockScroll(addProject);

  /* START JSX */
  return (
    <form
      onSubmit={handelSubmitSupabase}
      className="bg-[hsl(0deg 0% 12.94%)] flex flex-col gap-2 p-2 shadow-2xl rounded-md"
    >
      {/*Start Error Message*/}
      {message && <ToastError message={message}/>};
      {errorSchema.image && <ErrorSchema errorSchema={errorSchema.image} />}
      {/*End Error Message*/}

      {/*Start Add Image*/}
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleOnDrop}
        onDragOver={(e) => handleDragOver(e)}
        className="border border-dashed w-full h-64 flex justify-center items-center relative cursor-pointer mb-5 mt-2"
      >
        {preview ? (
          <div>
            <Image src={`${preview}`} alt="" fill className="bg-cover" />
            <span
              onClick={deleteImage}
              className="absolute top-2 right-2  border-3 border-white bg-red-900 hover:bg-red-700 text-white rounded-md cursor-pointer"
            >
              <MdClose />
            </span>
          </div>
        ) : (
          <div className="">
            <input
              hidden
              type="file"
              accept="image/*"
              ref={inputRef}
              onChange={handelAddImage}
              onDrop={handleOnDrop}
              disabled={status.loading}
            />
            <div className="flex flex-col items-center">
              <MdImage size={100} className="text-blue-600" />
              <p className="text-xl font-semibold ">
                Drag & Drop Project Image
              </p>
            </div>
          </div>
        )}
        {/*End Add Image*/}
      </div>
      {errorSchema.name && <ErrorSchema errorSchema={errorSchema.name} />}
      <input
        value={project?.name}
        onChange={(e) =>
          setProject((prev) => ({ ...prev, name: e.target.value }))
        }
        className="w-full bg-[hsl(0_0%_10.98%)] p-2 border-gray-800 border rounded-md text-sm outline-none"
        type="text"
        placeholder="Enter Title Of The Project.."
        disabled={status.loading}
      />
      {errorSchema.description && (
        <ErrorSchema errorSchema={errorSchema.description} />
      )}
      <textarea
        disabled={status.loading}
        value={project?.description}
        onChange={(e) =>
          setProject((prev) => ({ ...prev, description: e.target.value }))
        }
        className="w-full bg-[hsl(0_0%_10.98%)] p-2 border-gray-800 border rounded-md text-sm outline-none h-30 resize-none"
        placeholder="Enter Description of The Project..."
      />
      {errorSchema.url && <ErrorSchema errorSchema={errorSchema.url} />}
      <input
        disabled={status.loading}
        value={project?.url}
        onChange={(e) =>
          setProject((prev) => ({ ...prev, url: e.target.value }))
        }
        className="w-full bg-[hsl(0_0%_10.98%)] p-2 border-gray-800 border rounded-md text-sm outline-none"
        type="text"
        placeholder="Enter URL of Live Project"
      />
      <div className="flex gap-2 justify-end mt-5 text-sm ">
        <button
          type="button"
          onClick={() => setAddProject(false)}
          className="transfom duration-200 bg-[hsl(0_0%_15.98%)] hover:bg-[hsl(0_0%_20.98%)] border border-gray-700 px-2  rounded-md shadow-2xl "
        >
          Cancel
        </button>
        <button
          type="submit"
          className="transfom duration-200 bg-[hsl(154.9_100%_19.22%)] hover:bg-[hsl(154.9_100%_23.22%)] border border-gray-700 px-2  rounded-md"
        >
          {status.loading ? "saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default AddProjectForm;
