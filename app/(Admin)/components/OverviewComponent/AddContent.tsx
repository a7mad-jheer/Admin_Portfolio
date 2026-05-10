"use client";
import { useState } from "react";
import AddPorjectPage from "../AddProjectCom/AddProjectPage";
import { useProjects } from "@/hook/useProjects";
import { useUser } from "@/Context/UserInfoContext";
import AddSocialForm from "./socialMediaComponent/AddSocialForm";
import DrawerOverlay from "../Global/DrawerOverlay";

const btnName = [
  { id: 0, text: "projects" },
  { id: 1, text: "links" },
  { id: 2, text: "tools" },
  { id: 3, text: "technology" },
  { id: 4, text: "bio" },
];

export const AddContent = () => {
  const { userInfo } = useUser();
  const [projectClick, setProjectClick] = useState<boolean>(false);
  const [addSocial, setAddSocial] = useState<boolean>(false);
  const { addProject } = useProjects(userInfo?.user_id);

  const capitalizeFirst = (text: string) => {
    const first = text.charAt(0).toUpperCase();

    return first + text.slice(1);
  };

  const handleAdd = (text: string) => {
    if (!text) return;

    if (text === "projects") {
      setProjectClick(true);
    }

    if (text === "links") {
      setAddSocial(true);
    }
  };

  return (
    <div>
      <h1 className="text-xl my-5 font-semibold">Add Content</h1>

      <AddPorjectPage
        addProject={projectClick}
        setAddProject={setProjectClick}
        onAddProject={addProject} user_id={""} serverCategories={[]}      />

      <DrawerOverlay
        drawerShow={addSocial}
        setDrawerShow={setAddSocial}
        title="Add Social Media"
        description="Add / Updata Social Media Url"
      >
        <AddSocialForm />
      </DrawerOverlay>

      <div className="border border-gray-800 bg-[hsl(0_0%_10.98%)]  w-full rounded-md mt-5 p-4 flex gap-4">
        {btnName.map((btn) => {
          return (
            <button
              type="button"
              name={btn.text}
              onClick={() => handleAdd(btn.text)}
              key={btn.id}
              className="transfom duration-200 bg-[hsl(154.9_100%_19.22%)] hover:bg-[hsl(154.9_100%_23.22%)] border border-gray-700  p-2  rounded-md cursor-pointer"
            >
              Add {capitalizeFirst(btn.text)}
            </button>
          );
        })}
      </div>

      {(projectClick || addSocial) && (
        <div className="fixed z-40 top-0 left-0 bg-black/50 w-full h-screen backdrop-blur-md"></div>
      )}
    </div>
  );
};

export default AddContent;
