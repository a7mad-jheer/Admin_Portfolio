import { Particles } from "@/config/components/ui/shadcn-io/particles";

export  function ParticlesBasic({children} : {children:React.ReactNode}) {
  return (
    <div className="relative flex w-full min-h-screen flex-col  overflow-hidden  border bg-slate-900 dark:bg-slate-950 md:shadow-xl xl:px-60 md:px-15 ">
        {children}
      <Particles className="absolute inset-0" color="#ffffff" ease={80} quantity={100} refresh />
    </div>
  )
}

export default ParticlesBasic;