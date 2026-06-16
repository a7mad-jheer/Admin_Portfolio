import dynmic from "next/dynamic"
import ParticlesBasic from "./Components/global/ParticlesBasic";
import CTA from "./Components/home/CTA";
import MainFeature from "./Components/home/MainFeature";
import MainFooter from "./Components/home/MainFooter";
import MainHeader from "./Components/home/MainHeader";
import Pricing from "./Components/home/Pricing";
import SliderPreview from "./Components/home/SliderPreview";

const MainHero = dynmic(() => (import("./Components/home/MainHero")))

export default  function Home() {
    return (
        <ParticlesBasic>
            <MainHeader /> 
            <MainHero />
            <SliderPreview />
            <MainFeature/>
            <Pricing />
            <CTA/>
            <MainFooter />
        </ParticlesBasic>
    )
}