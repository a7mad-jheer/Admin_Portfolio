import { redirect } from "next/navigation";
import TitlePanel from "../../components/Global/TitlePanel";
import About from "../../components/SettingComponent/About";
import Bio from "../../components/SettingComponent/Bio";
import SocialMediaUrl from "../../components/SettingComponent/SocialMediaUrl";
import { getUserServer } from "@/lib/getUserServer";

type user = {
  id: string;
  email?: string;
  name?: string;
};

export const Setting = async () => {
  const User: user | null = await getUserServer();
  const user_id = User?.id;

  if (!user_id) {
    redirect("/login");
  }

  return (
    <div className="text-white p-4 ">
      <TitlePanel title="Settings" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 ">
          <Bio />
          <SocialMediaUrl user_id={user_id} />
          <About user_id={user_id} />
      </div>
    </div>
  );
};

export default Setting;
