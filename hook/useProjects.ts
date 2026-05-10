import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

type project_Type = {
  categoryId: number | null;
  description: string | null;
  id: string | null;
  image: string | null;
  name: string | null;
  url: string | null;
};

export const useProjects = (user_id : string | null | undefined) => {
  const [projects, setProjects] = useState<project_Type[]>([]);

  //fetch category from supabase :
  useEffect(() => {
    if (!user_id) return;

    const fetchProjects = async () => {
      const { error, data } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user_id);

      /* ERROR OR RETURN */
      if (error) {
        console.log(error);
      }

      /* CONGRATULATION SUCCESS SUPABASE */
      console.log(data);
      setProjects(data || []);
    };

    fetchProjects();
  }, [user_id]);


  /* Add Projects */
    const addProject = (data: project_Type) => {
    console.log(data);
    setProjects((prev) => [...prev, data]);
  };

  /*Edit Projects */
  const editProject = (data: project_Type) => {
    const project = projects.map((p) => {
      if (p.id === data.id) {
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
  };

  return { projects, addProject, editProject };
};
