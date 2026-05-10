"use client";

import { useState } from "react";
import ConfirmDelete from "../../Global/ConfirmDelete";
import { useInsertData } from "@/hook/api/useInsertData";
import { useUpdateData } from "@/hook/api/useUpdateData";
import { useReqStatus } from "@/hook/ui/useReqStatus";
import { useToast } from "@/hook/ui/useToast";
import ToastError from "../../Error/ToastError";
import DrawerOverlay from "../../Global/DrawerOverlay";
import SocialMediaUrl from "../../SettingComponent/SocialMediaUrl";
import { FaPlus } from "react-icons/fa";
import { SocialMediaCard } from "./SocialMediaCard";

type socialMediaType = {
  id: number | null;
  user_id: string;
  Gmail: string;
  Facebook: string;
  Whatsapp: string;
  Github: string;
  LinkedIn: string;
};

type socialMediaKey = "Gmail" | "Facebook" | "Whatsapp" | "Github" | "LinkedIn";

type props = {
  socialSupabase: socialMediaType;
  user_id: string;
};

export const SocialMediaPerview = ({ socialSupabase, user_id }: props) => {
  const [selectedLink, setSelectedLink] = useState<socialMediaKey | "">("");
  const [deleteClick, setDeleteClick] = useState<boolean>(false);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [socialData, setSocialData] = useState<socialMediaType>({
    id: socialSupabase?.id ?? null,
    user_id: socialSupabase?.user_id ?? user_id,
    Gmail: socialSupabase?.Gmail ?? "Add new Url",
    Facebook: socialSupabase?.Facebook ?? "Add new Url",
    Whatsapp: socialSupabase?.Whatsapp ?? "Add new Url",
    Github: socialSupabase?.Github ?? "Add new Url",
    LinkedIn: socialSupabase?.LinkedIn ?? "Add new Url",
  });

  /* api opertations */
  const { updateData } = useUpdateData();
  const { insertData } = useInsertData();
  const { success, fail, loading, status } = useReqStatus();
  const { show, message } = useToast();
  /* api opertations */

  const handleDelete = async () => {
    if (status.loading) return;
    loading();

    const { error } = await updateData(
      "social",
      { [selectedLink]: "" },
      [{ column: "id", value: socialData.id }],
      true,
    );

    if (error) {
      console.log(
        "there is error when delete" + selectedLink + "from table => ",
        error,
      );
      fail();
      show("Somthing Went Wrong! , please try again");
      return;
    }

    setSocialData((prev) => ({ ...prev, [selectedLink]: "" }));
    await insertData("latest_activity", {
      activity: `deleted ${selectedLink} Url`,
      type: "Deleted successfully",
      user_id: user_id,
    });
    success();
    show("Deleted Successfully.");
    setDeleteClick(false);
  };

  const handleNewEdit = (data: string) => {
    setSocialData((prev) => ({ ...prev, [selectedLink]: data }));
  };

  return (
    <div className="relative ">
      {message && <ToastError message={message} />}

      <ConfirmDelete
        status={status}
        onConfirm={handleDelete}
        onCancel={() => {
          setDeleteClick(false);
          setSelectedLink("");
        }}
        title={` ${selectedLink} link`}
        showDelete={deleteClick}
        selectedBtn={selectedLink}
      />

      <DrawerOverlay
        drawerShow={showAdd}
        setDrawerShow={setShowAdd}
        title="Social Media"
        description="Add Social Media"
      >
        <SocialMediaUrl />
      </DrawerOverlay>

      {socialData.id === null ? (
        <div className="flex items-center justify-between">
          <h1 className="text-xl my-5 font-semibold">Social Media Links</h1>
          <span
            onClick={() => setShowAdd(true)}
            className="text-white/70 bg-black/40 h-9 w-9 rounded-full flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all duration-200 hover:scale-110 cursor-pointer "
          >
            <FaPlus />
          </span>
        </div>
      ) : (
        <h1 className="text-xl my-5 font-semibold">Social Media Links</h1>
      )}

      <SocialMediaCard
        data={socialData}
        selectedValue={selectedLink}
        setSelectedValue={setSelectedLink}
        onAdd={() => handleNewEdit}
      />
    </div>
  );
};

export default SocialMediaPerview;
