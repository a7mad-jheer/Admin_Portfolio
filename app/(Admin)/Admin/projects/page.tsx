import ToastError from "../../components/Error/ToastError";
import { createSupabaseServer } from "@/lib/supabase-server";
import ProjectContainer from "../../components/AddProjectCom/ProjectContainer";

export default async function Project() {
  const supabase = await createSupabaseServer();

  /* get user id from supabase in server page */
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return (
      <ToastError message="Somtings went wrong!, check your connection." />
    );

  const user_id = user.id;
  console.log(user_id + "from projectsPage");

  /* get all projects and categories from supabase in server component */
  const [projectsResult, categoriesResult] = await Promise.all([
    supabase.from("projects").select("*").eq("user_id", user_id),
    supabase.from("categories").select("*").eq("user_id", user_id),
  ]);

  const { data: projectsData, error: projectsError } = projectsResult;
  const { data: categoriesData, error: categoriesError } = categoriesResult;

  console.log(categoriesData);

  if (projectsError && categoriesError) {
    return (
      <ToastError message="Somting Went Wrong! , please reload the page again. " />
    );
  }

  return (
    <>
      <ProjectContainer
        projectsData={projectsData}
        categoriesData={categoriesData}
        user_id={user_id}
      />
    </>
  );
}
