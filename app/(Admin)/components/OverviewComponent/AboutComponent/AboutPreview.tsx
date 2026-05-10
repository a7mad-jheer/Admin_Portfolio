"use client";
import { useState } from "react";
import ConfirmDelete from "../../Global/ConfirmDelete";
import ToastError from "../../Error/ToastError";
import { useUpdateData } from "@/hook/api/useUpdateData";
import { useReqStatus } from "@/hook/ui/useReqStatus";
import { useToast } from "@/hook/ui/useToast";
import { FaPlus } from "react-icons/fa";
import DrawerOverlay from "../../Global/DrawerOverlay";
import About from "../../SettingComponent/About";
import AboutCard from "./AboutCard";

type aboutKeys = "about" | "experience" | "goals";
type aboutDataType = {
  id: number | null;
  about: string;
  experience: string;
  goals: string;
  user_id: string | null;
};

type props = {
  aboutSupabase: aboutDataType;
  user_id: string;
};

export const AboutPreview = ({ aboutSupabase, user_id }: props) => {
  const [deleteClicked, setDeleteCliced] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<aboutKeys | "">("");
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [aboutData, setAboutData] = useState<aboutDataType>({
    id: aboutSupabase?.id ?? null,
    about: aboutSupabase?.about ?? "Add new about section",
    experience: aboutSupabase?.experience ?? "Add new experience Section",
    goals: aboutSupabase?.goals ?? "Add new goals section",
    user_id: aboutSupabase?.user_id ?? user_id,
  });

  /* api operations */
  const { updateData } = useUpdateData();
  const { success, fail, loading, status } = useReqStatus();
  const { show, message } = useToast();
  /* api operations */

  const handleDelete = async () => {
    if (status.loading) return;

    loading();

    const { error } = await updateData("about", { [selectedItem]: "" }, [
      { column: "id", value: aboutData.id },
    ]);
    if (error) {
      console.log("there is problem when delete items", error);
      fail();
      return;
    }

    success();
    show("Deleted Successfully.");
    setAboutData((prev) => ({ ...prev, [selectedItem]: "" }));
    setDeleteCliced(false);
    setSelectedItem("");
  };

  const handleNewEdit = (data: string) => {
    setAboutData((prev) => ({ ...prev, [selectedItem]: data }));
  };

  return (
    <div className="relative">
      <ConfirmDelete
        onConfirm={handleDelete}
        onCancel={() => {
          setDeleteCliced(false);
          setSelectedItem("");
        }}
        status={status}
        title={selectedItem}
        showDelete={deleteClicked}
        selectedBtn={selectedItem}
      />

      <DrawerOverlay
        drawerShow={showAdd}
        setDrawerShow={setShowAdd}
        title="About section"
        description="Add about informations"
      >
        <About />
      </DrawerOverlay>

      {aboutData.id === null ? (
        <div className="flex items-center justify-between">
          <h1 className="text-xl my-5 font-semibold">About Me</h1>
          <span
            onClick={() => setShowAdd(true)}
            className="text-white/70 bg-black/40 h-9 w-9 rounded-full flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all duration-200 hover:scale-110 cursor-pointer "
          >
            <FaPlus />
          </span>
        </div>
      ) : (
        <h1 className="text-xl my-5 font-semibold">About Me</h1>
      )}

      {message && <ToastError message={message} />}

      <AboutCard
        data={aboutData}
        onAdd={() => handleNewEdit}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        setDeleteCliced={setDeleteCliced}
      />
    </div>
  );
};

export default AboutPreview;
