"use client";
import React, { useState } from "react";
import Link from "next/link";
import z from "zod";
import { LoginSchema } from "@/Schema/authSchema";
import ErrorSchema from "../(Admin)/components/Error/ErrorSchema";
import {LazyMotion , domAnimation , m , easeOut } from "framer-motion";
import { IoMdReturnRight } from "react-icons/io";
import { useReqStatus } from "@/hook/ui/useReqStatus";
import { useToast } from "@/hook/ui/useToast";
import ToastError from "../(Admin)/components/Error/ToastError";
import { supabase } from "@/lib/supabase";
import { useInsertData } from "@/hook/api/useInsertData";
import { useSelectData } from "@/hook/api/useSelectData";
import { useRouter } from "next/navigation";
import { useLoading } from "@/hook/ui/useLoading";
import dynamic from "next/dynamic";

const ParticlesBasic = dynamic(() => import ("../Components/global").then((mod) => mod.ParticlesBasic), { ssr: false });

type LoginData_Type = {
  email: string | null;
  password: string | null;
};

type loginInfer = z.infer<typeof LoginSchema>;

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: .6, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: easeOut,
    },
  },
};

const form = {
  hidden: { opacity: .6, x: 50 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: easeOut,
    },
  },
};

export default function Login() {
  const [loginData, setLoginData] = useState<LoginData_Type>({
    email: "",
    password: "",
  });
  const [errorSchema, setErrorSchema] = useState<
    Partial<Record<keyof loginInfer, string>>
  >({});

  const {setLoading} = useLoading();

  /* api operations */
  const { status, loading, fail, success } = useReqStatus();
  const { show, message } = useToast();
  const { insertData } = useInsertData();
  const { selectWithSingle } = useSelectData();
  /* api operations */

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status.loading) return;

    const result = LoginSchema.safeParse(loginData);
    if (!result.success) {
      const fieldError: typeof errorSchema = {};
      result.error.issues.forEach((err) => {
        fieldError[err.path[0] as keyof loginInfer] = err.message;
      });
      setErrorSchema(fieldError);
      return;
    }
    setErrorSchema({});

    setLoading(true);
    loading();
    

    //now we need to send user data to server side to create cookies;
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: loginData.email,
        password: loginData.password,
      }),
    });

    const contentType = res.headers.get("content-type");

    if (!contentType?.includes("application/json")) {
      const text = await res.text();

      console.log("Invalid response :", text);
      setLoading(false);
      show("Somthing went error!, please refresh the page and try again.");
    }

    const resultFetch = await res.json();
    console.log(resultFetch.error);

    if (!res.ok) {
      console.log(resultFetch);
      fail();
      show("Somthing went error , please try again!");
      setLoading(false);
      return;
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      fail();
      setLoading(false);
      show("Failed to retrieve user data. Please try again.");
      return;
    }

    if (!user) {
      setLoading(false);
      return router.replace("/login");
    }

    const { data: profileData, error: profileError } = await selectWithSingle(
      "profile",
      [{ column: "user_id", value: user.id }],
    );

    if (profileError) {
      console.log(profileError);
      fail();
      setLoading(false);
      show("Failed to retrieve user profile. Please try again.");
      return;
    }

    if (!profileData) {
      const {  error } = await insertData("profile", {
        user_id: user.id,
        name: user.user_metadata.name,
        user_name: user.user_metadata.user_name,
        email: user.email,
        isSubscribed: false,
        trialEndsAt: null,
      });

      if (error) {
        console.log(error);
        fail();
        setLoading(false);
        show("Failed to create user profile. Please try again.");
        return;
      }
    }

    show("Login Successfully, please wait ...");
    setLoginData({
      email: "",
      password: "",
    });

    setLoading(false);
    router.refresh();
    router.replace("/Admin/overview");
    success();
  };

  return (
      <LazyMotion features={domAnimation}>
      {message && <ToastError message={message} />}
      <div className=" h-screen flex flex-col items-center justify-center ">

        {/* use ParticlesBasic here inside div because we need to improve the performance and reduse the mainTheard js */}
        <div className="w-full h-screen absolute inset-0 z-0">
          <ParticlesBasic >
            <div className="w-full h-screen"/>
          </ParticlesBasic>
        </div>

        <div className="absolute top-5 right-5 text-white text-3xl bg-blue-600/20 h-12 w-12 rounded-full flex items-center justify-center cursor-pointer hover:scale-105">
          <Link href="/">
            <IoMdReturnRight />
          </Link>
        </div>

        <m.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative text-white text-center space-y-4 mb-10 "
        >
          <m.h2
            variants={item}
            className="font-semibold text-3xl max-w-md md:max-w-lg  "
          >
            Welcome back
          </m.h2>

          <m.p
            variants={item}
            className="text-sm text-gray-400 max-w-xs m-auto md:max-w-lg "
          >
            Continue building and managing your portfolio in seconds.
          </m.p>
          <div className="absolute inset-0 shadow-md shadow-blue-600 bg-blue-600/20 blur-2xl" />
        </m.div>

        <m.div
          variants={form}
          initial="hidden"
          animate="show"
          className="bg-black/50  rounded-md p-5 md:w-1/2"
        >
          <h2 className="text-white/90 text-center text-2xl font-semibold ">
            Login Now
          </h2>
          <form
            onSubmit={handleLogin}
            className=" flex flex-col gap-2 p-5 rounded-xl"
          >
            {errorSchema.email && (<ErrorSchema errorSchema={errorSchema.email!} />)}
            <input
              value={loginData.email!}
              onChange={(e) =>
                setLoginData((prev) => ({ ...prev, email: e.target.value }))
              }
              type="email"
              placeholder="Enter Your Email.."
              className="bg-gray-400/30  text-white p-2  rounded-md outline-none"
            />
            {errorSchema.password && (<ErrorSchema errorSchema={errorSchema.password!} />)}
            <input
              value={loginData.password!}
              onChange={(e) =>
                setLoginData((prev) => ({ ...prev, password: e.target.value }))
              }
              type="password"
              placeholder="Enter Your Password"
              className="bg-gray-400/30  text-white p-2  rounded-md outline-none"
            />
              <button
                type="submit"
                className="text-white bg-blue-500/60 py-2 px-8 mt-5 rounded-md w-fit hover:blue-700 cursor-pointer hover:scale-105 transition m-auto"
              >
                {status.loading ? "wait..." : "Login Now"}
              </button>

            <p className="text-center text-sm text-gray-500">
              Dont have an account?{" "}
              <Link
                href="/signup"
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </m.div>
      </div>
      </LazyMotion>
  );
}
