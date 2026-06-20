"use client";
import { useState } from "react";
import Link from "next/link";
import z from "zod";
import { SignupSchema } from "@/Schema/authSchema";
import { supabase } from "@/lib/supabase";
import ErrorSchema from "../(Admin)/components/Error/ErrorSchema";
import ToastError from "../(Admin)/components/Error/ToastError";
import { m, LazyMotion, domAnimation, easeOut } from "framer-motion";
import { IoMdReturnRight } from "react-icons/io";
import { useReqStatus } from "@/hook/ui/useReqStatus";
import { useToast } from "@/hook/ui/useToast";
import { useRouter } from "next/navigation";
import { LoadingLink } from "../Components/global/LoadingLink";
import { useLoading } from "@/hook/ui/useLoading";
import dynamic from "next/dynamic";

const ParticlesBasic = dynamic(
  () =>
    import("../Components/global/ParticlesBasic").then(
      (mod) => mod.ParticlesBasic,
    ),
  { ssr: false },
);

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0.6, y: -20 },
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
  hidden: { opacity: 0.2, x: 50 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: easeOut,
    },
  },
};

type SignData_Type = {
  user_name: string;
  name: string;
  email: string;
  password: string;
};

type signupSchema = z.infer<typeof SignupSchema>;

export default function Signup() {
  const router = useRouter();

  const [signData, setSignData] = useState<SignData_Type>({
    user_name: "",
    name: "",
    email: "",
    password: "",
  });
  const [errorSchema, setErrorSchema] = useState<
    Partial<Record<keyof signupSchema, string>>
  >({});

  const { setLoading } = useLoading();

  /*api opertations */
  const { status, loading, success, fail } = useReqStatus();
  const { show, message } = useToast();
  /*api opertations */

  const handleSendData = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status.loading) return;

    setLoading(true);

    // 1. validation
    const result = SignupSchema.safeParse(signData);

    if (!result.success) {
      const fieldError: Partial<Record<keyof signupSchema, string>> = {};

      result.error.issues.forEach((err) => {
        fieldError[err.path[0] as keyof signupSchema] = err.message;
      });

      setLoading(false);
      setErrorSchema(fieldError);
      return;
    }

    setErrorSchema({});
    loading();

    // 2. signup auth
    const { error: signupError } = await supabase.auth.signUp({
      email: signData.email,
      password: signData.password,
      options: {
        emailRedirectTo: "https://admin-portfolio-delta-flame.vercel.app/login",
        data: {
          name: signData.name,
          user_name: signData.user_name,
        },
      },
    });

    // 3. handle error
    if (signupError) {
      if (signupError.message.includes("rate limit")) {
        show("You’ve tried too many times. Please wait a few minutes.");
      } else if (signupError.message.includes("already registered")) {
        show("This email is already registered. Try logging in.");
      } else {
        show("Something went wrong. Please try again.");
        console.log(signupError);
      }

      setLoading(false);
      fail();
      return;
    }

    // //here we shoud put email confirm"
    // const {data : {user}} = await supabase.auth.getUser();
    // console.log(user?.email_confirmed_at)

    // if(user?.email_confirmed_at === null) {
    //   show("Please confirm your email to complete signup.");
    //   fail();
    //     router.push(`/verify-Email?email=${signData.email}`);
    //   return;
    // }

    // 6. success flow
    success();
    setLoading(false);
    // show("We’ve sent a confirmation email to your inbox.");
    show("signup Successfully , please wait to login");
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
    }, 3000);
  };

  return (
    <LazyMotion features={domAnimation}>
      
        <div className="relative h-screen w-full flex flex-col items-center justify-center  ">
          {message && <ToastError message={message} />}

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
              Create your portfolio in minutes.
            </m.h2>

            <m.p
              variants={item}
              className="text-sm text-gray-400 max-w-xs m-auto md:max-w-lg "
            >
              No coding. No hassle. Just add your projects and go live
              instantly.
            </m.p>
            <div className="absolute inset-0 shadow-md shadow-blue-600 bg-blue-600/20 blur-2xl" />
          </m.div>

          <m.div
            variants={form}
            initial="hidden"
            animate="show"
            className="relative bg-black/50  rounded-md px-5 xl:w-1/3 py-10"
          >
            <h2 className="text-white/90 text-center text-2xl font-semibold">
              Signup Now
            </h2>

            <form
              onSubmit={handleSendData}
              className="flex flex-col gap-2 p-5 rounded-xl "
            >
              {errorSchema.name && (
                <ErrorSchema errorSchema={errorSchema.name} />
              )}
              <input
                value={signData.name}
                onChange={(e) =>
                  setSignData((prev) => ({ ...prev, name: e.target.value }))
                }
                type="text"
                placeholder="Enter Your Name..."
                className="bg-gray-400/30  text-white p-2  rounded-md outline-none"
              />

              {errorSchema.user_name && (
                <ErrorSchema errorSchema={errorSchema.user_name} />
              )}
              <input
                value={signData.user_name}
                onChange={(e) =>
                  setSignData((prev) => ({
                    ...prev,
                    user_name: e.target.value,
                  }))
                }
                type="text"
                placeholder="Enter Your user_name.."
                className="bg-gray-400/30  text-white p-2  rounded-md outline-none"
              />

              {errorSchema.email && (
                <ErrorSchema errorSchema={errorSchema.email} />
              )}
              <input
                value={signData.email}
                onChange={(e) =>
                  setSignData((prev) => ({ ...prev, email: e.target.value }))
                }
                type="email"
                placeholder="Enter Your Email.."
                className="bg-gray-400/30  text-white p-2  rounded-md outline-none"
              />

              {errorSchema.password && (
                <ErrorSchema errorSchema={errorSchema.password!} />
              )}
              <input
                value={signData.password}
                onChange={(e) =>
                  setSignData((prev) => ({ ...prev, password: e.target.value }))
                }
                type="password"
                placeholder="Enter Your Password"
                className="bg-gray-400/30  text-white p-2  rounded-md outline-none"
              />

              <button
                type="submit"
                disabled={status.loading}
                className="text-white bg-blue-500/60 py-2 px-8 m-auto mt-5 rounded-md w-fit hover:blue-700"
              >
                {status.loading ? "wait..." : "Sign Up"}
              </button>

              <LoadingLink
                posthogText="signUptoIn_Clicked"
                href="/login"
                styleLoading="text-blue-800 text-xs text-center underline"
              >
                Go to login page
              </LoadingLink>
            </form>
          </m.div>
        </div>
    </LazyMotion>
  );
}
