"use client";
import React, { useState } from "react";
import { AddCategory } from "./AddCategory";
import { TitlePanel } from "../Global/TitlePanel";
import { EditCategory } from "./EditCategory";
import AddProjectForm from "./AddProjectForm";
import { IoClose } from "react-icons/io5";

/* end import show new card  */

type Category_Type = {
  name: string;
  id: number | null;
  user_id: string;
};

type categorySelected_Type = {
  id: number | null;
  name: string | null;
  user_id: string | null;
};

type project_Type = {
  categoryId: number | null;
  description: string | null;
  id: string | null;
  image: string | null;
  name: string | null;
  url: string | null;
};

type props = {
  setAddProject: React.Dispatch<React.SetStateAction<boolean>>;
  addProject: boolean;
  onAddProject: (data: project_Type) => void;
  user_id : string; 
  serverCategories :Category_Type[],
};

export const AddProjectPage = ({
  setAddProject,
  addProject,
  onAddProject,
  user_id,
  serverCategories ,
}: props) => {
  const [categories, setCategories] = useState<Category_Type[] >(serverCategories ?? []);
  const [categorySelected, setCategorySelected] =
    useState<categorySelected_Type>({
      id: null,
      name: null,
      user_id: null,
    });

  /*Start Function */


  //add new category from AddCategory component :
  const handelNewCategories = (newCategories: Category_Type) => {
      if(!categories) {
        return;
      }

      setCategories((prev) => [...(prev ?? [])  , newCategories ]);
  };

  //Select the Title of the projects add
  const handelSelectedCategory = (
    catId: number | null,
    catName: string | null,
    cat_user_id: string | null,
  ) => {
    setCategorySelected((prev) => ({
      ...prev,
      id: catId,
      name: catName,
      user_id: cat_user_id,
    }));
  };

  /*Add Project to Projects Array To Preview Projects Added */
  const handleAddProjects = (data: project_Type) => {
    console.log(data);
    onAddProject(data);
  };



  /* Start JSX */
  return (
    <div
      className={`transform  transition-transform duration-700 ease-in-out fixed  scroll-auto z-50 top-0 right-0 w-full md:w-[40%]  h-screen ${addProject ? "translate-x-0 " : "translate-x-full"} bg-zinc-900 text-white overflow-auto `}
    >
      {addProject && (
        <div className="relative p-4 w-full ">
          <div className="flex justify-between">
            <TitlePanel title="Add Project" />
            <span
              onClick={() => {
                setAddProject(false);
              }}
              className="text-white text-2xl hover:bg-gray-800 hover:scale-105 w-8 h-8 cursor-pointer rounded-full flex items-center justify-center"
            >
              <IoClose />
            </span>
          </div>
          <div className="w-full md:flex gap-5">
            <div className="relative py-5 w-full">
              {/* Add New Category Title */}
              <AddCategory onAdd={handelNewCategories} user_id={user_id}/>
              {/* Edit Category Title */}
              <EditCategory
                categories={categories}
                setCategories={setCategories}
                onSelected={handelSelectedCategory}
                categorySelected={categorySelected}
              />
              {/* Add New Project */}
              <AddProjectForm
                addProject ={addProject}
                setAddProject={setAddProject}
                categorySelected={categorySelected}
                onAddProject={handleAddProjects}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProjectPage;
