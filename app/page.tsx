import dynmic from "next/dynamic"
import ParticlesBasic from "./Components/global/ParticlesBasic";
import MainHero from "./Components/home/MainHero"
import MainHeader from "./Components/home/MainHeader"

const SliderPreview = dynmic(() => (import("./Components/home/SliderPreview")))
const MainFeature = dynmic(() => (import("./Components/home/MainFeature")))
const Pricing = dynmic(() => (import("./Components/home/Pricing")))
const CTA = dynmic(() => (import("./Components/home/CTA")))
const MainFooter = dynmic(() => (import("./Components/home/MainFooter")))

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