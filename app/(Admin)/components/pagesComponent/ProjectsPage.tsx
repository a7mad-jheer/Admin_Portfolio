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
import IconAction from "../Global/IconAction";
import { useState } from "react";

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
  serverProjects: project_Type[];
  serverCategories: Category_Type[];
  user_id: string;
};

export const ProjectsPage = ({
  serverProjects,
  serverCategories,
  user_id,
}: props) => {
  const [addProject, setAddProject] = useState<boolean>(false);
  const [projects, setProjects] = useState<project_Type[]>(
    serverProjects ?? [],
  );
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [showDelete, setShowDelete] = useState<boolean>(false);

  /* api operations */
  const { deleteData } = useDeleteData();
  const { status, loading, success, fail } = useReqStatus();
  const { show, message } = useToast();
  /* api operations */

  const handleShowSideEdit = (
    projectId: string | null,
    categoryId: number | null,
  ) => {
    setShowEdit(true);
    setProjectId(projectId);
    setCategoryId(categoryId);
  };

  const handleEditProject = (data: project_Type) => {
    if (!projects) {
      return;
    }

    const project = projects.map((p) => {
      if (p.id === projectId) {
        return {
          ...p,
          name: data.name,
          description: data.description,
          image: data.image,
          url: data.url,
        };
      } else return p;
    });

    setProjects(project);
    setProjectId(null);
  };

  /* Delete Project */
  const handleDleteProject = async () => {
    if (status.loading) return;

    if (!projects) {
      return;
    }

    if (!projectId) {
      console.log("the ProjectId is not Selected" + projectId);
      fail();
      show("Please Select Project ");
      return;
    }

    loading();

    const { error } = await deleteData("projects", [
      { column: "id", value: projectId },
    ]);

    if (error) {
      console.log("there is problem when delete" + error);
      fail();
      show("Something went wrong while deleting the project.");
      return;
    }

    success();
    show("Deleted Successfully");
    const filteredProjects = projects.filter((p) => p.id !== projectId);
    setProjects(filteredProjects);
    setProjectId(null);
    setShowDelete(false);
    console.log("deleted successfully");
  };

  /*Add Project to Projects Array To Preview Projects Added */
  const handleAddProject = (data: project_Type) => {
    console.log(data);
    if (projects) {
      setProjects((prev) => [...(prev ?? []), data]);
    }
  };

  return (
    <div className="relative p-5">
      {message && <ToastError message={message} />}

      {addProject && (
        <div className="fixed z-40 top-0 left-0 bg-black/50 w-full h-screen backdrop-blur-md"></div>
      )}

      <AddPorjectPage
        serverCategories={serverCategories}
        user_id={user_id}
        addProject={addProject}
        setAddProject={setAddProject}
        onAddProject={handleAddProject}
      />

      <EditSide
      serverCategories={serverCategories}
        showEdit={showEdit}
        setShowEdit={setShowEdit}
        categoryId={categoryId}
        projectId={projectId}
        onEdit={handleEditProject}
      />

      <ConfirmDelete
        onConfirm={handleDleteProject}
        onCancel={() => {
          setShowDelete(false);
          setProjectId(null);
        }}
        status={status}
        showDelete={showDelete}
        title="project"
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
        {serverCategories &&
          serverCategories.map((cat) => {
            return (
              <div key={cat.id}>
                <div className="text-center mb-8 mt-12">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {cat.name}
                  </h1>
                  <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
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
                              onConfirm={() =>
                                handleShowSideEdit(proj.id, cat.id)
                              }
                              onCancel={() => {
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
