"use client";
import { NavBar } from ".";
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { IoIosMailUnread } from "react-icons/io";
import { NavItem } from "@/config/navigation";
import { IoHome } from "react-icons/io5";
import { GiSkills } from "react-icons/gi";
import { GrProjects } from "react-icons/gr";
import { FaCommentDots, FaUserAlt } from "react-icons/fa";
import { CiCircleList } from "react-icons/ci";
import { useEffect, useState } from "react";
import { ListNav } from "../global";
import Logo from "../global/Logo";
import { social_Type } from "@/types/types";
import { SiGithub } from "react-icons/si";




const NavItems: NavItem[] = [
  // {id: 0 , icon : <FaAngleDoubleUp /> , href : "top"  },
  { id: 1, icon: <IoHome />, href: "#hero", name: "Hero", type: "navigation" },
  {
    id: 2,
    icon: <GrProjects />,
    href: "#project",
    name: "My Project",
    type: "navigation",
  },
  {
    id: 3,
    icon: <GiSkills />,
    href: "#skills",
    name: "My Skills",
    type: "navigation",
  },
  {
    id: 4,
    icon: <FaUserAlt />,
    href: "#about",
    name: "About Me",
    type: "navigation",
  },
  {
    id: 5,
    icon: <FaCommentDots />,
    href: "#contact",
    name: "Contact Me",
    type: "navigation",
  },
  // {id: 6 , icon: <FaAngleDoubleDown /> , href : "bottom"  }
];

type props = {
  active : string ,
  data : social_Type
}

export const Header = ({ active , data}: props) => {
  const [list, setList] = useState<boolean>(false);

  /* Remove scrol body when List Opend */
  useEffect(() => {
    document.body.style.overflow = list ? "hidden" : "auto";
  }, [list]);

  const socialMedia: NavItem[] = [
  {
    id: 1,
    icon: <IoIosMailUnread />,
    href: `mailto:${data?.Gmail ?? ""}` ,
    name: "Gmail",
    type: "socialmedia",
  },
  {
    id: 2,
    icon: <FaFacebook />,
    href: data?.Facebook ?? "",
    name: "Facebook",
    type: "socialmedia",
  },
  {
    id: 3,
    icon: <SiGithub />,
    href: data?.Github ?? "",
    name: "Github",
    type: "socialmedia",
  },
  {
    id: 4,
    icon: <IoLogoWhatsapp />,
    href: `${data?.Whatsapp ?? ""}, I'm contacting you from your portfolio website!`,
    name: "Whatsapp",
    type: "socialmedia",
  },
  {
    id: 5,
    icon: <FaLinkedin />,
    href: data?.LinkedIn ?? "",
    name: "LinkedIn",
    type: "socialmedia",
  },
  // {id: 6 , icon: <CiCircleList /> ,  }
];

  return (
    <div className="fixed flex justify-between p-5 xl:grid xl:grid-cols-12 top-0 right-0 z-50  w-full items-center bg-black/20 backdrop-blur-2xl xl:px-15 xl:py-5 h-20 ">
      {/* First Cols from grid */}
      <div className="col-span-4 hidden xl:block">
        <NavBar objData={NavItems} active={active} />
      </div>

      {/* Second Cols from grid */}
      <h1 className=" -HERRO__LOGO-">
        <Logo />
      </h1>

      {/* Third Cols from grid */}
      <div className="col-span-4 hidden xl:block">
        <div className="flex flex-wrap gap-2 justify-between items-center  z-10 ">
          {socialMedia.map((item) => {
            return (
              <a
                key={item.id}
                href={item.href}
                className="hover:text-white  text-white/60 cursor-point xl:text-3xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.icon}
              </a>
            );
          })}
        </div>
      </div>

      {/* In Mobile Display */}
      <div
        className="text-white cursor-pointer xl:hidden"
        onClick={() => {
          setList(!list);
        }}
      >
        <CiCircleList size={30} />
      </div>

      {/* Show List */}
      <div
        className={`xl:hidden ${list ? "block" : "hidden"} transform  transition-transform duration-500 ease-in-out ${list ? "translate-x-0" : "translate-x-full"} fixed top-20 right-0 w-full  h-[calc(100vh-5rem)]  bg-gray-950 backdrop-blur-2xl duration-300`}
      >
        <ul className="flex flex-col gap-0.5 h-full overflow-y-auto">
          <li>
            <h2 className="text-white text-xl font-semibold text-center p-5 bg-black">
              Navigation
            </h2>
            <ListNav setState={setList} list={list} data={NavItems} />
          </li>
          <li>
            <h2 className="text-white text-xl font-semibold text-center p-5 bg-black">
              Contact On
            </h2>
          </li>

          <li>
            <ListNav setState={setList} list={list} data={socialMedia} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
