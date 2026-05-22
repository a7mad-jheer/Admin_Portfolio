"use client";
import Image from "next/image";
import TitlePanel from "../Global/TitlePanel";
import ConfirmDelete from "../Global/ConfirmDelete";
import AddPorjectPage from "../AddProjectCom/AddProjectPage";
import { useDeleteData } from "@/hook/api/useDeleteData";
import EditSide from "../AddProjectCom/EditProjectComponent/EditSide";
import { useReqStatus } from "@/hook/ui/useReqStatus";
import { useToast } from "@/hook/ui/useToast";
import ToastError from "../Error/ToastError";
import { Dispatch, useEffect, useState } from "react";
import IconAction from "../Global/IconAction";
import { useUpdateData } from "@/hook/api/useUpdateData";
import FormAction from "../Global/FormAction";
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
  onDeleteProject : (data : project_Type) => void;
  onEditProjects : (data : project_Type) => void;
  onDeleteProjectsWithCategoryId : (data : project_Type[]) => void;
  onEditCategories : (data : category_Type) => void,
  onDeleteCategories : (data : category_Type) => void,
  projects: project_Type[];
  addProject: boolean;
  setAddProject: Dispatch<React.SetStateAction<boolean>>;
  AddNewCategoryFromForm : (data : category_Type) => void,
  EditCategoryFromForm : (data : category_Type) => void,
  DeleteCategoryFromForm : (data : category_Type) => void,
};

export const ProjectsPage = ({
  categories,
  user_id,
  onAddProjects,
  onDeleteProject,
  onEditProjects,
  onDeleteProjectsWithCategoryId,
  onEditCategories,
  onDeleteCategories,
  projects,
  addProject,
  setAddProject,
  AddNewCategoryFromForm,
  EditCategoryFromForm,
  DeleteCategoryFromForm
}: props) => {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [projectId, setProjectId] = useState<number | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [catName , setCatName] = useState<string>("")
  const [catDelete , setCatDelete] = useState<boolean>(false)

  /* api operations */
  const { deleteData } = useDeleteData();
  const { updateData } = useUpdateData();
  const { status, loading, success, fail } = useReqStatus();
  const { show, message } = useToast();
  /* api operations */

  useEffect(() => {
      console.log("categories from projects page" , categories)
    }, [])
  

  const handleShowSideEdit = (
    projectId: number | null,
    categoryId: number | null,
  ) => {
    setShowEdit(true);
    setProjectId(projectId);
    setCategoryId(categoryId);
  };

  /* Delete Project */
  const handleDeleteProject = async () => {
    if (status.loading) return;

    loading();

    if (!projects) {
      console.log("there is problem in projects ", projects);
      show("Somthing went wrong! , please try again");
      fail();
      return;
    }

    if (!projectId) {
      console.log("the ProjectId is not Selected" + projectId);
      fail();
      show("Please Select Project");
      return;
    }

    const { data, error } = await deleteData(
      "projects",
      [{ column: "id", value: projectId }],
      true,
    );

    if (error) {
      console.log("there is problem when delete" + error);
      fail();
      show("Something went wrong while deleting the project.");
      return;
    }

    if (!data) {
      show("Somthing went wrong !, please try again");
      fail();
      console.log("there is data when delete selected projects", data);
      return;
    }

    success();
    show("Deleted Successfully");
    onDeleteProject(data);
    setProjectId(null);
    setShowDelete(false);
    console.log("deleted successfully");
  };

  const handleCatEdit = async (e : React.FormEvent) => {
    e.preventDefault()

    if(status.loading)return;

    if(categoryId === null){
      show("Please Select Category");  
      return
    };

    loading();

    const {data , error } = await updateData("categories" , {name : catName} , [{column : "user_id" , value : user_id} , {column : "id" , value : categoryId}] , true);

    if(error) { 
      console.log("Somthing went wrong when edit categories" , error);
      fail();
      show("Somting went wrong! , please try again")
      return;
    }

    console.log(data);
    success();
    show("Edit category successfully.")
    onEditCategories(data);
    setCategoryId(null);
    setCatName("")    
  }

  const handleDeleteCategoryAndProjects = async () => {
    if(status.loading) return;

    if(categoryId === null) {
      show("Please Select Category");
      return;
    }

    loading();

    const {data : categoryData , error : categoryError} = await deleteData("categories" , [{column : "user_id" , value : user_id} , {column : "id" , value : categoryId}] , true);

    if(categoryError) {
      console.log("error when delete category " , categoryError);
      show("Something went wrong while deleting the category.");
      fail();
      return;
    }

    console.log(categoryData);
    onDeleteCategories(categoryData);


    const {data : projectData , error : projectError} = await deleteData("projects" , [{column : "user_id" , value : user_id} , {column : "categoryId" , value : categoryId}]);

    if(projectError) {
      console.log("Somthing went error when delete projects" , projectError);
      fail();
      show("Something went wrong! , please try again");
      return;
    }

    onDeleteProjectsWithCategoryId(projectData);
    success();
    setCategoryId(null);
    setCatDelete(false)
    console.log(projectData);
  }



  return (
    <div className="relative p-5">
      {message && <ToastError message={message} />}

      {addProject && (
        <div className="fixed z-40 top-0 left-0 bg-black/50 w-full h-screen backdrop-blur-md"></div>
      )}

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

      <EditSide
        categories={categories}
        showEdit={showEdit}
        setShowEdit={setShowEdit}
        categoryId={categoryId}
        projectId={projectId}
        onEdit={(data) => onEditProjects(data)}
      />

      <ConfirmDelete
        onConfirm={() => handleDeleteProject()}
        onCancel={() => {
          setShowDelete(false);
          setProjectId(null);
        }}
        status={status}
        showDelete={showDelete}
        title="project"
        selectedBtn={projectId}
      />

     <ConfirmDelete
        onConfirm={() => handleDeleteCategoryAndProjects()}
        onCancel={() => {
          setCatDelete(false);
          setCategoryId(null);
        }}
        status={status}
        showDelete={catDelete}
        title="category and his all projects"
        selectedBtn={categoryId}
      />

      {/* Title Panel */}
      <div className="mb-5 flex items-center justify-between">
        <TitlePanel title="All Project" />

        <div
          onClick={() => setAddProject(true)}
          className="transfom duration-200 bg-[hsl(154.9_100%_19.22%)] hover:bg-[hsl(154.9_100%_23.22%)] border border-gray-700  p-2  rounded-md cursor-pointer text-white"
        >
          <span>Add Project</span>
        </div>
      </div>

      <div>
        {categories &&
          categories.map((cat) => {
            return (
              <div key={cat.id}>
                <div className="mb-8 mt-12">
                  {categoryId === cat.id ? (
                  <form 
                    onSubmit={handleCatEdit}
                    className="flex  items-center justify-center gap-2 ">
                    <input value={catName} onChange = {(e) => setCatName(e.target.value)} placeholder="Input New Value..." className=" bg-[hsl(0_0%_10.98%)] p-2 border-gray-800 border rounded-md text-sm outline-none text-white"/>
                    <FormAction 
                      onCancel = {() => {setCategoryId(null)}} status ={status} row={true}
                    />
                  </form>
                ) : (
                  <div className="flex items-center gap-5 justify-center">
                  <div className="text-center ">
                    <h1 className="text-3xl font-bold text-white mb-2">
                      {cat.name}
                    </h1>
                    <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
                  </div>

                  <IconAction
                    onEditClick={() => {setCategoryId(cat.id); setCatName(cat.name)}}
                    onDeleteClick={() => {setCatDelete(true); setCategoryId(cat.id)}}
                    noAbsolute={true}
                  />

                </div>
                )}
                </div>

                <div className=" grid grid-cols-12  gap-5">
                  {projects &&
                    projects
                      .filter((project) => project.categoryId === cat.id)
                      .map((proj) => {
                        return (
                          <div
                            key={proj.id}
                            className="relative  group bg-gray-900/60 border-gray-600 border rounded-xl overflow-hidden  sm:max-w-full shadow-2xl flex-1 col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3 gap-8"
                          >
                            <div className="relative w-full h-80">
                              {proj.image && (
                                <Image
                                  alt="no-image"
                                  src={proj.image}
                                  fill
                                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                              )}
                            </div>

                            <div className="p-3 h-35 text-center ">
                              <h1 className="text-xl font-semibold text-white mb-1 ">
                                {proj.name}
                              </h1>
                              <p className=" text-sm text-gray-400 line-clamp-2">
                                {proj.description}
                              </p>
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />
                            </div>

                            <IconAction
                              onEditClick={() =>
                                handleShowSideEdit(proj.id, cat.id)
                              }
                              onDeleteClick={() => {
                                setShowDelete(true);
                                setProjectId(proj.id);
                              }}
                            />
                          </div>
                        );
                      })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProjectsPage;
