"use client";
import { useState, useEffect } from "react";
import { Hero, AboutMe, Contact, Footer, Project, Skills } from ".";
import { Header } from "../layout";
import { useUser } from "@/Context/UserInfoContext";
import {
  about_Type,
  bio_Type,
  category_Type,
  projects_Type,
  skills_Type,
  social_Type,
} from "@/types/types";
import { LoadingLink } from "../global/LoadingLink";
import { IoMdReturnLeft } from "react-icons/io";

type landingProps = {
  user_id: string;
  projectsData: projects_Type[];
  categoriesData: category_Type[];
  toolsData: skills_Type[];
  tecnologyiesData: skills_Type[];
  socialData: social_Type;
  bioData: bio_Type;
  aboutData: about_Type;
};

export default function Section({
  user_id,
  projectsData,
  categoriesData,
  toolsData,
  tecnologyiesData,
  socialData,
  bioData,
  aboutData,
}: landingProps) {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const sections = document.querySelectorAll(".observe-section");
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries);
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
          console.log(entry.target.id);
        });
      },
      { threshold: 0.1 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const { userInfo } = useUser();
  const isOwner = userInfo && userInfo.user_id === user_id;
  return (
    <div className="relative ">
      {/* <LeftLine />
      <Rightline /> */}

      {isOwner && (
        <div className="fixed top-25 left-2  z-50  text-white text-md md:text-3xl bg-red-600/20 md:h-12 md:w-12 h-8 w-8 rounded-full flex items-center justify-center cursor-pointer hover:scale-105">
          <LoadingLink href="/Admin/overview">
            <span className="text-"><IoMdReturnLeft /></span>
          </LoadingLink>
        </div>
      )}

      <div id="#hero" className="observe-section">
        <Header data={socialData} active={active} />
      </div>

      <div id="#hero" className="observe-section">
        <Hero data={bioData} />
      </div>

      <div id="#project" className="observe-section overflow-hidden">
        <Project
          user_id={user_id}
          isOwner={isOwner}
          projectsData={projectsData}
          categoriesData={categoriesData}
        />
      </div>

      <div id="#skills" className="observe-section">
        <Skills toolsData={toolsData} tecnologyiesData={tecnologyiesData} />
      </div>

      <div id="#about" className="observe-section">
        <AboutMe data={aboutData} />
      </div>

      <div id="#contact" className="observe-section">
        <Contact userGmail = {socialData?.Gmail ?? ""} />
      </div>

      <div id="#bottom">
        <Footer />
      </div>
    </div>
  );
}
