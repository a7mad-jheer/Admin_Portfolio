"use client";

import { SetStateAction, useState } from "react";
import { useReqStatus } from "@/hook/ui/useReqStatus";
import { BiLogoGmail } from "react-icons/bi";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { MdOutlineWhatsapp } from "react-icons/md";
import { LuGithub } from "react-icons/lu";
import { useToast } from "@/hook/ui/useToast";
import ToastError from "../../Error/ToastError";
import { IconType } from "react-icons";
import { useUpdateData } from "@/hook/api/useUpdateData";
import IconAction from "../../Global/IconAction";

  type socialObjType = {id : number , name : socialMediaKey , url : string , icon : IconType , iconStyle : string}


type socialMediaType = {
  id: number | null;
  user_id: string;
  Gmail: string;
  Facebook: string;
  Whatsapp: string;
  Github: string;
  LinkedIn: string;
};

type socialMediaKey = "Gmail" | "Facebook" | "Whatsapp" | "Github" | "LinkedIn"

type props = {
  data: socialMediaType;
};

export const SocialMediaCard = ({
  data,
}: props) => {

  const social : socialObjType[] = [
    {
      id: 0,
      name: "Gmail",
      url: data?.Gmail,
      icon: BiLogoGmail,
      iconStyle: "bg-[#EA4335] ",
    },
    {
      id: 1,
      name: "Facebook",
      url: data?.Facebook,
      icon: FaFacebookF,
      iconStyle: "bg-[#1877F2] ",
    },
    {
      id: 2,
      name: "Whatsapp",
      url: data.Whatsapp,
      icon: MdOutlineWhatsapp,
      iconStyle: "bg-[#25D366] ",
    },
    {
      id: 3,
      name: "Github",
      url: data.Github,
      icon: LuGithub,
      iconStyle: "bg-[#181717] ",
    },
    {
      id: 5,
      name: "LinkedIn",
      url: data.LinkedIn,
      icon: FaLinkedinIn,
      iconStyle: "bg-[#0A66C2]",
    },
  ];

  return (
    <div className="relative w-full  bg-[hsl(0_0%_10.98%)] border border-gray-800 p-4 rounded-md mt-5 flex flex-col gap-5">

      {social.map((link) => {
        return (
          <div
            key={link.id}
            className="relative  h-full w-full bg-gradient-to-r from-gray-400/20 to-gray-600/20 p-4 rounded-md  space-y-2"
          >
            <div className="flex gap-4  flex-1  ">
              <span
                className={`${link.iconStyle} border border-gray-600 text-2xl w-10 h-10 flex items-center justify-center rounded-md`}
              >
                <link.icon />
              </span>


                <div className="flex-1 flex justify-between items-center overflow-hidden">
                  <div className="flex flex-col">
                    <span className="font-semibold">{link.name}</span>
                    <span className="text-gray-600 cursor-pointer underline text-xs">
                      {link.url !== "" ? link.url : "No Link Added!"}
                    </span>
                  </div>
                </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};


