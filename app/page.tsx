import dynamic from "next/dynamic"
import ParticlesBasic from "./Components/global/ParticlesBasic";
import MainHero from "./Components/home/MainHero"
import MainHeader from "./Components/home/MainHeader"

const SliderPreview = dynamic(() => (import("./Components/home/SliderPreview")).then((mod) => mod.SliderPreview), { ssr: false })
const MainFeature = dynamic(() => (import("./Components/home/MainFeature")).then((mod) => mod.MainFeature), { ssr: false })
const Pricing = dynamic(() => (import("./Components/home/Pricing")).then((mod) => mod.Pricing), { ssr: false })
const CTA = dynamic(() => (import("./Components/home/CTA")).then((mod) => mod.CTA), { ssr: false })
const MainFooter = dynamic(() => (import("./Components/home/MainFooter")).then((mod) => mod.MainFooter), { ssr: false })

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