import { BiLogoGmail } from "react-icons/bi";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { PiGithubLogoFill } from "react-icons/pi";
import Logo from "../global/Logo";

const contactMethods = [
    {
      name: "whatsapp",
      href: "https://wa.me/972597752547",
      icon: FaWhatsapp,
      hover: "hover:text-green-500",
    },
    {
      name: "gmail",
      href: "mailto:ahmedjj800@gmail.com",
      icon: BiLogoGmail,
      hover: "hover:text-red-500",
    },
    {
      name: "linkedin",
      href: "https://www.linkedin.com/in/ahmed-jheer-179931337/",
      icon: FaLinkedinIn,
      hover: "hover:text-blue-500",
    },
    {
      name: "github",
      href: "https://github.com/a7mad-jheer",
      icon: PiGithubLogoFill,
      hover: "hover:text-gray-300",
    },
  ];


export const MainFooter = () => {
  
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 py-8 relative bottom-0 left-0 w-full bg-black/40 backdrop-blur-md border-t border-white/10 shadow-md shadow-white/10 text-white">
      
      {/* Logo Section */}
      <div className="flex flex-col items-center text-center">
       <Logo/>

        <p className="text-gray-400 text-xs mt-2">
          Build your portfolio in minutes
        </p>
      </div>

      {/* Social Section */}
      <div className="mt-6 text-center">
        <h2 className="text-sm text-gray-300 mb-3">{"Let's"} connect</h2>

        <div className="flex items-center justify-center gap-5 text-2xl">
          {contactMethods.map((method) => {
            return (
              <a
                key={method.name}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={method.name}
                className={`transition duration-200 hover:scale-110 ${method.hover}`}
              >
                <method.icon />
              </a>
            );
          })}
        </div>
      </div>

      {/* Copyright */}
      <p className="text-gray-500 text-center mt-8 text-xs">
        © {year} JheAr. All rights reserved.
      </p>
    </footer>
  );
};

export default MainFooter;