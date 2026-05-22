import { about_Type } from "@/types/types";
import { Title } from "../global/Title";

type props = {
  data: about_Type;
};

export const AboutMe = ({ data }: props) => {
  const aboutData = [
    { id: 0, description: data?.about ?? "This user hasn't written a bio yet. Stay tuned for updates about their journey, skills, and experience." },
    { id: 1, description: data?.experience ?? "No experience has been added yet. Work history and professional background will appear here once available."},
    { id: 2, description: data?.goals ?? "This section will be updated soon. The user hasn't shared their goals yet, but exciting things are coming!" },
  ];
  return (
    <div className="relative md:my-20 md:py-20 p-5 ">
      <Title text="About Me" />

      <div className="border-2 shadow-2xl border-blue-950/70 rounded-md  p-10 z-50">

      <div className="z-15 flex flex-col md:flex-row justify-center gap-2 md:my-20 my-10">
        {aboutData.map((item) => {
          return (
            <p
              key={item.id}
              className="text-md text-white md:max-w-1/3 mx-auto bg-gradient-to-r from-white/10 to-white/5 rounded-xl backdrop-blur-2xl py-5 px-3 text-center"
            >
              {item.description}
            </p>
          );
        })}
      </div>

      </div>
    </div>
  );
};

export default AboutMe;
