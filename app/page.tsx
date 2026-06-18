import dynamic from "next/dynamic"
import ParticlesBasic from "./Components/global/ParticlesBasic";
import MainHero from "./Components/home/MainHero"
import MainHeader from "./Components/home/MainHeader"

const SliderPreview = dynamic(() => (import("./Components/home/SliderPreview")).then((mod) => mod.SliderPreview))
const MainFeature = dynamic(() => (import("./Components/home/MainFeature")).then((mod) => mod.MainFeature))
const Pricing = dynamic(() => (import("./Components/home/Pricing")).then((mod) => mod.Pricing))
const CTA = dynamic(() => (import("./Components/home/CTA")).then((mod) => mod.CTA), )
const MainFooter = dynamic(() => (import("./Components/home/MainFooter")).then((mod) => mod.MainFooter))

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