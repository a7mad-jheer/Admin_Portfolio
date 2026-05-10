import TitlePanel from "../../components/Global/TitlePanel";
import OverviewCard from "../../components/OverviewComponent/OverviewCard";
import BioPreview from "../../components/OverviewComponent/BioComponent/BioPreview";
import LatestActivity from "../../components/OverviewComponent/LatestActivity";
import OverviewBtn from "../../components/OverviewComponent/OverviewBtn";
import SocialMediaPerview from "./socialMediaComponent/SocialMediaPerview";
import AboutPreview from "./AboutComponent/AboutPreview";
import { createSupabaseServer } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { getUserServer } from "@/lib/getUserServer";

type User = {
  id: string;
  email?: string;
  name?: string;
};

export const OverviewPage = async () => {
  const supabase = await createSupabaseServer();
  const user: User | null = await getUserServer();

  if (!user) {
    redirect("/login");
  }

  console.log("user id from server" + user.id);

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

  return (
    <div className="relative text-white p-4 bg-zinc-900 mt-7 rounded-xl ">
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
      <div className="grid grid-cols-12  auto-rows-fr gap-5 ">
        <div className="col-span-12 sm:col-span-6 md:col-span-4 ">
          <BioPreview bioSupabase={bioData} user_id={user.id} />
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-4 ">
          <SocialMediaPerview socialSupabase={socialData} user_id={user.id} />
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-4 ">
          <AboutPreview aboutSupabase={aboutData} user_id={user.id} />
        </div>
      </div>
      <LatestActivity />
    </div>
  );
};

export default OverviewPage;
