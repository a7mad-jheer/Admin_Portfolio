"usclient";
import React, { useEffect, useState } from "react";
import z from "zod";
import { AddProjectFormSchema } from "@/Schema/authSchema";
import { ToastError } from "../Error/ToastError";
import ErrorSchema from "../Error/ErrorSchema";
import { useUpload } from "@/hook/api/useUpload";
import { useGetImageUrl } from "@/hook/api/useGetImageUrl";
import { useInsertData } from "@/hook/api/useInsertData";
import { useReqStatus } from "@/hook/ui/useReqStatus";
import { useToast } from "@/hook/ui/useToast";
import { useLockScroll } from "@/hook/ui/useLockScroll";
import AddImage from "../Global/AddImage";
import { supabase } from "@/lib/supabase";

type PROJECT_STATE = {
  name: string;
  description: string;
  url: string;
  categoryId: number | null;
  user_id : string
};
type project_Type = {
  categoryId: number | null;
  description: string | null;
  id: number | null;
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
  addProject : boolean,
  user_id : string
};

type PROJECT_TYPE = z.infer<typeof AddProjectFormSchema>;

export const AddProjectForm = ({
  categorySelected,
  onAddProject,
  setAddProject,
  addProject,
  user_id 
}: AddFormProps_Type) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [project, setProject] = useState<PROJECT_STATE>({
    name: "",
    description: "",
    url: "",
    categoryId: null,
    user_id : ""
  });
  const [errorSchema, setErrorSchema] = useState<
    Partial<Record<keyof PROJECT_TYPE, string>>
  >({});

  /* api operations */
  const { uploadImage } = useUpload();
  const { getImageUrl } = useGetImageUrl();
  const { insertData } = useInsertData();
  const {status , success , fail , loading} = useReqStatus();
  const {show , message} = useToast();
  /* api operations */



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
    loading()

      if (!imageFile) {
        setErrorSchema({ image: "Image is requierd" });
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

      const {count , error:allProjectsError} = await supabase.from("projects").select("*" , {count : "exact" , head : true}).eq("user_id" , user_id).eq("categoryId" , categorySelected.id);

      if(allProjectsError) {
        console.log("there is problem when select all projects to check the name of project", allProjectsError);
        fail();
        show("Something went wrong while adding the project.")
        return;
      }

      if((count ?? 0) < 3) {
         /* insert data to project supabase */
      const { data: inserData, error: insertError } = await insertData(
        "projects",
        {
          name: project.name,
          description: project.description,
          url: project.url,
          image: imageUrl,
          categoryId: categorySelected.id,
          user_id: user_id,
        },
        true,
      );

      if (insertError) {
        console.log("there is problem when insert data");
        fail();
        show("Something went wrong while adding the project.")
        return;
      };

      onAddProject({
        id: inserData.id,
        name: inserData.name,
        description: inserData.description,
        url: inserData.url,
        image: inserData.image,
        categoryId: inserData.categoryId,
        user_id: inserData.user_id,
      });

      success();
      show("Project added successfully.")
      
      console.log(categorySelected);

      setProject({
        name: "",
        description: "",
        url: "",
        categoryId: null,
        user_id : ""
      });

      setPreview(null);
      setImageFile(null);
      setAddProject(false);
      return;
      }
      
      fail();
      show("You have reached the maximum number of projects allowed. Please delete an existing project before adding a new one.");
      return;
  };


  const handleImageFile = (data :  File | null) => {
    if(!data) {
      console.log("there is no image file => " , data);
   }
    setImageFile(data);
  }

    /* hidden Scroll When ShowEdit is true */
  useLockScroll(addProject);

  /* START JSX */
  return (
    <form
      onSubmit={handelSubmitSupabase}
      className="bg-[hsl(0deg 0% 12.94%)] flex flex-col gap-2 p-2 shadow-2xl rounded-md"
    >
      {/*Start Error Message*/}
      {message && <ToastError message={message}/>}
      {errorSchema.image && <ErrorSchema errorSchema={errorSchema.image} />}
      {/*End Error Message*/}

      {/*Start Add Image*/}
      <AddImage 
        imageUrl={preview}
        onAddImageFile={(data) => handleImageFile (data )}
        errorSchema={{}}
      />
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
