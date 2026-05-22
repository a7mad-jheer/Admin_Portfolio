"use client"
import { useState } from "react";
import { ParticlesBasic } from "../Components/global";
import Link from "next/link";
import z from "zod";
import { SignupSchema } from "@/Schema/authSchema";
import { supabase } from "@/lib/supabase";
import ErrorSchema from "../(Admin)/components/Error/ErrorSchema";
import ToastError from "../(Admin)/components/Error/ToastError";
import { motion , easeOut } from "framer-motion";
import { IoMdReturnRight } from "react-icons/io";
import { useReqStatus } from "@/hook/ui/useReqStatus";
import { useToast } from "@/hook/ui/useToast";
import { useInsertData } from "@/hook/api/useInsertData";
import { useRouter } from "next/navigation";


const container = {
  hidden : {},
  show : {
    transition : {
      staggerChildren : 0.4,
    },
  }
}

const item = {
  hidden : {opacity : 0 , y : -50},
  show : {opacity : 1 , y : 0 , 
    transition : {
      duration : 0.4 ,
      ease : easeOut,
    }
  }
}

const form = {
  hidden : {opacity : 0 , x : 100},
  show : {opacity : 1 , x:0 ,
    transition : {
      duration : 0.4 ,
      ease : easeOut,
    }
  }
}

type SignData_Type = {
  user_name : string ,
  name : string ,
  email : string ,
  password : string
}

    type signupSchema = z.infer<typeof SignupSchema>;


export default  function Signup() {
  const router = useRouter();

  const [signData , setSignData] = useState<SignData_Type>({
    user_name : "",
    name : "",
    email : "",
    password : "",
  })
   const [errorSchema , setErrorSchema ] = useState<Partial<Record<keyof signupSchema , string>>>({})

  /*api opertations */
  const {status , loading , success , fail} = useReqStatus();
  const {show , message} = useToast();
  const {insertData} = useInsertData();
  /*api opertations */



const handleSendData = async (e: React.FormEvent) => {
  e.preventDefault();

  if (status.loading) return;

  // 1. validation
  const result = SignupSchema.safeParse(signData);

  if (!result.success) {
    const fieldError: Partial<Record<keyof signupSchema, string>> = {};

    result.error.issues.forEach((err) => {
      fieldError[err.path[0] as keyof signupSchema] = err.message;
    });

    setErrorSchema(fieldError);
    return;
  }

  setErrorSchema({});
  loading();

  // 2. signup auth
  const { data, error: signupError } = await supabase.auth.signUp({
    email: signData.email,
    password: signData.password,
    options : {
      emailRedirectTo : "http://localhost:3000/auth/callback",
     data : {
      name : signData.name,
      user_name : signData.user_name,
     }
    }
  });

  // 3. handle error
  if (signupError) {
    if (signupError.message.includes("rate limit")) {
      show("You’ve tried too many times. Please wait a few minutes.");
    } else if (signupError.message.includes("already registered")) {
      show("This email is already registered. Try logging in.");
    } else {
      show("Something went wrong. Please try again.");
      console.log(signupError)
    }

    fail();
    return;
  }


  // 6. success flow
  success();
  // show("We’ve sent a confirmation email to your inbox.");
  show("signup Successfully , please wait to login")
  setSignData({
    user_name: "",
    name: "",
    email: "",
    password: "",
  });

  // 7. redirect
  setTimeout(() => {
    // router.push(`/verify-Email?email=${signData.email}`);
    router.push("/login");
  }, 3000)
};
  




  return (
    <ParticlesBasic>
    <div className=" h-screen flex flex-col items-center justify-center  w-full">
    {message && <ToastError message={message}/>}

      <div className="absolute top-5 right-5 text-white text-3xl bg-blue-600/20 h-12 w-12 rounded-full flex items-center justify-center cursor-pointer hover:scale-105">
        <Link href="/"><IoMdReturnRight/></Link>  
      </div>

      <motion.div 
        variants = {container}
        initial = "hidden"
        whileInView="show"
        viewport = {{once : true}}
        className="relative text-white text-center space-y-4 mb-10 ">
        <motion.h1
          variants={item}
          initial="hidden"
          animate="show"
          className="font-semibold text-3xl max-w-md md:max-w-lg  ">Create your portfolio in minutes.</motion.h1>

        <motion.p 
          variants={item}
                    initial="hidden"
          animate="show"
          className="text-sm text-gray-400 max-w-xs m-auto md:max-w-lg ">No coding. No hassle. Just add your projects and go live instantly.</motion.p>
        <div className="absolute inset-0 shadow-md shadow-blue-600 bg-blue-600/20 blur-2xl"/>
      </motion.div>

      <motion.div 
          variants = {form}
          initial="hidden"
          animate="show"
        className="bg-black/50  rounded-md p-5 xl:w-1/2">
        <h1 className="text-white/90 text-center text-2xl font-semibold">Signup Now</h1>
        
        <form 

          onSubmit={handleSendData}
          className=" flex flex-col gap-2 p-5 rounded-xl ">
            {errorSchema.name && <ErrorSchema errorSchema={errorSchema.name}/>}
          <input
            value={signData.name}
            onChange={(e) => {setSignData((prev) => ({...prev , name : e.target.value}))}}
          type="text" placeholder="Enter Your Name..." 
          className="bg-gray-400/30  text-white p-2  rounded-md outline-none"
          />

          {errorSchema.user_name && <ErrorSchema errorSchema={errorSchema.user_name}/>}
          <input
            value = {signData.user_name}
            onChange={(e) => {setSignData((prev) => ({...prev , user_name : e.target.value}))}}
            type="text"
            placeholder="Enter Your user_name.."
            className="bg-gray-400/30  text-white p-2  rounded-md outline-none"
          />

          {errorSchema.email && <ErrorSchema errorSchema={errorSchema.email}/>}
          <input
            value = {signData.email}
            onChange={(e) => {setSignData((prev) => ({...prev , email : e.target.value}))}}
            type="email"
            placeholder="Enter Your Email.."
            className="bg-gray-400/30  text-white p-2  rounded-md outline-none"
          />
          
          {errorSchema.password && <ErrorSchema errorSchema={errorSchema.password!}/>}
          <input
            value = {signData.password}
            onChange={(e) => {setSignData((prev) => ({...prev , password : e.target.value}))}} 
            type="password" placeholder="Enter Your Password" 
            className="bg-gray-400/30  text-white p-2  rounded-md outline-none"
          />
          <button 
            type="submit"
             disabled={status.loading}
            className="text-white bg-blue-500/60 py-2 px-8 m-auto mt-5 rounded-full w-fit hover:blue-700">
              {status.loading ? "wait..." : "Sign Up"}
              </button>
            <Link href="/login" className="text-blue-800 text-xs text-center underline">Go to login page</Link>
        </form>
      </motion.div>
    </div>
    </ParticlesBasic>
  );
}
