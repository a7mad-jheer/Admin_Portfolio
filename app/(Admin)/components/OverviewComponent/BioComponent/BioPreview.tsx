"use client";
import { useEffect, useState } from "react";
import { EditBio } from "./EditBio";
import { FaPlus } from "react-icons/fa";
import DrawerOverlay from "../../Global/DrawerOverlay";
import Bio from "../../SettingComponent/Bio";
import BioCard from "./BioCard";

type BioDataType = {
  id: number | null;
  full_name: string;
  job_title: string;
  description: string;
  image: string;
  user_id: string;
};

type props = {
  bioSupabase: BioDataType;
  user_id: string;
};

export const BioPreview = ({ bioSupabase, user_id }: props) => {
  const [bioData, setBioData] = useState<BioDataType>({
    id: bioSupabase?.id ?? null,
    full_name: bioSupabase?.full_name ?? "Full_Name",
    job_title: bioSupabase?.job_title ?? "Job_Title",
    description: bioSupabase?.description ?? "Description",
    image: bioSupabase?.image ?? "/Logo.png",
    user_id: bioSupabase?.user_id ?? user_id,
  });
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showAdd , setShowAdd] = useState<boolean>(false)

  useEffect(() => {
    console.log("user id from bio preview" + user_id);
  }, [user_id]);

  const handleEditData = (data: BioDataType) => {
    setBioData(data);
  };

  return (
    <div className="">
      <EditBio
        user_id={user_id}
        showEdit={showEdit}
        setShowEdit={setShowEdit}
        data={bioData}
        onAddEdit={(data) => handleEditData(data)}
      />

      <DrawerOverlay 
        drawerShow = {showAdd}
        setDrawerShow={setShowAdd}
        title = "Profile "
        description = "Add profile infromations"
        >
          <Bio />
        </DrawerOverlay>

        {bioData.id === null ? (
          <div className="flex items-center justify-between">
            <h1 className="text-xl my-5 font-semibold">Bio Information</h1>
            <span 
            onClick={() => setShowAdd(true)}
            className="text-white/70 bg-black/40 h-9 w-9 rounded-full flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all duration-200 hover:scale-110 cursor-pointer ">
            <FaPlus />
            </span>
          </div>
        ) : (
          <h1 className="text-xl my-5 font-semibold">Bio Information</h1>
        )}

        <BioCard data = {bioData} setShow = {setShowEdit}/>
    </div>
  );
};

export default BioPreview;
