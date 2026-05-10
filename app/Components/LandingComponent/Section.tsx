"use client";
import { useState, useEffect } from "react";
import { Hero, AboutMe, Contact, Footer, Project, Skills } from ".";
import { Header } from "../layout";
import { LeftLine, Rightline } from "../global";
import { useUser } from "@/Context/UserInfoContext";
import {
  about_Type,
  bio_Type,
  category_Type,
  projects_Type,
  skills_Type,
  social_Type,
} from "@/types/types";

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
      <LeftLine />
      <Rightline />

      <div id="#hero" className="observe-section">
        <Header data={socialData} active={active} />
      </div>

      <div id="#hero" className="observe-section">
        <Hero data={bioData} />
      </div>

      <div id="#project" className="observe-section">
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
        <Contact />
      </div>

      <div id="#bottom">
        <Footer />
      </div>
    </div>
  );
}
