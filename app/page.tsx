import ParticlesBasic from "./Components/global/ParticlesBasic";
import MainHero from "./Components/home/MainHero";
import MainHeader from "./Components/home/MainHeader";
import HomeClient from "./Components/home/HomeClient";

export default function Home() {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <ParticlesBasic>
          <div className="w-full h-full"></div>
        </ParticlesBasic>
      </div>

      <MainHeader />
      <MainHero />
      <HomeClient />
    </>
  );
}
