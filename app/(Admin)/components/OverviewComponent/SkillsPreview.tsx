"use client";
import { useState } from "react";
import SkillPreview from "./skillsComponent/SkillPreview";

type skillsSelectedKey = "tools" | "technologies" | "alone";


type skillsType = {
  id: number;
  name: string;
  user_id: string;
};

type props = {
  serverData: skillsType[];
  user_id: string;
  skillName : skillsSelectedKey
};

export const SkillsPreview = ({ serverData, user_id , skillName}: props) => {
  const [data, setData] = useState<skillsType[] | []>(serverData ?? []);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [skillsSelected, setSkillsSelected] = useState<
    "tools" | "technologies" | "alone"
  >("alone");

  const handleAddSkills = (AddedData: skillsType) => {
    console.log(AddedData);
    setData((prev) => [...(prev ?? []), AddedData]);
    console.log(AddedData)
    setSkillsSelected("alone");
  };

  const handleDeleteSkills = (deletedData: skillsType) => {
    const fiterDeleted = data.filter((info) => info.id !== deletedData.id);
    setData(fiterDeleted);
  };

  const handleEditSkills = (editedData: skillsType) => {
    const newSkills = data.map((info) => {
      if (info.id === editedData.id) {
        return { ...info, name: editedData.name };
      } else return info;
    });

    setData(newSkills);
  };

  return (
    <div className="flex flex-col xl:flex-row gap-5 relative h-full w-full">
      <SkillPreview
        serverData={data}
        user_id={user_id}
        showEdit={showEdit}
        setShowEdit={setShowEdit}
        onAdd={(AddedData) => {
          console.log("skill preview page => ", AddedData);
          handleAddSkills(AddedData)
        }}
        onDelete={(deletedData) => handleDeleteSkills(deletedData)}
        onEdit={(editedData) => handleEditSkills(editedData)}
        skillsSelected={skillsSelected}
        setSkillsSelected={setSkillsSelected}
        skillName = {skillName}
      />
    </div>
  );
};

export default SkillsPreview;
