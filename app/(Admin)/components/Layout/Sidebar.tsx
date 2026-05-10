"use client";
import { MdArrowBackIosNew } from "react-icons/md";
import { Logo } from "@/app/Components/global/Logo";
import { SetStateAction, useState } from "react";
import {
  FaHome,
  FaProjectDiagram,
  FaTools,
  FaBriefcase,
  FaEnvelope,
  FaChartLine,
  FaCog,
  FaList,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { HiMiniHomeModern } from "react-icons/hi2";

import { FaAngleDown } from "react-icons/fa6"; // للـ dropdown arrow
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";

const SIDEBAR__DATA = [
  {
    id: 0,
    name: "Overview",
    href: "/Admin/overview",
    icon: HiMiniHomeModern,
  },

  {
    id: 1,
    name: "Projects",
    href: "/Admin/projects",
    icon: FaProjectDiagram,
  },

  {
    id: 2,
    name: "Skills",
    href: "/Admin/skills",
    icon: FaTools,
  },

  {
    id: 3,
    name: "Experience",
    href: "/Admin/experience",
    icon: FaBriefcase,
  },

  {
    id: 4,
    name: "Messages",
    href: "/Admin/messages",
    icon: FaEnvelope,
  },

  {
    id: 5,
    name: "Analytics",
    href: "/Admin/analytics",
    icon: FaChartLine,
  },

  {
    id: 6,
    name: "Settings",
    href: "/Admin/setting",
    icon: FaCog,
  },
];

type props = {
  showSidebar : boolean ,
  setShowSidebar :React.Dispatch<SetStateAction<boolean>>
}

export const Sidebar = ({showSidebar , setShowSidebar} : props) => {

  /* END FUNCTION */
  return (
    <div className={` ${showSidebar ? "flex w-full md:w-10 px-6 py-4" : "hidden"}  fixed top-10 group min-h-screen z-50  bg-[#171717]  w-10 md:hover:w-44 py-3 text-white md:flex flex-col px-1  transition-all duration-200 gap-2`}>

    <div className="flex items-center justify-center md:hidden">
      <Logo />
    </div>

      <div className="flex md:hidden items-center w-full relative">
              <input
                type="search"
                placeholder="Search..."
                className="
                  w-full pl-10 pr-3 py-1
                  rounded-full
                  bg-white/10
                  border border-white/10
                  focus:outline-none focus:border-blue-500
                  text-sm
                "
              />
              <IoSearchOutline className="absolute left-3 text-gray-400" />
            </div>

      {SIDEBAR__DATA.map((item) => {
        return (
          <div
          onClick={() => setShowSidebar(false)}
          key={item.id}>
            <Link href={item.href}
              
            className="flex items-center justify-between rounded-md hover:bg-[#313131] transition-colors duration-200 ">
            <div className="flex items-center py-1 px-2 gap-3 pointer-events-none group-hover:pointer-events-auto">
              <span className="">
              {<item.icon/>}
            </span>
            <span className={`${showSidebar ? "opacity-100 translate-x-0" : "opacity-0"} opacity-0 pointer-events-none -translate-x-20 group-hover:translate-x-0 group-hover:pointer-events-auto  group-hover:opacity-100 transition-all duration-300 text-sm font-semibold`}>{item.name}</span>
            </div>
            </Link>
            </div>
        )
      })}
    </div>
  )
};

