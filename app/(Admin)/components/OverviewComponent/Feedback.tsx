import { FaWhatsapp } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";
import { FaLinkedinIn } from "react-icons/fa";
import { PiGithubLogoFill } from "react-icons/pi";
import StarsRating from "./feedbackComponent/StarsRating";
import FeedbackSubmit from "./feedbackComponent/FeedbackSubmit";

const contactMethods = [
  {
    id: 0,
    name: "whatsapp",
    href: "https://wa.me/972597752547",
    icon: FaWhatsapp,
    hover: "hover:text-green-500",
  },
  {
    id: 1,
    name: "gmail",
    href: "mailto:ahmedjj800@gmail.com",
    icon: BiLogoGmail,
    hover: "hover:text-red-500",
  },
  {
    id: 2,
    name: "linkedin",
    href: "https://www.linkedin.com/in/ahmed-jheer-179931337/",
    icon: FaLinkedinIn,
    hover: "hover:text-blue-500",
  },
  {
    id: 3,
    name: "github",
    href: "https://github.com/a7mad-jheer",
    icon: PiGithubLogoFill,
    hover: "hover:text-gray-700",
  },
];

type Profile = {
  id : number ,
  name : string ,
  user_name : string ,
  user_id : string,
}

type props = {
    user_id : string,
    profile : Profile
}

export const Feedback = ({user_id , profile} : props) => {

  return (
    <div className="relative h-full">
      <h2 className="text-xl font-semibold mb-4 ">Feedback</h2>
      <div className="bg-[hsl(0_0%_10.98%)] border border-gray-800 p-4 rounded-md mt-5 ">
        <div className="">
          <h1>Give us a rating</h1>
          <StarsRating user_id = {user_id} profile= {profile}/>
        </div>

        <FeedbackSubmit user_id = {user_id} profile= {profile} />

        <div>
          <h1>Contact Us</h1>
          <p className="text-gray-400">
            If you have any questions or need assistance, feel free to reach out
            to us.
          </p>

          <div className="flex mt-3 gap-4 text-3xl">
            {contactMethods.map((method) => {
              return (
                <a
                  key={method.id}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={method.href}
                  className={`transform-transition duration-200 scale-110 cursor-pointer ${method.hover}`}
                >
                  <method.icon />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
