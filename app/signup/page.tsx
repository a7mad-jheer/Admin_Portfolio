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



  const handleSendData =  async (e : React.FormEvent) => {
    e.preventDefault()

    if(status.loading) return;

    /* we here use schema to safe state in the form and give error */
    const result = SignupSchema.safeParse(signData);
    if(!result.success) {
      const fieldError : typeof errorSchema = {};

      result.error.issues.forEach((err) => {
        fieldError[err.path[0] as keyof signupSchema] = err.message;
      })

      setErrorSchema(fieldError);
      return;
    }

    setErrorSchema({})
    loading();

    // now the form data is true we need to check the email , password in auth.signup
    const {data : {user} , error:SignupError} = await supabase.auth.signUp({
      email : signData.email! ,
      password : signData.password!
    });

    if(SignupError) {
      console.log("error throw signup problem in data" , SignupError);
      fail();
      show("Somting went wrong , please try again!");
      return;
    }

    const userInformation = user;
    console.log(userInformation);

    if(!userInformation) {
      console.log("no user returned from signup!")
      fail();
      show("Somting went wrong , please try again!");
      return;
    }




    const {error : profileError} = await insertData('profile' , {
      user_name : signData.user_name ,
      name : signData.name!,
      email:userInformation.email!,
      user_id: userInformation.id!,
      isSubscribed : false,
      trialEndsAt : new Date(Date.now() + 60*60*1000) 
    })

    if(profileError) {
      console.log("error throw in profile table" , profileError);
      fail();
      show("Somting went wrong! , please try again");
      return;
    }

    success();
    show("Signup Successfully , please Login")
    setSignData({
      user_name : "",
      name : "",
      email : "",
      password : ""
    })

    router.replace("/login");
  }
  




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
