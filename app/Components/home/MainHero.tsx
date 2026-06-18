"use client";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { LoadingLink } from "../global/LoadingLink";

// const MotionLink = motion(LoadingLink)

const MainHero = () => {
//   const container = {
//     hidden: {},
//     show: {
//       transition: {
//         staggerChildren: 0.4,
//       },
//     },
//   };

//   const item = {
//     hidden: { opacity: .2, y: -100 },
//     show: { opacity: 1, y: 0 },
//   };

   return (
    <div

      className="min-h-screen flex flex-col items-center justify-center gap-8 px-5"
    >
      <div

        className="text-gray-600  text-center flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur-sm w-fit px-2 py-1 shadow-sm shadow-blue-500/40 rounded-full"
      >
        <span>
          <FaStar />
        </span>
        <p className="text-xs font-semibold text-gray-500">
          No-code Portfolio Builder
        </p>
      </div>

      <div className=" text-center flex flex-col gap-4">
        <h1
          
          className="text-3xl xl:text-6xl leading-tight max-w-3xl font-bold mb-2 drop-shadow-[0_0_20px_rgba(0,130,246,.5)] bg-gradient-to-b from-white/90 to-white via-white/80 bg-clip-text text-transparent"
        >
          Build a professional  <span className="text-blue-600/60">portfolio</span> in 5 minutes <br/> no coding required
        </h1>
        <p className="text-gray-400 text-center max-w-3xl ">
          A fast way to build and launch your professional portfolio
          online.{" "}
        </p>
      </div>

      <LoadingLink
        href="/signup"
        styleLoading="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xl shadow-blue-500/50 py-2.5 px-8 rounded-full cursor-pointer transition "
        posthogText = "signup_clicked"
        
      >
        Get Start
      </LoadingLink>
    </div>
   )}
  
  // return (
  //   <motion.div
  //     variants={container}
  //     initial="hidden"
  //     whileInView="show"
  //     viewport={{ once: true }}
  //     className="min-h-screen flex flex-col items-center justify-center gap-8 px-5"
  //   >
  //     <motion.div
  //       variants={item}
  //       className="text-gray-600  text-center flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur-sm w-fit px-2 py-1 shadow-sm shadow-blue-500/40 rounded-full"
  //     >
  //       <span>
  //         <FaStar />
  //       </span>
  //       <p className="text-xs font-semibold text-gray-500">
  //         No-code Portfolio Builder
  //       </p>
  //     </motion.div>

  //     <div className=" text-center flex flex-col gap-4">
  //       <motion.h1
  //         variants={item}
  //         className="text-3xl xl:text-6xl leading-tight max-w-3xl font-bold mb-2 drop-shadow-[0_0_20px_rgba(0,130,246,.5)] bg-gradient-to-b from-white/90 to-white via-white/80 bg-clip-text text-transparent"
  //       >
  //         Build a professional  <span className="text-blue-600/60">portfolio</span> in 5 minutes <br/> no coding required
  //       </motion.h1>
  //       <motion.p variants={item} className="text-gray-400 text-center max-w-3xl ">
  //         A fast way to build and launch your professional portfolio
  //         online.{" "}
  //       </motion.p>
  //     </div>

  //     <MotionLink
  //       href="/signup"
  //       styleLoading="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xl shadow-blue-500/50 py-2.5 px-8 rounded-full cursor-pointer transition "
  //       posthogText = "signup_clicked"
  //       whileHover={{ scale: 1.05 }}
  //       whileTap={{ scale: 0.97 }}
  //       variants={item}
        
  //     >
  //       Get Start
  //     </MotionLink>
  //   </motion.div>

export default MainHero;
