import TitlePanel from "../../components/Global/TitlePanel";
import About from "../../components/SettingComponent/About";
import Bio from "../../components/SettingComponent/Bio";
import SocialMediaUrl from "../../components/SettingComponent/SocialMediaUrl";


export const Setting = () => {
  return (
    <div className="text-white p-4 ">
      <TitlePanel title="Settings"/>
      <div className="grid grid-cols-12 gap-5 auto-rows-fr">
        <div className="sm:col-span-4  col-span-12 h-full">
          <Bio />
        </div>
      <div className="sm:col-span-4  col-span-12 h-full">
        <SocialMediaUrl />
      </div>
      <div className="sm:col-span-4 col-span-12 h-full">
      <About />
      </div>
      </div>
    </div>
  )
}

export default Setting;