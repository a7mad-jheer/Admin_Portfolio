import { IoIosAdd } from "react-icons/io";
import { FaRegFolderOpen } from "react-icons/fa";

export const NoProjects = () => {
  return (
    <div className="w-full min-h-[calc(100vh-64px)]  flex items-center justify-center bg-zinc-900 text-white">
      
      <div className="flex flex-col items-center text-center gap-5 p-8 rounded-2xl border border-zinc-800 bg-zinc-950/60 shadow-lg max-w-md w-full">

        {/* Icon */}
        <div className="text-6xl text-blue-500">
          <FaRegFolderOpen />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold">
          No Projects Yet 🚀
        </h1>

        {/* Subtitle */}
        <p className="text-sm text-gray-400">
          Start building your portfolio by adding your first project
        </p>

        {/* Button */}
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-full text-white font-medium shadow-md cursor-pointer">
          <IoIosAdd className="text-xl" />
          Add Project
        </button>

      </div>
    </div>
  );
};

export default NoProjects;