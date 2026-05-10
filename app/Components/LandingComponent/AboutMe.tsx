import { about_Type } from "@/types/types";
import { Title } from "../global/Title";

type props = {
  data: about_Type;
};

export const AboutMe = ({ data }: props) => {
  const aboutData = [
    { id: 0, description: data.about },
    { id: 1, description: data.experience },
    { id: 2, description: data.goals },
  ];
  return (
    <div className="relative md:my-20 md:py-20 p-5 border-y-2">
      <Title text="About Me" />

      <div className="z-15 flex flex-col md:flex-row justify-center gap-2 md:my-20 my-10">
        {aboutData.map((item) => {
          return (
            <p
              key={item.id}
              className="text-md text-white md:max-w-1/3 mx-auto bg-black/20 backdrop-blur-2xl py-5 px-3 text-center"
            >
              {item.description}
            </p>
          );
        })}
      </div>

      <p className="absolute bottom-0 left-1/2  -translate-x-1/2 text-white/60 text-xs text-center">
        Clean code • Responsive design • Performance-focused
      </p>
    </div>
  );
};

export default AboutMe;
