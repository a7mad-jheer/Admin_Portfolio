import TitlePanel from "../../components/Global/TitlePanel";
import OverviewCard from "../../components/OverviewComponent/OverviewCard";
import BioPreview from "../../components/OverviewComponent/BioComponent/BioPreview";
import OverviewBtn from "../../components/OverviewComponent/OverviewBtn";
import SocialMediaPerview from "./socialMediaComponent/SocialMediaPerview";
import AboutPreview from "./AboutComponent/AboutPreview";
import { createSupabaseServer } from "@/lib/supabase-server";
import { LatestActivity } from "./LatestActivity";
import { redirect } from "next/navigation";
import SkillsPreview from "./SkillsPreview";
import { Feedback } from "./Feedback";
import TechnologiesPreview from "./skillsComponent/TechnologiesPreview";
import ToolsPreview from "./skillsComponent/SkillPreview";
import ProjectsPreview from "./ProjectsPreview";

type User = {
  id: string;
  email?: string;
  name?: string;
};

type Profile = {
  id: number;
  name: string;
  user_name: string;
  user_id: string;
};

type props = {
  user: User | null;
  profile: Profile;
};

export const OverviewPage = async ({ user, profile }: props) => {
  const supabase = await createSupabaseServer();

  if (!user) {
    redirect("/login");
  }

  /* functions to get data count */
  const getCount = async (table: string, user_id: string) => {
    const { count, error } = await supabase
      .from(table)
      .select("id", { count: "exact", head: true })
      .eq("user_id", user_id);

    if (error) {
      console.log("there is error when fetch count");
      return 0;
    }

    return count ?? 0;
  };
  /* functions to get data count */

  /* fetch bio data from supabase */
  const { data: bioData, error: bioError } = await supabase
    .from("bio")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (bioError) {
    console.log("Somthing went wrong when fetch bio data", bioError);
    return (
      <div className="text-red-500">Failed to load data. Please try again.</div>
    );
  }

  /* fetch social media data from supabase */
  const { data: socialData, error: socialError } = await supabase
    .from("social")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (socialError) {
    console.log("error when select all data from bio table" + socialError);
    return (
      <div className="text-red-500">Failed to load data. Please try again.</div>
    );
  }

  /* fetch about data from supabase */
  const { data: aboutData, error: aboutError } = await supabase
    .from("about")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (aboutError) {
    console.log("Somthing Went Wrong When Fetch About Data", +aboutError);
    return (
      <div className="text-red-500">Failed to load data. Please try again.</div>
    );
  }

  /* fetch data of project , category , url... data count */
  const [projects, technologies, tools, categories] = await Promise.all([
    getCount("projects", user.id),
    getCount("technologies", user.id),
    getCount("tools", user.id),
    getCount("categories", user.id),
  ]);

  const social = aboutData
    ? Object.entries(aboutData).filter(
        ([key, value]) =>
          key !== "user_id" &&
          key !== "created_at" &&
          key !== "id" &&
          value !== "",
      ).length
    : 0;

  /* fetch activity data from supabase */
  const { data: activityData, error: activityError } = await supabase
    .from("activity")
    .select("*")
    .order("created_at", { ascending: false })
    .eq("user_id", user.id)
    .limit(5);

  if (activityError) {
    console.log(
      "Somthing went wrong when fetch activity from supabase",
      activityError,
    );
    return (
      <div className="text-red-500">Failed to load data. Please try again.</div>
    );
  }

  /* fetch technologies data from supabase */
  const { data: technologiesData, error: technologiesError } = await supabase
    .from("technologies")
    .select("*")
    .eq("user_id", user.id);

  if (technologiesError) {
    console.log(
      "somthing went error when fetch technologies data",
      technologiesError,
    );
    return (
      <div className="text-red-500">Failed to load data. Please try again.</div>
    );
  }

  const { data: toolsData, error: toolsError } = await supabase
    .from("tools")
    .select("*")
    .eq("user_id", user.id);
  if (toolsError) {
    console.log("somthing went error when fetch technologies data", toolsError);
    return (
      <div className="text-red-500">Failed to load data. Please try again.</div>
    );
  }

  /* Fetch project data from supabase */
  const { data: projectsData, error: projectsError } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.id);

  if (projectsError) {
    console.log(
      "somthing went error when fetch technologies data",
      projectsError,
    );
    return (
      <div className="text-red-500">Failed to load data. Please try again.</div>
    );
  }

  /* Fetch categories data from supabase */
  const { data: categoriesData, error: CategoriesError } = await supabase
    .from("categories")
    .select("*")
    .eq("user_id", user.id);

  if (CategoriesError) {
    console.log(
      "somthing went error when fetch technologies data",
      projectsError,
    );
    return (
      <div className="text-red-500">Failed to load data. Please try again.</div>
    );
  }

  console.log(projectsData);

  return (
    <div className="relative text-white p-4 md:p-6 bg-zinc-900 mt-7 rounded-xl  ">
      <div className="flex items-center justify-between">
        <TitlePanel title="Overview" />
        <OverviewBtn />
      </div>

      <OverviewCard
        projects={projects}
        technologies={technologies}
        tools={tools}
        categories={categories}
        social={social}
      />
      {/* <AddContent /> */}

      <div className="mt-6">
        <ProjectsPreview
          projectSupabase={projectsData}
          user_id={user.id}
          categoriesSupabase={categoriesData}
        />
      </div>

      <div className=" mt-8 grid grid-cols-1  gap-6 md:grid-cols-2 cl-grid-col-3">
        <BioPreview bioSupabase={bioData} user_id={user.id} />

        <AboutPreview aboutSupabase={aboutData} user_id={user.id} />

        <SocialMediaPerview socialSupabase={socialData} user_id={user.id} />

        <SkillsPreview
          serverData={technologiesData}
          user_id={user.id}
          skillName="technologies"
        />

        <SkillsPreview
          serverData={toolsData}
          user_id={user.id}
          skillName="tools"
        />

        <LatestActivity activitySupabase={activityData} />

        <Feedback user_id={user.id} profile={profile} />
      </div>
    </div>
  );
};

export default OverviewPage;
