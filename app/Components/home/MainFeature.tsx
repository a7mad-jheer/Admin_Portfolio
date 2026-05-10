"use client";
import {motion} from "framer-motion"
const feature = [
  { id: 0, name: "SEO Optimization", icon: "⚡" , descripiton : "Rank your portfolio higher on Google and get discovered by recruiters easily."},
  { id: 1, name: "Admin Panel", icon: "🧠" , descripiton : "Easily manage your projects, skills, and content from a simple dashboard."},
  { id: 2, name: "Fast Performance", icon: "🚀" , descripiton : "Lightning-fast loading with optimized server-side rendering for better user experience."},
];

export const MainFeature = () => {

    const container = {
        hidden : {},
        show : {
            transition : {
                staggerChildren : 0.4,
            }
        }
    }

    const item = {
        hidden : {opacity : 0 , y : -100},
        show : {opacity: 1 , y : 0}
    }
  return (
    <motion.div
        variants = {container}
        initial="hidden"
        whileInView="show"
        viewport={{once:true}}
        className="min-h-screen flex flex-col items-center justify-center px-6 py-20 gap-12">
      <motion.h1
        variants = {item}
        className="text-3xl xl:text-6xl leading-tight max-w-2xl font-bold mb-2 drop-shadow-[0_0_20px_rgba(0,130,246,.5)] bg-gradient-to-b from-white/70 to-white via-white/80 bg-clip-text text-transparent text-center">
        Powerful Features  Everything you need to build a <span className="text-blue-600/60">portfolio</span> faster
      </motion.h1>

      <motion.p 
        variants = {item}
        className="text-gray-400 text-center max-w-xl">
        Create a professional portfolio in minutes with SEO optimization, fast performance, and a powerful admin dashboard.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl justify-items-center">
        {feature.map((f) => {
          return (
            <motion.div
                variants={item}
              key={f.id}
              className="group md:col-span-1 relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl
              transition duration-300 hover:-translate-y-2
              hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] w-full overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl" />
              <div className="relative z-10 text-center">
                <span className="text-3xl mb-4">{f.icon}</span>
                <p className="text-white text-xl font-semibold">{f.name}</p>
                <p className="text-gray-400 text-sm mt-2">
                  {f.descripiton}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default MainFeature;
