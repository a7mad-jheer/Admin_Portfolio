"use client";
import { SetStateAction, useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import z, { object } from "zod";
import { EditProjects } from "@/Schema/authSchema";
import { useUpload } from "@/hook/api/useUpload";
import { useGetImageUrl } from "@/hook/api/useGetImageUrl";
import { useUpdateData } from "@/hook/api/useUpdateData";
import { useSelectData } from "@/hook/api/useSelectData";
import { useLockScroll } from "@/hook/ui/useLockScroll";
import { useUser } from "@/Context/UserInfoContext";
import AddImage from "../../Global/AddImage";
import ErrorSchema from "../../Error/ErrorSchema";
import FormAction from "../../Global/FormAction";
import { useReqStatus } from "@/hook/ui/useReqStatus";
import { useToast } from "@/hook/ui/useToast";
import ToastError from "../../Error/ToastError";

type ProjectEditType = {
  id: string;
  Name: string;
  Description: string;
  Url: string;
};

type project_Type = {
  categoryId: number | null;
  description: string | null;
  id: string | null;
  image: string | null;
  name: string | null;
  url: string | null;
};

type Category_Type = {
  name: string;
  id: number | null;
  user_id: string;
};

type props = {
  showEdit: boolean;
  setShowEdit: React.Dispatch<SetStateAction<boolean>>;
  categoryId: number | null;
  projectId: string | null;
  onEdit: (data: project_Type) => void;
  serverCategories : Category_Type[];
};

type inputKeys = "Name" | "Description" | "Url";

const inputEditList: { id: number; name: inputKeys; placeholder: string }[] = [
  { id: 0, name: "Name", placeholder: "Project_Name" },
  { id: 1, name: "Description",placeholder: "Project_Description",},
  { id: 2, name: "Url", placeholder: "Project_Url" },
];

type projectInfer = z.infer<typeof EditProjects>;

export const EditSide = ({
  showEdit,
  setShowEdit,
  categoryId,
  projectId,
  
  onEdit,
  serverCategories
}: props) => {
  /* Start State */
  const [projectEdit, setProjectEdit] = useState<ProjectEditType>({
    id: "",
    Name: "",
    Description: "",
    Url: "",
  });
  const [errorSchema, setErrorSchema] = useState<Record<string, string>>({});
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [categoryName , setCategoryName] = useState<string>("");
  /****** End State ******/

  /*api operation */
  const { uploadImage } = useUpload();
  const { getImageUrl } = useGetImageUrl();
  const { updateData } = useUpdateData();
  const { selectWithSingle } = useSelectData();
  const { status, loading, fail, success } = useReqStatus();
  const { show, message } = useToast();

  /* Start Function */

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProjectEdit((prev) => ({ ...prev, [name]: value }));
  };

  /* upload edited project Data  */
  const handleFormEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status.loading) return;

    loading();

    const result = EditProjects.safeParse(projectEdit);
    if (!result.success) {
      const fieldError: typeof errorSchema = {};
      result.error?.issues.forEach((err) => {
        fieldError[err.path[0] as keyof projectInfer] = err.message;
      });
      setErrorSchema(fieldError);
      fail();
      return;
    }

    setErrorSchema({});

    let finalImageUrl = imageUrl;

    if (imageFile) {
      const imageName = `${Date.now()}-${imageFile.name}`;
      console.log(imageFile);

      const { error: uploadError } = await uploadImage(
        "image",
        imageName,
        imageFile,
      );

      if (uploadError) {
        console.log("there is problem when upload image", uploadError);
        fail();
        show("Something went wrong while uploading the image.");
        return;
      }

      const { data: getUrl } = await getImageUrl("image", imageName);
      setImageUrl(getUrl.publicUrl);
      finalImageUrl = getUrl.publicUrl;
    }

    const { error: updateError, data: updatedData } = await updateData(
      "projects",
      {
        name: projectEdit.Name,
        description: projectEdit.Description,
        url: projectEdit.Url,
        image: finalImageUrl!,
      },
      [{ column: "id", value: projectId }],
    );

    if (updateError) {
      console.log("there is error when update Data", updateData);
      fail();
      show("Something went wrong while updating the project.");
      return;
    }

    success();
    show("Project Edited Successfully");
    onEdit(updatedData);
    setProjectEdit((prev) => ({
      ...prev,
      id: "",
      Name: "",
      Description: "",
      Url: "",
    }));
    setImageUrl(null);
    setImageFile(null);
    setShowEdit(false);
  };


  useEffect(() => {
    const fetchData = async () => {
      if (!projectId || !showEdit) {
        console.log("there is error in ProjectId");
        return;
      }

      const { data: selectProject, error: errorSelectProject } =
        await selectWithSingle("projects", [
          {
            column: "id",
            value: projectId,
          },
        ]);

      if (errorSelectProject) {
        console.log(
          "error when selected Project with same Edit id" + errorSelectProject,
        );
        fail();
        show("Somthing went wrong when fetch projects");
        return;
      }

      setProjectEdit((prev) => ({
        ...prev,
        Name: selectProject.name,
        Description: selectProject.description,
        Url: selectProject.url,
      }));

      setImageUrl(selectProject.image);
      console.log("selected project is => ", selectProject);
      console.log("selected project id is => ", projectId);
    };

    fetchData();
  }, [showEdit, projectId]);
  


  useEffect(() => {
    const extractionCategoryName = () => {
      if(!serverCategories) return;

    const categoryArray = serverCategories.filter((cat) => cat.id === categoryId)
      const catName = categoryArray[0].name;
      setCategoryName(catName);
    }

    extractionCategoryName()
  },[categoryId , serverCategories])

  /******End Function *******/

  /* hidden Scroll When ShowEdit is true */
  useLockScroll(showEdit);
  /******* hidden Scroll When ShowEdit is true *********/

  const handleAddImage = (data: File | null) => {
    setImageFile(data);
  };

  return (
    <div>
      {message && <ToastError message={message} />}

      <div
        className={`transform  transition-transform duration-700 ease-in-out fixed  scroll-auto z-50 top-0 right-0 w-full md:w-[40%]  h-screen ${showEdit ? "translate-x-0 " : "translate-x-full"} bg-zinc-900 text-white `}
      >
        {showEdit && (
          <div className="w-full h-full  overflow-y-auto">
            <div className="p-3 border-b border-gray-800 flex items-center justify-between font-semibold">
              <h1>Update Project name form {categoryName ?? "Category Name"}</h1>
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
                  onAddImageFile={(imageFileEdit) =>
                  handleAddImage(imageFileEdit)
                }
                imageUrl={imageUrl}
                errorSchema={errorSchema}
              />

              <form onSubmit={handleFormEdit} className="flex flex-col gap-5">
                {inputEditList &&
                  inputEditList.map((inp) => {
                    return (
                      <label key={inp.id} className="flex flex-col gap-2">
                        <span
                          className={`${errorSchema[inp.name] ? "text-red-600" : "text-white"}`}
                        >
                          {inp.name}
                        </span>
                        {errorSchema[inp.name] && (
                          <ErrorSchema errorSchema={errorSchema[inp.name]} />
                        )}
                        <input
                          name={inp.name}
                          value={projectEdit[inp.name]!}
                          onChange={(e) => handleChangeInput(e)}
                          placeholder={inp.placeholder}
                          className="w-full bg-[hsl(0_0%_10.98%)] p-2 border-gray-800 border rounded-md text-sm outline-none"
                        />
                      </label>
                    );
                  })}

                <FormAction
                  row={true}
                  onCancel={() => setShowEdit(false)}
                  status={status}
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

export default EditSide;
