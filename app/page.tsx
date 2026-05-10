import ParticlesBasic from "./Components/global/ParticlesBasic";
import SplashLoading from "./Components/global/SplashLoading";
import CTA from "./Components/home/CTA";
import MainFeature from "./Components/home/MainFeature";
import MainHeader from "./Components/home/MainHeader";
import MainHero from "./Components/home/MainHero";
import Pricing from "./Components/home/Pricing";
import SliderPreview from "./Components/home/SliderPreview";

async function getData() {
        await new Promise((resolve) => setTimeout(resolve , 2000));
        return true;
    }

export default async function Home() {
    await getData();

    return (
        <SplashLoading>
        <ParticlesBasic>
            <MainHeader /> 
            <MainHero />
            <SliderPreview />
            <MainFeature/>
            <Pricing />
            <CTA/>
        </ParticlesBasic>
    </SplashLoading>
    )
}