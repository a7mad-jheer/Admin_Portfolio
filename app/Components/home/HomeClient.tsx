"use client"

import dynamic from "next/dynamic"

const SectionSkeleton = () => (
  <div className="min-h-screen animate-pulse bg-white/5" />
)

const SliderPreview = dynamic(() => (import("./SliderPreview")).then((mod) => mod.SliderPreview), {ssr : false  , loading : () => SectionSkeleton()})
const MainFeature = dynamic(() => (import("./MainFeature")).then((mod) => mod.MainFeature) , {loading : () => SectionSkeleton()})
const Pricing = dynamic(() => (import("./Pricing")).then((mod) => mod.Pricing) , {loading : () => SectionSkeleton()})
const CTA = dynamic(() => (import("./CTA")).then((mod) => mod.CTA), {loading : () => SectionSkeleton()})
const MainFooter = dynamic(() => (import("./MainFooter")).then((mod) => mod.MainFooter), {loading : () => SectionSkeleton()})



export const HomeClient = () => {
    return (
         <>
         <SliderPreview />
            <MainFeature/>
            <Pricing />
            <CTA/>
            <MainFooter />
         </>
    )
}

export default HomeClient