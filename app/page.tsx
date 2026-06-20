import ParticlesBasic from "./Components/global/ParticlesBasic";
import MainHero from "./Components/home/MainHero"
import MainHeader from "./Components/home/MainHeader"
import HomeClient from "./Components/home/HomeClient";



export default  function Home() {
    return (
        <ParticlesBasic>
            <MainHeader /> 
            <MainHero />
           <HomeClient/>
        </ParticlesBasic>
    )
}