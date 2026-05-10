"use client";
import { useEffect, useState } from "react";
import TitlePanel from "../../components/Global/TitlePanel";
import AddSkillsForm from "../../components/skillscomponent/AddSkillsForm";
import SkillsTable from "./SkillsTable";



type TechnologiesType = {
  id: number;
  name: string;
  user_id: string;
};

type props = {
  serverTechnologies : TechnologiesType[],
  user_id : string
}



export const Techonoloies = ({serverTechnologies , user_id} : props) => {
  
  const [technologyList, setTechnologyList] = useState<TechnologiesType[]>(serverTechnologies ?? []);

  const handleAddTechnology = (addedData: TechnologiesType) => {
    setTechnologyList((prev) => [...(prev ?? []), addedData]);
  };

  const handleDeletedTechnology = (deletedData: TechnologiesType) => {
    const fiterDeleted = technologyList.filter(
      (tech) => tech.id !== deletedData.id,
    );
    setTechnologyList(fiterDeleted);
  };

  const handleEditTechnology = (editData: TechnologiesType) => {
    const newTechnologyArray = technologyList.map((tech) => {
      if (tech.id === editData.id) {
        return { ...tech, name: editData.name };
      } else return tech;
    });

    setTechnologyList(newTechnologyArray);
  };

  useEffect(() => {
    console.log(technologyList);
  }, [technologyList]);

  return (
    <div className=" relative p-4 ">
      <TitlePanel title="Add Technology" />

      <div className="">
        <div className=" p-2 text-white my-3 bg-zinc-900">
          <p className="text-xl mb-2 font-semibold text-gray-300">Add Technologies</p>

          <AddSkillsForm
          user_id = {user_id}
            supabaseTableTitle="technologies"
            onAdd={(addedData) => handleAddTechnology(addedData)}
          />
        </div>

        <div className="bg-zinc-900 ">
          <h1 className="text-gray-300 my-3 text-xl font-semibold p-2">
          All Technology
        </h1>

        <SkillsTable
          user_id = {user_id}
          supabaseTableTitle="technologies"
          onEdit={(editData) => handleEditTechnology(editData)}
          onDelete={(deletedData) => handleDeletedTechnology(deletedData)}
          skillsList={technologyList}
        />
        </div>
      </div>
    </div>
  );
}

export default Techonoloies;