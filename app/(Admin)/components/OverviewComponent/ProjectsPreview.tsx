"use client";

import { category_Type } from "@/types/types";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import ProjectsTable from "./projectsComponent/ProjectsTable";
import AddPorjectPage from "../AddProjectCom/AddProjectPage";
import EditSide from "../AddProjectCom/EditProjectComponent/EditSide";
import ConfirmDelete from "../Global/ConfirmDelete";
import { useToast } from "@/hook/ui/useToast";
import { useReqStatus } from "@/hook/ui/useReqStatus";
import { useDeleteData } from "@/hook/api/useDeleteData";


type project_Type = {
  categoryId: number | null;
  description: string | null;
  id: number | null;
  image: string | null;
  name: string | null;
  url: string | null;
};

type props = {
  projectSupabase: project_Type[];
  user_id: string;
  categoriesSupabase: category_Type[];
};

export const ProjectsPreview = ({
  projectSupabase,
  categoriesSupabase,
  user_id,
}: props) => {
  const [projects, setProjects] = useState<project_Type[] | []>(
    projectSupabase ?? [],
  );
  const [categories, setCategories] = useState<category_Type[] | []>(
    categoriesSupabase ?? [],
  );
  const [addProject, setAddProject] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [projectId, setProjectId] = useState<number | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [showDelete, setShowDelete] = useState<boolean>(false);

  const {show , message} = useToast();
  const {status , loading , success , fail} = useReqStatus();
  const {deleteData} = useDeleteData();

  const handleAddProject = (data: project_Type) => {
    console.log(data);
    if (projects) {
      setProjects((prev) => [...(prev ?? []), data]);
    }
  };

  const handleAddNewCategories = (data: category_Type) => {
    setCategories((prev) => [...(prev ?? []), data]);
  };

  const handleEditCategories = (data: category_Type) => {
    const categoryFilterd = categories.map((cat) => {
      if (cat.id === data.id) {
        return data;
      }
      return cat;
    });

    setCategories(categoryFilterd);
  };

  const handleDeleteCategory = (data: category_Type) => {
    const categoryFilterd = categories.filter((cat) => cat.id !== data.id);

    setCategories(categoryFilterd);
  };

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
    const filterProjects = projects.filter((project) => project.id !== data.id);
    setProjects(filterProjects);
    setProjectId(null);
    setShowDelete(false);
    console.log("deleted successfully");
  };

  const handleEditProjecs = (data: project_Type) => {
    const filterdProjects = projects.map((project) => {
      if (project.id === data.id) {
        return data;
      }
      return project;
    });

    setProjects(filterdProjects);
  };

  return (
    <div className="relative ">
      <AddPorjectPage
        categories={categories}
        user_id={user_id}
        addProject={addProject}
        setAddProject={setAddProject}
        onAddProject={(data) => handleAddProject(data)}
        AddNewCategoryFromForm={(data) => {
          handleAddNewCategories(data);
        }}
        onEditCategory={(data) => handleEditCategories(data)}
        onDeleteCategory={(data) => handleDeleteCategory(data)}
      />



      <EditSide
        categories={categories}
        showEdit={showEdit}
        setShowEdit={setShowEdit}
        categoryId={categoryId}
        projectId={projectId}
        onEdit={(data) => handleEditProjecs(data)}
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


      <div className="flex items-center gap-5">
        <h1 className="text-xl  font-semibold">Projects Table</h1>
        <span
          onClick={() => setAddProject(true)}
          className="text-white/70 bg-black/40 h-9 w-9 rounded-full flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all duration-200 hover:scale-110 cursor-pointer "
        >
          <FaPlus />
        </span>
      </div>

      <ProjectsTable projects={projects} categories={categories} setCategoryId={setCategoryId} setProjectId={setProjectId} setShowEdit={setShowEdit} setShowDelete={setShowDelete}/>


    </div>
  );
};

export default ProjectsPreview;
