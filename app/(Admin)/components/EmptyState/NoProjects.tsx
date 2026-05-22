import { IoIosAdd } from "react-icons/io";
import { FaRegFolderOpen } from "react-icons/fa";
import { Dispatch } from "react";
import AddPorjectPage from "../AddProjectCom/AddProjectPage";
import { category_Type } from "@/types/types";

type project_Type = {
  categoryId: number | null;
  description: string | null;
  id: number | null;
  image: string | null;
  name: string | null;
  url: string | null;
};


type props = {
  categories: category_Type[];
  user_id: string;
  onAddProjects: (data: project_Type) => void;
  addProject: boolean;
  setAddProject: Dispatch<React.SetStateAction<boolean>>;
  AddNewCategoryFromForm : (data: category_Type) => void;
  EditCategoryFromForm : (data: category_Type) => void;
  DeleteCategoryFromForm : (data: category_Type) => void;
};

export const NoProjects = ({
  categories,
  user_id,
  onAddProjects,
  addProject,
  setAddProject,
  AddNewCategoryFromForm,
  EditCategoryFromForm,
  DeleteCategoryFromForm
}: props) => {
  return (
    <div className="w-full min-h-[calc(100vh-64px)]  flex items-center justify-center bg-zinc-900 text-white">
      <AddPorjectPage
        categories={categories}
        user_id={user_id}
        addProject={addProject}
        setAddProject={setAddProject}
        onAddProject={(data) => onAddProjects(data)}
        AddNewCategoryFromForm={(data) => {AddNewCategoryFromForm(data)}}
        onEditCategory = {(data) => EditCategoryFromForm(data)}
        onDeleteCategory = {(data) => DeleteCategoryFromForm(data)}
      />

      <div className="flex flex-col items-center text-center gap-5 p-8 rounded-2xl border border-zinc-800 bg-zinc-950/60 shadow-lg max-w-md w-full">
        {/* Icon */}
        <div className="text-6xl text-blue-500">
          <FaRegFolderOpen />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold">No Projects Yet 🚀</h1>

        {/* Subtitle */}
        <p className="text-sm text-gray-400">
          Start building your portfolio by adding your first project
        </p>

        {/* Button */}
        <button
          onClick={() => setAddProject(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-full text-white font-medium shadow-md cursor-pointer"
        >
          <IoIosAdd className="text-xl" />
          Add Project
        </button>
      </div>

      {addProject && (
        <div className="fixed z-40 top-0 left-0 bg-black/50 w-full h-screen backdrop-blur-md"></div>
      )}
    </div>
  );
};

export default NoProjects;
