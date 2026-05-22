"use client";
import { useEffect, useState } from "react";
import { EditBio } from "./EditBio";
import { FaPlus } from "react-icons/fa";
import BioCard from "./BioCard";
import { MdEdit } from "react-icons/md";

type BioDataType = {
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
    full_name: bioSupabase?.full_name ?? "Full_Name",
    job_title: bioSupabase?.job_title ?? "Job_Title",
    description: bioSupabase?.description ?? "Description",
    image: bioSupabase?.image ?? "/Logo.png",
    user_id: bioSupabase?.user_id ?? user_id,
  });
  const [showEdit, setShowEdit] = useState<boolean>(false);

  useEffect(() => {
    console.log("bio data from bio preview" + bioData);
  } , [bioData])

  useEffect(() => {
    console.log("user id from bio preview" + user_id);
  }, [user_id]);

  const handleEditData = (data: BioDataType) => {
    setBioData(data);
  };

  return (
    <div className="relative h-full">
      <EditBio
        user_id={user_id}
        showEdit={showEdit}
        setShowEdit={setShowEdit}
        data={bioData}
        onAddEdit={(data) => handleEditData(data)}
      />

        {bioData.full_name === "Full_Name" ? (
          <div className="flex items-center gap-5 mt-5 ">
            <h1 className="text-xl  font-semibold">Bio Information</h1>
            <span 
            onClick={() => setShowEdit(true)}
            className="text-white/70 bg-black/40 h-9 w-9 rounded-full flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all duration-200 hover:scale-110 cursor-pointer ">
            <FaPlus />
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-5 mt-5">
            <h1 className="text-xl  font-semibold">Bio Information</h1>
          <div className=" flex  gap-2">
                  { bioData.full_name !== "Full_Name"  && (
                    <span
                      className="text-white/70 bg-black/40 h-9 w-9 rounded-full flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all duration-200 hover:scale-110 cursor-pointer "
                      onClick={() => setShowEdit(true)}
                    >
                      < MdEdit/>
                    </span>
                  )}
                  
                </div>
            </div>
        )}

        <BioCard data = {bioData} />
    </div>
  );
};

export default BioPreview;
