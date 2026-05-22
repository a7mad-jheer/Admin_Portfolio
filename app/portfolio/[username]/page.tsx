import ToastError from "@/app/(Admin)/components/Error/ToastError";
import { ParticlesBasic } from "@/app/Components/global";
import Landing from "@/app/landing/page";
import { createSupabaseServer } from "@/lib/supabase-server";

interface pageProps {
  params: Promise<{ username: string }>;
}

export default async function PortfolioPage({ params }: pageProps) {
  const supabase = await createSupabaseServer();

  const { username } = await params;

  console.log(username)

  const {data , error} = await supabase.from("profile").select("user_id").eq("user_name" , username).single();

  if(error || !data) {
    console.log("there is error when fetch user_id from profile table in portfolio page" , error);
    return <ToastError message={"Something went wrong! , please check your internt connection"} />
  }

  const user_id = data.user_id;


  const [
    categoriesResult,
    projectsResult,
    toolsResult,
    technologiesResult,
    socialResult,
    bioResult,
    aboutResult,
  ] = await Promise.all([
    supabase.from("categories").select("*").eq("user_id", user_id),
    supabase.from("projects").select("*").eq("user_id", user_id),
    supabase.from("tools").select("*").eq("user_id", user_id),
    supabase.from("technologies").select("*").eq("user_id", user_id),
    supabase.from("social").select("*").eq("user_id", user_id).maybeSingle(),
    supabase.from("bio").select("*").eq("user_id", user_id).maybeSingle(),
    supabase.from("about").select("*").eq("user_id", user_id).maybeSingle(),
  ]);

  const { data: categoriesData, error: categoryError } = categoriesResult;
  const { data: projectsData, error: projectsError } = projectsResult;
  const { data: toolsData, error: toolsError } = toolsResult;
  const { data: tecnologyiesData, error: tecnologyiesError } = technologiesResult;
  const { data: socialData, error: socialError } = socialResult;
  const { data: bioData, error: bioError } = bioResult;
  const { data: aboutData, error: aboutError } = aboutResult;

  console.log(categoryError , projectsError , toolsError , tecnologyiesError , socialError , bioError , aboutError);


  if (
    projectsError ||
    categoryError ||
    toolsError ||
    tecnologyiesError ||
    socialError ||
    bioError ||
    aboutError
  )
    return (
      <ToastError
        message={"Something went wrong! , please check your internt connection"}
      />
    );

  return (
    <div>
      <ParticlesBasic>
        <Landing
          user_id={user_id}
          projectsData={projectsData}
          categoriesData={categoriesData}
          toolsData={toolsData}
          tecnologyiesData={tecnologyiesData}
          socialData={socialData}
          bioData={bioData}
          aboutData={aboutData}
        />
      </ParticlesBasic>
    </div>
  );
}
