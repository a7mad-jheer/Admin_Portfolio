"use client";
import { useEffect, useMemo, useState } from "react";
import NoProjects from "../EmptyState/NoProjects";
import ProjectsPage from "../pagesComponent/ProjectsPage";
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
  projectsData: project_Type[] | null;
  categoriesData: category_Type[] | null;
  user_id: string;
};

export const ProjectContainer = ({
  projectsData,
  categoriesData,
  user_id,
}: props) => {
  const serverCategories = useMemo(() => {
    return categoriesData ?? [];
  }, [categoriesData]);

  const serverProjects = useMemo(() => {
    return projectsData ?? [];
  }, [projectsData]);

  const [addProject, setAddProject] = useState<boolean>(false);
  const [projects, setProjects] = useState<project_Type[]>(
    serverProjects ?? [],
  );
  const [categories, setCategories] = useState<category_Type[]>(
    serverCategories ?? [],
  );

  useEffect(() => {
    setCategories(serverCategories);
  }, [serverCategories]);

  useEffect(() => {
    setProjects(serverProjects);
  }, [serverProjects]);

  /*Add Project to Projects Array To Preview Projects Added */
  const handleAddProject = (data: project_Type) => {
    console.log(data);
    if (projects) {
      setProjects((prev) => [...(prev ?? []), data]);
    }
  };

  const handleEditCategories = (data: category_Type) => {
    if (categories) {
      const categoriesFilter = categories.map((cat) => {
        if (cat.id === data.id) {
          return data;
        }

        return cat;
      });

      setCategories(categoriesFilter);
    }
  };

  const handleDeleteCategories = (data: category_Type) => {
    if (categories) {
      const categoriesFilter = categories.filter((cat) => cat.id !== data.id);
      setCategories(categoriesFilter);
    }
  };

  const handleDeleteProjectWithCatId = (data: project_Type[]) => {
    const projectFilteredWithCatId = projects.filter(
      (project) => !data.some((pro) => pro.categoryId === project.categoryId),
    );

    setProjects(projectFilteredWithCatId);
  };

  const AddNewCategoryFromForm = (data: category_Type) => {
    setCategories((prev) => [...(prev ?? []), data]);
  };

  const EditCategoryFromForm = (data: category_Type) => {
    const categoryFilterd = categories.map((cat) => {
      if (cat.id === data.id) {
        return data;
      }
      return cat;
    });

    setCategories(categoryFilterd);
  };

  const DeleteCategoryFromForm = (data: category_Type) => {
    const categoryFilterd = categories.filter((cat) => cat.id !== data.id);

    setCategories(categoryFilterd);
  };

  const handleDeleteProjects = (data: project_Type) => {
    const filterProjects = projects.filter((project) => project.id !== data.id);

    setProjects(filterProjects);
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

  useEffect(() => {
    console.log("categories from projects container", categories);
  }, [categories]);

  return (
    <>
      {projects &&
      categories &&
      projects.length > 0 &&
      categories.length > 0 ? (
        <ProjectsPage
          projects={projects}
          categories={categories}
          user_id={user_id}
          onAddProjects={(data) => handleAddProject(data)}
          onDeleteProject={(data) => handleDeleteProjects(data)}
          onEditProjects={(data) => handleEditProjecs(data)}
          onDeleteProjectsWithCategoryId={(data) =>
            handleDeleteProjectWithCatId(data)
          }
          onEditCategories={(data) => handleEditCategories(data)}
          onDeleteCategories={(data) => handleDeleteCategories(data)}
          addProject={addProject}
          setAddProject={setAddProject}
          AddNewCategoryFromForm={(data) => AddNewCategoryFromForm(data)}
          EditCategoryFromForm={(data) => EditCategoryFromForm(data)}
          DeleteCategoryFromForm={(data) => DeleteCategoryFromForm(data)}
        />
      ) : (
        <div>
          <NoProjects
            categories={categories}
            user_id={user_id}
            onAddProjects={(data) => handleAddProject(data)}
            addProject={addProject}
            setAddProject={setAddProject}
            AddNewCategoryFromForm={(data) => AddNewCategoryFromForm(data)}
          EditCategoryFromForm={(data) => EditCategoryFromForm(data)}
          DeleteCategoryFromForm={(data) => DeleteCategoryFromForm(data)}
          />
        </div>
      )}
    </>
  );
};

export default ProjectContainer;
